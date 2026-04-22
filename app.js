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
  // Ruta simulada en Polanco CDMX (bodega → destino)
  route: [
    [19.4260, -99.1760], [19.4268, -99.1752], [19.4275, -99.1743],
    [19.4283, -99.1735], [19.4290, -99.1728], [19.4298, -99.1720],
    [19.4305, -99.1713], [19.4312, -99.1705], [19.4320, -99.1698],
    [19.4328, -99.1690], [19.4335, -99.1683], [19.4340, -99.1678],
    [19.4348, -99.1672], [19.4355, -99.1665], [19.4360, -99.1660],
  ],
  dest: [19.4360, -99.1660],
};

const state = {
  screen: "selection",
  selectedProductId: "p20",
  subscriptionEnabled: false,
  address: mockData.addresses[0],
  paymentMethod: "Tarjeta",
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

const mxn = (amount) =>
  new Intl.NumberFormat("es-MX", { style: "currency", currency: "MXN" }).format(amount);

function getSelectedProduct() {
  return mockData.products.find((p) => p.id === state.selectedProductId);
}

function clearTrackingTimer() {
  if (state.trackingTimer) { clearInterval(state.trackingTimer); state.trackingTimer = null; }
}

function destroyMap() {
  if (map) { map.remove(); map = null; agentMarker = null; }
}

// --- SCREENS ---

function renderSelection() {
  const options = mockData.products
    .map(
      (product) => `
      <article class="card option-card ${state.selectedProductId === product.id ? "selected" : ""}"
        data-action="pick-product" data-id="${product.id}">
        <div>
          <h3 class="option-title">${product.name}</h3>
          <p class="option-copy">${product.copy}</p>
        </div>
        <span class="price">${mxn(product.price)}</span>
      </article>`
    )
    .join("");

  app.innerHTML = `
    <section>
      <div class="home-hero">
        <img src="./assets/images.jpeg" alt="Mascota Corpoilgas" class="mascot" />
        <div>
          <h2>Recibe tu pipeta<br>en minutos</h2>
          <p>Entrega segura a domicilio</p>
        </div>
      </div>
      <h2 class="screen-title">Pide tu gas</h2>
      <p class="screen-subtitle">Selecciona tu pipeta y confirma tu entrega.</p>
      ${options}
      <div class="subscription">
        <div>
          <strong>Suscripción mensual</strong>
          <p class="option-copy">Recibe gas automático cada 30 días.</p>
        </div>
        <button data-action="toggle-subscription">${state.subscriptionEnabled ? "✓ Activa" : "Activar"}</button>
      </div>
      <div style="height: 12px"></div>
      <button class="btn btn-primary" data-action="go-checkout">Continuar al checkout</button>
    </section>`;
}

function renderCheckout() {
  const product = getSelectedProduct();
  app.innerHTML = `
    <section>
      <h2 class="screen-title">Checkout</h2>
      <p class="screen-subtitle">Dirección de entrega y forma de pago.</p>
      <div class="card">
        <strong>Tu pedido</strong>
        <p class="option-copy">${product.name}</p>
        <p class="price">${mxn(product.price)}</p>
      </div>
      <label>Dirección</label>
      <input class="input" id="addressInput" value="${state.address}" />
      <label>Método de pago</label>
      <select class="input" id="paymentMethod">
        <option ${state.paymentMethod === "Tarjeta" ? "selected" : ""}>Tarjeta</option>
        <option ${state.paymentMethod === "Efectivo" ? "selected" : ""}>Efectivo</option>
      </select>
      <button class="btn btn-primary" data-action="place-order">Confirmar pedido</button>
      <div style="height: 8px"></div>
      <button class="btn btn-secondary" data-action="back-selection">Volver</button>
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
      </div>
    </section>`;

  initTrackingMap();
}

function renderSuccess() {
  const product = getSelectedProduct();
  app.innerHTML = `
    <section class="success">
      <div style="font-size: 48px;">✅</div>
      <h2>¡Entrega confirmada!</h2>
      <p class="screen-subtitle">Tu ${product.name} fue entregada con éxito.</p>
      <p><strong>Total:</strong> ${mxn(product.price)}</p>
      <button class="btn btn-primary" data-action="restart">Nuevo pedido</button>
    </section>`;
}

function render() {
  destroyMap();
  if (state.screen === "selection") return renderSelection();
  if (state.screen === "checkout") return renderCheckout();
  if (state.screen === "tracking") return renderTracking();
  return renderSuccess();
}

// --- MAP ---

function initTrackingMap() {
  const el = document.getElementById("trackingMap");
  if (!el) return;

  map = L.map(el, { zoomControl: false, attributionControl: false }).setView(mockData.route[0], 15);
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(map);

  // Ruta punteada
  L.polyline(mockData.route, { color: "#3B8DD4", weight: 4, dashArray: "8 6", opacity: 0.7 }).addTo(map);

  // Destino
  L.circleMarker(mockData.dest, { radius: 10, color: "#A51C1C", fillColor: "#A51C1C", fillOpacity: 0.25, weight: 2 }).addTo(map);
  L.marker(mockData.dest, {
    icon: L.divIcon({ className: "map-dest-icon", html: "🏠", iconSize: [26, 26], iconAnchor: [13, 13] }),
  }).addTo(map);

  // Repartidor
  const agentIcon = L.divIcon({ className: "map-agent-icon", html: "🚚", iconSize: [32, 32], iconAnchor: [16, 16] });
  agentMarker = L.marker(mockData.route[0], { icon: agentIcon }).addTo(map);

  // Encuadrar
  const bounds = L.latLngBounds(mockData.route);
  map.fitBounds(bounds, { padding: [30, 30] });

  startRouteAnimation();
}

function startRouteAnimation() {
  state.routeIdx = 0;
  clearTrackingTimer();

  state.trackingTimer = setInterval(() => {
    state.routeIdx++;
    if (state.routeIdx >= mockData.route.length) {
      clearTrackingTimer();
      state.screen = "success";
      render();
      return;
    }

    // Mover marcador
    agentMarker.setLatLng(mockData.route[state.routeIdx]);
    map.panTo(mockData.route[state.routeIdx], { animate: true, duration: 0.5 });

    // Actualizar progreso y paso
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

    const eta = Math.max(2, 12 - state.statusIndex * 4);
    const etaEl = document.querySelector(".tracking-eta");
    if (etaEl) etaEl.textContent = `Llega en ~${eta} min`;
  }, 1800);
}

// --- EVENTS ---

document.addEventListener("click", (event) => {
  const target = event.target.closest("[data-action]");
  if (!target) return;
  const action = target.dataset.action;

  if (action === "pick-product") {
    state.selectedProductId = target.dataset.id;
    render();
  }
  if (action === "toggle-subscription") {
    state.subscriptionEnabled = !state.subscriptionEnabled;
    render();
  }
  if (action === "go-checkout") {
    state.screen = "checkout";
    render();
  }
  if (action === "back-selection") {
    state.screen = "selection";
    render();
  }
  if (action === "place-order") {
    state.address = document.getElementById("addressInput").value;
    state.paymentMethod = document.getElementById("paymentMethod").value;
    state.screen = "tracking";
    state.statusIndex = 0;
    render();
  }
  if (action === "restart") {
    clearTrackingTimer();
    state.screen = "selection";
    state.statusIndex = 0;
    render();
  }
});

render();
