/* SBR Music lesson view: one component used by music/index.html and as an in-page overlay in every brief player. */
(function(){
  var CSS = [
  '.sbrm{max-width:760px;margin:0 auto;padding:18px 14px 80px;color:var(--ink);font-family:Georgia,"Times New Roman",serif;line-height:1.4}',
  '.sbrm a{color:var(--ink);text-decoration:none;border-bottom:1px solid var(--mut)}',
  '.sbrm .m-hdr{border-bottom:1.5px solid var(--ink);padding-bottom:10px;margin-bottom:12px;text-align:center}',
  '.sbrm .m-hdr h1{margin:0;font-size:30px;letter-spacing:.02em;font-weight:700}',
  '.sbrm .m-sub{font-size:12px;letter-spacing:.1em;text-transform:uppercase;color:var(--mut);margin-top:4px;font-family:-apple-system,sans-serif}',
  '.sbrm .m-back{display:inline-block;margin:0 0 12px;font-size:13px;font-family:-apple-system,sans-serif;background:none;border:0;border-bottom:1px solid var(--mut);padding:6px 0;color:var(--ink);cursor:pointer}',
  '.sbrm .m-tabs{display:flex;gap:22px;border-bottom:1px solid var(--line);margin:0 0 14px;font-family:-apple-system,sans-serif}',
  '.sbrm .m-tabs button{background:none;border:0;border-bottom:2px solid transparent;margin-bottom:-1px;padding:10px 2px;font-size:14px;color:var(--mut);cursor:pointer;font-family:inherit}',
  '.sbrm .m-tabs button[aria-selected=true]{color:var(--ink);border-bottom-color:var(--ink);font-weight:600}',
  '.sbrm .m-intro{font-size:14px;line-height:1.5;color:var(--mut);margin:0 0 16px}',
  '.sbrm h2{font-size:12px;letter-spacing:.12em;text-transform:uppercase;font-family:-apple-system,sans-serif;color:var(--mut);margin:22px 0 4px;border-bottom:1px solid var(--ink);padding-bottom:4px}',
  '.sbrm .m-row{border-bottom:1px solid var(--line);scroll-margin-top:12px}',
  '.sbrm .m-row.m-cur{border-left:3px solid var(--ink);padding-left:6px;background:var(--card)}',
  '.sbrm .m-now{display:none;font-family:-apple-system,sans-serif;font-size:11px;letter-spacing:.1em;text-transform:uppercase;font-weight:700;margin-bottom:2px}',
  '.sbrm .m-cur .m-now{display:block}',
  '.sbrm .m-rowh{display:flex;align-items:flex-start;gap:8px;padding:10px 0}',
  '.sbrm .m-num{flex:0 0 30px;font-family:-apple-system,sans-serif;font-size:12px;color:var(--mut);padding-top:3px;text-align:right}',
  '.sbrm .m-main{flex:1;min-width:0}',
  '.sbrm .m-ttl{font-size:16px;line-height:1.3;font-weight:600}',
  '.sbrm .m-perf{font-size:13px;color:var(--mut);margin-top:2px;line-height:1.35}',
  '.sbrm .m-meta{font-size:12px;color:var(--mut);margin-top:3px;font-family:-apple-system,sans-serif}',
  '.sbrm .m-play,.sbrm .m-dots{background:none;border:0;color:var(--ink);cursor:pointer;font-family:-apple-system,sans-serif;touch-action:manipulation}',
  '.sbrm .m-play{font-size:12px;min-height:44px;padding:0 6px;color:var(--mut)}',
  '.sbrm .m-dots{font-size:24px;line-height:1;width:44px;min-height:44px;margin-top:-6px}',
  '.sbrm .m-panel{padding:2px 0 14px 38px;font-size:14px;line-height:1.5}',
  '.sbrm .m-panel[hidden]{display:none}',
  '.sbrm dl{margin:0 0 10px;display:grid;grid-template-columns:96px 1fr;gap:3px 10px;font-size:13px}',
  '.sbrm dt{color:var(--mut);font-family:-apple-system,sans-serif;font-size:12px;padding-top:1px}',
  '.sbrm dd{margin:0}',
  '.sbrm .m-about{margin:0 0 12px}',
  '.sbrm .m-term{border-left:2px solid var(--ink);padding:2px 0 2px 10px}',
  '.sbrm .m-k{font-family:-apple-system,sans-serif;font-size:11px;letter-spacing:.1em;text-transform:uppercase;color:var(--mut)}',
  '.sbrm .m-t{font-size:16px;font-weight:700;margin:2px 0 4px}',
  '.sbrm .m-term p{margin:0}',
  '.sbrm .m-ety{margin-top:6px!important;font-size:13px;color:var(--mut);font-style:italic}',
  '.sbrm .m-ety a{font-style:normal;font-size:11px;font-family:-apple-system,sans-serif}',
  '.sbrm .m-src{font-size:12px;color:var(--mut);margin-top:10px;font-family:-apple-system,sans-serif}',
  '.sbrm .m-toplayer{display:inline-block;margin-top:10px;font-size:13px;font-family:-apple-system,sans-serif}',
  '.sbrm .m-tn{font-weight:700}',
  '.sbrm .m-foot{margin-top:28px;font-size:12px;color:var(--mut);font-family:-apple-system,sans-serif;border-top:1px solid var(--line);padding-top:10px}',
  '@media(max-width:480px){.sbrm .m-panel{padding-left:0}.sbrm dl{grid-template-columns:82px 1fr}.sbrm .m-num{flex-basis:24px}}'
  ].join('');
  function tid(f){ return f.replace('/', '-').replace('.mp3', ''); }
  function el(tag, cls, text){ var e = document.createElement(tag); if (cls) e.className = cls; if (text != null) e.textContent = text; return e; }
  function fmt(s){ s = Math.round(s || 0); return Math.floor(s / 60) + ':' + ('0' + (s % 60)).slice(-2); }
  var S = { root: null, opts: null, man: null, info: null, credits: {}, mode: 'lists', openId: null, current: null, playing: null, au: null };
  function css(){ if (document.getElementById('sbrm-css')) return; var st = document.createElement('style'); st.id = 'sbrm-css'; st.textContent = CSS; document.head.appendChild(st); }
  function find(f){ var r = null; Object.keys(S.man.lists).forEach(function(k){ S.man.lists[k].tracks.forEach(function(t){ if (t.file === f) r = t; }); }); return r; }
  function closeAll(){
    var p = S.view.querySelectorAll('.m-panel:not([hidden])'); for (var i = 0; i < p.length; i++) p[i].hidden = true;
    var b = S.view.querySelectorAll('.m-dots[aria-expanded=true]'); for (var j = 0; j < b.length; j++) b[j].setAttribute('aria-expanded', 'false');
    S.openId = null;
  }
  function panel(f, pid){
    var d = S.info.tracks[f], c = S.credits[f] || {}, tk = find(f);
    var p = el('div', 'm-panel'); p.id = pid; p.hidden = true;
    var dl = el('dl');
    function item(k, v){ if (!v) return; dl.appendChild(el('dt', null, k)); dl.appendChild(el('dd', null, v)); }
    item('Composer', d.composer); item('Work', d.work); item('Movement', d.movement); item('Performers', c.performer || tk.performer); item('Written', d.year);
    p.appendChild(dl);
    p.appendChild(el('p', 'm-about', d.about));
    var t = el('div', 'm-term');
    t.appendChild(el('div', 'm-k', 'Term ' + d.term_no + ' of ' + S.info.order.length));
    t.appendChild(el('div', 'm-t', d.term));
    t.appendChild(el('p', null, d.term_text));
    if (d.etym) { var e = el('p', 'm-ety', 'Word origin: ' + d.etym + ' '); if (d.etym_src) { var a = el('a', null, 'source'); a.href = d.etym_src; a.target = '_blank'; a.rel = 'noopener'; e.appendChild(a); } t.appendChild(e); }
    p.appendChild(t);
    var s = el('div', 'm-src');
    if (c.source) { s.appendChild(document.createTextNode('Recording: ' + (c.license || '') + ' · ')); var a2 = el('a', null, 'source'); a2.href = c.source; a2.target = '_blank'; a2.rel = 'noopener'; s.appendChild(a2); }
    p.appendChild(s);
    var bk = el('a', 'm-toplayer', '\u2190 Back to the player');
    if (S.opts.embedded) { bk.href = '#'; bk.onclick = function(ev){ ev.preventDefault(); S.opts.onClose && S.opts.onClose(); }; }
    else { bk.href = S.playerHref; }
    p.appendChild(bk);
    return p;
  }
  function row(f, n, ord){
    var d = S.info.tracks[f], tk = find(f), pid = (ord ? 'o-' : 't-') + tid(f);
    var r = el('div', 'm-row'); r.id = pid; r.setAttribute('data-file', f);
    if (f === S.current) r.className += ' m-cur';
    var h = el('div', 'm-rowh');
    h.appendChild(el('div', 'm-num', String(n)));
    var m = el('div', 'm-main');
    m.appendChild(el('div', 'm-now', 'Now playing'));
    if (ord) {
      var tt = el('div', 'm-ttl'); tt.appendChild(el('span', 'm-tn', d.term)); m.appendChild(tt);
      m.appendChild(el('div', 'm-perf', tk.title));
      m.appendChild(el('div', 'm-meta', (f.indexOf('calm/') === 0 ? 'Calm' : 'Lively') + ' · ' + fmt(tk.duration)));
    } else {
      m.appendChild(el('div', 'm-ttl', tk.title));
      m.appendChild(el('div', 'm-perf', tk.performer));
      m.appendChild(el('div', 'm-meta', fmt(tk.duration) + ' · Term ' + d.term_no + ': ' + d.term));
    }
    h.appendChild(m);
    if (!S.opts.embedded) {
      var pl = el('button', 'm-play', S.playing === f ? 'Pause' : 'Play'); pl.type = 'button'; pl.setAttribute('aria-label', 'Play ' + tk.title); pl.setAttribute('data-play', f);
      pl.onclick = function(){ togglePlay(f); }; h.appendChild(pl);
    }
    var b = el('button', 'm-dots', '\u22EE'); b.type = 'button';
    b.setAttribute('aria-label', 'More about ' + tk.title); b.setAttribute('aria-expanded', 'false'); b.setAttribute('aria-controls', pid + '-p');
    h.appendChild(b); r.appendChild(h);
    var p = panel(f, pid + '-p'); r.appendChild(p);
    b.onclick = function(){ var was = !p.hidden; closeAll(); if (!was) { p.hidden = false; b.setAttribute('aria-expanded', 'true'); S.openId = pid; } };
    return r;
  }
  function togglePlay(f){
    if (!S.au) { S.au = new Audio(); S.au.addEventListener('ended', function(){ S.playing = null; S.current = null; mark(); }); }
    if (S.playing === f) { S.au.pause(); S.playing = null; } else { S.au.src = S.opts.base + f; S.au.play().catch(function(){}); S.playing = f; }
    S.current = S.playing; mark();
  }
  function mark(){
    if (!S.view) return;
    var rows = S.view.querySelectorAll('.m-row');
    for (var i = 0; i < rows.length; i++) { var on = rows[i].getAttribute('data-file') === S.current; rows[i].className = 'm-row' + (on ? ' m-cur' : ''); }
    var bs = S.view.querySelectorAll('.m-play'); for (var j = 0; j < bs.length; j++) bs[j].textContent = (bs[j].getAttribute('data-play') === S.playing) ? 'Pause' : 'Play';
  }
  function render(){
    S.view.textContent = '';
    S.tabL.setAttribute('aria-selected', S.mode === 'lists' ? 'true' : 'false'); S.tabO.setAttribute('aria-selected', S.mode === 'order' ? 'true' : 'false');
    if (S.mode === 'lists') {
      S.view.appendChild(el('p', 'm-intro', 'Both playlists play shuffled after the news. Tap the three dots on a piece for who wrote it, who plays it, and one music term that piece shows. The terms are numbered in the order to learn them.'));
      ['lively', 'calm'].forEach(function(k){
        var L = S.man.lists[k]; if (!L) return;
        S.view.appendChild(el('h2', null, L.label + ' · ' + L.tracks.length + ' pieces'));
        L.tracks.forEach(function(t, i){ S.view.appendChild(row(t.file, i + 1, false)); });
      });
    } else {
      S.view.appendChild(el('p', 'm-intro', S.info.order.length + ' terms, simplest first. Each later term only uses ideas from earlier ones, so start at 1 and go down. Tap the three dots for the explanation.'));
      S.info.order.forEach(function(f, i){ S.view.appendChild(row(f, i + 1, true)); });
    }
  }
  function mount(root, opts){
    css(); S.root = root; S.opts = opts || {}; S.opts.base = S.opts.base || '../sleep-music/';
    S.playerHref = '../index.html';
    try { var rf = document.referrer; if (rf && rf.indexOf(location.origin) === 0 && /player\.html/.test(rf)) S.playerHref = rf; } catch (e) {}
    root.textContent = '';
    var w = el('div', 'sbrm'); root.appendChild(w);
    var hd = el('div', 'm-hdr'); hd.appendChild(el('h1', null, 'SBR Music')); hd.appendChild(el('div', 'm-sub', 'The classical pieces that play after the brief')); w.appendChild(hd);
    var back;
    if (S.opts.embedded) { back = el('button', 'm-back', '\u2190 Back to the brief'); back.type = 'button'; back.onclick = function(){ S.opts.onClose && S.opts.onClose(); }; }
    else { back = el('a', 'm-back', '\u2190 Back to the brief'); back.href = S.playerHref; }
    back.id = 'm-backtop'; w.appendChild(back);
    var tabs = el('div', 'm-tabs'); tabs.setAttribute('role', 'tablist');
    S.tabL = el('button', null, 'Playlists'); S.tabO = el('button', null, 'Learn in order');
    [S.tabL, S.tabO].forEach(function(b){ b.type = 'button'; b.setAttribute('role', 'tab'); tabs.appendChild(b); });
    S.tabL.id = 'm-tabLists'; S.tabO.id = 'm-tabOrder';
    S.tabL.onclick = function(){ S.mode = 'lists'; S.openId = null; render(); };
    S.tabO.onclick = function(){ S.mode = 'order'; S.openId = null; render(); };
    w.appendChild(tabs);
    S.view = el('div', 'm-view'); w.appendChild(S.view);
    var ft = el('div', 'm-foot', 'Recordings are free: public domain or Creative Commons. Full credits and licenses are on the ');
    var ca = el('a', null, 'credits page'); ca.href = S.opts.base + 'credits.html'; ft.appendChild(ca); ft.appendChild(document.createTextNode('.')); w.appendChild(ft);
    document.addEventListener('keydown', function(e){ if (e.key === 'Escape' && S.openId) closeAll(); });
    return Promise.all([
      fetch(S.opts.base + 'manifest.json').then(function(r){ return r.json(); }),
      fetch(S.opts.base + 'credits.json').then(function(r){ return r.json(); }),
      fetch(S.opts.info || 'music-info.json').then(function(r){ return r.json(); })
    ]).then(function(a){ S.man = a[0]; S.info = a[2]; a[1].forEach(function(c){ S.credits[c.file] = c; }); render(); });
  }
  function show(id){
    if (!S.view) return;
    if (!id) { if (S.root.scrollTo) S.root.scrollTo(0, 0); return; }
    if (S.mode !== 'lists') { S.mode = 'lists'; render(); }
    var r = document.getElementById('t-' + id); if (!r) return;
    closeAll();
    var p = r.querySelector('.m-panel'), b = r.querySelector('.m-dots');
    p.hidden = false; b.setAttribute('aria-expanded', 'true'); S.openId = r.id;
    r.scrollIntoView({ block: 'start' });
  }
  function setCurrent(f){ S.current = f || null; mark(); }
  window.SBRMusic = { mount: mount, show: show, setCurrent: setCurrent, trackId: tid };
})();
