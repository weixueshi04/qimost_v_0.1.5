# Platform Notes

Use this when adapting FinalsPilot to different agents.

## File-Based Agents

Codex, Claude Code, OpenCode, Hermes, and similar agents should use the full workflow:

- inspect files directly,
- write ledgers and artifacts,
- preserve `logs/session_state.json`,
- run Quality Checks before delivery.

## Hermes

Prefer Hermes when scheduled tasks and message gateways are available. Load `references/hermes-agent.md` for those details.

## Unsupported Web-Only Chat

Web-only AI without skill installation, file access, and persistent state is outside the main FinalsPilot target. Keep the workflow focused on installed/file-based agents.

If the user only has a knowledge-base product, use it as a retrieval or transcription helper behind an installed/file-based agent.

## Knowledge Bases

Use knowledge bases as retrieval helpers. Load `references/knowledge-base-platforms.md` when retrieval evidence matters.
