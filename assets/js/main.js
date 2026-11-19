/* Threadworks — site interactions */
(function () {
  'use strict';
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var $ = function (sel, root) { return (root || document).querySelector(sel); };
  var $$ = function (sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); };
  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }

  /* ---------- Header: shadow on scroll + mobile menu ---------- */
  var header = $('.site-header');
  if (header) {
    var onScroll = function () { header.classList.toggle('scrolled', window.scrollY > 8); };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    var menuBtn = $('.menu-btn', header);
    if (menuBtn) {
      menuBtn.addEventListener('click', function () {
        var open = header.classList.toggle('menu-open');
        menuBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
        menuBtn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
      });
    }
  }

  /* ---------- Reveal on scroll ---------- */
  function observeReveals(root) {
    var items = $$('.reveal, .reveal-stagger', root).filter(function (el) { return !el.classList.contains('visible'); });
    if (!('IntersectionObserver' in window) || reduceMotion) {
      items.forEach(function (el) { el.classList.add('visible'); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    items.forEach(function (el) { io.observe(el); });
  }
  window.TW_observeReveals = observeReveals;
  observeReveals();

  /* ---------- Hero slideshow ---------- */
  $$('.slideshow').forEach(function (show) {
    var slides = $$('.slide', show);
    var dotsBox = $('.dots', show);
    var caption = $('.slide-caption', show);
    var count = $('.slide-count', show);
    var seconds = Math.max(2, parseFloat(show.getAttribute('data-seconds')) || 4);
    var current = 0, timer = null, paused = false;
    show.style.setProperty('--slide-time', seconds + 's');

    // Photos: each slide has an <img>; if the file is missing, keep the drawn garment.
    slides.forEach(function (slide) {
      var img = $('img', slide);
      if (!img) return;
      var drop = function () { img.remove(); };
      if (img.complete && img.naturalWidth === 0) drop();
      img.addEventListener('error', drop);
    });

    var dots = slides.map(function (s, i) {
      var b = document.createElement('button');
      b.type = 'button';
      b.className = 'dot';
      b.setAttribute('aria-label', 'Show image ' + (i + 1));
      b.addEventListener('click', function () { go(i, true); });
      dotsBox.appendChild(b);
      return b;
    });

    function go(i, user) {
      current = (i + slides.length) % slides.length;
      slides.forEach(function (s, n) {
        var on = n === current;
        s.classList.toggle('active', on);
        s.setAttribute('aria-hidden', on ? 'false' : 'true');
      });
      dots.forEach(function (d, n) {
        d.classList.remove('active');
        d.removeAttribute('aria-current');
        if (n === current) { void d.offsetWidth; d.classList.add('active'); d.setAttribute('aria-current', 'true'); }
      });
      if (caption) caption.textContent = slides[current].getAttribute('data-caption') || '';
      if (count) count.textContent = String(current + 1).padStart(2, '0') + ' / ' + String(slides.length).padStart(2, '0');
      if (user) restart();
    }
    function restart() {
      clearInterval(timer);
      if (reduceMotion) return;
      timer = setInterval(function () { if (!paused) go(current + 1); }, seconds * 1000);
    }
    var prev = $('.arrow.prev', show), next = $('.arrow.next', show);
    if (prev) prev.addEventListener('click', function () { go(current - 1, true); });
    if (next) next.addEventListener('click', function () { go(current + 1, true); });
    var pause = function () { paused = true; show.classList.add('paused'); };
    var resume = function () { paused = false; show.classList.remove('paused'); };
    show.addEventListener('mouseenter', pause);
    show.addEventListener('mouseleave', resume);
    show.addEventListener('focusin', pause);
    show.addEventListener('focusout', resume);
    show.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowLeft') { go(current - 1, true); }
      if (e.key === 'ArrowRight') { go(current + 1, true); }
    });
    document.addEventListener('visibilitychange', function () { document.hidden ? pause() : resume(); });
    // Swipe on touch screens
    var startX = null;
    show.addEventListener('touchstart', function (e) { startX = e.touches[0].clientX; }, { passive: true });
    show.addEventListener('touchend', function (e) {
      if (startX === null) return;
      var dx = e.changedTouches[0].clientX - startX;
      if (Math.abs(dx) > 40) go(current + (dx < 0 ? 1 : -1), true);
      startX = null;
    });
    go(0);
    restart();
  });

  /* ---------- Filter chips (products + work) ---------- */
  function setupFilters(group) {
    var target = $(group.getAttribute('data-filter-target'));
    var counter = $(group.getAttribute('data-count-target') || '#none');
    var noun = group.getAttribute('data-noun') || 'item';
    if (!target) return;
    var chips = $$('.chip', group);
    function apply(cat) {
      var shown = 0;
      chips.forEach(function (c) { c.setAttribute('aria-pressed', c.getAttribute('data-filter') === cat ? 'true' : 'false'); });
      $$('[data-cat]', target).forEach(function (item) {
        var show = cat === 'All' || item.getAttribute('data-cat') === cat;
        item.classList.toggle('is-hidden', !show);
        if (show) { shown++; item.classList.remove('pop'); void item.offsetWidth; item.classList.add('pop'); }
      });
      if (counter) counter.textContent = shown + ' ' + noun + (shown === 1 ? '' : 's');
    }
    chips.forEach(function (c) { c.addEventListener('click', function () { apply(c.getAttribute('data-filter')); }); });
    apply('All');
  }

  /* ---------- Work page: render project cards ---------- */
  function art(p, cls) {
    var shape = (window.TW_SHAPES || {})[p.shape] || '';
    var img = p.cover ? '<img src="' + esc(p.cover) + '" alt="" loading="lazy">' : '';
    return '<div class="art ' + (cls || '') + '" style="background:' + esc(p.bg) + '">' +
      '<svg viewBox="0 0 200 200" aria-hidden="true"><path d="' + shape + '" fill="' + esc(p.fill) + '"></path></svg>' + img + '</div>';
  }
  var projectGrid = $('#projects');
  if (projectGrid && window.TW_PROJECTS) {
    var limit = parseInt(projectGrid.getAttribute('data-limit'), 10) || 0;
    var list = limit ? window.TW_PROJECTS.slice(0, limit) : window.TW_PROJECTS;
    projectGrid.innerHTML = list.map(function (p) {
      return '<a class="project lift zoom" data-cat="' + esc(p.category) + '" href="case-study.html?p=' + encodeURIComponent(p.id) + '">' +
        '<div style="position:relative">' + art(p, 'ar-43') +
        '<span class="art-tag" style="position:absolute;top:16px;left:16px;background:#fff;border-radius:999px;padding:6px 12px;font-size:13px;font-weight:600">' + esc(p.category) + '</span>' +
        '<span class="go" aria-hidden="true"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2"><path d="M7 17L17 7M8 7h9v9"/></svg></span></div>' +
        '<div class="project-body"><span class="h3" style="font-size:22px">' + esc(p.title) + '</span>' +
        '<span class="muted" style="font-size:15px">' + esc(p.summary) + '</span>' +
        '<span style="font-size:14px;font-weight:500;padding-top:6px">' + esc(p.services) + '</span></div></a>';
    }).join('');
    projectGrid.classList.add('reveal-stagger');
    observeReveals(projectGrid.parentNode);
  }
  $$('[data-filter-target]').forEach(setupFilters);

  /* ---------- Case study page ---------- */
  var caseRoot = $('#case-study');
  if (caseRoot && window.TW_PROJECTS) {
    var id = new URLSearchParams(location.search).get('p');
    var all = window.TW_PROJECTS;
    var idx = Math.max(0, all.findIndex(function (p) { return p.id === id; }));
    var p = all[idx];
    var nxt = all[(idx + 1) % all.length];
    document.title = p.title.replace(/\[|\]/g, '') + ' — Case study — Threadworks';
    var gallery = (p.gallery && p.gallery.length ? p.gallery : ['', '', '']).map(function (src, i) {
      var labels = ['[Sample / fitting photo]', '[Production photo]', '[Finished product photo]'];
      var bgs = ['#F4F4F2', p.bg === '#161616' || p.bg === '#2F4A3A' ? '#E9E9E6' : p.bg, '#E9E9E6'];
      return '<figure class="art ar-45 lift" style="margin:0;background:' + bgs[i % 3] + ';align-items:flex-end;justify-content:flex-start;padding:18px">' +
        (src ? '<img src="' + esc(src) + '" alt="' + esc(p.title) + ' photo ' + (i + 1) + '" loading="lazy">' : '<figcaption style="background:#fff;border-radius:999px;padding:7px 12px;font-size:13px;position:relative">' + labels[i % 3] + '</figcaption>') +
        '</figure>';
    }).join('');
    var story = [['01', 'The brief', p.brief, 't-blue'], ['02', 'What we did', p.approach, 't-yellow'], ['03', 'The result', p.result, 't-green']].map(function (s) {
      return '<div class="stack" style="gap:14px;padding:8px 4px"><span class="chip-num ' + s[3] + '">' + s[0] + '</span><h2 class="h3" style="font-size:30px">' + s[1] + '</h2><p class="muted" style="margin:0;font-size:17px;line-height:1.6">' + esc(s[2]) + '</p></div>';
    }).join('');
    caseRoot.innerHTML =
      '<div class="in" style="display:flex;flex-wrap:wrap;justify-content:space-between;align-items:center;gap:12px;padding:24px 4px 8px">' +
        '<a class="btn btn-grey btn-sm" href="work.html"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true" style="transform:none"><path d="M15 6l-6 6 6 6"/></svg>All work</a>' +
        (p.sample ? '<span class="sample-note">Sample case study — replace with a real project</span>' : '') +
      '</div>' +
      '<header class="stack" style="gap:18px;padding:24px 4px 16px">' +
        '<span class="badge in t-grey">' + esc(p.category) + '</span>' +
        '<h1 class="h1 in d1" style="font-size:clamp(40px,6vw,88px);max-width:1000px">' + esc(p.title) + '</h1>' +
        '<p class="lead in d2" style="font-size:20px;max-width:720px">' + esc(p.summary) + '</p>' +
      '</header>' +
      '<div class="pop d2" style="position:relative">' + art(p, 'case-hero') +
        (p.cover ? '' : '<span style="position:absolute;left:20px;bottom:20px;background:#fff;border-radius:999px;padding:8px 14px;font-size:14px">[Hero photo of the finished collection]</span>') + '</div>' +
      '<dl class="facts reveal-stagger">' +
        '<div><dt>Client</dt><dd>' + esc(p.client) + '</dd></div><div><dt>Services</dt><dd>' + esc(p.services) + '</dd></div>' +
        '<div><dt>Quantity</dt><dd>' + esc(p.quantity) + '</dd></div><div><dt>Timeline</dt><dd>' + esc(p.timeline) + '</dd></div>' +
      '</dl>' +
      '<section class="grid reveal-stagger" style="padding-top:40px">' + story + '</section>' +
      '<section class="grid reveal-stagger" aria-label="Gallery" style="padding-top:40px">' + gallery + '</section>' +
      '<section class="panel panel-green reveal" style="display:flex;flex-wrap:wrap;gap:32px;justify-content:space-between;align-items:flex-end;margin-top:40px">' +
        '<div class="stack" style="gap:18px;max-width:760px"><span class="eyebrow" style="color:#FFD43B">Client feedback</span>' +
        '<p style="margin:0;font-weight:600;font-size:clamp(24px,2.8vw,36px);line-height:1.25;letter-spacing:-0.03em;color:#fff">“' + esc(p.quote) + '”</p>' +
        '<span>' + esc(p.quoteBy) + '</span></div>' +
      '</section>' +
      '<div class="reveal" style="display:flex;flex-wrap:wrap;justify-content:space-between;align-items:center;gap:16px;padding:40px 4px 8px">' +
        '<a class="link-arrow" href="work.html">← Back to all work</a>' +
        '<a class="btn btn-dark" href="case-study.html?p=' + encodeURIComponent(nxt.id) + '">Next: ' + esc(nxt.title) + ' →</a>' +
      '</div>';
    observeReveals(caseRoot);
  }

  /* ---------- Toggle buttons (quote form) ---------- */
  $$('[data-toggle-group]').forEach(function (group) {
    var single = group.hasAttribute('data-single');
    var hidden = $('input[type="hidden"]', group);
    var btns = $$('.toggle', group);
    function sync() {
      if (hidden) hidden.value = btns.filter(function (b) { return b.getAttribute('aria-pressed') === 'true'; }).map(function (b) { return b.textContent.trim(); }).join(', ');
    }
    btns.forEach(function (b) {
      b.addEventListener('click', function () {
        if (single) btns.forEach(function (o) { o.setAttribute('aria-pressed', 'false'); });
        b.setAttribute('aria-pressed', single ? 'true' : (b.getAttribute('aria-pressed') === 'true' ? 'false' : 'true'));
        sync();
      });
    });
    sync();
  });

  /* ---------- Quote form ---------- */
  var form = $('#quote-form');
  function showThanks() {
    form.hidden = true;
    var thanks = $('#form-thanks');
    thanks.hidden = false;
    thanks.classList.add('pop');
    thanks.querySelector('h2').focus();
  }
  if (form && /[?&]sent=1/.test(location.search)) {
    // Came back from the form service after a successful send.
    showThanks();
    if (history.replaceState) history.replaceState(null, '', location.pathname);
  }
  if (form) {
    form.addEventListener('submit', function (e) {
      var errBox = $('#form-error');
      var name = form.elements.name.value.trim();
      var email = form.elements.email.value.trim();
      var problems = [];
      if (!name) problems.push('your name');
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) problems.push('a valid email');
      if (problems.length) {
        e.preventDefault();
        errBox.textContent = 'Please add ' + problems.join(' and ') + '.';
        (name ? form.elements.email : form.elements.name).focus();
        return;
      }
      errBox.textContent = '';
      if (!form.getAttribute('action')) {
        // No form service connected: just show the thank-you message.
        e.preventDefault();
        showThanks();
        return;
      }
      // Sending to the form service: show progress, then the browser goes there
      // and comes back to quote.html?sent=1.
      var btn = $('button[type="submit"]', form);
      if (btn) { btn.disabled = true; btn.textContent = 'Sending…'; }
    });
    window.addEventListener('pageshow', function () {
      var btn = $('button[type="submit"]', form);
      if (btn) { btn.disabled = false; btn.textContent = 'Send my request'; }
    });
    var again = $('#send-another');
    if (again) again.addEventListener('click', function () {
      form.reset();
      form.hidden = false;
      $('#form-thanks').hidden = true;
      $('#form-error').textContent = '';
    });
  }

  /* ---------- Footer year ---------- */
  $$('[data-year]').forEach(function (el) { el.textContent = new Date().getFullYear(); });
})();
