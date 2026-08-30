# UX Architecture

**Status: REVIEW** (не заморожено до owner/provider tests — UX GATE)

## Основные зоны

```text
Home      — что происходит сейчас, нужно ли что-то сделать, быстрый доступ к Pet AI
History   — Timeline питомца (значимые события, не activity log)
Care      — что необходимо или рекомендовано сделать дальше
Profile   — кто питомец + Memory (что важно учитывать)
```

## AI — глобальный contextual action layer

AI — не отдельная «пятая вкладка». Это слой поверх приложения, доступный из любой зоны.

AI учитывает:

```text
active_pet
+ screen_context
+ relevant_memory
+ relevant_history
```

## Ключевые UX-принципы (см. `../00-product/product-principles.md`)

1. Pet first — питомец в центре навигации и контекста.
2. Context before questions — не переспрашивать известное.
3. Relationship before marketplace — сначала проверенный специалист.
4. AI curates, catalog is fallback — максимум 3 curated candidates.
5. Explain recommendations — объяснимые причины и trade-offs.
6. Admit uncertainty — честные статусы вместо ложной уверенности.

## Marketplace UX

Marketplace существует **после** понимания Need. UX не начинается с каталога «Ветеринары / Грумеры / Кинологи».

```text
natural user need → AI understanding → Need → provider capabilities
→ candidates (max 3) → ranking → explanation → booking
```

Для каждого кандидата: почему подходит, availability, цена, расстояние, trust, trade-off.

## Home — state-driven

Home — state-driven screen, а не dashboard из виджетов. Состояния и приоритеты — в `home.md`.

## Flows MVP

- Onboarding: `onboarding.md` (FROZEN direction).
- Grooming Care Loop: `grooming-care-loop.md`.
- Veterinary Care Loop: `veterinary-care-loop.md`.

## UX GATE — критерии выхода

До feature implementation должны существовать:

- low-fi prototype;
- owner tests (5–8 владельцев собак);
- provider tests (3–5 грумеров, 2–3 клиники);
- внесённые критические UX-коррекции.
