const mockData = {
  products: [
    { id: "p20", name: "Pipeta 20kg", price: 620, copy: "Ideal para hogar pequeño" },
    { id: "p30", name: "Pipeta 30kg", price: 890, copy: "Mayor capacidad para casa familiar" },
  ],
  addresses: [
    "Av. Presidente Masaryk 111, Polanco, CDMX",
    "Av. Amsterdam 75, Condesa, CDMX",
  ],
  deliveryAgent: {
    name: "Julio Ramírez",
    vehiclePlate: "CDMX-482-A",
    vehicleType: "Moto de reparto",
    rating: 4.8,
    trips: 342,
  },
  route: [
    [19.4260, -99.1760], [19.4268, -99.1752], [19.4275, -99.1743],
    [19.4283, -99.1735], [19.4290, -99.1728], [19.4298, -99.1720],
    [19.4305, -99.1713], [19.4312, -99.1705], [19.4320, -99.1698],
    [19.4328, -99.1690], [19.4335, -99.1683], [19.4340, -99.1678],
    [19.4348, -99.1672], [19.4355, -99.1665], [19.4360, -99.1660],
  ],
  dest: [19.4360, -99.1660],
  orders: [
    { id: "#4820", product: "Pipeta 30kg", date: "18 abr 2026", status: "Entregado", price: 890, time: "32 min", agent: "Julio Ramírez", plate: "CDMX-482-A", pay: "Tarjeta ****4521", address: "Av. Presidente Masaryk 111, Polanco" },
    { id: "#4815", product: "Pipeta 20kg", date: "10 abr 2026", status: "Entregado", price: 620, time: "28 min", agent: "Carlos Méndez", plate: "CDMX-319-B", pay: "OXXO Pay", address: "Av. Presidente Masaryk 111, Polanco" },
    { id: "#4801", product: "Pipeta 30kg", date: "28 mar 2026", status: "Entregado", price: 890, time: "41 min", agent: "Julio Ramírez", plate: "CDMX-482-A", pay: "SPEI", address: "Av. Amsterdam 75, Condesa" },
    { id: "#4790", product: "Pipeta 20kg", date: "15 mar 2026", status: "Entregado", price: 620, time: "25 min", agent: "Ana López", plate: "CDMX-155-C", pay: "Tarjeta ****4521", address: "Av. Presidente Masaryk 111, Polanco" },
  ],
  user: {
    name: "María González",
    email: "maria.gonzalez@email.com",
    phone: "+52 55 1234 5678",
    address: "Av. Presidente Masaryk 111, Polanco, CDMX",
    since: "Marzo 2026",
    orders: 4,
  },
};

const state = {
  screen: "login",
  authView: "login",
  activeTab: "home",
  selectedProductId: "p20",
  cart: { p20: 0, p30: 0 },
  coupon: "",
  couponApplied: false,
  rating: 0,
  subscriptionEnabled: false,
  address: mockData.addresses[0],
  paymentMethod: "card",
  statusIndex: 0,
  trackingTimer: null,
  routeIdx: 0,
};

const steps = [
  { label: "Preparando pedido", icon: "📦" },
  { label: "En camino", icon: "🚚" },
  { label: "Llegando", icon: "📍" },
];
const app = document.getElementById("app");
let map = null, agentMarker = null;

const mxn = (n) => new Intl.NumberFormat("es-MX", { style: "currency", currency: "MXN" }).format(n);
function prod() { return mockData.products.find((p) => p.id === state.selectedProductId); }
function cartTotal() {
  let t = 0;
  mockData.products.forEach((p) => { t += (state.cart[p.id] || 0) * p.price; });
  return t;
}
function cartCount() { return Object.values(state.cart).reduce((a, b) => a + b, 0); }
function cartDiscount() { return state.couponApplied ? Math.round(cartTotal() * 0.1) : 0; }
function clearTimer() { if (state.trackingTimer) { clearInterval(state.trackingTimer); state.trackingTimer = null; } }
function destroyMap() { if (map) { map.remove(); map = null; agentMarker = null; } }

// --- SCREENS ---

