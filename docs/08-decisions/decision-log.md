# Decision Log

**Status: живой журнал. Формат: ID / Date / Decision / Reason / Status / Impact / Related**

## D-01

- **Date:** 2026-08-30 (зафиксировано; решение принято ранее владельцем)
- **Decision:** Pet — центральная продуктовая сущность.
- **Reason:** Ценность продукта — longitudinal context конкретного питомца, а не каталог услуг.
- **Status:** DECIDED
- **Impact:** Вся IA, domain и AI-контекст строятся вокруг Pet Core.
- **Related:** `../00-product/product-concept.md`

## D-02

- **Date:** 2026-08-30
- **Decision:** AI — contextual layer поверх приложения, а не отдельная чат-вкладка.
- **Reason:** Ценность AI — в контексте экрана и питомца, а не в изолированном чате.
- **Status:** DECIDED
- **Impact:** UX architecture, screen inventory, навигация.
- **Related:** `../02-ux/ux-architecture.md`, `../05-ai/ai-role.md`

## D-03

- **Date:** 2026-08-30
- **Decision:** Каталог — fallback после AI curation (максимум 3 кандидата).
- **Reason:** H2: contextual matching полезнее каталога; снижение когнитивной нагрузки.
- **Status:** DECIDED
- **Impact:** Marketplace UX, matching, analytics funnel.
- **Related:** `../06-marketplace/marketplace-model.md`

## D-04

- **Date:** 2026-08-30
- **Decision:** Relationship before marketplace.
- **Reason:** Проверенный специалист питомца ценнее нового при соответствии компетенции; retention-гипотеза H3.
- **Status:** DECIDED
- **Impact:** Matching soft signals, Grooming loop, rebooking flow.
- **Related:** `../06-marketplace/matching-principles.md`

## D-05

- **Date:** 2026-08-30
- **Decision:** Provenance обязателен для значимых знаний (value/category/source/source_date/status).
- **Reason:** Доверие, различение фактов и предположений, безопасность (особенно vet).
- **Status:** DECIDED
- **Impact:** Memory model, onboarding O04, UI отображения источников.
- **Related:** `../05-ai/context-policy.md`

## D-06

- **Date:** 2026-08-30
- **Decision:** AI observation ≠ медицинский факт.
- **Reason:** Safety; юридические и этические риски.
- **Status:** DECIDED
- **Impact:** Safety boundaries, формулировки в AI-ответах, статусы Memory.
- **Related:** `../05-ai/safety-boundaries.md`

## D-07

- **Date:** 2026-08-30
- **Decision:** Провайдер получает minimum relevant context, разрешённый владельцем.
- **Reason:** Приватность владельца/питомца; достаточность для услуги.
- **Status:** DECIDED
- **Impact:** Provider side MVP, consent UX (детали — после provider research).
- **Related:** `../06-marketplace/provider-model.md`

## D-08

- **Date:** 2026-08-30
- **Decision:** Замена Vetmanager / полная клиническая CRM — out of scope. Модель: интеграция.
- **Reason:** Клиника работает в своей CRM; Pet AI владеет owner experience и cross-provider контекстом.
- **Status:** DECIDED
- **Impact:** Integration strategy, scope MVP, clinic interviews.
- **Related:** `../07-integrations/vetmanager-notes.md`

## D-09

- **Date:** 2026-08-30
- **Decision:** Product Concept v0.1 — frozen.
- **Reason:** PRODUCT GATE пройден; дальнейшие изменения — через decision log.
- **Status:** DECIDED
- **Impact:** Все downstream документы ссылаются на v0.1.
- **Related:** `../00-product/product-concept.md`

## D-10

- **Date:** 2026-08-30
- **Decision:** UX НЕ заморожен до пользовательских тестов (onboarding direction — единственное frozen-направление).
- **Reason:** Избежать преждевременного кодирования по непроверенному UX.
- **Status:** DECIDED
- **Impact:** UX GATE блокирует DEVELOPMENT GATE; `src/` пуст до gates.
- **Related:** `../02-ux/ux-architecture.md`, `../../AGENTS.md` §5

## D-11

- **Date:** 2026-08-30
- **Decision:** Payments/payouts/refunds/commission infrastructure — не блокер первого UX/technical pilot; первая модель (гипотеза) — commission/acquisition fee.
- **Reason:** Сначала доказать Completed Care Loop; монетизация проверяется на пилоте без сложной инфраструктуры.
- **Status:** DECIDED (инфраструктура отложена) / HYPOTHESIS (модель fee)
- **Impact:** Scope MVP, Linear backlog.
- **Related:** `../00-product/mvp-scope.md`

