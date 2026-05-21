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

const trucks = [
  {
    id: "T-001", plate: "CDMX-482-A", type: "Cisterna", capacity: "3000L",
    status: "active", route: "Polanco – Condesa – Roma",
    drivers: ["Julio Ramírez", "Roberto Díaz"],
    trips: [
      { date: "19 may 2026", route: "Polanco – Condesa", liters: 580, orders: 3 },
      { date: "18 may 2026", route: "Roma – Del Valle", liters: 1200, orders: 5 },
      { date: "17 may 2026", route: "Polanco – Lomas", liters: 900, orders: 4 },
    ],
  },
  {
    id: "T-002", plate: "CDMX-319-B", type: "Cisterna", capacity: "5000L",
    status: "active", route: "Roma Norte – Del Valle – Portales",
    drivers: ["Carlos Méndez", "Julio Ramírez"],
    trips: [
      { date: "19 may 2026", route: "Roma Norte – Portales", liters: 1400, orders: 6 },
      { date: "18 may 2026", route: "Del Valle – Coyoacán", liters: 2100, orders: 8 },
      { date: "16 may 2026", route: "Narvarte – Portales", liters: 1800, orders: 7 },
    ],
  },
  {
    id: "T-003", plate: "CDMX-155-C", type: "Cisterna", capacity: "3000L",
    status: "maintenance", route: "Mixcoac – San Ángel – Coyoacán",
    drivers: ["Roberto Díaz"],
    trips: [
      { date: "15 may 2026", route: "Mixcoac – San Ángel", liters: 750, orders: 3 },
      { date: "14 may 2026", route: "Coyoacán – Tlalpan", liters: 1100, orders: 5 },
    ],
  },
  {
    id: "T-004", plate: "CDMX-601-D", type: "Cisterna", capacity: "4000L",
    status: "inactive", route: "Sin ruta asignada",
    drivers: [],
    trips: [],
  },
];

const drivers = [
  {
    id: "D-001", name: "Julio Ramírez", phone: "+52 55 1111 2222", license: "LIC-4821-CDMX",
    status: "active", availability: "en_ruta", rating: 4.8, totalTrips: 2840,
    trucks: ["CDMX-482-A", "CDMX-319-B"],
    trips: [
      { date: "19 may 2026", route: "Polanco – Condesa", liters: 580, orders: 3 },
      { date: "18 may 2026", route: "Roma – Del Valle", liters: 1200, orders: 5 },
      { date: "17 may 2026", route: "Polanco – Lomas", liters: 900, orders: 4 },
      { date: "16 may 2026", route: "Condesa – Narvarte", liters: 1050, orders: 4 },
      { date: "15 may 2026", route: "Polanco – Anzures", liters: 780, orders: 3 },
    ],
  },
  {
    id: "D-002", name: "Carlos Méndez", phone: "+52 55 3333 4444", license: "LIC-3190-CDMX",
    status: "active", availability: "disponible", rating: 4.6, totalTrips: 1560,
    trucks: ["CDMX-319-B"],
    trips: [
      { date: "19 may 2026", route: "Roma Norte – Portales", liters: 1400, orders: 6 },
      { date: "18 may 2026", route: "Del Valle – Coyoacán", liters: 2100, orders: 8 },
      { date: "17 may 2026", route: "Narvarte – Portales", liters: 1800, orders: 7 },
      { date: "16 may 2026", route: "Tlalpan – Xochimilco", liters: 1600, orders: 6 },
    ],
  },
  {
    id: "D-003", name: "Roberto Díaz", phone: "+52 55 5555 6666", license: "LIC-1550-CDMX",
    status: "active", availability: "incapacidad", rating: 4.3, totalTrips: 4210,
    trucks: ["CDMX-155-C", "CDMX-482-A"],
    trips: [
      { date: "15 may 2026", route: "Mixcoac – San Ángel", liters: 750, orders: 3 },
      { date: "14 may 2026", route: "Coyoacán – Tlalpan", liters: 1100, orders: 5 },
      { date: "13 may 2026", route: "San Ángel – Pedregal", liters: 920, orders: 4 },
    ],
  },
  {
    id: "D-004", name: "Fernando López", phone: "+52 55 7777 8888", license: "LIC-6010-CDMX",
    status: "active", availability: "disponible", rating: 4.9, totalTrips: 3650,
    trucks: ["CDMX-601-D"],
    trips: [
      { date: "19 may 2026", route: "Reforma – Juárez", liters: 1900, orders: 7 },
      { date: "18 may 2026", route: "Santa Fe – Lomas", liters: 2200, orders: 9 },
      { date: "17 may 2026", route: "Interlomas – Huixquilucan", liters: 1700, orders: 6 },
    ],
  },
  {
    id: "D-005", name: "Miguel Ángel Torres", phone: "+52 55 9999 0000", license: "LIC-2200-CDMX",
    status: "inactive", availability: "no_disponible", rating: 4.5, totalTrips: 2100,
    trucks: ["CDMX-319-B", "CDMX-155-C"],
    trips: [
      { date: "10 may 2026", route: "Condesa – Roma", liters: 850, orders: 4 },
      { date: "9 may 2026", route: "Del Valle – Narvarte", liters: 1100, orders: 5 },
    ],
  },
];

const sellers = [
  { id: "VND-042", name: "Laura Sánchez", phone: "+52 55 1010 2020", email: "laura.sanchez@corpoilgas.com", clients: 12, sales: 45 },
  { id: "VND-018", name: "Ricardo Gómez", phone: "+52 55 3030 4040", email: "ricardo.gomez@corpoilgas.com", clients: 8, sales: 32 },
  { id: "VND-055", name: "Patricia Ruiz", phone: "+52 55 5050 6060", email: "patricia.ruiz@corpoilgas.com", clients: 15, sales: 67 },
  { id: "VND-071", name: "Andrés Morales", phone: "+52 55 7070 8080", email: "andres.morales@corpoilgas.com", clients: 5, sales: 18 },
];

const tickets = [
  {
    id: "TK-001", type: "Cobro incorrecto", status: "abierta", priority: "alta",
    client: "María González", orderId: "#4820", date: "18 may 2026",
    description: "La clienta reporta que se le cobró más de lo que indica el ticket impreso. Solicita revisión del cargo a su tarjeta.",
    notes: [
      { date: "18 may, 14:50", author: "Sistema", text: "Ticket creado automáticamente por reporte del cliente." },
      { date: "18 may, 15:10", author: "Admin", text: "Se solicitó foto del ticket impreso al conductor Julio Ramírez." },
    ],
  },
  {
    id: "TK-002", type: "No llegó el gas", status: "en_proceso", priority: "alta",
    client: "Ana López", orderId: "#4817", date: "19 may 2026",
    description: "La clienta indica que su pedido fue marcado como asignado pero nadie se presentó en la ventana de entrega programada.",
    notes: [
      { date: "19 may, 11:30", author: "Sistema", text: "Ticket creado. Pedido #4817 sin conductor asignado en ventana 14:00–16:00." },
      { date: "19 may, 11:45", author: "Admin", text: "Se contactó a la clienta para reprogramar entrega." },
      { date: "19 may, 12:00", author: "Admin", text: "Reprogramado para mañana 10:00–12:00. Se asignará conductor prioritario." },
    ],
  },
  {
    id: "TK-003", type: "Fuga detectada", status: "abierta", priority: "urgente",
    client: "Pedro Martínez", orderId: "#4816", date: "19 may 2026",
    description: "El operador reportó olor a gas después de la recarga. Se requiere inspección de seguridad urgente en el domicilio.",
    notes: [
      { date: "19 may, 11:00", author: "Roberto Díaz", text: "Reporto olor a gas al cerrar válvula. Posible fuga en conexión del tanque." },
      { date: "19 may, 11:05", author: "Sistema", text: "Ticket de seguridad creado con prioridad URGENTE." },
    ],
  },
  {
    id: "TK-004", type: "Tanque caducado", status: "resuelta", priority: "media",
    client: "Jorge Hernández", orderId: "#4818", date: "17 may 2026",
    description: "Se detectó que el tanque del cliente tiene la verificación vencida. Se informó al cliente y se programó cambio de tanque.",
    notes: [
      { date: "17 may, 09:00", author: "Carlos Méndez", text: "Tanque cilindro con fecha de verificación vencida (mar 2025). No se realizó recarga." },
      { date: "17 may, 09:15", author: "Admin", text: "Se contactó al cliente. Acepta cambio de tanque." },
      { date: "17 may, 14:00", author: "Admin", text: "Tanque reemplazado. Recarga realizada con normalidad. Ticket cerrado." },
    ],
  },
  {
    id: "TK-005", type: "Cobro incorrecto", status: "resuelta", priority: "media",
    client: "Restaurante El Fogón S.A.", orderId: "#4819", date: "16 may 2026",
    description: "Diferencia entre litros registrados y factura emitida. Se ajustó el cargo en la cuenta corriente del convenio.",
    notes: [
      { date: "16 may, 10:00", author: "Sistema", text: "Discrepancia detectada: factura por 210L, medidor registró 200L." },
      { date: "16 may, 11:30", author: "Admin", text: "Revisión de evidencia fotográfica confirma 200L. Se ajusta factura." },
      { date: "16 may, 12:00", author: "Admin", text: "Nota de crédito emitida. Cliente notificado. Ticket cerrado." },
    ],
  },
];

