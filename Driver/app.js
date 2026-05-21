// === CORPOILGAS REPARTIDOR — Demo alineado a máquina de estados ===

const mockData = {
  driver: { name: "Julio Ramírez", id: "DRV-042", plate: "CDMX-482-A", vehicle: "Camión cisterna 3,000L", phone: "+52 55 9876 5432", rating: 4.8, trips: 342, zone: "Polanco / Condesa / Roma" },
  tank: { capacity: 3000, current: 2450 },
  pricePerLiter: 12.5,
  orders: [
    { id: "#4821", status: "ASSIGNED", client: "María González", phone: "+52 55 1234 5678", address: "Av. Masaryk 111, Polanco", lat: 19.432, lng: -99.19, tankType: "Estacionario 300L", payMethod: "Tarjeta (pre-auth)", requestedAmount: 500, estimatedLiters: 40, deliveryNotes: "Portón negro, tocar timbre 2 veces", generalNotes: "Recibe mi esposa María", scheduledWindow: "10:00 - 12:00", distance: "2.3 km", eta: "8 min" },
    { id: "#4822", status: "ASSIGNED", client: "Roberto Sánchez", phone: "+52 55 8765 4321", address: "Av. Amsterdam 75, Condesa", lat: 19.41, lng: -99.17, tankType: "Cilindro 45kg", payMethod: "Efectivo", requestedAmount: 625, estimatedLiters: 50, deliveryNotes: "Casa azul esquina", generalNotes: "", scheduledWindow: "10:00 - 12:00", distance: "4.1 km", eta: "15 min" },
    { id: "#4823", status: "ASSIGNED", client: "Taquería Don Juan (B2B)", phone: "+52 55 5555 1234", address: "Insurgentes Sur 1420, Del Valle", lat: 19.38, lng: -99.18, tankType: "Estacionario 1000L", payMethod: "Crédito B2B (Contrato #C-089)", requestedAmount: 5000, estimatedLiters: 400, deliveryNotes: "Entrada por estacionamiento trasero", generalNotes: "Pedido recurrente semanal", scheduledWindow: "11:00 - 13:00", distance: "6.8 km", eta: "22 min" },
  ],
  completedToday: [
    { id: "#4818", client: "Ana López", litersReal: 35.2, total: 440, time: "08:45", address: "Reforma 222" },
    { id: "#4819", client: "Carlos Méndez", litersReal: 28.0, total: 350, time: "09:20", address: "Chapultepec 50" },
  ]
};

const state = {
  screen: "login",
  activeTab: "orders",
  online: true,
  // Orden activa
  activeOrderIdx: null,
  orderPhase: null, // ASSIGNED, ACCEPTED, IN_TRANSIT, ARRIVED, INSPECTING, PUMPING, DELIVERED, UPLOADING_PROOF
  // Inspección
  inspection: [false, false, false, false, false],
  inspectionResult: null, // 'pass' | 'fail'
  inspectionNote: "",
  // Bombeo
  pumpLiters: 0,
  pumpTarget: 0,
  pumpInterval: null,
  // Entrega
  litersReal: 0,
  // Evidencia
  photoTaken: false,
  // Stats del día
  todayDeliveries: 2,
  todayLiters: 63.2,
  todayEarnings: 790,
};

const inspectionItems = [
  "Tanque con vigencia (no caducado)",
  "Sin fugas detectadas (olor/sonido)",
  "Acceso físico libre al tanque",
  "Válvula en buen estado",
  "Entorno seguro (sin fuentes de ignición)"
];

const app = document.getElementById("app");
const mxn = (n) => new Intl.NumberFormat("es-MX", { style: "currency", currency: "MXN" }).format(n);

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
function getActiveOrder() { return state.activeOrderIdx !== null ? mockData.orders[state.activeOrderIdx] : null; }


// === PANTALLAS ===

