"use strict";

const PROFILE = {
  name: "Ebenezer Koomson",
  email: "ebenezerkoomson430@gmail.com",
};

/**
 * Certificates.
 * Only `title`, `issuer` and `category` are required. `date`, `credentialId`,
 * `verifyUrl` and `image` are optional and the page hides whatever is missing.
 * category: "dev" | "security" | "cloud" | "data"
 */
const CERTIFICATES = [
  {
    id: "cert-001",
    title: "JavaScript",
    issuer: "Codecademy",
    category: "dev",
    tags: ["javascript", "web"],
    // date: "2025-01-01",
    // credentialId: "",
    // verifyUrl: "https://www.codecademy.com/...",
    // image: "./certificates/javascript-codecademy.jpg",
  },
];

const CATEGORY_LABELS = { dev: "Development", security: "Security", cloud: "Cloud", data: "Data" };

const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

function fmtDate(iso) {
  if (!iso) return "";
  const d = new Date(iso + "T00:00:00");
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString("en-GB", { year: "numeric", month: "short" });
}

function safeStorage(action, key, value) {
  try {
    return action === "get" ? localStorage.getItem(key) : localStorage.setItem(key, value);
  } catch {
    return null;
  }
}

function downloadImage(url, filename = "certificate.jpg") {
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
}

function setIcons(root = document) {
  const icons = {
    moon: `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='black' d='M21 12.79A9 9 0 0 1 11.21 3 7 7 0 1 0 21 12.79Z'/%3E%3C/svg%3E`,
    x: `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='black' d='M18.3 5.71 12 12l6.3 6.29-1.41 1.42L12 13.41l-6.89 6.3-1.41-1.42L10.59 12 3.7 5.71 5.11 4.29 12 10.59l6.89-6.3Z'/%3E%3C/svg%3E`,
    spark: `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='black' d='M12 2 9.5 9.5 2 12l7.5 2.5L12 22l2.5-7.5L22 12l-7.5-2.5Z'/%3E%3C/svg%3E`,
    award: `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='black' d='M12 2a7 7 0 0 0-4 12.75V22l4-2 4 2v-7.25A7 7 0 0 0 12 2Zm0 2a5 5 0 1 1 0 10 5 5 0 0 1 0-10Z'/%3E%3C/svg%3E`,
    copy: `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='black' d='M16 1H4a2 2 0 0 0-2 2v12h2V3h12V1Zm4 4H8a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2Zm0 16H8V7h12v14Z'/%3E%3C/svg%3E`,
    search: `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='black' d='M10 2a8 8 0 1 0 4.9 14.3l4.4 4.4 1.4-1.4-4.4-4.4A8 8 0 0 0 10 2Zm0 2a6 6 0 1 1 0 12 6 6 0 0 1 0-12Z'/%3E%3C/svg%3E`,
    download: `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='black' d='M12 3v10.17l3.59-3.58L17 11l-5 5-5-5 1.41-1.41L11 13.17V3h1ZM5 19h14v2H5v-2Z'/%3E%3C/svg%3E`,
    link: `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='black' d='M3.9 12a5 5 0 0 1 5-5h4v2h-4a3 3 0 1 0 0 6h4v2h-4a5 5 0 0 1-5-5Zm7.1 1h2v-2h-2v2Zm4-6h4a5 5 0 1 1 0 10h-4v-2h4a3 3 0 1 0 0-6h-4V7Z'/%3E%3C/svg%3E`,
    github: `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='black' d='M12 .5A12 12 0 0 0 8.2 23.9c.6.1.8-.2.8-.6v-2.2c-3.3.7-4-1.6-4-1.6-.6-1.4-1.4-1.8-1.4-1.8-1.1-.8.1-.8.1-.8 1.2.1 1.9 1.2 1.9 1.2 1.1 1.9 2.9 1.4 3.6 1.1.1-.8.4-1.4.7-1.7-2.6-.3-5.3-1.3-5.3-5.9 0-1.3.5-2.4 1.2-3.2-.1-.3-.5-1.5.1-3.1 0 0 1-.3 3.3 1.2a11.4 11.4 0 0 1 6 0C17.5 5.7 18.5 6 18.5 6c.6 1.6.2 2.8.1 3.1.8.8 1.2 1.9 1.2 3.2 0 4.6-2.7 5.6-5.3 5.9.4.3.8 1 .8 2.1v3.1c0 .4.2.7.8.6A12 12 0 0 0 12 .5Z'/%3E%3C/svg%3E`,
    code: `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='black' d='M8.7 16.3 3.4 11l5.3-5.3L10.1 7 6.1 11l4 4-1.4 1.3Zm6.6 0-1.4-1.3 4-4-4-4 1.4-1.3 5.3 5.3-5.3 5.3ZM11 19l2-14h2l-2 14h-2Z'/%3E%3C/svg%3E`,
    shield: `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='black' d='M12 2 4 5v6c0 5 3.4 9.7 8 11 4.6-1.3 8-6 8-11V5l-8-3Zm0 18c-3.3-1.2-6-4.9-6-9V6.3L12 4l6 2.3V11c0 4.1-2.7 7.8-6 9Z'/%3E%3C/svg%3E`,
    bolt: `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='black' d='M13 2 3 14h7l-1 8 10-12h-7l1-8Z'/%3E%3C/svg%3E`,
    layers: `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='black' d='M12 2 2 7l10 5 10-5-10-5Zm0 11L2 8v3l10 5 10-5V8l-10 5Zm0 6L2 14v3l10 5 10-5v-3l-10 5Z'/%3E%3C/svg%3E`,
    file: `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='black' d='M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6Zm0 2.5L19.5 10H14V4.5Z'/%3E%3C/svg%3E`,
    mail: `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='black' d='M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2Zm0 4-8 5L4 8V6l8 5 8-5v2Z'/%3E%3C/svg%3E`,
    pin: `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='black' d='M12 2a7 7 0 0 0-7 7c0 5.2 7 13 7 13s7-7.8 7-13a7 7 0 0 0-7-7Zm0 9.5A2.5 2.5 0 1 1 12 6a2.5 2.5 0 0 1 0 5.5Z'/%3E%3C/svg%3E`,
    send: `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='black' d='M2 21 23 12 2 3v7l15 2-15 2v7Z'/%3E%3C/svg%3E`,
    phone: `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='black' d='M6.6 10.8c1.4 2.8 3.7 5.1 6.5 6.5l2.2-2.2c.3-.3.7-.4 1.1-.3 1.2.4 2.5.6 3.8.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C11.3 21 3 12.7 3 2c0-.6.4-1 1-1h3.3c.6 0 1 .4 1 1 0 1.3.2 2.6.6 3.8.1.4 0 .8-.3 1.1L6.6 10.8Z'/%3E%3C/svg%3E`,
  };

  $$(".icon", root).forEach((el) => {
    const svg = icons[el.getAttribute("data-icon")];
    if (svg) el.style.setProperty("--icon", `url("${svg}")`);
  });
}