const clients = [
  {
    id: "CLI-001", name: "María González", type: "residencial", phone: "+52 55 1234 5678",
    email: "maria.gonzalez@email.com", address: "Av. Masaryk 111, Polanco, CDMX",
    tankType: "Estacionario 300L", seller: "VND-042",
    businessName: null, rfc: null, convenio: null, creditLine: null,
  },
  {
    id: "CLI-002", name: "Restaurante El Fogón S.A.", type: "empresarial", phone: "+52 55 9876 5432",
    email: "admin@elfogon.mx", address: "Calle Durango 205, Roma Norte, CDMX",
    tankType: "Estacionario 1000L", seller: "VND-055",
    businessName: "Restaurante El Fogón S.A. de C.V.", rfc: "REF180523AB1", convenio: "C-087", creditLine: 15000,
  },
  {
    id: "CLI-003", name: "Jorge Hernández", type: "residencial", phone: "+52 55 5555 1234",
    email: "jorge.h@gmail.com", address: "Calle Ámsterdam 75, Condesa, CDMX",
    tankType: "Cilindro 45kg", seller: "VND-018",
    businessName: null, rfc: null, convenio: null, creditLine: null,
  },
  {
    id: "CLI-004", name: "Hotel Reforma S.A.", type: "empresarial", phone: "+52 55 8888 1111",
    email: "compras@hotelreforma.mx", address: "Paseo de la Reforma 500, Juárez, CDMX",
    tankType: "Estacionario 2000L", seller: "VND-042",
    businessName: "Operadora Hotel Reforma S.A. de C.V.", rfc: "OHR200115QW3", convenio: "C-102", creditLine: 50000,
  },
  {
    id: "CLI-005", name: "Ana López", type: "residencial", phone: "+52 55 4321 8765",
    email: "ana.lopez@outlook.com", address: "Insurgentes Sur 1602, Crédito Constructor, CDMX",
    tankType: "Estacionario 200L", seller: "VND-071",
    businessName: null, rfc: null, convenio: null, creditLine: null,
  },
  {
    id: "CLI-006", name: "Tacos Don Pepe S.A.", type: "empresarial", phone: "+52 55 6666 9999",
    email: "contabilidad@tacosdonpepe.mx", address: "Av. Universidad 800, Del Valle, CDMX",
    tankType: "Estacionario 500L", seller: "VND-055",
    businessName: "Tacos Don Pepe S.A. de C.V.", rfc: "TDP150812KL9", convenio: "C-045", creditLine: 25000,
  },
  {
    id: "CLI-007", name: "Pedro Martínez", type: "residencial", phone: "+52 55 7777 3333",
    email: "pedro.mtz@yahoo.com", address: "Av. Revolución 450, Mixcoac, CDMX",
    tankType: "Estacionario 500L", seller: "VND-018",
    businessName: null, rfc: null, convenio: null, creditLine: null,
  },
];

const state = {
  screen: "login",
  view: "pedidos",
  selectedOrder: null,
  selectedTruck: null,
  truckModal: null,
  editingTruck: null,
  truckFilter: "",
  truckSearch: "",
  selectedDriver: null,
  driverModal: null,
  editingDriver: null,
  driverFilter: "",
  driverSearch: "",
  selectedSeller: null,
  selectedSellers: [],
  sellerModal: null,
  editingSeller: null,
  sellerSearch: "",
  selectedClient: null,
  clientModal: null,
  editingClient: null,
  clientFilter: "",
  clientSearch: "",
  selectedTicket: null,
  pqrsFilter: "",
  category: "PENDING_ACTION",
  sortBy: "date_desc",
  searchQuery: "",
  showFilters: false,
  filterDriver: "",
  filterPay: "",
  sidebarOpen: true,
  flotillaOpen: false,
  vendedoresOpen: false,
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
              <div class="cat-item ${state.view === "pedidos" && state.category === c.key ? "active" : ""} ${c.highlight ? "highlight" : ""}" data-action="category" data-key="${c.key}">
                <span class="cat-icon">${c.icon}</span>
                <span>${c.label}</span>
                ${counts[c.key] ? `<span class="cat-count">${counts[c.key]}</span>` : ""}
              </div>
            `).join("")}
          </div>
          <div class="sidebar-section-label" data-action="toggle-flotilla">${state.flotillaOpen ? "▾" : "▸"} Flotilla</div>
          <div class="sidebar-categories" style="${state.flotillaOpen ? "" : "display:none"}">
            <div class="cat-item ${state.view === "camiones" ? "active" : ""}" data-action="nav-view" data-view="camiones"><span>Camiones</span></div>
            <div class="cat-item ${state.view === "conductores" ? "active" : ""}" data-action="nav-view" data-view="conductores"><span>Conductores</span></div>
          </div>
          <div class="sidebar-section-label" data-action="toggle-vendedores">${state.vendedoresOpen ? "▾" : "▸"} Vendedores</div>
          <div class="sidebar-categories" style="${state.vendedoresOpen ? "" : "display:none"}">
            <div class="cat-item ${state.view === "vendedores" ? "active" : ""}" data-action="nav-view" data-view="vendedores"><span>Vendedores</span></div>
          </div>
          <div class="sidebar-section-label" data-action="toggle-clientes">${state.clientesOpen ? "▾" : "▸"} Clientes</div>
          <div class="sidebar-categories" style="${state.clientesOpen ? "" : "display:none"}">
            <div class="cat-item ${state.view === "clientes" && !state.clientFilter ? "active" : ""}" data-action="nav-clients" data-filter=""><span>Todos</span></div>
            <div class="cat-item ${state.view === "clientes" && state.clientFilter === "empresarial" ? "active" : ""}" data-action="nav-clients" data-filter="empresarial"><span>Empresariales</span></div>
            <div class="cat-item ${state.view === "clientes" && state.clientFilter === "residencial" ? "active" : ""}" data-action="nav-clients" data-filter="residencial"><span>Residenciales</span></div>
          </div>
          <div class="sidebar-section-label" data-action="toggle-metricas">${state.metricasOpen ? "▾" : "▸"} Operaciones</div>
          <div class="sidebar-categories" style="${state.metricasOpen ? "" : "display:none"}">
            <div class="cat-item ${state.view === "dashboard" ? "active" : ""}" data-action="nav-view" data-view="dashboard"><span>Dashboard</span></div>
            <div class="cat-item ${state.view === "precio" ? "active" : ""}" data-action="nav-view" data-view="precio"><span>Precio vigente</span></div>
          </div>
          <div class="sidebar-section-label" data-action="toggle-tickets">${state.ticketsOpen ? "▾" : "▸"} PQRS</div>
          <div class="sidebar-categories" style="${state.ticketsOpen ? "" : "display:none"}">
            <div class="cat-item ${state.view === "pqrs" && !state.pqrsFilter ? "active" : ""}" data-action="nav-pqrs" data-filter=""><span>Todas</span></div>
            <div class="cat-item ${state.view === "pqrs" && state.pqrsFilter === "abierta" ? "active" : ""}" data-action="nav-pqrs" data-filter="abierta"><span>Abiertas</span></div>
            <div class="cat-item ${state.view === "pqrs" && state.pqrsFilter === "en_proceso" ? "active" : ""}" data-action="nav-pqrs" data-filter="en_proceso"><span>En proceso</span></div>
            <div class="cat-item ${state.view === "pqrs" && state.pqrsFilter === "resuelta" ? "active" : ""}" data-action="nav-pqrs" data-filter="resuelta"><span>Resueltas</span></div>
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
          ${state.view === "camiones" ? renderTrucksView() : state.view === "conductores" ? renderDriversView() : state.view === "vendedores" ? renderSellersView() : state.view === "clientes" ? renderClientsView() : state.view === "dashboard" ? renderDashboardView() : state.view === "precio" ? renderPrecioView() : state.view === "pqrs" ? renderPqrsView() : renderPedidosView()}
        </div>
      </div>
      </div>
    </div>`;
}

function renderPedidosView() {
  const filtered = getFilteredOrders();
  return `
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
    </div>`;
}

function renderTrucksView() {
  const statusLabels = { active: "Activo", maintenance: "En mantenimiento", inactive: "Inactivo" };
  const statusClasses = { active: "status-completed", maintenance: "status-in_transit", inactive: "status-cancelled" };
  const filtered = trucks.filter(t => {
    if (state.truckFilter && t.status !== state.truckFilter) return false;
    if (state.truckSearch) {
      const q = state.truckSearch.toLowerCase();
      return t.plate.toLowerCase().includes(q) || t.route.toLowerCase().includes(q) || t.drivers.some(d => d.toLowerCase().includes(q));
    }
    return true;
  });

  return `
    <div class="panel-list">
      <div class="toolbar">
        <div class="search-box">
          <span class="search-icon">🔍</span>
          <input placeholder="Buscar por placa, ruta..." value="${state.truckSearch || ""}" data-action="truck-search" />
        </div>
        <div class="toolbar-row">
          <select class="sort-select" data-action="truck-filter-status">
            <option value="" ${!state.truckFilter ? "selected" : ""}>Todos</option>
            <option value="active" ${state.truckFilter === "active" ? "selected" : ""}>Activos</option>
            <option value="maintenance" ${state.truckFilter === "maintenance" ? "selected" : ""}>En mantenimiento</option>
            <option value="inactive" ${state.truckFilter === "inactive" ? "selected" : ""}>Inactivos</option>
          </select>
          <button class="toolbar-btn active" data-action="truck-add">+ Agregar</button>
        </div>
      </div>
      <div class="order-list">
        ${filtered.length === 0 ? `<div style="padding:40px 16px;text-align:center;color:var(--gray-600)">No hay camiones con este filtro</div>` : ""}
        ${filtered.map((t, i) => {
          const realIdx = trucks.indexOf(t);
          return `
          <div class="order-item ${state.selectedTruck === realIdx ? "selected" : ""}" data-action="select-truck" data-idx="${realIdx}">
            <div class="order-item-top">
              <span class="order-id">${t.plate}</span>
              <span class="order-status-badge ${statusClasses[t.status]}">${statusLabels[t.status]}</span>
            </div>
            <div class="order-item-body">
              <div>
                <div class="order-client">${t.type} · ${t.capacity}</div>
                <div class="order-preview">${t.route}</div>
              </div>
            </div>
          </div>`;
        }).join("")}
      </div>
    </div>
    <div class="panel-detail">
      ${state.truckModal ? renderTruckModal() : state.selectedTruck !== null ? renderTruckDetail(trucks[state.selectedTruck]) : `
        <div class="detail-empty">
          <div class="icon">🚛</div>
          <h3>Selecciona un camión</h3>
          <p>Haz clic en un camión para ver su detalle.</p>
        </div>`}
    </div>`;
}

