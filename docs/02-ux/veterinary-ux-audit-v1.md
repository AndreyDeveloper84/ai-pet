# Veterinary UX Audit v1

**Status: AUDIT / NON-BINDING.**
**Correction pass (owner/UX triage, 2026-09-03):** по findings VUX-001/003/004/005/006/007/010 выполнен ограниченный correction pass → `../../prototypes/veterinary-validation-build-v1/` (VETERINARY_VALIDATION_BUILD_V1). Статусы отмечены в записях findings; первоначальные finding/evidence сохранены без изменений.
Это НЕ новый UX spec и НЕ redesign doc. Это pre-validation consistency audit перед P-02 (Onboarding + Veterinary, PET-13).
Findings `VUX-*` — аудиторские наблюдения агента, НЕ user research evidence (не путать с `F-*` в `research/findings/ux-findings-register.md`).
Severity — **pre-validation audit judgment, not user evidence** (шкала S0–S4 заимствована из findings register, суффикс `-CANDIDATE`).

**Объект аудита:** `prototypes/veterinary-loop-low-fi/index.html` (TEST_CANDIDATE, DA-7) @ main 281d429.
**Prototype не изменён. Shared control-plane files не изменены.**

## Scope

Проверка одного вопроса: если P-02 проходит Veterinary Flow сегодня, не противоречит ли он UX/information-trust правилам, уже зафиксированным на Grooming Flow (G01–G06) и в safety-инвариантах (D-14, D-16).

Проверены экраны: H01 → VAI01 → VAI02 → VAI03 → VAI03-E → VM01 → VM02 → VB01 → VB02 → VR01 → VC01 → HIST01 → H01' (13 экранов), все 4 urgency state (OBSERVATION / PLANNED_VISIT / TODAY / EMERGENCY) и демо-логика intake/matching в `<script>`.

Вне scope: medical correctness thresholds и triage-логика (RESEARCH REQUIRED, D-14 — оцениваются только UX/safety semantics), визуальный стиль, onboarding.

## Reference invariants

Источники истины для сравнения:

- **Safety Boundaries FROZEN v0.1 (D-14):** AI не диагностирует; не назначает/не меняет препараты; AI Observation ≠ Medical Fact; emergency приоритетнее marketplace/монетизации; мед. утверждения требуют provenance; uncertainty явно.
- **Care Decision (D-16):** `concern → urgency → recommended action → required capability → evidence/context`; запрещённая формулировка «У Бони отит».
- **Grooming-derived UX rules (рабочие правила после G01–G06):**
  1. AI uses memory, not memory dump.
  2. Minimum relevant context.
  3. Provider facts и AI interpretation визуально/семантически различимы.
  4. Provider recommendation имеет provenance.
  5. Recommendation ≠ Care.
  6. Owner Observation ≠ Provider Result.
  7. CONTEXT AVAILABLE ≠ PROVIDER READ.
  8. Booking CTA semantics = фактическое состояние.
  9. No invented business rules.
  10. No invented pet facts.
  11. No unsupported trust/verification claims.
  12. Domain language не обязана попадать в UI.
- **Fixture:** Боня, корги, ~13 кг; эпизод ЛЕВОГО уха в мае (заключение клиники 18 мая, Dr. Иванова, «Здоровые лапы»); активного лечения нет.

## Screen-by-screen audit

### H01 — Home

**Purpose:** state-driven вход в flow; честное состояние («нет активных задач», без «всё хорошо»).
**Verdict: PASS.**

- Состояние честное, fixture соблюдён («Активного лечения нет» — согласуется с историей).
- Grooming-факты («боится сильной сушки») на ветеринарном H01 не показаны — корректно, они нерелевантны медицинскому сценарию (правило 1/2).

### VAI01 — Contextual Response

**Purpose:** контекстный ответ с релевантной мед. историей, явное «не диагноз».
**Verdict: PASS.**