function renderLogin() {
  hideChrome();
  app.innerHTML = `
    <section class="auth-screen">
      <div class="auth-brand">
        <img src="../assets/Logo.png" alt="Corpoilgas" class="auth-logo" />
      </div>
      <h2>Portal Repartidor</h2>
      <p class="screen-subtitle">Inicia sesión con tus credenciales de operador</p>
      <div class="auth-form">
        <input class="input" placeholder="ID de operador (ej: DRV-042)" />
        <input class="input" placeholder="Contraseña" type="password" />
        <button class="btn btn-primary" data-action="do-login">Iniciar turno</button>
      </div>
    </section>`;
}

function renderOrders() {
  showChrome();
  const pending = mockData.orders.filter(o => o.status === "ASSIGNED");
  app.innerHTML = `
    <section>
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px">
        <h2 class="screen-title" style="margin:0">Mis órdenes</h2>
        <div class="toggle ${state.online ? 'on' : ''}" data-action="toggle-online"></div>
      </div>
      <p class="screen-subtitle">${pending.length} pendientes · ${state.online ? '🟢 En línea' : '🔴 Fuera de línea'}</p>

      ${pending.length === 0 ? `
        <div class="empty-state">
          <div class="empty-icon">📭</div>
          <p class="empty-text">No tienes órdenes asignadas.<br>Espera nuevas asignaciones.</p>
        </div>
      ` : pending.map((o, i) => `
        <div class="order-card" data-action="view-order" data-idx="${i}">
          <div class="order-card-header">
            <span class="order-id">${o.id}</span>
            <span class="order-badge pending">${o.scheduledWindow}</span>
          </div>
          <div class="order-card-body">
            <div class="order-card-row">👤 <strong>${o.client}</strong></div>
            <div class="order-card-row">📍 ${o.address}</div>
            <div class="order-card-row">🛢️ ${o.tankType} · ${o.payMethod.split('(')[0]}</div>
            <div class="order-card-row">📏 ${o.distance} · ⏱️ ${o.eta}</div>
            <div class="order-amount">≈ ${o.estimatedLiters}L · ${mxn(o.requestedAmount)}</div>
          </div>
        </div>
      `).join("")}
    </section>`;
}


function renderOrderDetail() {
  showChrome();
  const o = getActiveOrder();
  if (!o) { state.screen = "orders"; render(); return; }

  const phases = ["ASSIGNED","ACCEPTED","IN_TRANSIT","ARRIVED","INSPECTING","PUMPING","DELIVERED","UPLOADING_PROOF"];
  const phaseIdx = phases.indexOf(state.orderPhase);

  app.innerHTML = `
    <section>
      <button class="btn btn-secondary btn-sm" data-action="back-orders" style="width:auto;margin-bottom:12px">← Volver</button>

      <div class="order-card-header">
        <span class="order-id">${o.id}</span>
        <span class="order-badge ${phaseIdx > 0 ? 'active' : 'pending'}">${state.orderPhase}</span>
      </div>

      <div class="status-bar">
        ${phases.slice(0,7).map((p, i) => `
          <div class="status-dot ${i < phaseIdx ? 'done' : i === phaseIdx ? 'active' : ''}"></div>
          ${i < 6 ? `<div class="status-line ${i < phaseIdx ? 'done' : ''}"></div>` : ''}
        `).join("")}
      </div>

      <div class="card">
        <div class="card-header">👤 Cliente</div>
        <div class="detail-row"><span>Nombre</span><strong>${o.client}</strong></div>
        <div class="detail-row"><span>Teléfono</span><strong>${o.phone}</strong></div>
        <div class="detail-row"><span>Dirección</span><strong>${o.address}</strong></div>
        <div class="detail-row"><span>Notas entrega</span><strong>${o.deliveryNotes || '—'}</strong></div>
        ${o.generalNotes ? `<div class="detail-row"><span>Notas generales</span><strong>${o.generalNotes}</strong></div>` : ''}
      </div>

      <div class="card">
        <div class="card-header">⛽ Servicio</div>
        <div class="detail-row"><span>Tanque</span><strong>${o.tankType}</strong></div>
        <div class="detail-row"><span>Litros estimados</span><strong>${o.estimatedLiters} L</strong></div>
        <div class="detail-row"><span>Monto estimado</span><strong>${mxn(o.requestedAmount)}</strong></div>
        <div class="detail-row"><span>Método pago</span><strong>${o.payMethod}</strong></div>
        <div class="detail-row"><span>Ventana</span><strong>${o.scheduledWindow}</strong></div>
      </div>

      ${state.orderPhase === "ASSIGNED" ? `
        <div class="action-section">
          <div class="btn-group">
            <button class="btn btn-success" data-action="accept-order">✓ Aceptar</button>
            <button class="btn btn-danger" data-action="reject-order">✕ Rechazar</button>
          </div>
        </div>
      ` : ''}

      ${state.orderPhase === "ACCEPTED" ? `
        <div class="action-section">
          <button class="btn btn-primary" data-action="start-transit">🚛 Iniciar ruta</button>
        </div>
      ` : ''}

      ${state.orderPhase === "IN_TRANSIT" ? `
        <div class="action-section">
          <div class="card info-card">
            <p style="font-size:13px">🗺️ Navegando a: <strong>${o.address}</strong></p>
            <p style="font-size:12px;color:#888;margin-top:4px">ETA: ${o.eta} · ${o.distance}</p>
          </div>
          <button class="btn btn-primary" data-action="arrive">📍 He llegado al punto</button>
        </div>
      ` : ''}

      ${state.orderPhase === "ARRIVED" ? `
        <div class="action-section">
          <button class="btn btn-primary" data-action="start-inspection">🔍 Iniciar inspección</button>
        </div>
      ` : ''}
    </section>`;
}


