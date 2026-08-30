# Ayla Discovery Report

**Status: DISCOVERY / NON-BINDING** — фактическая инвентаризация кода. НЕ reuse audit, НЕ архитектура Pet AI, НЕ решение о переиспользовании. Оценка REUSE AS IS / EXTEND / … — после REUSE GATE (`ayla-reuse-audit-plan.md`).
**Дата:** 2026-08-30 · **Метод:** read-only обход кода и тестов.

## Репозитории

- **CORE** = `Ayla/ayla-ai-core` — pure-Python AI-библиотека (`src/ayla_ai_core/`), v0.9.0. Потребляется платформой как git-pinned зависимость (`pyproject.toml:158`, SHA-pin + `[django]` extra).
- **PLATFORM** = `Ayla/ai-bot-platform` — Django multi-tenant платформа, 40 apps в `apps/`. Legacy-снапшоты (`legacy_maxbot/`, `legacy_formulatela_mcp/`, `legacy_notifications/`) — read-only, «drained» в `apps/`, к удалению (`MIGRATION_NOTICE.md`).
- Внешний «Ayla djangoproject» (canonical payments, reviews, salon API) — отдельный сервис (ADR-0009), в двух целевых репо отсутствует; связь через HTTP-клиенты и eventbus.

## Матрица областей

| # | Область | Статус | Где | Кратко |
|---|---|---|---|---|
| 1 | auth/users | EXISTS | PLATFORM `apps/identity` (BotUser, ClientProfile, role resolvers), `apps/miniapp_api/auth.py` (MAX initData HMAC), `apps/admin_api/auth.py`, `apps/master_api/auth.py`; роли: tenancy.TenantStaff + CatalogMaster | Auth channel-based (MAX HMAC, admin role, master invite tokens), не password/session. Tenant-coupled |
| 2 | conversations | EXISTS | PLATFORM `apps/conversations` (Conversation, Message, AiDraft; `services.py` — единая точка); CORE: `ConversationStore` Protocol (DI) | Conversation.State: idle/consulting/escalated/human_handoff; slot_state JSON для flow |
| 3 | AI orchestration | EXISTS | CORE `orchestrator.py` (AIConcierge, 11-шаговый цикл, DI); PLATFORM `apps/orchestrator/concierge.py` (живой путь), `turn_seam.py` | ⚠️ `apps/orchestrator/pipeline.py` — self-declared DEPRECATED, never wired to ingress (мёртвый код) |
| 4 | context assembly | EXISTS | CORE `context.py` (SpecialistContext, candidate_ids); PLATFORM `apps/orchestrator/{booking_context,memory_block,personal_surface,...}.py`, `apps/kb` (ChromaDB), `apps/marketplace/discovery.py` | Кандидаты с реальными ID в prompt — анти-галлюцинационный паттерн |
| 5 | memory | EXISTS (с provenance) | PLATFORM `apps/identity/models.py:627 MemoryEntry` (zones green/yellow/red, `source` ∈ explicit/inferred/signal, `status` ∈ active/superseded/expired/deletion_pending/deleted, canonical `provenance`, consent); `apps/persona/memory_extract.py`; `apps/consent/`; CORE `memory.py` (build_memory_block, confidence thresholds) | Provenance-модель богаче MVP-правил Pet AI; но salon/person-ориентирована, consent-зоны под 152-ФЗ |
| 6 | providers | EXISTS (нет отдельной Salon model) | `apps/catalog/models.py:203 CatalogMaster` + MasterService; `apps/tenancy TenantStaff`; salon = tenancy.Tenant; публично — `apps/marketplace/dto.py` (MasterCard/SalonCard) | Salon-граница = tenant. Provider-модель beauty-specific (мастер услуг красоты) |
| 7 | services/capabilities | EXISTS | `apps/catalog` (CatalogService, MasterService), `apps/marketplace/discovery.py` (sole sanctioned cross-tenant read, lint-правило MKT1) | Каталог зеркалится из внешней Ayla + platform-owned поля |
| 8 | availability | EXISTS | `apps/scheduling` (WorkingHours, ScheduleException, TimeBlock, ScheduleChangeRequest, SlotConfig; resolver.py — чистые функции) | Слоты вычисляемые (FreeSlot dataclass), не персистятся |
| 9 | booking | EXISTS | `apps/booking` (BookingRequest, PendingBookingAction, RemoteBookingProxy; services create/transitions/feedback) + `apps/bookings` (reminders, completion beat) + `apps/skills/booking` | См. `ayla-booking-flow.md`. Нет request-mode, нет slot hold, нет completion notes |
| 10 | reviews | PARTIAL | Нет first-class Review model. Rating/feedback на BookingRequest (1–5 + comment, ≤3 → handoff); `review.created` consumer → ClientProfile sentiment; canonical reviews во внешней Ayla (ADR-0009) | Design doc для полноценных reviews существует, не реализовано |
| 11 | notifications | EXISTS (фрагментировано) | `apps/notifications` (MasterNotificationPrefs, proactive consent gate), `apps/booking/{client,master}_notify.py`, `apps/bookings/tasks.py` (T-24h/T-2h), `apps/channels` | MAX-messenger центрично; нет единого notification service |
| 12 | payments | PARTIAL | Исходящий клиент к внешней Ayla payments (`apps/integrations/ayla_payments/`), PaymentMirror, payment_failed skill; YooKassa retired | Lifecycle внешний; для Pet AI MVP всё равно out of scope |
| 13 | events/outbox | EXISTS | `apps/eventbus` (DomainEvent outbox, dispatcher SKIP LOCKED, DLQ, dedupe; 41 test file — самый покрытый app), `apps/events` (telemetry emit, vocabulary) | Зрелая outbox-инфраструктура; tenant ContextVar повсюду |
| 14 | audit/logging | EXISTS | `apps/audit` (AuditLog, write_audit never-raises), `apps/observability` (OTel, Sentry, PII filter, AI metrics), `apps/replay` (turn recorder/replayer) | Сильная observability |

## Ключевые факты для будущего аудита (наблюдения, не оценки)

1. **Memory provenance в Ayla богаче, чем требует Pet AI MVP** (zones, consent, lifecycle) — но она person/salon-ориентирована и юридически нагружена (152-ФЗ, red-zone access log).
2. **Booking в Ayla ≠ booking Pet AI по трём пунктам**: нет completion notes/result payload (у Pet AI provider result — центральный элемент loop), нет request/approval mode (у Pet AI — опция Q-10), нет slot hold.
3. **Канонический booking/payments/reviews — во внешнем сервисе**, не в этих репо; платформа частично зеркалит (RemoteBookingProxy).
4. **Мёртвый код**: 19-шаговый pipeline.py помечен DEPRECATED; tools registry + tool_invoker без живого caller на проверенном пути.
5. **Multi-tenancy сквозная** (`current_tenant()` ContextVar, TenantScopedManager) — всё завязано на tenant=salon.
6. **Канал доставки — MAX messenger** (ingress streams, handler); Telegram/web — отдельные обработчики, не инспектированы.
7. **Guardrails сильные и проверенные инцидентами**: tool-arg ID validation через candidate_ids, safety gate inbound/outbound, promise-without-tool retry, PII tokenization.

## Что не инспектировано

- Per-tenant handler path внутренне (семплирован через общие helpers).
- `apps/promptreg`, `apps/replay` — за пределами ссылок.
- Telegram/web channel handlers.
- Внешний «Ayla djangoproject» (canonical payments/reviews/salon API).
