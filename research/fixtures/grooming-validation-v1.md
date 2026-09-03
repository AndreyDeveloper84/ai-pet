# Grooming Validation Fixture v1 — TEST-ONLY MANIFEST

**Status: TEST-ONLY RESEARCH FIXTURE.** НЕ production schema. НЕ domain model. НЕ данные реальных людей.
**Build:** `GROOMING_VALIDATION_BUILD_V1` (`prototypes/grooming-validation-build-v1/index.html`)
**Fixture version:** 1.1 (C-06: candidates Анна Петрова / Мария / Ольга) · **Date:** 2026-09-03 · **Branch:** `agent/validation-ops` · **Base:** `281d429`
**Participants:** P-01, P-03 (одинаковый build для обоих).
**Источник frozen-спецификации:** задание владельца UX VALIDATION OPS AGENT (Owner Validation Wave 1, PET-13). Расхождения с ранними TEST_CANDIDATE-артефактами — в `../findings/validation-build-conflicts.md` (OPEN, не решены самовольно).

## PET

| Поле | Значение | Source | Status |
|---|---|---|---|
| Имя | Боня | OWNER | CURRENT |
| Вид | собака | OWNER | CURRENT |
| Порода | корги | OWNER | CURRENT |
| Возраст | 2 года | OWNER | CURRENT |
| Вес | 12 кг | OWNER | CURRENT |
| Особенность | боится сильной сушки | OWNER | CURRENT |
| Неподтверждённое | возможная реакция на курицу | OWNER | UNCERTAIN |

Других данных о Боне в fixture нет. Ничего не выдумывать и не добавлять.

## PROVIDER (canonical path)

Анна Петрова · грумер. Одинаковые profile facts на всех экранах (G02, G03, G04, G05, G06):

- работает с корги;
- использует мягкую сушку (без компрессора);
- Комплексный груминг — 90 минут, 2 500 ₽;
- location: 1,2 км от владельца;
- ближайшее окно: завтра 15:00.

### Matching candidates (G02, fixture-only)

По решению владельца (C-06, RESOLVED): frozen TEST FIXTURE G02 = **Анна Петрова / Мария / Ольга**. Это НЕ утверждение о production marketplace; secondary business names/details — fixture-only, не product decisions.

- Ольга · грумер, тревожные собаки — 2 800 ₽, 3,5 км;
- Мария · грумер, выезд на дом — 3 000 ₽, у вас дома.

Canonical booking path — Анна Петрова.

## BOOKING

| Поле | Значение |
|---|---|
| Услуга | Комплексный груминг |
| Дата | завтра |
| Время | 15:00 |
| Длительность | 90 минут |
| Цена | 2 500 ₽ |
| Location | 1,2 км от владельца (у Анны Петровой) |

Lifecycle: `AVAILABLE → BOOKING REVIEW → CONFIRMED → COMPLETED`. G05 показывается только после фактического confirm (state machine прототипа). Занятый слот → полезные альтернативы.

## CONTEXT (минимальный релевантный контекст)

**Что известно Pet AI:** всё из секции PET + matching-контекст (нужен груминг корги, 12 кг, боится сильной сушки).

**Что согласовано владельцем на G04 (передаётся Анне):**
- имя, вид, порода: Боня, собака, корги;
- вес: 12 кг;
- особенность: боится сильной сушки.

**Что НЕ передаётся:** медицинская история; возможная реакция на курицу (не подтверждено); история других визитов.

**G05:** согласованная информация ДОСТУПНА Анне Петровой. Не утверждается, что Анна её прочитала (CONTEXT AVAILABLE ≠ PROVIDER READ).

## RESULT (G06) — только Provider Result Анны

Источник: **Анна Петрова · грумер**.

- процедура прошла спокойно;
- выполнено мытьё и вычёсывание;
- использована мягкая сушка;
- когти подстрижены.

## RECOMMENDATION (G06)

Повторный груминг через **4–6 недель**. Источник: Анна Петрова · грумер.
Recommendation ≠ Care Plan. Owner: «Запланировать» / «Не сейчас».
Owner Observation хранится отдельно от Provider Result.

## TEMPORAL TRANSITION (research fixture, НЕ production screen)

Дословный текст: «Теперь представьте, что визит уже состоялся. Боня вернулась с груминга, а Анна добавила результат визита.»

## Запрещено в fixture

cancellation policy, payment policy, reminders, calendar integrations, provider verification — не придумывать и не показывать.
