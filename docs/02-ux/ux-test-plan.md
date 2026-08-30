# UX Test Plan

**Status: DRAFT** (запуск — после low-fi prototypes; вход в UX GATE)

## Цель

Пройти UX GATE: подтвердить ключевые UX-допущения до feature implementation.

## Состав тестов

### 1. Owner tests (5–8 владельцев собак)

Сценарии на low-fi prototype:

| # | Сценарий | Что проверяем |
|---|---|---|
| T1 | Onboarding O01→O04→Home | Естественность, понимание provenance на O04 |
| T2 | Grooming loop до booking | Context before questions, понимание matching и объяснений |
| T3 | После completed service | Видит ли владелец обогащение Pet Context (Timeline/Memory) |
| T4 | Repeat need | Ощущается ли второй loop короче |
| T5 | Veterinary loop (часть респондентов) | Доверие при честных границах AI, понимание urgency и UNCERTAIN |

Ключевые вопросы — в `../01-research/owner-research.md`.

### 2. Provider tests (3–5 грумеров)

- PR01/PR02 flows: booking, allowed Pet Context, completion notes.
- Гайд — `../01-research/provider-research.md` (трек A).

### 3. Clinic interviews (2–3)

- Integration expectations, CRM, booking flow, контекст для врача.
- Гайд — `../01-research/provider-research.md` (трек B).

## Критерии прохождения UX GATE

- Владельцы понимают ценность Pet Context (H1 — качественно).
- Владельцы понимают AI matching и объяснения рекомендаций (H2 — качественно).
- Provenance вызывает доверие, а не confusion.
- Провайдеры подтверждают реалистичность supply flow.
- Критические UX-коррекции выявлены и внесены в документы/prototype.

## Выход

- Findings → `../../research/findings/`.
- Обновлённые UX-документы (статусы REVIEW → уточнённые).
- Входные требования для DOMAIN GATE.

## Открыто

- Методика (модерируемые сессии онлайн/офлайн), инструмент прототипа, источник респондентов — **OPEN QUESTION**.
