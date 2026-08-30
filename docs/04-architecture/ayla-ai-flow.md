# Ayla AI Flow — фактическая карта

**Status: DISCOVERY / NON-BINDING** — описание существующей системы по коду. НЕ переносится в Pet AI.
**Дата:** 2026-08-30

## Критический факт

В `apps/orchestrator/pipeline.py` есть «19-шаговый pipeline», **явно помеченный DEPRECATED — никогда не был подключён к ingress** (docstring `pipeline.py:1-25`). Живой путь: `apps/channels/max/handler.py` → `apps/orchestrator/turn_seam.py::orchestrate_turn` → `concierge.py` (global) / skill registry (per-tenant).

## Живой flow (global concierge path, проверен по коду)

```text
MAX webhook POST
→ apps/ingress/views.py::max_webhook → Redis Stream (enqueue)
→ apps/workers/consumer.py (XREADGROUP, PEL retry) → GlobalMaxHandler
→ handler.py::handle_global_max_event
    1. idempotency claim (дедуп событий)
    2. resolve bot_user + active conversation (sentinel, tenant=None)
    3. short_term.recall(conversation.id)                [Redis LIST history]
    4. record user message (Message table) + short_term.append
    5. safety gate evaluate_inbound (safety/gate.py)     [allow/clarify/block/handoff; crisis → canned reply]
    6. memory blocks: personal context + consent-gated MemoryEntry block
       (ayla_ai_core.memory.build_memory_block, confidence ≥0.8 / <0.4→«уточнить»)
    7. orchestrate_turn(TurnContext(surface="global"))
       → concierge.py::generate_concierge_reply
         → AIConcierge.send_message (ayla-ai-core):
           - store.load_recent_history (Message table, ≤10 msg, token budget 4000)
           - build_concierge_system_prompt (AYLA_MARKETPLACE_VOICE + date grounding
             + boundary rules + memory block; sanitization: brace-escape, control-char strip,
             <<<UNTRUSTED_CONTEXT>>> delimiters, MAX_CANDIDATES=25 assert)
           - RouterLLMClient → apps.llm.router (3-tier: tenant→skill→org; PII-wrapped; cost/audit)
           - _parse_completion → _dispatch_tool (DRF-241 hook):
               show_masters/show_salons/show_services → apps.marketplace.discovery (deterministic ORM)
           - multi-pass loop ≤ _max_llm_passes
           - promise-without-tool → ForcedToolRetry (принудительный tool call)
         → guard_outbound (PII/prompt-leak/medical-guarantee regexes; blocked → replacement)
         → record assistant message (tokens, latency) — transcript = то, что увидел user
    8. send to MAX (keyboard из action_data)
    9. post-send best-effort: intent log, memory extraction → ayla_bridge (consent-gated),
       AIRequestMetric, audit, events
```

## Компоненты (факты)

| Компонент | Где | Что делает |
|---|---|---|
| System prompts | CORE `prompts.py:88-174` SYSTEM_PROMPT_TEMPLATE + 2 frozen voices; `composer.py` (byte-identical guarantee); PLATFORM `concierge.py:981` assembly | Русскоязычные шаблоны, tool-first правило, anti-injection escape |
| Conversation state | `apps/conversations/models.py` (Conversation:55, Message:365) + Redis short_term + CORE ConversationStore protocol | Три слоя: БД, Redis, DI-абстракция |
| Memory retrieval | `apps/identity MemoryEntry` (provenance+consent) + `apps/kb` (ChromaDB RAG: tenant + global-fallback collections, `source_uri`) | Два разных механизма: факты о пользователе и KB-RAG |
| Tool orchestration | CORE `tools.py` (5 OpenAI function specs), `tool_handlers.py` (side-effect-free); PLATFORM `_dispatch_tool` hook + tool specs | «First non-clarification wins» при parallel calls |
| Structured outputs | `intent_router.py` (gpt-4o-mini JSON); schema prompts + fence stripper | Intent classification отдельной дешёвой моделью |
| Provider search/matching | `apps/marketplace/discovery.py` (1820 строк, sole sanctioned cross-tenant read, lint MKT1) | LLM эмитит tool call с фильтрами, платформа делает детерминированный ORM-запрос: «the model is not the authority on what exists» |
| Guardrails | `tool_handlers.py` (ID validation vs candidate_ids, hallucinated ID → ask_clarification); `safety/{gate,pre_check,post_check}.py`; PII tokenizer | Многоуровневые; задокументирован реальный инцидент 2026-04-27 |
| Async | Redis Streams (ingress) + Celery (32 task modules: shadow turns, KB reindex, purge) | Правило: LLM-bound jobs — на Celery, не на stream consumer |
| Persistence | Message rows (user+assistant), Redis, memory writes post-reply, AuditLog, AIRequestMetric, events | Assistant turn пишется один раз, после outbound guard |

## Интеграционный шов platform → core

- Git-pinned зависимость, smoke-test импорта.
- `concierge.py` (module docstring = контракт): `RouterLLMClient` (прокси на apps.llm.router), `GlobalConversationStore` (реализация CORE protocol), `_dispatch_tool` hook, prompt assembly.
- `turn_seam.py::orchestrate_turn` — нормализованная граница: `surface="global"` → concierge; `surface="per_tenant"` → skill registry (booking/faq skills; FAQ делает KB-RAG двухшаговым tool-use).

## Пробелы (факты)

- `apps/tools/registry.py` + `tool_invoker.py` — без живого caller на проверенном пути (жили в deprecated pipeline).
- `apps/promptreg` — степень живости UNCLEAR.
- Telegram/web handlers не инспектированы.