function renderLogin() {
  const isRegister = state.authView === "register";
  const header = document.querySelector(".app-header");
  const nav = document.getElementById("bottomNav") || document.querySelector(".bottom-nav");
  if (header) header.style.display = "none";
  if (nav) nav.style.display = "none";

  app.innerHTML = `
    <section class="auth-screen">
      <div class="auth-brand">
        <img src="./assets/Logo.png" alt="Corpoilgas" class="auth-logo" /><br>
        <img src="./assets/images.jpeg" alt="Mascota" class="auth-mascot" />
      </div>

      <h2>${isRegister ? "Crear cuenta" : "Iniciar sesión"}</h2>
      <p class="screen-subtitle">${isRegister ? "Regístrate para pedir gas a domicilio" : "Bienvenido de vuelta"}</p>

      <div class="auth-form">
        ${isRegister ? '<input class="input" placeholder="Nombre completo" />' : ""}
        <input class="input" placeholder="Correo electrónico" type="email" />
        ${isRegister ? '<input class="input" placeholder="Teléfono" type="tel" />' : ""}
        <input class="input" placeholder="Contraseña" type="password" />
        <button class="btn btn-primary" data-action="do-login">${isRegister ? "Registrarme" : "Entrar"}</button>
      </div>

      <div class="auth-divider"><span>o continúa con</span></div>

      <div class="social-buttons">
        <button class="btn-social" data-action="do-login">
          <span>G</span> Google
        </button>
        <button class="btn-social" data-action="do-login">
          <span>f</span> Facebook
        </button>
      </div>

      <p class="auth-switch">
        ${isRegister
          ? '¿Ya tienes cuenta? <a data-action="go-login">Inicia sesión</a>'
          : '¿No tienes cuenta? <a data-action="go-register">Regístrate</a>'}
      </p>
    </section>`;
}

function renderSelection() {
  const header = document.querySelector(".app-header");
  const nav = document.getElementById("bottomNav") || document.querySelector(".bottom-nav");
  if (header) header.style.display = "";
  if (nav) nav.style.display = "";

  const options = mockData.products.map((p) => `
    <article class="card product-row">
      <div class="product-row-info">
        <h3 class="option-title">${p.name}</h3>
        <p class="option-copy">${p.copy}</p>
        <span class="price">${mxn(p.price)}</span>
      </div>
      <div class="qty-control">
        <button class="qty-btn" data-action="cart-minus" data-id="${p.id}">−</button>
        <span class="qty-value">${state.cart[p.id] || 0}</span>
        <button class="qty-btn" data-action="cart-plus" data-id="${p.id}">+</button>
      </div>
    </article>`).join("");

  const count = cartCount();
  const total = cartTotal();

  app.innerHTML = `
    <section>
      <div class="home-hero">
        <img src="./assets/images.jpeg" alt="Mascota Corpoilgas" class="mascot" />
        <div>
          <h2>Recibe tu pipeta<br>en minutos</h2>
          <p>Entrega segura a domicilio</p>
        </div>
      </div>
      <div class="eta-badge">🕐 Entrega estimada: 20–35 min</div>
      <h2 class="screen-title">Pide tu gas</h2>
      <p class="screen-subtitle">Selecciona cantidad y confirma tu entrega.</p>
      ${options}
      <div class="subscription">
        <div>
          <strong>Suscripción mensual</strong>
          <p class="option-copy">Recibe gas automático cada 30 días.</p>
        </div>
        <button data-action="toggle-subscription">${state.subscriptionEnabled ? "✓ Activa" : "Activar"}</button>
      </div>
      <div style="height: 12px"></div>
      ${count > 0 ? `
        <div class="cart-summary">
          <span>🛒 ${count} producto${count > 1 ? "s" : ""}</span>
          <span class="price">${mxn(total)}</span>
        </div>
        <button class="btn btn-primary" data-action="go-checkout">Ir al checkout · ${mxn(total)}</button>
      ` : `<button class="btn btn-primary" disabled style="opacity:.4">Agrega productos al carrito</button>`}
    </section>`;
}

