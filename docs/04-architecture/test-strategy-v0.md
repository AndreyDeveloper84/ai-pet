# Test Strategy v0 — skeleton

**Status: DRAFT / PRE-DOMAIN.** Domain model не существует (DOMAIN GATE закрыт), поэтому это карта будущих тестовых типов и проверяемых свойств, а НЕ план конкретных тестов моделей/API. Конкретизация — после DOMAIN GATE и ARCHITECTURE GATE.

## Типы тестов

| Тип | Что проверяет в Pet AI | Границы |
|---|---|---|
| UNIT | Чистая логика: правила matching (hard filters → soft signals), provenance-правила Memory (source/status transitions), lifecycle-переходы Booking, urgency mapping Care Decision | Без I/O, детерминированные fixtures |
| INTEGRATION | Связки с persistence и внешними boundaries: запись события в Timeline, чтение Pet Context для AI, интеграция с CRM клиники (через adapter boundary, не production Vetmanager) | Тестовые инстансы, не production |
| CONTRACT | Соглашения на границах: provider-facing API (minimum relevant context), клиничесая интеграция (D-08: интеграция, не замена), AI orchestration boundary (если reuse Ayla — contract между Pet AI и ayla-ai-core) | Consumer/provider contract, версионируется |
| E2E | Vertical slices целиком (AGENTS.md §6): Create Pet → Ask AI → Matching → Booking → Completion → Timeline/Memory → Repeat | Минимум 1 E2E на slice; запуск в CI на каждый merge |
| SAFETY | Safety boundaries (D-14, FROZEN): AI не ставит диагноз, не назначает препараты, AI observation ≠ medical fact, emergency отключает marketplace, uncertainty показывается явно | Набор негативных сценариев; блокирует release при любом падении |
| CONCURRENCY | Booking-инварианты под гонкой: no double booking на один слот, no duplicate booking при повторной отправке, occupied slot → альтернативный UX | Параллельные запросы против тестового инстанса |
| REPLAY / REGRESSION | Воспроизведение зафиксированных сценариев: UX validation flows (P-01/P-02 builds как эталон поведения), инциденты, найденные баги — каждый баг сначала становится failing test | Fixture-based, детерминированный |

## Будущие properties (риски, которые тесты обязаны покрывать)

Это список свойств, а не implementation. Каждое свойство получает конкретные тесты после domain model.

1. **Provenance.** Каждое существенное знание в Memory имеет `value + category + source + source_date + status`; `AI_OBSERVATION` никогда не отображается как медицинский факт (D-05, D-06); статусные переходы (`CURRENT/UNCERTAIN/OUTDATED/DISPROVEN`) не теряют источник.
2. **Context leakage between pets.** Контекст питомца A не попадает в AI-ответы, matching и provider-sharing питомца B (в т.ч. multi-pet household, D-13 reference).
3. **Irrelevant memory leakage.** В AI-контекст и к провайдеру попадает только relevant минимум (D-07); устаревшие (`OUTDATED/DISPROVEN`) знания не усиливают рекомендации.
4. **Booking double-confirm.** Один слот не подтверждается дважды; повторный submit не создаёт duplicate booking; `CONFIRMED` не возникает без реального подтверждения провайдера (no fake confirmation).
5. **Provider result source.** Результат услуги имеет источник `PROVIDER`; completion-тimestamp ≠ результат (в Ayla provider result lifecycle NOT FOUND — это будущий Pet-specific код, покрывается с нуля).
6. **AI medical overreach.** Ни один AI-ответ не формулирует диагноз/назначение/изменение препаратов; emergency-сценарий не показывает marketplace/monetization (D-14, D-16); uncertainty формулируется явно.
7. **Idempotency.** Повторная доставка события/webhook/команды не создаёт дублей Timeline-записей, booking'ов и Memory-записей.
8. **Event delivery.** События домена (booking confirmed, service completed, feedback) доставляются в Timeline/notification-каналы ровно с зафиксированной семантикой (at-least-once + idempotent consumer — кандидат, решается на ARCHITECTURE GATE); Timeline не загрязняется system/audit-событиями (AGENTS.md §7).
9. **Tenant/context leakage при reuse Ayla.** Если reuse audit (PET-19) примет reuse модулей `ai-bot-platform`: salon=tenant-модель не должна пропускать данные между tenant'ами и не должна подменять pet-context salon-context'ом (риск зафиксирован в `ayla-reuse-audit-plan.md`, «Requires careful generalization»). Тесты изоляции обязательны для каждого reused модуля.

## Правила

- Баг → сначала failing regression test → потом fix.
- Fixtures детерминированы и не содержат PII (см. `public-repo-security-checklist.md`).
- SAFETY-тесты — отдельный обязательный набор: его падение блокирует merge независимо от остальной зелени.
- Этот документ обновляется на каждом gate: DOMAIN GATE добавляет модельные тесты, ARCHITECTURE GATE — конкретные boundaries, DEVELOPMENT GATE — пороги и ownership.
