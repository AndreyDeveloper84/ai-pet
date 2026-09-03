# ADR-TEMPLATE — Architecture Decision Record

**Status: TEMPLATE.** Это шаблон для будущих архитектурных решений. Он НЕ содержит ни одного решения. Реальные ADR создаются только в рамках соответствующих gates (REUSE GATE / ARCHITECTURE GATE и далее) — копированием этого файла с именем `ADR-<NN>-<slug>.md`.

## Правила использования

- ADR не заменяет `decision-log.md`: продуктовые решения остаются в decision log (D-NN), архитектурные — в ADR со ссылкой на связанные D-NN.
- Статусы совместимы с AGENTS.md §4: `DRAFT / REVIEW / FROZEN / SUPERSEDED`. Решение внутри: `DECIDED / HYPOTHESIS / OPEN QUESTION / POST-MVP`.
- Никогда не представлять hypothesis как принятое решение.
- ADR без заполненного Evidence и Alternatives не переводится в REVIEW.

---

## ADR-NN: <короткое название решения>

- **ID:** ADR-NN
- **Status:** DRAFT | REVIEW | FROZEN | SUPERSEDED (по AGENTS.md §4)
- **Date:** YYYY-MM-DD

### Context

Какая проблема/требование forcing this decision. Ссылки на UX/domain requirements, findings, constraints (gates, safety boundaries).

### Decision

Принятое решение — однозначно, без «возможно». Если решение не принято — статус HYPOTHESIS/OPEN QUESTION, а не DECIDED.

### Alternatives

Минимум 2 рассмотренные альтернативы с причиной отклонения каждой.

### Consequences

Положительные и отрицательные следствия. Что становится невозможным/дорогим. Что нужно пересмотреть при изменении upstream-решений.

### Evidence

Факты, на которых основано решение: discovery reports, audit results, прототипы, тесты, measurements. Без evidence решение — HYPOTHESIS.

### Related UX/domain requirements

Ссылки на `docs/02-ux/*`, `docs/03-domain/*`, D-NN, UX validation findings.

### Ayla reuse impact

Влияет ли на матрицу reuse (REUSE AS IS / EXTEND / GENERALIZE / PET ONLY / DO NOT REUSE)? Какие модули затрагивает? Если решение предполагает reuse — ссылка на результат reuse audit (PET-19), иначе это pre-emptive decision без gate.

### Security/privacy impact

Влияние на credentials, PII владельцев/питомцев, provider data sharing (D-07), provenance (D-05), safety boundaries (D-14). Public repo considerations.

### Migration/rollback

Как откатить решение? Обратима ли миграция данных/кода? Reversibility — обязательное свойство решений до DEVELOPMENT GATE (AGENTS.md §5).

### Related Linear issues

PET-NN и другие. ADR не меняет статусы Linear — только ссылается.
