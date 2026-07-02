# Agent Installation

This repo keeps `SKILL.md` as the canonical skill. Install the whole repository as a skill folder, or use the repo-local wrappers already included under `.agents/`, `.claude/`, and `.opencode/`.

## Codex

Codex supports skills with a `SKILL.md` file and optional `agents/openai.yaml` UI metadata.

Recommended options:

- Global/user install: copy or clone this repo as a skill folder named `qimo-speedrun` under your Codex skills directory.
- Repo-local install: open this repo directly; `.agents/skills/qimo-speedrun/SKILL.md` forwards to root `SKILL.md`.
- Explicit invocation: `Use $qimo-speedrun ...`

Official docs: [OpenAI Codex Skills](https://developers.openai.com/codex/skills).

## Claude Code

Claude Code supports Agent Skills with `SKILL.md` and can discover skills from Claude skill locations.

Recommended options:

- Global/user install: copy or clone this repo as a Claude skill folder named `qimo-speedrun`.
- Repo-local install: open this repo directly; `.claude/skills/qimo-speedrun/SKILL.md` forwards to root `SKILL.md`.
- Explicit invocation: ask Claude Code to use `qimo-speedrun` or paste the root `SKILL.md` if discovery is unavailable.

Official docs: [Claude Code Skills](https://docs.anthropic.com/en/docs/claude-code/skills).

## OpenCode

OpenCode supports Agent Skills in `~/.opencode/skill`, project `.opencode/skill`, and compatible `.claude/skills` / `.agents/skills` paths.

Recommended options:

- Global/user install: copy or clone this repo into an OpenCode skill location as `qimo-speedrun`.
- Repo-local install: open this repo directly; `.opencode/skills/qimo-speedrun/SKILL.md` forwards to root `SKILL.md`.
- Explicit invocation: `Use the qimo-speedrun skill ...`

Official docs: [OpenCode Agent Skills](https://opencode.ai/docs/skills/).

## Hermes

Hermes is the preferred target for active Qimo Speedrun runs when it can persist files, create scheduled tasks, and send reminders through QQ, WeChat, or another message gateway.

Recommended options:

- Install this repo as a plain `SKILL.md` package if your Hermes build supports Agent Skills or skill folders.
- Keep the whole repository available so Hermes can load `references/hermes-agent.md`, `references/knowledge-base-platforms.md`, and `references/evolution-and-incident-review.md` when needed.
- If Hermes exposes cron/reminder/message tools, let the skill propose timed checks after study plans, generated papers, mistake reviews, recitation blocks, sleep blocks, and final sprint sheets.
- Do not let Hermes create reminders silently; confirm time, channel, and purpose first.

Recommended invocation:

```text
Use qimo-speedrun. Start with capability check, source coverage, and current exam rules. Use Hermes scheduled tasks/message reminders when helpful, but ask me before creating them. Do not generate exams until high-priority teacher materials are accounted for.
```

## Web Chat / Knowledge Base Products

For ima, Kimi, Tongyi Tingwu, Gemini AI Studio, DeepSeek web, or similar products:

- Paste `SKILL.md` first.
- Ask the model to enter Low-Tool / Web Chat Mode.
- Upload or paste materials in batches.
- Require a `STATE SNAPSHOT` at the end of every response.
- Treat knowledge-base retrieval as secondary evidence unless the product shows exact original source documents, pages, slides, passages, or timestamps.
