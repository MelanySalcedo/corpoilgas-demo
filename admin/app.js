// === CORPOILGAS ADMIN PANEL DEMO — Layout tipo Outlook ===

const STATES = [
  { key: "CREATED", label: "Creado", icon: "📋" },
  { key: "ASSIGNED", label: "Asignado", icon: "🚛" },
  { key: "IN_TRANSIT", label: "En tránsito", icon: "🛣️" },
  { key: "ARRIVED", label: "Llegó", icon: "📍" },
  { key: "INSPECTING", label: "Inspección", icon: "🔍" },
  { key: "PUMPING", label: "Bombeando", icon: "⛽" },
  { key: "DELIVERED", label: "Entregado", icon: "✅" },
  { key: "COMPLETED", label: "Completado", icon: "🏁" },
  { key: "CANCELLED", label: "Cancelado", icon: "❌" },
];

const orders = [
  {
    id: "#4821", client: "María González", phone: "+52 55 1234 5678",
    address: "Av. Masaryk 111, Polanco, CDMX", estimatedLiters: 40, estimatedCost: 500,
    realLiters: null, realCost: null, payMethod: "Tarjeta (pre-auth)",
    driver: "Julio Ramírez", truck: "CDMX-482-A (Cisterna 3000L)",
    deliveryDate: "19 may 2026, 10:00–12:00", tankType: "Estacionario 300L",
    status: "IN_TRANSIT", needsAction: false, unread: true,
    description: "Cliente residencial solicita recarga por monto. Pre-autorización aplicada a tarjeta VISA ****4532. Camión en ruta, ETA 15 min.",
    history: [
      { state: "CREATED", time: "09:12" },
      { state: "ASSIGNED", time: "09:15" },
      { state: "IN_TRANSIT", time: "09:22" },
    ],
  },
  {
    id: "#4820", client: "María González", phone: "+52 55 1234 5678",
    address: "Av. Masaryk 111, Polanco, CDMX", estimatedLiters: 40, estimatedCost: 500,
    realLiters: 38.2, realCost: 477.5, payMethod: "Tarjeta (cargo final)",
    driver: "Julio Ramírez", truck: "CDMX-482-A (Cisterna 3000L)",
    deliveryDate: "18 may 2026, 14:00–16:00", tankType: "Estacionario 300L",
    status: "COMPLETED", needsAction: false, unread: false,
    description: "Servicio completado. Litros reales: 38.2L. Diferencia de -$22.50 vs estimado. Foto de medidor validada. Factura emitida automáticamente.",
    history: [
      { state: "CREATED", time: "13:45" }, { state: "ASSIGNED", time: "13:48" },
      { state: "IN_TRANSIT", time: "13:55" }, { state: "ARRIVED", time: "14:12" },
      { state: "INSPECTING", time: "14:14" }, { state: "PUMPING", time: "14:18" },
      { state: "DELIVERED", time: "14:31" }, { state: "COMPLETED", time: "14:35" },
    ],
  },
  {
    id: "#4819", client: "Restaurante El Fogón S.A.", phone: "+52 55 9876 5432",
    address: "Calle Durango 205, Roma Norte, CDMX", estimatedLiters: 200, estimatedCost: 2500,
    realLiters: null, realCost: null, payMethod: "Crédito B2B (Convenio #C-087)",
    driver: null, truck: null,
    deliveryDate: "19 may 2026, 08:00–10:00", tankType: "Estacionario 1000L",
    status: "CREATED", needsAction: true, unread: true,
    description: "Pedido empresarial con convenio de crédito. Línea de crédito validada en ERP. REQUIERE ASIGNACIÓN DE CONDUCTOR por parte del administrador.",
    history: [
      { state: "CREATED", time: "07:30" },
    ],
  },
  {
    id: "#4818", client: "Jorge Hernández", phone: "+52 55 5555 1234",
    address: "Calle Ámsterdam 75, Condesa, CDMX", estimatedLiters: 50, estimatedCost: 625,
    realLiters: 50, realCost: 625, payMethod: "Efectivo",
    driver: "Carlos Méndez", truck: "CDMX-319-B (Cisterna 5000L)",
    deliveryDate: "18 may 2026, 09:00–11:00", tankType: "Cilindro 45kg",
    status: "COMPLETED", needsAction: false, unread: false,
    description: "Servicio completado sin novedades. Pago en efectivo recibido. Evidencia fotográfica cargada correctamente.",
    history: [
      { state: "CREATED", time: "08:20" }, { state: "ASSIGNED", time: "08:22" },
      { state: "IN_TRANSIT", time: "08:30" }, { state: "ARRIVED", time: "08:52" },
      { state: "INSPECTING", time: "08:54" }, { state: "PUMPING", time: "08:58" },
      { state: "DELIVERED", time: "09:15" }, { state: "COMPLETED", time: "09:18" },
    ],
  },
  {
    id: "#4817", client: "Ana López", phone: "+52 55 4321 8765",
    address: "Insurgentes Sur 1602, Crédito Constructor, CDMX", estimatedLiters: 30, estimatedCost: 375,
    realLiters: null, realCost: null, payMethod: "Tarjeta (pre-auth)",
    driver: null, truck: null,
    deliveryDate: "19 may 2026, 14:00–16:00", tankType: "Estacionario 200L",
    status: "CREATED", needsAction: true, unread: true,
    description: "Pedido recién creado. Pre-autorización de $375 aplicada. PENDIENTE: Asignar conductor y camión.",
    history: [
      { state: "CREATED", time: "11:05" },
    ],
  },
  {
    id: "#4816", client: "Pedro Martínez", phone: "+52 55 7777 3333",
    address: "Av. Revolución 450, Mixcoac, CDMX", estimatedLiters: 60, estimatedCost: 750,
    realLiters: null, realCost: null, payMethod: "Tarjeta (pre-auth)",
    driver: "Roberto Díaz", truck: "CDMX-155-C (Cisterna 3000L)",
    deliveryDate: "19 may 2026, 11:00–13:00", tankType: "Estacionario 500L",
    status: "ARRIVED", needsAction: false, unread: true,
    description: "Operador llegó al punto. Esperando acceso al tanque por parte del cliente. Notificación de arribo enviada.",
    history: [
      { state: "CREATED", time: "10:00" }, { state: "ASSIGNED", time: "10:03" },
      { state: "IN_TRANSIT", time: "10:10" }, { state: "ARRIVED", time: "10:38" },
    ],
  },
  {
    id: "#4815", client: "Lucía Fernández", phone: "+52 55 2222 4444",
    address: "Calz. de Tlalpan 1234, Portales, CDMX", estimatedLiters: 45, estimatedCost: 562.5,
    realLiters: null, realCost: null, payMethod: "Efectivo",
    driver: "Carlos Méndez", truck: "CDMX-319-B (Cisterna 5000L)",
    deliveryDate: "19 may 2026, 09:30–11:30", tankType: "Estacionario 300L",
    status: "PUMPING", needsAction: false, unread: false,
    description: "Bombeo en curso. Tanque validado correctamente. Medidor analógico registrando flujo. Estimado de finalización: 5 min.",
    history: [
      { state: "CREATED", time: "09:00" }, { state: "ASSIGNED", time: "09:02" },
      { state: "IN_TRANSIT", time: "09:08" }, { state: "ARRIVED", time: "09:32" },
      { state: "INSPECTING", time: "09:34" }, { state: "PUMPING", time: "09:38" },
    ],
  },
  {
    id: "#4814", client: "Tacos Don Pepe S.A.", phone: "+52 55 6666 9999",
    address: "Av. Universidad 800, Del Valle, CDMX", estimatedLiters: 150, estimatedCost: 1875,
    realLiters: null, realCost: null, payMethod: "Tarjeta (pre-auth)",
    driver: "Julio Ramírez", truck: "CDMX-482-A (Cisterna 3000L)",
    deliveryDate: "17 may 2026, 16:00–18:00", tankType: "Estacionario 500L",
    status: "CANCELLED", needsAction: false, unread: false,
    description: "Cancelado por el cliente cuando el camión estaba en tránsito. Penalización de $50 aplicada. Pre-autorización liberada.",
    history: [
      { state: "CREATED", time: "15:30" }, { state: "ASSIGNED", time: "15:33" },
      { state: "IN_TRANSIT", time: "15:40" }, { state: "CANCELLED", time: "15:55" },
    ],
  },
  {
    id: "#4813", client: "Hotel Reforma S.A.", phone: "+52 55 8888 1111",
    address: "Paseo de la Reforma 500, Juárez, CDMX", estimatedLiters: 300, estimatedCost: 3750,
    realLiters: null, realCost: null, payMethod: "Crédito B2B (Convenio #C-102)",
    driver: null, truck: null,
    deliveryDate: "19 may 2026, 16:00–18:00", tankType: "Estacionario 2000L",
    status: "CREATED", needsAction: true, unread: true,
    description: "Pedido programado de convenio empresarial. Línea de crédito activa. REQUIERE ASIGNACIÓN DE CONDUCTOR. Prioridad alta por volumen.",
    history: [
      { state: "CREATED", time: "08:00" },
    ],
  },
];

