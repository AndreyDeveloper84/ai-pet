# AI Role

**Status: REVIEW**

## Позиционирование

AI — **глобальный contextual action layer** поверх приложения, а не отдельная «пятая вкладка» и не чат ради чата.

AI учитывает:

```text
active_pet + screen_context + relevant_memory + relevant_history
```

## Что делает AI

- Понимает потребность владельца (Need) на естественном языке.
- Использует контекст питомца до вопросов (Context before questions).
- Извлекает данные из free-text/голоса (onboarding O03) и показывает их до сохранения (O04).
- Формирует Care Decision / Next Best Action.
- Курирует кандидатов (max 3) с объяснениями (AI curates, catalog is fallback).
- В Veterinary loop: adaptive intake, уровень срочности, red flags, рекомендация обращения.
- Структурирует результаты услуг/визитов в Timeline/Memory/Care с provenance.
- Фиксирует AI observations (source=AI_OBSERVATION) — как наблюдения, не факты.

## Чего AI не делает

- Не ставит диагноз, не назначает и не меняет препараты (см. `safety-boundaries.md`).
- Не выдаёт inference за подтверждённый медицинский факт.
- Не переспрашивает то, что система уже знает и считает актуальным.
- Не показывает бессмысленные скоринги («96% match» без объяснения).
- Не скрывает неопределённость (Admit uncertainty).

## Мера успеха AI

Вклад в Completed Care Loops / Active Pet, а не количество AI messages.
