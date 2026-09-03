# Engineering Readiness Audit — фактическое состояние репозитория

**Status: READINESS / NON-BINDING.** Это фактическая фиксация состояния tooling, а НЕ архитектурное решение и НЕ выбор стека (Q-03 остаётся открытым до ARCHITECTURE GATE).
**Дата аудита:** 2026-09-03 · **Base:** canonical main `259dcca` · **Ветка:** `agent/engineering-readiness`
**Tracked files:** 74 · **Публичный репозиторий:** https://github.com/AndreyDeveloper84/ai-pet

Легенда: `EXISTS` — есть и работает · `PARTIAL` — есть частично · `NOT FOUND` — отсутствует · `NOT NEEDED YET` — осознанно отложено до gates.

## 1. Языки и исполняемые артефакты

| Компонент | Статус | Факт |
|---|---|---|
| Markdown (документация) | EXISTS | `docs/00-product`…`docs/08-decisions`, `research/`, корневые README/AGENTS/PROJECT_STATE |
| HTML/CSS/JS prototypes | EXISTS | 5 self-contained `index.html` без зависимостей: 3 low-fi (`onboarding`, `grooming`, `veterinary`) + 2 frozen validation builds (`grooming-validation-build-v1`, `veterinary-validation-build-v1`). Запуск — открытие в браузере, без сети и backend |
| Production source code | NOT FOUND (NOT NEEDED YET) | `src/` содержит только README. Запрещено до DEVELOPMENT GATE (AGENTS.md §5, D-10) |
| Dependency manifests | NOT FOUND (NOT NEEDED YET) | Нет `package.json`, `requirements.txt`, `pyproject.toml`, `go.mod` и т.п. Prototypes зависимостей не имеют. Манифест появится вместе со stack decision |

## 2. Quality tooling

| Компонент | Статус | Факт |
|---|---|---|
| Test files / test runner | NOT FOUND | Ни одного теста, ни конфигурации runner'а. Regression validation builds (34/34 PASS) выполнялась вручную, без автоматизации |
| Formatting config | NOT FOUND | Нет `.editorconfig`, `.prettierrc`, `black/ruff` config и т.п. |
| Lint config | NOT FOUND | Нет ESLint/Pylint/др. Markdown линт не настроен |
| Pre-commit hooks | NOT FOUND | `.git/hooks` не настроены; shared hook-механизма (husky/pre-commit framework) нет |
| Task runner (Makefile/just/npm scripts) | NOT FOUND | Проверки выполняются ручными git/grep командами |

## 3. CI / CD

| Компонент | Статус | Факт |
|---|---|---|
| GitHub Actions | NOT FOUND | `.github/` отсутствует. Добавлен domain-neutral workflow в рамках этой задачи: `.github/workflows/repository-quality.yml` |
| Branch/PR checks | NOT FOUND | Required checks и branch protection на GitHub не настроены (вне зоны git; рекомендация — в `engineering-quality-gates.md`) |
| Docker / containers | NOT FOUND (NOT NEEDED YET) | Нечего контейнеризировать до появления application shell |

## 4. Security tooling

| Компонент | Статус | Факт |
|---|---|---|
| `.gitignore` (secrets) | EXISTS | Покрывает `.env`, `.env.*`, `*.pem`, `*.key`, `service-account*.json`, `*firebase-adminsdk*.json`, `*adminsdk*.json`, `credentials*.json`, `secrets/` + Python/Node/IDE artifacts |
| Secret scanning (автоматический) | NOT FOUND → PARTIAL (после этой задачи) | Ручные grep-проверки при bootstrap (D-18) и перед этой задачей: паттерны `ghp_`, `sk-`, `xox`, private-key headers, `AIza`, `AKIA` — не найдены. Автоматическая проверка добавлена в CI |
| GitHub secret scanning (push protection) | NOT VERIFIED | Настройка на стороне GitHub — действие владельца репозитория, из git не проверяется |
| Известный security case | OPEN | Firebase service-account JSON в workspace Ayla (вне этого repo): `security-note-firebase-key.md`, Linear PET-24 — rotation/revocation, действие владельца |

## 5. Docs / decision process

| Компонент | Статус | Факт |
|---|---|---|
| Docs structure | EXISTS | `docs/00-product` … `docs/08-decisions`, статусы документов (`DRAFT/REVIEW/FROZEN/SUPERSEDED`) соблюдаются |
| Decision log | EXISTS | `docs/08-decisions/decision-log.md` (D-01…D-18), формат ID/Date/Decision/Reason/Status/Impact/Related |
| Open questions | EXISTS | `docs/08-decisions/open-questions.md` (Q-02…Q-13) |
| ADR template | NOT FOUND → EXISTS | Добавлен `docs/08-decisions/ADR-TEMPLATE.md` (template only, решений не содержит) |
| Linear sync | EXISTS | `docs/08-decisions/linear-backlog-plan.md` + PROJECT_STATE.md как bridge |

## 6. Структура репозитория

| Каталог | Назначение | Gate-статус |
|---|---|---|
| `docs/` | Продуктовая/UX/AI/marketplace документация и решения | активен |
| `research/` | Интервью, fixtures, findings (owner + provider) | активен, данных сессий: 0 |
| `prototypes/` | Throwaway low-fi + frozen validation builds | активен (UX VALIDATION) |
| `designs/` | Design artifacts (REFERENCE/TEST_CANDIDATE, D-13) | reference |
| `src/` | Будущий production code | пуст до DEVELOPMENT GATE |

## 7. Intentionally deferred (НЕ вводить до соответствующих gates)

- Framework-specific lint/test/CI (Django/FastAPI/React/…) — до ARCHITECTURE GATE (Q-03).
- DB migration checks, DB schema — до DOMAIN GATE + ARCHITECTURE GATE.
- Application shell, environment matrix, deployment topology — до ARCHITECTURE GATE.
- Pre-commit framework с language hooks — вместе с выбором стека; до этого достаточно CI-проверок.
- Полноценная secret-scanning программа (gitleaks/trufflehog в CI) — кандидат на DEVELOPMENT GATE; текущий regex-scan покрывает obvious patterns и не требует зависимостей.

## Вывод

Репозиторий — документационно-исследовательский, без production кода и без engineering tooling. Это соответствует фазе (UX VALIDATION, все последующие gates закрыты). Минимальный domain-neutral baseline добавлен этой задачей: CI-проверки существующих артефактов, quality gates, test strategy skeleton, ADR template, security checklist, development gate checklist. Ничего из deferred-списка не начиналось.
