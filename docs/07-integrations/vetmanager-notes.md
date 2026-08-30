# Vetmanager Integration Notes

**Status: DRAFT** (стратегия зафиксирована на уровне принципа; детали — после clinic interviews)

## Стратегическая модель

```text
Owner
↓
Pet AI
↓
Integration
↓
Vetmanager / other clinic CRM
↓
Doctor
```

## Разделение ответственности

**Pet AI отвечает за:**

- owner experience;
- pet context;
- need understanding;
- matching;
- acquisition;
- booking orchestration;
- cross-provider Timeline;
- Memory.

**Vetmanager/CRM клиники отвечает за:**

- внутренний operating system клиники (расписание врачей, медкарты внутри клиники, касса и т.д.).

## Принципы

- **Не строим аналог Vetmanager.** Клиника продолжает работать в своей CRM.
- Production-grade integration — не задача MVP; до неё возможен lightweight booking orchestration.
- Что клиники готовы/не готовы дублировать вне CRM — выясняется в clinic interviews (`../01-research/provider-research.md`, трек B).

## Открытые вопросы

- Какие CRM реально используют целевые клиники и какие у них API — **OPEN**, до интервью.
- Минимальный технический уровень интеграции для пилота — **OPEN**.
