# AGENTS.md — Pet AI

Операционный контракт для AI-агентов и разработчиков проекта Pet AI.
Источник: Master Prompt v1 (зафиксирован владельцем проекта). При расхождении любого документа с этим файлом — этот файл приоритетнее; расхождение нужно зафиксировать в `docs/08-decisions/open-questions.md`.

## 1. Главный принцип

> Сначала подтверждаем пользовательский путь и требования, затем проектируем минимально необходимую архитектуру, затем реализуем вертикальными end-to-end slices.

Защищай проект от двух крайностей:
1. преждевременного кодирования без подтверждённого UX;
2. бесконечного проектирования без перехода к рабочему продукту.

Постоянный вопрос оркестратора:

> Это приближает нас к проверке Core Care Loop или просто увеличивает количество построенных вещей?

Если второе — остановись.

## 2. Продукт в одном абзаце

Pet AI — персональный AI-ассистент владельца питомца (MVP: владелец собаки). Центральная сущность — питомец и его longitudinal context, а не каталог услуг и не чат. Ценность: AI проводит владельца от потребности до завершённого Care Loop и использует результат в следующем взаимодействии.

## 3. Жёсткие продуктовые рамки

- Первичный пользователь MVP: **владелец собаки**. Не расширять на другие виды животных без product decision.
- Два MVP-вертикала: **Grooming** (основной transactional slice) и **Veterinary** (stress-test с safety-границами).
- AI **не ветеринар**: не ставит диагноз, не назначает/не меняет препараты, не выдаёт AI inference за медицинский факт. См. `docs/05-ai/safety-boundaries.md`.
- Onboarding — **FROZEN** (O01→O02→O03→O04→Save→Home), без длинной анкеты, enrichment progressive.
- UX **не заморожен** до пользовательских тестов.
- Post-MVP scope не реализуем — только фиксируем в backlog (`docs/00-product/mvp-scope.md`).

## 4. Статусы документов и решений

Каждый существенный документ имеет статус: `DRAFT` / `REVIEW` / `FROZEN` / `SUPERSEDED`.
Решения: `DECIDED` / `HYPOTHESIS` / `OPEN QUESTION` / `POST-MVP`.

**Никогда не представляй hypothesis как принятое решение.** Не придумывай отсутствующие решения — помечай как OPEN QUESTION.

## 5. Gates (порядок обязателен)

| Gate | Критерий | Статус |
|---|---|---|
| PRODUCT GATE | Product Concept v0.1 frozen | ✅ фактически выполнен |
| UX GATE | low-fi prototype + owner tests + provider tests + критические UX-коррекции | ⛔ не пройден |
| DOMAIN GATE | minimum domain model после UX validation | ⛔ |
| REUSE GATE | Ayla reuse audit после domain requirements | ⛔ |
| ARCHITECTURE GATE | minimum viable architecture | ⛔ |
| DEVELOPMENT GATE | разрешение на feature implementation | ⛔ |

### Что можно кодить до DEVELOPMENT GATE (reversible technical foundation)

- repository/workspace, Git, README/AGENTS, lint/test tooling, CI skeleton;
- basic application shell, environment, mock API boundaries;
- технический spike reuse Ayla; throwaway prototype при необходимости.

### Что запрещено до gates

- окончательная Pet database schema, массовые migrations;
- сложный booking domain «заново»;
- full provider CRM; payments/payouts/refunds;
- production-grade Vetmanager integration;
- сложная Memory architecture;
- любой Post-MVP scope.

## 6. Development strategy (после DEVELOPMENT GATE)

Только **vertical slices**, каждый — working end-to-end. Нельзя «сначала весь backend, потом frontend, потом AI».

Порядок slices:
1. Create Pet → Home → Ask Pet AI → AI uses Pet Context
2. Need → Groomer Matching → Provider → Booking
3. Complete Service → Result → Feedback → Timeline → Memory
4. Repeat Need → Previous Relationship → Faster Rebooking
5. Veterinary Intake → Care Decision → Matching

## 7. Ключевые инварианты домена

- **Pet Core**: Profile / Timeline / Memory / Current State / Care — разные понятия, не смешивать.
- **Timeline** — значимые события жизни питомца, НЕ activity log приложения (клики, AI messages, webhook'и, retries — это audit/system data).
- **Memory**: каждое существенное знание = `value + category + source + source_date + status`. Sources: `OWNER | PROVIDER | DOCUMENT | CLINIC | AI_OBSERVATION`. Statuses: `CURRENT | UNCERTAIN | OUTDATED | DISPROVEN`. AI observation ≠ медицинский факт.
- **Matching**: explainable deterministic, не ML. Hard filters → soft signals. Previous relationship — сильный сигнал, но не побеждает отсутствие компетенции. Максимум 3 AI-curated candidates; каталог — fallback. Рекомендации объяснимы (почему подходит, какие данные, trade-offs). Никаких «96% match» без смысла.
- **Booking**: lifecycle `AVAILABLE → BOOKING REVIEW → CONFIRMED → COMPLETED` (+`CANCELLED`). Invariants: no double booking, no fake confirmation, no silent context loss, no duplicate booking, occupied slot → полезный альтернативный UX.
- **Provider side**: receive booking → see minimum relevant allowed Pet Context → complete service → provide result. Не CRM.
- **Клиники**: интеграция с Vetmanager/CRM клиники, а не замена. Pet AI владеет owner experience и cross-provider Timeline/Memory.

## 8. Обязанности агента

- Обновлять `PROJECT_STATE.md` после значимых изменений.
- Значимые решения фиксировать в `docs/08-decisions/decision-log.md` (ID, Date, Decision, Reason, Status, Impact, Related docs/issues).
- Не принимать большие решения молча: факт → влияние → 1–3 варианта → рекомендация → ожидание решения владельца (если блокирует). Если не блокирует — open question и продолжать.
- Не расширять scope. Идеи вне MVP — в Post-MVP Backlog, без реализации.

## 9. Analytics (с первого рабочего prototype)

События: `pet_created`, `first_context_added`, `first_ai_message`, `need_detected`, `provider_results_shown`, `provider_selected`, `booking_started`, `booking_confirmed`, `service_completed`, `feedback_submitted`, `timeline_updated`, `memory_used_in_context`, `repeat_need`, `repeat_booking`.

Основная метрика: **Completed Care Loops / Active Pet**. Не оптимизировать под количество AI messages.

## 10. Локализация артефактов

Документация — на русском. Код, идентификаторы, API — на английском. Commit messages — conventional commits, английский.