function renderTruckDetail(t) {
  const statusLabels = { active: "Activo", maintenance: "En mantenimiento", inactive: "Inactivo" };
  const idx = trucks.indexOf(t);
  return `
    <div class="detail-header">
      <h2>${t.plate}</h2>
      <div style="display:flex;gap:6px">
        <button class="toolbar-btn" data-action="truck-edit" data-idx="${idx}">Editar</button>
        <button class="toolbar-btn" style="color:var(--accent);border-color:var(--accent)" data-action="truck-delete" data-idx="${idx}">Eliminar</button>
      </div>
    </div>

    <div class="detail-card">
      <h3>🚛 Información del vehículo</h3>
      <div class="detail-row"><span class="label">Placa</span><span class="value">${t.plate}</span></div>
      <div class="detail-row"><span class="label">Tipo</span><span class="value">${t.type}</span></div>
      <div class="detail-row"><span class="label">Capacidad</span><span class="value">${t.capacity}</span></div>
      <div class="detail-row"><span class="label">Estado</span><span class="value">${statusLabels[t.status]}</span></div>
      <div class="detail-row"><span class="label">Ruta asignada</span><span class="value">${t.route}</span></div>
    </div>

    <div class="detail-card">
      <h3>👷 Conductores rotativos</h3>
      ${t.drivers.length === 0 ? `<p style="font-size:13px;color:var(--gray-600)">Sin conductores asignados</p>` :
        t.drivers.map(d => `<div class="detail-row"><span class="label">Conductor</span><span class="value">${d}</span></div>`).join("")}
    </div>

    <div class="detail-card">
      <h3>📋 Historial de viajes</h3>
      ${t.trips.length === 0 ? `<p style="font-size:13px;color:var(--gray-600)">Sin viajes registrados</p>` :
        t.trips.map(trip => `
          <div class="trip-row">
            <div class="detail-row"><span class="label">${trip.date}</span><span class="value">${trip.route}</span></div>
            <div class="detail-row"><span class="label">Despacho</span><span class="value">${trip.liters}L · ${trip.orders} pedidos</span></div>
          </div>
        `).join("")}
    </div>`;
}

function renderTruckModal() {
  const isEdit = state.truckModal === "edit";
  const t = isEdit ? state.editingTruck : { plate: "", type: "Cisterna", capacity: "3000L", status: "active", route: "", drivers: [] };
  return `
    <div class="detail-card" style="margin-top:0">
      <h3>${isEdit ? "Editar camión" : "Agregar camión"}</h3>
      <label style="font-size:12px;font-weight:600;color:var(--gray-600);display:block;margin-bottom:4px">Placa</label>
      <input class="input" id="truck-plate" value="${t.plate}" placeholder="Ej: CDMX-000-X" />
      <label style="font-size:12px;font-weight:600;color:var(--gray-600);display:block;margin-bottom:4px">Tipo</label>
      <input class="input" id="truck-type" value="${t.type}" placeholder="Cisterna" />
      <label style="font-size:12px;font-weight:600;color:var(--gray-600);display:block;margin-bottom:4px">Capacidad</label>
      <input class="input" id="truck-capacity" value="${t.capacity}" placeholder="Ej: 3000L" />
      <label style="font-size:12px;font-weight:600;color:var(--gray-600);display:block;margin-bottom:4px">Estado</label>
      <select class="input" id="truck-status">
        <option value="active" ${t.status === "active" ? "selected" : ""}>Activo</option>
        <option value="maintenance" ${t.status === "maintenance" ? "selected" : ""}>En mantenimiento</option>
        <option value="inactive" ${t.status === "inactive" ? "selected" : ""}>Inactivo</option>
      </select>
      <label style="font-size:12px;font-weight:600;color:var(--gray-600);display:block;margin-bottom:4px">Ruta asignada</label>
      <input class="input" id="truck-route" value="${t.route}" placeholder="Ej: Polanco – Condesa" />
      <label style="font-size:12px;font-weight:600;color:var(--gray-600);display:block;margin-bottom:4px">Conductores (separados por coma)</label>
      <input class="input" id="truck-drivers" value="${t.drivers.join(", ")}" placeholder="Ej: Julio Ramírez, Carlos Méndez" />
      <div style="display:flex;gap:8px;margin-top:12px">
        <button class="btn btn-primary" style="flex:1" data-action="truck-save">${isEdit ? "Guardar cambios" : "Agregar camión"}</button>
        <button class="toolbar-btn" style="padding:12px 16px" data-action="truck-cancel">Cancelar</button>
      </div>
    </div>`;
}

function renderDriversView() {
  const availLabels = { disponible: "Disponible", en_ruta: "En ruta", incapacidad: "Incapacidad", permiso: "Permiso", vacaciones: "Vacaciones", no_disponible: "No disponible" };
  const availClasses = { disponible: "status-completed", en_ruta: "status-in_transit", incapacidad: "status-cancelled", permiso: "status-inspecting", vacaciones: "status-assigned", no_disponible: "status-cancelled" };
  const filtered = drivers.filter(d => {
    if (state.driverFilter && d.availability !== state.driverFilter) return false;
    if (state.driverSearch) {
      const q = state.driverSearch.toLowerCase();
      return d.name.toLowerCase().includes(q) || d.license.toLowerCase().includes(q);
    }
    return true;
  });

  return `
    <div class="panel-list">
      <div class="toolbar">
        <div class="search-box">
          <span class="search-icon">🔍</span>
          <input placeholder="Buscar por nombre, licencia..." value="${state.driverSearch}" data-action="driver-search" />
        </div>
        <div class="toolbar-row">
          <select class="sort-select" data-action="driver-filter-status">
            <option value="" ${!state.driverFilter ? "selected" : ""}>Todos</option>
            <option value="disponible" ${state.driverFilter === "disponible" ? "selected" : ""}>Disponibles</option>
            <option value="en_ruta" ${state.driverFilter === "en_ruta" ? "selected" : ""}>En ruta</option>
            <option value="incapacidad" ${state.driverFilter === "incapacidad" ? "selected" : ""}>Incapacidad</option>
            <option value="permiso" ${state.driverFilter === "permiso" ? "selected" : ""}>Permiso</option>
            <option value="vacaciones" ${state.driverFilter === "vacaciones" ? "selected" : ""}>Vacaciones</option>
          </select>
          <button class="toolbar-btn active" data-action="driver-add">+ Agregar</button>
        </div>
      </div>
      <div class="order-list">
        ${filtered.length === 0 ? `<div style="padding:40px 16px;text-align:center;color:var(--gray-600)">No hay conductores con este filtro</div>` : ""}
        ${filtered.map(d => {
          const realIdx = drivers.indexOf(d);
          return `
          <div class="order-item ${state.selectedDriver === realIdx ? "selected" : ""}" data-action="select-driver" data-idx="${realIdx}">
            <div class="order-item-top">
              <span class="order-id">${d.name}</span>
              <span class="order-status-badge ${availClasses[d.availability]}">${availLabels[d.availability]}</span>
            </div>
            <div class="order-item-body">
              <div>
                <div class="order-client">⭐ ${d.rating} · ${d.totalTrips} viajes</div>
                <div class="order-preview">${d.trucks.join(", ") || "Sin camión"}</div>
              </div>
            </div>
          </div>`;
        }).join("")}
      </div>
    </div>
    <div class="panel-detail">
      ${state.driverModal ? renderDriverModal() : state.selectedDriver !== null ? renderDriverDetail(drivers[state.selectedDriver]) : `
        <div class="detail-empty">
          <div class="icon">👷</div>
          <h3>Selecciona un conductor</h3>
          <p>Haz clic en un conductor para ver su detalle.</p>
        </div>`}
    </div>`;
}