const DRIVERS = [
  { name: "Julio Ramírez", truck: "CDMX-482-A (Cisterna 3000L)" },
  { name: "Carlos Méndez", truck: "CDMX-319-B (Cisterna 5000L)" },
  { name: "Roberto Díaz", truck: "CDMX-155-C (Cisterna 3000L)" },
];

const state = {
  screen: "login",
  selectedOrder: null,
  category: "PENDING_ACTION",
  sortBy: "date_desc",
  searchQuery: "",
  showFilters: false,
  filterDriver: "",
  filterPay: "",
  sidebarOpen: true,
  flotillaOpen: false,
  clientesOpen: false,
  metricasOpen: false,
  ticketsOpen: false,
};

const app = document.getElementById("app");
const mxn = (n) => new Intl.NumberFormat("es-MX", { style: "currency", currency: "MXN" }).format(n);

function getStatusClass(status) { return "status-" + status.toLowerCase(); }
function getStateInfo(key) { return STATES.find(s => s.key === key) || { label: key, icon: "•" }; }

function getFilteredOrders() {
  let list = [...orders];

  // Category filter
  if (state.category === "PENDING_ACTION") list = list.filter(o => o.needsAction);
  else if (state.category !== "ALL") list = list.filter(o => o.status === state.category);

  // Search
  if (state.searchQuery) {
    const q = state.searchQuery.toLowerCase();
    list = list.filter(o => o.client.toLowerCase().includes(q) || o.id.includes(q) || o.address.toLowerCase().includes(q));
  }

  // Filters
  if (state.filterDriver) list = list.filter(o => o.driver === state.filterDriver);
  if (state.filterPay) list = list.filter(o => o.payMethod.toLowerCase().includes(state.filterPay.toLowerCase()));

  // Sort
  if (state.sortBy === "date_desc") list.sort((a, b) => b.history[b.history.length-1]?.time.localeCompare(a.history[a.history.length-1]?.time));
  else if (state.sortBy === "date_asc") list.sort((a, b) => a.history[a.history.length-1]?.time.localeCompare(b.history[b.history.length-1]?.time));
  else if (state.sortBy === "amount_desc") list.sort((a, b) => (b.realCost || b.estimatedCost) - (a.realCost || a.estimatedCost));
  else if (state.sortBy === "client") list.sort((a, b) => a.client.localeCompare(b.client));

  // Unread/action items first
  list.sort((a, b) => (b.unread ? 1 : 0) - (a.unread ? 1 : 0));

  return list;
}

