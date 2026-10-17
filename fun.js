/* =====================================================================
   fun.js : small playful extras shared by every page
   - footer "toys": Blueprint view, Make it weird, Behind the site
   - Developer room (Ctrl + Shift + S)
   Everything is optional, keyboard friendly and respects reduced motion.
   ===================================================================== */
(function () {
  'use strict';
  if (window.__fx) return;
  window.__fx = true;

  var d = document, root = d.documentElement;
  var reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  function el(t, c, x) { var e = d.createElement(t); if (c) e.className = c; if (x != null) e.textContent = x; return e; }

  /* ---------- styles (kept here so this is the only extra file) ---------- */
  var CSS = [
    ".fx-toys{display:flex;flex-wrap:wrap;gap:8px;justify-content:center;margin-top:18px}",
    ".fx-toy{font:600 12px 'JetBrains Mono',monospace;background:transparent;color:var(--dim);border:1px dashed var(--line);border-radius:99px;padding:7px 14px;cursor:pointer;transition:border-color .2s,color .2s,transform .2s}",
    ".fx-toy:hover{border-color:var(--accent);color:var(--accent-ink);transform:translateY(-2px)}",
    ".fx-toast{position:fixed;left:50%;bottom:76px;transform:translate(-50%,16px);z-index:360;background:var(--head);color:var(--bg);font:600 13px 'JetBrains Mono',monospace;padding:11px 18px;border-radius:99px;box-shadow:0 14px 34px rgba(0,0,0,.3);opacity:0;pointer-events:none;transition:opacity .3s,transform .3s;max-width:92vw;text-align:center}",
    ".fx-toast.show{opacity:1;transform:translate(-50%,0)}",

    /* blueprint view */
    "html.fx-bp :is(main,section,article,aside,footer,header,nav,h1,h2,h3,form,figure,img,ul,ol,.card,.bt){outline:1px dashed rgba(30,136,229,.8)!important;outline-offset:-1px}",
    "html.fx-bp body::after{content:'';position:fixed;inset:0;pointer-events:none;z-index:40;background-image:linear-gradient(rgba(30,136,229,.08) 1px,transparent 1px),linear-gradient(90deg,rgba(30,136,229,.08) 1px,transparent 1px);background-size:24px 24px}",
    ".fx-bpl{position:absolute;z-index:45;font:700 10px/1 'JetBrains Mono',monospace;color:#fff;background:#1e88e5;padding:3px 6px;border-radius:4px;pointer-events:none;white-space:nowrap}",
    ".fx-bpl.t{background:#c454c0}.fx-bpl.i{background:#e08a1e}.fx-bpl.f{position:fixed;z-index:70}",
    ".fx-hud{position:fixed;left:50%;bottom:18px;transform:translateX(-50%);z-index:360;background:var(--head);color:var(--bg);font:600 12.5px 'JetBrains Mono',monospace;padding:10px 12px 10px 18px;border-radius:99px;display:flex;gap:12px;align-items:center;box-shadow:0 14px 34px rgba(0,0,0,.3);max-width:94vw}",
    ".fx-hud button{font:700 12px 'JetBrains Mono',monospace;background:var(--accent);color:var(--on-accent);border:0;border-radius:99px;padding:7px 14px;cursor:pointer;white-space:nowrap}",

    /* weird mode: gentle, short, no flashing */
    "html.fx-weird h1,html.fx-weird h2{animation:fxWob .8s ease-in-out infinite alternate}",
    "html.fx-weird :is(.card,.bt,.steps li,.facts li,.fun-card,.plan,.stat):nth-child(odd){animation:fxTiltA 1s ease-in-out infinite alternate}",
    "html.fx-weird :is(.card,.bt,.steps li,.facts li,.fun-card,.plan,.stat):nth-child(even){animation:fxTiltB 1.1s ease-in-out infinite alternate}",
    "@keyframes fxWob{from{transform:translateX(-5px) rotate(-.4deg)}to{transform:translateX(5px) rotate(.4deg)}}",
    "@keyframes fxTiltA{from{transform:rotate(-1.6deg)}to{transform:rotate(1.2deg) translateY(-3px)}}",
    "@keyframes fxTiltB{from{transform:rotate(1.4deg)}to{transform:rotate(-1.6deg) translateY(-3px)}}",
    ".fx-trail{position:fixed;z-index:370;pointer-events:none;font-size:18px;transform:translate(-50%,-50%);animation:fxFade .9s ease-out forwards}",
    "@keyframes fxFade{to{opacity:0;transform:translate(-50%,-130%) scale(.6)}}",

    /* developer room */
    ".fx-room{position:fixed;inset:0;z-index:350;background:rgba(10,13,18,.55);-webkit-backdrop-filter:blur(5px);backdrop-filter:blur(5px);display:grid;place-items:center;padding:16px}",
    ".fx-room[hidden]{display:none}",
    ".fx-box{background:#0f131a;color:#dfe4ea;border:1px solid #232a35;border-radius:16px;width:min(540px,100%);max-height:92vh;overflow:auto;padding:22px;font:13.5px/1.75 'JetBrains Mono',monospace;box-shadow:0 40px 100px rgba(0,0,0,.5)}",
    ".fx-top{display:flex;justify-content:space-between;align-items:center;gap:12px;margin-bottom:14px;font-weight:800;font-size:15px;color:#f2f4f7}",
    ".fx-x{background:none;border:1px solid #232a35;color:#dfe4ea;border-radius:50%;width:30px;height:30px;cursor:pointer;font-size:13px}",
    ".fx-status{display:flex;flex-wrap:wrap;gap:6px 18px;margin-bottom:16px;color:#9fd66b}",
    ".fx-status b{color:#f0a83c}",
    ".fx-h{font-size:11px;letter-spacing:.1em;color:#838d9d;margin:14px 0 6px}",
    ".fx-row{display:flex;justify-content:space-between;gap:12px}",
    ".fx-row .ok{color:#27c93f}",
    ".fx-bar{display:block;height:8px;background:#232a35;border-radius:99px;overflow:hidden;margin:2px 0 10px}",
    ".fx-bar u{display:block;height:100%;width:50%;text-decoration:none;background:linear-gradient(90deg,#f0a83c,#56cfc9);transition:width 1s ease}",
    ".fx-facts{display:grid;grid-template-columns:auto 1fr;gap:4px 16px;margin-top:6px}",
    ".fx-facts dt{color:#838d9d}.fx-facts dd{color:#dfe4ea}",
    ".fx-note{margin-top:14px;font-size:11.5px;color:#838d9d}",

    /* mood */
    ".fx-mb{position:relative}",
    ".fx-mm{position:fixed;z-index:361;width:min(280px,calc(100vw - 24px));background:var(--card);color:var(--text);border:1px solid var(--line);border-radius:16px;padding:12px;box-shadow:0 20px 50px rgba(0,0,0,.28);font-family:'JetBrains Mono',monospace}",
    ".fx-mm[hidden]{display:none}",
    ".fx-mm h4{font-size:12.5px;margin:2px 4px 8px;color:var(--head)}",
    ".fx-mm button{display:flex;gap:10px;align-items:center;width:100%;text-align:left;font:600 13px 'JetBrains Mono',monospace;color:var(--text);background:transparent;border:1px solid transparent;border-radius:10px;padding:9px 10px;cursor:pointer}",
    ".fx-mm button:hover,.fx-mm button:focus-visible{background:var(--bg2);border-color:var(--line);outline:none}",
    ".fx-mm button[aria-checked=true]{border-color:var(--accent)}",
    ".fx-mm .fx-r{margin-top:6px;color:var(--dim);font-size:12px;border-top:1px solid var(--line);border-radius:0 0 10px 10px;padding-top:11px}",
    ".fx-mm small{display:block;font-weight:400;color:var(--dim);font-size:11px}",
    "html[data-mood=calm] .orn,html[data-mood=calm] .vine,html[data-mood=calm] .cursor-dot,html[data-mood=calm] .cursor-ring{display:none!important}",
    "html[data-mood=calm] .tick-row.r1,html[data-mood=calm] .tick-row.r2{animation-duration:90s}",
    "html[data-mood=energetic] .tick-row.r1,html[data-mood=energetic] .tick-row.r2{animation-duration:14s}",
    "html[data-mood=energetic] .blob{opacity:.8}",
    "html[data-mood=colourful] .blob{opacity:.6}",
    "html[data-mood=colourful] .card{border-top:4px solid var(--accent)}",
    "html[data-mood=minimal] .blob,html[data-mood=minimal] .orn,html[data-mood=minimal] .vine,html[data-mood=minimal] .cursor-dot,html[data-mood=minimal] .cursor-ring,html[data-mood=minimal] .float,html[data-mood=minimal] .splash{display:none!important}",
    "html[data-mood=minimal] body::before,html[data-mood=minimal] body::after{display:none!important}",
    "html[data-mood=minimal] .tick-row{animation:none!important;width:auto;flex-wrap:wrap;white-space:normal;justify-content:center}",
    "html[data-mood=minimal] .tick-wrap{-webkit-mask-image:none;mask-image:none}",
    "html[data-mood=minimal][data-theme=dark]{--accent:#e5e7eb!important;--on-accent:#111827!important}"
  ].join('\n');
  var st = el('style'); st.textContent = CSS; d.head.appendChild(st);

  /* ---------- toast ---------- */
  var tEl = el('div', 'fx-toast'); tEl.setAttribute('role', 'status'); tEl.setAttribute('aria-live', 'polite');
  d.body.appendChild(tEl);
  var tT;
  function toast(m) { tEl.textContent = m; tEl.classList.add('show'); clearTimeout(tT); tT = setTimeout(function () { tEl.classList.remove('show'); }, 2800); }
  window.fxToast = toast;

  /* =====================================================================
     1) BLUEPRINT VIEW : show the page's real tags
     ===================================================================== */
  var bpOn = false, bpLabels = [], bpHud = null, bpTimer;
  var BP_SEL = 'header,nav,main,section,article,aside,footer,h1,h2,h3,form,figure,img,button';
  var STRUCT = { header: 1, nav: 1, main: 1, section: 1, article: 1, aside: 1, footer: 1, figure: 1 };
  var TEXT = { h1: 1, h2: 1, h3: 1 };

  function bpClear() { bpLabels.forEach(function (l) { l.remove(); }); bpLabels = []; }
  function bpPlace() {
    bpClear();
    var sy = window.pageYOffset, sx = window.pageXOffset, n = 0;
    var nodes = d.querySelectorAll(BP_SEL);
    for (var i = 0; i < nodes.length && n < 140; i++) {
      var e = nodes[i];
      if (e.closest('.fx-room,.fx-hud,.fx-toys,.cmdk,.tick-wrap,.totop,.ico,.fx-toast,[aria-hidden="true"]')) continue;
      if (e.tagName === 'BUTTON' && e.closest('.fx-toys')) continue;
      var r = e.getBoundingClientRect();
      if (r.width < 28 || r.height < 14) continue;
      var tag = e.tagName.toLowerCase();
      var fixed = !!e.closest('header');
      var l = el('span', 'fx-bpl ' + (STRUCT[tag] ? 's' : TEXT[tag] ? 't' : 'i') + (fixed ? ' f' : ''), '<' + tag + '>');
      l.style.top = (fixed ? r.top + 2 : r.top + sy + 2) + 'px';
      l.style.left = (fixed ? r.left + 2 : r.left + sx + 2) + 'px';
      d.body.appendChild(l); bpLabels.push(l); n++;
    }
  }
  function bpShowHud() {
    if (bpHud) return;
    bpHud = el('div', 'fx-hud'); bpHud.setAttribute('role', 'status');
    bpHud.appendChild(el('span', null, '🧱 Blueprint view: every tag is a real element of this page'));
    var b = el('button', null, 'Exit (Esc)'); b.type = 'button'; b.onclick = function () { blueprint(false); };
    bpHud.appendChild(b); d.body.appendChild(bpHud);
  }
  function blueprint(force) {
    bpOn = typeof force === 'boolean' ? force : !bpOn;
    root.classList.toggle('fx-bp', bpOn);
    if (bpOn) { bpPlace(); bpShowHud(); setTimeout(function () { if (bpOn) bpPlace(); }, 500); }
    else { bpClear(); if (bpHud) { bpHud.remove(); bpHud = null; } }
  }
  addEventListener('resize', function () { if (!bpOn) return; clearTimeout(bpTimer); bpTimer = setTimeout(bpPlace, 200); });

  /* =====================================================================
     2) MAKE IT WEIRD : 3 seconds, then back to normal
     ===================================================================== */
  var weirdBusy = false;
  function weird() {
    if (weirdBusy) return;
    if (reduce) { toast('Weird mode needs motion, and your device asks for less. Keeping it calm 😌'); return; }
    weirdBusy = true;
    root.classList.add('fx-weird');
    toast('Making this website weird… 🌀');
    var sub = d.querySelector('.h1-sub'), orig = sub ? sub.textContent : '';
    if (sub) sub.textContent = '(yes, this is on purpose)';
    var last = 0, icons = ['✨', '🐛', '☕', '💻'];
    function mm(e) {
      var now = Date.now(); if (now - last < 45) return; last = now;
      var t = el('span', 'fx-trail', icons[Math.floor(Math.random() * icons.length)]);
      t.style.left = e.clientX + 'px'; t.style.top = e.clientY + 'px';
      d.body.appendChild(t); setTimeout(function () { t.remove(); }, 950);
    }
    addEventListener('mousemove', mm);
    setTimeout(function () {
      root.classList.remove('fx-weird'); removeEventListener('mousemove', mm);
      if (sub) sub.textContent = orig;
      toast('Okay okay… back to professional mode. 😌');
      weirdBusy = false;
    }, 3200);
  }

  /* =====================================================================
     3) DEVELOPER ROOM : Ctrl + Shift + S
     ===================================================================== */
  var room = null, roomOpen = false, roomTimer, lastFocus = null;
  var S = { coffee: 72, brain: 84, bugs: 3, mot: 61 };
  function clamp(v, a, b) { return Math.max(a, Math.min(b, v)); }
  function drift(v, step, a, b) { return clamp(v + Math.round((Math.random() * 2 - 1) * step), a, b); }

  function buildRoom() {
    room = el('div', 'fx-room'); room.hidden = true;
    room.setAttribute('role', 'dialog'); room.setAttribute('aria-modal', 'true'); room.setAttribute('aria-label', 'Developer room');
    room.innerHTML =
      '<div class="fx-box">' +
      '<div class="fx-top"><span id="fx-title">🔓 Developer mode unlocked</span><button type="button" class="fx-x" aria-label="Close developer room">✕</button></div>' +
      '<div class="fx-status"><span>🟢 Online</span><span>☕ Coffee <b id="fx-c">72</b>%</span><span>🧠 Brain <b id="fx-b">84</b>%</span><span>🐛 Bugs <b id="fx-g">3</b></span></div>' +
      '<div class="fx-h">SYSTEM</div>' +
      '<div class="fx-row"><span>HTML</span><span class="ok">✓</span></div>' +
      '<div class="fx-row"><span>CSS</span><span class="ok">✓</span></div>' +
      '<div class="fx-row"><span>JavaScript</span><span class="ok">✓</span></div>' +
      '<div class="fx-row"><span>SEO</span><span class="ok">✓</span></div>' +
      '<div class="fx-row"><span>Coffee</span><span id="fx-cp">72%</span></div><i class="fx-bar"><u id="fx-cb"></u></i>' +
      '<div class="fx-row"><span>Motivation</span><span id="fx-mp">61%</span></div><i class="fx-bar"><u id="fx-mb"></u></i>' +
      '<div class="fx-h">BEHIND THE WEBSITE</div>' +
      '<dl class="fx-facts">' +
      '<dt>Built with</dt><dd>HTML • CSS • JavaScript</dd>' +
      '<dt>Hosted on</dt><dd>GitHub Pages</dd>' +
      '<dt>Made with</dt><dd>☕ + 💻 + too many browser tabs</dd>' +
      '<dt>AI assistance</dt><dd>Yes 🤖 (as a helper)</dd>' +
      '<dt>Final debugging</dt><dd>Let\'s not talk about it. 😂</dd>' +
      '</dl>' +
      '<p class="fx-note">Coffee, brain, bug and motivation numbers are made up, just for fun. Shortcut: Ctrl + Shift + S</p>' +
      '</div>';
    d.body.appendChild(room);
    room.querySelector('.fx-x').onclick = closeRoom;
    room.addEventListener('click', function (e) { if (e.target === room) closeRoom(); });
  }
  function paintRoom() {
    var q = function (id) { return d.getElementById(id); };
    q('fx-c').textContent = S.coffee; q('fx-b').textContent = S.brain; q('fx-g').textContent = S.bugs;
    q('fx-cp').textContent = S.coffee + '%'; q('fx-mp').textContent = S.mot + '%';
    q('fx-cb').style.width = S.coffee + '%'; q('fx-mb').style.width = S.mot + '%';
  }
  function openRoom(unlocked) {
    if (!room) buildRoom();
    d.getElementById('fx-title').textContent = unlocked ? '🔓 Developer mode unlocked' : '🛠 Behind the website';
    lastFocus = d.activeElement;
    room.hidden = false; roomOpen = true; d.body.style.overflow = 'hidden';
    paintRoom();
    clearInterval(roomTimer);
    roomTimer = setInterval(function () {
      S.coffee = drift(S.coffee, 3, 20, 98); S.brain = drift(S.brain, 2, 55, 99);
      S.bugs = drift(S.bugs, 1, 0, 7); S.mot = drift(S.mot, 3, 30, 95); paintRoom();
    }, 2200);
    var x = room.querySelector('.fx-x'); if (x) x.focus();
  }
  function closeRoom() {
    if (!room) return;
    room.hidden = true; roomOpen = false; d.body.style.overflow = ''; clearInterval(roomTimer);
    if (lastFocus && lastFocus.focus) lastFocus.focus();
  }

  /* ---------- keyboard ---------- */
  addEventListener('keydown', function (e) {
    var k = (e.key || '').toLowerCase();
    if ((e.ctrlKey || e.metaKey) && e.shiftKey && k === 's') {
      e.preventDefault();
      if (roomOpen) closeRoom(); else { openRoom(true); }
      return;
    }
    if (k === 'escape') {
      if (roomOpen) closeRoom();
      else if (bpOn) blueprint(false);
    }
  });

  /* ---------- footer toys ---------- */
  function addToys() {
    var f = d.querySelector('footer .wrap') || d.querySelector('footer');
    if (!f || f.querySelector('.fx-toys')) return;
    var wrap = el('div', 'fx-toys');
    [['🧱 Blueprint view', 'See the tags behind this page', function () { blueprint(); }],
     ['🌀 Make it weird', 'Three seconds of harmless chaos', weird],
     ['🛠 Behind the site', 'How this website is made', function () { openRoom(false); }]
    ].forEach(function (t) {
      var b = el('button', 'fx-toy', t[0]); b.type = 'button'; b.title = t[1];
      b.addEventListener('click', t[2]); wrap.appendChild(b);
    });
    f.appendChild(wrap);
  }

  /* ---------- Mood ---------- */
  var MOODS = {
    calm:      { n: 'Calm',      i: '🌿', s: 'soft greens, slow motion', dark: false, a: '#3f7a66', t: '#5b8fb9', p: '#8d86c9' },
    dark:      { n: 'Dark',      i: '🌙', s: 'night mode, warm glow',    dark: true,  a: '#f0a83c', t: '#56cfc9', p: '#e07ee0' },
    energetic: { n: 'Energetic', i: '⚡', s: 'hot orange, fast ticker',   dark: false, a: '#dc3d0a', t: '#00a6c7', p: '#e6007e' },
    minimal:   { n: 'Minimal',   i: '◻️', s: 'no decoration, just text',  dark: false, a: '#111827', t: '#374151', p: '#6b7280' },
    colourful: { n: 'Colourful', i: '🎨', s: 'purple, cyan and pink',     dark: false, a: '#7c3aed', t: '#06b6d4', p: '#f43f5e' }
  };
  function ls(k, v) { try { if (v === null) localStorage.removeItem(k); else if (v !== undefined) localStorage.setItem(k, v); else return localStorage.getItem(k); } catch (e) {} return null; }
  function onAcc(c) { var n = parseInt(c.slice(1), 16), L = (0.299 * (n >> 16) + 0.587 * ((n >> 8) & 255) + 0.114 * (n & 255)) / 255; return L > 0.6 ? '#0a0d12' : '#ffffff'; }
  function syncUi() {
    var th = d.getElementById('th'), cp = d.getElementById('cp');
    if (th) th.textContent = root.dataset.theme === 'dark' ? '☀️' : '🌙';
    if (cp) { cp.value = ls('accentColor') || '#e08a1e'; cp.dispatchEvent(new Event('input', { bubbles: true })); }
  }
  function setMood(key) {
    var m = MOODS[key]; if (!m) return;
    if (m.dark) root.dataset.theme = 'dark'; else delete root.dataset.theme;
    ls('theme', m.dark ? 'dark' : 'light');
    root.style.setProperty('--accent', m.a); root.style.setProperty('--on-accent', onAcc(m.a));
    root.style.setProperty('--teal', m.t); root.style.setProperty('--pink', m.p);
    ls('accentColor', m.a); ls('palette', JSON.stringify({ t: m.t, p: m.p })); ls('mood', key);
    root.dataset.mood = key; syncUi();
    toast(m.i + ' Mood set to ' + m.n + '. I’ll remember it next time.');
  }
  function resetMood() {
    ['--accent', '--on-accent', '--teal', '--pink'].forEach(function (v) { root.style.removeProperty(v); });
    ['mood', 'accentColor', 'palette', 'theme'].forEach(function (k) { ls(k, null); });
    delete root.dataset.mood; delete root.dataset.theme; syncUi();
    toast('↺ Back to the original look');
  }
  var savedMood = ls('mood'); if (savedMood && MOODS[savedMood]) root.dataset.mood = savedMood;

  var mm = null, mbtn = null;
  function placeMenu() {
    var r = mbtn.getBoundingClientRect(), w = Math.min(280, innerWidth - 24);
    mm.style.top = (r.bottom + 8) + 'px';
    mm.style.left = Math.max(12, Math.min(r.right - w, innerWidth - w - 12)) + 'px';
  }
  function closeMenu(focus) { if (!mm || mm.hidden) return; mm.hidden = true; mbtn.setAttribute('aria-expanded', 'false'); if (focus) mbtn.focus(); }
  function openMenu() {
    var cur = ls('mood');
    [].forEach.call(mm.querySelectorAll('[data-m]'), function (b) { b.setAttribute('aria-checked', String(b.dataset.m === cur)); });
    mm.hidden = false; mbtn.setAttribute('aria-expanded', 'true'); placeMenu();
    var f = mm.querySelector('button'); if (f) f.focus();
  }
  function buildMood() {
    var ctl = d.querySelector('.ctl'); if (!ctl || d.getElementById('moodbtn')) return;
    mbtn = el('button', 'ico', '🎭'); mbtn.id = 'moodbtn'; mbtn.type = 'button';
    mbtn.setAttribute('aria-label', 'Change my mood'); mbtn.title = 'Change my mood';
    mbtn.setAttribute('aria-haspopup', 'true'); mbtn.setAttribute('aria-expanded', 'false');
    ctl.insertBefore(mbtn, ctl.firstChild);
    mm = el('div', 'fx-mm'); mm.hidden = true; mm.setAttribute('role', 'menu'); mm.setAttribute('aria-label', 'Mood');
    mm.appendChild(el('h4', null, 'How are you feeling today?'));
    Object.keys(MOODS).forEach(function (k) {
      var m = MOODS[k], b = el('button'); b.type = 'button'; b.dataset.m = k; b.setAttribute('role', 'menuitemradio');
      b.appendChild(el('span', null, m.i));
      var t = el('span', null, m.n); t.appendChild(el('small', null, m.s)); b.appendChild(t);
      b.addEventListener('click', function () { setMood(k); closeMenu(true); });
      mm.appendChild(b);
    });
    var r = el('button', 'fx-r', '↺ Back to the original look'); r.type = 'button';
    r.addEventListener('click', function () { resetMood(); closeMenu(true); });
    mm.appendChild(r); d.body.appendChild(mm);
    mbtn.addEventListener('click', function (e) { e.stopPropagation(); if (mm.hidden) openMenu(); else closeMenu(false); });
    mm.addEventListener('keydown', function (e) {
      var bs = [].slice.call(mm.querySelectorAll('button')), i = bs.indexOf(d.activeElement);
      if (e.key === 'ArrowDown') { e.preventDefault(); bs[(i + 1) % bs.length].focus(); }
      else if (e.key === 'ArrowUp') { e.preventDefault(); bs[(i - 1 + bs.length) % bs.length].focus(); }
      else if (e.key === 'Escape') { e.stopPropagation(); closeMenu(true); }
    });
    d.addEventListener('click', function (e) { if (!mm.hidden && !mm.contains(e.target)) closeMenu(false); });
    addEventListener('resize', function () { if (!mm.hidden) placeMenu(); });
    addEventListener('scroll', function () { if (!mm.hidden) placeMenu(); }, { passive: true });
  }
  window.fxMood = setMood; window.fxMoodReset = resetMood;
  window.fxMoodMenu = function () { if (mbtn) { mbtn.scrollIntoView({ block: 'nearest' }); openMenu(); } };
  if (d.readyState === 'loading') d.addEventListener('DOMContentLoaded', buildMood); else buildMood();

  if (d.readyState === 'loading') d.addEventListener('DOMContentLoaded', addToys); else addToys();
})();