function setupTheme() {
  const key = "portfolio_theme";
  const root = document.documentElement;
  const stored = safeStorage("get", key);
  const prefersLight = window.matchMedia && window.matchMedia("(prefers-color-scheme: light)").matches;

  if (stored === "light" || (!stored && prefersLight)) root.setAttribute("data-theme", "light");

  $("#themeToggle").addEventListener("click", () => {
    const isLight = root.getAttribute("data-theme") === "light";
    if (isLight) {
      root.removeAttribute("data-theme");
      safeStorage("set", key, "dark");
    } else {
      root.setAttribute("data-theme", "light");
      safeStorage("set", key, "light");
    }
  });
}

function setupDrawer() {
  const drawer = $("#drawer");
  const btn = $("#menuBtn");
  const close = $("#closeDrawer");

  function open() {
    drawer.classList.add("open");
    drawer.setAttribute("aria-hidden", "false");
    btn.setAttribute("aria-expanded", "true");
    close.focus();
  }
  function shut() {
    if (!drawer.classList.contains("open")) return;
    drawer.classList.remove("open");
    drawer.setAttribute("aria-hidden", "true");
    btn.setAttribute("aria-expanded", "false");
  }

  btn.addEventListener("click", () => (drawer.classList.contains("open") ? shut() : open()));
  close.addEventListener("click", () => { shut(); btn.focus(); });
  $$("#drawer a").forEach((a) => a.addEventListener("click", shut));
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") shut(); });
}

