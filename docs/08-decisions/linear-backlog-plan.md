# Linear Backlog Plan — Pet AI — MVP

**Status: SYNCHRONIZED 2026-08-30** (Team `Pet AI` / key `PET` / Project `Pet AI — MVP`; issues созданы, статусы и dependencies выставлены)

> **Канонические ID.** Linear — operational source of truth для статусов/backlog. План-era номера (PET-1…PET-11 ниже в этом документе) заменены реальными Linear IDs — см. таблицу соответствия в конце. Все ссылки «Linear PET-x» в остальных документах репозитория относятся к план-era нумерации и читаются через эту таблицу.

## Принципы

- Pet AI — самостоятельный продукт. Ayla и MarketPlace — источники reuse/интеграций, их backlog не смешивается с Pet AI.
- Не создавать сотни задач. Одна задача на flow, а не на каждый UI state.
- Product Foundation и UX/Research приоритетнее feature development.
- Каждая UX-задача: цель, scenario, acceptance criteria, linked mockups, related decisions, open questions.

## Структура

- **Team:** Pet AI (`PET`)
- **Project:** Pet AI — MVP
- **Эпики/потоки** (parent issues или labels — уточнить при создании):

```text
Product Foundation
UX Prototype
Owner Research
Provider Research
Ayla Reuse Audit
Technical Foundation
MVP Vertical Slice
Pilot
```

Приоритет на старте: Product Foundation, UX Prototype, Owner/Provider Research.

---

## Issues

### PRODUCT FOUNDATION

**PET-1. Freeze Pet AI Product Concept v0.1**
- Цель: убедиться, что документация отражает принятый scope и Post-MVP boundaries.
- Acceptance criteria: `docs/00-product/*` созданы, статусы проставлены, decision log D-01..D-12 зафиксирован, open questions заведены.
- Статус: фактически выполнено в первой сессии (2026-08-30) — закрыть после ревью владельцем.
- Related: D-09, `docs/00-product/product-concept.md`.

### UX PROTOTYPE

**PET-2. Finalize onboarding low-fi**
- Flow: `O01 → O02 → O03 → O04 → H01`.
- Учитывать принятые UX-коррекции: free-text/голос на O03, AI показывает извлечённое до сохранения (O04), спорное ≠ факт (provenance).
- Acceptance criteria: low-fi всех 5 состояний; готов к owner tests.
- Related: `docs/02-ux/onboarding.md` (FROZEN direction), Q-06 (инструмент), Q-07 (поля O02).
- Linked mockups: `designs/low-fi/` (пока пусто).

**PET-3. Build Grooming Care Loop prototype**
- Flow: `Home → AI → previous relationship → matching → provider → booking → result → feedback → Timeline`.
- Acceptance criteria: max 3 curated candidates с объяснениями и trade-offs; занятый слот → альтернативы; loop closing виден владельцу (Timeline/Memory обновились).
- Related: `docs/02-ux/grooming-care-loop.md`, `docs/06-marketplace/matching-principles.md`, D-03, D-04.

**PET-4. Build Veterinary stress-test prototype**
- Тот же shell + `intake → urgency → care decision → medical result`.
- Acceptance criteria: AI не ставит диагноз; red flags → явная рекомендация; неопределённость отображается честно; structured result с источником.
- Related: `docs/02-ux/veterinary-care-loop.md`, `docs/05-ai/safety-boundaries.md`, D-06, Q-12.

### OWNER RESEARCH

**PET-5. Run owner UX tests**
- 5–8 владельцев собак на low-fi prototypes (PET-2..PET-4).
- Вопросы: ценность Pet Context; естественность onboarding; понимание AI matching; доверие к provenance; видят ли обогащение знаний после completed service.
- Acceptance criteria: findings в `research/findings/`; список критических UX-коррекций; коррекции внесены.
- Related: `docs/01-research/owner-research.md`, `docs/02-ux/ux-test-plan.md`, Q-05.
- Блокирует: UX GATE.

### PROVIDER RESEARCH

**PET-6. Run provider interviews (groomers)**
- 3–5 грумеров: booking workflow, необходимый Pet Context, availability, completion notes, would they use this supply flow.
- Acceptance criteria: findings; must-have поля Pet Context для provider side; решение по request mode (Q-10).
- Related: `docs/01-research/provider-research.md` (трек A).

**PET-7. Run clinic interviews**
- 2–3 ветклиники/управляющих: integration expectations, existing CRM, booking flow, контекст для врача, что не дублируют вне CRM.
- Acceptance criteria: findings; уточнённый `docs/07-integrations/vetmanager-notes.md`; Q-09 закрыт.
- Related: D-08.

### AYLA REUSE AUDIT