function renderDriverDetail(d) {
  const availLabels = { disponible: "Disponible", en_ruta: "En ruta", incapacidad: "Incapacidad", permiso: "Permiso", vacaciones: "Vacaciones", no_disponible: "No disponible" };
  const availClasses = { disponible: "status-completed", en_ruta: "status-in_transit", incapacidad: "status-cancelled", permiso: "status-inspecting", vacaciones: "status-assigned", no_disponible: "status-cancelled" };
  const idx = drivers.indexOf(d);
  return `
    <div class="detail-header">
      <h2>${d.name}</h2>
      <div style="display:flex;gap:6px">
        <button class="toolbar-btn" data-action="driver-edit" data-idx="${idx}">Editar</button>
        <button class="toolbar-btn" style="color:var(--accent);border-color:var(--accent)" data-action="driver-delete" data-idx="${idx}">Eliminar</button>
      </div>
    </div>

    <div class="detail-card">
      <h3>👷 Información del conductor</h3>
      <div class="detail-row"><span class="label">Nombre</span><span class="value">${d.name}</span></div>
      <div class="detail-row"><span class="label">Teléfono</span><span class="value">${d.phone}</span></div>
      <div class="detail-row"><span class="label">Licencia</span><span class="value">${d.license}</span></div>
      <div class="detail-row"><span class="label">Estado laboral</span><span class="value">${d.status === "active" ? "Activo" : "Inactivo"}</span></div>
      <div class="detail-row">
        <span class="label">Disponibilidad</span>
        <select class="inline-select" data-action="change-availability" data-idx="${idx}">
          <option value="disponible" ${d.availability === "disponible" ? "selected" : ""}>Disponible</option>
          <option value="en_ruta" ${d.availability === "en_ruta" ? "selected" : ""}>En ruta</option>
          <option value="incapacidad" ${d.availability === "incapacidad" ? "selected" : ""}>Incapacidad</option>
          <option value="permiso" ${d.availability === "permiso" ? "selected" : ""}>Permiso</option>
          <option value="vacaciones" ${d.availability === "vacaciones" ? "selected" : ""}>Vacaciones</option>
          <option value="no_disponible" ${d.availability === "no_disponible" ? "selected" : ""}>No disponible</option>
        </select>
      </div>
    </div>

    <div class="detail-card">
      <h3>📊 Desempeño</h3>
      <div class="detail-row"><span class="label">Calificación</span><span class="value">⭐ ${d.rating} / 5.0</span></div>
      <div class="detail-row"><span class="label">Total de viajes</span><span class="value">${d.totalTrips.toLocaleString()}</span></div>
    </div>

    <div class="detail-card">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px">
        <h3 style="margin:0">🚛 Camiones asignados</h3>
        <button class="toolbar-btn" data-action="driver-add-truck" data-idx="${idx}">+</button>
      </div>
      ${d.trucks.length === 0 ? `<p style="font-size:13px;color:var(--gray-600)">Sin camiones asignados</p>` :
        d.trucks.map((tr, ti) => `
          <div class="chip-item">
            <span>${tr}</span>
            <button class="chip-remove" data-action="driver-remove-truck" data-idx="${idx}" data-ti="${ti}">×</button>
          </div>
        `).join("")}
    </div>

    <div class="detail-card">
      <h3>📋 Últimos viajes</h3>
      ${d.trips.length === 0 ? `<p style="font-size:13px;color:var(--gray-600)">Sin viajes registrados</p>` :
        d.trips.map(trip => `
          <div class="trip-row">
            <div class="detail-row"><span class="label">${trip.date}</span><span class="value">${trip.route}</span></div>
            <div class="detail-row"><span class="label">Despacho</span><span class="value">${trip.liters}L · ${trip.orders} pedidos</span></div>
          </div>
        `).join("")}
    </div>`;
}

function renderDriverModal() {
  const isEdit = state.driverModal === "edit";
  const d = isEdit ? state.editingDriver : { name: "", phone: "", license: "", status: "active", availability: "disponible", trucks: [] };
  return `
    <div class="detail-card" style="margin-top:0">
      <h3>${isEdit ? "Editar conductor" : "Agregar conductor"}</h3>
      <label style="font-size:12px;font-weight:600;color:var(--gray-600);display:block;margin-bottom:4px">Nombre</label>
      <input class="input" id="driver-name" value="${d.name}" placeholder="Nombre completo" />
      <label style="font-size:12px;font-weight:600;color:var(--gray-600);display:block;margin-bottom:4px">Teléfono</label>
      <input class="input" id="driver-phone" value="${d.phone}" placeholder="+52 55 0000 0000" />
      <label style="font-size:12px;font-weight:600;color:var(--gray-600);display:block;margin-bottom:4px">Licencia</label>
      <input class="input" id="driver-license" value="${d.license}" placeholder="LIC-0000-CDMX" />
      <label style="font-size:12px;font-weight:600;color:var(--gray-600);display:block;margin-bottom:4px">Estado laboral</label>
      <select class="input" id="driver-status">
        <option value="active" ${d.status === "active" ? "selected" : ""}>Activo</option>
        <option value="inactive" ${d.status === "inactive" ? "selected" : ""}>Inactivo</option>
      </select>
      <label style="font-size:12px;font-weight:600;color:var(--gray-600);display:block;margin-bottom:4px">Disponibilidad</label>
      <select class="input" id="driver-availability">
        <option value="disponible" ${d.availability === "disponible" ? "selected" : ""}>Disponible</option>
        <option value="en_ruta" ${d.availability === "en_ruta" ? "selected" : ""}>En ruta</option>
        <option value="incapacidad" ${d.availability === "incapacidad" ? "selected" : ""}>Incapacidad</option>
        <option value="permiso" ${d.availability === "permiso" ? "selected" : ""}>Permiso</option>
        <option value="vacaciones" ${d.availability === "vacaciones" ? "selected" : ""}>Vacaciones</option>
        <option value="no_disponible" ${d.availability === "no_disponible" ? "selected" : ""}>No disponible</option>
      </select>
      <label style="font-size:12px;font-weight:600;color:var(--gray-600);display:block;margin-bottom:4px">Camiones asignados (separados por coma)</label>
      <input class="input" id="driver-trucks" value="${d.trucks.join(", ")}" placeholder="Ej: CDMX-482-A, CDMX-319-B" />
      <div style="display:flex;gap:8px;margin-top:12px">
        <button class="btn btn-primary" style="flex:1" data-action="driver-save">${isEdit ? "Guardar cambios" : "Agregar conductor"}</button>
        <button class="toolbar-btn" style="padding:12px 16px" data-action="driver-cancel">Cancelar</button>
      </div>
    </div>`;
}

function renderSellersView() {
  const filtered = sellers.filter(s => {
    if (!state.sellerSearch) return true;
    const q = state.sellerSearch.toLowerCase();
    return s.name.toLowerCase().includes(q) || s.id.toLowerCase().includes(q);
  });
  const hasSelection = state.selectedSellers && state.selectedSellers.length > 0;

  return `
    <div class="full-panel">
      <div class="toolbar">
        <div class="search-box">
          <span class="search-icon">🔍</span>
          <input placeholder="Buscar por nombre, código..." value="${state.sellerSearch}" data-action="seller-search" />
        </div>
        <div class="toolbar-row">
          <span style="font-size:13px;color:var(--gray-600)">${hasSelection ? state.selectedSellers.length + " seleccionado(s)" : sellers.length + " vendedores"}</span>
          <div style="display:flex;gap:4px">
            <button class="toolbar-btn ${!hasSelection ? "disabled" : ""}" data-action="seller-edit" data-idx="${hasSelection ? state.selectedSellers[0] : ""}" ${!hasSelection || state.selectedSellers.length > 1 ? "disabled" : ""}>Editar</button>
            <button class="toolbar-btn ${!hasSelection ? "disabled" : ""}" style="${hasSelection ? "color:var(--accent);border-color:var(--accent)" : ""}" data-action="seller-delete-selected" ${!hasSelection ? "disabled" : ""}>Eliminar</button>
            <button class="toolbar-btn active" data-action="seller-add">Agregar</button>
          </div>
        </div>
      </div>
      ${state.sellerModal ? `
      <div style="display:flex;flex:1;overflow:hidden">
        <div class="table-wrap" style="flex:1">
          ${renderSellerTable(filtered)}
        </div>
        <div class="side-form">
          ${renderSellerModal()}
        </div>
      </div>` : `
      <div class="table-wrap">
        ${renderSellerTable(filtered)}
      </div>`}
    </div>`;
}

function renderSellerTable(filtered) {
  return `
    <table class="data-table">
      <thead>
        <tr>
          <th style="width:32px"><input type="checkbox" data-action="seller-select-all" ${state.selectedSellers && state.selectedSellers.length === filtered.length && filtered.length > 0 ? "checked" : ""} /></th>
          <th>Código</th><th>Nombre</th><th>Teléfono</th><th>Correo</th><th>Clientes</th><th>Ventas</th>
        </tr>
      </thead>
      <tbody>
        ${filtered.map(s => {
          const idx = sellers.indexOf(s);
          const checked = state.selectedSellers && state.selectedSellers.includes(idx);
          return `<tr class="${checked ? "row-selected" : ""}">
            <td><input type="checkbox" data-action="seller-select" data-idx="${idx}" ${checked ? "checked" : ""} /></td>
            <td><strong>${s.id}</strong></td>
            <td>${s.name}</td>
            <td>${s.phone}</td>
            <td>${s.email}</td>
            <td>${s.clients}</td>
            <td>${s.sales}</td>
          </tr>`;
        }).join("")}
      </tbody>
    </table>
    ${filtered.length === 0 ? `<div style="padding:40px;text-align:center;color:var(--gray-600)">No hay vendedores con este filtro</div>` : ""}`;
}

function renderSellerDetail(s) { return ""; }

function renderSellerModal() {
  const isEdit = state.sellerModal === "edit";
  const s = isEdit ? state.editingSeller : { id: "", name: "", phone: "", email: "" };
  return `
    <h3 style="margin:0 0 14px">${isEdit ? "Editar vendedor" : "Agregar vendedor"}</h3>
    <label style="font-size:12px;font-weight:600;color:var(--gray-600);display:block;margin-bottom:4px">Código</label>
    <input class="input" id="seller-id" value="${s.id}" placeholder="Ej: VND-000" ${isEdit ? "disabled" : ""} />
    <label style="font-size:12px;font-weight:600;color:var(--gray-600);display:block;margin-bottom:4px">Nombre</label>
    <input class="input" id="seller-name" value="${s.name}" placeholder="Nombre completo" />
    <label style="font-size:12px;font-weight:600;color:var(--gray-600);display:block;margin-bottom:4px">Teléfono</label>
    <input class="input" id="seller-phone" value="${s.phone}" placeholder="+52 55 0000 0000" />
    <label style="font-size:12px;font-weight:600;color:var(--gray-600);display:block;margin-bottom:4px">Correo</label>
    <input class="input" id="seller-email" value="${s.email}" placeholder="correo@corpoilgas.com" />
    <div style="display:flex;gap:8px;margin-top:14px">
      <button class="btn btn-primary" style="flex:1" data-action="seller-save">${isEdit ? "Guardar" : "Agregar"}</button>
      <button class="toolbar-btn" style="padding:12px 16px" data-action="seller-cancel">Cancelar</button>
    </div>`;
}

