# Research Plan

**Status: DRAFT** (запуск — после готовности low-fi prototypes)

## Цель

Проверить гипотезы H1–H3 (`../00-product/hypotheses.md`) и пройти UX GATE до начала feature implementation.

## Треки исследований

### 1. Owner UX tests — 5–8 владельцев собак

Ключевые вопросы:

- понимают ли ценность Pet Context;
- воспринимают ли onboarding как естественный;
- понимают ли AI matching;
- доверяют ли provenance (источник/статус знаний);
- понимают ли после completed service, что Pet AI стал знать питомца лучше.

Детали: `owner-research.md`, материалы — `../../research/owner-interviews/`.

### 2. Provider interviews — 3–5 грумеров

Проверить:

- booking workflow;
- необходимый Pet Context (и его минимальный достаточный объём);
- availability;
- completion notes;
- would they use this supply flow.

Детали: `provider-research.md`, материалы — `../../research/provider-interviews/`.

### 3. Clinic interviews — 2–3 ветклиники / управляющих

Проверить:

- integration expectations;
- existing CRM (какая, что в ней живёт);
- booking flow;
- what context doctors need;
- what they refuse to duplicate outside CRM.

Детали: `provider-research.md` (секция клиник), заметки — `../07-integrations/vetmanager-notes.md`.

### 4. Competitor research

См. `competitor-research.md`. **OPEN**: не проводилось, данные не собраны.

## Порядок

1. Low-fi prototypes (onboarding, Grooming loop, Veterinary loop) — вход для тестов.
2. Owner tests → критические UX-коррекции.
3. Provider + clinic interviews (параллельно возможно).
4. Findings → `../../research/findings/` → обновление UX-документов → UX GATE review.

## Выход исследований

- Подтверждение/опровержение ключевых UX-допущений.
- Список критических UX-коррекций.
- Входные требования для DOMAIN GATE (minimum domain model).
