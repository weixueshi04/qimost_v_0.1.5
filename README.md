# Qimo Speedrun

`qimo-speedrun` is an Agent Skill for university finals review. It turns messy course materials into a 10-12 hour, source-grounded sprint path: material coverage, teacher-priority extraction, knowledge framework, courseware question bank, staged mock exams, mistake review, rolling recitation, scheduled follow-ups, and final memory sheet.

The skill was shaped by real finals-week usage. A course run using earlier versions reached 91, but exposed failure modes this repo now treats as first-class constraints: incomplete material reading, unverified secondary answers, lost workflow state, repeated answer mistakes without durable correction, and over-weighting past papers over the teacher's current instructions.

## What Makes It Different

- Source coverage ledger before synthesis: every PPT, recording, homework item, and past paper must be marked complete, partial, unreadable, or explicitly skipped.
- Original-source verification before correction: specific questions, cases, concepts, formulas, and teacher examples must be checked against the original slide/page/transcript/question when available.
- Teacher-first evidence hierarchy: current exam rules and review recordings override old papers and generic subject knowledge.
- Stateful phase machine: side questions are answered without jumping the workflow to the final sprint.
- Hermes-first active coordination: agents with cron/reminder/message gateways should create confirmed follow-up tasks for timed papers, recitation, sleep, and progress checks.
- Correction-incident review: wrong answers must be source-checked, classified, logged, and used to revise affected artifacts.
- Knowledge-base retrieval discipline: ima/Kimi/Tongyi-style platforms are retrieval helpers, not proof of full reading unless exact source evidence is exposed.
- Cross-discipline clarification: STEM, engineering, economics, management, humanities, and social science explanations must identify the relevant subjects, objects, variables, actors, texts, events, and relationships.
- Mandatory Quality Checks: shallow, generic, unverifiable, or badly aligned artifacts must be revised before they waste the student's pre-exam time.
- Low-tool web chat fallback remains available, but the recommended use is a file-based agent such as Hermes, Codex, Claude Code, or OpenCode.

## Repository Layout

```text
.
├── SKILL.md                         # Canonical skill body
├── CHANGELOG.md                     # Version history
├── AGENTS.md                        # Repo guidance for coding agents
├── agents/openai.yaml               # Codex UI metadata
├── .agents/skills/qimo-speedrun/    # Codex/OpenCode repo-local entry
├── .claude/skills/qimo-speedrun/    # Claude Code repo-local entry
├── .opencode/skills/qimo-speedrun/  # OpenCode repo-local entry
├── references/                      # Conditional operating notes
└── docs/
    ├── agent-installation.md
    └── release-process.md
```

The canonical skill is `SKILL.md`. The hidden agent directories are thin wrappers that tell repo-local agents to load the canonical file, so the instructions have one source of truth.

## Quick Install

Clone this repository, then either:

1. Use it as a repo-local skill by opening the cloned repo in Hermes, Codex, Claude Code, OpenCode, or another file-based agent.
2. Install it as a global/user skill by copying the repository folder into your agent's skills directory.
3. If you must use a low-tool web chat, paste `SKILL.md` and use the `STATE SNAPSHOT` checkpoint mode.

See [docs/agent-installation.md](docs/agent-installation.md) for Codex, Claude Code, OpenCode, and Hermes notes.

## Recommended Invocation

```text
Use $qimo-speedrun. I have one unsorted course folder for a final exam. First build source coverage and exam rules; if scheduled tasks/message reminders are available, ask me before creating timed check-ins. Do not generate exams until the review recording and PPTs are accounted for.
```

## Versioning

Use SemVer-ish versions:

- Patch: wording, compatibility, quality gates, small workflow fixes.
- Minor: new artifacts, new agent entrypoints, new validation scripts.
- Major: breaking workflow or file layout changes.

See [docs/release-process.md](docs/release-process.md).

## License

License is not set yet. Decide this before public GitHub release; MIT is simplest for broad reuse, while CC BY 4.0 may fit if you treat this primarily as instructional content.
