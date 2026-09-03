# Provider Research Wave 1 — Synthesis

**Status: SKELETON — данных нет.** Linear: PET-14. Источники: `../provider-interviews/sessions/PR-G01.md`, `PR-G02.md`, `PR-V01.md`.
**Правило: заполняется только после 3 завершённых интервью. Выводов по одному интервью не делать. Этот документ не принимает product decisions и не меняет G01–G06 / прототипы.**

## FACTS

_Только подтверждённые факты из сессий, со ссылкой на session-файл._

| # | Факт | Источник |
|---|---|---|
| — | — | — |

## PATTERNS

_Повторяющееся минимум в 2 из 3 сессий. Одиночное наблюдение — не паттерн._

- —

## CONTRADICTIONS WITH CURRENT PET AI

_Где реальный workflow расходится с нашими текущими документами/прототипами. Зафиксировать, не исправлять._

- —

## G04 VALIDATION (minimum relevant context → groomer)

Frozen G04 передаёт Анне: имя, вид, порода, вес, особенность («боится сильной сушки»). Не передаёт: медицинскую историю, неподтверждённое, историю визитов.

| Поле G04 | PR-G01 | PR-G02 | Итог |
|---|---|---|---|
| Имя | — | — | — |
| Вид/порода | — | — | — |
| Возраст | — | — | — |
| Вес | — | — | — |
| Особенность поведения | — | — | — |
| Чего не хватает (список) | — | — | — |
| Что лишнее | — | — | — |

**Статус G04: NOT ENOUGH EVIDENCE** (SUPPORTED / PARTIALLY SUPPORTED / CONTRADICTED / NOT ENOUGH EVIDENCE — после 3 интервью)

## G06 VALIDATION (provider result + recommendation)

Frozen G06: Анна возвращает результат (процедура прошла спокойно; мытьё/вычёсывание; мягкая сушка; когти подстрижены) + рекомендацию (повторный груминг через 4–6 недель). Owner Observation хранится отдельно.

| Элемент G06 | PR-G01 | PR-G02 | Итог |
|---|---|---|---|
| Result после визита существует в workflow | — | — | — |
| Готовность к structured result (30–60 сек) | — | — | — |
| Recommendation следующего визита существует | — | — | — |
| Форма передачи владельцу | — | — | — |

**Статус G06: NOT ENOUGH EVIDENCE**

## GROOMING IMPLICATIONS

- —

## VETERINARY IMPLICATIONS

- —

## BOOKING IMPLICATIONS

Фактический booking mode каждого provider (как есть сегодня, не наша state machine):

| Session | INSTANT | REQUEST | EXTERNAL | MANUAL | HYBRID | Комментарий |
|---|---|---|---|---|---|---|
| PR-G01 | | | | | | |
| PR-G02 | | | | | | |
| PR-V01 | | | | | | |

Сигналы для Q-10 (request mode): —

## CONTEXT SHARING IMPLICATIONS

Сигналы для Q-08 (состав minimum relevant context):

- Groomer: —
- Vet: —

## PROVIDER RESULT IMPLICATIONS

- —

## VERIFICATION FINDINGS

Детально — `provider-verification-inputs.md`. Сводка: —

## OPEN QUESTIONS

_Новые вопросы, открытые волной. Помечать OPEN QUESTION, не отвечать за владельца._

- —

## HYPOTHESES

Статусы H-P1…H-P8 по итогам волны (SUPPORTED / PARTIALLY SUPPORTED / CONTRADICTED / NOT ENOUGH EVIDENCE):

| Гипотеза | Формулировка | Статус | Основание |
|---|---|---|---|
| H-P1 | Minimum relevant context полезнее полного профиля | NOT ENOUGH EVIDENCE | — |
| H-P2 | Provider готов получать pre-visit summary | NOT ENOUGH EVIDENCE | — |
| H-P3 | Provider готов вернуть короткий structured result | NOT ENOUGH EVIDENCE | — |
| H-P4 | Recommendation после визита существует в workflow | NOT ENOUGH EVIDENCE | — |
| H-P5 | Pet AI не должен превращаться в provider CRM | NOT ENOUGH EVIDENCE | — |
| H-P6 | Provider не хочет дублировать существующую CRM/МИС | NOT ENOUGH EVIDENCE | — |
| H-P7 | Context provenance важен provider-side | NOT ENOUGH EVIDENCE | — |
| H-P8 | Instant vs request зависит от реального workflow | NOT ENOUGH EVIDENCE | — |

---

_После заполнения: статус → REVIEW, владельцу на решение. PET-14 закрывается только после этого._
