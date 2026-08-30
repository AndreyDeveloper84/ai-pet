# Provider Research

**Status: DRAFT** (не проводилось)

## Трек A: Groomers — 3–5 грумеров

### Цель

Проверить supply side MVP: реалистичен ли поток receive booking → Pet Context → complete service → result.

### Вопросы

1. Booking workflow: как сейчас принимают записи? Что сломается/улучшится?
2. Pet Context: какая информация о питомце реально нужна перед услугой? Что из этого — must have, что — шум? (проверка принципа minimum relevant context)
3. Availability: как ведут расписание? Готовы ли отдавать слоты внешней системе?
4. Completion notes: что готовы заполнить после услуги? В каком объёме и формате?
5. Would they use this supply flow: готовы ли получать клиентов через Pet AI? На каких условиях?

## Трек B: Clinics — 2–3 ветклиники / управляющих

### Цель

Проверить стратегическую модель интеграции: Pet AI оркестрирует owner experience и booking, клиника продолжает работать в своей CRM (Vetmanager или другой).

### Вопросы

1. Integration expectations: какой уровень интеграции ожидают/допускают?
2. Existing CRM: что используют, что в ней живёт, какие есть API/экспорты?
3. Booking flow: как записывают сейчас, где узкие места?
4. What context doctors need: какой контекст о питомце нужен врачу до приёма?
5. What they refuse to duplicate outside CRM: что категорически не будут вести в двух системах?

### Выход

- Уточнение `../07-integrations/vetmanager-notes.md`.
- Список must-have полей Pet Context для provider side MVP.

## Артефакты

Заметки → `../../research/provider-interviews/`. Синтез → `../../research/findings/`.

## Результаты

_Не заполнено — интервью не проводились._