- Поднят только релевантный контекст: майский эпизод левого уха + Dr. Иванова; `.aictx` явно фиксирует «grooming-факты не поднимаются». Правило 1/2 — соблюдено.
- Эпизод соответствует fixture (левое ухо, май, заключение клиники 18 мая). Неизвестные факты не появляются (правило 10).
- Pet Context ≠ вся Memory: показан один релевантный эпизод, не дамп.
- «Я не врач и не ставлю диагноз» — прямо в первом сообщении; следующий шаг объяснён (intake → срочность → подготовка к визиту).
- Provenance истории: чип «Источник истории: заключение клиники, 18 мая».

### VAI02 — Adaptive Intake

**Purpose:** последовательные safety-вопросы, известное не переспрашивается, red flag прерывает flow.
**Verdict: ISSUE.**

Findings:

- **VUX-002** — Evidence: шаг 3 «Общее состояние?» (вкл. вариант «Вялая») и шаг 4 «Есть ли выраженная вялость?» задаются подряд безусловно: при ответе «Как обычно» на шаге 3 вопрос про вялость выглядит переспросом только что данного ответа; при ответе «Вялая» — дублированием.
  Violated invariant: «AI не переспрашивает уже известное» (Context before questions, применительно к только что полученным ответам intake); принцип adaptive intake.
  Severity: S2-CANDIDATE. Why: подрывает ключевое отличие intake от анкеты (V2) именно на safety-вопросах.
  Requires owner/UX decision: no (направление очевидно: ветвление/пропуск шага 4 по ответу шага 3), но изменение prototype — только через triage.
  **Статус: DEFERRED TO WAVE 1 TRIAGE (PET-16). NON-BLOCKING FOR P-02 (final freeze review).**
  Rationale: разбор реализации показал, что это conversational awkwardness, а не safety-проблема. Шаг 4 («выраженная вялость») задаётся ВСЕМ, кто не выбыл в emergency раньше, — red flag не может быть пропущен из-за ветвления. Ответ «Вялая» на шаге 3 не должен менять urgency по существующей demo-логике (escalation привязана только к выраженной вялости — шаг 4, RESEARCH REQUIRED); привязывать escalation к шагу 3 означало бы изобрести новый medical threshold (запрещено). «Вялая» → «выраженной вялости нет» — валидная градация тяжести, не противоречие. Urgency не занижается, emergency path срабатывает, ложного medical conclusion нет.
  Validation purpose: P-02 (VE2) покажет, замечают ли респонденты повтор и воспринимают ли его как «анкету» (V2), а VE3b — влияет ли он на понимание urgency. Это user evidence question, а не consistency fix.
- **VUX-011** — Evidence: счётчик «шаг N из 6» на каждом экране intake.
  Violated invariant: потенциально V2 («не анкета»); явная нумерация может усиливать формальное восприятие (или наоборот, снижать тревогу предсказуемостью).
  Severity: S3-CANDIDATE / UNCLEAR. Why: обе интерпретации правдоподобны — это вопрос к user tests, не к аудиту.
  Requires owner/UX decision: no.
  **Статус: DEFERRED TO PET-16. NON-BLOCKING FOR P-02** — это по существу validation question (V2, VE2): P-02 и должен показать, усиливает ли счётчик восприятие «анкеты» или снижает тревогу.

Проверено и соответствует:

- Один вопрос за раз; формат «разговор», chips вместо формы.
- Блок «Уже знаю и не переспрашиваю» (длительность, порода/вес, майский эпизод) — правило «не переспрашивать известное» соблюдено на входе.
- Все safety-critical вопросы сценария присутствуют: боль (даёт трогать), выделения/запах, общее состояние, выраженная вялость, равновесие/наклон головы, травма/купание. Irrelevant questions отсутствуют.
- Red flag (`emergency:true`) прерывает intake и ведёт на VAI03-E, минуя остальные вопросы и marketplace.

### VAI03 — Care Decision

**Purpose:** «что известно → срочность → почему → действие», 4 urgency state, без диагноза.
**Verdict: ISSUE.**

Findings:

