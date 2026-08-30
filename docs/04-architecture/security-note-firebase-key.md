# Security Note — Firebase service-account JSON в workspace Ayla

**Status: OPEN — требуется действие владельца (rotation/revocation решение)**
**Severity: HIGH (credential-файл вне защиты .gitignore), экспозиция в git НЕ подтверждена**
**Дата обнаружения:** 2026-08-30 (при read-only inventory, Linear PET-8 prep)

> Содержимое ключа не открывалось, не копировалось и не включалось в отчёты. Проверка выполнена только metadata/git-командами.

## Факт

- Файл `ayla-…-firebase-adminsdk-….json` (имя файла соответствует формату приватного ключа сервисного аккаунта Firebase) находится в корне `C:/Users/user/PycharmProjects/Ayla/`.
- Размер ~2.4 KB, mtime 2026-04-25. Лежит рядом с 11 git-репозиториями.

## Проверки (безопасные, read-only)

| Проверка | Результат |
|---|---|
| `Ayla/` — git repo? | Нет (`fatal: not a git repository`) → файл не tracked на корневом уровне |
| Файл в index какого-либо из 11 subrepos (`git ls-files`) | Нет — ни один subrepo не содержит firebase/adminsdk файлов в index |
| Файл в git history (`git log --all -- <path>`) | Не применимо на корневом уровне; subrepos путь не содержат |
| `.gitignore` покрытие паттерна `*adminsdk*` | Частичное: есть в `docs/`, `djangoproject/`, `djangoproject-catalog/`, `djangoproject-alpha/`. **Отсутствует** в `ai-bot-platform/`, `ayla-ai-core/`, `frontAyla/`, `itsolve/`, `ayla-knowledge*` |

## Вывод

- В пределах этого workspace экспозиция ключа в git **не обнаружена**.
- Экспозиция вне этой машины (другие клоны, CI, старые ветки) из этой точки **не проверяема**.
- Файл физически находится в рабочей директории разработки без гарантированной защиты от случайного коммита (корень не repo и без `.gitignore`; часть subrepos паттерн не покрывает).

## Рекомендации (приоритет по убыванию)

1. **Считать credential потенциально скомпрометированным** (стандартная практика для ключа, живущего в dev-workspace с апреля): выполнить rotation/revocation сервисного аккаунта в Firebase console.
2. Убрать файл из `Ayla/` корня (в менеджер секретов / за пределы workspace).
3. Добавить паттерн `*firebase-adminsdk*.json` / `*adminsdk*` в `.gitignore` всех subrepos, где его нет.
4. При подтверждении, что ключ когда-либо был tracked (на любом клоне) — revocation обязателен, ротации недостаточно без отзыва.

## Что НЕ сделано (и не должно без решения владельца)

- Файл не открывался, не перемещался, не удалялся (действия с credential — только владельцем).
- Проверка внешней экспозиции (GitHub remote history, CI secrets audit) — отдельная задача владельца.
