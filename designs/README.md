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
| DA-1 | Home с крупным фото питомца | `references/` (файл ожидается) | REFERENCE | UX: Home (`docs/02-ux/home.md`) | Существующий макет; не утверждён |
| DA-2 | Home для нескольких питомцев | `references/` (файл ожидается) | REFERENCE | UX: Home, состояние MULTI_PET | Существующий макет; не утверждён |
| DA-3 | Предыдущие визуальные концепты | `references/` (файлы ожидаются) | REFERENCE | общий визуальный контекст | Не утверждены |
| DA-4 | Low-fi onboarding `O01→O02→O03→O04→H01` (актуальный) | `low-fi/` (файл ожидается) | TEST_CANDIDATE | Linear PET-2; `docs/02-ux/onboarding.md` | Кандидат на owner tests |
| DA-5 | Clickable low-fi prototype onboarding (HTML) | `../prototypes/onboarding-low-fi/` | TEST_CANDIDATE | Linear PET-2; test script v1 | Throwaway prototype для owner tests |

## Ожидается от владельца

Файлы DA-1…DA-4 (разместить в соответствующих каталогах; статусы уже назначены).
