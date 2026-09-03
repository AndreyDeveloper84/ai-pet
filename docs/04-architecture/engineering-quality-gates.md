# Engineering Quality Gates — минимальные generic gates будущей production-работы

**Status: READINESS / NON-BINDING.** Это НЕ архитектурное решение и НЕ выбор инструментов. Конкретные команды и framework-конфигурации появятся после ARCHITECTURE GATE (Q-03); тогда этот документ получит binding-версию.
**Назначение:** заранее зафиксировать, КАКИЕ проверки обязательны для любого будущего production-кода, чтобы quality bar не «возник сам собой» вместе с первым кодом.

## Принципы

- Gates domain-neutral: формулируются как свойство результата, а не как команда конкретного тулчейна.
- Каждый gate проверяется автоматически в CI; ручные проверки — исключение с фиксацией причины.
- Ни один gate не отменяет продуктовых gates (AGENTS.md §5): quality gates регулируют КАК писать код, product gates — ЧТО и КОГДА.

## Gates

| # | Gate | Требование (framework-agnostic) | Когда вступает в силу |
|---|---|---|---|
| 1 | Formatting | Один автоформаттер на язык, конфиг в repo, CI проверяет `--check`-режимом. Ручное форматирование в review не обсуждается | с первого production-кода |
| 2 | Lint | Статический анализ включён, warning'и либо исправлены, либо подавлены точечно с комментарием-причиной. Error-level = блокер merge | с первого production-кода |
| 3 | Unit tests | Новая логика — с unit-тестами; тесты детерминированы (без сети, wall-clock, randomness без seed). Базовый порог покрытия определяется на DEVELOPMENT GATE, не раньше | с первого production-кода |
| 4 | Integration tests | Критические связки (API ↔ persistence ↔ внешние boundary) покрыты тестами против реальных/тестовых инстансов, не только mocks. Конкретный список связок — из domain model и MVA | после ARCHITECTURE GATE |
| 5 | Security / secret scan | Каждый commit проходит scan на secret patterns (обязательный минимум: токены, private keys, service-account JSON). Найденное = блокер, не warning | уже сейчас (public repo) |
| 6 | Migration checks | Когда появится DB: миграции reversible, применяются в CI на чистой базе, destructive changes требуют явного подтверждения в PR | после появления DB |
| 7 | Deterministic fixtures | Тестовые данные — versioned fixtures в repo, без PII реальных людей, без обращения к production-данным. Имена/ID fixture отличимы от реальных | с первых тестов |
| 8 | No secrets in repo | Ни один credential не хранится в git (включая history). Env — через untracked local files / secret manager. См. `public-repo-security-checklist.md` | уже сейчас |
| 9 | No direct production credentials | Production-доступы не используются в local dev и CI. Интеграции в MVP-фазе — против sandbox/mock boundaries (AGENTS.md §5: mock API boundaries разрешены до gates) | уже сейчас, при появлении интеграций |
| 10 | CI required before merge | Все обязательные checks зелёные до merge в main; merge без CI или с красным CI запрещён. Branch protection — настройкой владельца репозитория | с первого production-кода (skeleton CI — уже) |
| 11 | Observable errors | Ошибки в production-коде структурированы и попадают в наблюдаемый канал (log/метрика), а не молча глотаются. Конкретный стек observability — ARCHITECTURE GATE | с первого production-кода |
| 12 | Traceable critical flows | Сквозные потоки ценности (Care Loop: need → matching → booking → completion → timeline/memory) имеют сквозной correlation ID и логируемые переходы состояний. Требование — из продукта (AGENTS.md §7, §9), реализация — после DOMAIN GATE | после DEVELOPMENT GATE, vertical slice 1 |
| 13 | Review requirement | Каждое изменение production-кода — через review (человек или назначенный reviewer-агент по Agent Git Contract). Self-merge без review запрещён | уже сейчас (AGENTS.md §11) |

## Что этот документ НЕ делает

- Не выбирает форматтер/линтер/test runner/CI-движок.
- Не устанавливает числовые пороги покрытия (преждевременно без кода).
- Не открывает DEVELOPMENT GATE и не заменяет `development-gate-checklist.md`.
