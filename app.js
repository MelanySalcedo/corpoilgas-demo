// === CORPOILGAS DEMO — Alineado con máquina de estados ===

const mockData = {
  pricePerLiter: 12.5, // MXN por litro de Gas LP
  deliveryAgent: {
    name: "Julio Ramírez",
    photo: "🧑‍🔧",
    vehiclePlate: "CDMX-482-A",
    vehicleType: "Camión cisterna",
    rating: 4.8,
    trips: 342,
  },
  orders: [
    { id: "#4820", type: "monto", requested: 500, litersReal: 38.2, totalFinal: 477.5, date: "18 may 2026", status: "Completado", agent: "Julio Ramírez", plate: "CDMX-482-A", pay: "Tarjeta (pre-auth)", address: "Av. Masaryk 111, Polanco", tank: "Estacionario 300L" },
    { id: "#4815", type: "litros", requested: 50, litersReal: 50, totalFinal: 625, date: "10 may 2026", status: "Completado", agent: "Carlos Méndez", plate: "CDMX-319-B", pay: "Efectivo", address: "Av. Amsterdam 75, Condesa", tank: "Cilindro 45kg" },
  ],
  user: {
    name: "María González",
    email: "maria.gonzalez@email.com",
    phone: "+52 55 1234 5678",
    sellerCode: "VND-042",
    since: "Mayo 2026",
    orders: 2,
  },
};

const state = {
  screen: "login",
  authView: "login",
  activeTab: "home",
  // Registro
  regSellerCode: "",
  // Dirección
  address: "Av. Presidente Masaryk 111, Polanco, CDMX",
  tankType: "estacionario",
  tankCapacity: 300,
  // Pedido
  orderMode: "monto", // "monto" | "litros"
  orderAmount: 500,
  orderLiters: 40,
  // Detalles de entrega
  deliveryNotes: "",
  generalNotes: "",
  // Pago
  paymentMethod: "card",
  walletBalance: 350, // Saldo Corpoilgas mock
  // Tracking (máquina de estados)
  orderStatus: 0,
  trackingTimer: null,
  // Post-entrega
  litersReal: 0,
  totalFinal: 0,
  rating: 0,
};

const trackingSteps = [
  { key: "CREATED", label: "Pedido creado", icon: "📋", desc: "Pre-autorización aplicada" },
  { key: "ASSIGNED", label: "Camión asignado", icon: "🚛", desc: "Operador confirmado" },
  { key: "IN_TRANSIT", label: "En camino", icon: "🛣️", desc: "El camión se dirige a tu ubicación" },
  { key: "ARRIVED", label: "Operador llegó", icon: "📍", desc: "Está en tu dirección" },
  { key: "INSPECTING", label: "Inspeccionando", icon: "🔍", desc: "Validando seguridad del tanque" },
  { key: "PUMPING", label: "Recargando", icon: "⛽", desc: "Bombeo de Gas LP en curso" },
  { key: "DELIVERED", label: "Recarga completa", icon: "✅", desc: "Litros reales registrados" },
];

const app = document.getElementById("app");
const mxn = (n) => new Intl.NumberFormat("es-MX", { style: "currency", currency: "MXN" }).format(n);

function clearTimer() { if (state.trackingTimer) { clearInterval(state.trackingTimer); state.trackingTimer = null; } }
function estimatedLiters() { return state.orderMode === "monto" ? Math.round(state.orderAmount / mockData.pricePerLiter) : state.orderLiters; }
function estimatedTotal() { return state.orderMode === "litros" ? state.orderLiters * mockData.pricePerLiter : state.orderAmount; }


// === PANTALLAS ===

function renderLogin() {
  const isReg = state.authView === "register";
  hideChrome();
  app.innerHTML = `
    <section class="auth-screen">
      <div class="auth-brand">
        <img src="./assets/Logo.png" alt="Corpoilgas" class="auth-logo" /><br>
        <img src="./assets/images.jpeg" alt="Mascota" class="auth-mascot" />
      </div>
      <h2>${isReg ? "Crear cuenta" : "Iniciar sesión"}</h2>
      <p class="screen-subtitle">${isReg ? "Regístrate para pedir gas a domicilio" : "Bienvenido de vuelta"}</p>
      <div class="auth-form">
        ${isReg ? `
          <input class="input" placeholder="Nombre completo" />
          <input class="input" placeholder="Correo electrónico" type="email" />
          <input class="input" placeholder="Teléfono (10 dígitos)" type="tel" />
          <input class="input" placeholder="Contraseña" type="password" />
          <div class="input-hint">Código del vendedor que te refirió (obligatorio)</div>
          <input class="input" id="sellerCode" placeholder="Ej: VND-042" value="${state.regSellerCode}" />
        ` : `
          <input class="input" placeholder="Correo electrónico" type="email" />
          <input class="input" placeholder="Contraseña" type="password" />
        `}
        <button class="btn btn-primary" data-action="do-auth">${isReg ? "Registrarme" : "Entrar"}</button>
      </div>
      <p class="auth-switch">
        ${isReg
          ? '¿Ya tienes cuenta? <a data-action="go-login">Inicia sesión</a>'
          : '¿No tienes cuenta? <a data-action="go-register">Regístrate</a>'}
      </p>
    </section>`;
}

