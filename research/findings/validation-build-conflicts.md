# Validation Build Conflicts — OPEN

**Status: OPEN.** Реестр расхождений между frozen-спецификацией GROOMING_VALIDATION_BUILD_V1 (задание владельца, PET-13) и ранними артефактами репозитория. Конфликты НЕ решены самовольно; UX не менялся до решения владельца. Build V1 построен по frozen-спецификации владельца; расхождения зафиксированы здесь.

Формат: Screen / Artifact A / Artifact B / Conflict / Impact / Owner decision required.

## C-01

- **Screen:** весь flow
- **Artifact A:** frozen flow G01→G06 (задание владельца)
- **Artifact B:** `docs/02-ux/screen-inventory.md` + `prototypes/grooming-loop-low-fi/` (H01, AI01, AI02, M01, M02, B01, B02, R01, R02, HIST01)
- **Conflict:** разные системы ID и разный состав экранов. Frozen flow не содержит AI02 (previous relationship), R02 (feedback), HIST01 (timeline); B-артефакты не содержат G01–G06.
- **Impact:** mapping сценариев теста (G1–G6 в `ux-test-script-grooming-v1.md` привязаны к старым ID) на новый build неоднозначен; нельзя молча считать их эквивалентными.
- **Owner decision required:** канонический mapping G01–G06 ↔ старые ID и судьба экранов AI02/R02/HIST01 в Wave 1.
- **Status:** OPEN

## C-02

- **Screen:** Pet fixture (onboarding O04, Home, G01–G06)
- **Artifact A:** frozen fixture: Боня, корги, **2 года, 12 кг**
- **Artifact B:** `prototypes/onboarding-low-fi/` («3 года»), `prototypes/grooming-loop-low-fi/` («~13 кг»)
- **Conflict:** расходятся возраст и вес Бони.
- **Impact:** continuity внутри build V1 выдержана по frozen fixture; старые прототипы содержат иные значения — нельзя смешивать builds в одной волне.
- **Owner decision required:** подтвердить frozen-значения (2 года, 12 кг) каноническими для Wave 1.
- **Status:** OPEN

## C-03

- **Screen:** G02/G03/G04/G05 (provider facts, booking)
- **Artifact A:** frozen fixture: **Анна Петрова, грумер**, Комплексный груминг **2 500 ₽ · 90 минут**
- **Artifact B:** `prototypes/grooming-loop-low-fi/`: «Анна, персональный грумер», **3 500 ₽**
- **Conflict:** имя, тип провайдера и цена расходятся.
- **Impact:** результаты сессий по разным builds несопоставимы по ценовому сигналу.
- **Owner decision required:** подтвердить provider facts build V1 каноническими.
- **Status:** OPEN

## C-04

- **Screen:** G06 (recommendation)
- **Artifact A:** frozen: «повторный груминг через **4–6 недель**»
- **Artifact B:** `prototypes/grooming-loop-low-fi/`: «6–8 недель»
- **Conflict:** интервал рекомендации расходится.
- **Impact:** probing «кто написал рекомендацию» сопоставим, но значения разные — при сравнении со старыми заметками не смешивать.
- **Owner decision required:** подтвердить 4–6 недель.
- **Status:** OPEN

## C-05

- **Screen:** G01/G02 (previous relationship)
- **Artifact A:** frozen fixture не содержит прошлого визита Бони к Анне; G01–G06 не содержат экрана previous relationship
- **Artifact B:** `prototypes/grooming-loop-low-fi/` + `ux-test-script-grooming-v1.md`: «в прошлый раз Боня была у Анны 12 июня», AI02 «Повторить у Анны»; гипотеза H2 (relationship сокращает путь)
- **Conflict:** build V1 не заявляет prior relationship («Боня у неё ещё не была»), старый сценарий тестировал H2 на противоположном fixture.
- **Impact:** H2 (relationship first) в Wave 1 на build V1 не проверяется — нужно решение, осознанно ли это.
- **Owner decision required:** подтвердить, что Wave 1 grooming идёт без prior-relationship ветки.
- **Status:** OPEN

## C-06

- **Screen:** G02 (matching candidates)
- **Artifact A:** frozen спецификация требует 3 объяснимых кандидата, но задаёт fixture только для Анны Петровой
- **Artifact B:** кандидаты Ольга и Салон «Лапушка» перенесены в build V1 из прежнего TEST_CANDIDATE-прототипа без изменений
- **Conflict:** frozen fixture для двух неканонических кандидатов не утверждён.
- **Impact:** их price/distance/trade-off — carry-over, а не validated fixture; canonical booking path (Анна Петрова) это не затрагивает.
- **Owner decision required:** утвердить или заменить fixture неканонических кандидатов.
- **Status:** OPEN

## C-07

- **Screen:** test surface
- **Artifact A:** требование: участник не видит IDs/FROZEN/internal terms
- **Artifact B:** `prototypes/*/index.html` показывают `.tag`-метки («H01 · Home», «TEST_CANDIDATE») и служебные notes
- **Conflict:** старые прототипы нарушают test surface требование; build V1 метки скрывает.
- **Impact:** при использовании старых прототипов в сессии участник видит внутренние метки.
- **Owner decision required:** подтвердить, что Wave 1 grooming идёт только на build V1 (старый grooming prototype не используется для P-01/P-03).
- **Status:** OPEN

## C-08

- **Screen:** research artifacts (методика)
- **Artifact A:** frozen flow + build V1
- **Artifact B:** `research/owner-interviews/ux-test-script-grooming-v1.md`, `session-runbook-v1.md` — сценарии G1–G6 и лист наблюдателя привязаны к старому flow (AI02, M01, B01, R01, R02, HIST01, цена 3 500 ₽, «6–8 недель»)
- **Conflict:** методика ссылается на экраны и значения, которых нет в build V1. Методика НЕ переписана (запрещено заданием); создан компактный observation sheet `p01-grooming-observation-sheet.md` по новому flow.
- **Impact:** модератору нужен актуальный скрипт под build V1 или явное решение использовать observation sheet как основной инструмент.
- **Owner decision required:** обновить grooming test script под G01–G06 (после решения по C-01) или утвердить observation sheet.
- **Status:** OPEN

## Примечание — untracked source artifacts (не конфликт)

В canonical main упоминались untracked PNG storyboard files и папка `Onboarding Pets Owner/` в `prototypes/onboarding-low-fi/`. В этом worktree их нет; не реконструировались и не копировались (см. задание §14). Для build V1 они не требуются — blocker НЕ объявляется.
