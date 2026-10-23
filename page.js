/* ===== MyT Studio — سلوك الصفحات الداخلية ===== */
(function () {
  var html = document.documentElement;
  html.classList.add('js');

  /* شريط تقدّم القراءة */
  var bar = document.createElement('div');
  bar.id = 'pgbar';
  var fill = document.createElement('i');
  bar.appendChild(fill);
  document.body.appendChild(bar);

  /* زر للأعلى */
  var top = document.createElement('button');
  top.id = 'toTop';
  top.type = 'button';
  top.setAttribute('aria-label', 'العودة إلى الأعلى');
  top.textContent = '↑';
  document.body.appendChild(top);
  top.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  function onScroll() {
    var h = document.documentElement.scrollHeight - window.innerHeight;
    var p = h > 0 ? window.scrollY / h : 0;
    fill.style.width = (p * 100).toFixed(1) + '%';
    top.classList.toggle('show', window.scrollY > 420);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ظهور تدريجي */
  var targets = document.querySelectorAll('header.pg, h2, .card, .priv, figure.shot, .shot, .facts, footer');
  [].forEach.call(targets, function (el, i) {
    el.classList.add('rv');
    el.style.transitionDelay = Math.min(i * 45, 260) + 'ms';
  });
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
    targets.forEach(function (el) { io.observe(el); });
  } else {
    [].forEach.call(targets, function (el) { el.classList.add('in'); });
  }

  /* ضوء يتبع المؤشر داخل البطاقات */
  if (window.matchMedia('(hover:hover) and (pointer:fine)').matches) {
    document.querySelectorAll('.card').forEach(function (c) {
      c.addEventListener('mousemove', function (ev) {
        var r = c.getBoundingClientRect();
        c.style.setProperty('--mx', (ev.clientX - r.left) + 'px');
        c.style.setProperty('--my', (ev.clientY - r.top) + 'px');
      });
    });
  }
})();
