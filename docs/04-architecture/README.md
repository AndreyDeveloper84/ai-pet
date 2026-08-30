# 04 — Architecture

**Status: DRAFT — заблокировано ARCHITECTURE GATE**

Minimum viable architecture выбирается после DOMAIN GATE и REUSE GATE (Ayla reuse audit).

## Порядок gates

```text
UX GATE → DOMAIN GATE → REUSE GATE (Ayla) → ARCHITECTURE GATE → DEVELOPMENT GATE
```

## Что разрешено сейчас (reversible technical foundation)

- lint/test tooling, CI skeleton;
- basic application shell;
- environment setup;
- mock API boundaries;
- технический spike reuse Ayla (без масштабного рефакторинга);
- throwaway prototype при необходимости.

## Что запрещено до gates

См. `../../AGENTS.md` §5. В частности: финальная DB schema, payments, production-grade Vetmanager integration, сложная Memory architecture.

## Открытые архитектурные вопросы (не решать заранее)

- Технологический стек MVP — **OPEN QUESTION**, не выбран.
- Степень переиспользования Ayla — определит REUSE GATE (matrix: REUSE AS IS / EXTEND / GENERALIZE / PET ONLY / DO NOT REUSE).
