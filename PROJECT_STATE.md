# PROJECT STATE — Pet AI

> Обновляется после каждого значимого изменения. Последнее обновление: 2026-08-30 (UX VALIDATION + PROVIDER RESEARCH пакет готов).

## Current phase

**UX VALIDATION + PROVIDER RESEARCH.** Операционный пакет полностью готов. Следующий шаг — реальные сессии (требуют owner action). Новые вертикалы, крупные экраны и production code — стоп до UX FREEZE v0.2.

## Current gate

| Gate | Статус |
|---|---|
| PRODUCT GATE | ✅ Product Concept v0.1 — FROZEN |
| UX GATE | ⛔ Активный. Артефакты готовы; далее: owner tests → findings triage → corrections → UX FREEZE v0.2 (`docs/02-ux/ux-validation-gate.md`) |
| DOMAIN GATE | ⛔ Не начат (domain extraction после freeze) |
| REUSE GATE | ⛔ Inventory ✅ + audit plan ✅; аудит — после domain extraction |
| ARCHITECTURE GATE | ⛔ Не начат |
| DEVELOPMENT GATE | ⛔ Закрыт |

## Готовность к сессиям (чеклист)

- ✅ Owner: recruiting plan (sample, exclusions, 3 message variants), session runbook (A/B/C + распределение участников), session template, findings register (severity S0–S4, статусы)
- ✅ UX gate criteria (`ux-validation-gate.md`)
- ✅ Provider: groomer guide, vet clinic guide, recruiting messages
- ✅ Backlog mapping artifacts → Linear (`linear-backlog-plan.md`)
- ✅ Ayla reuse audit plan (без архитектурного выбора)
- ⛔ Реальные респонденты и интервью — owner action

## Active work

- Ожидание запуска owner tests и provider interviews (оба трека готовы к старту).

## Blocked work

- Production feature code — DEVELOPMENT GATE закрыт (открывает только owner).
- Domain extraction — после UX FREEZE v0.2.
- Ayla full reuse audit — после domain extraction.
- Новые вертикалы/экраны — стоп до UX FREEZE v0.2.

## Требует реального действия владельца

1. **Набор респондентов** — рассылка recruiting messages (3 варианта готовы, `research/owner-interviews/recruiting-plan-v1.md`).
2. **Provider outreach** — отправка приглашений грумерам/клиникам (`research/provider-interviews/recruiting-messages-v1.md`).
3. **Firebase key rotation** (`docs/04-architecture/security-note-firebase-key.md`).
4. **Linear**: Team `Pet AI` (PET) + Project `Pet AI — MVP` — после создания синхронизирую backlog mapping.

## Next 3 actions

1. Owner tests (5–8 сессий) по runbook — после набора респондентов.
2. Provider interviews (грумеры + клиники) — параллельно.
3. Findings triage после первой партии (2–3 сессии) → коррекции → RETEST.

## Recent completed work

- 2026-08-30: 3 prototypes + 3 test scripts; D-01…D-17; shell matrix; commits `6fd6dd8`…`445be11`.
- 2026-08-30: UX validation ops-пакет (recruiting/runbook/template/register/gate), provider interview packs (2 гайда + сообщения), Ayla reuse audit plan, backlog mapping.

## Linear

- Ожидает ручного создания. Mapping готов: `docs/08-decisions/linear-backlog-plan.md` (PET-1…PET-11 + artifacts mapping). Альтернативный трекер не создаётся.