function renderCheckout() {
  const total = cartTotal();
  const disc = cartDiscount();
  const items = mockData.products.filter((p) => state.cart[p.id] > 0);

  app.innerHTML = `
    <section>
      <h2 class="screen-title">Checkout</h2>
      <p class="screen-subtitle">Revisa tu pedido antes de pagar.</p>

      <div class="card">
        <strong>Tu carrito</strong>
        ${items.map((p) => `
          <div class="checkout-line">
            <span>${state.cart[p.id]}× ${p.name}</span>
            <span>${mxn(p.price * state.cart[p.id])}</span>
          </div>`).join("")}
      </div>

      <div class="coupon-row">
        <input class="input coupon-input" id="couponInput" placeholder="Código de cupón" value="${state.coupon}" />
        <button class="btn-coupon" data-action="apply-coupon">${state.couponApplied ? "✓" : "Aplicar"}</button>
      </div>
      ${state.couponApplied ? '<p class="coupon-msg">🎉 Cupón GASYA10 aplicado · -10%</p>' : ""}

      <label>Dirección</label>
      <input class="input" id="addressInput" value="${state.address}" />

      <label>Método de pago</label>
      <div class="pay-methods">
        <label class="pay-method ${state.paymentMethod === "card" ? "active" : ""}">
          <input type="radio" name="pay" value="card" ${state.paymentMethod === "card" ? "checked" : ""} />
          <span class="pay-icon">💳</span><span>Tarjeta</span>
        </label>
        <label class="pay-method ${state.paymentMethod === "oxxo" ? "active" : ""}">
          <input type="radio" name="pay" value="oxxo" ${state.paymentMethod === "oxxo" ? "checked" : ""} />
          <span class="pay-icon">🏪</span><span>OXXO Pay</span>
        </label>
        <label class="pay-method ${state.paymentMethod === "spei" ? "active" : ""}">
          <input type="radio" name="pay" value="spei" ${state.paymentMethod === "spei" ? "checked" : ""} />
          <span class="pay-icon">🏦</span><span>SPEI</span>
        </label>
      </div>

      <div class="pay-summary">
        <div class="pay-summary-row"><span>Subtotal</span><span>${mxn(total)}</span></div>
        ${disc > 0 ? `<div class="pay-summary-row"><span>Cupón -10%</span><span class="free-tag">-${mxn(disc)}</span></div>` : ""}
        <div class="pay-summary-row"><span>Envío</span><span class="free-tag">Gratis</span></div>
        <div class="pay-summary-row total"><span>Total</span><span>${mxn(total - disc)}</span></div>
      </div>

      <button class="btn btn-primary" data-action="go-payment">Ir a pagar · ${mxn(total - disc)}</button>
      <div style="height: 8px"></div>
      <button class="btn btn-secondary" data-action="back-selection">Volver</button>
    </section>`;
}

