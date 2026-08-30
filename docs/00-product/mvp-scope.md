# MVP Scope

**Status: REVIEW** (границы in/out — DECIDED; детальный объём вертикалов уточняется по результатам UX GATE)

## In scope

### Пользователь и питомец

- Первичный пользователь: владелец собаки.
- Onboarding: O01 → O02 → O03 → O04 → Save Pet → Home (FROZEN direction, см. `../02-ux/onboarding.md`).
- Progressive enrichment профиля после создания (optional).
- Multi-pet: состояние `MULTI_PET` учитывается на Home, но UX-оптимизация — под одного питомца.

### Pet Core

- Profile, Timeline, Memory (с provenance: value/category/source/source_date/status), Current State, Care.

### AI

- Глобальный contextual action layer поверх приложения (не «пятая вкладка»).
- Контекст: `active_pet + screen_context + relevant_memory + relevant_history`.
- Grooming loop: понимание Need, история, previous relationship, matching, booking, result, feedback, Timeline/Memory, rebooking.
- Veterinary loop: adaptive intake, safety/urgency, red flags, Care Decision, matching, structured result. Без диагнозов и назначений.

### Marketplace / Providers

- Explainable deterministic matching (hard filters + soft signals), максимум 3 AI-curated candidates, каталог как fallback.
- Provider model: Identity, Type, Services, Capabilities, Location, Availability, Pricing, Trust, Reviews, Booking Rules. Профиль в контексте `Provider × Pet × Need`.
- Provider side MVP: receive booking → minimum relevant allowed Pet Context → complete service → result/recommendation (simple web UI достаточно).

### Booking

- Lifecycle: `AVAILABLE → BOOKING REVIEW → CONFIRMED → COMPLETED` (+ `CANCELLED`).
- Request mode (`REQUESTED → OFFERED → CONFIRMED`) — только если реально необходим.
- Invariants: no double booking, no fake confirmation, no silent context loss, no duplicate booking, occupied slot → полезный альтернативный UX.

### Основные зоны UX

`Home / History / Care / Profile` + AI как глобальный слой.

## Out of MVP (Post-MVP Backlog — НЕ реализовывать)

```text
Commerce
Insurance
Feed subscriptions
Social network
Community
Wearables
GPS
Lost pet ecosystem
Telemedicine
Complex EHR
Full clinic CRM
Kinologists
Walkers
Sitters
Boarding
International marketplace
Complex knowledge graph
All pet species
Advanced provider SaaS
```

А также в рамках разрешённых вертикалов не строим:

- payroll / warehouse / staff management / full CRM / complex analytics / marketing automation для провайдеров;
- payments, payouts, refunds, сложную commission infrastructure (не блокер пилота);
- production-grade Vetmanager integration (стратегия — `../07-integrations/vetmanager-notes.md`);
- ML ranking (matching — deterministic explainable);
- сложную Memory architecture сверх правил provenance MVP.

## Критерий успеха MVP

> Доказать, что AI, знающий конкретного питомца, способен провести владельца через реальную потребность до завершённого Care Loop и использовать полученный результат в следующем взаимодействии.

Всё, что не помогает доказать это, — удаляется или уходит в Post-MVP Backlog.
