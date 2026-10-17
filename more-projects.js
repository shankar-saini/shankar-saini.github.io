/* =====================================================================
   more-projects.js : shared "Liked this project?" helper for all my
   practice projects (travel-time, restaurant-website, login-page,
   calculator, todo-app, registration-form).

   - A small floating button on every project page
   - It opens a pop-up with 2 quick questions
   - If the visitor says yes, the other projects appear as cards
   - The pop-up also opens ONCE by itself, politely: when the visitor has
     reached the end of the page (after 10 s) or has stayed 30 s
   - Nothing is stored on a server. Only sessionStorage is used, so the
     pop-up does not nag again in the same visit.

   One file for every project: upload it to the root of the
   shankar-saini.github.io repository, and each project loads it with
   <script src="https://shankar-saini.github.io/more-projects.js" defer></script>
   ===================================================================== */
(function () {
  'use strict';
  if (window.__mp) return;
  window.__mp = true;

  var BASE = 'https://shankar-saini.github.io/';
  var PROJECTS = [
    { id: 'travel-time', name: 'Travel Time', emoji: '🧳', color: '#e8832a', tag: 'HTML · CSS',
      desc: 'An India travel guide with destination cards, a packages table and a booking form.' },
    { id: 'restaurant-website', name: "Khana's Restaurant", emoji: '🍛', color: '#c4571f', tag: 'HTML · CSS',
      desc: 'A vegetarian restaurant website with a menu, offers table and table reservation form.' },
    { id: 'login-page', name: 'Login Page', emoji: '🔐', color: '#5a3fd0', tag: 'HTML · CSS · JS',
      desc: 'A responsive login page with live validation and a show / hide password button.' },
    { id: 'calculator', name: 'Calculator', emoji: '🧮', color: '#f77f00', tag: 'HTML · CSS · JS',
      desc: 'A working calculator with keyboard support, built without eval().' },
    { id: 'todo-app', name: 'To-Do List', emoji: '✅', color: '#0f766e', tag: 'HTML · CSS · JS',
      desc: 'Add, complete, filter and delete tasks. Your tasks stay saved in the browser.' },
    { id: 'registration-form', name: 'Registration Form', emoji: '📝', color: '#7c3aed', tag: 'HTML · CSS · JS',
      desc: 'A student registration form with field-by-field validation and a summary card.' }
  ];

  var d = document;
  var reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  var T = window.__mpTiming || {};                 // (only for testing)
  var BOTTOM_SECS = T.bottom != null ? T.bottom : 10;
  var STAY_SECS = T.stay != null ? T.stay : 30;

  function ss(k, v) {
    try { if (v === undefined) return sessionStorage.getItem(k); sessionStorage.setItem(k, v); } catch (e) { return null; }
  }
  function el(tag, cls, text) {
    var e = d.createElement(tag);
    if (cls) e.className = cls;
    if (text != null) e.textContent = text;
    return e;
  }

  // which project am I on?
  var current = null;
  PROJECTS.forEach(function (p) { if (location.pathname.indexOf('/' + p.id) !== -1) current = p; });
  var accent = current ? current.color : '#5a3fd0';
  var others = PROJECTS.filter(function (p) { return p !== current; });

  /* ---------- styles ---------- */
  var css =
    '.mp-fab{position:fixed;right:16px;bottom:16px;z-index:900;display:flex;align-items:center;gap:8px;border:0;cursor:pointer;' +
    'font:700 14px/1.2 Arial,Helvetica,sans-serif;color:#fff;background:linear-gradient(135deg,var(--mp-a),#1b1f3b);' +
    'padding:12px 18px;border-radius:999px;box-shadow:0 10px 28px rgba(0,0,0,.3);opacity:0;transform:translateY(16px);' +
    'pointer-events:none;transition:opacity .4s,transform .4s,box-shadow .2s}' +
    '.mp-fab.mp-on{opacity:1;transform:none;pointer-events:auto}' +
    '.mp-fab:hover{box-shadow:0 14px 34px rgba(0,0,0,.38)}' +
    '.mp-fab .mp-sp{font-size:16px}' +
    '.mp-fab.mp-pulse{animation:mp-pulse 2.4s ease-in-out 2}' +
    '@keyframes mp-pulse{0%,100%{box-shadow:0 10px 28px rgba(0,0,0,.3)}50%{box-shadow:0 0 0 8px rgba(255,255,255,.0),0 10px 34px var(--mp-a)}}' +
    '.mp-fab:focus-visible,.mp-dlg button:focus-visible,.mp-dlg a:focus-visible{outline:3px solid #ffb703;outline-offset:2px}' +
    '.mp-dlg{margin:auto;border:0;padding:0;border-radius:22px;max-width:min(640px,calc(100vw - 24px));width:100%;max-height:calc(100vh - 24px);overflow:auto;' +
    'background:#fff;color:#1f2430;font:15px/1.6 Arial,Helvetica,sans-serif;box-shadow:0 30px 80px rgba(0,0,0,.45)}' +
    '.mp-dlg::backdrop{background:rgba(15,18,35,.62);backdrop-filter:blur(3px)}' +
    '.mp-dlg[open]{animation:mp-in .35s cubic-bezier(.2,.9,.3,1.1)}' +
    '@keyframes mp-in{from{opacity:0;transform:translateY(18px) scale(.97)}to{opacity:1;transform:none}}' +
    '.mp-top{height:6px;background:linear-gradient(90deg,var(--mp-a),#ffd166,#2ec4b6)}' +
    '.mp-x{position:absolute;top:14px;right:14px;width:36px;height:36px;border-radius:50%;border:0;background:#f0f1f6;color:#444;font-size:22px;line-height:1;cursor:pointer}' +
    '.mp-x:hover{background:#e3e5ef}' +
    '.mp-body{padding:30px 28px 26px}' +
    '.mp-step{font:700 12px/1 Arial,sans-serif;letter-spacing:.08em;text-transform:uppercase;color:var(--mp-a);margin-bottom:10px}' +
    '.mp-body h2{font-size:24px;line-height:1.25;margin:0 36px 8px 0;color:#14172a}' +
    '.mp-body p{margin:0 0 16px;color:#4b5167}' +
    '.mp-opts{display:flex;flex-wrap:wrap;gap:10px;margin-top:8px}' +
    '.mp-opt{border:2px solid #e2e5f0;background:#fff;color:#1f2430;border-radius:14px;padding:13px 18px;font:700 15px Arial,sans-serif;cursor:pointer;transition:transform .15s,border-color .15s,background .15s}' +
    '.mp-opt:hover{transform:translateY(-2px);border-color:var(--mp-a);background:#f8f8fd}' +
    '.mp-opt.mp-main{background:var(--mp-a);border-color:var(--mp-a);color:#fff}' +
    '.mp-opt.mp-main:hover{background:var(--mp-a);filter:brightness(1.08)}' +
    '.mp-dots{display:flex;gap:6px;margin-top:22px}' +
    '.mp-dots i{width:22px;height:5px;border-radius:3px;background:#e2e5f0}' +
    '.mp-dots i.mp-d{background:var(--mp-a)}' +
    '.mp-grid{display:grid;grid-template-columns:1fr 1fr;gap:12px;margin:14px 0 6px}' +
    '.mp-card{display:flex;flex-direction:column;gap:4px;text-decoration:none;color:inherit;border:1px solid #e2e5f0;border-left:5px solid var(--c);border-radius:14px;padding:14px 14px 12px;background:#fff;transition:transform .2s,box-shadow .2s}' +
    '.mp-card:hover{transform:translateY(-3px);box-shadow:0 12px 26px rgba(20,25,60,.14)}' +
    '.mp-card b{font-size:16px;color:#14172a}' +
    '.mp-card b span{margin-right:6px}' +
    '.mp-card small{font-size:12.5px;line-height:1.5;color:#5b6176}' +
    '.mp-card em{font-style:normal;font-size:11.5px;font-weight:700;color:var(--c);letter-spacing:.03em;margin-top:2px}' +
    '.mp-links{display:flex;flex-wrap:wrap;gap:6px 18px;margin-top:14px;font-size:14px}' +
    '.mp-links a{color:var(--mp-a);font-weight:700;text-decoration:underline}' +
    '@media(max-width:560px){.mp-grid{grid-template-columns:1fr}.mp-body{padding:26px 18px 22px}.mp-body h2{font-size:21px}' +
    '.mp-fab{right:12px;bottom:12px;padding:11px 15px;font-size:13px}.mp-fab .mp-long{display:none}}' +
    '@media(min-width:561px){.mp-fab .mp-short{display:none}}' +
    '@media(prefers-reduced-motion:reduce){.mp-dlg[open],.mp-fab.mp-pulse{animation:none}.mp-fab,.mp-card,.mp-opt{transition:none}}';

  var style = d.createElement('style');
  style.textContent = css;
  d.head.appendChild(style);
  d.documentElement.style.setProperty('--mp-a', accent);

  /* ---------- floating button ---------- */
  var fab = el('button', 'mp-fab');
  fab.type = 'button';
  fab.setAttribute('aria-haspopup', 'dialog');
  var sp = el('span', 'mp-sp', '✨'); sp.setAttribute('aria-hidden', 'true');
  fab.appendChild(sp);
  fab.appendChild(el('span', 'mp-long', 'Liked this? See my other projects'));
  fab.appendChild(el('span', 'mp-short', 'More projects'));

  /* ---------- pop-up ---------- */
  var dlg = d.createElement('dialog');
  dlg.className = 'mp-dlg';
  dlg.setAttribute('aria-labelledby', 'mp-title');
  var xBtn = el('button', 'mp-x', '×');
  xBtn.type = 'button';
  xBtn.setAttribute('aria-label', 'Close');
  var body = el('div', 'mp-body');
  dlg.appendChild(el('div', 'mp-top'));
  dlg.appendChild(xBtn);
  dlg.appendChild(body);

  var name = current ? current.name : 'this project';

  function clear() { while (body.firstChild) body.removeChild(body.firstChild); }
  function head(step, title, text) {
    body.appendChild(el('div', 'mp-step', step));
    var h = el('h2', null, title); h.id = 'mp-title';
    body.appendChild(h);
    if (text) body.appendChild(el('p', null, text));
  }
  function dots(n) {
    var w = el('div', 'mp-dots');
    for (var i = 1; i <= 3; i++) { var s = d.createElement('i'); if (i <= n) s.className = 'mp-d'; w.appendChild(s); }
    body.appendChild(w);
  }
  function opt(label, main, fn) {
    var b = el('button', 'mp-opt' + (main ? ' mp-main' : ''), label);
    b.type = 'button';
    b.addEventListener('click', fn);
    return b;
  }

  function stepOne() {
    clear();
    head('Quick question 1 of 2', 'Did you like ' + name + '?', 'It is a practice project, built by Shankar Saini while learning web development. Your honest answer helps.');
    var o = el('div', 'mp-opts');
    o.appendChild(opt('😍 Yes, loved it', true, function () { ss('mp-like', 'yes'); stepTwo('Thank you! That really makes my day.'); }));
    o.appendChild(opt('🙂 It is okay', false, function () { ss('mp-like', 'ok'); stepTwo('Thanks! I will keep improving.'); }));
    o.appendChild(opt('🤔 Needs work', false, function () { ss('mp-like', 'no'); stepTwo('Thanks for being honest. I am still learning and getting better.'); }));
    body.appendChild(o);
    dots(1);
    focusFirst();
  }

  function stepTwo(thanks) {
    clear();
    head('Quick question 2 of 2', 'Would you like to see more of my work?', thanks + ' I have built a few other projects too, such as a calculator, a to-do app and a login page.');
    var o = el('div', 'mp-opts');
    o.appendChild(opt('Yes, show me', true, function () { ss('mp-more', 'yes'); showCards(); }));
    o.appendChild(opt('Maybe later', false, function () { ss('mp-more', 'later'); bye(); }));
    body.appendChild(o);
    dots(2);
    focusFirst();
  }

  function showCards() {
    clear();
    head('More from Shankar Saini', 'Here are my other projects', 'Each one opens in the same tab. Tap any card to try it.');
    var g = el('div', 'mp-grid');
    others.forEach(function (p) {
      var a = el('a', 'mp-card');
      a.href = BASE + p.id + '/';
      a.style.setProperty('--c', p.color);
      var b = el('b'); var e = el('span', null, p.emoji); e.setAttribute('aria-hidden', 'true');
      b.appendChild(e); b.appendChild(d.createTextNode(p.name));
      a.appendChild(b);
      a.appendChild(el('small', null, p.desc));
      a.appendChild(el('em', null, p.tag + '  →'));
      g.appendChild(a);
    });
    body.appendChild(g);
    var l = el('div', 'mp-links');
    [['See all my projects', BASE + 'projects'], ['Visit my portfolio', BASE], ['Say hello', BASE + 'contact']].forEach(function (x) {
      var a = el('a', null, x[0]); a.href = x[1]; l.appendChild(a);
    });
    if (current) {
      var g2 = el('a', null, 'Code of ' + current.name + ' on GitHub');
      g2.href = 'https://github.com/shankar-saini/' + current.id; g2.target = '_blank'; g2.rel = 'noopener';
      l.appendChild(g2);
    }
    body.appendChild(l);
    dots(3);
    focusFirst();
  }

  function bye() {
    clear();
    head('Thanks for visiting', 'No problem, thanks for stopping by!', 'You can come back any time with the button at the bottom of the page.');
    var o = el('div', 'mp-opts');
    var a = el('a', 'mp-opt', 'See all my projects'); a.href = BASE + 'projects';
    a.style.textDecoration = 'none';
    o.appendChild(a);
    o.appendChild(opt('Close', false, close));
    body.appendChild(o);
    dots(3);
  }

  function focusFirst() {
    var f = body.querySelector('button, a');
    if (f && dlg.open) f.focus({ preventScroll: true });
  }

  function open(auto) {
    if (dlg.open) return;
    if (!dlg.showModal) { location.href = BASE + 'projects'; return; }   // very old browsers
    if (ss('mp-more') === 'yes') showCards(); else stepOne();
    dlg.showModal();
    focusFirst();
    ss('mp-seen', '1');
    fab.classList.remove('mp-pulse');
  }
  function close() { if (dlg.open) dlg.close(); }

  xBtn.addEventListener('click', close);
  dlg.addEventListener('click', function (e) { if (e.target === dlg) close(); });   // click on the dark backdrop
  fab.addEventListener('click', function () { open(false); });

  /* ---------- when to show the button / open by itself ---------- */
  var seconds = 0, atBottom = false;
  function checkBottom() {
    var h = d.documentElement.scrollHeight - innerHeight;
    if (h < 40) return;                              // short page: no scrolling possible
    if (scrollY / h > 0.9) atBottom = true;
  }
  addEventListener('scroll', function () {
    checkBottom();
    if (scrollY > 120) showFab();
  }, { passive: true });

  var fabShown = false;
  function showFab() {
    if (fabShown) return;
    fabShown = true;
    fab.classList.add('mp-on');
    if (!reduce) fab.classList.add('mp-pulse');
  }

  function typing() {
    var a = d.activeElement;
    return a && /^(INPUT|TEXTAREA|SELECT)$/.test(a.tagName) && a.type !== 'checkbox' && a.type !== 'radio' && a.type !== 'button' && a.type !== 'submit';
  }

  function ready() {
    d.body.appendChild(fab);
    d.body.appendChild(dlg);
    var pageScrolls = (d.documentElement.scrollHeight - innerHeight) > 40;
    setTimeout(showFab, pageScrolls ? 6000 : 2500);
    setInterval(function () {
      if (d.hidden) return;                          // count only while the tab is visible
      seconds++;
      if (ss('mp-seen') || dlg.open) return;
      var due = (atBottom && seconds >= BOTTOM_SECS) || seconds >= STAY_SECS;
      if (due && !typing()) { showFab(); open(true); }
    }, 1000);
    checkBottom();
  }
  if (d.readyState === 'loading') d.addEventListener('DOMContentLoaded', ready); else ready();
})();