function renderPayment() {
  const total = cartTotal() - cartDiscount();
  const items = mockData.products.filter((p) => state.cart[p.id] > 0);
  const method = state.paymentMethod;

  let formHtml = "";
  if (method === "card") {
    formHtml = `
      <div class="pay-form">
        <div class="pay-form-header">💳 Pago con tarjeta</div>
        <label>Número de tarjeta</label>
        <input class="input" placeholder="4242 4242 4242 4242" maxlength="19" />
        <div class="input-row">
          <div class="input-half"><label>Vencimiento</label><input class="input" placeholder="MM/AA" maxlength="5" /></div>
          <div class="input-half"><label>CVV</label><input class="input" placeholder="123" maxlength="4" type="password" /></div>
        </div>
        <label>Nombre en la tarjeta</label>
        <input class="input" placeholder="Como aparece en la tarjeta" />
      </div>`;
  } else if (method === "oxxo") {
    formHtml = `
      <div class="pay-form">
        <div class="pay-form-header">🏪 OXXO Pay</div>
        <div class="pay-voucher">
          <p class="voucher-label">Referencia de pago</p>
          <div class="voucher-code">0836 4921 7750 2284</div>
          <div class="voucher-barcode">||||| |||| ||||| |||| ||||| ||||</div>
          <p class="voucher-instructions">Presenta esta referencia en cualquier OXXO.<br>Tienes <strong>24 horas</strong> para completar el pago.</p>
          <p class="voucher-amount">Monto: <strong>${mxn(total)}</strong></p>
        </div>
      </div>`;
  } else {
    formHtml = `
      <div class="pay-form">
        <div class="pay-form-header">🏦 Transferencia SPEI</div>
        <div class="pay-voucher">
          <p class="voucher-label">Datos para transferencia</p>
          <div class="spei-row"><span>Banco destino</span><strong>STP</strong></div>
          <div class="spei-row"><span>CLABE</span><strong>6461 8010 0712 3456 78</strong></div>
          <div class="spei-row"><span>Beneficiario</span><strong>Corpoilgas SA de CV</strong></div>
          <div class="spei-row"><span>Monto</span><strong>${mxn(total)}</strong></div>
          <p class="voucher-instructions">Realiza la transferencia desde tu banca en línea.</p>
        </div>
      </div>`;
  }

  app.innerHTML = `
    <section>
      <h2 class="screen-title">Pasarela de pago</h2>
      <p class="screen-subtitle">Completa tu pago de forma segura.</p>
      <div class="pay-summary">
        ${items.map((p) => `<div class="pay-summary-row"><span>${state.cart[p.id]}× ${p.name}</span><span>${mxn(p.price * state.cart[p.id])}</span></div>`).join("")}
        ${cartDiscount() > 0 ? `<div class="pay-summary-row"><span>Descuento</span><span class="free-tag">-${mxn(cartDiscount())}</span></div>` : ""}
        <div class="pay-summary-row"><span>Envío</span><span class="free-tag">Gratis</span></div>
        <div class="pay-summary-row total"><span>Total</span><span>${mxn(total)}</span></div>
      </div>
      ${formHtml}
      <div class="pay-secure">🔒 Pago seguro · Datos encriptados</div>
      <button class="btn btn-primary" data-action="confirm-payment">${method === "card" ? "Pagar " + mxn(total) : "Confirmar pedido"}</button>
      <div style="height: 8px"></div>
      <button class="btn btn-secondary" data-action="back-checkout">Cambiar método</button>
    </section>`;
}

function renderProcessing() {
  app.innerHTML = `
    <section class="processing-screen">
      <div class="spinner"></div>
      <h2>Procesando pago...</h2>
      <p class="screen-subtitle">No cierres esta ventana</p>
    </section>`;
  setTimeout(() => { state.screen = "confirmed"; render(); }, 2200);
}

function renderConfirmed() {
  const total = cartTotal() - cartDiscount();
  const items = mockData.products.filter((p) => state.cart[p.id] > 0);
  app.innerHTML = `
    <section class="confirmed-screen">
      <div class="confirmed-icon">🎉</div>
      <h2>¡Pedido confirmado!</h2>
      <p class="screen-subtitle">Tu pedido #4821 fue recibido</p>
      <div class="confirmed-card">
        ${items.map((p) => `<div class="confirmed-line"><span>${state.cart[p.id]}× ${p.name}</span><span>${mxn(p.price * state.cart[p.id])}</span></div>`).join("")}
        <div class="confirmed-line total"><span>Total pagado</span><span>${mxn(total)}</span></div>
      </div>
      <div class="confirmed-info">
        <div>📍 ${state.address}</div>
        <div>🕐 Entrega estimada: 20–35 min</div>
      </div>
      <button class="btn btn-primary" data-action="go-tracking">Seguir mi pedido</button>
    </section>`;
}

