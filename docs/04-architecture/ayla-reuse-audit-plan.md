# Ayla Reuse Audit — Plan

**Status: DRAFT — план, НЕ аудит и НЕ архитектурный выбор. Выполнение — после REUSE GATE (после domain extraction, Linear PET-11).**
**Вход:** `ayla-reuse-inventory.md` (read-only inventory ✅).

## Принципы

- Не подгонять Pet AI domain под архитектуру Ayla. Аудит отвечает на вопрос «что из Ayla можно переиспользовать под подтверждённые Pet AI требования», а не «как вписать Pet AI в Ayla».
- Решения — по матрице, с обоснованием и ссылкой на доменные требования.

## Scope: репозитории

| Репозиторий | Роль в аудите |
|---|---|
| `Ayla/ayla-ai-core` | AI orchestration library (prompt rendering, tools, anti-hallucination) — основной кандидат на AI core |
| `Ayla/ai-bot-platform` | Django multi-tenant платформа — основной кандидат на backend-модули |
| `Ayla/djangoproject*` | уточнить назначение; вероятно legacy/варианты — низкий приоритет |
| `Ayla/frontAyla` | фронтенд — только если дойдёт до client architecture (позже) |
| Клоны `ai-bot-platform-*`, `ayla-ai-core-drf1374` в `PycharmProjects/` | определить канонический источник до аудита (ветки/свежесть) |

## Scope: модули и вопросы (по областям из backlog PET-11)

| Область | Где смотреть | Ключевые вопросы аудита |
|---|---|---|
| auth | ai-bot-platform (apps/config) | Модель пользователей? Multi-tenant изоляция? Пригодна для owner-side без tenant-ов? |
| users | ai-bot-platform | User vs pet owner — есть ли разделение? Что придётся выкинуть? |
| booking | ai-bot-platform, legacy_* | Lifecycle состояний? Slot locking? Double booking protection? Совместимость с нашим lifecycle (AVAILABLE→REVIEW→CONFIRMED→COMPLETED/CANCELLED)? |
| availability | ai-bot-platform | Модель слотов/расписаний? Time zones? Переносы? |
| notifications | ai-bot-platform, legacy_notifications | Каналы, outbox, retry? Нужен ли нам вообще на MVP? |
| events/outbox | ai-bot-platform (infra/apps) | Есть ли event bus/outbox? Пригоден для Timeline-источников? |
| AI core | ayla-ai-core | Границы: что внутри (prompts, tools, dispatch)? Есть ли memory/context primitives или только LLM plumbing? Anti-hallucination — пригодно для safety boundaries? |
| conversations | ayla-ai-core / ai-bot-platform | Модель диалога: stateful? Как хранится контекст? |
| context | ayla-ai-core / ai-bot-platform | Есть ли понятие контекста сущности (salon vs pet)? Насколько salon-specific? |
| memory | ayla-ai-core / ai-bot-platform | Есть ли provenance (source/status)? Скорее всего нет — тогда EXTEND или PET ONLY |
| provider models | ai-bot-platform (apps) | Salon/master models — обобщаемы до Provider core или жёстко beauty-specific? |
| reviews | ai-bot-platform | Модель отзывов — переиспользуема? |
| payments | ai-bot-platform | Что есть? (Нам не нужно в MVP — скорее всего DO NOT REUSE сейчас) |

## Матрица решения (заполняется по итогам)

| Область | REUSE AS IS | EXTEND | GENERALIZE | PET ONLY | DO NOT REUSE | Обоснование |
|---|---|---|---|---|---|---|
| auth | | | | | | |
| booking | | | | | | |
| … | | | | | | |

Значения:
- **REUSE AS IS** — подключаем без изменений.
- **EXTEND** — берём и дорабатываем под Pet AI (сохраняя совместимость).
- **GENERALIZE** — выносим общее ядро, salon/pet-специфика выше слоем.
- **PET ONLY** — пишем заново для Pet AI (в Ayla нет или проще заново).
- **DO NOT REUSE** — не трогаем (out of scope или техдолг).

## Процесс

1. Определить канонические репозитории/ветки (Q-02 остаток).
2. Прочитать структуру модулей (read-only).
3. Для каждой области: оценка + черновое решение матрицы с обоснованием.
4. Сверка с domain requirements (вход: PET-10) — решение без требования не принимается.
5. Итог → ARCHITECTURE GATE (выбор minimum viable architecture).

## Non-goals

- Не рефакторить код Ayla.
- Не выбирать стек/архитектуру Pet AI (это ARCHITECTURE GATE, после аудита).
- Не переносить salon-domain концепции в Pet AI.
