# Platform Notes

Use this when adapting Qimo Speedrun to different agents.

## File-Based Agents

Codex, Claude Code, OpenCode, Hermes, and similar agents should use the full workflow:

- inspect files directly,
- write ledgers and artifacts,
- preserve `logs/session_state.json`,
- run Quality Checks before delivery.

## Hermes

Prefer Hermes when scheduled tasks and message gateways are available. Load `references/hermes-agent.md` for those details.

## Low-Tool Chat

When an environment cannot inspect files or persist state, use Low-Tool / Web Chat Mode:

- process material in batches,
- keep visible coverage tables,
- output `STATE SNAPSHOT`,
- avoid claiming full reading.

## Knowledge Bases

Use knowledge bases as retrieval helpers. Load `references/knowledge-base-platforms.md` when retrieval evidence matters.