**PET-8. Perform Ayla reuse audit**
- Выполняется **после UX requirements** (REUSE GATE). Не начинать масштабный рефакторинг.
- Matrix: `REUSE AS IS / EXTEND / GENERALIZE / PET ONLY / DO NOT REUSE`.
- Scope проверки: auth, users, booking, availability, notifications, events/outbox, AI core, conversations, context, memory, provider models, reviews, payments.
- Acceptance criteria: заполненная matrix с обоснованиями; вход для ARCHITECTURE GATE.
- Related: Q-02 (доступ к Ayla codebase), `docs/04-architecture/README.md`.

### TECHNICAL FOUNDATION

**PET-9. Reversible technical foundation**
- Разрешено до gates: repo/workspace ✔, Git ✔, README/AGENTS ✔, lint/test tooling, CI skeleton, basic application shell, environment, mock API boundaries.
- Запрещено: финальная DB schema, массовые migrations, booking domain заново, payments, production Vetmanager integration, сложная Memory architecture.
- Acceptance criteria: tooling/CI настроены без привязки к неподтверждённому UX; без feature code.
- Related: `AGENTS.md` §5, Q-03.

### MVP VERTICAL SLICE

_(эпик-контейнер; issues создаются после DEVELOPMENT GATE — порядок slices зафиксирован в `AGENTS.md` §6)_

### PILOT

_(эпик-контейнер; наполняется после прохождения gates)_

---

## Зависимости gates

```text
PET-1 (✔ draft) → PET-2..4 → PET-5..7 → UX GATE → DOMAIN GATE → PET-8 (REUSE GATE)
→ ARCHITECTURE GATE → DEVELOPMENT GATE → MVP Vertical Slice → Pilot
```

## Ссылки на макеты

- `designs/low-fi/` — прикладывать к PET-2/3/4 по мере готовности.
- `designs/references/` — существующие макеты (Q-01: не предоставлены).

---

## Обновление 2026-08-30 — UX Validation + Provider Research

### Новые/уточнённые задачи (заводить после создания Linear)

**PET-5. Run owner UX tests** (уточнено)
- Вход: recruiting plan ✅, runbook ✅, 3 prototypes ✅, 3 scripts ✅, findings register ✅.
- Acceptance criteria: 5–8 сессий по runbook; findings занесены и TRIAGED; критерии `docs/02-ux/ux-validation-gate.md` оценены.
- Артефакты: `research/owner-interviews/*`, `research/findings/ux-findings-register.md`.

**PET-5b. Triage findings + UX corrections** (новая)
- После первой партии сессий (2–3): triage S0–S2, коррекции prototypes, RETEST.
- Acceptance criteria: нет открытых S0; повторяющиеся S1 закрыты.

**PET-5c. UX FREEZE v0.2** (новая, решение владельца)
- Критерии: `docs/02-ux/ux-validation-gate.md`. Фиксация в decision log.

**PET-6. Run provider interviews (groomers)** (уточнено)
- Вход: `groomer-interview-guide-v1.md` ✅, recruiting messages ✅.
- Acceptance criteria: 3–5 интервью; must-have Pet Context fields; решение по Q-10 (request vs instant).

**PET-7. Run clinic interviews** (уточнено)
- Вход: `vet-clinic-interview-guide-v1.md` ✅.
- Acceptance criteria: 2–3 интервью; фактическая CRM-картина (Q-09); требования к интеграции; форма medical result.

**PET-10. Domain extraction** (новая, после UX FREEZE v0.2)
- Minimum domain model из подтверждённых UX flows (Pet Core, Care Decision, booking lifecycle, provider core).

**PET-11. Ayla reuse audit** (бывш. PET-8; вход: `docs/04-architecture/ayla-reuse-audit-plan.md` ✅, после PET-10)

### Artifacts → future Linear mapping

| Артефакт | Linear issue |
|---|---|
| `prototypes/onboarding-low-fi/` (DA-5) | PET-2 |
| `prototypes/grooming-loop-low-fi/` (DA-6) | PET-3 |
| `prototypes/veterinary-loop-low-fi/` (DA-7) | PET-4 |
| `ux-test-script-v1.md` | PET-2, PET-5 |
| `ux-test-script-grooming-v1.md` | PET-3, PET-5 |
| `ux-test-script-veterinary-v1.md` | PET-4, PET-5 |
| `recruiting-plan-v1.md`, `session-runbook-v1.md`, `session-template.md` | PET-5 |
| `ux-findings-register.md` | PET-5, PET-5b (живой артефакт, линк в обеих) |
| `ux-validation-gate.md` | PET-5c |
| `groomer-interview-guide-v1.md` | PET-6 |
| `vet-clinic-interview-guide-v1.md` | PET-7 |
| `provider-interviews/recruiting-messages-v1.md` | PET-6, PET-7 |
| `ayla-reuse-inventory.md` | PET-11 |
| `ayla-reuse-audit-plan.md` | PET-11 |
| `security-note-firebase-key.md` | отдельный operational issue у владельца (вне Pet AI backlog — касается Ayla workspace) |
| `ux-shell-matrix.md` | PET-10 (вход для domain extraction) |

---

## RECONCILIATION 2026-08-30 — реальные Linear IDs (канонические)

