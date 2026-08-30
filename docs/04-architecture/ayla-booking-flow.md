# Ayla Booking Flow — фактическая карта

**Status: DISCOVERY / NON-BINDING** — описание существующей системы по коду и тестам. НЕ переносится в Pet AI.
**Дата:** 2026-08-30

## Приложения

`apps/scheduling` (availability), `apps/booking` (persistence + lifecycle), `apps/bookings` (reminders/completion beat), `apps/skills/booking` (LLM tools). Канонический booking частично принадлежит внешнему сервису Ayla — локально зеркалится через `RemoteBookingProxy`.

## Availability → slot

```text
WorkingHours (недельный шаблон per master/day, CHECK constraints, unique)
+ ScheduleException (5 типов, unique per master/date)
+ TimeBlock (точечные блокировки)
+ SlotConfig (granularity 15m, buffer 5m, lead_time 60m, max_advance 60d)
→ resolver.py: resolve_working_blocks → compute_free_slots (чистая функция:
  blocks − occupied − buffers, сетка, lead-time cutoff)
→ FreeSlot dataclass (tz-aware start) — ВЫЧИСЛЯЕМЫЕ, НЕ ПЕРСИСТЯТСЯ
→ GET /api/v1/miniapp/slots
```

**Slot hold/lock: NOT FOUND.** Нет модели резерва слота. `PendingBookingAction` — 10-мин TTL карточка подтверждения для клиента, НЕ резерв.

## Booking create (instant confirm)

```text
create_customer_booking (create.py:157):
  transaction.atomic + SELECT FOR UPDATE на CatalogMaster
  → под блокировкой: re-check archived/invite/MasterService + ПОВТОРНЫЙ прогон resolver
  → INSERT status=CONFIRMED (сразу; request/approval mode — NOT FOUND)
  → DB backstop: partial UNIQUE (master, visit_at) WHERE status IN (confirmed, cancel_requested, reschedule_requested)
  → after commit: emit booking.created; push в YClients (best-effort)
```

- Concurrency: доказана тестами (`test_concurrent_double_book_db_backstop`, `test_slot_collision_rolls_back`; 14 `select_for_update` в test_reschedule).
- Unique constraint — только на (master, visit_at) старт; перекрытия разной длительности ловит resolver под row lock, не constraint.
- Idempotency: `apps/tools/idempotency.py` (with_idempotency), CAS-паттерны (`completed_at IS NULL`, `salon_notified_at IS NULL`), `commit_cancel` idempotent on replay.

## Lifecycle

```text
CONFIRMED (default on create)
 ├─ request_cancel → CANCEL_REQUESTED ─(undo ≤5s)─► CONFIRMED
 │                    └─ commit_cancel → CANCELLED (reminders → CANCELLED, emit booking.cancelled)
 ├─ request_reschedule → RESCHEDULE_REQUESTED ─► abandon → CONFIRMED
 │   └─ commit_reschedule: old → RESCHEDULED + new CONFIRMED row
 │      (slot collision → IntegrityError → rollback → slot_unavailable)
 └─ время прошло: detect_completed_bookings (Celery beat)
     visit_at + duration + grace < now → CAS completed_at → emit booking.completed
```

- Transitions: `transitions.py` — 6 функций, каждая: `_lock_booking` (select_for_update) + FROM-state validation + audit row + domain event + `_assert_actor_owns`.
- Cancel: reason_class/reason_text в attribution_metadata (мастер не видит). Cutoff-правил («нельзя за 2ч») — NOT FOUND.
- Completion: только `completed_at` timestamp. **Completion notes/result fields — NOT FOUND.**

## Events / notifications

- Internal events: `apps/events` vocabulary (booking.created/cancel_requested/cancelled/reschedule_*/…), emit after commit, best-effort (не transactional outbox).
- Eventbus: `apps/eventbus` (DomainEvent outbox, SKIP LOCKED dispatcher, DLQ, IngestDedupe) — consumers booking/reviews/payment.
- Notifications: master_notify (новая запись, cascade master→manager→WARN), client_notify («вы записаны»), reminders T-24h (confirm/cancel/reschedule кнопки) + T-2h, escalation неотвеченных, post-visit followup (нужен completed_at).
- Reviews: `rating` 1–5 + `feedback_comment` на BookingRequest (post-visit, idempotent); rating ≤3 → HUMAN_HANDOFF complaint. Standalone Review model — NOT FOUND (canonical во внешней Ayla).

## Mirror path

```text
eventbus booking.* / appointment.rescheduled → RemoteBookingProxy upsert
(confirmed/pending_payment/tentative/cancelled/completed/no_show) — read-cache;
admin complete/reschedule → proxy во внешнюю Ayla с expected_version optimistic guard
```

## Сопоставление с booking-инвариантами Pet AI (факты, не оценка)

| Инвариант Pet AI | В Ayla |
|---|---|
| no double booking | ✅ row lock + resolver recheck + partial unique + тесты |
| no fake confirmation | ✅ CONFIRMED только после insert под блокировкой |
| no duplicate booking | ✅ idempotency-паттерны |
| occupied slot → alternative UX | ⚠️ slot_unavailable при collision; UX альтернатив — вне scope discovery |
| request mode (Q-10) | ❌ NOT FOUND (только instant) |
| provider result/recommendation | ❌ NOT FOUND (нет completion notes) |
| lifecycle BOOKING REVIEW → CONFIRMED | ⚠️ ближайшее — PendingBookingAction (10-мин preview gate клиента) |