function renderTracking() {
  const eta = Math.max(2, 12 - state.statusIndex * 4);
  const progress = ((state.routeIdx / (mockData.route.length - 1)) * 100).toFixed(0);
  const agent = mockData.deliveryAgent;

  app.innerHTML = `
    <section class="tracking-screen">
      <div id="trackingMap" class="tracking-map"></div>
      <div class="tracking-sheet">
        <div class="tracking-header">
          <span class="tracking-eta">Llega en ~${eta} min</span>
          <span class="tracking-order-id">Pedido #4821</span>
        </div>
        <div class="progress-bar-container">
          <div class="progress-bar" style="width: ${progress}%"></div>
        </div>
        <div class="tracking-steps">
          ${steps.map((s, i) => `
            <div class="track-step ${i < state.statusIndex ? "done" : i === state.statusIndex ? "active" : ""}">
              <span class="step-icon">${s.icon}</span>
              <span>${s.label}</span>
            </div>`).join("")}
        </div>
        <div class="agent-card">
          <div class="agent-avatar">🚚</div>
          <div class="agent-info">
            <div class="agent-name">${agent.name}</div>
            <div class="agent-meta">${agent.vehicleType} · ${agent.vehiclePlate}</div>
            <div class="agent-meta">⭐ ${agent.rating} · ${agent.trips} entregas</div>
          </div>
          <button class="agent-call-btn">📞</button>
        </div>
        <button class="btn btn-secondary btn-sm" data-action="support">💬 ¿Necesitas ayuda?</button>
      </div>
    </section>`;
  initTrackingMap();
}

function renderSuccess() {
  const total = cartTotal() - cartDiscount();
  const agent = mockData.deliveryAgent;
  app.innerHTML = `
    <section class="success">
      <div style="font-size: 48px;">✅</div>
      <h2>¡Entrega confirmada!</h2>
      <p class="screen-subtitle">Tu pedido fue entregado con éxito</p>
      <p><strong>Total:</strong> ${mxn(total)}</p>

      <div class="rating-section">
        <p class="rating-label">¿Cómo fue tu experiencia con ${agent.name}?</p>
        <div class="stars">
          ${[1,2,3,4,5].map((n) => `<span class="star ${n <= state.rating ? "active" : ""}" data-action="rate" data-val="${n}">★</span>`).join("")}
        </div>
        ${state.rating > 0 ? `<p class="rating-thanks">¡Gracias por calificar con ${state.rating} estrella${state.rating > 1 ? "s" : ""}!</p>` : ""}
      </div>

      <button class="btn btn-primary" data-action="restart">Nuevo pedido</button>
    </section>`;
}

function renderOrders() {
  const header = document.querySelector(".app-header");
  const nav = document.getElementById("bottomNav");
  if (header) header.style.display = "";
  if (nav) nav.style.display = "";

  app.innerHTML = `
    <section>
      <h2 class="screen-title">Mis pedidos</h2>
      <p class="screen-subtitle">${mockData.orders.length} pedidos realizados</p>
      ${mockData.orders.map((o, idx) => `
        <div class="order-history-card">
          <div class="order-history-top">
            <span class="order-history-id">${o.id}</span>
            <div class="order-top-actions">
              <span class="order-history-status">${o.status}</span>
              <button class="order-info-btn" data-action="toggle-detail" data-idx="${idx}" title="Más información">ℹ️</button>
            </div>
          </div>
          <div class="order-history-body">
            <div>
              <div class="order-history-product">🔥 ${o.product}</div>
              <div class="order-history-date">${o.date}</div>
            </div>
            <div class="order-history-price">${mxn(o.price)}</div>
          </div>
          <div class="order-detail" id="detail-${idx}">
            <div class="detail-row"><span>⏱️ Tiempo de entrega</span><strong>${o.time}</strong></div>
            <div class="detail-row"><span>🚚 Repartidor</span><strong>${o.agent}</strong></div>
            <div class="detail-row"><span>🔢 Placa</span><strong>${o.plate}</strong></div>
            <div class="detail-row"><span>💳 Método de pago</span><strong>${o.pay}</strong></div>
            <div class="detail-row"><span>📍 Dirección</span><strong>${o.address}</strong></div>
          </div>
          <button class="btn btn-secondary btn-sm" data-action="reorder" data-id="${o.product.includes("30") ? "p30" : "p20"}">Repetir pedido</button>
        </div>`).join("")}
    </section>`;
}