function renderHome() {
  showChrome();
  const estLiters = estimatedLiters();
  const estTotal = estimatedTotal();

  app.innerHTML = `
    <section>
      <div class="home-hero">
        <img src="./assets/images.jpeg" alt="Mascota" class="mascot" />
        <div>
          <h2>Recarga tu gas<br>a domicilio</h2>
          <p>Pide, te recargamos, pagas al final</p>
        </div>
      </div>

      <h2 class="screen-title">Nueva recarga</h2>
      <p class="screen-subtitle">Indica cuánto gas necesitas (estimado). El cobro final será por litros reales despachados.</p>

      <div class="order-mode-tabs">
        <button class="mode-tab ${state.orderMode === "monto" ? "active" : ""}" data-action="set-mode" data-mode="monto">Por monto ($)</button>
        <button class="mode-tab ${state.orderMode === "litros" ? "active" : ""}" data-action="set-mode" data-mode="litros">Por litros (L)</button>
      </div>

      ${state.orderMode === "monto" ? `
        <div class="order-input-group">
          <label>¿Cuánto quieres recargar?</label>
          <div class="amount-input-wrap">
            <span class="amount-prefix">$</span>
            <input class="input amount-input" id="orderAmount" type="number" min="100" step="50" value="${state.orderAmount}" />
            <span class="amount-suffix">MXN</span>
          </div>
          <p class="estimate-hint">≈ ${estLiters} litros estimados (a ${mxn(mockData.pricePerLiter)}/L)</p>
        </div>
      ` : `
        <div class="order-input-group">
          <label>¿Cuántos litros necesitas?</label>
          <div class="amount-input-wrap">
            <input class="input amount-input" id="orderLiters" type="number" min="10" step="5" value="${state.orderLiters}" />
            <span class="amount-suffix">litros</span>
          </div>
          <p class="estimate-hint">≈ ${mxn(estTotal)} estimado (a ${mxn(mockData.pricePerLiter)}/L)</p>
        </div>
      `}

      <div class="card address-card">
        <div class="card-header">📍 Dirección de recarga</div>
        <p class="address-text">${state.address}</p>
        <p class="tank-info">🛢️ ${state.tankType === "estacionario" ? "Tanque estacionario" : "Cilindro"} · ${state.tankCapacity}L capacidad</p>
        <a data-action="edit-address" class="link-sm">Cambiar dirección / tanque</a>
      </div>

      <div class="card info-card">
        <p>💡 <strong>¿Cómo funciona?</strong></p>
        <ol class="how-it-works">
          <li>Indicas cuánto gas quieres (estimado)</li>
          <li>Se pre-autoriza tu método de pago</li>
          <li>El operador recarga tu tanque</li>
          <li>Se cobra el monto real por litros despachados</li>
        </ol>
      </div>

      <button class="btn btn-primary" data-action="go-checkout">Continuar · ${mxn(estTotal)} estimado</button>
    </section>`;
}

function renderAddress() {
  showChrome();
  app.innerHTML = `
    <section>
      <h2 class="screen-title">Dirección y tanque</h2>
      <p class="screen-subtitle">Necesitamos saber dónde y qué tipo de tanque tienes.</p>

      <label>Dirección completa</label>
      <input class="input" id="addrInput" value="${state.address}" placeholder="Calle, número, colonia, ciudad" />

      <label>Detalles de llegada</label>
      <textarea class="input textarea" id="addrDeliveryNotes" placeholder="Ej: Portón negro, tocar timbre 2 veces, el tanque está en la azotea, preguntar por Juan...">${state.deliveryNotes}</textarea>

      <label>Tipo de tanque</label>
      <div class="pay-methods">
        <label class="pay-method ${state.tankType === "estacionario" ? "active" : ""}">
          <input type="radio" name="tank" value="estacionario" ${state.tankType === "estacionario" ? "checked" : ""} />
          <span class="pay-icon">🏠</span><span>Estacionario</span>
        </label>
        <label class="pay-method ${state.tankType === "cilindro" ? "active" : ""}">
          <input type="radio" name="tank" value="cilindro" ${state.tankType === "cilindro" ? "checked" : ""} />
          <span class="pay-icon">🛢️</span><span>Cilindro</span>
        </label>
      </div>

      <label>Capacidad del tanque (litros)</label>
      <input class="input" id="tankCap" type="number" min="20" value="${state.tankCapacity}" />

      <div style="height:12px"></div>
      <button class="btn btn-primary" data-action="save-address">Guardar</button>
      <div style="height:8px"></div>
      <button class="btn btn-secondary" data-action="back-home">Cancelar</button>
    </section>`;
}