function getCategoryCounts() {
  return {
    PENDING_ACTION: orders.filter(o => o.needsAction).length,
    ALL: orders.length,
    CREATED: orders.filter(o => o.status === "CREATED").length,
    ASSIGNED: orders.filter(o => o.status === "ASSIGNED").length,
    IN_TRANSIT: orders.filter(o => o.status === "IN_TRANSIT").length,
    ARRIVED: orders.filter(o => o.status === "ARRIVED").length,
    PUMPING: orders.filter(o => o.status === "PUMPING").length,
    DELIVERED: orders.filter(o => o.status === "DELIVERED").length,
    COMPLETED: orders.filter(o => o.status === "COMPLETED").length,
    CANCELLED: orders.filter(o => o.status === "CANCELLED").length,
  };
}

function render() {
  if (state.screen === "login") return renderLogin();
  renderDashboard();
}

function renderLogin() {
  app.innerHTML = `
    <div class="auth-wrapper">
      <div class="auth-card">
        <div class="auth-brand">
          <img src="../assets/Logo.png" alt="Corpoilgas" class="auth-logo" /><br>
          <h2>Panel de Administración</h2>
        </div>
        <div class="auth-body">
          <h3>Iniciar sesión</h3>
          <p class="subtitle">Acceso exclusivo para operadores</p>
          <input class="input" placeholder="Correo electrónico" type="email" value="admin@corpoilgas.com" />
          <input class="input" placeholder="Contraseña" type="password" value="••••••••" />
          <button class="btn btn-primary" data-action="login">Entrar</button>
        </div>
      </div>
    </div>`;
}

