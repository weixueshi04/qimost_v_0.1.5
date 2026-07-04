# Release Process

## Version Policy

Use `vMAJOR.MINOR.PATCH` Git tags.

- `PATCH`: wording, prompt robustness, compatibility notes, smaller quality gates.
- `MINOR`: new artifacts, new agent wrappers, new validation scripts, or new workflow stages that remain backward compatible.
- `MAJOR`: breaking changes to workspace layout, invocation style, required artifacts, or phase order.

## Before Tagging

1. Update version in `SKILL.md` heading/frontmatter if present.
2. Update `CHANGELOG.md`.
3. Check Markdown fences:

   ```powershell
   $ticks = [string]::new([char]96, 3)
   (Select-String -LiteralPath .\SKILL.md -Pattern $ticks -SimpleMatch).Count
   ```

   The count should be even.

4. Check wrappers:

   ```powershell
   Get-Content .\.agents\skills\qimo-speedrun\SKILL.md
   Get-Content .\.claude\skills\qimo-speedrun\SKILL.md
   Get-Content .\.opencode\skills\qimo-speedrun\SKILL.md
   ```

5. Run one dry prompt in a file-based agent. For Hermes, also dry-run the scheduled follow-up prompt after generating a paper. Verify original courseware review and active coaching prompts appear in the workflow.

## Suggested Git Commands

```powershell
git init
git add .
git commit -m "Release qimo-speedrun v0.2.0"
git tag v0.2.0
git remote add origin https://github.com/<owner>/<repo>.git
git push -u origin main --tags
```

Replace `<owner>/<repo>` with the real GitHub repository path.