- **VUX-001** — Evidence: блок «Почему» в PLANNED_VISIT: «…ушные воспаления без осмотра не лечат, и у Бони уже был эпизод с этим ухом»; в TODAY: «…воспаление может прогрессировать».
  Violated invariant: D-14 инвариант #1 (AI не ставит диагноз); запрещённая семантика «у Бони X»; критерий V3 (стоп-фактор safety copy). Слово «воспаление» в блоке «Почему» привязано к случаю Бони и читается как заключение («AI считает, что это воспаление»), а не как общее обоснование. Показательно: иллюстративный пример в `ux-findings-register.md` предвосхищал ровно этот риск на этом же экране.
  Severity: S0-CANDIDATE. Why: единственное место в flow, где лексика AI может быть понята как медицинское заключение до визита; V3 — стоп-фактор.
  Candidate direction (не redesign): «Почему» формулируется через симптомы и историю без нозологии («такие симптомы без осмотра не решают» / «при таких признаках состояние может ухудшаться»).
  Requires owner/UX decision: **yes** (safety copy).
  **Статус: RESOLVED IN VALIDATION BUILD V1** — «Почему» во всех urgency states переписан без нозологии (только слова владельца, ответы intake, история); проверено smoke-test (нет «воспален*» в cdWhy).
- **VUX-003** — Evidence: red-flag блок «Обратитесь срочно, если появится…» скрывается именно в состоянии TODAY (`rfBox.style.display = 'none'` при TODAY).
  Violated invariant: D-14 #6 (uncertainty/escalation info должна быть явной); логика safety copy: инструкция эскалации наиболее релевантна при повышенной срочности.
  Severity: S2-CANDIDATE. Why: пользователь с более серьёзной картиной не получает критерии немедленного обращения.
  Requires owner/UX decision: yes (safety copy; возможно, осознанное решение — тогда зафиксировать).
  **Статус: RESOLVED IN VALIDATION BUILD V1** — red-flag блок виден при всех urgency states; TODAY дополнительно называет ответ(ы) владельца, повлиявшие на срочность («На срочность повлиял ваш ответ: …»), без новых medical thresholds.
- **VUX-004** — Evidence: в OBSERVATION рекомендованное действие — «Понаблюдать 1–2 дня», но большая primary-кнопка ведёт в marketplace («Всё равно подобрать врача»), а рекомендованный путь — маленькая link-кнопка «Пока понаблюдаю».
  Violated invariant: правило 8 (CTA semantics = фактическое состояние/рекомендация); визуальная иерархия противоречит собственному Care Decision.
  Severity: S2-CANDIDATE. Why: в состоянии, где AI рекомендует НЕ идти к врачу, интерфейс визуально толкает в transactional flow.
  Requires owner/UX decision: yes.
  **Статус: RESOLVED IN VALIDATION BUILD V1** — OBSERVATION: primary «Сохранить наблюдение» (рекомендованное действие), secondary «Всё равно подобрать ветеринара» (agency владельца сохранена).
- **VUX-013** — Evidence: структура Care Decision (D-16) включает `required capability`, но на VAI03 она не представлена; компетенция впервые появляется на VM01.
  Violated invariant: D-16 (полнота UX representation Care Decision — без проектирования DB).
  Severity: S3-CANDIDATE / UNCLEAR. Why: пользователь не видит, какая компетенция нужна, до matching; возможно, это осознанное упрощение low-fi.
  Requires owner/UX decision: no (уточнить при UX FREEZE).
  **Статус: DEFERRED TO UX FREEZE REVIEW. NON-BLOCKING FOR P-02** — required capability материализуется на VM01/VM02 как поле «Компетенция» с объяснением «почему подходит»; comprehension competence rule проверяется на VE5. Представление capability внутри Care Decision — вопрос IA при UX FREEZE, не blocker.
- **VUX-012** — Evidence: domain-термин «Care Decision» виден в теге экрана («VAI03 · Care Decision»).
  Violated invariant: правило 12 (domain language не обязана попадать в UI). В low-fi теги — scaffolding, но при переносе в hi-fi термин не должен утечь в пользовательский UI.
  Severity: S3-CANDIDATE. Requires owner/UX decision: no.
  **Статус: DEFERRED TO UX FREEZE REVIEW. NON-BLOCKING FOR P-02** — теги экранов (ID + название) видимы во всех low-fi prototypes по конвенции тестовых артефактов; пользовательский смысл экрана дублируется человеческой структурой «что известно → срочность → почему → действие». Утечку domain-терминов закрыть при UX FREEZE/hi-fi, не в low-fi build.

