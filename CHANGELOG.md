# Changelog

Format: [Keep a Changelog](https://keepachangelog.com/en/1.1.0/). Newest first.

## [0.1.29] - 2026-04-25

- **Sign chip** in the Build card header — switch keystore per build. **Default** = Gradle's own signing; saved signatures inject `-Pandroid.injected.signing.*` at build time.
- **Setup `<Variant>` signature** overlay: pick an existing keystore (Detect aliases) or **Generate new** via `keytool`. Passwords go to OS keychain.
- **Auto-inject `signingConfigs`** into `build.gradle.kts` or `build.gradle` (Groovy DSL) with diff preview; idempotent.
- **Logcat — perf:** incremental tag-dedup (was scanning all ~8 000 rows per batch); fixed PID-resolve re-entrancy / stale-result race on rapid filter/device switches.
- **Polish:** per-tab `aria-busy` / `aria-disabled` on project switcher; red `border-left` accent on `java-procs` error chip; POSIX single-quote escaping for Gradle args (`$` / backtick safe).

## [0.1.28] - 2026-04-25

- **Logcat:** new **Crash** and **Stack trace** entries in the Level dropdown for quick narrowing; an **All levels** toggle at the top.
- **Logcat — Timeline:** consecutive rows sharing the same tag hide the repeat for cleaner reading.
- **Logcat — selection bar** is now a floating overlay; no longer pushes log output down.
- **Logcat — UX polish:** inline regex feedback, tighter filter responsiveness, scroll-paused indicator, preset overwrite confirm, tag-chip *Create* suggestion, **Esc** focus return, trash icon for **Clear**.
- **Build & install:** improved cancel and lifecycle handling around AVD cold-boot, terminal-task builds, and variant validation.
- **APK cache:** new **Android: Clean APK Cache** command; the cache panel preserves scroll position on refresh.
- **Debug:** more reliable cleanup when an attach session disconnects unexpectedly.
- **Build output:** clearer diagnostics when `applicationId` cannot be resolved automatically.

## [0.1.27] - 2026-04-25

- **Unified UI style:** checkboxes, radios, and primary buttons across all panels redrawn in **Material 3 Expressive** with JB-style accent.
- **Toggle color:** **Timeline**, **Soft-wrap**, and Search toggles now use the same primary blue as **Install APK** when active.

## [0.1.26] - 2026-04-25

- **Panel — unified Build card:** *Build flavor* and *Device & build* merged into one **Build** card. The `module / variant` breadcrumb and the device chip are now inline pickers — click `module`, `variant`, or the device pill to open the matching picker. **Discover variants** and **Clear variant** moved into a `⋮` overflow menu.
- **Variant pick no longer overwrites the module:** the variant quick-pick is scoped to the **current module** and only writes the variant back. If that module has no cached variants, you're prompted to run **Discover variants** for it.
- **Logs section icons:** **smartphone** (Logcat), **wrench** (Build output), **article** (System log) — replaces the previous terminal / article / sliders set.
- **Project tabs:** softer active-tab highlight (1px tinted border, no drop-shadow).

## [0.1.25] - 2026-04-25

- **Logcat — toolbar:** redesigned bar with in-toolbar **device picker** (status dot + chevron) and **package filter** dropdown; **Tags** and **Level** consolidated into chevron menus; **Timeline** toggle replaces the format/timestamp button.
- **Logcat — level filter:** multi-select **V / D / I / W / E / F** chips (replaces the single "minimum level" dropdown); badge shows count when not all are active.
- **Logcat — package filter:** accepts **comma-separated packages**; quick-pick combines **tags from logs** + **installed packages** (`pm list packages`) with multi-select and a *Clear selection* action; live **PID re-resolve every ~2s** so app restarts keep matching.
- **Logcat — project autodetect:** on open, package filter is pre-filled from the workspace's resolved Android `applicationId` (module + variant aware).
- **Logcat — stack traces:** click `File.kt:42` style links in messages to open the file at that line via `workspace.findFiles` (with disambiguation pick on multiple matches).
- **Logcat — export:** **Export** action saves the currently filtered entries to `.txt` / `.log` via the Save dialog.
- **Logcat — presets:** save / load / delete up to **10 named filter presets** (level + tag + package + query + regex), persisted in `globalState`.
- **Logcat — overflow menu:** *Collapse repeated rows* and other view options moved into a `⋮` overflow menu.

## [0.1.24] - 2026-04-23

- **Logcat:** tag chip input with autocomplete; **Formatted view** toggle (ms timestamp + second timeline separators); row selection (shift-click range), **Copy selected**, per-line copy button.
- **Debug:** **EXP** badge restored on Attach debug; `DebugAdapterDescriptorFactory` registered lazily on first attach.
- **Internet relay:** Install APK device picker restored; download shows live % progress.
- **Remote ADB bridge:** socket pauses on high WS buffer and resumes on `drain`.

## [0.1.23] - 2026-04-22

- **Wireless Remote ADB** re-enabled: panel tabs (Same Wi-Fi / Internet relay / VPN/mesh) are now visible by default.
- **Internet relay — Install APK:** device picker with **Refresh** + **Install APK** button; inline status feedback; downloads and installs `adb-relay-android` directly from the IDE.
- Removed bundled `tools/remote-adb-relay/relay.cjs`; relay host is now the standalone **[adb-relay-jvm](https://github.com/cuongnv126/adb-relay-jvm)**.
- **Debug:** `DebugAdapterDescriptorFactory` is now registered lazily — only when the user first clicks **Attach debug** — fixing "can only be registered once" errors on extension reload.
- **Debug:** Removed **EXP** badge from the Attach debug toolbar button; tooltip still says "experimental".
- **Internet relay:** Removed the **Copy config** snippet and button from the ADB Relay step.

## [0.1.22] - 2026-04-21

- **Launch after install:** **`cmd package resolve-activity --brief`** → **`am start -n`** when a component is returned; else **`am start`** with **MAIN/LAUNCHER** + package, then **`monkey`**. Try several **installed package ids** (`pm list` / **`pm path`**, including **`.debug`**) until one works.
- **Launch package detection:** **`applicationId` from the installed APK** via **`aapt dump badging`** — path from the **Gradle “Installing APK …”** line when possible, else **newest `build/outputs/apk`** for the module; hints if **`aapt`** is missing; Gradle fallback includes **Kotlin DSL** **`applicationIdSuffix`** in **`getByName` / `named` / `create` / `register`** blocks.

## [0.1.21] - 2026-04-20

- **Remote ADB over WebSocket** (optional): dev-side mux bridge (**Android: Start / Stop Remote ADB Bridge**), settings `remoteAdbRelayUrl`, `remoteAdbSessionToken`, `remoteAdbListenHost`, `remoteAdbLocalPort`; protocol **docs/remote-adb-bridge-protocol.md**; **tools/remote-adb-relay/** relay + LAN agent; npm script **`remote-adb:relay`**. Depends on **`ws`**. **Panel + command + device picker**: tabbed guide (**Same Wi‑Fi** / **Internet relay** / **VPN / mesh**), **●** indicator + **resume tab**. **Internet relay**: compact steps, **ADB Proxy** + optional Node agent, **Save & start bridge** (writes settings, restarts bridge). Copy **for phone** (URL + token).
- **SDK / adb**: optional `androidSdkPath`, env, or `local.properties` → consistent `adb` / `emulator` (Logcat, debug, launch, installs). Cold AVD + panel **Install**: **assemble** overlaps emulator start; emulator logs → **System Gradle Log**.
- **Devices**: auto-select keeps an offline AVD choice; **Choose…** busy while listing; warning if AVD list fails.

## [0.1.20] - 2026-04-18

- JVM CPU: sparkline scale near 0%, canvas/chip layout, dock spacing and contrast.
- Discover busy: circular progress on button + busy row (replaces spinning search icon).

## [0.1.19] - 2026-04-18

- **JVM CPU** dock: `jps` list, CPU %, aggregate sparkline; polls while panel visible; `jps` from JDK for Gradle → `JAVA_HOME` → `PATH`.

## [0.1.18] - 2026-04-18

- Default **isolated `GRADLE_USER_HOME`**, optional custom path; **Stop Gradle daemons** + idle `--stop` after N minutes; settings for window close / toast / log.
- **Codicons** and editor title order; panel + **Logcat** use inline SVG icons.

## [0.1.17] - 2026-04-18

- Marketplace **categories**: Programming Languages, Debuggers (was Other).

## [0.1.16] - 2026-04-18

- New marketplace icon; generate scripts; high-res source not in VSIX.

## [0.1.15] - 2026-04-17

### Added

- Panel **Settings** (gear): pick **JDK for Gradle** — scans installed JDKs, updates **`android-ide-extension.gradleJavaHome`** (workspace or user). **Android: Panel settings (JDK for Gradle)** command.
- **MIT LICENSE** in the repository root.

### Changed

- **Discover variants** failures: compact **Retry** row plus full details in **System Gradle Log** (no long inline error in the panel).
- **README** overhaul (overview hero, capability tables, GitHub-hosted **overview** screenshot); retired older multi-screenshot set.

## [0.1.14] - 2026-04-17

### Changed

- Disable **Cache APK on Compile / Install** while Gradle runs or variants are discovering (same as toolbar); dimmed when disabled.

## [0.1.13] - 2026-04-17

- Minify `out/` with Terser on publish; `build-vsix.cjs` recompiles after packaging so local `out/` stays readable.

## [0.1.12] - 2026-04-17

- **Experimental:** Android JDWP attach debugger (`android-jdwp`), DAP over JDWP + adb forwarding, process picker, **Android: Attach / Detach Debugger**, panel Debug card, Java/Kotlin breakpoints; diagnostics in System Gradle Log. Experimental only.
- Variant validation uses the cached list from **Discover variants** only (no extra Gradle resolve); rerun discover if stale.
- Panel UI refresh; device picking consolidated in `deviceInstallSerial.ts`.

## [0.1.11] - 2026-04-16

- Build output ends with a **BUILD SUMMARY** block; failed builds get a stored error doc.
- **Android: Show Full Build Errors** opens full errors; failed-build notification adds **View Full Errors**.
- Marketplace `displayName` / description / `logcat` keyword update.

## [0.1.10] - 2026-04-16

- Logcat webview (filters, colors, auto-scroll) + **Android: Logcat**; **System Gradle Log** channel + command/button.
- Auto device selection when adb devices change.
- Output card → **Console & Logs** (Logcat, Build, System).

## [0.1.9] - 2026-04-15

- Panel busy row + Cancel while discovering variants; cancel shared with progress dialog.
- Fix duplicate `--console=plain` on discovery Gradle CLI.

## [0.1.8] - 2026-04-15

- Discovery Gradle runs stream to Build channel when enabled; discovery uses `gradleExtraArgs`.
- Shared `LineBuffer` for spawn runner and CLI discovery.

## [0.1.7] - 2026-04-15

- **Sync Gradle** command (title bar, panel, palette).
- Cached APK copies after compile/install + **Open cached APK builds** webview; panel preview.
- Multi-root helpers (`androidModuleKind`, `gradleRootLabels`).
- VSIX default path `.build/`; panel/workspace/variant UX; root/module pick locked during builds; post-install `am start` + applicationId suffix resolution; device/project store tweaks.
- Fix variant alignment with Gradle/module context.

## [0.1.6] - 2026-04-15

- Exclude `media/screenshots` from VSIX; README images from GitHub URLs.

## [0.1.5] - 2026-04-15

- README screenshots + `scripts/png-rounded-corners.py`.

## [0.1.4] - 2026-04-15

- More reliable Gradle subproject / variant discovery.
- Debounced stored-variant validation against Gradle output.

## [0.1.3] - 2026-04-14

- Publisher `AndroidGradleTools`, id `AndroidGradleTools.android-ide-extension`; icon, keywords, banner, description.
- Generic variant picker copy; packaging/publish script updates.

## [0.1.2] - 2026-04-14

- Initial baseline before marketplace identity changes.

[0.1.26]: https://github.com/cuongnv126/android-ide-extension/compare/v0.1.25...v0.1.26
[0.1.25]: https://github.com/cuongnv126/android-ide-extension/compare/v0.1.24...v0.1.25
[0.1.24]: https://github.com/cuongnv126/android-ide-extension/compare/v0.1.23...v0.1.24
[0.1.23]: https://github.com/cuongnv126/android-ide-extension/compare/v0.1.22...v0.1.23
[0.1.22]: https://github.com/cuongnv126/android-ide-extension/compare/v0.1.21...v0.1.22
[0.1.21]: https://github.com/cuongnv126/android-ide-extension/compare/v0.1.20...v0.1.21
[0.1.20]: https://github.com/cuongnv126/android-ide-extension/compare/v0.1.19...v0.1.20
[0.1.19]: https://github.com/cuongnv126/android-ide-extension/compare/v0.1.18...v0.1.19
[0.1.18]: https://github.com/cuongnv126/android-ide-extension/compare/v0.1.17...v0.1.18
[0.1.17]: https://github.com/cuongnv126/android-ide-extension/compare/v0.1.16...v0.1.17
[0.1.16]: https://github.com/cuongnv126/android-ide-extension/compare/v0.1.15...v0.1.16
[0.1.15]: https://github.com/cuongnv126/android-ide-extension/compare/v0.1.14...v0.1.15
[0.1.14]: https://github.com/cuongnv126/android-ide-extension/compare/v0.1.13...v0.1.14
[0.1.13]: https://github.com/cuongnv126/android-ide-extension/compare/v0.1.12...v0.1.13
[0.1.12]: https://github.com/cuongnv126/android-ide-extension/compare/v0.1.11...v0.1.12
[0.1.11]: https://github.com/cuongnv126/android-ide-extension/compare/v0.1.10...v0.1.11
[0.1.10]: https://github.com/cuongnv126/android-ide-extension/compare/v0.1.9...v0.1.10
[0.1.9]: https://github.com/cuongnv126/android-ide-extension/compare/v0.1.8...v0.1.9
[0.1.8]: https://github.com/cuongnv126/android-ide-extension/compare/v0.1.7...v0.1.8
[0.1.7]: https://github.com/cuongnv126/android-ide-extension/compare/v0.1.6...v0.1.7
[0.1.6]: https://github.com/cuongnv126/android-ide-extension/compare/v0.1.5...v0.1.6
[0.1.5]: https://github.com/cuongnv126/android-ide-extension/compare/v0.1.4...v0.1.5
[0.1.4]: https://github.com/cuongnv126/android-ide-extension/compare/v0.1.3...v0.1.4
[0.1.3]: https://github.com/cuongnv126/android-ide-extension/compare/v0.1.2...v0.1.3
[0.1.2]: https://github.com/cuongnv126/android-ide-extension/releases/tag/v0.1.2
