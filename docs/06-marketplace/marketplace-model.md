# Marketplace Model

**Status: REVIEW**

## Позиция marketplace в продукте

Marketplace существует **после понимания Need**. Это не точка входа.

```text
natural user need
→ AI understanding
→ Need
→ provider capabilities
→ candidates
→ ranking
→ explanation
→ booking
```

## Правила выдачи

- Первичная выдача: **максимум 3 AI-curated candidates**.
- Для каждого кандидата: почему подходит, availability, цена, расстояние, trust, trade-off.
- Полный каталог — fallback (принцип: AI curates, catalog is fallback).
- Previous relationship проверяется до общего matching (Relationship before marketplace).

## Supply side

- Provider side MVP: receive booking → minimum relevant allowed Pet Context → complete service → result/recommendation.
- Реализация: simple web UI / Pet AI provider UI / external integration — решается позже, не блокер UX.
- Не строим: payroll, warehouse, staff management, full CRM, complex analytics, marketing automation.

## Monetization (контекст)

Потенциальная первая модель: commission/acquisition fee за нового приведённого клиента. Payments/payouts/refunds — не блокер первого пилота (см. `../00-product/mvp-scope.md`).
