# Hypotheses

**Status: HYPOTHESIS** (ни одна не подтверждена; не представлять как решения)

## H1 — Основная продуктовая гипотеза

> Владелец получает заметно больше пользы от AI, если AI знает историю конкретного питомца и использует её при принятии следующего решения.

**Проверка:** owner UX tests (понимают ли ценность Pet Context), затем — поведенческие метрики пилота (`memory_used_in_context`, сокращение повторных вопросов во втором+ care loop).

## H2 — Matching-гипотеза

> Contextual AI matching может быть полезнее обычного marketplace-каталога специалистов.

**Проверка:** UX tests (понимают ли AI matching, доверяют ли объяснениям), конверсия `provider_results_shown → provider_selected → booking_confirmed` у curated выдачи vs fallback-каталога.

## H3 — Retention-гипотеза

> Timeline + Memory + Care делают каждый следующий care loop короче и полезнее предыдущего.

**Проверка:** `repeat_need`, `repeat_booking`, длительность/количество шагов повторного loop vs первого, доля rebooking через previous relationship.

## Рабочая метрика

**Completed Care Loops / Active Pet** — основная метрика ценности (см. `north-star.md`).
Не оптимизировать продукт под количество AI messages.

## События аналитики для проверки

`pet_created`, `first_context_added`, `first_ai_message`, `need_detected`, `provider_results_shown`, `provider_selected`, `booking_started`, `booking_confirmed`, `service_completed`, `feedback_submitted`, `timeline_updated`, `memory_used_in_context`, `repeat_need`, `repeat_booking`.
