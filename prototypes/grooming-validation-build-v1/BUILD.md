# GROOMING_VALIDATION_BUILD_V1

- **Build ID:** GROOMING_VALIDATION_BUILD_V1
- **Base:** main @ `281d429`
- **Branch:** `agent/validation-ops`
- **Fixture:** `research/fixtures/grooming-validation-v1.md` v1.0
- **Date:** 2026-09-03
- **Participants:** P-01, P-03 (identical build, no S0 exception approved)
- **Final commit SHA:** фиксируется в комментарии к Linear PET-13 (см. git log ветки `agent/validation-ops`)

## How to run

Открыть `index.html` в браузере (двойной клик). Зависимостей нет: self-contained HTML/CSS/JS, без сети, backend, внешних API. Состояние сбрасывается обновлением страницы (F5).

## Flow

Onboarding (O01→O02→O03→O04→Save→Home) → G01 → G02 → G03 → G04 → G05 → TEST_ONLY_TEMPORAL_TRANSITION → G06.

Все переходы детерминированы. Booking state machine: G05 доступен только после фактического «Подтвердить запись» на G04.

## Test surface

Участник не видит screen IDs, статусы FROZEN/TEST_CANDIDATE, hypothesis IDs, fixture labels — только продуктовый UI. Внутренние ID существуют только в коде.
