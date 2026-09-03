# PROJECT STATE — Pet AI

> Bridge между Git и Linear. Не дублирует backlog — канон операционных статусов: Linear (Team `Pet AI`/`PET`, Project `Pet AI — MVP`). Канон продуктовых решений и артефактов: этот репозиторий. Последнее обновление: 2026-09-03 (GitHub bootstrap).
>
> Канонический remote: `origin` = https://github.com/AndreyDeveloper84/ai-pet.git (public). Agent Git Contract — `AGENTS.md` раздел 11. Worktrees агентов: `D:/Projects/pet-ai-wt/*` (ветки `agent/*`, base = main).

## Current phase

**UX VALIDATION + PROVIDER RESEARCH.** Linear синхронизирован (`PET-1…PET-24`). Новые продуктовые решения без пользовательских данных не принимаются.

## Gates

| Gate | Статус | Linear |
|---|---|---|
| PRODUCT GATE | ✅ FROZEN v0.1 | PET-15 Done |
| UX GATE | ⛔ Активный: ждёт live data | PET-13 In Progress → PET-16 → PET-17 |
| DOMAIN GATE | ⛔ | PET-18 (blocked by PET-17) |
| REUSE GATE | ⛔ Discovery Done (PET-12) | PET-19 (blocked by PET-18) |
| ARCHITECTURE GATE | ⛔ | PET-20 (blocked by PET-18, PET-19) |
| DEVELOPMENT GATE | ⛔ **BLOCKED** | PET-21 (blocked by PET-20) |

## TRACK A — Owner Validation

- **PET-13 Owner Validation Wave 1 — IN PROGRESS.** Схема: P-01 (A+Grooming), P-02 (A+Veterinary), P-03 (A+Grooming) → стоп, triage (PET-16) → UX FREEZE v0.2 (PET-17).
- Правило волны: onboarding всем; один Care Loop на участника; prototypes не менять (кроме небезопасного S0).
- Данных сессий: 0. External dependency: live respondents.

## TRACK B — Provider Research

- **PET-14 Provider Research Wave 1 — IN PROGRESS.** Scope: PR-G01, PR-G02 (грумеры), PR-V01 (клиника).
- Данных: 0. External dependency: outreach.

## TRACK C — Ayla Technical Discovery

- **PAUSE.** PET-12 Done (NON-BINDING). Reuse audit — PET-19 после Domain Extraction. Preliminary reuse hypotheses — NON-BINDING (`ayla-reuse-audit-plan.md`).

## Critical path (Linear)

`PET-13 → PET-16 → PET-17 → PET-18 → PET-19 → PET-20 → PET-21 → PET-22 → PET-23`

## Требует действия владельца

1. Набор P-01→P-03 + проведение сессий (сообщения: `research/owner-interviews/recruiting-plan-v1.md`).
2. Provider outreach (сообщения: `research/provider-interviews/recruiting-messages-v1.md`).
3. **PET-24** — Firebase credential rotation (security, не блокирует UX validation).

## Next trigger

**Данные P-01→P-03 или Provider Research Wave 1** — что появится первым. До этого новой работы не создавать.

## Linear

- Team `Pet AI` (key `PET`), Project `Pet AI — MVP` — синхронизировано 2026-08-30.
- Mapping и реальные IDs: `docs/08-decisions/linear-backlog-plan.md` (раздел RECONCILIATION).
