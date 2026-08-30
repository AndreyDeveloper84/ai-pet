# Context Policy

**Status: REVIEW**

## Что входит в контекст AI

```text
active_pet
+ screen_context
+ relevant_memory
+ relevant_history
```

Релевантность важнее полноты: AI получает релевантный контекст, а не всю базу.

## Context before questions

Система не спрашивает пользователя о том, что уже знает и считает актуальным (status=CURRENT). Данные со status=UNCERTAIN могут уточняться — явно и с объяснением, почему спрашиваем.

## Memory — правила MVP

Каждое существенное знание:

```text
value
category
source        — OWNER | PROVIDER | DOCUMENT | CLINIC | AI_OBSERVATION
source_date
status        — CURRENT | UNCERTAIN | OUTDATED | DISPROVEN
```

Примеры:

```text
Боится сильной сушки              source=OWNER           status=CURRENT
Возможная реакция на курицу       source=OWNER           status=UNCERTAIN
Вес вырос 12.1 → 13.1 кг за 6 мес source=AI_OBSERVATION  (наблюдение, не диагноз)
```

AI observation НЕ превращается в медицинский факт.

## Timeline — правила

Timeline хранит **значимые события жизни питомца**: наблюдение владельца, ветеринарный визит, груминг, вакцинация, анализ, лекарство, лечение, измерение веса, документ, completed provider service.

Не кладём в Timeline: просмотр экрана, поиск, AI message, booking lock, технический webhook, retry, notification delivery. Это audit/system data.

## Minimum relevant context для провайдеров

Специалист получает только необходимый и **разрешённый владельцем** контекст. Грумер ≠ врач: набор полей зависит от `Provider × Pet × Need`. Точный состав — уточняется provider research.

## Provenance everywhere

Для значимых данных всегда: что известно, источник, дата, статус. Показываем пользователю, где это добавляет доверие (onboarding O04, Memory, structured result).
