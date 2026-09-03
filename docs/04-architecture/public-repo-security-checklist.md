# Public Repo Security Checklist

**Status: READINESS / NON-BINDING.** Минимальная гигиена публичного репозитория (https://github.com/AndreyDeveloper84/ai-pet — public). Это НЕ enterprise security program.

## Правила (обязательные)

1. **No credentials.** Ни один credential (пароль, токен, API key, private key, cookie) не коммитится — ни в актуальное состояние, ни в history.
2. **Env через runtime/local untracked files.** Конфигурация окружений — через `.env` и аналоги, покрытые `.gitignore`; в repo — только `*.example` / `*.sample` без реальных значений.
3. **No service account JSON.** `service-account*.json`, `*firebase-adminsdk*.json`, `credentials*.json` — под `.gitignore` (уже покрыто). Прецедент: `security-note-firebase-key.md` (PET-24, действие владельца — rotation/revocation).
4. **No production dumps.** Экспорты БД, логи с реальными данными, бэкапы — не в repo.
5. **No private certificates.** `*.pem`, `*.key`, `*.p12`, keystores — под `.gitignore`.
6. **No screenshots with sensitive data.** Скриншоты/записи сессий — только после проверки на PII, токены в URL, персональные данные.
7. **No participant PII.** Участники исследований — только research IDs (`P-01`, `PR-G01`…). Имена, контакты, места работы реальных людей — не в repo. Fixtures — вымышленные данные.
8. **Research IDs only** во всех research/findings/prototype артефактах.

## Проверки

| Когда | Что |
|---|---|
| Перед каждым commit/push | `git status` на неожиданные файлы; новые файлы проверить на credential-like содержимое (не читая чужие secrets) |
| CI (каждый push/PR) | Автоматический scan secret patterns: `.github/workflows/repository-quality.yml` |
| Подозрение на компрометацию | STOP: не коммитить, не пушить; эскалация владельцу. Компрометированный credential = rotation/revocation, удаление из repo недостаточно (history, клоны, кэши) |

## Границы (что осознанно НЕ входит)

- Secret scanning как сервис (gitleaks/trufflehog, GitHub push protection) — рекомендуется владельцу, не блокирует текущую фазу.
- Threat modeling, dependency audit, SAST — появятся вместе с production-кодом (DEVELOPMENT GATE).
- Политика доступов к GitHub-репозиторию — зона владельца.
