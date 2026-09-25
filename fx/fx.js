/* Cinematic extras ("fx"). Optional by design: every page loads this from its <!-- fx:start --> … <!-- fx:end --> block,
   so deleting those blocks and this folder (or `git revert` of the fx commit) puts the site back exactly as it was. */
(function () {
  var W = window, D = document, H = D.documentElement;
  var reduce = W.matchMedia && W.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // 404: with reduced motion, jump the crash scene straight to its last frame
  var crash = D.querySelector('.fx-crash');
  if (reduce) {
    if (crash && crash.pauseAnimations) { crash.pauseAnimations(); crash.setCurrentTime(10); }
    return;
  }

  // section headings: ink-bleed in once they reach the upper ~70% of the screen, so the effect is actually seen
  if (W.IntersectionObserver) {
    H.classList.add('fx-js');
    var hio = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('fx-in'); hio.unobserve(e.target); } });
    }, { rootMargin: '0px 0px -28% 0px' });
    Array.prototype.forEach.call(D.querySelectorAll('.rv h2, .l-sec > h2'), function (h) { hio.observe(h); });
  }

  // TALL page: big T A L L tiles drop in and spell the word, then each flies into its card's corner badge
  var tsec = /tall-stack-developer/.test(W.location.pathname) ? D.querySelector('main>section') : null;
  var tcards = tsec ? tsec.querySelectorAll('.dec>div') : [];
  if (tcards.length === 4 && W.IntersectionObserver && tsec.animate) {
    tsec.classList.add('fx-tall-wait');
    var tio = new IntersectionObserver(function (es) {
      if (!es[0].isIntersecting) return;
      tio.disconnect();
      tallTiles();
    }, { rootMargin: '0px 0px -35% 0px' });
    tio.observe(tsec.querySelector('.dec'));
  }
  function tallTiles() {
    if (W.getComputedStyle(tsec).position === 'static') tsec.style.position = 'relative';
    var TILES = [['T', '#38BDF8', '#0b2530'], ['A', '#77C1D2', '#0f2a30'], ['L', '#FF2D20', '#fff'], ['L', '#FB70A9', '#fff']];
    var sr = tsec.getBoundingClientRect(), gr = tsec.querySelector('.dec').getBoundingClientRect();
    var small = W.innerWidth < 700, size = small ? 58 : 84, gap = small ? 10 : 16, rowW = size * 4 + gap * 3;
    var x0 = gr.left - sr.left + (gr.width - rowW) / 2, y0 = gr.top - sr.top + Math.min(gr.height, 300) / 2 - size / 2;
    var DROP = 750, STEP = 160, HOLD = 650;
    TILES.forEach(function (c, i) {
      var t = D.createElement('span'), card = tcards[i];
      t.className = 'fx-tile'; t.setAttribute('aria-hidden', 'true'); t.textContent = c[0];
      t.style.cssText = 'left:' + (x0 + i * (size + gap)) + 'px;top:' + y0 + 'px;width:' + size + 'px;height:' + size + 'px;background:' + c[1] + ';color:' + c[2] + ';font-size:' + Math.round(size * 0.62) + 'px';
      tsec.appendChild(t);
      t.animate([
        { transform: 'translateY(-' + Math.round(W.innerHeight * 0.7) + 'px) rotate(' + (i % 2 ? 20 : -20) + 'deg)', opacity: 0 },
        { transform: 'translateY(10px) rotate(' + (i % 2 ? -4 : 4) + 'deg)', opacity: 1, offset: 0.6 },
        { transform: 'translateY(-6px) rotate(0deg)', offset: 0.8 },
        { transform: 'none', opacity: 1 }
      ], { duration: DROP, delay: i * STEP, easing: 'cubic-bezier(.3,.7,.4,1)', fill: 'backwards' });
      setTimeout(function () {
        // badge sits at right:14px, top:14px, 40px square inside the card
        var cr = card.getBoundingClientRect(), tr = t.getBoundingClientRect();
        var fly = t.animate([{ transform: 'none' }, { transform: 'translate(' + (cr.right - 54 - tr.left) + 'px,' + (cr.top + 14 - tr.top) + 'px) scale(' + 40 / size + ')' }],
          { duration: 650, easing: 'cubic-bezier(.65,0,.3,1)', fill: 'forwards' });
        fly.onfinish = function () { card.classList.add('fx-got'); t.remove(); };
      }, 3 * STEP + DROP + HOLD + i * 110);
    });
  }

  // magnetic buttons: .btn leans a few px toward the cursor, springs back on leave (mouse / trackpad only)
  if (W.matchMedia('(pointer: fine)').matches) {
    var cur = null;
    var release = function (b) {
      var from = b.style.translate;
      b.style.translate = '';
      if (from && b.animate) b.animate([{ translate: from }, { translate: '0px 0px' }], { duration: 520, easing: 'cubic-bezier(.3,1.7,.5,1)' });
    };
    D.addEventListener('pointermove', function (e) {
      var b = e.target && e.target.closest ? e.target.closest('.btn') : null;
      if (b !== cur) { if (cur) release(cur); cur = b; }
      if (!b || b.disabled) return;
      var r = b.getBoundingClientRect();
      var x = Math.max(-9, Math.min(9, (e.clientX - (r.left + r.width / 2)) * 0.22));
      var y = Math.max(-6, Math.min(6, (e.clientY - (r.top + r.height / 2)) * 0.35));
      b.style.translate = x.toFixed(1) + 'px ' + y.toFixed(1) + 'px';
    }, { passive: true });
    D.addEventListener('pointerleave', function () { if (cur) { release(cur); cur = null; } });
  }

  // ink blob under the active tab: stretches across both tabs, then gathers on the new one
  function blob(nav, sel) {
    if (!nav) return;
    if (W.getComputedStyle(nav).position === 'static') nav.style.position = 'relative';
    var b = D.createElement('span'), last = null, t = 0, queued = false;
    b.className = 'fx-blob'; b.setAttribute('aria-hidden', 'true');
    nav.insertBefore(b, nav.firstChild);
    function place(el, x, w) { b.style.left = x + 'px'; b.style.width = w + 'px'; b.style.top = el.offsetTop + 'px'; b.style.height = el.offsetHeight + 'px'; }
    function sync(instant) {
      var on = nav.querySelector(sel + '.on');
      if (!instant && on && on === last) return; // the page re-toggles .on every frame; skip layout reads when nothing moved
      if (!on || !on.offsetWidth) { if (nav.classList.contains('fx-live')) nav.classList.remove('fx-live'); last = null; return; }
      if (!nav.classList.contains('fx-live')) nav.classList.add('fx-live');
      if (instant || !last) { b.style.transition = 'none'; place(on, on.offsetLeft, on.offsetWidth); requestAnimationFrame(function () { b.style.transition = ''; }); last = on; return; }
      if (on === last) return;
      var x0 = Math.min(last.offsetLeft, on.offsetLeft), x1 = Math.max(last.offsetLeft + last.offsetWidth, on.offsetLeft + on.offsetWidth);
      place(on, x0, x1 - x0);
      clearTimeout(t);
      t = setTimeout(function () { place(on, on.offsetLeft, on.offsetWidth); }, 190);
      last = on;
    }
    // only class changes on the tabs themselves; the nav's own fx-live toggle must not re-trigger this
    new MutationObserver(function (recs) { if (!queued && recs.some(function (r) { return r.target !== nav; })) { queued = true; requestAnimationFrame(function () { queued = false; sync(false); }); } }).observe(nav, { subtree: true, attributes: true, attributeFilter: ['class'] });
    if (W.ResizeObserver) new ResizeObserver(function () { sync(true); }).observe(nav); // also runs the first sync
    else sync(true);
  }
  // purely decorative, so it waits until the page has loaded and the main thread is idle
  function blobs() { blob(D.querySelector('.tabs'), 'button'); blob(D.querySelector('.lnav'), 'a'); }
  function idle() { if (W.requestIdleCallback) W.requestIdleCallback(blobs, { timeout: 4000 }); else setTimeout(blobs, 1500); }
  if (D.readyState === 'complete') idle(); else W.addEventListener('load', idle);

  // night mode: the new theme spreads out from the switch like a desk lamp coming on
  var dk = D.querySelector('.dk');
  if (dk && D.startViewTransition) {
    dk.addEventListener('click', function (e) {
      if (dk._fx) return;
      e.stopImmediatePropagation();
      var r = dk.getBoundingClientRect(), x = r.left + r.width / 2, y = r.top + r.height / 2;
      H.style.setProperty('--fx-x', x + 'px');
      H.style.setProperty('--fx-y', y + 'px');
      H.style.setProperty('--fx-r', Math.hypot(Math.max(x, W.innerWidth - x), Math.max(y, W.innerHeight - y)) + 'px');
      H.classList.add('fx-theme');
      function toggle() { dk._fx = true; dk.click(); dk._fx = false; }
      function done() { H.classList.remove('fx-theme'); }
      try { D.startViewTransition(toggle).finished.then(done, done); } catch (x2) { done(); toggle(); }
    }, true);
  }
})();