function renderProfile() {
  const header = document.querySelector(".app-header");
  const nav = document.getElementById("bottomNav");
  if (header) header.style.display = "";
  if (nav) nav.style.display = "";
  const u = mockData.user;

  app.innerHTML = `
    <section>
      <div class="profile-header">
        <div class="profile-avatar">👤</div>
        <div>
          <h2 class="profile-name">${u.name}</h2>
          <p class="profile-since">Cliente desde ${u.since}</p>
        </div>
      </div>

      <div class="profile-stats">
        <div class="profile-stat">
          <span class="stat-value">${u.orders}</span>
          <span class="stat-label">Pedidos</span>
        </div>
        <div class="profile-stat">
          <span class="stat-value">⭐ 5.0</span>
          <span class="stat-label">Calificación</span>
        </div>
        <div class="profile-stat">
          <span class="stat-value">1</span>
          <span class="stat-label">Direcciones</span>
        </div>
      </div>

      <div class="section-label">Información personal</div>
      <div class="profile-field">
        <span class="field-icon">📧</span>
        <div><div class="field-label">Correo</div><div class="field-value">${u.email}</div></div>
      </div>
      <div class="profile-field">
        <span class="field-icon">📱</span>
        <div><div class="field-label">Teléfono</div><div class="field-value">${u.phone}</div></div>
      </div>
      <div class="profile-field">
        <span class="field-icon">📍</span>
        <div><div class="field-label">Dirección principal</div><div class="field-value">${u.address}</div></div>
      </div>

      <div class="section-label">Configuración</div>
      <div class="profile-field clickable">
        <span class="field-icon">💳</span>
        <div><div class="field-value">Métodos de pago</div></div>
        <span class="chevron">›</span>
      </div>
      <div class="profile-field clickable">
        <span class="field-icon">🔔</span>
        <div><div class="field-value">Notificaciones</div></div>
        <span class="chevron">›</span>
      </div>
      <div class="profile-field clickable">
        <span class="field-icon">🛡️</span>
        <div><div class="field-value">Privacidad y seguridad</div></div>
        <span class="chevron">›</span>
      </div>

      <div style="height: 12px"></div>
      <button class="btn btn-secondary" data-action="logout">Cerrar sesión</button>
    </section>`;
}

function render() {
  destroyMap();
  const screens = { login: renderLogin, selection: renderSelection, orders: renderOrders, profile: renderProfile, checkout: renderCheckout, payment: renderPayment, processing: renderProcessing, confirmed: renderConfirmed, tracking: renderTracking, success: renderSuccess };
  (screens[state.screen] || renderSelection)();
}

// --- MAP ---

function initTrackingMap() {
  const el = document.getElementById("trackingMap");
  if (!el) return;
  map = L.map(el, { zoomControl: false, attributionControl: false }).setView(mockData.route[0], 15);
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(map);
  L.polyline(mockData.route, { color: "#3B8DD4", weight: 4, dashArray: "8 6", opacity: 0.7 }).addTo(map);
  L.circleMarker(mockData.dest, { radius: 10, color: "#A51C1C", fillColor: "#A51C1C", fillOpacity: 0.25, weight: 2 }).addTo(map);
  L.marker(mockData.dest, { icon: L.divIcon({ className: "map-dest-icon", html: "🏠", iconSize: [26, 26], iconAnchor: [13, 13] }) }).addTo(map);
  agentMarker = L.marker(mockData.route[0], { icon: L.divIcon({ className: "map-agent-icon", html: "🚚", iconSize: [32, 32], iconAnchor: [16, 16] }) }).addTo(map);
  map.fitBounds(L.latLngBounds(mockData.route), { padding: [30, 30] });
  startRouteAnimation();
}

