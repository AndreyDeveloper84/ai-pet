# Ayla Reuse — Read-Only Inventory

**Status: DRAFT — inventory only (владелец: read-only разрешён 2026-08-30). Это НЕ reuse audit и НЕ архитектурное решение. REUSE GATE не открыт.**

Правила этого этапа: только инвентаризация доступных репозиториев и областей будущего аудита. Не проектировать Pet domain под код Ayla. Не начинать refactor. Audit matrix (REUSE AS IS / EXTEND / GENERALIZE / PET ONLY / DO NOT REUSE) заполняется после UX/domain requirements (Linear PET-8).

## Доступное окружение

Локальный workspace: `C:/Users/user/PycharmProjects/Ayla/` (read-only доступ есть).

### Репозитории/модули, релевантные будущему аудиту

| Репозиторий | Что это (по структуре) | Потенциальные области аудита |
|---|---|---|
| `Ayla/ayla-ai-core` | Python-библиотека AI-оркестрации (src, tests, pyproject, CHANGELOG, LTS_POLICY). По Linear-описанию: prompt rendering, tool definitions, tool dispatch, anti-hallucination primitives, pure-Python без Django | AI core, conversations?, context? |
| `Ayla/ai-bot-platform` | Django multi-tenant платформа (apps, config, manage.py, docker-compose, tests, legacy_maxbot, legacy_formulatela_mcp, legacy_notifications) | auth, users, booking, availability, notifications, events/outbox, memory, provider models, reviews, payments |
| `Ayla/djangoproject*` (3 шт.) | Дополнительные Django-проекты (назначение не проверялось) | уточнить при аудите |
| `Ayla/frontAyla` | Фронтенд (не инспектировался) | вне приоритета аудита MVP backend |
| `Ayla/ayla-knowledge*` | Базы знаний/документация продукта Ayla | контекст для понимания доменных решений Ayla |

Также вне папки Ayla существуют клоны/варианты (`ai-bot-platform-*`, `ayla-ai-core-drf1374` в `PycharmProjects/`) — при аудите определить канонический источник.

## Области аудита (из backlog plan PET-8) → предварительный маппинг

| Область аудита | Где искать (предварительно) | Статус |
|---|---|---|
| auth | ai-bot-platform (apps/config) | не проверено |
| users | ai-bot-platform | не проверено |
| booking | ai-bot-platform (apps), legacy_* | не проверено |
| availability | ai-bot-platform | не проверено |
| notifications | ai-bot-platform, legacy_notifications | не проверено |
| events/outbox | ai-bot-platform (infra/apps) | не проверено |
| AI core | ayla-ai-core | не проверено |
| conversations | ayla-ai-core / ai-bot-platform | не проверено |
| context | ayla-ai-core / ai-bot-platform | не проверено |
| memory | ayla-ai-core / ai-bot-platform | не проверено |
| provider models | ai-bot-platform (apps) | не проверено |
| reviews | ai-bot-platform | не проверено |
| payments | ai-bot-platform | не проверено |

## Замечания безопасности (наблюдение при инвентаризации)

- В корне `Ayla/` лежит файл вида `ayla-3654f-firebase-adminsdk-*.json` — похоже на приватный ключ сервисного аккаунта, хранящийся рядом с кодом. Не читал, не копировал. Рекомендуется владельцу проверить, не попадает ли он в git-историю, и ротировать при необходимости. Это наблюдение, не аудит.

## Открыто

- Q-02: подтверждение scope доступа и канонических репозиториев — у владельца.
- Ветки/свежесть репозиториев не инспектировались (read-only, уровень листинга).
