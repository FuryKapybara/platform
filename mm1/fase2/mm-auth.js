/* ============================================================
   MM-AUTH.JS — «Мудромашина» auth (DEV-2510-07, Фаза 3): кнопки провайдеров.
   Вставляет «Войти с Яндекс ID» / «Войти со Сбер ID» в РОДНОЙ пустой grid
   соц-логина панели (div.grid[style*=repeat(2, 1fr)], пустой — бандл его
   рендерит под кнопкой «Вход», но не наполняет без OAuth-конфига).
   HTML-only заглушки (Фаза 4 = реальные OAuth-эндпоинты, ждёт решений владельца).
   Загружается в ОБОИХ HTML (login/index — один SPA-шаблон), поэтому:
   — работает ТОЛЬКО при наличии div.backd (auth-экран), в воркбенче молчит;
   — idempotent (data-mm-providers), выживает перерисовки через MutationObserver.
   ============================================================ */
;(function () {
  if (window.__mmAuthProviders) return
  window.__mmAuthProviders = true

  var SVG_YA =
    '<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">' +
    '<circle cx="12" cy="12" r="12" fill="#FC3F1D"/>' +
    '<path d="M13.7 19h2.5V5h-3.4C10 5 8.2 6.9 8.2 9.4c0 2.2 1.2 3.6 3 4.1L8 19h2.7l2.9-5.8h-1.2c-1.6 0-2.6-.8-2.6-2.4 0-1.6 1-2.6 2.7-2.6h1.2V19z" fill="#fff"/>' +
    '</svg>'
  var SVG_SBER =
    '<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">' +
    '<defs><linearGradient id="mmSberG" x1="0" y1="1" x2="1" y2="0">' +
    '<stop offset="0" stop-color="#0F5C30"/><stop offset=".5" stop-color="#21A038"/><stop offset="1" stop-color="#8FE08A"/>' +
    '</linearGradient></defs>' +
    '<circle cx="12" cy="12" r="12" fill="url(#mmSberG)"/>' +
    '<path d="M12 5.4a6.6 6.6 0 1 0 6.3 8.6" fill="none" stroke="#fff" stroke-width="2.1" stroke-linecap="round"/>' +
    '<path d="M18.6 6.2v4.4h-4.4z" fill="#fff"/>' +
    '</svg>'

  function mkButton(label, svg) {
    var b = document.createElement('button')
    b.type = 'button'
    b.className = 'antiButton default mm-provider'
    b.innerHTML = '<span class="mm-p-ico">' + svg + '</span><span>' + label + '</span>'
    // HTML-only заглушка: никаких действий до Фазы 4 (OAuth)
    b.addEventListener('click', function (e) { e.preventDefault(); e.stopPropagation() })
    return b
  }

  function inject() {
    var backd = document.querySelector('div.backd')
    if (!backd) return false
    var panel = backd.querySelector('.panel-base.panel') || backd.querySelector('.panel-base')
    if (!panel) return false
    var grids = panel.querySelectorAll('div.grid')
    var grid = null
    for (var i = 0; i < grids.length; i++) {
      var g = grids[i]
      var st = g.getAttribute('style') || ''
      if (g.children.length === 0 && /repeat\(\s*2/.test(st)) { grid = g; break }
    }
    if (!grid) return panel.hasAttribute('data-mm-no-grid') ? true : false
    if (grid.getAttribute('data-mm-providers')) return true
    grid.setAttribute('data-mm-providers', '1')
    grid.appendChild(mkButton('Войти с Яндекс ID', SVG_YA))
    grid.appendChild(mkButton('Войти со Сбер ID', SVG_SBER))
    return true
  }

  // Панель рендерится асинхронно (SPA) — наблюдаем до успеха; после успеха
  // продолжаем дешёвый контроль (перерисовка вкладки может пересоздать grid).
  function start() {
    if (inject()) return
    var mo = new MutationObserver(function () { inject() })
    mo.observe(document.body, { childList: true, subtree: true })
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start)
  else start()
})()
