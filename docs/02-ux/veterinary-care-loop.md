# Veterinary Care Loop

**Status: REVIEW** (stress-test вертикал; safety-инварианты — `../05-ai/safety-boundaries.md`, FROZEN v0.1 по D-14)

## Триггер-пример

> «Боня второй день чешет левое ухо».

## Care Decision — продуктовая сущность (DECIDED как концепт, 2026-08-30)

`Need` недостаточно для медицинского сценария. Результат intake — **Care Decision**:

```text
concern              — что беспокоит (сформулировано без диагноза)
urgency              — уровень срочности
recommended action   — рекомендуемое следующее действие
required capability  — какая компетенция специалиста нужна
evidence/context     — на чём основано (intake answers, история с provenance)
```

Структура отображения: `что известно → уровень срочности → почему → следующее действие`.
Запрещённая формулировка: «У Бони отит» (категоричный диагноз от AI).

Не проектировать финальную DB schema до DOMAIN GATE.

## Urgency states

```text
OBSERVATION      — пока не требует визита; наблюдение сохраняется как owner observation
PLANNED_VISIT    — осмотр в ближайшее время, не экстренно (happy path прототипа)
TODAY            — желательно сегодня; matching ранжируется по скорости
EMERGENCY        — срочная помощь
```

## Emergency invariant (D-14, инвариант #4)

Если EMERGENCY активен:

* marketplace ranking НЕ показывается;
* monetization НЕ показывается;
* обычный booking flow НЕ приоритизируется;
* primary CTA: urgent veterinary care / call / route + готовая сводка для врача.

## Flow (prototype v2, DA-7)

```text
H01
→ VAI01 Contextual Response (релевантная история: майский эпизод левого уха, Dr. Иванова; НЕ generic, без диагноза)
→ VAI02 Adaptive Intake (последовательно; safety checks: боль, выделения, общее состояние, выраженная вялость, равновесие/наклон головы, травма; длительность не переспрашивается; red flag → пропуск остальных)
→ VAI03 Care Decision (структура выше; 4 urgency states)
→ [EMERGENCY → VAI03-E: urgent care / call / route, без marketplace]
→ VM01 Veterinary Matching (тот же shell; competence обязательна; relationship не побеждает отсутствие компетенции — грумер Анна не предлагается)
→ VM02 Veterinarian Profile (квалификация, специализация, верификация, клиника — не портфолио)
→ VB01 Booking Review («Что получит врач»: симптомы, длительность, intake, прошлый эпизод, фото; «посмотреть/изменить контекст»; НЕ вся Pet Memory)
→ VB02 Confirmed (state machine)
→ VR01 Structured Visit Result (Doctor Result | Pet AI Explanation — раздельно)
→ VC01 Care Plan / Follow-up (active treatment, today actions, follow-up; owner observation ≠ medical outcome)
→ HIST01 Updated Timeline (источники: врач / владелец / клиника; AI-наблюдение с пометкой «не диагноз»)
→ H01' Updated Home (ACTIVE_CARE)
```

## Границы AI (сводно, детали — safety-boundaries.md)

AI может: собирать симптомы, учитывать историю, определять разумный уровень срочности, обнаруживать red flags, рекомендовать обращение, подбирать специалиста, структурировать и объяснять назначение врача, добавлять назначение врача в Care без изменений.

AI НЕ должен: ставить диагноз, назначать препараты, менять назначения/дозировки врача, представлять AI inference как медицинский факт, подменять назначение врача.

## Acceptance criteria (для UX-теста)

- См. `../../research/owner-interviews/ux-test-script-veterinary-v1.md` (V1–V7). Провал V3 («AI не диагност») или V6 (врач/AI/Care различение) — стоп-фактор safety copy.

## Связанные документы

- `../05-ai/safety-boundaries.md`, `../05-ai/ai-role.md`
- `ux-shell-matrix.md` (common vs vertical-specific)
- `screen-inventory.md` (VAI01–VAI03-E, VM01–VB02, VR01, VC01)
