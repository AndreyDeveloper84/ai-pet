# Development Gate Checklist

**Status: READINESS / NON-BINDING.** Checklist предпосылок к открытию DEVELOPMENT GATE (Linear PET-21). Этот документ НЕ открывает gate. Gate закрыт.

## Входные условия (все обязательны, порядок — по AGENTS.md §5)

| # | Предпосылка | Источник истины | Статус на 2026-09-03 |
|---|---|---|---|
| 1 | **UX FREEZE v0.2** — все критерии `docs/02-ux/ux-validation-gate.md` закрыты, freeze зафиксирован в decision log | decision log + findings register | ⛔ нет данных сессий |
| 2 | **Domain v0.1** — minimum domain model извлечена из подтверждённого UX (PET-18) | `docs/03-domain/` | ⛔ не начато |
| 3 | **Ayla reuse decisions** — матрица REUSE AS IS / EXTEND / GENERALIZE / PET ONLY / DO NOT REUSE заполнена по domain requirements (PET-19) | `docs/04-architecture/ayla-reuse-audit-plan.md` → итог аудита | ⛔ не начато |
| 4 | **Minimum Viable Architecture** — выбрана и зафиксирована через ADR (PET-20) | `docs/04-architecture/`, ADR | ⛔ не начато |
| 5 | **Первый vertical slice определён** — Create Pet → Home → Ask Pet AI → AI uses Pet Context (AGENTS.md §6), с критериями «working end-to-end» | Linear PET-22 + slice spec | ⛔ |
| 6 | **Unresolved critical risks identified** — риски из test strategy, safety (D-14 DRAFT-части, Q-13), Ayla tenant-coupling, Q-03…Q-13 — с disposition (accepted / mitigated / blocking) | `docs/08-decisions/open-questions.md`, test strategy | ⛔ |
| 7 | **Test strategy concrete enough** — `test-strategy-v0.md` конкретизирован под domain model и MVA: типы, boundaries, ownership, пороги | `docs/04-architecture/test-strategy-v0.md` → v1 | ⛔ v0 skeleton |
| 8 | **CI baseline ready** — domain-neutral CI работает; framework checks добавлены под выбранный стек; merge требует зелёный CI | `.github/workflows/` | 🟡 skeleton (эта задача) |
| 9 | **Secrets/security baseline ready** — `public-repo-security-checklist.md` соблюдается; PET-24 (Firebase rotation) закрыт; secret scanning автоматизирован | security checklist, Linear PET-24 | 🟡 checklist есть, PET-24 OPEN |

## Правило открытия

- Все 9 пунктов закрыты → решение владельца фиксируется в decision log → PET-21 переводится в Done → разрешён feature implementation только vertical slices (AGENTS.md §6).
- Пункты 8–9 (engineering baseline) НЕ блокируют UX research и domain work — они готовятся параллельно.
- Запреты AGENTS.md §5 действуют до формального открытия gate независимо от готовности checklist.
