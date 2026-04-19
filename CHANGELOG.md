# Changelog

Format: [Keep a Changelog](https://keepachangelog.com/en/1.1.0/). Newest first.

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