function renderClientsView() {
  const filtered = clients.filter(c => {
    if (state.clientFilter && c.type !== state.clientFilter) return false;
    if (state.clientSearch) {
      const q = state.clientSearch.toLowerCase();
      return c.name.toLowerCase().includes(q) || c.id.toLowerCase().includes(q) || c.address.toLowerCase().includes(q);
    }
    return true;
  });

  return `
    <div class="panel-list">
      <div class="toolbar">
        <div class="search-box">
          <span class="search-icon">🔍</span>
          <input placeholder="Buscar cliente, dirección..." value="${state.clientSearch}" data-action="client-search" />
        </div>
        <div class="toolbar-row">
          <select class="sort-select" data-action="client-filter-type">
            <option value="" ${!state.clientFilter ? "selected" : ""}>Todos</option>
            <option value="residencial" ${state.clientFilter === "residencial" ? "selected" : ""}>Residenciales</option>
            <option value="empresarial" ${state.clientFilter === "empresarial" ? "selected" : ""}>Empresariales</option>
          </select>
          <button class="toolbar-btn active" data-action="client-add">+ Agregar</button>
        </div>
      </div>
      <div class="order-list">
        ${filtered.length === 0 ? `<div style="padding:40px 16px;text-align:center;color:var(--gray-600)">No hay clientes con este filtro</div>` : ""}
        ${filtered.map(c => {
          const realIdx = clients.indexOf(c);
          return `
          <div class="order-item ${state.selectedClient === realIdx ? "selected" : ""}" data-action="select-client" data-idx="${realIdx}">
            <div class="order-item-top">
              <span class="order-id">${c.name}</span>
              <span class="order-status-badge ${c.type === "empresarial" ? "status-assigned" : "status-completed"}">${c.type === "empresarial" ? "🏢 Empresarial" : "🏠 Residencial"}</span>
            </div>
            <div class="order-item-body">
              <div>
                <div class="order-client">${c.address}</div>
                <div class="order-preview">${c.tankType} · ${c.seller}</div>
              </div>
            </div>
          </div>`;
        }).join("")}
      </div>
    </div>
    <div class="panel-detail">
      ${state.clientModal ? renderClientModal() : state.selectedClient !== null ? renderClientDetail(clients[state.selectedClient]) : `
        <div class="detail-empty">
          <div class="icon">👥</div>
          <h3>Selecciona un cliente</h3>
          <p>Haz clic en un cliente para ver su detalle.</p>
        </div>`}
    </div>`;
}

function renderClientDetail(c) {
  const idx = clients.indexOf(c);
  const sellerObj = sellers.find(s => s.id === c.seller);
  return `
    <div class="detail-header">
      <h2>${c.name}</h2>
      <div style="display:flex;gap:6px">
        <button class="toolbar-btn" data-action="client-edit" data-idx="${idx}">Editar</button>
        <button class="toolbar-btn" style="color:var(--accent);border-color:var(--accent)" data-action="client-delete" data-idx="${idx}">Eliminar</button>
      </div>
    </div>

    <div class="detail-card">
      <div class="seller-profile">
        <div class="seller-avatar">${c.name.split(" ").map(n => n[0]).join("").substring(0, 2)}</div>
        <div>
          <div style="font-weight:700;font-size:16px">${c.name}</div>
          <div style="font-size:13px;color:var(--gray-600)">${c.id} · <span class="order-status-badge ${c.type === "empresarial" ? "status-assigned" : "status-completed"}">${c.type === "empresarial" ? "Empresarial" : "Residencial"}</span></div>
        </div>
      </div>
      <div class="detail-row"><span class="label">Teléfono</span><span class="value">${c.phone}</span></div>
      <div class="detail-row"><span class="label">Correo</span><span class="value">${c.email}</span></div>
      <div class="detail-row"><span class="label">Dirección</span><span class="value">${c.address}</span></div>
      <div class="detail-row"><span class="label">Tanque</span><span class="value">${c.tankType}</span></div>
      <div class="detail-row"><span class="label">Vendedor</span><span class="value">${sellerObj ? sellerObj.name : c.seller}</span></div>
    </div>

    ${c.type === "empresarial" ? `
    <div class="detail-card">
      <h3>🏢 Datos empresariales</h3>
      <div class="detail-row"><span class="label">Razón social</span><span class="value">${c.businessName}</span></div>
      <div class="detail-row"><span class="label">RFC</span><span class="value">${c.rfc}</span></div>
      <div class="detail-row"><span class="label">Convenio</span><span class="value">${c.convenio}</span></div>
      <div class="detail-row"><span class="label">Línea de crédito</span><span class="value">${mxn(c.creditLine)}</span></div>
    </div>` : ""}

    ${renderClientOrders(c)}`;
}

function renderClientOrders(c) {
  const clientOrders = orders.filter(o => o.client === c.name);
  if (clientOrders.length === 0) return "";
  return `
    <div class="detail-card">
      <h3>Historial de pedidos</h3>
      ${clientOrders.map(o => {
        const info = getStateInfo(o.status);
        const idx = orders.indexOf(o);
        return `
        <div class="detail-row" style="cursor:pointer" data-action="go-order" data-idx="${idx}">
          <span class="label">${o.id} · ${o.deliveryDate}</span>
          <span class="value"><span class="order-status-badge ${getStatusClass(o.status)}">${info.label}</span> ${mxn(o.realCost || o.estimatedCost)}</span>
        </div>`;
      }).join("")}
    </div>`;
}

function renderClientModal() {
  const isEdit = state.clientModal === "edit";
  const c = state.editingClient || { name: "", type: "residencial", phone: "", email: "", address: "", tankType: "", seller: "", businessName: "", rfc: "", convenio: "", creditLine: "" };
  const showBiz = c.type === "empresarial";
  return `
    <div class="detail-card" style="margin-top:0">
      <h3>${isEdit ? "Editar cliente" : "Agregar cliente"}</h3>
      <label style="font-size:12px;font-weight:600;color:var(--gray-600);display:block;margin-bottom:4px">Tipo de cliente</label>
      <select class="input" id="client-type" data-action="client-type-change">
        <option value="residencial" ${c.type === "residencial" ? "selected" : ""}>Residencial</option>
        <option value="empresarial" ${c.type === "empresarial" ? "selected" : ""}>Empresarial</option>
      </select>
      <label style="font-size:12px;font-weight:600;color:var(--gray-600);display:block;margin-bottom:4px">Nombre</label>
      <input class="input" id="client-name" value="${c.name}" placeholder="${showBiz ? "Nombre comercial" : "Nombre completo"}" />
      <label style="font-size:12px;font-weight:600;color:var(--gray-600);display:block;margin-bottom:4px">Teléfono</label>
      <input class="input" id="client-phone" value="${c.phone}" placeholder="+52 55 0000 0000" />
      <label style="font-size:12px;font-weight:600;color:var(--gray-600);display:block;margin-bottom:4px">Correo</label>
      <input class="input" id="client-email" value="${c.email}" placeholder="correo@ejemplo.com" />
      <label style="font-size:12px;font-weight:600;color:var(--gray-600);display:block;margin-bottom:4px">Dirección</label>
      <input class="input" id="client-address" value="${c.address}" placeholder="Calle, número, colonia, ciudad" />
      <label style="font-size:12px;font-weight:600;color:var(--gray-600);display:block;margin-bottom:4px">Tipo de tanque</label>
      <input class="input" id="client-tank" value="${c.tankType}" placeholder="Ej: Estacionario 300L" />
      <label style="font-size:12px;font-weight:600;color:var(--gray-600);display:block;margin-bottom:4px">Vendedor asociado</label>
      <select class="input" id="client-seller">
        <option value="">Sin vendedor</option>
        ${sellers.map(s => `<option value="${s.id}" ${c.seller === s.id ? "selected" : ""}>${s.name} (${s.id})</option>`).join("")}
      </select>
      ${showBiz ? `
        <div style="margin-top:12px;padding-top:12px;border-top:1px solid var(--gray-200)">
          <label style="font-size:12px;font-weight:600;color:var(--gray-600);display:block;margin-bottom:4px">Razón social</label>
          <input class="input" id="client-business" value="${c.businessName || ""}" placeholder="Razón social S.A. de C.V." />
          <label style="font-size:12px;font-weight:600;color:var(--gray-600);display:block;margin-bottom:4px">RFC</label>
          <input class="input" id="client-rfc" value="${c.rfc || ""}" placeholder="ABC123456XY0" />
          <label style="font-size:12px;font-weight:600;color:var(--gray-600);display:block;margin-bottom:4px">Convenio</label>
          <input class="input" id="client-convenio" value="${c.convenio || ""}" placeholder="C-000" />
          <label style="font-size:12px;font-weight:600;color:var(--gray-600);display:block;margin-bottom:4px">Línea de crédito (MXN)</label>
          <input class="input" id="client-credit" type="number" value="${c.creditLine || ""}" placeholder="0" />
        </div>
      ` : ""}
      <div style="display:flex;gap:8px;margin-top:12px">
        <button class="btn btn-primary" style="flex:1" data-action="client-save">${isEdit ? "Guardar cambios" : "Agregar cliente"}</button>
        <button class="toolbar-btn" style="padding:12px 16px" data-action="client-cancel">Cancelar</button>
      </div>
    </div>`;
}

const volumetricData = [
  { plate: "CDMX-482-A", loaded: 2800, dispatched: 2750, trips: 3 },
  { plate: "CDMX-319-B", loaded: 4500, dispatched: 4200, trips: 6 },
  { plate: "CDMX-155-C", loaded: 0, dispatched: 0, trips: 0 },
  { plate: "CDMX-601-D", loaded: 3200, dispatched: 3150, trips: 4 },
];

let currentPrice = 12.50;

