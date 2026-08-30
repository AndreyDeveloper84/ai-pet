# Pet AI

**Pet AI** — персональный AI-ассистент владельца питомца. Он знает конкретного питомца, хранит его историю, использует долговременный контекст и помогает владельцу пройти путь от потребности до завершённого результата: понять, что делать → подобрать специалиста → записаться → получить результат услуги → обновить Timeline / Memory / Care.

Центральная сущность продукта — **питомец и его longitudinal context**, а не каталог услуг и не чат.

## Core Care Loop

```text
PET CONTEXT → OWNER NEED → AI → CARE DECISION / NEXT BEST ACTION
→ PROVIDER → MATCHING → BOOKING → SERVICE → RESULT
→ TIMELINE → MEMORY / CARE → NEXT NEED
```

North Star — **Completed Care Loop** (см. `docs/00-product/north-star.md`).

## Статус проекта

Текущая фаза, gates и ближайшие действия — в [`PROJECT_STATE.md`](PROJECT_STATE.md).

## Структура

```text
docs/            — продукт, исследования, UX, домен, архитектура, AI, marketplace, интеграции, решения
designs/         — low-fi / approved макеты и референсы
research/        — интервью владельцев и провайдеров, findings
src/             — код (пусто до DEVELOPMENT GATE)
```

## Для агентов и контрибьюторов

Правила работы с проектом, gates и ограничения — в [`AGENTS.md`](AGENTS.md).
Журнал решений — `docs/08-decisions/decision-log.md`. Открытые вопросы — `docs/08-decisions/open-questions.md`.

## Ключевые границы MVP

- Первичный пользователь: **владелец собаки**.
- Два MVP-вертикала: **Grooming** и **Veterinary**.
- AI — не ветеринар: не ставит диагнозы, не назначает препараты (см. `docs/05-ai/safety-boundaries.md`).
- Не строим: полную CRM провайдера, аналог Vetmanager, payments-инфраструктуру, Post-MVP scope (`docs/00-product/mvp-scope.md`).
