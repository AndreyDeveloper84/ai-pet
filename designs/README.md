# designs/ — Design Artifacts Manifest

**Status: живой manifest (D-13). Обновлять при добавлении/смене статуса артефактов.**

## Статусы design artifacts

| Status | Значение |
|---|---|
| `REFERENCE` | Существующий визуальный материал. Источник идей, НЕ утверждён. Нельзя реализовывать как есть. |
| `TEST_CANDIDATE` | Кандидат для owner/provider UX-тестов. Не утверждён; тестируем, чтобы решить. |
| `APPROVED` | Подтверждён UX-тестами + решением владельца. Может быть входом для реализации. |
| `SUPERSEDED` | Заменён более новым вариантом. Хранится для истории, не использовать. |

## Правила

1. Никакой артефакт не является APPROVED по умолчанию — только после UX-тестов и явного решения владельца (фиксируется в decision log).
2. Промоушн `TEST_CANDIDATE → APPROVED` требует: результаты тестов в `research/findings/` + запись в decision log.
3. Устаревший вариант → `SUPERSEDED` (не удалять).
4. Каждый артефакт привязан к Linear issue (UX-задаче) и/или UX-документу.
5. Файлы: `low-fi/` — рабочие варианты и прототипы; `approved/` — утверждённые; `references/` — исходные материалы.
6. Имя файла: `{flow-or-screen}_{variant}_{date}` (например, `onboarding_v3_2026-08.png`).

## Inventory

| # | Артефакт | Расположение | Status | Связь | Примечание |
|---|---|---|---|---|---|
| DA-1 | Home с крупным фото питомца | `references/` — EXPECTED / NOT MATERIALIZED | REFERENCE | UX: Home (`docs/02-ux/home.md`) | Исходник не в workspace; не реконструировать |
| DA-2 | Home для нескольких питомцев | `references/` — EXPECTED / NOT MATERIALIZED | REFERENCE | UX: Home, состояние MULTI_PET | Исходник не в workspace |
| DA-3 | Предыдущие визуальные концепты | `references/` — EXPECTED / NOT MATERIALIZED | REFERENCE | общий визуальный контекст | Исходники не в workspace |
| DA-4 | Low-fi onboarding `O01→O02→O03→O04→H01` (актуальный) | `low-fi/` — EXPECTED / NOT MATERIALIZED | TEST_CANDIDATE (по описанию владельца) | Linear PET-2; `docs/02-ux/onboarding.md` | Исходник не в workspace; фактический кандидат — DA-5 |
| DA-5 | Clickable low-fi prototype onboarding (HTML) | `../prototypes/onboarding-low-fi/` | TEST_CANDIDATE | Linear PET-2; `ux-test-script-v1.md` | Фактический артефакт теста |
| DA-6 | Clickable low-fi prototype Grooming Care Loop (HTML) | `../prototypes/grooming-loop-low-fi/` | TEST_CANDIDATE | Linear PET-3; `ux-test-script-grooming-v1.md` | Фактический артефакт теста |
| DA-7 | Clickable low-fi prototype Veterinary Care Loop (HTML) | `../prototypes/veterinary-loop-low-fi/` | TEST_CANDIDATE | Linear PET-4; `ux-test-script-veterinary-v1.md` | Фактический артефакт теста; safety copy — DRAFT COPY |

## Ожидается от владельца

Файлы DA-1…DA-4 — EXPECTED / NOT MATERIALIZED: если исходники появятся, разместить в соответствующих каталогах. Отсутствие не блокирует проект (решение владельца 2026-08-30); не реконструировать и не выдавать за сохранённые артефакты.