function renderCheckout() {
  const estTotal = estimatedTotal();
  const estLiters = estimatedLiters();

  app.innerHTML = `
    <section>
      <h2 class="screen-title">Confirmar pedido</h2>
      <p class="screen-subtitle">Revisa los datos. El cobro final será por litros reales.</p>

      <div class="card">
        <div class="checkout-line"><span>Recarga estimada</span><span>${state.orderMode === "monto" ? mxn(state.orderAmount) : state.orderLiters + " L"}</span></div>
        <div class="checkout-line"><span>≈ Litros estimados</span><span>${estLiters} L</span></div>
        <div class="checkout-line"><span>Precio por litro</span><span>${mxn(mockData.pricePerLiter)}</span></div>
        <div class="checkout-line total"><span>Estimado a pre-autorizar</span><span>${mxn(estTotal)}</span></div>
      </div>

      <div class="card">
        <div class="checkout-line"><span>📍 Dirección</span></div>
        <p class="address-text">${state.address}</p>
        <p class="tank-info">🛢️ ${state.tankType === "estacionario" ? "Estacionario" : "Cilindro"} · ${state.tankCapacity}L</p>
      </div>

      <label>Notas del pedido</label>
      <textarea class="input textarea" id="generalNotes" placeholder="Ej: Recibe mi esposa María, estaré ausente, pedido para negocio 'Taquería Don Juan'...">${state.generalNotes}</textarea>

      <label>Método de pago</label>
      <p class="screen-subtitle" style="margin-top:0">Se hará una pre-autorización. El cobro real es al finalizar el servicio.</p>
      <div class="pay-methods">
        <label class="pay-method ${state.paymentMethod === "card" ? "active" : ""}">
          <input type="radio" name="pay" value="card" ${state.paymentMethod === "card" ? "checked" : ""} />
          <span class="pay-icon">💳</span><span>Tarjeta</span>
        </label>
        <label class="pay-method ${state.paymentMethod === "wallet" ? "active" : ""}">
          <input type="radio" name="pay" value="wallet" ${state.paymentMethod === "wallet" ? "checked" : ""} />
          <span class="pay-icon">🪙</span><span>Saldo<br><small>${mxn(state.walletBalance)}</small></span>
        </label>
        <label class="pay-method ${state.paymentMethod === "efectivo" ? "active" : ""}">
          <input type="radio" name="pay" value="efectivo" ${state.paymentMethod === "efectivo" ? "checked" : ""} />
          <span class="pay-icon">💵</span><span>Efectivo</span>
        </label>
      </div>

      ${state.paymentMethod === "card" ? `
        <div class="preauth-notice">
          <span>🔒</span>
          <p>Se retendrán <strong>${mxn(estTotal)}</strong> en tu tarjeta. Solo se cobrará el monto real al finalizar.</p>
        </div>
      ` : state.paymentMethod === "wallet" ? `
        <div class="preauth-notice">
          <span>🪙</span>
          <p>Se descontará del saldo Corpoilgas al finalizar. Saldo actual: <strong>${mxn(state.walletBalance)}</strong>. ${state.walletBalance < estTotal ? '<span style="color:#e74c3c">⚠️ Saldo insuficiente. <a data-action="go-topup" style="color:#e74c3c;text-decoration:underline;cursor:pointer">Recargar</a></span>' : ""}</p>
        </div>
      ` : `
        <div class="preauth-notice">
          <span>💵</span>
          <p>Pagarás en efectivo al operador al finalizar. El monto dependerá de los litros reales.</p>
        </div>
      `}

      <button class="btn btn-primary" data-action="confirm-order">${state.paymentMethod === "card" ? "Pre-autorizar " + mxn(estTotal) : state.paymentMethod === "wallet" ? "Confirmar con saldo" : "Confirmar pedido"}</button>
      <div style="height:8px"></div>
      <button class="btn btn-secondary" data-action="back-home">Volver</button>
    </section>`;
}