Team: `Pet AI` (key `PET`) · Project: `Pet AI — MVP`. Статусы выставлены по факту; dependencies проставлены на критическом пути.

### Critical path

`PET-13 Owner Validation Wave 1` → `PET-16 Triage & Corrections` → `PET-17 UX FREEZE v0.2` → `PET-18 Domain Extraction` → `PET-19 Ayla Reuse Audit` → `PET-20 Minimum Viable Architecture` → `PET-21 Open Development Gate` → `PET-22 Pet Context Foundation` → `PET-23 Controlled Pilot`

### Все issues

| Linear ID | Title | Status | Streams (эпики) |
|---|---|---|---|
| PET-1…PET-8 | Stream: Product Foundation / UX Prototype / Owner Research / Provider Research / Ayla Reuse Audit / Technical Foundation / MVP Vertical Slice / Pilot | контейнеры (PET-3, PET-4 In Progress) | — |
| PET-15 | Freeze Pet AI Product Concept v0.1 | **Done** | Product Foundation |
| PET-9 | Finalize onboarding low-fi (O01→O04→H01) | **Done** (prototype ready ≠ validated) | UX Prototype |
| PET-10 | Build Grooming Care Loop prototype | **Done** (ready for validation) | UX Prototype |
| PET-11 | Build Veterinary stress-test prototype | **Done** (ready for validation) | UX Prototype |
| PET-12 | Ayla Technical Discovery (Cycle 1) | **Done** (NON-BINDING) | Ayla Reuse Audit |
| PET-13 | Owner Validation Wave 1 (P-01→P-03) | **In Progress** (external: live respondents) | Owner Research |
| PET-14 | Provider Research Wave 1 (PR-G01/G02, PR-V01) | **In Progress** (external: outreach) | Provider Research |
| PET-16 | Owner Validation Wave 1 — Triage & Corrections | Todo (blocked by PET-13) | Owner Research |
| PET-17 | UX FREEZE v0.2 | Todo (blocked by PET-13, PET-16) | Owner Research |
| PET-18 | Extract Pet AI Domain v0.1 | Todo (blocked by PET-17) | Technical Foundation |
| PET-19 | Ayla Reuse Audit | Todo (blocked by PET-18) | Ayla Reuse Audit |
| PET-20 | Define Minimum Viable Architecture | Todo (blocked by PET-18, PET-19) | Technical Foundation |
| PET-21 | Open Development Gate | Todo (blocked by PET-20) | Technical Foundation |
| PET-22 | Pet Context Foundation (vertical slice 1) | Todo (blocked by PET-21) | MVP Vertical Slice |
| PET-23 | Controlled Pilot | Backlog | Pilot |
| PET-24 | Rotate potentially exposed Ayla Firebase service-account credential | Todo (owner action; не блокирует UX validation) | security |

Примечание: Linear MCP не применил parent-issue связи (игнорированы API'ем) — потоки существуют как `Stream:` issues; реальная структура — через dependencies и принадлежность к проекту. Иерархия намеренно не форсировалась.

### Соответствие план-era ID → реальные Linear ID

| План-era | Реальный |
|---|---|
| PET-1 (freeze concept) | PET-15 |
| PET-2 (onboarding) | PET-9 |
| PET-3 (grooming prototype) | PET-10 |
| PET-4 (veterinary prototype) | PET-11 |
| PET-5 (owner tests) | PET-13 (+ PET-16 triage) |
| PET-5b (triage) | PET-16 |
| PET-5c (UX FREEZE) | PET-17 |
| PET-6 (groomers) | PET-14 |
| PET-7 (clinics) | PET-14 |
| PET-8 / PET-11 (reuse audit) | PET-19 (discovery: PET-12) |
| PET-9 (tech foundation) | PET-18 / PET-20 / PET-21 |
| PET-10 (domain extraction) | PET-18 |

### Artifacts → Linear (актуальный mapping)

| Артефакт | Linear |
|---|---|
| `prototypes/onboarding-low-fi/` (DA-5) | PET-9 |
| `prototypes/grooming-loop-low-fi/` (DA-6) | PET-10 |
| `prototypes/veterinary-loop-low-fi/` (DA-7) | PET-11 |
| `ux-test-script-v1.md` / `-grooming-v1.md` / `-veterinary-v1.md` | PET-9 / PET-10 / PET-11 + PET-13 |
| `recruiting-plan-v1.md`, `session-runbook-v1.md`, `session-template.md` | PET-13 |
| `ux-findings-register.md` | PET-13, PET-16 |
| `ux-validation-gate.md` | PET-17 |
| `groomer-interview-guide-v1.md`, `vet-clinic-interview-guide-v1.md`, `recruiting-messages-v1.md` | PET-14 |
| `ayla-discovery-report.md`, `ayla-ai-flow.md`, `ayla-booking-flow.md` | PET-12 |
| `ayla-reuse-audit-plan.md` | PET-19 |
| `security-note-firebase-key.md` | PET-24 |
| `ux-shell-matrix.md` | PET-18 |