function renderDashboardView() {
  const totalDispatched = volumetricData.reduce((a, v) => a + v.dispatched, 0);
  const totalLoaded = volumetricData.reduce((a, v) => a + v.loaded, 0);
  const totalMerma = totalLoaded - totalDispatched;
  const mermaPct = totalLoaded > 0 ? ((totalMerma / totalLoaded) * 100).toFixed(1) : 0;
  const completedOrders = orders.filter(o => o.status === "COMPLETED").length;
  const activeOrders = orders.filter(o => !["COMPLETED", "CANCELLED"].includes(o.status)).length;
  const totalRevenue = orders.filter(o => o.realCost).reduce((a, o) => a + o.realCost, 0);

  return `
    <div class="full-panel" style="padding:24px;overflow-y:auto">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:20px">
        <h2 style="margin:0">Dashboard operativo</h2>
        <span style="font-size:13px;color:var(--gray-600)">19 mayo 2026</span>
      </div>

      <div class="kpi-grid">
        <div class="kpi-card">
          <div class="kpi-value">${totalDispatched.toLocaleString()}L</div>
          <div class="kpi-label">Litros despachados hoy</div>
          <div class="kpi-compare up">↑ 12% vs ayer (8,920L)</div>
        </div>
        <div class="kpi-card">
          <div class="kpi-value">${mxn(totalRevenue)}</div>
          <div class="kpi-label">Ingresos hoy</div>
          <div class="kpi-compare down">↓ 5% vs ayer (${mxn(1160)})</div>
        </div>
        <div class="kpi-card">
          <div class="kpi-value">${completedOrders + activeOrders}</div>
          <div class="kpi-label">Pedidos del día</div>
          <div class="kpi-compare up">↑ 2 más que ayer</div>
        </div>
        <div class="kpi-card">
          <div class="kpi-value">${mxn(currentPrice)}/L</div>
          <div class="kpi-label">Precio vigente</div>
          <div class="kpi-compare neutral">Sin cambio esta semana</div>
        </div>
        <div class="kpi-card ${parseFloat(mermaPct) > 3 ? "kpi-alert" : ""}">
          <div class="kpi-value">${totalMerma}L (${mermaPct}%)</div>
          <div class="kpi-label">Merma del día</div>
          <div class="kpi-compare ${parseFloat(mermaPct) > 2 ? "down" : "up"}">Promedio semanal: 1.9%</div>
        </div>
        <div class="kpi-card">
          <div class="kpi-value">${activeOrders}</div>
          <div class="kpi-label">En curso ahora</div>
          <div class="kpi-compare neutral">${completedOrders} completados hoy</div>
        </div>
      </div>

      <div class="detail-card" style="margin-top:20px">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px">
          <h3 style="margin:0">Control volumétrico por unidad — Hoy</h3>
          <span style="font-size:11px;color:var(--gray-600)">Umbral de alerta: > 3%</span>
        </div>
        <table class="data-table" style="margin:0 -20px;width:calc(100% + 40px)">
          <thead>
            <tr><th>Camión</th><th>Cargados</th><th>Despachados</th><th>Merma</th><th>%</th><th>Viajes</th><th>Estado</th></tr>
          </thead>
          <tbody>
            ${volumetricData.map(v => {
              const merma = v.loaded - v.dispatched;
              const pct = v.loaded > 0 ? ((merma / v.loaded) * 100).toFixed(1) : 0;
              const status = v.loaded === 0 ? "inactive" : parseFloat(pct) > 3 ? "alert" : parseFloat(pct) > 2 ? "warning" : "ok";
              const statusLabel = { ok: "Normal", warning: "Atención", alert: "Alerta", inactive: "Inactivo" };
              const statusClass = { ok: "status-completed", warning: "status-in_transit", alert: "status-cancelled", inactive: "" };
              return `<tr>
                <td><strong>${v.plate}</strong></td>
                <td>${v.loaded.toLocaleString()}L</td>
                <td>${v.dispatched.toLocaleString()}L</td>
                <td>${merma}L</td>
                <td>${pct}%</td>
                <td>${v.trips}</td>
                <td><span class="order-status-badge ${statusClass[status]}">${statusLabel[status]}</span></td>
              </tr>`;
            }).join("")}
          </tbody>
        </table>
      </div>

      <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-top:16px">
        <div class="detail-card">
          <h3 style="margin-bottom:10px">Resumen semanal (12–18 may)</h3>
          <div class="detail-row"><span class="label">Litros despachados</span><span class="value">52,400L</span></div>
          <div class="detail-row"><span class="label">Ingresos cobrados</span><span class="value">${mxn(655000)}</span></div>
          <div class="detail-row"><span class="label">Ingresos esperados</span><span class="value">${mxn(668100)}</span></div>
          <div class="detail-row"><span class="label">Diferencia</span><span class="value" style="color:var(--accent)">-${mxn(13100)} (1.96%)</span></div>
          <div class="detail-row"><span class="label">Pedidos completados</span><span class="value">87</span></div>
          <div class="detail-row"><span class="label">Merma promedio</span><span class="value">1.9%</span></div>
        </div>
        <div class="detail-card">
          <h3 style="margin-bottom:10px">Resumen mensual (mayo)</h3>
          <div class="detail-row"><span class="label">Litros despachados</span><span class="value">181,200L</span></div>
          <div class="detail-row"><span class="label">Ingresos cobrados</span><span class="value">${mxn(2265000)}</span></div>
          <div class="detail-row"><span class="label">Ingresos esperados</span><span class="value">${mxn(2315280)}</span></div>
          <div class="detail-row"><span class="label">Diferencia</span><span class="value" style="color:var(--accent)">-${mxn(50280)} (2.17%)</span></div>
          <div class="detail-row"><span class="label">Pedidos completados</span><span class="value">312</span></div>
          <div class="detail-row"><span class="label">Merma acumulada</span><span class="value">3,800L (2.05%)</span></div>
        </div>
      </div>

      <div class="detail-card" style="margin-top:16px;border-color:var(--accent)">
        <h3 style="color:var(--accent)">Conciliación financiera</h3>
        <p style="font-size:13px;color:var(--gray-600);margin-bottom:12px">Comparativa entre lo que se debió cobrar (litros × precio) vs lo que efectivamente ingresó. Diferencias mayores al 2% requieren investigación.</p>
        <table class="data-table" style="margin:0 -20px;width:calc(100% + 40px)">
          <thead><tr><th>Camión</th><th>Litros despachados</th><th>Ingreso esperado</th><th>Ingreso real</th><th>Diferencia</th><th>Estado</th></tr></thead>
          <tbody>
            <tr>
              <td><strong>CDMX-482-A</strong></td><td>2,750L</td><td>${mxn(34375)}</td><td>${mxn(34375)}</td><td>${mxn(0)}</td>
              <td><span class="order-status-badge status-completed">OK</span></td>
            </tr>
            <tr>
              <td><strong>CDMX-319-B</strong></td><td>4,200L</td><td>${mxn(52500)}</td><td>${mxn(49800)}</td><td style="color:var(--accent)">-${mxn(2700)}</td>
              <td><span class="order-status-badge status-cancelled">Revisar</span></td>
            </tr>
            <tr>
              <td><strong>CDMX-601-D</strong></td><td>3,150L</td><td>${mxn(39375)}</td><td>${mxn(39375)}</td><td>${mxn(0)}</td>
              <td><span class="order-status-badge status-completed">OK</span></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>`;
}

function renderPrecioView() {
  return `
    <div class="full-panel" style="padding:24px;overflow-y:auto">
      <h2 style="margin:0 0 20px">Precio vigente de Gas LP</h2>

      <div class="detail-card">
        <h3>Precio actual por litro</h3>
        <div style="display:flex;align-items:center;gap:16px;margin:16px 0">
          <div style="font-size:36px;font-weight:700;color:var(--primary)">${mxn(currentPrice)}</div>
          <div style="font-size:13px;color:var(--gray-600)">por litro<br>Vigente desde: 13 mayo 2026</div>
        </div>
        <div class="detail-row"><span class="label">Región</span><span class="value">CDMX y Zona Metropolitana</span></div>
        <div class="detail-row"><span class="label">Próxima actualización</span><span class="value">20 mayo 2026 (semanal)</span></div>
      </div>

      <div class="detail-card">
        <h3>Actualizar precio</h3>
        <label style="font-size:12px;font-weight:600;color:var(--gray-600);display:block;margin-bottom:4px">Nuevo precio por litro (MXN)</label>
        <input class="input" id="new-price" type="number" step="0.01" value="${currentPrice}" style="max-width:200px" />
        <button class="toolbar-btn active" style="margin-top:8px" data-action="update-price">Actualizar precio</button>
      </div>

      <div class="detail-card">
        <h3>Historial de precios</h3>
        <table class="data-table" style="margin:0 -20px;width:calc(100% + 40px)">
          <thead><tr><th>Fecha</th><th>Precio</th><th>Variación</th></tr></thead>
          <tbody>
            <tr><td>13 may 2026</td><td>${mxn(12.50)}</td><td style="color:var(--accent)">+$0.30</td></tr>
            <tr><td>6 may 2026</td><td>${mxn(12.20)}</td><td style="color:var(--success)">-$0.10</td></tr>
            <tr><td>29 abr 2026</td><td>${mxn(12.30)}</td><td style="color:var(--accent)">+$0.20</td></tr>
            <tr><td>22 abr 2026</td><td>${mxn(12.10)}</td><td style="color:var(--gray-600)">$0.00</td></tr>
            <tr><td>15 abr 2026</td><td>${mxn(12.10)}</td><td style="color:var(--success)">-$0.15</td></tr>
          </tbody>
        </table>
      </div>
    </div>`;
}

