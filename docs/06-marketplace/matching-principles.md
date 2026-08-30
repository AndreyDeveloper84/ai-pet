# Matching Principles

**Status: REVIEW**

## Подход

Explainable **deterministic** matching. Не ML ranking.

## Hard filters (отсекают)

```text
provider type
service/capability
pet compatibility
location
availability
```

## Soft signals (ранжируют)

```text
previous relationship
relevant experience
rating
distance
price fit
owner preferences
```

## Правила

- **Previous relationship** — сильный сигнал, но НЕ может победить отсутствие необходимой компетенции (hard filter важнее).
- Максимум 3 AI-curated candidates в первичной выдаче.
- Каждая рекомендация объяснима: почему подходит, какие реальные данные использованы, какие trade-offs.
- Никаких «96% match» без прозрачного смысла.
- При недостатке данных для уверенного ranking — признаём неопределённость, а не имитируем точность.
- При urgency (Veterinary loop) — availability/скорость получает приоритет в ранжировании.

## Связь с гипотезами

H2 (contextual AI matching > каталог) проверяется на owner tests и конверсиях curated vs fallback.
