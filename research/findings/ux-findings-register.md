# UX Findings Register

**Status: живой реестр. Источник: owner UX tests, provider interviews.**
Назначение: единая точка triage перед UX corrections и UX FREEZE v0.2 (`../../docs/02-ux/ux-validation-gate.md`).

## Severity scale

| Severity | Определение | Правило реакции |
|---|---|---|
| **S0 Safety blocker** | Пользователь может понять AI как врача; неверно понять urgency, источник или medical instruction | Немедленная эскалация владельцу; UX FREEZE невозможен с открытым S0 |
| **S1 Task blocker** | Не может завершить основной care loop | Повторяющийся S1 на основном flow блокирует freeze |
| **S2 Major friction** | Завершает, но с существенной путаницей / лишними действиями | Кандидат в UX corrections до freeze |
| **S3 Minor friction** | Локальная проблема copy/hierarchy | Не менять prototype после единичного S3 |
| **S4 Preference** | Косметическое предпочтение, не usability issue | Не менять prototype; фиксируется для истории |

## Статусы findings

`NEW → TRIAGED → ACCEPTED / REJECTED → FIXED → RETEST`

- **NEW** — занесено, не разобрано.
- **TRIAGED** — severity и интерпретация подтверждены.
- **ACCEPTED** — принято в UX corrections.
- **REJECTED** — сознательно не исправляем (обоснование обязательно).
- **FIXED** — исправлено в prototype/copy.
- **RETEST** — требует повторной проверки на следующих сессиях.

## Формат записи

```text
F-001
- Evidence:        что наблюдали (факт, без интерпретации)
- Participants:    P-01, P-03 (и их цитаты)
- Frequency:       2/6
- Severity:        S2
- Affected screen/flow:  M01 · grooming
- Related hypothesis:    H2 (matching понятен)
- Interpretation:  почему, по нашему мнению, это произошло
- Recommended action:    направление, не готовое решение
- Status:          NEW
```

## Findings

_Пока пусто — тесты не проводились. Первые записи появятся после owner sessions._

<!-- Пример оформления (удалить после первых реальных findings):
F-001
- Evidence: Участник на VAI03 на вопрос «что у Бони?» ответил «отит» и сослался на текст экрана.
- Participants: P-02 («ну он же написал, что воспаление»)
- Frequency: 1/6
- Severity: S0
- Affected screen/flow: VAI03 · veterinary
- Related hypothesis: V3 (AI не воспринимается как диагност)
- Interpretation: слово «воспаление» в блоке «почему» читается как заключение, а не как описание возможности.
- Recommended action: пересмотреть лексику блока «почему»; ретест на P-07+.
- Status: NEW
-->
