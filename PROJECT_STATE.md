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

- Статус: **готов к старту, ожидает респондентов.** Wave 1: P-01 (A+Grooming), P-02 (A+Veterinary), P-03 (A+Grooming) → стоп, triage. Wave 2 (после triage): P-04 Vet, P-05 Grooming, P-06 Vet; P-07/P-08 — только для доп. данных/RETEST.
- Правило волны: onboarding проходят все; один основной Care Loop на участника в Wave 1 (нет Grooming+Veterinary подряд — обучение механике загрязняет второй loop); prototypes не менять между P-01…P-03 (кроме S0, делающего тест небезопасным).
- Пакет: recruiting plan, runbook (схема волн), template, register, 3 prototypes + 3 scripts.
- Данных сессий: 0. После P-03: triage → отчёт UX VALIDATION WAVE 1 (Finding | Evidence | Frequency | Severity | Hypothesis | Recommendation; отдельно S0, S1, repeated S2). Prototype до triage не трогаем.

## TRACK B — Provider Research

- Статус: **готов к старту.** Wave 1: PR-G01, PR-G02 (грумеры), PR-V01 (клиника).
- Пакет: 2 interview guides + recruiting messages.
- Данных: 0. После трёх: synthesis → отчёт PROVIDER RESEARCH WAVE 1 (FACT / OBSERVATION / PATTERN / HYPOTHESIS / OPEN QUESTION), противоречия с prototypes, operational constraints, hypotheses affected. Product автоматически не менять.
- Фокус-проверки: availability, instant booking, Pet Context, capabilities, completion/result, повторная запись, CRM, дублирование данных.

## TRACK C — Ayla Technical Discovery

- Статус: **PAUSE.** Cycle 1 завершён; углубление (promptreg, replay, Telegram/web, per-tenant path) — только по конкретному вопросу из UX validation / provider research / DOMAIN GATE / REUSE GATE.
- Артефакты: `ayla-discovery-report.md`, `ayla-ai-flow.md`, `ayla-booking-flow.md` (все DISCOVERY / NON-BINDING).
- Зафиксировано: preliminary reuse hypotheses в `ayla-reuse-audit-plan.md` (HYPOTHESES, не решения): strong candidates — AI core, memory provenance, scheduling resolver, booking concurrency, eventbus, observability; pet-specific/new — Pet domain, Timeline, Current State, Care, Care Decision, provider result lifecycle; careful generalization — Provider, capabilities, discovery, tenancy, conversations.

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
