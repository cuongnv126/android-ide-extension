/* Crash report form — decodes ?p= payload, lets the user add an optional note,
 * posts to siteapi. The submit endpoint is hardcoded; edit if you self-host. */
(function () {
  const SUBMIT_URL = "https://api.androidgradletools.org/ext-crash/submit";

  const $ = (id) => document.getElementById(id);
  const setStatus = (msg, kind) => {
    const el = $("status");
    el.textContent = msg || "";
    el.dataset.kind = kind || "";
  };

  function decodePayload(raw) {
    if (!raw) return null;
    try {
      const b64 = raw.replace(/-/g, "+").replace(/_/g, "/");
      const padded = b64 + "===".slice((b64.length + 3) % 4);
      const bin = atob(padded);
      const bytes = new Uint8Array(bin.length);
      for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
      const ds = new DecompressionStream("deflate-raw");
      const stream = new Blob([bytes]).stream().pipeThrough(ds);
      return new Response(stream).text().then(JSON.parse);
    } catch (e) {
      console.error("decodePayload failed", e);
      return null;
    }
  }

  function fmtTimestamp(ms) {
    if (!ms) return "—";
    try {
      return new Date(ms).toISOString().replace("T", " ").slice(0, 19) + " UTC";
    } catch {
      return String(ms);
    }
  }

  function renderSummary(p) {
    const err = p.error || {};
    const summary = $("error-summary");
    const headline = err.message ? `${err.name || "Error"}: ${err.message}` : err.name || "Unknown error";
    $("summary-name").textContent = headline;
    $("summary-feature").textContent = p.feature || "extension";
    summary.hidden = false;
  }

  function renderReadonly(p) {
    $("meta-ext-version").textContent = p.ext_version || "—";
    $("meta-vscode-version").textContent = p.vscode_version || "—";
    $("meta-os").textContent = p.os || "—";
    $("meta-node-version").textContent = p.node_version || "—";
    $("meta-feature").textContent = p.feature || "—";
    $("meta-fingerprint").textContent = p.fingerprint || "—";
    $("meta-ts").textContent = fmtTimestamp(p.ts);

    const err = p.error || {};
    const head = err.message ? `${err.name || "Error"}: ${err.message}` : err.name || "Error";
    const stack = err.stack || "(no stack)";
    $("error-readonly").textContent = `${head}\n\n${stack}`;
  }

  function buildSubmitPayload(p) {
    return {
      v: p.v || 1,
      ts: p.ts || Date.now(),
      ext_version: p.ext_version || "",
      vscode_version: p.vscode_version || "",
      os: p.os || "",
      node_version: p.node_version || "",
      feature: p.feature || "",
      fingerprint: p.fingerprint || "",
      error: {
        name: (p.error && p.error.name) || "",
        message: (p.error && p.error.message) || "",
        stack: (p.error && p.error.stack) || "",
      },
      user_note: $("user-note").value.slice(0, 1000),
      submitted_at: Date.now(),
    };
  }

  async function submit(payload) {
    const res = await fetch(SUBMIT_URL, {
      method: "POST",
      mode: "cors",
      credentials: "omit",
      headers: { "content-type": "application/json", "x-ext-crash": "1" },
      body: JSON.stringify(payload),
    });
    if (!res.ok) {
      const txt = await res.text().catch(() => "");
      throw new Error(`HTTP ${res.status}${txt ? ": " + txt.slice(0, 200) : ""}`);
    }
    return res.json().catch(() => ({}));
  }

  function showFatalDecodeError() {
    document.body.classList.add("has-fallback");
    $("error-fallback").hidden = false;
  }

  async function init() {
    const params = new URLSearchParams(window.location.search);
    const p = await decodePayload(params.get("p"));
    if (!p || typeof p !== "object" || !p.error) {
      showFatalDecodeError();
      return;
    }

    renderSummary(p);
    renderReadonly(p);

    $("crash-form").addEventListener("submit", async (ev) => {
      ev.preventDefault();
      const btn = $("submit-btn");
      btn.disabled = true;
      setStatus("Submitting…", "pending");
      try {
        const payload = buildSubmitPayload(p);
        const result = await submit(payload);
        const id = result && result.reply ? (result.reply.report_id || "") : "";
        setStatus(
          `Thanks — report submitted${id ? " (#" + id + ")" : ""}. You can close this tab.`,
          "success",
        );
        $("user-note").disabled = true;
      } catch (err) {
        console.error(err);
        setStatus("Submit failed, please try again.", "error");
        btn.disabled = false;
      }
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
