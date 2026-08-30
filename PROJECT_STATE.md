# PROJECT STATE — Pet AI

> Обновляется после каждого значимого изменения. Последнее обновление: 2026-08-30 (Ayla discovery cycle 1 завершён).

## Current phase

**UX VALIDATION + PROVIDER RESEARCH** — три параллельные дорожки. Новые продуктовые решения без пользовательских данных не принимаются.

## Gates

| Gate | Статус |
|---|---|
| PRODUCT GATE | ✅ FROZEN v0.1 |
| UX GATE | ⛔ Активный: ожидает owner tests (wave 1: P-01→P-03) |
| DOMAIN GATE | ⛔ После UX FREEZE v0.2 |
| REUSE GATE | ⛔ Discovery ✅ (не binding); audit — после domain extraction |
| ARCHITECTURE GATE | ⛔ Не начат |
| DEVELOPMENT GATE | ⛔ **BLOCKED** — engineering implementation запрещён |

## TRACK A — Owner Validation

- Статус: **готов к старту, ожидает респондентов.** Wave 1 = P-01→P-03 (не ждём полного набора).
- Пакет: recruiting plan, runbook, template, register, 3 prototypes + 3 scripts.
- Данных сессий: 0. Wave-отчётов нет.
- После wave 1: session records → findings → triage (S0–S4, связь с гипотезами, evidence ≠ interpretation) → отчёт UX VALIDATION WAVE 1 владельцу. Prototype до triage не трогаем.

## TRACK B — Provider Research

- Статус: **готов к старту.** Wave 1 = 2 грумера + 1 клиника.
- Пакет: 2 interview guides + recruiting messages.
- Данных: 0. После wave 1: отчёт PROVIDER RESEARCH WAVE 1 (FACT/OBSERVATION/PATTERN/HYPOTHESIS/OPEN QUESTION), без выводов о рынке.
- Фокус-проверки: availability, instant booking, Pet Context, capabilities, completion/result, повторная запись, CRM, дублирование данных.

## TRACK C — Ayla Technical Discovery

- Статус: **cycle 1 завершён (read-only, NON-BINDING).**
- Артефакты: `docs/04-architecture/ayla-discovery-report.md` (14 областей: 12 EXISTS, 2 PARTIAL), `ayla-ai-flow.md`, `ayla-booking-flow.md`.
- Ключевые факты: memory provenance в Ayla богаче MVP-правил Pet AI; booking Ayla не имеет request mode, slot hold и completion result payload; canonical payments/reviews — во внешнем сервисе; deprecated pipeline — мёртвый код; сквозная tenant-coupling.
- Далее: аудит матрицы — только после domain extraction (REUSE GATE).

## Blocked work

- Production code, Pet DB schema, Django models, migrations, API, production frontend, vector memory, matching engine, booking implementation, Vetmanager adapter — **BLOCKED (DEVELOPMENT GATE)** даже при очевидном reuse.

## Требует действия владельца

1. Набор P-01→P-03 (recruiting messages готовы) и запуск сессий.
2. Provider outreach (2 грумера + 1 клиника).
3. Firebase key rotation (`security-note-firebase-key.md`).
4. Linear team/project (не blocker).

## Next 3 actions

1. UX VALIDATION WAVE 1 — triage после сессий P-01→P-03 (как только состоятся).
2. PROVIDER RESEARCH WAVE 1 — после интервью.
3. Track C: при появлении Linear — синхронизация backlog; discovery обновлять по запросу (per-tenant path, promptreg, replay — остались непокрытыми).

## Recent completed work

- 2026-08-30: UX validation ops pack (`083b4b3`); Ayla discovery cycle 1 (этот цикл).
- Ранее: 3 prototypes, 3 test scripts, D-01…D-17, shell matrix, security note.

## Linear

- Ожидает ручного создания Team `Pet AI (PET)` + Project `Pet AI — MVP`. Mapping готов (`linear-backlog-plan.md`, PET-1…PET-11). Не blocker.
