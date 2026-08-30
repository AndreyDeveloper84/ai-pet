# Provider Model

**Status: REVIEW**

## Common provider core

```text
Identity
Provider Type
Services
Capabilities
Location
Availability
Pricing
Trust
Reviews
Booking Rules
```

## Контекстный профиль

Профиль provider зависит от контекста: **Provider × Pet × Need**.

### Грумер

- портфолио;
- релевантный опыт;
- породы, с которыми работает;
- особенности ухода (например, работа с тревожными собаками).

### Ветеринар

- образование;
- специализация;
- профессиональная верификация;
- клиника.

## Что провайдер получает о питомце

Minimum relevant context, разрешённый владельцем. Состав зависит от типа провайдера и Need; уточняется provider research (`../01-research/provider-research.md`).

## Что провайдер возвращает

Result/recommendation после completed service → возвращается в Pet Context (Timeline/Memory/Care, source=PROVIDER). Принцип: Result returns to Pet.

## Out of scope

Полноценная CRM для провайдера не строится (см. `../00-product/mvp-scope.md`).