## D-12

- **Date:** 2026-08-30
- **Decision:** North Star = Completed Care Loop; рабочая метрика = Completed Care Loops / Active Pet.
- **Reason:** Единица ценности — замкнутый loop, обогащающий Pet Context.
- **Status:** DECIDED
- **Impact:** Analytics events, критерии успеха пилота.
- **Related:** `../00-product/north-star.md`

## D-13

- **Date:** 2026-08-30
- **Decision:** Статусы design artifacts: `REFERENCE / TEST_CANDIDATE / APPROVED / SUPERSEDED`. Существующие макеты (Home с фото питомца, Home multi-pet, прежние визуальные концепты) — REFERENCE; актуальный low-fi onboarding O01→O04→H01 — TEST_CANDIDATE. Никакой артефакт не APPROVED по умолчанию.
- **Reason:** Макеты существуют, но не проходили UX-тесты; нельзя путать «нарисовано» и «подтверждено».
- **Status:** DECIDED
- **Impact:** Правила хранения и промоушна макетов; связь с Linear UX-задачами.
- **Related:** `../../designs/README.md`, закрывает Q-01

## D-14

- **Date:** 2026-08-30
- **Decision:** Safety Boundaries — FROZEN v0.1 на уровне product invariants (AI не ставит диагноз; не назначает/не меняет препараты; AI Observation ≠ Medical Fact; emergency/safety flow приоритетнее marketplace и монетизации; важные медицинские утверждения требуют provenance; uncertainty явно показывается). НЕ заморожены: triage algorithms, thresholds, prompts, red-flag protocols, implementation details — они DRAFT/RESEARCH REQUIRED.
- **Reason:** Безопасность — не предмет UX-итераций, но конкретные механизмы требуют ветеринарной валидации и исследования.
- **Status:** DECIDED
- **Impact:** Границы AI в Veterinary loop; требования к будущей валидации (Q-13).
- **Related:** `../05-ai/safety-boundaries.md`, закрывает Q-12

## D-15

- **Date:** 2026-08-30
- **Decision:** UX-коррекции onboarding/Home для low-fi prototype: короткий onboarding; без процента заполненности профиля; CTA «Сохранить Боню» вместо двусмысленного «Всё верно»; Profile / Memory / History визуально не смешивать; uncertain facts сохраняются как uncertain; Home не утверждает «Всё хорошо»; не создавать следующую вакцинацию (и любой Care item) из неполной информации; AI — глобальный contextual layer, не пятая вкладка.
- **Reason:** Принятые UX-коррекции владельца по итогам ревью концептов.
- **Status:** DECIDED
- **Impact:** Onboarding low-fi (PET-2), clickable prototype, Home states; вход для owner tests.
- **Related:** `../02-ux/onboarding.md`, `../02-ux/home.md`, `../../prototypes/onboarding-low-fi/`

## D-16

- **Date:** 2026-08-30
- **Decision:** Введена продуктовая сущность **Care Decision** для медицинских сценариев: `concern → urgency → recommended action → required capability → evidence/context`. Urgency states: `OBSERVATION / PLANNED_VISIT / TODAY / EMERGENCY`. При EMERGENCY marketplace ranking, monetization и обычный booking flow не показываются; primary CTA — urgent care/call/route. `Need` недостаточно для медицинского сценария.
- **Reason:** Решение владельца по veterinary stress-test: медицинский сценарий требует явной структуры решения вместо прямого перехода Need → matching; safety-инвариант #4 (D-14) требует отключения marketplace в emergency.
- **Status:** DECIDED (концепт; DB schema не проектировать до DOMAIN GATE)
- **Impact:** Veterinary loop, screen inventory (VAI03, VAI03-E, VC01), matching (competence как обязательное поле), будущая domain model.
- **Related:** `../02-ux/veterinary-care-loop.md`, `../02-ux/ux-shell-matrix.md`, prototype DA-7

## D-17

- **Date:** 2026-08-30
- **Decision:** Конвенция ID экранов: общий shell — без префикса (AI01, M01, B01); vertical-specific шаги — с префиксом вертикала (`VAI01`, `VM01`, `VB01`, `VR01`, `VC01`). UX shell reuse matrix подтверждает: одна продуктовая архитектура для обоих вертикалов, различия — полями и вставными шагами.
- **Reason:** Коллизия ID при добавлении veterinary loop; нужна явная граница common vs specific.
- **Status:** DECIDED
- **Impact:** Screen inventory, Linear UX-задачи, будущие verticals.
- **Related:** `../02-ux/screen-inventory.md`, `../02-ux/ux-shell-matrix.md`
