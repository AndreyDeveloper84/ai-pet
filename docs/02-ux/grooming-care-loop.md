# Grooming Care Loop

**Status: REVIEW** (основной transactional vertical slice; подлежит owner/provider тестам)

## Триггер-пример

> «Боню пора привести в порядок».

## Flow

```text
Home
→ Pet AI
→ понять Need
→ использовать предыдущую историю
→ previous relationship
→ matching
→ provider
→ booking
→ service
→ result
→ feedback
→ Timeline
→ Memory / Care
→ rebooking
```

## Ключевые UX-требования по шагам

### Need understanding

- AI сначала использует контекст: порода, прошлые груминги, Memory («боится сильной сушки», source=OWNER, status=CURRENT).
- Не переспрашивать известное (Context before questions).

### Previous relationship

- Если у питомца есть проверенный грумер и Need соответствует его компетенции — предложить его первым (Relationship before marketplace).

### Matching

- Максимум 3 AI-curated candidates + объяснение: почему подходит, availability, цена, расстояние, trust, trade-off.
- Полный каталог — fallback.
- Детерминированные правила: `../06-marketplace/matching-principles.md`.

### Booking

- Lifecycle: `AVAILABLE → BOOKING REVIEW → CONFIRMED → COMPLETED` (+`CANCELLED`).
- Занятый слот → полезные альтернативы (другое время у того же / другой подходящий).

### Service → Result → Feedback

- Провайдер завершает услугу и оставляет result/recommendation (completion notes).
- Владелец оставляет feedback.

### Loop closing (обязательно)

- Результат возвращается в Pet Context: событие Timeline («груминг у X, дата, результат») + обновление Memory/Care при наличии новых знаний (source=PROVIDER).
- Следующий цикл короче: Care может сформировать напоминание о следующем груминге; rebooking через previous relationship — в минимум шагов.

## Acceptance criteria (для UX-теста)

- Владелец понимает, почему предложены именно эти грумеры.
- Владелец видит, что AI использовал историю питомца.
- После completed service владелец видит, что Pet AI «стал знать питомца лучше».
- Повторный сценарий заметно короче первого.

## Связанные документы

- `screen-inventory.md` (M01–M03, B01–B03, R01–R03, PR01–PR02)
- `../05-ai/ai-role.md`, `../06-marketplace/*`