function renderTracking() {
  const agent = mockData.deliveryAgent;
  const currentStep = trackingSteps[state.orderStatus];
  const canEdit = state.orderStatus <= 2;

  app.innerHTML = `
    <section class="tracking-screen">
      <div class="tracking-header-bar">
        <span class="tracking-order-id">Pedido #4821</span>
        <span class="tracking-status-badge">${currentStep.icon} ${currentStep.label}</span>
      </div>

      <div class="tracking-timeline">
        ${trackingSteps.map((s, i) => `
          <div class="timeline-step ${i < state.orderStatus ? "done" : i === state.orderStatus ? "active" : "pending"}">
            <div class="timeline-dot">${i < state.orderStatus ? "✓" : s.icon}</div>
            <div class="timeline-content">
              <span class="timeline-label">${s.label}</span>
              ${i === state.orderStatus ? `<span class="timeline-desc">${s.desc}</span>` : ""}
            </div>
          </div>
        `).join("")}
      </div>

      ${state.orderStatus >= 1 ? `
        <div class="agent-card">
          <div class="agent-avatar">${agent.photo}</div>
          <div class="agent-info">
            <div class="agent-name">${agent.name}</div>
            <div class="agent-meta">${agent.vehicleType} · ${agent.vehiclePlate}</div>
            <div class="agent-meta">⭐ ${agent.rating} · ${agent.trips} servicios</div>
          </div>
          <button class="agent-call-btn">📞</button>
        </div>
      ` : ""}

      <div class="card info-card">
        <div class="checkout-line"><span>Estimado</span><span>${mxn(estimatedTotal())}</span></div>
        <div class="checkout-line"><span>≈ Litros</span><span>${estimatedLiters()} L</span></div>
        <div class="checkout-line"><span>Pago</span><span>${state.paymentMethod === "card" ? "💳 Tarjeta" : state.paymentMethod === "wallet" ? "🪙 Saldo" : "💵 Efectivo"}</span></div>
        ${state.deliveryNotes ? `<div class="checkout-line"><span>📝 Notas entrega</span><span class="note-preview">${state.deliveryNotes.substring(0, 30)}...</span></div>` : ""}
      </div>

      ${state.orderStatus < trackingSteps.length - 1 ? `
        <button class="btn btn-secondary btn-sm" data-action="advance-status">⏩ Avanzar estado (demo)</button>
      ` : `
        <button class="btn btn-primary" data-action="go-delivered">Ver resumen de recarga</button>
      `}

      ${canEdit ? `
        <div class="tracking-actions">
          <button class="btn btn-secondary btn-sm" data-action="edit-order">✏️ Editar pedido</button>
          <button class="btn btn-danger btn-sm" data-action="cancel-order">✕ Cancelar</button>
        </div>
      ` : ""}

      <div class="support-fab" data-action="toggle-help-menu">
        <span>💬</span>
      </div>
      <div class="help-overlay" id="helpOverlay" style="display:none">
        <div class="help-backdrop" data-action="toggle-help-menu"></div>
        <div class="help-menu">
          <div class="help-menu-option" data-action="support-call">
            <span class="help-menu-icon">📞</span>
            <span>Llamar a soporte</span>
          </div>
          <div class="help-menu-option" data-action="go-support">
            <span class="help-menu-icon">🎫</span>
            <span>Generar ticket</span>
          </div>
          <div class="help-menu-option" data-action="go-faq">
            <span class="help-menu-icon">❓</span>
            <span>Preguntas frecuentes</span>
          </div>
        </div>
      </div>
    </section>`;
}

function renderDelivered() {
  // Simular litros reales (ligeramente diferente al estimado)
  if (!state.litersReal) {
    const est = estimatedLiters();
    state.litersReal = Math.round((est + (Math.random() * 6 - 3)) * 10) / 10;
    state.totalFinal = Math.round(state.litersReal * mockData.pricePerLiter * 100) / 100;
  }
  const agent = mockData.deliveryAgent;
  const diff = state.totalFinal - estimatedTotal();

  app.innerHTML = `
    <section>
      <div class="delivered-header">
        <span class="delivered-icon">✅</span>
        <h2>Recarga completada</h2>
        <p class="screen-subtitle">Servicio finalizado por ${agent.name}</p>
      </div>

      <div class="card delivered-summary">
        <div class="summary-title">Resumen de litros despachados</div>
        <div class="liters-display">
          <span class="liters-number">${state.litersReal}</span>
          <span class="liters-unit">litros reales</span>
        </div>
        <div class="checkout-line"><span>Precio por litro</span><span>${mxn(mockData.pricePerLiter)}</span></div>
        <div class="checkout-line"><span>Estimado original</span><span>${mxn(estimatedTotal())}</span></div>
        <div class="checkout-line total"><span>Cobro final</span><span>${mxn(state.totalFinal)}</span></div>
        ${diff !== 0 ? `<p class="diff-note">${diff > 0 ? "📈" : "📉"} Diferencia de ${mxn(Math.abs(diff))} ${diff > 0 ? "más" : "menos"} que el estimado</p>` : ""}
      </div>

      <div class="card">
        <div class="checkout-line"><span>Método de pago</span><span>${state.paymentMethod === "card" ? "💳 Cargo final aplicado" : "💵 Pagado en efectivo"}</span></div>
        <div class="checkout-line"><span>Operador</span><span>${agent.name} · ${agent.vehiclePlate}</span></div>
        <div class="checkout-line"><span>Dirección</span><span>${state.address}</span></div>
      </div>

      <div class="card proof-card">
        <div class="card-header">📸 Evidencia del medidor</div>
        <div class="proof-placeholder">[ Foto del medidor / ticket impreso ]</div>
        <p class="proof-note">El operador subió foto del medidor como comprobante</p>
      </div>

      <div class="rating-section">
        <p class="rating-label">¿Cómo fue el servicio?</p>
        <div class="stars">
          ${[1,2,3,4,5].map((n) => `<span class="star ${n <= state.rating ? "active" : ""}" data-action="rate" data-val="${n}">★</span>`).join("")}
        </div>
      </div>

      <button class="btn btn-primary" data-action="restart">Nueva recarga</button>
    </section>`;
}


