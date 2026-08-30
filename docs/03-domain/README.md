# 03 — Domain

**Status: DRAFT — заблокировано DOMAIN GATE**

Domain model определяется **после UX GATE** (подтверждённые UX-требования → minimum domain model).

До этого запрещено:

- окончательная Pet database schema;
- массовые migrations;
- сложный booking domain «заново»;
- сложная Memory architecture.

## Что уже зафиксировано как доменные инварианты (не schema)

- Pet Core: Profile / Timeline / Memory / Current State / Care — разные понятия.
- Timeline = значимые события жизни питомца, не activity log приложения.
- Memory = `value + category + source + source_date + status`; sources `OWNER | PROVIDER | DOCUMENT | CLINIC | AI_OBSERVATION`; statuses `CURRENT | UNCERTAIN | OUTDATED | DISPROVEN`.
- Booking lifecycle: `AVAILABLE → BOOKING REVIEW → CONFIRMED → COMPLETED` (+`CANCELLED`); invariants в `../../AGENTS.md` §7.
- Provider core: Identity, Type, Services, Capabilities, Location, Availability, Pricing, Trust, Reviews, Booking Rules.

Эти инварианты — вход для будущей domain model, но не разрешение на schema.