function renderInspection() {
  showChrome();
  const o = getActiveOrder();
  const allChecked = state.inspection.every(v => v);

  app.innerHTML = `
    <section>
      <h2 class="screen-title">Inspección de seguridad</h2>
      <p class="screen-subtitle">${o.id} · ${o.client} · ${o.tankType}</p>

      <div class="card warning-card">
        <p style="font-size:12px">⚠️ Verifica cada punto antes de conectar la manguera. Si algún punto falla, rechaza por seguridad.</p>
      </div>

      <ul class="checklist">
        ${inspectionItems.map((item, i) => `
          <li class="checklist-item ${state.inspection[i] ? 'checked' : ''}" data-action="toggle-check" data-idx="${i}">
            <div class="checklist-check">${state.inspection[i] ? '✓' : ''}</div>
            <span class="checklist-text">${item}</span>
          </li>
        `).join("")}
      </ul>

      ${allChecked ? `
        <div class="action-section">
          <button class="btn btn-success" data-action="inspection-pass">✓ Inspección aprobada — Iniciar bombeo</button>
        </div>
      ` : `
        <div class="action-section">
          <button class="btn btn-danger" data-action="inspection-fail">✕ Rechazar por seguridad</button>
          <p style="font-size:11px;color:#888;text-align:center;margin-top:8px">Marca todos los puntos para aprobar, o rechaza si hay riesgo</p>
        </div>
      `}
    </section>`;
}


function renderRejectedSafety() {
  showChrome();
  app.innerHTML = `
    <section>
      <h2 class="screen-title">Rechazo por seguridad</h2>
      <p class="screen-subtitle">Documenta el motivo del rechazo</p>

      <div class="card danger-card">
        <p style="font-size:13px">🚫 Esta orden será cancelada por riesgo de seguridad. El cliente será notificado.</p>
      </div>

      <label>Motivo del rechazo</label>
      <select class="input" id="rejectReason">
        <option value="">Selecciona...</option>
        <option>Tanque caducado / sin vigencia</option>
        <option>Fuga detectada en válvula</option>
        <option>Sin acceso físico al tanque</option>
        <option>Entorno inseguro (fuente de ignición)</option>
        <option>Cliente no presente / no autoriza</option>
        <option>Otro</option>
      </select>

      <label>Notas adicionales</label>
      <textarea class="input textarea" id="rejectNote" placeholder="Describe la situación..."></textarea>

      <label>Evidencia fotográfica</label>
      <div class="photo-upload" data-action="take-reject-photo">
        <div class="photo-upload-icon">📷</div>
        <p class="photo-upload-text">${state.photoTaken ? '✅ Foto capturada' : 'Toca para tomar foto del problema'}</p>
      </div>

      <div class="action-section">
        <button class="btn btn-danger" data-action="confirm-reject">Confirmar rechazo y enviar evidencia</button>
        <div style="height:8px"></div>
        <button class="btn btn-secondary" data-action="back-inspection">← Volver a inspección</button>
      </div>
    </section>`;
}