function renderOrders() {
  showChrome();
  app.innerHTML = `
    <section>
      <h2 class="screen-title">Mis recargas</h2>
      <p class="screen-subtitle">${mockData.orders.length} servicios realizados</p>
      ${mockData.orders.map((o, idx) => `
        <div class="order-history-card">
          <div class="order-history-top">
            <span class="order-history-id">${o.id}</span>
            <span class="order-history-status">${o.status}</span>
          </div>
          <div class="order-history-body">
            <div>
              <div class="order-history-product">⛽ ${o.litersReal}L despachados</div>
              <div class="order-history-date">${o.date}</div>
            </div>
            <div class="order-history-price">${mxn(o.totalFinal)}</div>
          </div>
          <div class="order-detail" id="detail-${idx}">
            <div class="detail-row"><span>Solicitado</span><strong>${o.type === "monto" ? mxn(o.requested) : o.requested + "L"} (estimado)</strong></div>
            <div class="detail-row"><span>Litros reales</span><strong>${o.litersReal} L</strong></div>
            <div class="detail-row"><span>Cobro final</span><strong>${mxn(o.totalFinal)}</strong></div>
            <div class="detail-row"><span>Operador</span><strong>${o.agent} · ${o.plate}</strong></div>
            <div class="detail-row"><span>Pago</span><strong>${o.pay}</strong></div>
            <div class="detail-row"><span>Dirección</span><strong>${o.address}</strong></div>
            <div class="detail-row"><span>Tanque</span><strong>${o.tank}</strong></div>
          </div>
          <button class="btn btn-secondary btn-sm" data-action="toggle-detail" data-idx="${idx}">Ver detalle</button>
        </div>
      `).join("")}
    </section>`;
}