Проверено и соответствует:

- Срочность выражена человеческими формулировками (НАБЛЮДЕНИЕ / ПЛАНОВЫЙ ОСМОТР / ЖЕЛАТЕЛЬНО СЕГОДНЯ / СРОЧНАЯ ПОМОЩЬ); нет «диагноз», «точно», ложной точности.
- «Что известно» собирается из реальных ответов intake + fixture-истории с источником; evidence/context присутствует.
- Secondary «Пока понаблюдаю» честно описывает, что наблюдение сохранится как событие от владельца, не мед. факт (правило 6).

### VAI03-E — Emergency

**Purpose:** urgent care без marketplace; call/route + сводка для врача.
**Verdict: PASS.**

- Нет matching-выдачи, нет цен, нет monetization, нет обычного booking — emergency-инвариант (D-14 #4, D-16) соблюдён полностью.
- Нет ложной гарантии определённости: «возможный признак серьёзной проблемы», «Я не врач и не могу оценить тяжесть» — uncertainty явна (D-14 #6). Категоричность допустима только в направлении действия («нужна срочная помощь»), что соответствует инварианту.
- Primary CTA: звонок + маршрут; сводка для врача готова и содержит complaint, ответы intake, майский эпизод с provenance.
- UNCLEAR (без finding): с экрана нет обратного пути при ошибочном red-flag ответе (mis-tap) — в low-fi приемлемо; зафиксировать к UX FREEZE, owner decision не требуется сейчас.

### VM01 — Veterinary Matching

**Purpose:** curated shortlist (макс. 3), competence обязательна, объяснимые trade-offs.
**Verdict: ISSUE.**

Findings:

- **VUX-005** (cross-screen: VM01 + VM02) — Evidence: trust/verification claims без provenance: «диплом проверен», «лицензия проверена», «12 лет практики · 4,9». Модель верификации (кто проверил, что именно, когда) нигде в документах не определена.
  Violated invariant: правило 11 (no unsupported trust/verification claims), правило 9 (no invented business rules), D-05 (provenance) — в медицинском контексте вес таких claims выше, чем в grooming.
  Severity: S1-CANDIDATE. Why: «проверен» от платформы — сильное trust-утверждение; если оно не подкреплено реальным процессом, это именно тот паттерн, который grooming rules запретили.
  Candidate direction: либо provenance-чипы на claims (provider-entered / clinic-provided / platform-verified / review-derived), либо нейтральная copy («диплом указан», «стаж по данным клиники»).
  Requires owner/UX decision: **yes** (модель верификации — продуктовое решение).
  **Статус: RESOLVED IN VALIDATION BUILD V1** — claims «диплом проверен»/«лицензия проверена» удалены; специализация и опыт показаны как «профиль клиники/врача», рейтинг — «отзывы владельцев», с явной пометкой «Pet AI не проверяет эти данные». Новая verification model НЕ создавалась.

Проверено и соответствует:

- Shortlist из 3, не каталог; каталог — fallback-ссылка (D-03).
- Reasons привязаны к текущему Need (осмотр уха, отология, история в клинике).
- Previous relationship (Dr. Иванова лечила ухо в мае) — первый кандидат ТОЛЬКО потому, что компетенция совпадает; грумер Анна явно исключена с объяснением правила (competence > relationship, D-04 + matching-principles).
- Trade-offs честные: цена, расстояние, «не знает историю», ночной тариф, «врач общего профиля».
- Нет «% match», нет «проверенный врач» как недоказанного ярлыка; specialization не выдумана под питомца (отология у всех профильных кандидатов — консистентно).
- При TODAY ранжирование меняется на скорость с явным объяснением («Первый из-за срочности… компетенция сохраняется требованием») — соответствует matching-principles (urgency → приоритет availability).

### VM02 — Veterinarian Profile

**Purpose:** Provider × Pet × Current Need; квалификация/верификация/клиника вместо портфолио.
**Verdict: ISSUE.**

- Тот же finding **VUX-005**: «Верификация: диплом проверен» — claim без provenance и без определённой модели верификации.

Проверено и соответствует:

- Заголовок «Врач × Боня × осмотр уха», вопрос «Почему … подходит Боне?» — контекстный профиль, не generic-страница каталога.
- Приоритет полей медицинский: специализация → верификация → клиника → цена → расстояние; grooming-style portfolio отсутствует.
- Слоты доступности на профиле; переход в booking review сохраняет выбор (state machine).

### VB01 — Booking Review («Что получит врач»)

**Purpose:** критический trust screen: minimum relevant context, owner проверяет.
**Verdict: ISSUE.**

Findings:

- **VUX-006** — Evidence: все пункты «Что получит врач» — снимаемые checkbox'ы, включая «Симптомы и длительность + ответы intake»; исключение ядра контекста происходит молча, без предупреждения.
  Violated invariant: потенциально против minimum-relevant-логики в медицинском контексте: запись без complaint/intake делает сводку бессмысленной или вводящей врача в заблуждение. Grooming frozen rule («Pet AI готовит минимальную сводку, owner проверяет») здесь расширен до «owner может удалить ядро» — это не перенос правила, а его усиление в спорную сторону.
  Severity: S2-CANDIDATE. Why: trust screen перестаёт быть trust screen, если врач может получить пустой контекст без сигнала обеим сторонам.
  Candidate direction: ядро (complaint + intake) несъёмное или снимается с явным warning; вторичное (история, фото) — опционально. Это veterinary-specific exception к grooming rule — требует решения.
  Requires owner/UX decision: **yes**.
  **Статус: RESOLVED IN VALIDATION BUILD V1 (validation hypothesis для P-02)** — VB01 разделён на «Сводка для визита — передаётся всегда» (profile, complaint + длительность, intake answers, майский эпизод с источником; без toggles) и «Дополнительно — по вашему выбору» (фото). Production consent architecture не создавалась.

Проверено и соответствует:

- Состав контекста ровно по инварианту: profile, complaint + длительность, intake answers, релевантный майский эпизод (с источником «заключение клиники»), фото — отдельным пунктом и честно «не приложено».
- Явно указано, что НЕ передаётся («вся остальная память Бони: груминг, неподтверждённые факты») — правило 2.
- НЕ повторяет проблемную модель privacy dashboard: нет category permissions, нет десятков toggles — 4 пункта + раскрываемая детализация «Передаётся как есть» (structured view). Это соответствует grooming-паттерну «AI готовит, owner проверяет».
- Детализация показывает реальные ответы intake из state, а не статичный текст.

### VB02 — Booking Confirmed

**Purpose:** честный confirmed state (state machine), без ложных утверждений.
**Verdict: UNCLEAR.**

Findings:

- **VUX-010** — Evidence: VB02 подтверждает запись, но нигде не показывает статус переданного контекста: ни «сводка доступна клинике», ни «прочитано». Ложных утверждений нет (это PASS по правилу 7), но и честного состояния CONTEXT AVAILABLE нет — пользователь, только что проверявший «Что получит врач», не узнаёт, было ли оно доставлено.
  Violated invariant: правило 7 (CONTEXT AVAILABLE ≠ PROVIDER READ) — формально не нарушено; нарушения нет, есть пробел представления состояния.
  Severity: S3-CANDIDATE / UNCLEAR.
  Candidate direction: явный статус «Сводка передана клинике» после confirm; «прочитано врачом» — никогда без факта.
  Requires owner/UX decision: yes (минорное).
  **Статус: RESOLVED IN VALIDATION BUILD V1** — VB02 показывает «Сводка для врача: передана клинике» с пометкой «„Прочитано врачом“ не показываем — мы этого не знаем. Передана ≠ прочитана.» Только consistency/copy correction; новая product capability не создавалась.

Проверено и соответствует:

- «СТАТУС: CONFIRMED» показывается только после фактического `confirmBooking()`; `go('vb02')` заблокирован без state=CONFIRMED (no fake confirmation, правило 8).
- Не утверждается «врач прочитал / врач готов / врач согласился с AI summary».
- «Что дальше» корректно обещает: заключение врача вернётся в историю с источником.

### VR01 — Structured Visit Result

**Purpose:** Doctor Result | Pet AI Explanation — раздельно, с источниками.
**Verdict: PASS (с замечаниями S3).**

Findings:

- **VUX-008** — Evidence: Pet AI Explanation говорит «Назначение врача добавлено в Care Бони без изменений», но следующий CTA — «Сформировать план Care» (действие в будущем).
  Violated invariant: консистентность состояния (правило 8 по духу: copy не должна описывать состояние, которое ещё не наступило).
  Severity: S3-CANDIDATE. Candidate direction: «будет добавлено в Care без изменений» либо CTA «Посмотреть план Care».
  Requires owner/UX decision: no.
  **Статус: DEFERRED TO PET-16. NON-BLOCKING FOR P-02** — copy-несогласованность не искажает safety/provenance: источник назначения (врач) на экране явен, V6 проверяет именно различение врач/AI/Care; реакция респондента на эту последовательность — данные для triage.
- **VUX-009** — Evidence: «…спросите, объясню словами врача».
  Violated invariant: D-14 (AI не должен выдавать свою интерпретацию за слова врача — у AI есть только текст заключения).
  Severity: S3-CANDIDATE. Candidate direction: «объясню простыми словами, не меняя смысла заключения».
  Requires owner/UX decision: no.
  **Статус: DEFERRED TO PET-16. NON-BLOCKING FOR P-02** — рядом стоит чип «Объяснение AI · не медицинский факт» и блок «AI не меняет лечение»; семантическая рамка экрана не создаёт attribution к врачу. Если респондент на P-02 припишет объяснение врачу — это S-фиксируемый сигнал к коррекции.

Проверено и соответствует:

- Визуальное и семантическое разделение: Doctor Result (сплошная зелёная рамка, `Источник: Dr. Иванова (врач)`, «заключение, 26 авг») vs Pet AI Explanation (пунктир, чип «Объяснение AI · не медицинский факт»). Правила 3 и 4 — соблюдены.
- Диагноз появляется впервые в flow именно здесь и только с источником PROVIDER — каноническая реализация D-14 #5.
- AI явно ограничен: «AI структурирует и объясняет. AI не меняет лечение и не добавляет свою дозировку.» Explanation не создаёт нового лечения; «Отит — воспаление уха» — объяснение термина из заключения врача, а не новый inference.

### VC01 — Care Plan / Follow-up

**Purpose:** активное лечение, today actions, follow-up; owner observation ≠ medical outcome.
**Verdict: ISSUE.**

Findings:

- **VUX-007** — Evidence: карточка «Сегодня»: «· Вечерняя доза капель · Не давать Боне тереть ухо лапой» — без чипа источника. В Doctor Result (VR01) инструкции «не давать тереть ухо» нет; это care-инструкция неустановленного происхождения внутри плана, выглядящая как часть назначения.
  Violated invariant: правило 4 (provenance для recommendation), D-14 #2/#5 (AI не создаёт лечение и не расширяет назначение; мед. утверждения — с источником). Любой treatment action в Care должен иметь источник: врач / владелец / явно помеченный AI general advice.
  Severity: S1-CANDIDATE. Why: на V6 (различение врач/AI/Care — стоп-фактор) пользователь может приписать AI-совет врачу; это ровно тот механизм смешения, который экран обязан предотвращать.
  Candidate direction: источник на каждом action; AI-советы общей гигиены — отдельным стилем «совет Pet AI, не назначение врача» (или убрать из MVP).
  Requires owner/UX decision: **yes**.
  **Статус: RESOLVED IN VALIDATION BUILD V1** — инструкция «Не давать Боне тереть ухо лапой» удалена (её нет в Doctor Result fixture); карточка «Сегодня» содержит только «Вечерняя доза капель» с чипом «Из назначения Dr. Ивановой (врач)».

Проверено и соответствует:

- «Активное лечение» — с источником и датой («назначение Dr. Ивановой, источник: врач»); follow-up — «Источник: назначение врача». Recommendation (VR01) ≠ автоматический Care: план формируется действием владельца (правило 5).
- Owner observation оформлен канонически: «Источник: вы» + «Наблюдение владельца, не медицинский исход», сохранение — явным действием (правило 6, D-14 #3).
- Pet AI нигде на экране не выглядит источником назначения (кроме пробела VUX-007).

### HIST01 — Updated Timeline

**Purpose:** Timeline = что произошло, с источниками; AI-наблюдение помечено.
**Verdict: PASS.**

- Три источника на одной ленте различимы: врач (визит 26 авг, «Источник: Dr. Иванова»), владелец (наблюдение 25 авг, «Источник: вы»), клиника (эпизод 18 мая, «Источник: заключение клиники»).
- Provider result сохранён как provider-originated событие (диагноз и назначение — внутри события визита с provenance врача).
- AI-заметка («Повторный эпизод с тем же ухом за ~3,5 месяца») — вынесена из ленты событий в отдельную карточку с «Источник: наблюдение AI» + «Не диагноз · обсудить с врачом» (D-14 #3, правило 3).
- Timeline содержит только факты произошедшего; follow-up фигурирует как часть заключения врача (факт назначения), не как самостоятельное «надо делать» от системы. Нет предсказаний и AI-мнений в ленте.
- Даты консистентны с fixture и VR01 (26 авг → капли 7 дней → до 2 сен; контроль через 10 дней).

### H01' — Updated Home (ACTIVE_CARE)

**Purpose:** следствие loop на Home, не дамп данных.
**Verdict: PASS.**

- Только актуальное следствие: активное лечение (с датой и источником) + следующий шаг (контроль, rebooking к той же врачу — relationship reuse).
- «Pet AI обновил историю Бони» — loop closing явен (V7), с разделением «назначение врача — с источником; ваши наблюдения — отдельно».
- Нет «всё хорошо»; нет memory dump (правило 1, home.md «Не захламлять Home»).

## Сводка

| Verdict | Экраны | Count |
|---|---|---|
| PASS | H01, VAI01, VAI03-E, VR01*, HIST01, H01' | 6 |
| ISSUE | VAI02, VAI03, VM01, VM02, VB01, VC01 | 6 |
| UNCLEAR | VB02 | 1 |

*VR01 — PASS с двумя замечаниями S3-CANDIDATE.

### Findings register (VUX)

| ID | Screen | Severity (pre-validation, not user evidence) | Owner/UX decision | Final disposition (freeze review) |
|---|---|---|---|---|
| VUX-001 | VAI03 | **S0-CANDIDATE** — «воспаление» в блоке «Почему» читается как AI-заключение | yes (safety copy) | **RESOLVED BEFORE P-02** (build v1) |
| VUX-002 | VAI02 | S2-CANDIDATE — вопрос о вялости не учитывает предыдущий ответ | no | **DEFERRED TO PET-16** (non-blocking; rationale в записи finding) |
| VUX-003 | VAI03 | S2-CANDIDATE — red-flag блок скрыт именно в TODAY | yes (safety copy) | **RESOLVED BEFORE P-02** (build v1) |
| VUX-004 | VAI03 | S2-CANDIDATE — primary CTA в OBSERVATION ведёт в marketplace против рекомендации | yes | **RESOLVED BEFORE P-02** (build v1) |
| VUX-005 | VM01/VM02 | **S1-CANDIDATE** — verification/trust claims без provenance и без модели верификации | yes | **RESOLVED BEFORE P-02** (build v1) |
| VUX-006 | VB01 | S2-CANDIDATE — ядро мед. контекста снимается checkbox молча | yes | **RESOLVED BEFORE P-02** (build v1, validation hypothesis) |
| VUX-007 | VC01 | **S1-CANDIDATE** — care-инструкция без источника внутри плана | yes | **RESOLVED BEFORE P-02** (build v1) |
| VUX-008 | VR01 | S3-CANDIDATE — «добавлено в Care» vs CTA «Сформировать план» | no | **DEFERRED TO PET-16** |
| VUX-009 | VR01 | S3-CANDIDATE — «объясню словами врача» | no | **DEFERRED TO PET-16** |
| VUX-010 | VB02 | S3-CANDIDATE — нет состояния CONTEXT AVAILABLE | yes (минорное) | **RESOLVED BEFORE P-02** (build v1) |
| VUX-011 | VAI02 | S3-CANDIDATE — счётчик «шаг N из 6» и восприятие анкеты | no (к user tests) | **DEFERRED TO PET-16** (validation question V2) |
| VUX-012 | VAI03 | S3-CANDIDATE — domain-термин «Care Decision» в UI-теге | no | **DEFERRED TO UX FREEZE REVIEW** |
| VUX-013 | VAI03 | S3-CANDIDATE — required capability не представлена на экране Care Decision | no | **DEFERRED TO UX FREEZE REVIEW** |

### Grooming rule consistency

| Правило | Вердикт |
|---|---|
| 1. Memory use, not dump | Совместимо (VAI01, H01') |
| 2. Minimum relevant context | Совместимо (VAI01, VB01) |
| 3. Provider facts vs AI interpretation | Совместимо (VR01, HIST01) |
| 4. Provenance для recommendation | **Несовместимо частично** (VUX-007 — VC01) |
| 5. Recommendation ≠ Care | Совместимо (VR01 → VC01 действием владельца) |
| 6. Owner Observation ≠ Provider Result | Совместимо (VC01, HIST01) |
| 7. CONTEXT AVAILABLE ≠ PROVIDER READ | Нарушения нет; пробел (VUX-010) |
| 8. Booking CTA = фактическое состояние | Совместимо в state machine; **конфликт иерархии** в OBSERVATION (VUX-004) |
| 9. No invented business rules | **Несовместимо** (VUX-005 — модель верификации не определена) |
| 10. No invented pet facts | Совместимо (fixture консистентен на всех экранах) |
| 11. No unsupported trust/verification claims | **Несовместимо** (VUX-005) |
| 12. Domain language в UI | Замечание (VUX-012, low-fi scaffolding) |

### Veterinary-specific exceptions needed (к решению владельца/UX)

1. **Medical context sharing (VB01):** grooming rule «AI готовит, owner проверяет» может быть недостаточно — ядро мед. контекста, вероятно, не должно сниматься молча (VUX-006).
2. **Trust/verification claims (VM01/VM02):** в медицинском контексте claims уровня «диплом проверен» требуют определённой модели верификации или нейтральной copy (VUX-005).
3. **Care actions provenance (VC01):** любой action в Care Plan обязан иметь источник; AI general advice — либо отдельным явным стилем, либо вне MVP (VUX-007).
4. **Safety copy в Care Decision (VAI03):** лексика «Почему» без нозологии (VUX-001); red-flag эскалация не должна исчезать при повышении urgency (VUX-003).

## Prototype changes

**NONE.** Prototype, frozen Grooming, Product Concept, domain, architecture, Linear statuses — не изменялись. Изменён только этот audit-артефакт.

## Next action

Owner/UX review of veterinary audit findings before P-02. Приоритет review: VUX-001 (S0-CANDIDATE, safety copy, стоп-фактор V3), затем VUX-005 и VUX-007 (S1-CANDIDATE, provenance/trust). Решение об изменениях prototype — только через triage по правилам `ux-validation-gate.md`.

## Final freeze review (2026-09-03)

Проведён узкий final review перед freeze. Разбор VUX-002: **NON-BLOCKING FOR P-02** (см. запись finding — conversational awkwardness, не safety/urgency/escalation проблема; red flag не может быть пропущен, т.к. шаг 4 задаётся всем; новые medical thresholds не вводились). Prototype по VUX-002 **не изменён** (нет исправлений «для красоты»).

Остальные открытые findings (VUX-008, VUX-009, VUX-011, VUX-012, VUX-013): ни одно не искажает safety/trust/comprehension invariant — все DEFERRED (см. таблицу).

**VETERINARY_VALIDATION_BUILD_V1 — STATUS: FROZEN FOR VALIDATION (target: P-02, Owner Validation Wave 1).**
Build record: `../../prototypes/veterinary-validation-build-v1/BUILD.md`. Freeze ≠ production/medical/UX/domain approved.