function renderPqrsView() {
  const statusLabels = { abierta: "Abierta", en_proceso: "En proceso", resuelta: "Resuelta" };
  const statusClasses = { abierta: "status-cancelled", en_proceso: "status-in_transit", resuelta: "status-completed" };
  const priorityClasses = { urgente: "status-cancelled", alta: "status-in_transit", media: "status-assigned" };
  const filtered = tickets.filter(t => {
    if (state.pqrsFilter && t.status !== state.pqrsFilter) return false;
    return true;
  });

  return `
    <div class="panel-list">
      <div class="toolbar">
        <div class="toolbar-row" style="width:100%">
          <span style="font-size:13px;color:var(--gray-600)">${filtered.length} tickets</span>
          <select class="sort-select" data-action="pqrs-filter">
            <option value="" ${!state.pqrsFilter ? "selected" : ""}>Todos</option>
            <option value="abierta" ${state.pqrsFilter === "abierta" ? "selected" : ""}>Abiertas</option>
            <option value="en_proceso" ${state.pqrsFilter === "en_proceso" ? "selected" : ""}>En proceso</option>
            <option value="resuelta" ${state.pqrsFilter === "resuelta" ? "selected" : ""}>Resueltas</option>
          </select>
        </div>
      </div>
      <div class="order-list">
        ${filtered.length === 0 ? `<div style="padding:40px 16px;text-align:center;color:var(--gray-600)">No hay tickets con este filtro</div>` : ""}
        ${filtered.map(t => {
          const idx = tickets.indexOf(t);
          return `
          <div class="order-item ${state.selectedTicket === idx ? "selected" : ""}" data-action="select-ticket" data-idx="${idx}">
            <div class="order-item-top">
              <span class="order-id">${t.id}</span>
              <span class="order-status-badge ${statusClasses[t.status]}">${statusLabels[t.status]}</span>
            </div>
            <div class="order-item-body">
              <div>
                <div class="order-client">${t.type}</div>
                <div class="order-preview">${t.client} · ${t.orderId} · ${t.date}</div>
              </div>
              <span class="order-status-badge ${priorityClasses[t.priority]}">${t.priority}</span>
            </div>
          </div>`;
        }).join("")}
      </div>
    </div>
    <div class="panel-detail">
      ${state.selectedTicket !== null ? renderTicketDetail(tickets[state.selectedTicket]) : `
        <div class="detail-empty">
          <div class="icon">🎫</div>
          <h3>Selecciona un ticket</h3>
          <p>Haz clic en un ticket para ver su detalle.</p>
        </div>`}
    </div>`;
}

function renderTicketDetail(t) {
  const statusLabels = { abierta: "Abierta", en_proceso: "En proceso", resuelta: "Resuelta" };
  const idx = tickets.indexOf(t);
  return `
    <div class="detail-header">
      <h2>${t.id} — ${t.type}</h2>
      <span class="order-status-badge ${t.status === "resuelta" ? "status-completed" : t.status === "en_proceso" ? "status-in_transit" : "status-cancelled"}">${statusLabels[t.status]}</span>
    </div>

    <div class="detail-card">
      <div class="detail-row"><span class="label">Tipo</span><span class="value">${t.type}</span></div>
      <div class="detail-row"><span class="label">Prioridad</span><span class="value">${t.priority}</span></div>
      <div class="detail-row"><span class="label">Cliente</span><span class="value"><a class="link-nav" data-action="go-client" data-name="${t.client}">${t.client}</a></span></div>
      <div class="detail-row"><span class="label">Pedido vinculado</span><span class="value"><a class="link-nav" data-action="go-order-by-id" data-id="${t.orderId}">${t.orderId}</a></span></div>
      <div class="detail-row"><span class="label">Fecha</span><span class="value">${t.date}</span></div>
      <div class="detail-row">
        <span class="label">Estado</span>
        <select class="inline-select" data-action="change-ticket-status" data-idx="${idx}">
          <option value="abierta" ${t.status === "abierta" ? "selected" : ""}>Abierta</option>
          <option value="en_proceso" ${t.status === "en_proceso" ? "selected" : ""}>En proceso</option>
          <option value="resuelta" ${t.status === "resuelta" ? "selected" : ""}>Resuelta</option>
        </select>
      </div>
    </div>

    <div class="detail-card">
      <h3>Seguimiento</h3>
      <div class="ticket-notes">
        ${t.notes.map(n => `
          <div class="note-item">
            <div class="note-header">
              <strong>${n.author}</strong>
              <span>${n.date}</span>
            </div>
            <div class="note-text">${n.text}</div>
          </div>
        `).join("")}
      </div>
      <div class="note-input">
        <input class="input" id="ticket-note" placeholder="Escribir actualización..." style="margin-bottom:0" />
        <button class="toolbar-btn active" data-action="add-ticket-note" data-idx="${idx}">Enviar</button>
      </div>
    </div>`;
}

function collapseAllExcept(key) {
  const sections = ["flotillaOpen", "vendedoresOpen", "clientesOpen", "metricasOpen", "ticketsOpen"];
  if (key === "sidebarOpen") { state.sidebarOpen = !state.sidebarOpen; return; }
  const opening = !state[key];
  sections.forEach(s => { state[s] = false; });
  state[key] = opening;
}

function getZone(address) {
  const parts = address.split(",").map(p => p.trim());
  return parts.length >= 2 ? parts[1] : parts[0];
}