function renderDashboard() {
  const counts = getCategoryCounts();
  const filtered = getFilteredOrders();

  const categories = [
    { key: "PENDING_ACTION", label: "Acción requerida", icon: "⚠️", highlight: true },
    { key: "ALL", label: "Todos los pedidos", icon: "📥" },
    { key: "CREATED", label: "Creados", icon: "📋" },
    { key: "ASSIGNED", label: "Asignados", icon: "🚛" },
    { key: "IN_TRANSIT", label: "En tránsito", icon: "🛣️" },
    { key: "ARRIVED", label: "En sitio", icon: "📍" },
    { key: "PUMPING", label: "Bombeando", icon: "⛽" },
    { key: "COMPLETED", label: "Completados", icon: "🏁" },
    { key: "CANCELLED", label: "Cancelados", icon: "❌" },
  ];

  app.innerHTML = `
    <div class="shell">
      <div class="top-header">
        <div class="top-header-left">
          <img src="../assets/Logo.png" alt="Corpoilgas" />
          <span class="badge-demo">ADMIN</span>
        </div>
        <div class="top-header-right"></div>
      </div>
      <div class="shell-body">
      <aside class="sidebar">
        <div class="sidebar-sections">
          <div class="sidebar-section-label" data-action="toggle-sidebar">${state.sidebarOpen ? "▾" : "▸"} Pedidos</div>
          <div class="sidebar-categories" style="${state.sidebarOpen ? "" : "display:none"}">
            ${categories.map(c => `
              <div class="cat-item ${state.category === c.key ? "active" : ""} ${c.highlight ? "highlight" : ""}" data-action="category" data-key="${c.key}">
                <span class="cat-icon">${c.icon}</span>
                <span>${c.label}</span>
                ${counts[c.key] ? `<span class="cat-count">${counts[c.key]}</span>` : ""}
              </div>
            `).join("")}
          </div>
          <div class="sidebar-section-label" data-action="toggle-flotilla">${state.flotillaOpen ? "▾" : "▸"} Flotilla</div>
          <div class="sidebar-categories" style="${state.flotillaOpen ? "" : "display:none"}">
            <div class="cat-item"><span class="cat-icon">🚛</span><span>Camiones activos</span></div>
            <div class="cat-item"><span class="cat-icon">👷</span><span>Conductores</span></div>
            <div class="cat-item"><span class="cat-icon">🔧</span><span>Mantenimiento</span></div>
          </div>
          <div class="sidebar-section-label" data-action="toggle-clientes">${state.clientesOpen ? "▾" : "▸"} Clientes</div>
          <div class="sidebar-categories" style="${state.clientesOpen ? "" : "display:none"}">
            <div class="cat-item"><span class="cat-icon">👥</span><span>Todos</span></div>
            <div class="cat-item"><span class="cat-icon">🏢</span><span>Empresariales</span></div>
            <div class="cat-item"><span class="cat-icon">🏠</span><span>Residenciales</span></div>
            <div class="cat-item"><span class="cat-icon">📄</span><span>Convenios</span></div>
          </div>
          <div class="sidebar-section-label" data-action="toggle-metricas">${state.metricasOpen ? "▾" : "▸"} Métricas</div>
          <div class="sidebar-categories" style="${state.metricasOpen ? "" : "display:none"}">
            <div class="cat-item"><span class="cat-icon">📊</span><span>Ventas del día</span></div>
            <div class="cat-item"><span class="cat-icon">📈</span><span>Litros despachados</span></div>
            <div class="cat-item"><span class="cat-icon">💰</span><span>Ingresos</span></div>
            <div class="cat-item"><span class="cat-icon">⭐</span><span>Calificaciones</span></div>
          </div>
          <div class="sidebar-section-label" data-action="toggle-tickets">${state.ticketsOpen ? "▾" : "▸"} Tickets</div>
          <div class="sidebar-categories" style="${state.ticketsOpen ? "" : "display:none"}">
            <div class="cat-item"><span class="cat-icon">🎫</span><span>Abiertos</span></div>
            <div class="cat-item"><span class="cat-icon">⏳</span><span>En proceso</span></div>
            <div class="cat-item"><span class="cat-icon">✅</span><span>Resueltos</span></div>
          </div>
        </div>
        <div class="sidebar-footer">
          <div class="user-info" data-action="logout">
            <div class="avatar">👤</div>
            <div><strong>Administrador</strong><br><span style="font-size:11px">Cerrar sesión</span></div>
          </div>
        </div>
      </aside>

      <div class="main">
        <div class="content">
          <div class="panel-list">
            <div class="toolbar">
              <div class="search-box">
                <span class="search-icon">🔍</span>
                <input placeholder="Buscar pedido, cliente..." value="${state.searchQuery}" data-action="search" />
              </div>
              <div class="toolbar-row">
                <select class="sort-select" data-action="sort-select">
                  <option value="date_desc" ${state.sortBy === "date_desc" ? "selected" : ""}>Recientes</option>
                  <option value="date_asc" ${state.sortBy === "date_asc" ? "selected" : ""}>Antiguos</option>
                  <option value="amount_desc" ${state.sortBy === "amount_desc" ? "selected" : ""}>Monto</option>
                  <option value="client" ${state.sortBy === "client" ? "selected" : ""}>Cliente</option>
                </select>
                <div class="filter-wrap">
                  <button class="toolbar-btn ${state.showFilters ? "active" : ""}" data-action="toggle-filters">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg>
                  </button>
                  <div class="filter-dropdown ${state.showFilters ? "open" : ""}">
                    <label>Conductor</label>
                    <select data-action="filter-driver">
                      <option value="">Todos</option>
                      ${DRIVERS.map(d => `<option value="${d.name}" ${state.filterDriver === d.name ? "selected" : ""}>${d.name}</option>`).join("")}
                    </select>
                    <label>Método de pago</label>
                    <select data-action="filter-pay">
                      <option value="">Todos</option>
                      <option value="tarjeta" ${state.filterPay === "tarjeta" ? "selected" : ""}>Tarjeta</option>
                      <option value="efectivo" ${state.filterPay === "efectivo" ? "selected" : ""}>Efectivo</option>
                      <option value="crédito" ${state.filterPay === "crédito" ? "selected" : ""}>Crédito B2B</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
            <div class="order-list">
              ${filtered.length === 0 ? `<div style="padding:40px 16px;text-align:center;color:var(--gray-600)">No hay pedidos en esta categoría</div>` : ""}
              ${filtered.map(o => renderOrderItem(o)).join("")}
            </div>
          </div>
          <div class="panel-detail">
            ${state.selectedOrder !== null ? renderDetail(orders[state.selectedOrder]) : renderEmpty()}
          </div>
        </div>
      </div>
      </div>
    </div>`;
}

