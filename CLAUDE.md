<!-- #region @enhanced-dom/claude - react -->
## React code

**Whenever writing, reviewing, or refactoring React code**, use the `react` skill for this project's conventions on component/file structure, styling, module boundaries, documentation, and testing.
<!-- #endregion @enhanced-dom/claude - react -->

<!-- #region @enhanced-dom/claude - code -->
## Code conventions

**Whenever writing, reviewing, or refactoring code**, use the `code` skill for this project's conventions on structure, styling, file/module boundaries, documentation, and testing.
<!-- #endregion @enhanced-dom/claude - code -->

<!-- #region @enhanced-dom/claude - agent -->
## Agent collaboration

**Whenever delegating to sub-agents, deciding how verbose to be, or planning work**, use the `agent` skill for this project's conventions.
<!-- #endregion @enhanced-dom/claude - agent -->

<!-- #region @enhanced-dom/claude - rtk -->
## RTK usage (Golden Rule)

**Always prefix commands with `rtk` if it is installed, otherwise run the command directly.** If RTK has a dedicated filter, it uses it. If not, it passes through unchanged.

Check once per session whether RTK is available, before doing the first command you might otherwise do with rtk:
```bash
command -v rtk &>/dev/null && echo "rtk available" || echo "rtk not installed — use commands directly"
```

**Important**: Even in command chains with `&&`, use `rtk` when available:
```bash
# ❌ Wrong (when rtk is installed)
git add . && git commit -m "msg" && git push

# ✅ Correct (when rtk is installed)
rtk git add . && rtk git commit -m "msg" && rtk git push

# ✅ Correct (when rtk is NOT installed)
git add . && git commit -m "msg" && git push
```

**Important**: if an agent is spawned, it needs to be instructed to use `rtk`, if available

See the `rtk` skill for the full command reference, but load it only if you need to run a cli command.
<!-- #endregion @enhanced-dom/claude - rtk -->
