# PROJECT STATE — Pet AI

> Обновляется после каждого значимого изменения. Последнее обновление: 2026-08-30 (Veterinary prototype → UX VALIDATION PREP).

## Current phase

**UX VALIDATION PREP.** Все 3 prototypes и 3 test scripts готовы. Новые вертикалы не начинаем. Production code не начат.

## Current gate

| Gate | Статус |
|---|---|
| PRODUCT GATE | ✅ Product Concept v0.1 — FROZEN |
| UX GATE | ⛔ Активный. Prototypes: onboarding ✅ grooming ✅ veterinary ✅. Далее: owner tests → provider interviews → UX corrections → UX FREEZE v0.2 |
| DOMAIN GATE | ⛔ Не начат (после UX FREEZE v0.2; вход: domain extraction) |
| REUSE GATE | ⛔ Read-only inventory ✅; audit — после domain extraction |
| ARCHITECTURE GATE | ⛔ Не начат |
| DEVELOPMENT GATE | ⛔ Закрыт |

## Готовность к UX validation (чеклист раздела 14)

- ✅ onboarding prototype (DA-5) + test script v1
- ✅ grooming prototype (DA-6) + test script grooming v1
- ✅ veterinary prototype (DA-7) + test script veterinary v1
- ✅ screen inventory (с V-экранами и конвенцией ID, D-17)
- ✅ design manifest (DA-1…DA-7)
- ✅ open questions актуальны
- ✅ UX shell reuse matrix (common vs grooming/vet-specific)
- ⛔ респонденты для owner tests (Q-05)

## Active work

- Подготовка к owner tests: набор из 3 prototypes + 3 scripts готов.
- Ожидание: Q-05 (респонденты), Linear team/project (manual), Firebase key rotation (owner).

## Blocked work

- Любой production feature code — DEVELOPMENT GATE закрыт.
- Domain model / DB schema — после UX FREEZE v0.2.
- Полный Ayla reuse audit — после domain extraction.
- Новые product verticals — стоп до UX FREEZE v0.2 (решение владельца).

## Decisions needed (требуют владельца)

1. **Security:** rotation/revocation Firebase key (`docs/04-architecture/security-note-firebase-key.md`) — operational blocker, UX не блокирует.
2. Linear: Team `Pet AI` (PET) + Project `Pet AI — MVP` — manual action; артефакты фиксируются в docs/backlog plan, синхронизация после появления Linear.
3. Q-05: источник респондентов (5–8 владельцев собак) — последний блокер owner tests.
4. DA-1…DA-4 — EXPECTED / NOT MATERIALIZED, не блокирует.

## Next 3 actions

1. Owner tests на 3 prototypes (после Q-05).
2. Provider interviews (грумеры 3–5, клиники 2–3) — параллельно, можно начинать по гайдам `docs/01-research/provider-research.md`.
3. После результатов: UX corrections → UX FREEZE v0.2 → domain extraction.

## Recent completed work

- 2026-08-30: workspace + docs v0.1; D-01…D-17; designs manifest; commits `6fd6dd8`, `07ddf5c`, `d33f054`.
- 2026-08-30: Veterinary Care Loop prototype v2 (13 экранов: VAI01→VAI02 sequential intake→VAI03 Care Decision + VAI03-E emergency→VM01/VM02→VB01/VB02→VR01 Doctor Result|Pet AI Explanation→VC01 Care Plan→HIST01→H01'; urgency states OBSERVATION/PLANNED_VISIT/TODAY/EMERGENCY) + test script veterinary v1 (V1–V7).
- 2026-08-30: UX shell reuse matrix; D-16 (Care Decision entity + urgency states + emergency invariant); D-17 (конвенция ID экранов); security note Firebase key.

## Linear

- Team **Pet AI (PET)** + проект **Pet AI — MVP**: ожидают создания владельцем в Linear UI.
- Backlog plan: `docs/08-decisions/linear-backlog-plan.md` (8 потоков, PET-1…PET-9). Новые артефакты (DA-6, DA-7, vet/grooming scripts) фиксируются здесь до синхронизации.
