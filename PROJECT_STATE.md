# PROJECT STATE — Pet AI

> Обновляется после каждого значимого изменения. Последнее обновление: 2026-08-30 (Grooming loop prototype + security note).

## Current phase

**UX Prototype.** Onboarding и Grooming Care Loop prototypes готовы (TEST_CANDIDATE). Production code не начат.

## Current gate

| Gate | Статус |
|---|---|
| PRODUCT GATE | ✅ Product Concept v0.1 — FROZEN |
| UX GATE | ⛔ Активный. Prototypes: onboarding ✅, grooming ✅. Далее: veterinary prototype, owner tests, provider tests, UX-коррекции |
| DOMAIN GATE | ⛔ Не начат (после UX GATE) |
| REUSE GATE | ⛔ Read-only inventory выполнен; audit — после UX/domain requirements |
| ARCHITECTURE GATE | ⛔ Не начат |
| DEVELOPMENT GATE | ⛔ Закрыт |

## Active work

- Veterinary stress-test prototype (PET-4) — следующий UX-артефакт.
- Подготовка к owner UX tests: 2 prototypes + 2 test scripts готовы (ожидают Q-05, не блокирует).

## Blocked work

- Любой production feature code — DEVELOPMENT GATE закрыт.
- Domain model / DB schema — UX GATE + DOMAIN GATE.
- Полный Ayla reuse audit — REUSE GATE.
- Payments/monetization infrastructure — не блокер пилота, не начинать.

## Decisions needed (требуют владельца)

См. `docs/08-decisions/open-questions.md`. Актуальные:
1. **Security:** rotation/revocation Firebase service-account key (см. `docs/04-architecture/security-note-firebase-key.md`). Экспозиция в git не подтверждена, но credential с апреля лежит в dev-workspace — рекомендована ротация.
2. Создать в Linear: Team `Pet AI` (key `PET`) + Project `Pet AI — MVP`. Не блокирует.
3. Q-05: источник респондентов для owner tests — к запуску тестов.
4. Файлы макетов DA-1…DA-4 — EXPECTED / NOT MATERIALIZED, не блокирует.

## Next 3 actions

1. Veterinary stress-test prototype (intake → urgency → care decision → structured result).
2. Linear: после создания команды/проекта завести эпики и PET-1…PET-9.
3. Owner UX tests на двух prototypes (после Q-05).

## Recent completed work

- 2026-08-30: workspace + документация v0.1; D-01…D-15; designs manifest; commits `6fd6dd8`, `07ddf5c`.
- 2026-08-30: Grooming Care Loop clickable prototype (11 состояний, `prototypes/grooming-loop-low-fi/`, TEST_CANDIDATE DA-6) + `ux-test-script-grooming-v1.md` (гипотезы H1–H5).
- 2026-08-30: security check Firebase JSON (metadata/git only) → `security-note-firebase-key.md`; Ayla read-only inventory; screen-inventory выровнен с prototypes.

## Linear

- Team **Pet AI (PET)** + проект **Pet AI — MVP**: ожидают создания владельцем в Linear UI.
- Backlog plan: `docs/08-decisions/linear-backlog-plan.md` (8 потоков, PET-1…PET-9).
