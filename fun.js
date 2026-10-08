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
    ".fx-note{margin-top:14px;font-size:11.5px;color:#838d9d}"
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
  if (d.readyState === 'loading') d.addEventListener('DOMContentLoaded', addToys); else addToys();
})();