function renderPumping() {
  showChrome();
  const o = getActiveOrder();
  const pct = Math.min((state.pumpLiters / state.pumpTarget) * 100, 100);

  app.innerHTML = `
    <section>
      <h2 class="screen-title">Bombeo en curso</h2>
      <p class="screen-subtitle">${o.id} · ${o.client}</p>

      <div class="pump-display">
        <div class="pump-liters">${state.pumpLiters.toFixed(1)}</div>
        <div class="pump-unit">litros despachados</div>
        <div class="pump-progress">
          <div class="pump-progress-bar" style="width:${pct}%"></div>
        </div>
        <div class="pump-meta">Objetivo: ${state.pumpTarget} L · ${mxn(state.pumpLiters * mockData.pricePerLiter)} acumulado</div>
      </div>

      <div class="card">
        <div class="detail-row"><span>Precio/litro</span><strong>${mxn(mockData.pricePerLiter)}</strong></div>
        <div class="detail-row"><span>Tanque camión</span><strong>${mockData.tank.current - Math.round(state.pumpLiters)} / ${mockData.tank.capacity} L</strong></div>
        <div class="detail-row"><span>Método pago</span><strong>${o.payMethod}</strong></div>
      </div>

      <div class="action-section">
        <button class="btn btn-primary" data-action="stop-pump">⏹️ Detener bombeo — Tanque lleno / Límite</button>
      </div>
    </section>`;
}


function renderDelivered() {
  showChrome();
  const o = getActiveOrder();
  const total = state.litersReal * mockData.pricePerLiter;

  app.innerHTML = `
    <section>
      <h2 class="screen-title">Registro de entrega</h2>
      <p class="screen-subtitle">${o.id} · Válvula cerrada</p>

      <div class="card">
        <div class="card-header">⛽ Litros reales despachados</div>
        <div class="pump-display" style="padding:12px 0">
          <div class="pump-liters">${state.litersReal.toFixed(1)}</div>
          <div class="pump-unit">litros</div>
        </div>
        <div class="detail-row"><span>Cobro final</span><strong>${mxn(total)}</strong></div>
        <div class="detail-row"><span>Estimado original</span><strong>${mxn(o.requestedAmount)}</strong></div>
        <div class="detail-row"><span>Diferencia</span><strong>${mxn(total - o.requestedAmount)}</strong></div>
      </div>

      <div class="card">
        <div class="card-header">💰 Cierre financiero</div>
        <div class="detail-row"><span>Método</span><strong>${o.payMethod}</strong></div>
        ${o.payMethod.includes("Efectivo") ? `
          <div class="detail-row"><span>Cobrar al cliente</span><strong style="color:#f39c12;font-size:16px">${mxn(total)}</strong></div>
        ` : o.payMethod.includes("Tarjeta") ? `
          <div class="detail-row"><span>Cargo final a tarjeta</span><strong style="color:#2ecc71">Automático</strong></div>
        ` : `
          <div class="detail-row"><span>Cargo a cuenta B2B</span><strong style="color:#2ecc71">Registrado</strong></div>
        `}
      </div>

      <div class="action-section">
        <button class="btn btn-primary" data-action="go-upload-proof">📸 Subir evidencia (foto medidor/ticket)</button>
      </div>
    </section>`;
}

