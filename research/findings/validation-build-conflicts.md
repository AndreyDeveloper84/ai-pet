# Validation Build Conflicts — RESOLVED (owner decisions 2026-09-03)

**Status: ALL RESOLVED.** Решения владельца по конфликтам C-01…C-08 получены и применены. Build V1 соответствует решениям; следствия отражены в `../fixtures/grooming-validation-v1.md` (v1.1), `../owner-interviews/p01-grooming-test-script-v2.md` и build.

Формат: Screen / Artifact A / Artifact B / Conflict / Impact / Owner decision / Status.

## C-01

- **Screen:** весь flow
- **Artifact A:** frozen flow G01→G06 (задание владельца)
- **Artifact B:** `docs/02-ux/screen-inventory.md` + `prototypes/grooming-loop-low-fi/` (H01, AI01, AI02, M01, M02, B01, B02, R01, R02, HIST01)
- **Conflict:** разные системы ID и разный состав экранов; mapping сценариев G1–G6 старого скрипта на новый build неоднозначен.
- **Impact:** нельзя молча считать старые и новые ID эквивалентными.
- **Owner decision:** Для Owner Validation Wave 1 каноничен GROOMING_VALIDATION_BUILD_V1: Onboarding → G01 → G02 → G03 → G04 → G05 → TEST_ONLY_TEMPORAL_TRANSITION → G06. Старые AI02/R02/HIST01 mappings — legacy/superseded для этого validation scenario. Build не менять (по C-01).
- **Status:** RESOLVED

## C-02

- **Screen:** Pet fixture (onboarding O04, Home, G01–G06)
- **Artifact A:** frozen fixture: Боня, корги, **2 года, 12 кг**
- **Artifact B:** `prototypes/onboarding-low-fi/` («3 года»), `prototypes/grooming-loop-low-fi/` («~13 кг»)
- **Conflict:** расходятся возраст и вес Бони.
- **Impact:** builds несопоставимы при смешивании в одной волне.
- **Owner decision:** Canonical P-01/P-03 fixture: Боня, корги, 2 года, 12 кг. Старые 3 года / ~13 кг не использовать в Wave 1.
- **Status:** RESOLVED

## C-03

- **Screen:** G02/G03/G04/G05 (provider facts, booking)
- **Artifact A:** frozen fixture: **Анна Петрова, грумер, 2 500 ₽**
- **Artifact B:** `prototypes/grooming-loop-low-fi/`: «Анна, персональный грумер, 3 500 ₽»
- **Conflict:** имя, тип провайдера и цена расходятся.
- **Impact:** ценовой сигнал несопоставим между builds.
- **Owner decision:** Canonical provider/price fixture: Анна Петрова, грумер, 2 500 ₽. Старые Анна / 3 500 ₽ — superseded test data.
- **Status:** RESOLVED

## C-04

- **Screen:** G06 (recommendation)
- **Artifact A:** frozen: «повторный груминг через **4–6 недель**»
- **Artifact B:** `prototypes/grooming-loop-low-fi/`: «6–8 недель»
- **Conflict:** интервал рекомендации расходится.
- **Impact:** значения не смешивать при сравнении со старыми заметками.
- **Owner decision:** Canonical provider recommendation: повторный комплексный груминг через 4–6 недель. Старые 6–8 недель — superseded.
- **Status:** RESOLVED

## C-05

- **Screen:** G01/G02 (previous relationship)
- **Artifact A:** frozen fixture без прошлого визита Бони к Анне; G01–G06 без экрана previous relationship
- **Artifact B:** старый prototype/script: «Боня была у Анны 12 июня», AI02, гипотеза H2
- **Conflict:** build V1 не заявляет prior relationship; старый сценарий тестировал H2 на противоположном fixture.
- **Impact:** H2 в Wave 1 на build V1 не проверяется.
- **Owner decision:** Previous relationship НЕ входит в P-01/P-03 — намеренное product/validation решение. P-01 проверяет создание ПЕРВОГО relationship: Need → Matching → Anna → Booking → Completed Visit → Result → Feedback/History → relationship signal. Гипотеза «relationship before marketplace» — отдельный future/retest scenario после первого completed loop. Prior Anna relationship обратно в build НЕ добавлять.
- **Status:** RESOLVED

## C-06

- **Screen:** G02 (matching candidates)
- **Artifact A:** frozen спецификация: 3 объяснимых кандидата; fixture задан только для Анны Петровой
- **Artifact B:** кандидаты из прежнего TEST_CANDIDATE-прототипа (Ольга, Салон «Лапушка»)
- **Conflict:** frozen fixture для неканонических кандидатов не был утверждён.
- **Impact:** price/distance/trade-off неканонических кандидатов — fixture-only.
- **Owner decision:** **Анна / Мария / Ольга** — допустимый frozen TEST FIXTURE G02. Это НЕ утверждение о production marketplace. Secondary business names/details — fixture-only, не превращать в product decisions.
- **Применено:** в build G02 Салон «Лапушка» заменён на Марию (грумер, выезд на дом — 3 000 ₽, у вас дома); Ольга сохранена. Fixture manifest → v1.1.
- **Status:** RESOLVED

## C-07

- **Screen:** test surface
- **Artifact A:** участник не видит IDs/FROZEN/internal terms
- **Artifact B:** старые `prototypes/*/index.html` показывают `.tag`-метки и служебные notes
- **Conflict:** старые прототипы нарушают test surface требование.
- **Impact:** риск показа внутренних меток респонденту.
- **Owner decision:** Для Wave 1 использовать ТОЛЬКО GROOMING_VALIDATION_BUILD_V1. Старые prototypes/storyboards респондентам не показывать.
- **Status:** RESOLVED

## C-08

- **Screen:** research artifacts (методика)
- **Artifact A:** frozen flow + build V1
- **Artifact B:** `ux-test-script-grooming-v1.md`, `session-runbook-v1.md` — привязка к старому flow и значениям
- **Conflict:** методика ссылалась на экраны/значения, отсутствующие в build V1.
- **Impact:** модератору нужен актуальный script под build V1.
- **Owner decision:** Разрешена адаптация moderator/test script под актуальный frozen build без смены research methodology и без изменений G01–G06: убрать obsolete screen IDs; убрать проверку previous relationship; привести задачи/вопросы к G01→G06; сохранить neutral/non-leading wording и raw evidence capture; добавить future hypothesis note («previous relationship tested after first completed care loop»). Старый v1 — исторический артефакт, не переписывать.
- **Применено:** создан `../owner-interviews/p01-grooming-test-script-v2.md`; v1 не изменён.
- **Status:** RESOLVED

## Примечание — untracked source artifacts (не конфликт)

В canonical main упоминались untracked PNG storyboard files и папка `Onboarding Pets Owner/` в `prototypes/onboarding-low-fi/`. В worktree отсутствуют; не реконструировались. По C-07 старые storyboards респондентам не показываются — для Wave 1 не требуются.
