# Changelog

## 0.1.9 - 2026-07-02

- Added Hermes-first active coordination with scheduled follow-up tasks, cron/reminder prompts, and QQ/WeChat/app message-gateway guidance.
- Added `references/hermes-agent.md` for timed paper checks, recitation reminders, sleep/wake prompts, reply handling, and task logging.
- Added `references/knowledge-base-platforms.md` to constrain Tencent ima, Kimi, Tongyi Tingwu, and similar knowledge-base retrieval workflows.
- Added `references/evolution-and-incident-review.md` with correction incident logs, root-cause classification, post-run retrospectives, and skill-improvement candidates.
- Added lightweight reference files for workflow, auto-intake, chart handling, exam rubrics, output templates, and platform notes so all `SKILL.md` reference links resolve.
- Updated the main workflow, output standards, and course workspace logs for follow-up tasks, retrieval receipts, correction incidents, and autonomous evolution.

## 0.1.8 - 2026-07-02

- Added an Original Source Verification Gate so answers to specific questions, cases, concepts, formulas, events, and teacher examples must check the original slide/page/transcript/question when available.
- Added a no-second-hand-answer rule: answer letters, indexes, OCR snippets, search results, and previous generated files cannot be trusted until the original stem/options/facts are verified.
- Reworked the case-analysis gate into a cross-discipline Concept, Case, and Question Clarification Gate for STEM, engineering, economics, management, humanities, and social science courses.
- Added subject/entity relationship mapping so explanations must clarify parties, objects, variables, actors, texts, events, mechanisms, and their relationships before giving conclusions.
- Expanded Quality Checks and output standards to include original-source verification and subject/entity clarity.

## 0.1.7 - 2026-07-02

- Added mandatory Quality Checks for every major artifact so shallow, generic, unverifiable, or badly aligned outputs must be revised before delivery.
- Added a compact Quality Check Report format covering evidence grounding, exam alignment, direct study value, difficulty calibration, missing inputs, and next quality risk.
- Added garbage-output red flags for frameworks, mock exams, answer keys, recitation packs, final sprint sheets, coaching responses, and impossible plans.
- Added difficulty and score target calibration modes: pass, standard, high-score, and pressure simulation.

## 0.1.6 - 2026-07-02

- Added a mandatory source coverage ledger to prevent skipped PPT, audio, image, homework, and review materials from being treated as read.
- Added a source priority hierarchy: current teacher instructions and review recordings override PPT/courseware, homework, past papers, and general knowledge.
- Added `logs/exam_rules.md` as a current-exam rule lock so old paper marks and patterns cannot silently override this year's teacher guidance.
- Added `logs/session_state.json` and a strict phase state machine to reduce step-jumping when the student asks side questions mid-workflow.
- Added side-question handling: answer the question, record weak points when relevant, then return to the saved workflow phase.
- Added low-tool / web chat checkpoint mode with a pasteable `STATE SNAPSHOT` for platforms that cannot reliably read files or persist state.
- Added GitHub-ready repository documentation, agent installation notes, repo-local wrappers for Codex/Claude Code/OpenCode, OpenAI UI metadata, and privacy-oriented `.gitignore`.
- Shortened the skill frontmatter description for cross-agent compatibility.
