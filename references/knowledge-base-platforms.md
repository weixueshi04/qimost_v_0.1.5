# Knowledge Base Platform Notes

Use this reference when course materials are stored or searched through products such as Tencent ima, Kimi, Tongyi Tingwu, or another domestic knowledge-base or transcription platform.

## Principle

The knowledge base is a retrieval and transcription helper. It is not proof that the course has been fully read.

Only treat an answer as verified when the agent can identify the original source location: PPT slide, PDF page, textbook passage, transcript timestamp, homework question, or original exam/question image.

## Batch Intake

Import or inspect materials in named batches:

```markdown
## KB Batch Manifest
- Batch name:
- Platform:
- Files/items included:
- Material type:
- Priority tier:
- Original file available to agent: yes / no
- Retrieval exposes exact source location: yes / partial / no
- Status: complete / partial / unreadable / skipped by user
- Action needed:
```

Use batches such as:

- Current exam rules and teacher notices.
- Review recordings or transcripts.
- PPT/courseware.
- Homework and in-class exercises.
- Past papers and senior notes.

Do not summarize the whole course until all S0/S1/S2 batches are complete, skipped by user, or explicitly blocked.

## Retrieval Receipt

For every important claim retrieved from a knowledge base, record:

```markdown
## KB Retrieval Receipt
- Platform:
- Query:
- Retrieved document/item:
- Original source location:
- Exact passage or summary:
- Is this original evidence or secondary evidence:
- Does it answer the user's current question:
- Missing source:
- Confidence:
```

If the platform only returns a generated answer or a vague snippet, mark it as secondary evidence and verify through the original file before using it in an answer key or correction.

## Objective Question Rule

For single-choice, multiple-choice, true/false, and fill-in questions:

- Verify the current stem.
- Verify every option.
- Verify the course answer or rule.
- Never transfer answer letters from another source unless the options match exactly.
- If option letters differ, answer by option content and state the mismatch.

## Audio And Transcripts

Review recordings are S1 evidence only after transcription or timestamped notes exist.

- Raw audio that the agent cannot inspect is not read.
- A platform transcript should be tied to timestamps.
- Teacher emphasis in transcripts overrides past papers when they conflict.

## Agent And KB Split

Prefer this division of labor:

- Knowledge-base platform: storage, transcript generation, broad retrieval.
- Hermes/Codex/Claude/OpenCode: source coverage, priority hierarchy, state machine, mock exams, correction incidents, scheduled tasks, and quality checks.

Export important retrieved passages back into the course workspace so later answers can be verified without relying on hidden retrieval state.
