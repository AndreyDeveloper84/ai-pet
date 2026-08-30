# Screen Inventory

**Status: DRAFT** (инвентаризация по зафиксированным flows; детализация экранов — в low-fi prototype; не сверено с макетами — макеты не предоставлены)

## Onboarding

| ID | Экран | Назначение |
|---|---|---|
| O01 | Зачем Pet AI | Ценностное предложение: AI, который знает вашего питомца |
| O02 | Кто ваш питомец | Базовая идентификация: имя, вид (собака — MVP), минимум полей |
| O03 | Расскажите о питомце | Free-text / голос; AI извлекает данные |
| O04 | Вот что я понял | Показ извлечённых данных с provenance до сохранения |
| — | Save Pet → H01 | Создание питомца, переход на Home |

## Core zones

| ID | Экран | Назначение |
|---|---|---|
| H01 | Home | State-driven: текущее состояние, действия, доступ к Pet AI |
| H02 | History (Timeline) | Значимые события жизни питомца |
| HIST01 | History — post-loop state | Состояние H02 после completed service: новое событие Timeline с source/provider |
| C01 | Care | Необходимые/рекомендованные действия |
| P01 | Profile | Профиль питомца + Memory с provenance |

## AI layer

Конвенция ID (2026-08-30): общий shell — без префикса; vertical-specific шаги — с префиксом вертикала (`V` — veterinary).

| ID | Экран/состояние | Назначение |
|---|---|---|
| AI01 | Contextual response | Ответ AI на Need с использованием контекста питомца (история, прошлый специалист, особенности) — не generic |
| AI02 | Previous relationship decision | «Повторить у {специалиста}» / «Подобрать другого» (Relationship before marketplace) |
| VAI01 | Vet contextual response | AI01 + релевантная мед. история (похожий эпизод, врач); явно «не диагноз» |
| VAI02 | Adaptive intake | Последовательные safety-вопросы сценария; известное не переспрашивается; red flag → пропуск |
| VAI03 | Care Decision | Структура: что известно → urgency → почему → действие. Urgency: OBSERVATION / PLANNED_VISIT / TODAY / EMERGENCY |
| VAI03-E | Emergency state | Без marketplace/цен/обычного booking; CTA: urgent care / call / route + сводка для врача |

## Marketplace / Booking

| ID | Экран | Назначение |
|---|---|---|
| M01 | Curated candidates | Максимум 3 кандидата с объяснениями и trade-offs |
| M02 | Provider profile | Профиль в контексте Provider × Pet × Need |
| M03 | Catalog (fallback) | Полный каталог — только как fallback |
| B01 | Booking review | Проверка слота/условий перед подтверждением; блок «Что получит специалист» |
| B02 | Booking confirmed | Только после фактического confirm (state machine) |
| B03 | Booking alternatives | Занятый слот → полезные альтернативы |
| VM01 | Vet curated candidates | M01 + поле competence; relationship не побеждает отсутствие компетенции |
| VM02 | Veterinarian profile | Квалификация, специализация, верификация, клиника (не портфолио) |
| VB01 | Vet booking review | B01 + «посмотреть/изменить передаваемый контекст»; симптомы, intake, прошлый эпизод, фото |
| VB02 | Vet booking confirmed | Как B02, state machine |

## Result / Loop closing

| ID | Экран | Назначение |
|---|---|---|
| R01 | Service result | Результат услуги от провайдера |
| R02 | Feedback | Оценка владельцем |
| R03 | Timeline update view | Что добавилось в Timeline/Memory |
| VR01 | Structured visit result | Doctor Result / Pet AI Explanation — раздельно, с источниками |
| VC01 | Care Plan / Follow-up | Активное лечение, today actions, follow-up; owner observation ≠ medical outcome |

## Provider side (MVP, может быть simple web UI)

| ID | Экран | Назначение |
|---|---|---|
| PR01 | Incoming booking | Детали записи + allowed Pet Context |
| PR02 | Complete service | Отметка выполнения + result/recommendation |

## Примечания

- Группировка по flows, а не по отдельным UI states (одна задача на flow).
- Экраны PR01/PR02 — минимально необходимые; не CRM.
- Состав будет скорректирован после owner/provider tests.
