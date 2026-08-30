# Open Questions

**Status: живой список. Не закрывать вопросы молча — только решением владельца или результатом исследования.**

## Блокирующие (нужен owner decision)

### Q-02. Доступ к Ayla codebase

**Частично решено (2026-08-30):** read-only inventory разрешён и выполнен (`docs/04-architecture/ayla-reuse-inventory.md`). Глубокий reuse audit и архитектурные решения по reuse — только после REUSE GATE. Pet AI domain не подгоняется под архитектуру Ayla. Остаток вопроса (канонические репозитории, кто выполняет audit) — к REUSE GATE, не блокирует.

### Q-03. Технологический стек MVP

Не выбран и не должен выбираться до ARCHITECTURE GATE. Зафиксировано здесь, чтобы не «возник сам собой» в коде.

### Q-04. Модель monetization

Commission/acquisition fee — гипотеза (D-11). Нужен product decision о том, как проверяем на пилоте (ручной учёт? договорённости с провайдерами?). Не блокирует UX/research.

## Неблокирующие (закроются исследованиями/пилотом)

### Q-05. Источник респондентов для owner tests

5–8 владельцев собак: канал набора, критерии сегментации — не определены. **Не блокирует UX Prototype track** (решение владельца 2026-08-30) — требуется к запуску тестов.

### Q-07. Минимальный набор полей O02 (onboarding)

Уточняется в low-fi prototype; принцип «без длинной анкеты» ограничивает сверху.

### Q-08. Состав minimum relevant context для провайдеров

Закрывается provider research (треки A/B).

### Q-09. CRM целевых клиник и их API

Закрывается clinic interviews. До этого Vetmanager integration — только стратегия.

### Q-10. Request mode в booking

`REQUESTED → OFFERED → CONFIRMED` — добавлять только при реальной необходимости. Решение — после provider interviews (как грумеры/клиники подтверждают записи).

### Q-11. Competitor research

Не проводилось. Нужен ли отдельный трек перед пилотом — решить после owner tests.

### Q-13. Валидация triage/red-flag механизмов

Процесс ветеринарной валидации для DRAFT-частей safety boundaries (triage algorithms, thresholds, red-flag protocols) — определить до Veterinary slice.

## Закрытые

### Q-01. Существующие макеты → CLOSED (D-13)

Макеты существуют: Home с фото питомца, Home multi-pet, предыдущие визуальные концепты, актуальный low-fi onboarding O01→O04→H01. Введены статусы design artifacts (REFERENCE/TEST_CANDIDATE/APPROVED/SUPERSEDED). Актуальный onboarding — TEST_CANDIDATE, остальные — REFERENCE. Manifest: `designs/README.md`. Операционный остаток: разместить файлы DA-1…DA-4 в `designs/`.

### Q-06. Инструмент low-fi prototype → CLOSED (2026-08-30)

Для owner tests используется throwaway clickable HTML prototype (`prototypes/onboarding-low-fi/`). Не является production code и не предопределяет стек (Q-03 остаётся открытым).

### Q-12. Статус safety-boundaries → CLOSED (D-14)

Подтверждено частично: product invariants — FROZEN v0.1 (6 пунктов); triage algorithms, thresholds, prompts, red-flag protocols, implementation details — DRAFT/RESEARCH REQUIRED. См. `docs/05-ai/safety-boundaries.md`.
