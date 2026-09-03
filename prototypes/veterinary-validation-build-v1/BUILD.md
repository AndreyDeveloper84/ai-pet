# VETERINARY_VALIDATION_BUILD_V1 — Build Record

## Build

| Поле | Значение |
|---|---|
| Build ID | VETERINARY_VALIDATION_BUILD_V1 |
| Status | **FROZEN FOR VALIDATION** |
| Target participant | P-02 (Owner Validation Wave 1, PET-13: Onboarding + Veterinary) |
| Wave | Owner Validation Wave 1 |
| Path | `prototypes/veterinary-validation-build-v1/index.html` |
| Branch | `agent/veterinary-ux-audit` |
| Source / pre-freeze SHA | `7bc5b63` |
| Freeze commit | see git history / branch HEAD |
| Fixture | `research/fixtures/veterinary-validation-v1.md` |
| Test script | `research/owner-interviews/p02-veterinary-test-script-v2.md` |
| Observation sheet | `research/owner-interviews/p02-veterinary-observation-sheet.md` |
| Audit | `docs/02-ux/veterinary-ux-audit-v1.md` |

## Свойства build

Self-contained, deterministic: no backend, no live AI, no external APIs, no randomness.
База: `prototypes/veterinary-loop-low-fi/` (исторический artifact, не изменён).
Correction pass (owner/UX triage): VUX-001, VUX-003, VUX-004, VUX-005, VUX-006, VUX-007, VUX-010 — RESOLVED BEFORE P-02.
Regression: 34/34 PASS (PLANNED_VISIT / TODAY / OBSERVATION / EMERGENCY + booking state machine + copy safety).

## Freeze rules

- Build НЕ менять до завершения P-02.
- Единственное исключение: подтверждённый **S0 safety exception** (пользователь понял AI как врача / неверно понял urgency / medical instruction misunderstanding) — с немедленной эскалацией владельцу.
- Любая другая проблема — в findings register (`research/findings/ux-findings-register.md`), решение — на triage (PET-16).

## Freeze НЕ означает

- production approved;
- medical protocol approved (urgency/thresholds/demo-логика — RESEARCH REQUIRED, D-14);
- UX final (UX GATE не пройден);
- domain approved (DOMAIN GATE не пройден).

## Known deferred findings (не блокируют P-02)

| Finding | Severity candidate | Disposition |
|---|---|---|
| VUX-002 (intake: вопрос о вялости не ветвится от ответа шага 3) | S2-CANDIDATE | DEFERRED TO WAVE 1 TRIAGE (PET-16) |
| VUX-008 (VR01: «добавлено в Care» vs CTA «Сформировать план Care») | S3-CANDIDATE | DEFERRED TO PET-16 |
| VUX-009 (VR01: «объясню словами врача») | S3-CANDIDATE | DEFERRED TO PET-16 |
| VUX-011 (счётчик «шаг N из 6» и восприятие анкеты) | S3-CANDIDATE | DEFERRED TO PET-16 (проверяется V2 на P-02) |
| VUX-012 (domain-термин «Care Decision» в low-fi теге экрана) | S3-CANDIDATE | DEFERRED TO UX FREEZE REVIEW |
| VUX-013 (required capability не представлена на VAI03) | S3-CANDIDATE | DEFERRED TO UX FREEZE REVIEW |
