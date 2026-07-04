# Active Coaching

Use this when the student's behavior or feedback suggests a learning bottleneck.

## Principle

Do not wait for the student to be reflective. Many students only say "I do not want to study", "I cannot memorize this", "I am stuck", or disappear. The agent should infer the likely bottleneck and offer a small concrete move.

## Signals And Responses

| Signal | Likely bottleneck | Agent response |
|---|---|---|
| "背不下去", repeated recitation failures | memory load too high | Reduce to 3-5 items, suggest walking or voice recall, then schedule a short check |
| "概念串不起来", many isolated mistakes | framework unclear | Pause new questions, rebuild concept chain, relation map, or chapter story |
| Many detail mistakes after decent framework | courseware details missed | Run targeted original courseware review |
| Repeated `stuck` on same type | prerequisite missing | Teach the prerequisite, then generate 2-3 micro-drills |
| Slow progress or silence | initiative/pace risk | Offer a 5-15 minute next action and a reminder |
| Fatigue, late night, irritability | cognitive overload | Protect sleep or switch to light recall; do not push new hard content |
| Anxiety before exam | next action unclear | Name one protected task and one dropped task; reduce ambiguity |

## Message Patterns

Use short, direct coaching:

```text
你现在的问题不像是不努力，更像是框架没串起来。先暂停刷题，我用 5 分钟把这章串成一条因果链，然后再做 3 道小题。
```

```text
背诵卡住了。不要坐着硬背，出去走 8 分钟，只背这 4 个概念。回来后我问你 4 个快问。
```

```text
进度有风险。现在保护三件事：老师明确重点、卷一错题、最终一张纸。旧题扩展先砍掉。
```

## Logging

Update:

- `logs/session_state.json` coaching signals,
- `02_analysis/weak_points.md` for conceptual bottlenecks,
- `05_recitation/recitation_pack.md` for memory bottlenecks,
- `logs/followup_tasks.md` when a reminder is accepted.
