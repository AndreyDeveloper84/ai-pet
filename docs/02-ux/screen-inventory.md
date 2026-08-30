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
| C01 | Care | Необходимые/рекомендованные действия |
| P01 | Profile | Профиль питомца + Memory с provenance |

## AI layer

| ID | Экран/состояние | Назначение |
|---|---|---|
| AI01 | Pet AI entry (global) | Контекстный вход из любой зоны |
| AI02 | Need understanding | Диалог уточнения Need с учётом контекста |
| AI03 | Adaptive intake (Vet) | Сбор симптомов, urgency, red flags |
| AI04 | Care Decision | Рекомендация следующего действия |

## Marketplace / Booking

| ID | Экран | Назначение |
|---|---|---|
| M01 | Curated candidates | Максимум 3 кандидата с объяснениями и trade-offs |
| M02 | Provider profile | Профиль в контексте Provider × Pet × Need |
| M03 | Catalog (fallback) | Полный каталог — только как fallback |
| B01 | Booking review | Проверка слота/условий перед подтверждением |
| B02 | Booking confirmed | Подтверждение + что дальше |
| B03 | Booking alternatives | Занятый слот → полезные альтернативы |

## Result / Loop closing

| ID | Экран | Назначение |
|---|---|---|
| R01 | Service result | Результат услуги от провайдера |
| R02 | Feedback | Оценка владельцем |
| R03 | Timeline update view | Что добавилось в Timeline/Memory |

## Provider side (MVP, может быть simple web UI)

| ID | Экран | Назначение |
|---|---|---|
| PR01 | Incoming booking | Детали записи + allowed Pet Context |
| PR02 | Complete service | Отметка выполнения + result/recommendation |

## Примечания

- Группировка по flows, а не по отдельным UI states (одна задача на flow).
- Экраны PR01/PR02 — минимально необходимые; не CRM.
- Состав будет скорректирован после owner/provider tests.
