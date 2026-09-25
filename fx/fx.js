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