function renderOrderItem(o) {
  const idx = orders.indexOf(o);
  const isSelected = state.selectedOrder === idx;
  const info = getStateInfo(o.status);
  const lastTime = o.history[o.history.length - 1]?.time || "";

  return `
    <div class="order-item ${isSelected ? "selected" : ""} ${o.unread ? "unread" : ""}" data-action="select" data-idx="${idx}">
      <div class="order-item-top">
        <span class="order-id">${o.id} · ${o.client}</span>
        <span class="order-time">${lastTime}</span>
      </div>
      <div class="order-item-body">
        <div>
          <div class="order-preview">${o.needsAction ? "⚠️ " : ""}${o.description.substring(0, 60)}...</div>
        </div>
        <div style="text-align:right">
          <span class="order-status-badge ${getStatusClass(o.status)}">${info.icon} ${info.label}</span>
          <div class="order-amount" style="margin-top:4px">${mxn(o.realCost || o.estimatedCost)}</div>
        </div>
      </div>
    </div>`;
}

function renderEmpty() {
  return `
    <div class="detail-empty">
      <div class="icon">📋</div>
      <h3>Selecciona un pedido</h3>
      <p>Haz clic en un pedido de la lista para ver su detalle.</p>
    </div>`;
}

function renderDetail(o) {
  const info = getStateInfo(o.status);
  return `
    <div class="detail-header">
      <h2>Pedido ${o.id}</h2>
      <span class="order-status-badge ${getStatusClass(o.status)}">${info.icon} ${info.label}</span>
    </div>

    ${o.needsAction ? `
      <div class="action-banner">
        <span class="icon">⚠️</span>
        <span class="text"><strong>Acción requerida:</strong> Este pedido necesita asignación de conductor y camión.</span>
        <button class="btn-action" data-action="assign-driver" data-idx="${orders.indexOf(o)}">Asignar conductor</button>
      </div>
    ` : ""}

    <div class="detail-card">
      <h3>📦 Información del pedido</h3>
      <div class="detail-row"><span class="label">Cliente</span><span class="value">${o.client}</span></div>
      <div class="detail-row"><span class="label">Teléfono</span><span class="value">${o.phone}</span></div>
      <div class="detail-row"><span class="label">Dirección</span><span class="value">${o.address}</span></div>
      <div class="detail-row"><span class="label">Tanque</span><span class="value">${o.tankType}</span></div>
      <div class="detail-row"><span class="label">Litros estimados</span><span class="value">${o.estimatedLiters} L</span></div>
      <div class="detail-row"><span class="label">Costo estimado</span><span class="value">${mxn(o.estimatedCost)}</span></div>
      ${o.realLiters ? `<div class="detail-row"><span class="label">Litros reales</span><span class="value">${o.realLiters} L</span></div>` : ""}
      ${o.realCost ? `<div class="detail-row"><span class="label">Cobro final</span><span class="value">${mxn(o.realCost)}</span></div>` : ""}
      <div class="detail-row"><span class="label">Método de pago</span><span class="value">${o.payMethod}</span></div>
    </div>

    <div class="detail-card">
      <h3>🚛 Conductor y vehículo</h3>
      ${o.driver ? `
        <div class="detail-row"><span class="label">Conductor</span><span class="value">${o.driver}</span></div>
        <div class="detail-row"><span class="label">Camión</span><span class="value">${o.truck}</span></div>
      ` : `
        <div class="detail-row"><span class="label">Conductor</span><span class="value" style="color:var(--warning)">⚠️ Sin asignar</span></div>
      `}
      <div class="detail-row"><span class="label">Fecha de entrega</span><span class="value">${o.deliveryDate}</span></div>
    </div>

    <div class="detail-card">
      <h3>📍 Seguimiento de estados</h3>
      <div class="tracker">
        ${renderTracker(o)}
      </div>
    </div>

    <div class="detail-card">
      <h3>📝 Descripción</h3>
      <div class="detail-description">${o.description}</div>
    </div>`;
}

