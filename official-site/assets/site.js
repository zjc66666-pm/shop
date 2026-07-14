(function () {
  function q(selector, root) { return (root || document).querySelector(selector); }
  function qa(selector, root) { return Array.prototype.slice.call((root || document).querySelectorAll(selector)); }
  function esc(value) { return String(value || '').replace(/[&<>"']/g, function (char) { return ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char]; }); }

  function initNavigation() {
    var toggle = q('[data-nav-toggle]');
    var nav = q('[data-site-nav]');
    if (!toggle || !nav) return;
    toggle.addEventListener('click', function () {
      var open = nav.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', String(open));
    });
    qa('a', nav).forEach(function (link) { link.addEventListener('click', function () { nav.classList.remove('is-open'); toggle.setAttribute('aria-expanded', 'false'); }); });
  }

  function initAuthLinks() {
    var configuredBase = String(window.BESTSHOPIO_AUTH_BASE_URL || '').trim();
    var isLocal = location.hostname === '127.0.0.1' || location.hostname === 'localhost';
    var base = configuredBase || (isLocal ? 'http://127.0.0.1:10829/account/' : 'https://zjc66666-pm.github.io/bestshopio-prototypes/account/');
    base = base.replace(/\/+$/, '') + '/';
    qa('[data-auth-path]').forEach(function (link) {
      link.href = base + link.getAttribute('data-auth-path');
    });
  }

  function initReveal() {
    var nodes = qa('[data-reveal]');
    if (!nodes.length) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) { nodes.forEach(function (node) { node.classList.add('is-visible'); }); return; }
    var observer = new IntersectionObserver(function (entries) { entries.forEach(function (entry) { if (entry.isIntersecting) { entry.target.classList.add('is-visible'); observer.unobserve(entry.target); } }); }, { threshold: 0.14 });
    nodes.forEach(function (node) { observer.observe(node); });
  }

  function initNetwork() {
    var canvas = q('#hero-network');
    if (!canvas) return;
    var ctx = canvas.getContext('2d');
    var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var points = [];
    var animation;
    function reset() {
      var rect = canvas.getBoundingClientRect();
      var pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.max(1, Math.floor(rect.width * pixelRatio));
      canvas.height = Math.max(1, Math.floor(rect.height * pixelRatio));
      ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
      var count = Math.max(22, Math.min(54, Math.round(rect.width / 26)));
      points = Array.from({ length: count }, function (_, index) {
        return { x: Math.random() * rect.width, y: Math.random() * rect.height, vx: (Math.random() - .5) * .11, vy: (Math.random() - .5) * .11, r: index % 7 === 0 ? 2.3 : 1.35, tone: index % 9 === 0 ? '#d8ff67' : '#8cc8d0' };
      });
    }
    function draw() {
      var width = canvas.clientWidth;
      var height = canvas.clientHeight;
      ctx.clearRect(0, 0, width, height);
      ctx.strokeStyle = 'rgba(175, 224, 221, .16)';
      ctx.lineWidth = 1;
      for (var i = 0; i < points.length; i++) {
        for (var j = i + 1; j < points.length; j++) {
          var dx = points[i].x - points[j].x;
          var dy = points[i].y - points[j].y;
          var distance = Math.sqrt(dx * dx + dy * dy);
          if (distance < 145) { ctx.globalAlpha = 1 - distance / 145; ctx.beginPath(); ctx.moveTo(points[i].x, points[i].y); ctx.lineTo(points[j].x, points[j].y); ctx.stroke(); }
        }
      }
      ctx.globalAlpha = 1;
      points.forEach(function (point) { ctx.fillStyle = point.tone; ctx.beginPath(); ctx.arc(point.x, point.y, point.r, 0, Math.PI * 2); ctx.fill(); });
      if (!reduced) {
        points.forEach(function (point) { point.x += point.vx; point.y += point.vy; if (point.x < 0 || point.x > width) point.vx *= -1; if (point.y < 0 || point.y > height) point.vy *= -1; });
        animation = requestAnimationFrame(draw);
      }
    }
    reset(); draw();
    window.addEventListener('resize', function () { cancelAnimationFrame(animation); reset(); draw(); }, { passive: true });
  }

  function initHelp() {
    var data = window.HELP_CONTENT;
    var root = q('[data-help-root]');
    if (!data || !root) return;
    var defaultView = q('[data-help-default]', root);
    var route = q('[data-help-route]', root);
    var categoryHost = q('[data-help-categories]', root);
    var popularHost = q('[data-help-popular]', root);
    var form = q('[data-help-search]');
    var query = q('#help-query');
    var allArticles = data.articles || [];
    var categories = data.categories || [];
    function articlesFor(category) { return allArticles.filter(function (article) { return article.category === category; }); }
    function articleLink(article) { return '<a class="help-article-row" href="#/article/' + esc(article.slug) + '"><span><strong>' + esc(article.title) + '</strong><small>' + esc(article.excerpt) + '</small></span><b>' + esc(article.readTime) + '</b><i aria-hidden="true">&#8594;</i></a>'; }
    function renderCategoryCards() {
      if (!categoryHost) return;
      categoryHost.innerHTML = categories.map(function (category) { return '<a class="help-category help-category-' + esc(category.tone) + '" href="#/category/' + esc(category.slug) + '"><span class="help-category-index">0' + (categories.indexOf(category) + 1) + '</span><strong>' + esc(category.title) + '</strong><small>' + esc(category.description) + '</small><b>' + esc(category.count) + ' guides <i aria-hidden="true">&#8594;</i></b></a>'; }).join('');
    }
    function renderPopular() { if (popularHost) popularHost.innerHTML = allArticles.slice(0, 4).map(articleLink).join(''); }
    function showDefault() { defaultView.hidden = false; route.innerHTML = ''; }
    function showCategory(slug) {
      var category = categories.filter(function (item) { return item.slug === slug; })[0];
      if (!category) { showDefault(); return; }
      defaultView.hidden = true;
      route.innerHTML = '<a class="help-back" href="#/home">&#8592; All topics</a><div class="help-route-head"><p class="eyebrow">' + esc(category.title) + '</p><h1>' + esc(category.title) + '</h1><p>' + esc(category.description) + '</p></div><div class="help-article-list help-route-list">' + articlesFor(slug).map(articleLink).join('') + '</div>';
    }
    function showArticle(slug) {
      var article = allArticles.filter(function (item) { return item.slug === slug; })[0];
      if (!article) { showDefault(); return; }
      var category = categories.filter(function (item) { return item.slug === article.category; })[0];
      var related = articlesFor(article.category).filter(function (item) { return item.slug !== article.slug; }).slice(0, 2);
      defaultView.hidden = true;
      route.innerHTML = '<a class="help-back" href="#/category/' + esc(article.category) + '">&#8592; ' + esc(category ? category.title : 'All topics') + '</a><article class="help-article"><header><p class="eyebrow">' + esc(category ? category.title : 'Guide') + '</p><h1>' + esc(article.title) + '</h1><p>' + esc(article.excerpt) + '</p><div class="article-meta"><span>' + esc(article.readTime) + '</span><span>' + esc(article.updatedAt) + '</span></div></header><div class="article-copy">' + article.content + '</div><footer class="article-feedback"><span>Was this guide useful?</span><button type="button" data-feedback="yes">Yes</button><button type="button" data-feedback="no">Not yet</button></footer></article><section class="related-guides"><p class="eyebrow">Keep going</p><h2>Related guides</h2><div class="help-article-list">' + related.map(articleLink).join('') + '</div></section>';
      qa('[data-feedback]', route).forEach(function (button) { button.addEventListener('click', function () { button.parentNode.innerHTML = '<strong>Thanks. Your feedback helps us improve this guide.</strong>'; }); });
    }
    function showSearch(value) {
      var term = String(value || '').trim().toLowerCase();
      if (!term) { showDefault(); return; }
      var results = allArticles.filter(function (article) { return [article.title, article.excerpt, article.category].join(' ').toLowerCase().indexOf(term) !== -1; });
      defaultView.hidden = true;
      route.innerHTML = '<a class="help-back" href="#/home">&#8592; All topics</a><div class="help-route-head"><p class="eyebrow">Search</p><h1>Results for &ldquo;' + esc(value) + '&rdquo;</h1><p>' + (results.length ? results.length + ' guides match your search.' : 'No exact match yet. Try a broader task or browse a topic below.') + '</p></div><div class="help-article-list help-route-list">' + (results.length ? results.map(articleLink).join('') : categories.map(function (category) { return '<a class="help-category compact help-category-' + esc(category.tone) + '" href="#/category/' + esc(category.slug) + '"><strong>' + esc(category.title) + '</strong><i aria-hidden="true">&#8594;</i></a>'; }).join('')) + '</div>';
    }
    function routeChange() {
      var hash = location.hash.replace(/^#\/?/, '');
      var parts = hash.split('/').filter(Boolean);
      if (!parts.length || parts[0] === 'home') { showDefault(); return; }
      if (parts[0] === 'category') { showCategory(parts[1]); return; }
      if (parts[0] === 'article') { showArticle(parts[1]); return; }
      if (parts[0] === 'search') { showSearch(decodeURIComponent(parts.slice(1).join(' '))); return; }
      showDefault();
    }
    renderCategoryCards(); renderPopular(); routeChange();
    window.addEventListener('hashchange', routeChange);
    if (form) form.addEventListener('submit', function (event) { event.preventDefault(); showSearch(query.value); });
  }

  document.addEventListener('DOMContentLoaded', function () { initNavigation(); initAuthLinks(); initReveal(); initNetwork(); initHelp(); });
})();
