# Linear Backlog Plan — Pet AI — MVP

**Status: DRAFT** (ожидает создания команды Pet AI / проекта Pet AI — MVP владельцем; после создания — issues заводятся по этому плану)

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