function setupScrollSpy() {
  const links = $$(".nav a");
  const sections = links.map((a) => $(a.getAttribute("href"))).filter(Boolean);
  if (!("IntersectionObserver" in window) || !sections.length) return;

  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      links.forEach((a) => {
        const on = a.getAttribute("href") === `#${entry.target.id}`;
        a.classList.toggle("active", on);
        if (on) a.setAttribute("aria-current", "true"); else a.removeAttribute("aria-current");
      });
    });
  }, { rootMargin: "-45% 0px -50% 0px" });

  sections.forEach((s) => io.observe(s));
}

function setupContact() {
  $("#copyEmailBtn").addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(PROFILE.email);
      toast("Email copied.");
    } catch {
      toast(`Copy failed. My email is ${PROFILE.email}`);
    }
  });

  $("#contactForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const name = String(fd.get("name") || "");
    const email = String(fd.get("email") || "");
    const msg = String(fd.get("message") || "");

    const subject = encodeURIComponent(`Portfolio message from ${name}`);
    const body = encodeURIComponent(`From: ${name} <${email}>\n\n${msg}`);
    window.location.href = `mailto:${PROFILE.email}?subject=${subject}&body=${body}`;
    form.reset();
  });
}

function setupFooterYear() {
  $("#year").textContent = String(new Date().getFullYear());
}

/** Certificates */
let currentFilter = "all";
let currentQuery = "";
let selectedId = null;

function sortedCerts() {
  return CERTIFICATES.slice().sort((a, b) => String(b.date || "").localeCompare(String(a.date || "")));
}

function matches(cert) {
  if (currentFilter !== "all" && cert.category !== currentFilter) return false;
  const q = currentQuery.trim().toLowerCase();
  if (!q) return true;
  return [cert.title, cert.issuer, cert.credentialId, cert.category, ...(cert.tags || [])]
    .filter(Boolean).join(" ").toLowerCase().includes(q);
}

function renderCerts() {
  const grid = $("#certGrid");
  grid.innerHTML = "";
  $("#certCount").textContent = String(CERTIFICATES.length);

  const list = sortedCerts().filter(matches);

  if (!list.length) {
    grid.innerHTML = `<div class="card"><h3>No results</h3><p class="note">Try a different search term or filter.</p></div>`;
    return;
  }

  for (const cert of list) {
    const el = document.createElement("article");
    el.className = "certCard" + (cert.id === selectedId ? " selected" : "");
    el.tabIndex = 0;
    el.setAttribute("role", "button");
    el.setAttribute("aria-label", `Show details for ${cert.title}`);

    const meta = [cert.issuer, fmtDate(cert.date)].filter(Boolean).join(" · ");
    el.innerHTML = `
      <div class="certThumb"></div>
      <div class="certBody">
        <div class="certTopRow">
          <div>
            <div class="certTitle">${escapeHtml(cert.title)}</div>
            <div class="certMeta">${escapeHtml(meta)}</div>
          </div>
          <span class="badge mono">${escapeHtml(CATEGORY_LABELS[cert.category] || cert.category)}</span>
        </div>
        <div class="certTags">
          ${(cert.tags || []).slice(0, 4).map((t) => `<span class="tag mono">${escapeHtml(t)}</span>`).join("")}
        </div>
      </div>
    `;

    el.addEventListener("click", () => selectCert(cert.id));
    el.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") { e.preventDefault(); selectCert(cert.id); }
    });
    grid.appendChild(el);
  }
}

function detailRow(key, value) {
  return `<div class="detailRow"><div class="detailKey">${escapeHtml(key)}</div><div class="detailVal">${escapeHtml(value)}</div></div>`;
}