function renderOrderItem(o) {
  const idx = orders.indexOf(o);
  const isSelected = state.selectedOrder === idx;
  const info = getStateInfo(o.status);
  const lastTime = o.history[o.history.length - 1]?.time || "";
  const zone = getZone(o.address);

  return `
    <div class="order-item ${isSelected ? "selected" : ""} ${o.unread ? "unread" : ""}" data-action="select" data-idx="${idx}">
      <div class="order-item-top">
        <span class="order-id">${o.id} · ${o.client}</span>
        <span class="order-time">${lastTime}</span>
      </div>
      <div class="order-item-body">
        <div>
          <div class="order-preview">${o.needsAction ? "⚠️ " : ""}<span class="zone-tag">${zone}</span> ${o.description.substring(0, 45)}...</div>
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
      <div class="detail-row"><span class="label">Cliente</span><span class="value"><a class="link-nav" data-action="go-client" data-name="${o.client}">${o.client}</a></span></div>
      <div class="detail-row"><span class="label">Teléfono</span><span class="value">${o.phone}</span></div>
      <div class="detail-row"><span class="label">Dirección</span><span class="value">${o.address} <span class="zone-tag">${getZone(o.address)}</span></span></div>
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
    ${o.status === "COMPLETED" ? `
    <div class="detail-card">
      <h3>Evidencia de entrega</h3>
      <div class="proof-grid">
        <div class="proof-thumb">
          <div class="proof-placeholder">📷</div>
          <span>Medidor</span>
        </div>
        <div class="proof-thumb">
          <div class="proof-placeholder">🧾</div>
          <span>Ticket</span>
        </div>
      </div>
    </div>` : ""}

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
  if (a === "category") { state.category = t.dataset.key; state.selectedOrder = null; state.view = "pedidos"; render(); }
  if (a === "nav-view") { state.view = t.dataset.view; state.selectedTruck = null; state.truckModal = null; render(); }
  if (a === "toggle-filters") { state.showFilters = !state.showFilters; render(); }
  if (a === "toggle-sidebar") { collapseAllExcept("sidebarOpen"); render(); }
  if (a === "toggle-flotilla") { collapseAllExcept("flotillaOpen"); render(); }
  if (a === "toggle-vendedores") { collapseAllExcept("vendedoresOpen"); render(); }
  if (a === "toggle-clientes") { collapseAllExcept("clientesOpen"); render(); }
  if (a === "toggle-metricas") { collapseAllExcept("metricasOpen"); render(); }
  if (a === "toggle-tickets") { collapseAllExcept("ticketsOpen"); render(); }

  // Trucks
  if (a === "select-truck") { state.selectedTruck = parseInt(t.dataset.idx); state.truckModal = null; render(); }
  if (a === "truck-add") { state.truckModal = "add"; state.editingTruck = null; state.selectedTruck = null; render(); }
  if (a === "truck-edit") {
    const idx = parseInt(t.dataset.idx);
    state.truckModal = "edit";
    state.editingTruck = { ...trucks[idx], drivers: [...trucks[idx].drivers] };
    state.editingTruck._idx = idx;
    render();
  }
  if (a === "truck-delete") {
    const idx = parseInt(t.dataset.idx);
    trucks.splice(idx, 1);
    state.selectedTruck = null;
    render();
  }
  if (a === "truck-save") {
    const plate = document.getElementById("truck-plate").value;
    const type = document.getElementById("truck-type").value;
    const capacity = document.getElementById("truck-capacity").value;
    const status = document.getElementById("truck-status").value;
    const route = document.getElementById("truck-route").value;
    const drivers = document.getElementById("truck-drivers").value.split(",").map(d => d.trim()).filter(Boolean);
    const obj = { plate, type, capacity, status, route, drivers, trips: [] };
    if (state.truckModal === "edit") {
      const idx = state.editingTruck._idx;
      obj.id = trucks[idx].id;
      obj.trips = trucks[idx].trips;
      trucks[idx] = obj;
      state.selectedTruck = idx;
    } else {
      obj.id = "T-" + String(trucks.length + 1).padStart(3, "0");
      trucks.push(obj);
      state.selectedTruck = trucks.length - 1;
    }
    state.truckModal = null;
    state.editingTruck = null;
    render();
  }
  if (a === "truck-cancel") { state.truckModal = null; state.editingTruck = null; render(); }

  // Drivers
  if (a === "select-driver") { state.selectedDriver = parseInt(t.dataset.idx); state.driverModal = null; render(); }
  if (a === "driver-add") { state.driverModal = "add"; state.editingDriver = null; state.selectedDriver = null; render(); }
  if (a === "driver-edit") {
    const idx = parseInt(t.dataset.idx);
    state.driverModal = "edit";
    state.editingDriver = { ...drivers[idx], trucks: [...drivers[idx].trucks] };
    state.editingDriver._idx = idx;
    render();
  }
  if (a === "driver-delete") {
    const idx = parseInt(t.dataset.idx);
    drivers.splice(idx, 1);
    state.selectedDriver = null;
    render();
  }
  if (a === "driver-save") {
    const name = document.getElementById("driver-name").value;
    const phone = document.getElementById("driver-phone").value;
    const license = document.getElementById("driver-license").value;
    const status = document.getElementById("driver-status").value;
    const availability = document.getElementById("driver-availability").value;
    const driverTrucks = document.getElementById("driver-trucks").value.split(",").map(t => t.trim()).filter(Boolean);
    const obj = { name, phone, license, status, availability, trucks: driverTrucks, rating: 0, totalTrips: 0, trips: [] };
    if (state.driverModal === "edit") {
      const idx = state.editingDriver._idx;
      obj.id = drivers[idx].id;
      obj.rating = drivers[idx].rating;
      obj.totalTrips = drivers[idx].totalTrips;
      obj.trips = drivers[idx].trips;
      drivers[idx] = obj;
      state.selectedDriver = idx;
    } else {
      obj.id = "D-" + String(drivers.length + 1).padStart(3, "0");
      drivers.push(obj);
      state.selectedDriver = drivers.length - 1;
    }
    state.driverModal = null;
    state.editingDriver = null;
    render();
  }
  if (a === "driver-cancel") { state.driverModal = null; state.editingDriver = null; render(); }
  if (a === "driver-add-truck") {
    const idx = parseInt(t.dataset.idx);
    const plate = prompt("Placa del camión a asignar:");
    if (plate && plate.trim()) { drivers[idx].trucks.push(plate.trim()); render(); }
  }
  if (a === "driver-remove-truck") {
    const idx = parseInt(t.dataset.idx);
    const ti = parseInt(t.dataset.ti);
    drivers[idx].trucks.splice(ti, 1);
    render();
  }

  // Sellers
  if (a === "seller-add") { state.sellerModal = "add"; state.editingSeller = null; state.selectedSellers = []; render(); }
  if (a === "seller-edit") {
    const idx = state.selectedSellers[0];
    state.sellerModal = "edit";
    state.editingSeller = { ...sellers[idx] };
    state.editingSeller._idx = idx;
    render();
  }
  if (a === "seller-delete-selected") {
    state.selectedSellers.sort((a, b) => b - a).forEach(idx => sellers.splice(idx, 1));
    state.selectedSellers = [];
    render();
  }
  if (a === "seller-delete") {
    const idx = parseInt(t.dataset.idx);
    sellers.splice(idx, 1);
    state.selectedSellers = [];
    render();
  }
  if (a === "seller-save") {
    const id = document.getElementById("seller-id").value;
    const name = document.getElementById("seller-name").value;
    const phone = document.getElementById("seller-phone").value;
    const email = document.getElementById("seller-email").value;
    const obj = { id, name, phone, email, clients: 0, sales: 0 };
    if (state.sellerModal === "edit") {
      const idx = state.editingSeller._idx;
      obj.clients = sellers[idx].clients;
      obj.sales = sellers[idx].sales;
      sellers[idx] = obj;
      state.selectedSeller = idx;
    } else {
      sellers.push(obj);
      state.selectedSeller = sellers.length - 1;
    }
    state.sellerModal = null;
    state.editingSeller = null;
    render();
  }
  if (a === "seller-cancel") { state.sellerModal = null; state.editingSeller = null; render(); }

  // Clients
  if (a === "nav-clients") { state.view = "clientes"; state.clientFilter = t.dataset.filter; state.selectedClient = null; render(); }
  if (a === "select-client") { state.selectedClient = parseInt(t.dataset.idx); state.clientModal = null; render(); }
  if (a === "client-add") { state.clientModal = "add"; state.editingClient = null; state.selectedClient = null; render(); }
  if (a === "client-edit") {
    const idx = parseInt(t.dataset.idx);
    state.clientModal = "edit";
    state.editingClient = { ...clients[idx] };
    state.editingClient._idx = idx;
    render();
  }
  if (a === "client-delete") {
    const idx = parseInt(t.dataset.idx);
    clients.splice(idx, 1);
    state.selectedClient = null;
    render();
  }
  if (a === "client-save") {
    const type = document.getElementById("client-type").value;
    const obj = {
      name: document.getElementById("client-name").value,
      type,
      phone: document.getElementById("client-phone").value,
      email: document.getElementById("client-email").value,
      address: document.getElementById("client-address").value,
      tankType: document.getElementById("client-tank").value,
      seller: document.getElementById("client-seller").value,
      businessName: null, rfc: null, convenio: null, creditLine: null,
    };
    if (type === "empresarial") {
      obj.businessName = document.getElementById("client-business")?.value || null;
      obj.rfc = document.getElementById("client-rfc")?.value || null;
      obj.convenio = document.getElementById("client-convenio")?.value || null;
      obj.creditLine = parseFloat(document.getElementById("client-credit")?.value) || null;
    }
    if (state.clientModal === "edit") {
      const idx = state.editingClient._idx;
      obj.id = clients[idx].id;
      clients[idx] = obj;
      state.selectedClient = idx;
    } else {
      obj.id = "CLI-" + String(clients.length + 1).padStart(3, "0");
      clients.push(obj);
      state.selectedClient = clients.length - 1;
    }
    state.clientModal = null;
    state.editingClient = null;
    render();
  }
  if (a === "client-cancel") { state.clientModal = null; state.editingClient = null; render(); }

  // Price
  if (a === "update-price") {
    const val = parseFloat(document.getElementById("new-price").value);
    if (val > 0) { currentPrice = val; render(); }
  }

  // Navigate to client from order
  if (a === "go-client") {
    const name = t.dataset.name;
    const idx = clients.findIndex(c => c.name === name);
    if (idx >= 0) { state.view = "clientes"; state.selectedClient = idx; state.clientFilter = ""; render(); }
  }
  // Navigate to order from client
  if (a === "go-order") {
    const idx = parseInt(t.dataset.idx);
    state.view = "pedidos"; state.selectedOrder = idx; state.category = "ALL"; render();
  }
  if (a === "go-order-by-id") {
    const id = t.dataset.id;
    const idx = orders.findIndex(o => o.id === id);
    if (idx >= 0) { state.view = "pedidos"; state.selectedOrder = idx; state.category = "ALL"; render(); }
  }

  // PQRS
  if (a === "nav-pqrs") { state.view = "pqrs"; state.pqrsFilter = t.dataset.filter; state.selectedTicket = null; render(); }
  if (a === "select-ticket") { state.selectedTicket = parseInt(t.dataset.idx); render(); }
  if (a === "add-ticket-note") {
    const idx = parseInt(t.dataset.idx);
    const input = document.getElementById("ticket-note");
    if (input && input.value.trim()) {
      tickets[idx].notes.push({ date: "20 may, " + new Date().toLocaleTimeString("es-MX", { hour: "2-digit", minute: "2-digit" }), author: "Admin", text: input.value.trim() });
      render();
    }
  }

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
  if (e.target.closest("[data-action='truck-search']")) {
    state.truckSearch = e.target.value;
    state.selectedTruck = null;
    render();
  }
  if (e.target.closest("[data-action='driver-search']")) {
    state.driverSearch = e.target.value;
    state.selectedDriver = null;
    render();
  }
  if (e.target.closest("[data-action='seller-search']")) {
    state.sellerSearch = e.target.value;
    state.selectedSellers = [];
    render();
  }
  if (e.target.closest("[data-action='client-search']")) {
    state.clientSearch = e.target.value;
    state.selectedClient = null;
    render();
  }
});

document.addEventListener("change", (e) => {
  if (e.target.closest("[data-action='sort-select']")) {
    state.sortBy = e.target.value;
    render();
  }
  if (e.target.closest("[data-action='truck-filter-status']")) {
    state.truckFilter = e.target.value;
    state.selectedTruck = null;
    render();
  }
  if (e.target.closest("[data-action='driver-filter-status']")) {
    state.driverFilter = e.target.value;
    state.selectedDriver = null;
    render();
  }
  if (e.target.closest("[data-action='change-availability']")) {
    const idx = parseInt(e.target.dataset.idx);
    drivers[idx].availability = e.target.value;
    render();
  }
  if (e.target.closest("[data-action='client-filter-type']")) {
    state.clientFilter = e.target.value;
    state.selectedClient = null;
    render();
  }
  if (e.target.closest("[data-action='pqrs-filter']")) {
    state.pqrsFilter = e.target.value;
    state.selectedTicket = null;
    render();
  }
  if (e.target.closest("[data-action='change-ticket-status']")) {
    const idx = parseInt(e.target.dataset.idx);
    tickets[idx].status = e.target.value;
    render();
  }
  if (e.target.closest("[data-action='seller-select']")) {
    const idx = parseInt(e.target.dataset.idx);
    if (e.target.checked) { state.selectedSellers.push(idx); }
    else { state.selectedSellers = state.selectedSellers.filter(i => i !== idx); }
    render();
  }
  if (e.target.closest("[data-action='seller-select-all']")) {
    if (e.target.checked) {
      state.selectedSellers = sellers.map((_, i) => i);
    } else {
      state.selectedSellers = [];
    }
    render();
  }
  if (e.target.closest("[data-action='client-type-change']")) {
    const newType = e.target.value;
    if (!state.editingClient) state.editingClient = { name: "", type: newType, phone: "", email: "", address: "", tankType: "", seller: "", businessName: "", rfc: "", convenio: "", creditLine: "" };
    else state.editingClient.type = newType;
    // Preserve form values
    const nameEl = document.getElementById("client-name");
    if (nameEl) {
      state.editingClient.name = nameEl.value;
      state.editingClient.phone = document.getElementById("client-phone").value;
      state.editingClient.email = document.getElementById("client-email").value;
      state.editingClient.address = document.getElementById("client-address").value;
      state.editingClient.tankType = document.getElementById("client-tank").value;
      state.editingClient.seller = document.getElementById("client-seller").value;
    }
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