function startRouteAnimation() {
  state.routeIdx = 0;
  clearTimer();
  state.trackingTimer = setInterval(() => {
    state.routeIdx++;
    if (state.routeIdx >= mockData.route.length) { clearTimer(); state.screen = "success"; render(); return; }
    agentMarker.setLatLng(mockData.route[state.routeIdx]);
    map.panTo(mockData.route[state.routeIdx], { animate: true, duration: 0.5 });
    const progress = ((state.routeIdx / (mockData.route.length - 1)) * 100).toFixed(0);
    const bar = document.querySelector(".progress-bar");
    if (bar) bar.style.width = progress + "%";
    const newStep = state.routeIdx < 4 ? 0 : state.routeIdx < 10 ? 1 : 2;
    if (newStep !== state.statusIndex) {
      state.statusIndex = newStep;
      document.querySelectorAll(".track-step").forEach((el, i) => {
        el.className = "track-step " + (i < state.statusIndex ? "done" : i === state.statusIndex ? "active" : "");
      });
    }
    const etaEl = document.querySelector(".tracking-eta");
    if (etaEl) etaEl.textContent = `Llega en ~${Math.max(2, 12 - state.statusIndex * 4)} min`;
  }, 1800);
}

// --- EVENTS ---

document.addEventListener("click", (e) => {
  const t = e.target.closest("[data-action]");
  if (!t) return;
  const a = t.dataset.action;

  if (a === "do-login") { state.screen = "selection"; state.activeTab = "home"; updateNav(); render(); }
  if (a === "go-login") { state.authView = "login"; render(); }
  if (a === "go-register") { state.authView = "register"; render(); }
  if (a === "cart-plus") { state.cart[t.dataset.id] = (state.cart[t.dataset.id] || 0) + 1; render(); }
  if (a === "cart-minus") { if (state.cart[t.dataset.id] > 0) state.cart[t.dataset.id]--; render(); }
  if (a === "toggle-subscription") { state.subscriptionEnabled = !state.subscriptionEnabled; render(); }
  if (a === "go-checkout") { state.screen = "checkout"; render(); }
  if (a === "back-selection") { state.screen = "selection"; render(); }
  if (a === "apply-coupon") {
    const v = document.getElementById("couponInput")?.value.trim();
    state.coupon = v;
    state.couponApplied = v.length > 0;
    render();
  }
  if (a === "go-payment") {
    state.address = document.getElementById("addressInput").value;
    state.paymentMethod = document.querySelector('input[name="pay"]:checked')?.value || "card";
    state.screen = "payment";
    render();
  }
  if (a === "back-checkout") { state.screen = "checkout"; render(); }
  if (a === "confirm-payment") { state.screen = "processing"; render(); }
  if (a === "go-tracking") { state.screen = "tracking"; state.statusIndex = 0; render(); }
  if (a === "support") { alert("Soporte Corpoilgas\n📞 55 1234 5678\n💬 Chat disponible 8am–10pm"); }
  if (a === "rate") { state.rating = parseInt(t.dataset.val); render(); }
  if (a === "restart") { clearTimer(); state.screen = "selection"; state.statusIndex = 0; state.cart = { p20: 0, p30: 0 }; state.coupon = ""; state.couponApplied = false; state.rating = 0; state.activeTab = "home"; updateNav(); render(); }
  if (a === "reorder") { state.cart = { p20: 0, p30: 0 }; state.cart[t.dataset.id] = 1; state.screen = "checkout"; state.activeTab = "home"; updateNav(); render(); }
  if (a === "toggle-detail") { const d = document.getElementById("detail-" + t.dataset.idx); if (d) d.classList.toggle("open"); }
  if (a === "logout") { state.screen = "login"; state.authView = "login"; render(); }
});

document.addEventListener("change", (e) => {
  if (e.target.name === "pay") {
    state.paymentMethod = e.target.value;
    document.querySelectorAll(".pay-method").forEach((el) => {
      el.classList.toggle("active", el.querySelector("input").value === state.paymentMethod);
    });
  }
});

function updateNav() {
  document.querySelectorAll("#bottomNav .nav-btn").forEach((b) => {
    b.classList.toggle("active", b.dataset.tab === state.activeTab);
  });
}

document.getElementById("bottomNav").addEventListener("click", (e) => {
  const btn = e.target.closest(".nav-btn");
  if (!btn) return;
  const tab = btn.dataset.tab;
  state.activeTab = tab;
  if (tab === "home") state.screen = "selection";
  else if (tab === "orders") state.screen = "orders";
  else if (tab === "profile") state.screen = "profile";
  updateNav();
  render();
});

render();
