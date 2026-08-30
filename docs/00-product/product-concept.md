# Product Concept — Pet AI v0.1

**Status: FROZEN** (Product Gate пройден; изменения — только через decision log)

## Что это

Pet AI — персональный AI-ассистент владельца питомца, который:

- знает конкретного питомца;
- хранит и понимает его историю;
- использует долговременный контекст;
- помогает владельцу понять, что делать дальше;
- при необходимости подбирает подходящего специалиста;
- помогает записаться;
- получает результат услуги;
- обновляет Timeline / Memory / Care;
- становится полезнее с каждым завершённым взаимодействием.

**Центральная сущность продукта — питомец и его longitudinal context**, а не каталог услуг и не чат.

## Core Product Loop

```text
PET CONTEXT
    ↓
OWNER NEED
    ↓
AI
    ↓
CARE DECISION / NEXT BEST ACTION
    ↓
PROVIDER
    ↓
MATCHING
    ↓
BOOKING
    ↓
SERVICE
    ↓
RESULT
    ↓
TIMELINE
    ↓
MEMORY / CARE
    ↓
NEXT NEED
```

## Гипотезы

См. `hypotheses.md`. Кратко:

1. Контекст конкретного питомца делает AI заметно полезнее.
2. Contextual AI matching полезнее обычного marketplace-каталога.
3. Timeline + Memory + Care делают каждый следующий care loop короче и полезнее (retention).

## Первичный пользователь MVP

**Владелец собаки.** Первая UX-оптимизация — под владельцев собак. MVP не расширяется на все виды животных только потому, что архитектура это позволяет.

## Два MVP-вертикала

### A. Grooming (основной transactional vertical slice)

Пример: «Боню пора привести в порядок».

```text
Home → Pet AI → понять Need → использовать предыдущую историю
→ previous relationship → matching → provider → booking → service
→ result → feedback → Timeline → Memory / Care → rebooking
```

### B. Veterinary (stress-test с safety-границами)

Пример: «Боня второй день чешет левое ухо».

```text
Home → Pet AI → relevant history → adaptive intake → safety / urgency
→ Care Decision → veterinary matching → booking → visit
→ structured result → Care → Timeline → Memory
```

AI НЕ является ветеринаром. Границы — в `../05-ai/safety-boundaries.md`.

## Pet Core — продуктовая модель

```text
PET
├── Profile        — кто питомец (имя, вид, порода, возраст, пол, вес, фото, базовые данные)
├── Timeline       — что происходило (значимые события жизни, НЕ activity log)
├── Memory         — что сейчас важно учитывать (≠ Timeline)
├── Current State  — что актуально прямо сейчас
└── Care           — что необходимо или рекомендовано сделать дальше
```

## Monetization (концепт)

Минимальная проверяемая цепочка: `Need → Booking → Completed Service`.
Потенциальная первая модель: **commission/acquisition fee** за нового приведённого клиента.
Payments, payouts, refunds и commission infrastructure — **НЕ блокер** первого UX/technical pilot.

## Чего Pet AI не является

- Не marketplace-каталог услуг (каталог — fallback).
- Не чат-бот ради чата (AI — contextual action layer).
- Не ветеринарный сервис / не telemedicine.
- Не замена Vetmanager / клинической CRM.
- Не CRM для провайдеров.

Полный список Out of MVP — в `mvp-scope.md`.