function renderUploadProof() {
  showChrome();
  const o = getActiveOrder();

  app.innerHTML = `
    <section>
      <h2 class="screen-title">Evidencia del servicio</h2>
      <p class="screen-subtitle">${o.id} · Foto del medidor y ticket</p>

      <label>Foto del medidor analógico</label>
      ${state.photoTaken ? `
        <div class="photo-preview">
          <div class="photo-preview-img">📸</div>
          <p style="font-size:12px;color:#2ecc71;margin-top:8px">✅ Foto capturada correctamente</p>
        </div>
      ` : `
        <div class="photo-upload" data-action="take-meter-photo">
          <div class="photo-upload-icon">📷</div>
          <p class="photo-upload-text">Toca para fotografiar el medidor</p>
        </div>
      `}

      <label>Comentario del servicio (opcional)</label>
      <textarea class="input textarea" id="serviceComment" placeholder="Ej: Recarga sin novedad, tanque en buen estado..."></textarea>

      <div class="card info-card" style="margin-top:12px">
        <p style="font-size:12px">✅ Al confirmar, el sistema validará la conciliación (litros vs cobro) y cerrará el pedido.</p>
      </div>

      <div class="action-section">
        <button class="btn btn-primary ${!state.photoTaken ? 'btn-secondary' : ''}" data-action="complete-order" ${!state.photoTaken ? 'disabled style="opacity:.5"' : ''}>Completar pedido</button>
      </div>
    </section>`;
}


function renderRoute() {
  showChrome();
  const pending = mockData.orders.filter(o => o.status === "ASSIGNED");
  app.innerHTML = `
    <section>
      <h2 class="screen-title">Mi ruta del día</h2>
      <p class="screen-subtitle">${pending.length + mockData.completedToday.length} paradas · ${pending.length} pendientes</p>

      <div class="section-label">Completadas</div>
      ${mockData.completedToday.map((o, i) => `
        <div class="route-item">
          <div class="route-number done">✓</div>
          <div class="route-info">
            <div class="route-address">${o.address}</div>
            <div class="route-meta">${o.client} · ${o.litersReal}L · ${mxn(o.total)}</div>
          </div>
          <span style="font-size:11px;color:#888">${o.time}</span>
        </div>
      `).join("")}

      <div class="section-label">Pendientes</div>
      ${pending.map((o, i) => `
        <div class="route-item" data-action="view-order" data-idx="${i}">
          <div class="route-number">${i + 1}</div>
          <div class="route-info">
            <div class="route-address">${o.address}</div>
            <div class="route-meta">${o.client} · ≈${o.estimatedLiters}L</div>
          </div>
          <span class="route-eta">${o.eta}</span>
        </div>
      `).join("")}
    </section>`;
}

function renderStats() {
  showChrome();
  const totalLiters = state.todayLiters;
  const totalEarnings = state.todayEarnings;

  app.innerHTML = `
    <section>
      <h2 class="screen-title">Mi día</h2>
      <p class="screen-subtitle">Resumen de tu turno actual</p>

      <div class="stats-grid">
        <div class="stat-card"><span class="stat-value">${state.todayDeliveries}</span><span class="stat-label">Entregas</span></div>
        <div class="stat-card"><span class="stat-value">${totalLiters.toFixed(0)}L</span><span class="stat-label">Litros despachados</span></div>
        <div class="stat-card"><span class="stat-value">${mxn(totalEarnings)}</span><span class="stat-label">Cobrado hoy</span></div>
        <div class="stat-card"><span class="stat-value">${mockData.tank.current}L</span><span class="stat-label">Tanque camión</span></div>
      </div>

      <div class="section-label">Entregas completadas</div>
      ${mockData.completedToday.map(o => `
        <div class="card" style="padding:10px 14px">
          <div class="detail-row"><span>${o.id} · ${o.client}</span><strong>${o.litersReal}L · ${mxn(o.total)}</strong></div>
        </div>
      `).join("")}

      <div class="section-label">Camión</div>
      <div class="card">
        <div class="detail-row"><span>Capacidad</span><strong>${mockData.tank.capacity} L</strong></div>
        <div class="detail-row"><span>Disponible</span><strong>${mockData.tank.current} L</strong></div>
        <div class="pump-progress" style="margin:8px 0 0">
          <div class="pump-progress-bar" style="width:${(mockData.tank.current/mockData.tank.capacity)*100}%"></div>
        </div>
      </div>
    </section>`;
}