function renderTracker(o) {
  return o.history.map((h, i) => {
    const s = getStateInfo(h.state);
    const isLast = i === o.history.length - 1;
    const cls = isLast ? "active" : "done";
    return `
      <div class="tracker-step ${cls}">
        <div class="tracker-dot">${cls === "done" ? "✓" : s.icon}</div>
        <div class="tracker-info">
          <div class="tracker-label">${s.label}</div>
          <div class="tracker-time">${h.time} hrs</div>
        </div>
      </div>`;
  }).join("");
}

// === EVENTS ===
document.addEventListener("click", (e) => {
  const t = e.target.closest("[data-action]");
  if (!t) return;
  const a = t.dataset.action;

  if (a === "login") { state.screen = "dashboard"; render(); }
  if (a === "logout") { state.screen = "login"; state.selectedOrder = null; render(); }
  if (a === "select") { state.selectedOrder = parseInt(t.dataset.idx); render(); }
  if (a === "category") { state.category = t.dataset.key; state.selectedOrder = null; render(); }
  if (a === "toggle-filters") { state.showFilters = !state.showFilters; render(); }
  if (a === "toggle-sidebar") { state.sidebarOpen = !state.sidebarOpen; render(); }
  if (a === "toggle-flotilla") { state.flotillaOpen = !state.flotillaOpen; render(); }
  if (a === "toggle-clientes") { state.clientesOpen = !state.clientesOpen; render(); }
  if (a === "toggle-metricas") { state.metricasOpen = !state.metricasOpen; render(); }
  if (a === "toggle-tickets") { state.ticketsOpen = !state.ticketsOpen; render(); }

  if (a === "assign-driver") {
    const idx = parseInt(t.dataset.idx);
    const driver = DRIVERS[Math.floor(Math.random() * DRIVERS.length)];
    orders[idx].driver = driver.name;
    orders[idx].truck = driver.truck;
    orders[idx].needsAction = false;
    orders[idx].status = "ASSIGNED";
    orders[idx].history.push({ state: "ASSIGNED", time: "11:45" });
    orders[idx].description = `Conductor ${driver.name} asignado. Camión ${driver.truck}. Pendiente de iniciar ruta.`;
    render();
  }
});

document.addEventListener("input", (e) => {
  if (e.target.closest("[data-action='search']")) {
    state.searchQuery = e.target.value;
    state.selectedOrder = null;
    render();
  }
});

document.addEventListener("change", (e) => {
  if (e.target.closest("[data-action='sort-select']")) {
    state.sortBy = e.target.value;
    render();
  }
  if (e.target.closest("[data-action='filter-driver']")) {
    state.filterDriver = e.target.value;
    state.selectedOrder = null;
    render();
  }
  if (e.target.closest("[data-action='filter-pay']")) {
    state.filterPay = e.target.value;
    state.selectedOrder = null;
    render();
  }
});

render();