function renderProfile() {
  showChrome();
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
        <div class="profile-stat"><span class="stat-value">${u.orders}</span><span class="stat-label">Recargas</span></div>
        <div class="profile-stat"><span class="stat-value">⭐ 5.0</span><span class="stat-label">Calificación</span></div>
      </div>

      <div class="section-label">Información personal</div>
      <div class="profile-field"><span class="field-icon">📧</span><div><div class="field-label">Correo</div><div class="field-value">${u.email}</div></div></div>
      <div class="profile-field"><span class="field-icon">📱</span><div><div class="field-label">Teléfono</div><div class="field-value">${u.phone}</div></div></div>
      <div class="profile-field"><span class="field-icon">🏷️</span><div><div class="field-label">Código vendedor (referido)</div><div class="field-value">${u.sellerCode}</div></div></div>

      <div class="section-label">Mi tanque</div>
      <div class="profile-field"><span class="field-icon">📍</span><div><div class="field-label">Dirección</div><div class="field-value">${state.address}</div></div></div>
      <div class="profile-field"><span class="field-icon">🛢️</span><div><div class="field-label">Tanque</div><div class="field-value">${state.tankType === "estacionario" ? "Estacionario" : "Cilindro"} · ${state.tankCapacity}L</div></div></div>

      <div class="section-label">Saldo Corpoilgas</div>
      <div class="profile-field"><span class="field-icon">🪙</span><div><div class="field-label">Saldo disponible</div><div class="field-value" style="font-weight:700;color:#e65100">${mxn(state.walletBalance)}</div></div></div>
      <button class="btn btn-secondary btn-sm" data-action="go-topup" style="margin-top:4px">Recargar saldo</button>

      <div style="height:12px"></div>
      <button class="btn btn-secondary" data-action="logout">Cerrar sesión</button>
    </section>`;
}

function renderEditOrder() {
  showChrome();
  app.innerHTML = `
    <section>
      <h2 class="screen-title">Editar pedido #4821</h2>
      <p class="screen-subtitle">Modifica los datos antes de que el camión salga.</p>

      <div class="order-mode-tabs">
        <button class="mode-tab ${state.orderMode === "monto" ? "active" : ""}" data-action="set-mode" data-mode="monto">Por monto ($)</button>
        <button class="mode-tab ${state.orderMode === "litros" ? "active" : ""}" data-action="set-mode" data-mode="litros">Por litros (L)</button>
      </div>

      ${state.orderMode === "monto" ? `
        <div class="order-input-group">
          <label>Monto de recarga</label>
          <div class="amount-input-wrap">
            <span class="amount-prefix">$</span>
            <input class="input amount-input" id="editAmount" type="number" min="100" step="50" value="${state.orderAmount}" />
            <span class="amount-suffix">MXN</span>
          </div>
        </div>
      ` : `
        <div class="order-input-group">
          <label>Litros solicitados</label>
          <div class="amount-input-wrap">
            <input class="input amount-input" id="editLiters" type="number" min="10" step="5" value="${state.orderLiters}" />
            <span class="amount-suffix">litros</span>
          </div>
        </div>
      `}

      <label>Detalles de llegada y dirección</label>
      <textarea class="input textarea" id="editDeliveryNotes" placeholder="Portón negro, tocar timbre...">${state.deliveryNotes}</textarea>

      <label>Notas generales</label>
      <textarea class="input textarea" id="editGeneralNotes" placeholder="Quién recibe, si estarás ausente...">${state.generalNotes}</textarea>

      <label>Método de pago</label>
      <div class="pay-methods">
        <label class="pay-method ${state.paymentMethod === "card" ? "active" : ""}">
          <input type="radio" name="pay" value="card" ${state.paymentMethod === "card" ? "checked" : ""} />
          <span class="pay-icon">💳</span><span>Tarjeta</span>
        </label>
        <label class="pay-method ${state.paymentMethod === "wallet" ? "active" : ""}">
          <input type="radio" name="pay" value="wallet" ${state.paymentMethod === "wallet" ? "checked" : ""} />
          <span class="pay-icon">🪙</span><span>Saldo</span>
        </label>
        <label class="pay-method ${state.paymentMethod === "efectivo" ? "active" : ""}">
          <input type="radio" name="pay" value="efectivo" ${state.paymentMethod === "efectivo" ? "checked" : ""} />
          <span class="pay-icon">💵</span><span>Efectivo</span>
        </label>
      </div>

      <button class="btn btn-primary" data-action="save-edit">Guardar cambios</button>
      <div style="height:8px"></div>
      <button class="btn btn-secondary" data-action="back-tracking">Volver al seguimiento</button>
    </section>`;
}

function renderTopup() {
  showChrome();
  app.innerHTML = `
    <section>
      <h2 class="screen-title">Recargar saldo</h2>
      <p class="screen-subtitle">Tu saldo Corpoilgas: <strong>${mxn(state.walletBalance)}</strong></p>

      <div class="card wallet-card">
        <div class="wallet-balance">
          <span class="wallet-icon">🪙</span>
          <span class="wallet-amount">${mxn(state.walletBalance)}</span>
        </div>
        <p class="wallet-label">Saldo disponible</p>
      </div>

      <label>¿Cuánto quieres recargar?</label>
      <div class="topup-options">
        <button class="topup-btn" data-action="topup-amount" data-amount="200">$200</button>
        <button class="topup-btn" data-action="topup-amount" data-amount="500">$500</button>
        <button class="topup-btn" data-action="topup-amount" data-amount="1000">$1,000</button>
      </div>
      <div class="amount-input-wrap" style="margin-top:8px">
        <span class="amount-prefix">$</span>
        <input class="input amount-input" id="topupCustom" type="number" min="50" step="50" placeholder="Otro monto" />
      </div>

      <label>Método de recarga</label>
      <div class="pay-methods">
        <label class="pay-method active"><input type="radio" name="topup-method" value="card" checked /><span class="pay-icon">💳</span><span>Tarjeta</span></label>
        <label class="pay-method"><input type="radio" name="topup-method" value="mercadopago" /><span class="pay-icon">🟦</span><span>MercadoPago</span></label>
        <label class="pay-method"><input type="radio" name="topup-method" value="paypal" /><span class="pay-icon">🅿️</span><span>PayPal</span></label>
        <label class="pay-method"><input type="radio" name="topup-method" value="oxxo" /><span class="pay-icon">🏪</span><span>OXXO</span></label>
      </div>

      <button class="btn btn-primary" data-action="do-topup">Recargar saldo</button>
      <div style="height:8px"></div>
      <button class="btn btn-secondary" data-action="back-from-topup">Volver</button>
    </section>`;
}

function renderSupport() {
  showChrome();
  app.innerHTML = `
    <section>
      <h2 class="screen-title">Generar ticket de soporte</h2>
      <p class="screen-subtitle">Pedido #4821 · ${trackingSteps[state.orderStatus].label}</p>

      <label>Motivo</label>
      <select class="input" id="ticketReason">
        <option value="">Selecciona un motivo...</option>
        <option>El operador no llega</option>
        <option>Quiero cambiar la dirección</option>
        <option>Problema con el cobro</option>
        <option>Problema de seguridad</option>
        <option>Recarga incompleta</option>
        <option>Otro</option>
      </select>

      <label>Describe tu problema</label>
      <textarea class="input textarea" id="ticketDesc" placeholder="Cuéntanos qué pasó con el mayor detalle posible..."></textarea>

      <label>Teléfono de contacto</label>
      <input class="input" id="ticketPhone" value="+52 55 1234 5678" />

      <div style="height:12px"></div>
      <button class="btn btn-primary" data-action="submit-ticket">Enviar ticket</button>
      <div style="height:8px"></div>
      <button class="btn btn-secondary" data-action="back-tracking">Volver</button>
    </section>`;
}

function renderFAQ() {
  showChrome();
  const faqs = [
    { q: "¿Cómo se calcula el cobro final?", a: "Se cobra por litros reales despachados. El monto estimado es solo una referencia; al finalizar la recarga, el medidor del camión determina los litros exactos y se aplica el cargo real." },
    { q: "¿Puedo cancelar mi pedido?", a: "Sí, puedes cancelar mientras el pedido esté en estado Creado, Asignado o En camino. Después de que el operador llegue, ya no es posible cancelar." },
    { q: "¿Qué pasa si mi tanque no pasa la inspección?", a: "El operador puede rechazar la recarga por seguridad (tanque caducado, fuga detectada, sin acceso). Se cancela sin cargo y se te notifica el motivo." },
    { q: "¿Cómo recargo saldo Corpoilgas?", a: "Ve a tu Perfil → Recargar saldo. Puedes recargar con tarjeta, MercadoPago, PayPal u OXXO." },
    { q: "¿Quién es el operador que me atiende?", a: "Al asignarse tu pedido, recibirás los datos del operador: nombre, foto y placa del camión." },
    { q: "¿Puedo programar recargas recurrentes?", a: "Próximamente. Por ahora recibirás recordatorios mensuales para que no se te olvide recargar." },
  ];

  app.innerHTML = `
    <section>
      <h2 class="screen-title">Preguntas frecuentes</h2>
      <p class="screen-subtitle">Resuelve tus dudas rápidamente</p>
      <div class="faq-list">
        ${faqs.map((f, i) => `
          <div class="faq-item">
            <div class="faq-question" data-action="toggle-faq" data-idx="${i}">
              <span>${f.q}</span>
              <span class="faq-chevron">›</span>
            </div>
            <div class="faq-answer" id="faq-${i}">${f.a}</div>
          </div>
        `).join("")}
      </div>
      <div style="height:12px"></div>
      <button class="btn btn-secondary" data-action="back-tracking">Volver</button>
    </section>`;
}

// === HELPERS DE CHROME ===

function hideChrome() {
  const h = document.querySelector(".app-header");
  const n = document.getElementById("bottomNav");
  if (h) h.style.display = "none";
  if (n) n.style.display = "none";
}
function showChrome() {
  const h = document.querySelector(".app-header");
  const n = document.getElementById("bottomNav");
  if (h) h.style.display = "";
  if (n) n.style.display = "";
}

// === RENDER PRINCIPAL ===

function render() {
  const screens = {
    login: renderLogin,
    home: renderHome,
    address: renderAddress,
    checkout: renderCheckout,
    tracking: renderTracking,
    delivered: renderDelivered,
    orders: renderOrders,
    profile: renderProfile,
    editOrder: renderEditOrder,
    topup: renderTopup,
    support: renderSupport,
    faq: renderFAQ,
  };
  (screens[state.screen] || renderHome)();
}

// === EVENTOS ===

document.addEventListener("click", (e) => {
  const t = e.target.closest("[data-action]");
  if (!t) return;
  const a = t.dataset.action;

  if (a === "do-auth") {
    const code = document.getElementById("sellerCode");
    if (code) state.regSellerCode = code.value;
    state.screen = "home"; state.activeTab = "home"; updateNav(); render();
  }
  if (a === "go-login") { state.authView = "login"; render(); }
  if (a === "go-register") { state.authView = "register"; render(); }

  if (a === "set-mode") { state.orderMode = t.dataset.mode; render(); }
  if (a === "edit-address") { state.screen = "address"; render(); }
  if (a === "back-home") { state.screen = "home"; render(); }

  if (a === "save-address") {
    state.address = document.getElementById("addrInput").value;
    state.deliveryNotes = document.getElementById("addrDeliveryNotes")?.value || "";
    state.tankType = document.querySelector('input[name="tank"]:checked')?.value || "estacionario";
    state.tankCapacity = parseInt(document.getElementById("tankCap").value) || 300;
    state.screen = "home"; render();
  }

  if (a === "go-checkout") {
    const amtEl = document.getElementById("orderAmount");
    const litEl = document.getElementById("orderLiters");
    if (amtEl) state.orderAmount = parseInt(amtEl.value) || 500;
    if (litEl) state.orderLiters = parseInt(litEl.value) || 40;
    state.screen = "checkout"; render();
  }

  if (a === "confirm-order") {
    const dn = document.getElementById("deliveryNotes");
    const gn = document.getElementById("generalNotes");
    if (dn) state.deliveryNotes = dn.value;
    if (gn) state.generalNotes = gn.value;
    state.screen = "tracking"; state.orderStatus = 0; render();
  }

  if (a === "advance-status") {
    if (state.orderStatus < trackingSteps.length - 1) { state.orderStatus++; render(); }
  }

  if (a === "go-delivered") { state.screen = "delivered"; render(); }

  if (a === "cancel-order") {
    if (confirm("¿Cancelar pedido? Se liberará la pre-autorización.")) {
      state.screen = "home"; state.orderStatus = 0; render();
    }
  }

  if (a === "edit-order") { state.screen = "editOrder"; render(); }
  if (a === "back-tracking") { state.screen = "tracking"; render(); }

  if (a === "save-edit") {
    const amt = document.getElementById("editAmount");
    const lit = document.getElementById("editLiters");
    const dn = document.getElementById("editDeliveryNotes");
    const gn = document.getElementById("editGeneralNotes");
    if (amt) state.orderAmount = parseInt(amt.value) || state.orderAmount;
    if (lit) state.orderLiters = parseInt(lit.value) || state.orderLiters;
    if (dn) state.deliveryNotes = dn.value;
    if (gn) state.generalNotes = gn.value;
    state.paymentMethod = document.querySelector('input[name="pay"]:checked')?.value || state.paymentMethod;
    state.screen = "tracking"; render();
  }

  if (a === "go-topup") { state._prevScreen = state.screen; state.screen = "topup"; render(); }
  if (a === "back-from-topup") { state.screen = state._prevScreen || "checkout"; render(); }

  if (a === "topup-amount") {
    state.walletBalance += parseInt(t.dataset.amount);
    alert(`✅ Saldo recargado. Nuevo saldo: ${mxn(state.walletBalance)}`);
    render();
  }
  if (a === "do-topup") {
    const custom = parseInt(document.getElementById("topupCustom")?.value);
    if (custom && custom >= 50) {
      state.walletBalance += custom;
      alert(`✅ Saldo recargado +${mxn(custom)}. Nuevo saldo: ${mxn(state.walletBalance)}`);
      render();
    } else {
      alert("Selecciona un monto o ingresa uno personalizado (mínimo $50)");
    }
  }

  if (a === "go-support") { state.screen = "support"; render(); }
  if (a === "go-faq") { state.screen = "faq"; render(); }
  if (a === "support-call") { alert("📞 Llamando a soporte Corpoilgas...\n01-800-GAS-CORP"); }
  if (a === "support-ticket") { alert("🎫 Ticket #TK-8821 generado.\nTe contactaremos en menos de 30 minutos."); state.screen = "tracking"; render(); }
  if (a === "support-chat") { alert("💬 Conectando con un agente...\nTiempo de espera: ~2 min"); }
  if (a === "toggle-help-menu") {
    const ov = document.getElementById("helpOverlay");
    if (ov) ov.style.display = ov.style.display === "none" ? "flex" : "none";
  }
  if (a === "submit-ticket") {
    const reason = document.getElementById("ticketReason")?.value;
    if (!reason) { alert("Selecciona un motivo"); return; }
    alert("🎫 Ticket #TK-" + Math.floor(Math.random() * 9000 + 1000) + " generado.\nMotivo: " + reason + "\nTe contactaremos en menos de 30 minutos.");
    state.screen = "tracking"; render();
  }
  if (a === "toggle-faq") {
    const el = document.getElementById("faq-" + t.dataset.idx);
    if (el) el.classList.toggle("open");
  }

  if (a === "rate") { state.rating = parseInt(t.dataset.val); render(); }

  if (a === "restart") {
    clearTimer();
    state.screen = "home"; state.orderStatus = 0; state.litersReal = 0;
    state.totalFinal = 0; state.rating = 0; state.activeTab = "home";
    updateNav(); render();
  }

  if (a === "toggle-detail") {
    const d = document.getElementById("detail-" + t.dataset.idx);
    if (d) d.classList.toggle("open");
  }

  if (a === "logout") { state.screen = "login"; state.authView = "login"; render(); }
});

document.addEventListener("change", (e) => {
  if (e.target.name === "pay") {
    state.paymentMethod = e.target.value;
    render();
  }
  if (e.target.name === "tank") {
    state.tankType = e.target.value;
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
  state.activeTab = btn.dataset.tab;
  if (state.activeTab === "home") state.screen = "home";
  else if (state.activeTab === "orders") state.screen = "orders";
  else if (state.activeTab === "profile") state.screen = "profile";
  updateNav(); render();
});

render();
