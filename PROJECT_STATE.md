# PROJECT STATE — Pet AI

> Обновляется после каждого значимого изменения. Последнее обновление: 2026-08-30 (решения владельца Q-01/Q-12, старт UX Prototype).

## Current phase

**UX Prototype.** Активная работа — clickable low-fi owner prototype + owner test script. Production code не начат.

## Current gate

| Gate | Статус |
|---|---|
| PRODUCT GATE | ✅ Product Concept v0.1 — FROZEN |
| UX GATE | ⛔ Активный. Low-fi prototype в работе; далее owner tests, provider tests, UX-коррекции |
| DOMAIN GATE | ⛔ Не начат (после UX GATE) |
| REUSE GATE | ⛔ Ayla reuse audit — начат read-only inventory (без аудита и рефакторинга) |
| ARCHITECTURE GATE | ⛔ Не начат |
| DEVELOPMENT GATE | ⛔ Закрыт |

## Active work

- Подготовка к owner UX tests: prototype и test script v1 готовы (ожидают Q-05 и файлы макетов).
- Grooming Care Loop prototype (PET-3) — следующий UX-артефакт.

## Blocked work

- Любой production feature code — DEVELOPMENT GATE закрыт.
- Domain model / DB schema — UX GATE + DOMAIN GATE.
- Полный Ayla reuse audit — после UX/domain requirements.
- Payments/monetization infrastructure — не блокер пилота, не начинать.

## Decisions needed (требуют владельца)

См. `docs/08-decisions/open-questions.md`. Актуальные:
1. Разместить файлы макетов DA-1…DA-4 в `designs/` (статусы назначены, файлов нет).
2. Создать в Linear: Team `Pet AI` (key `PET`) + Project `Pet AI — MVP` (MCP не умеет создавать команды/проекты). Не блокирует остальную работу.
3. Q-02: подтвердить scope доступа к Ayla для будущего аудита.
4. Q-05: источник респондентов для owner tests (5–8 владельцев собак) — понадобится к запуску тестов.

## Next 3 actions

1. Завершить clickable prototype O01→O04→H01 с учётом D-15 и test script v1.
2. Linear: после создания команды/проекта завести эпики и PET-1…PET-9 по `docs/08-decisions/linear-backlog-plan.md`.
3. Запустить owner UX tests на prototype (после решения Q-05).

## Recent completed work

- 2026-08-30: workspace, Git repo, документация v0.1 (product/research/UX/AI/marketplace/integrations/decisions).
- 2026-08-30: D-13 (статусы design artifacts, Q-01 closed), D-14 (safety boundaries FROZEN v0.1 частично, Q-12 closed), D-15 (UX-коррекции onboarding/Home); designs manifest; baseline commit `6fd6dd8`.
- 2026-08-30: clickable low-fi prototype O01→O04→H01 (`prototypes/onboarding-low-fi/`, TEST_CANDIDATE); owner UX test script v1 (`research/owner-interviews/ux-test-script-v1.md`); Ayla read-only inventory (`docs/04-architecture/ayla-reuse-inventory.md`).

## Linear

- Team **Pet AI (PET)** + проект **Pet AI — MVP**: ожидают создания владельцем в Linear UI.
- Backlog plan: `docs/08-decisions/linear-backlog-plan.md` (8 потоков, PET-1…PET-9).