function renderProfile() {
  showChrome();
  const d = mockData.driver;
  app.innerHTML = `
    <section>
      <div class="profile-header">
        <div class="profile-avatar">🧑‍🔧</div>
        <div>
          <div class="profile-name">${d.name}</div>
          <div class="profile-role">Operador · ${d.id}</div>
        </div>
      </div>

      <div class="stats-grid">
        <div class="stat-card"><span class="stat-value">⭐ ${d.rating}</span><span class="stat-label">Calificación</span></div>
        <div class="stat-card"><span class="stat-value">${d.trips}</span><span class="stat-label">Servicios</span></div>
      </div>

      <div class="section-label">Información</div>
      <div class="profile-field"><span class="field-icon">🚛</span><div><div class="field-label">Vehículo</div><div class="field-value">${d.vehicle}</div></div></div>
      <div class="profile-field"><span class="field-icon">🔢</span><div><div class="field-label">Placa</div><div class="field-value">${d.plate}</div></div></div>
      <div class="profile-field"><span class="field-icon">📱</span><div><div class="field-label">Teléfono</div><div class="field-value">${d.phone}</div></div></div>
      <div class="profile-field"><span class="field-icon">📍</span><div><div class="field-label">Zona</div><div class="field-value">${d.zone}</div></div></div>

      <div class="section-label">Turno</div>
      <div class="toggle-row">
        <span class="toggle-label">Disponible para órdenes</span>
        <div class="toggle ${state.online ? 'on' : ''}" data-action="toggle-online"></div>
      </div>

      <div style="height:16px"></div>
      <button class="btn btn-secondary" data-action="logout">Cerrar turno</button>
    </section>`;
}


// === RENDER PRINCIPAL ===

function render() {
  const screens = {
    login: renderLogin,
    orders: renderOrders,
    orderDetail: renderOrderDetail,
    inspection: renderInspection,
    rejectedSafety: renderRejectedSafety,
    pumping: renderPumping,
    delivered: renderDelivered,
    uploadProof: renderUploadProof,
    route: renderRoute,
    stats: renderStats,
    profile: renderProfile,
  };
  (screens[state.screen] || renderOrders)();
}

// === EVENTOS ===