function selectCert(id) {
  const cert = CERTIFICATES.find((c) => c.id === id);
  if (!cert) return;
  selectedId = id;

  const rows = [
    detailRow("Title", cert.title),
    detailRow("Issuer", cert.issuer),
    cert.date ? detailRow("Date", fmtDate(cert.date)) : "",
    cert.credentialId ? detailRow("Credential ID", cert.credentialId) : "",
    cert.tags && cert.tags.length ? detailRow("Topics", cert.tags.join(", ")) : "",
  ].join("");

  const actions = [
    cert.image ? `<button class="btn primary" type="button" data-open="preview"><span class="icon" data-icon="award" aria-hidden="true"></span>Preview</button>` : "",
    cert.verifyUrl ? `<a class="btn soft" href="${escapeAttr(cert.verifyUrl)}" target="_blank" rel="noopener noreferrer"><span class="icon" data-icon="link" aria-hidden="true"></span>Verify</a>` : "",
    cert.credentialId ? `<button class="btn ghost" type="button" data-copy="id"><span class="icon" data-icon="copy" aria-hidden="true"></span>Copy ID</button>` : "",
  ].join("");

  const body = $("#detailBody");
  body.innerHTML = rows + (actions ? `<div class="detailActions">${actions}</div>` : "");
  setIcons(body);

  const previewBtn = $('[data-open="preview"]', body);
  const copyBtn = $('[data-copy="id"]', body);
  if (previewBtn) previewBtn.addEventListener("click", () => openModal(cert));
  if (copyBtn) copyBtn.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(cert.credentialId);
      toast("Credential ID copied.");
    } catch {
      toast("Copy failed.");
    }
  });

  $$(".certCard").forEach((c) => c.classList.remove("selected"));
  renderCerts();
}

function setupCertControls() {
  const toolbar = $("#certToolbar");
  // Search and filters only appear once there are enough certificates to need them.
  if (CERTIFICATES.length < 4) return;
  toolbar.hidden = false;

  const cats = [...new Set(CERTIFICATES.map((c) => c.category))];
  const filters = $("#certFilters");
  filters.innerHTML = ["all", ...cats].map((c, i) =>
    `<button class="filterBtn${i === 0 ? " active" : ""}" data-filter="${escapeAttr(c)}" type="button">${escapeHtml(c === "all" ? "All" : (CATEGORY_LABELS[c] || c))}</button>`
  ).join("");

  $("#certSearch").addEventListener("input", (e) => {
    currentQuery = e.target.value || "";
    renderCerts();
  });

  $$(".filterBtn", filters).forEach((b) => {
    b.addEventListener("click", () => {
      $$(".filterBtn", filters).forEach((x) => x.classList.remove("active"));
      b.classList.add("active");
      currentFilter = b.getAttribute("data-filter") || "all";
      renderCerts();
    });
  });
}

/** Modal */
let lastFocus = null;

function openModal(cert) {
  const modal = $("#modal");
  lastFocus = document.activeElement;
  $("#modalTitle").textContent = cert.title;
  $("#modalSub").textContent = [cert.issuer, fmtDate(cert.date)].filter(Boolean).join(" · ");
  $("#modalImg").src = cert.image;
  $("#modalImg").alt = `${cert.title} certificate from ${cert.issuer}`;

  const verify = $("#verifyLink");
  verify.hidden = !cert.verifyUrl;
  if (cert.verifyUrl) verify.href = cert.verifyUrl;

  $("#downloadBtn").onclick = () => downloadImage(cert.image, `${slugify(cert.title)}.jpg`);

  modal.classList.add("show");
  modal.setAttribute("aria-hidden", "false");
  $("#closeModal").focus();
}

function closeModal() {
  const modal = $("#modal");
  if (!modal.classList.contains("show")) return;
  modal.classList.remove("show");
  modal.setAttribute("aria-hidden", "true");
  if (lastFocus) lastFocus.focus();
}

function setupModal() {
  $("#closeModal").addEventListener("click", closeModal);
  $("#modalBackdrop").addEventListener("click", closeModal);
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeModal(); });
}

/** Toast */
let toastTimer = null;
function toast(msg) {
  let t = $("#toast");
  if (!t) {
    t = document.createElement("div");
    t.id = "toast";
    t.className = "toast mono";
    t.setAttribute("role", "status");
    document.body.appendChild(t);
  }
  t.textContent = msg;
  t.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.remove("show"), 2400);
}

/** Helpers */
function escapeHtml(str) {
  return String(str)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}
function escapeAttr(str) {
  return escapeHtml(str).replaceAll("`", "");
}
function slugify(s) {
  return String(s).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

function init() {
  setIcons();
  setupTheme();
  setupDrawer();
  setupScrollSpy();
  setupContact();
  setupFooterYear();
  setupCertControls();
  setupModal();
  renderCerts();

  // Show the first certificate's details straight away so the panel is never empty.
  const first = sortedCerts()[0];
  if (first) selectCert(first.id);
}

document.addEventListener("DOMContentLoaded", init);
