# UX Validation Gate — критерии UX FREEZE v0.2

**Status: DRAFT (вступает в силу при triage findings после owner tests)**

## Цель freeze

> Достаточно хорошо, чтобы извлечь domain requirements и начать engineering.

Не требовать идеального UX. Freeze — не «всё отлично», а «основные сценарии работают, safety не нарушен, дальше можно строить домен и код по подтверждённым путям».

## Вход

- Owner tests: 5–8 сессий по `../../research/owner-interviews/session-runbook-v1.md`.
- Findings: `../../research/findings/ux-findings-register.md` (все записи TRIAGED).
- Provider interviews: минимум стартовая волна (3+ грумера, 2+ клиники) — для context-sharing и booking-предположений.

## Критерии UX FREEZE v0.2 (все обязательны)

| # | Критерий | Проверка |
|---|---|---|
| 1 | **Нет открытых S0** | Register: ни одного S0 в статусе NEW/TRIAGED/ACCEPTED/FIXED без RETEST-подтверждения |
| 2 | **Нет повторяющихся S1 на основном flow** | S1 с frequency ≥ 2 на onboarding/grooming/veterinary main path — закрыты или RETEST пройден |
| 3 | **Onboarding value proposition понятна большинству** | ≥ половины участников объясняют своими словами, зачем Pet AI данные (T1) |
| 4 | **Pet Context действительно замечается** | ≥ 4 из 5 на последних сессиях без наводки называют использованный контекст (G1/VE1) |
| 5 | **Grooming matching понятен и объясним** | H3 критерий script'а выполнен; участники объясняют выбор через «почему подходит» |
| 6 | **Veterinary flow не создаёт впечатление AI diagnosis** | V3 и V6 критерии выполнены; никто не ушёл с убеждением «AI сказал диагноз/назначение» |
| 7 | **Provider context sharing понятен** | Участники понимают, что передаётся и что нет (G4/VE6); тревоги разобраны |
| 8 | **Completed result = обогащение истории** | Участники формулируют, что Pet AI стал знать больше и следующий раз будет проще (G6/VE8) |

## Процесс

```text
owner tests (партиями по 2–3)
→ findings → triage (severity, frequency)
→ UX corrections (S0/S1/повторяющиеся S2) → RETEST на следующей партии
→ все критерии закрыты → решение владельца: UX FREEZE v0.2
→ domain extraction → Ayla reuse audit → architecture
```

Правила:

- Prototype меняется только через findings (не после единичных S3/S4).
- Каждая коррекция — с записью в decision log, если меняет зафиксированное поведение.
- Незакрытые S3/S4 и REJECTED findings переносятся в Post-MVP/Backlog с обоснованием — они не блокируют freeze.
- UX FREEZE v0.2 фиксируется в decision log со ссылками на findings и версии prototypes.

## Что freeze НЕ означает

- Не означает заморозку визуального стиля (low-fi остаётся low-fi).
- Не означает заморозку triage/thresholds/red-flag protocols (D-14 — они RESEARCH REQUIRED).
- Не открывает DEVELOPMENT GATE автоматически — сначала domain extraction, reuse audit, architecture gate.