document.addEventListener("click", (e) => {
  const t = e.target.closest("[data-action]");
  if (!t) return;
  const a = t.dataset.action;

  // Auth
  if (a === "do-login") { state.screen = "orders"; state.activeTab = "orders"; updateNav(); render(); }
  if (a === "logout") { state.screen = "login"; render(); }

  // Toggle online
  if (a === "toggle-online") { state.online = !state.online; render(); }

  // Ver orden
  if (a === "view-order") {
    state.activeOrderIdx = parseInt(t.dataset.idx);
    state.orderPhase = "ASSIGNED";
    state.screen = "orderDetail";
    render();
  }
  if (a === "back-orders") { state.activeOrderIdx = null; state.screen = "orders"; render(); }

  // Aceptar / Rechazar orden
  if (a === "accept-order") { state.orderPhase = "ACCEPTED"; render(); }
  if (a === "reject-order") {
    if (confirm("¿Rechazar esta orden? Se reasignará a otro operador.")) {
      mockData.orders.splice(state.activeOrderIdx, 1);
      state.activeOrderIdx = null;
      state.screen = "orders";
      render();
    }
  }

  // Tránsito
  if (a === "start-transit") { state.orderPhase = "IN_TRANSIT"; render(); }
  if (a === "arrive") { state.orderPhase = "ARRIVED"; render(); }

  // Inspección
  if (a === "start-inspection") { state.orderPhase = "INSPECTING"; state.inspection = [false,false,false,false,false]; state.screen = "inspection"; render(); }
  if (a === "toggle-check") { state.inspection[parseInt(t.dataset.idx)] = !state.inspection[parseInt(t.dataset.idx)]; render(); }
  if (a === "inspection-pass") {
    state.orderPhase = "PUMPING";
    state.pumpTarget = getActiveOrder().estimatedLiters;
    state.pumpLiters = 0;
    state.screen = "pumping";
    startPump();
    render();
  }
  if (a === "inspection-fail") { state.photoTaken = false; state.screen = "rejectedSafety"; render(); }
  if (a === "back-inspection") { state.screen = "inspection"; render(); }
  if (a === "take-reject-photo") { state.photoTaken = true; render(); }
  if (a === "confirm-reject") {
    const reason = document.getElementById("rejectReason")?.value;
    if (!reason) { alert("Selecciona un motivo"); return; }
    alert("🚫 Orden rechazada por seguridad.\nMotivo: " + reason + "\nEvidencia enviada al sistema.");
    mockData.orders.splice(state.activeOrderIdx, 1);
    state.activeOrderIdx = null;
    state.screen = "orders";
    state.photoTaken = false;
    render();
  }

  // Bombeo
  if (a === "stop-pump") { stopPump(); }

  // Entrega
  if (a === "go-upload-proof") { state.photoTaken = false; state.screen = "uploadProof"; render(); }
  if (a === "take-meter-photo") { state.photoTaken = true; render(); }
  if (a === "complete-order") {
    if (!state.photoTaken) return;
    const o = getActiveOrder();
    // Mover a completados
    mockData.completedToday.push({ id: o.id, client: o.client, litersReal: state.litersReal, total: Math.round(state.litersReal * mockData.pricePerLiter), time: new Date().toLocaleTimeString("es-MX", {hour:"2-digit",minute:"2-digit"}), address: o.address.split(",")[0] });
    state.todayDeliveries++;
    state.todayLiters += state.litersReal;
    state.todayEarnings += Math.round(state.litersReal * mockData.pricePerLiter);
    mockData.tank.current -= Math.round(state.litersReal);
    mockData.orders.splice(state.activeOrderIdx, 1);
    alert("✅ Pedido " + o.id + " completado.\n" + state.litersReal.toFixed(1) + "L · " + mxn(state.litersReal * mockData.pricePerLiter));
    state.activeOrderIdx = null;
    state.screen = "orders";
    state.photoTaken = false;
    state.litersReal = 0;
    render();
  }
});

// === BOMBEO SIMULADO ===

function startPump() {
  state.pumpInterval = setInterval(() => {
    state.pumpLiters += 0.3 + Math.random() * 0.4;
    if (state.pumpLiters >= state.pumpTarget) {
      state.pumpLiters = state.pumpTarget;
      stopPump();
      return;
    }
    render();
  }, 200);
}

function stopPump() {
  if (state.pumpInterval) { clearInterval(state.pumpInterval); state.pumpInterval = null; }
  state.litersReal = Math.round(state.pumpLiters * 10) / 10;
  state.orderPhase = "DELIVERED";
  state.screen = "delivered";
  render();
}

// === NAV ===

function updateNav() {
  document.querySelectorAll("#bottomNav .nav-btn").forEach(b => {
    b.classList.toggle("active", b.dataset.tab === state.activeTab);
  });
}

document.getElementById("bottomNav").addEventListener("click", (e) => {
  const btn = e.target.closest(".nav-btn");
  if (!btn) return;
  state.activeTab = btn.dataset.tab;
  if (state.activeTab === "orders") state.screen = "orders";
  else if (state.activeTab === "route") state.screen = "route";
  else if (state.activeTab === "stats") state.screen = "stats";
  else if (state.activeTab === "profile") state.screen = "profile";
  state.activeOrderIdx = null;
  updateNav();
  render();
});

render();
