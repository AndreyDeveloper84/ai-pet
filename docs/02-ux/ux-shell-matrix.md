# UX Shell Reuse Matrix — Grooming vs Veterinary

**Status: REVIEW** (по итогам двух prototypes; вывод: одна продуктовая архитектура, не два приложения)
**Источники:** `prototypes/grooming-loop-low-fi/`, `prototypes/veterinary-loop-low-fi/`

## COMMON (общий shell, переиспользуется как есть)

| Компонент | Grooming | Veterinary | Примечание |
|---|---|---|---|
| Home (state-driven) | ✅ NORMAL → после loop: следствие | ✅ NORMAL → ACTIVE_CARE | Одинаковые состояния и приоритеты P0–P4 |
| AI shell (contextual layer) | ✅ AI01/AI02 | ✅ VAI01 | Один паттерн: контекстный ответ, не generic; «уже знаю — не переспрашиваю» |
| Matching (M01/VM01) | ✅ 3 curated, why/цена/расстояние/availability/trust/trade-off | ✅ те же поля + competence | Один shell; у vet competence поднята в отдельное поле |
| Provider shell (M02/VM02) | ✅ «Почему подходит Боне?» + слоты | ✅ тот же вопрос + слоты | Различие — в наборе полей профиля (см. ниже) |
| Booking (B01/VB01, B02/VB02) | ✅ review → «Что получит специалист» → confirm guard | ✅ то же + «посмотреть/изменить контекст» | Один lifecycle и state machine; у vet детализация контекста |
| Timeline (HIST01) | ✅ событие + source | ✅ события + source + AI-наблюдение | Одни правила provenance |
| Result → Pet (R01/VR01 → Home) | ✅ следствие на Home | ✅ следствие на Home | Один принцип loop closing |
| Каталог как fallback | ✅ | ✅ | — |

## GROOMING-SPECIFIC

| Компонент | Что это |
|---|---|
| Grooming capabilities | породы, особенности ухода, работа с тревожными собаками (soft signals matching) |
| Portfolio | фото работ в профиле провайдера |
| Grooming result/recommendation | заметка грумера + рекомендация следующего визита (source: PROVIDER) |
| Feedback → relationship signal | оценка влияет на будущий rebooking |

## VETERINARY-SPECIFIC

| Компонент | Что это |
|---|---|
| Adaptive intake (VAI02) | последовательные safety-вопросы по сценарию; пропуск при red flag |
| Urgency states | OBSERVATION / PLANNED_VISIT / TODAY / EMERGENCY |
| Care Decision (VAI03) | продуктовая сущность: concern → urgency → recommended action → required capability → evidence/context |
| Emergency flow (VAI03-E) | без marketplace ranking, без цен, без обычного booking; CTA: звонок/маршрут + сводка для врача |
| Medical provenance | диагноз/назначение только с источником PROVIDER/CLINIC/DOCUMENT; AI observation ≠ факт (отдельный стиль) |
| Structured clinical result (VR01) | разделение Doctor Result / Pet AI Explanation |
| Treatment / follow-up (VC01) | активное лечение, today actions, follow-up date; owner observation ≠ medical outcome |
| Vet profile fields | квалификация, специализация, верификация, клиника — вместо портфолио |

## Вывод

- Shell выдержал подмену vertical: `Need → Capability → Candidates → Availability → Ranking` работает для обоих.
- Различия вертикалей — **полями и вставными шагами** (intake, Care Decision, emergency, clinical result), а не отдельной архитектурой.
- Emergency — единственный режим, где общий marketplace shell сознательно **отключается** (D-14, инвариант #4).

## Открытые вопросы shell (к UX VALIDATION PREP)

- Где живёт Care Decision в IA: только шаг flow или отдельный объект в History/Care? — уточнить при domain extraction.
- Унификация ID экранов: V-префиксы (VAI01) vs общие (AI01) — принять конвенцию при UX FREEZE v0.2. Сейчас: общий shell без префикса, vertical-specific шаги — с префиксом.