/* =====================================================================
   SITE-WIDE EXTRAS: card light, section dots, footer-name effects
   Skipped on the home page (it has its own). Adds html.fx-site for site.css.
   ===================================================================== */
(function () {
  'use strict';
  if (window.__fxSite) return;
  window.__fxSite = true;
  var d = document, root = d.documentElement;
  if (d.querySelector('.hero-home')) return;
  var reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  var fine = matchMedia('(hover:hover) and (pointer:fine)').matches;
  function init() {
    root.classList.add('fx-site');

    /* heading underline: reveal even when the h2 has no .rv class */
    var hs = [].slice.call(d.querySelectorAll('.sec h2:not(.rv)'));
    if ('IntersectionObserver' in window) {
      var hio = new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); hio.unobserve(e.target); } }); }, { threshold: .6 });
      hs.forEach(function (h) { hio.observe(h); });
    } else hs.forEach(function (h) { h.classList.add('in'); });

    /* pointer light on cards */
    if (fine) {
      d.addEventListener('pointermove', function (e) {
        var c = e.target.closest && e.target.closest('.card,.ring-card,.steps li,.cert,.proj');
        if (!c) return;
        var r = c.getBoundingClientRect();
        c.style.setProperty('--mx', (e.clientX - r.left) + 'px');
        c.style.setProperty('--my', (e.clientY - r.top) + 'px');
      }, { passive: true });
    }

    /* side dots built from the page's sections */
    var secs = [].slice.call(d.querySelectorAll('main section[id]')).filter(function (s) { return s.querySelector('h2'); });
    if (secs.length > 2 && !d.getElementById('rail')) {
      var nav = d.createElement('nav'); nav.className = 'fx-rail'; nav.setAttribute('aria-label', 'Page sections');
      var links = secs.map(function (s) {
        var a = d.createElement('a'); a.href = '#' + s.id;
        var t = s.querySelector('h2').textContent.trim(); a.setAttribute('data-l', t.length > 26 ? t.slice(0, 24) + '…' : t);
        a.setAttribute('aria-label', t); nav.appendChild(a); return a;
      });
      d.body.appendChild(nav);
      if ('IntersectionObserver' in window) {
        var sio = new IntersectionObserver(function (es) {
          es.forEach(function (e) { if (e.isIntersecting) { var i = secs.indexOf(e.target); links.forEach(function (a, k) { a.classList.toggle('on', k === i); }); } });
        }, { rootMargin: '-45% 0px -50% 0px' });
        secs.forEach(function (s) { sio.observe(s); });
      }
    }

    /* footer name */
    [].slice.call(d.querySelectorAll('.bn')).forEach(function (bn) {
      if (bn.classList.contains('bn-wave') || bn.classList.contains('bn-flip')) {
        var txt = bn.textContent; bn.textContent = ''; bn.setAttribute('aria-hidden', 'true');
        txt.split('').forEach(function (ch, i) {
          var s = d.createElement('span'); s.className = 'l'; s.style.setProperty('--i', i); s.textContent = ch === ' ' ? ' ' : ch; bn.appendChild(s);
        });
      }
      if (bn.classList.contains('bn-flip')) {
        if ('IntersectionObserver' in window) {
          var bio = new IntersectionObserver(function (es) { if (es[0].isIntersecting) { bn.classList.add('in'); bio.disconnect(); } }, { threshold: .4 });
          bio.observe(bn);
        } else bn.classList.add('in');
      }
      if (bn.classList.contains('bn-spot')) {
        if (fine) {
          bn.parentNode.addEventListener('pointermove', function (e) {
            var r = bn.getBoundingClientRect();
            bn.style.setProperty('--fx', ((e.clientX - r.left) / r.width * 100) + '%');
            bn.style.setProperty('--fy', ((e.clientY - r.top) / r.height * 100) + '%');
          });
        } else if (!reduce) bn.classList.add('auto');
      }
    });
  }
  if (d.readyState === 'loading') d.addEventListener('DOMContentLoaded', init); else init();
})();
