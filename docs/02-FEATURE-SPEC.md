# Corpoilgas — Feature Spec (Design Document)

> Documento de features desglosadas para asignación a desarrolladores.
> Cada feature tiene: descripción, criterios de aceptación, dependencias y prioridad.

---

## Convenciones

- **Prioridad:** P0 = bloqueante para MVP | P1 = necesario para MVP | P2 = nice-to-have / Fase 2
- **Esfuerzo:** S (1-2 días) | M (3-5 días) | L (1-2 semanas) | XL (2+ semanas)
- **Rol afectado:** 👤 Cliente | 🚚 Operador | 💼 Vendedor | 🛡️ Admin

---

## MÓDULO 1: Autenticación y Usuarios

### F-001: Registro de cliente
| | |
|---|---|
| **Prioridad** | P0 |
| **Esfuerzo** | M |
| **Rol** | 👤 Cliente |
| **Descripción** | El cliente se registra con: nombre, teléfono, email, contraseña, dirección, nombre del negocio (opcional). OAuth con Google/Facebook como alternativa. |

**Criterios de aceptación:**
- [ ] Registro por email + contraseña funcional
- [ ] Validación de teléfono (formato MX: 10 dígitos)
- [ ] OAuth Google y Facebook funcional
- [ ] Campo "nombre del negocio" opcional
- [ ] Al registrarse, se crea dirección principal
- [ ] Email de bienvenida enviado

**Dependencias:** Ninguna (es el punto de partida)

---

### F-002: Login / Sesión
| | |
|---|---|
| **Prioridad** | P0 |
| **Esfuerzo** | S |
| **Rol** | 👤🚚🛡️ Todos |
| **Descripción** | Login por email+contraseña o OAuth. JWT con refresh token. Sesión persistente en móvil. |

**Criterios de aceptación:**
- [ ] Login con email + contraseña
- [ ] Login con Google / Facebook
- [ ] JWT generado con expiración (15min access, 7d refresh)
- [ ] Redirige según rol: cliente→app, operador→vista operador, admin→panel
- [ ] "Olvidé mi contraseña" con email de recuperación

**Dependencias:** F-001

---

### F-003: Gestión de usuarios (Admin)
| | |
|---|---|
| **Prioridad** | P0 |
| **Esfuerzo** | M |
| **Rol** | 🛡️ Admin |
| **Descripción** | El admin crea operadores y vendedores. Asigna camión al operador. Asigna código de vendedor. Un usuario puede ser operador Y vendedor simultáneamente. |

**Criterios de aceptación:**
- [ ] CRUD de operadores (nombre, teléfono, foto, placa asignada)
- [ ] CRUD de vendedores (nombre, código único autogenerado)
- [ ] Poder marcar un usuario como operador+vendedor
- [ ] Activar/desactivar usuarios
- [ ] Listado con filtros por rol y estado

**Dependencias:** F-002

---

## MÓDULO 2: Catálogo y Pedidos

### F-004: Catálogo de recargas
| | |
|---|---|
| **Prioridad** | P0 |
| **Esfuerzo** | S |
| **Rol** | 👤 Cliente |
| **Descripción** | Listado de opciones de recarga. Puede ser por presentación (20kg, 30kg, 45kg) o por monto ($). Admin configura productos. |

**Criterios de aceptación:**
- [ ] Cliente ve lista de productos disponibles con precio
- [ ] Productos tienen: nombre, descripción, precio, tipo (por_kg | por_monto), activo
- [ ] Solo se muestran productos activos
- [ ] Admin puede crear/editar/desactivar productos (ver F-014)

**Dependencias:** F-002

---

### F-005: Flujo de pedido (checkout)
| | |
|---|---|
| **Prioridad** | P0 |
| **Esfuerzo** | L |
| **Rol** | 👤 Cliente |
| **Descripción** | El cliente selecciona producto(s), confirma dirección, elige método de pago y confirma pedido. Hay ventana de corte: no se puede pedir X horas antes de la salida del camión. |

**Criterios de aceptación:**
- [ ] Selección de producto con cantidad
- [ ] Selección/edición de dirección de entrega
- [ ] Selección de método de pago (tarjeta, OXXO, SPEI, efectivo)
- [ ] Resumen del pedido antes de confirmar
- [ ] Validación de ventana de corte (configurable por admin)
- [ ] Al confirmar: pedido creado con status "pendiente"
- [ ] Notificación push de confirmación al cliente

**Dependencias:** F-004, F-006, F-007

---

### F-006: Gestión de direcciones
| | |
|---|---|
| **Prioridad** | P0 |
| **Esfuerzo** | S |
| **Rol** | 👤 Cliente |
| **Descripción** | El cliente puede tener múltiples direcciones guardadas. Selecciona una al hacer pedido. |

**Criterios de aceptación:**
- [ ] CRUD de direcciones (calle, colonia, ciudad, estado, CP, referencia)
- [ ] Marcar una como "principal"
- [ ] Geocodificación opcional (lat/lng para asignación futura por zona)

**Dependencias:** F-001

---

### F-007: Métodos de pago
| | |
|---|---|
| **Prioridad** | P0 |
| **Esfuerzo** | L |
| **Rol** | 👤 Cliente |
| **Descripción** | Integración con pasarela para tarjeta, OXXO Pay y SPEI. Efectivo no requiere pasarela (se marca al confirmar entrega). |

**Criterios de aceptación:**
- [ ] Pago con tarjeta crédito/débito (tokenización, no guardar datos raw)
- [ ] Generación de referencia OXXO Pay
- [ ] Generación de datos SPEI
- [ ] Opción "Efectivo contra entrega" (sin cobro digital)
- [ ] Webhook para confirmar pagos async (OXXO, SPEI)
- [ ] Estado de pago: pendiente | pagado | fallido

**Dependencias:** Integración con Conekta/Stripe/MercadoPago

---

### F-008: Cancelación de pedido
| | |
|---|---|
| **Prioridad** | P1 |
| **Esfuerzo** | S |
| **Rol** | 👤 Cliente |
| **Descripción** | El cliente puede cancelar si está dentro de la ventana permitida. Fuera de ventana, no se puede cancelar. |

**Criterios de aceptación:**
- [ ] Botón "Cancelar pedido" visible solo si está en ventana
- [ ] Al cancelar: status → "cancelado", reembolso si ya pagó digitalmente
- [ ] Fuera de ventana: botón deshabilitado con mensaje explicativo
- [ ] Admin puede cancelar cualquier pedido en cualquier momento

**Dependencias:** F-005

---

## MÓDULO 3: Operador

### F-009: Vista del operador (pedidos asignados)
| | |
|---|---|
| **Prioridad** | P0 |
| **Esfuerzo** | M |
| **Rol** | 🚚 Operador |
| **Descripción** | El operador ve sus pedidos asignados del día. Puede ver detalle de cada uno y marcar como "en camino" o "entregado". |

**Criterios de aceptación:**
- [ ] Lista de pedidos asignados al operador (hoy)
- [ ] Detalle: cliente, dirección, producto, método de pago
- [ ] Cambiar estado: pendiente → en camino → entregado
- [ ] Si pago es efectivo: campo para confirmar monto cobrado
- [ ] Al marcar "entregado": se genera ticket automáticamente

**Dependencias:** F-003, F-005

---

### F-010: Credencial del operador (para el cliente)
| | |
|---|---|
| **Prioridad** | P1 |
| **Esfuerzo** | S |
| **Rol** | 👤 Cliente |
| **Descripción** | Cuando se asigna un operador al pedido, el cliente recibe notificación con los datos del operador: nombre, foto, placa del camión. |

**Criterios de aceptación:**
- [ ] Al asignar operador → push notification al cliente
- [ ] En la vista de estado del pedido, se muestra: nombre, foto, placa
- [ ] Datos vienen del perfil del operador (creado por admin)

**Dependencias:** F-009, F-003

---

## MÓDULO 4: Vendedor y Comisiones

### F-011: Código de vendedor
| | |
|---|---|
| **Prioridad** | P1 |
| **Esfuerzo** | S |
| **Rol** | 💼 Vendedor |
| **Descripción** | Cada vendedor tiene un código único. Este código se asocia a pedidos para calcular comisiones. El código puede ingresarse manualmente o (futuro) escanearse como QR. |

**Criterios de aceptación:**
- [ ] Código autogenerado al crear vendedor (ej: "VND-001")
- [ ] El código se puede asociar a un pedido (campo seller_code en orden)
- [ ] Admin puede ver/regenerar código de un vendedor
- [ ] (Futuro) QR que codifica el código del vendedor

**Dependencias:** F-003

---

### F-012: Comisiones
| | |
|---|---|
| **Prioridad** | P1 |
| **Esfuerzo** | M |
| **Rol** | 🛡️ Admin |
| **Descripción** | Cada pedido completado con vendedor asociado genera un registro de comisión. La lógica de cálculo es configurable por admin. |

**Criterios de aceptación:**
- [ ] Al completar pedido con seller_id → crear registro en tabla Commissions
- [ ] Comisión calculada según regla configurada (% o monto fijo — POR DEFINIR con cliente)
- [ ] Admin ve reporte de comisiones por vendedor y período
- [ ] Estado de comisión: pendiente | pagada

**Dependencias:** F-011, F-009

---

## MÓDULO 5: Tickets y Comprobantes

### F-013: Ticket digital
| | |
|---|---|
| **Prioridad** | P0 |
| **Esfuerzo** | M |
| **Rol** | 👤 Cliente |
| **Descripción** | Al confirmar la entrega, se genera un comprobante digital para el cliente. Ticket genérico (no fiscal). |

**Datos del ticket:**
- Número de ticket / folio
- Fecha y hora de la recarga
- Producto / cantidad / monto
- Método de pago
- Nombre del operador + placa
- Dirección de entrega
- Código del vendedor (si aplica)

**Criterios de aceptación:**
- [ ] Ticket generado automáticamente al marcar "entregado"
- [ ] Visible en historial de pedidos del cliente
- [ ] Descargable como PDF o imagen
- [ ] Push notification con link al ticket

**Dependencias:** F-009

---

## MÓDULO 6: Panel Admin

### F-014: Gestión de catálogo (Admin)
| | |
|---|---|
| **Prioridad** | P0 |
| **Esfuerzo** | S |
| **Rol** | 🛡️ Admin |
| **Descripción** | CRUD de productos/presentaciones de recarga. |

**Criterios de aceptación:**
- [ ] Crear/editar/desactivar productos
- [ ] Campos: nombre, peso_kg, precio, tipo_precio, descripción, activo
- [ ] Cambios reflejados inmediatamente en app del cliente

**Dependencias:** Ninguna

---

### F-015: Gestión de camiones
| | |
|---|---|
| **Prioridad** | P1 |
| **Esfuerzo** | S |
| **Rol** | 🛡️ Admin |
| **Descripción** | CRUD de vehículos. Asignación de operador a camión. |

**Criterios de aceptación:**
- [ ] Crear/editar camiones (placa, tipo, capacidad, GPS device ID)
- [ ] Asignar/reasignar operador a camión
- [ ] Un operador puede estar en más de un camión (en diferentes momentos)
- [ ] Historial de asignaciones

**Dependencias:** F-003

---

### F-016: Asignación de pedidos
| | |
|---|---|
| **Prioridad** | P0 |
| **Esfuerzo** | M |
| **Rol** | 🛡️ Admin |
| **Descripción** | El admin asigna pedidos a operadores. MVP = asignación manual. Futuro = automática por zona/ruta. |

**Criterios de aceptación:**
- [ ] Vista de pedidos pendientes de asignar
- [ ] Dropdown/selector de operadores disponibles
- [ ] Al asignar: status del pedido → "confirmado", notificación al operador y al cliente
- [ ] Poder reasignar si es necesario

**Dependencias:** F-005, F-003

---

### F-017: Monitoreo GPS
| | |
|---|---|
| **Prioridad** | P1 |
| **Esfuerzo** | L |
| **Rol** | 🛡️ Admin |
| **Descripción** | Mapa en el panel admin con ubicación en tiempo real de los camiones. Integración con sistema GPS existente de Corpoilgas. |

**Criterios de aceptación:**
- [ ] Mapa con marcadores de camiones activos
- [ ] Actualización en tiempo real (polling o websocket según API del GPS)
- [ ] Click en camión muestra: operador asignado, pedidos en ruta
- [ ] (Depende de respuesta del cliente sobre su sistema GPS)

**Dependencias:** F-015, API del GPS de Corpoilgas

---

### F-018: Reporte de ingresos
| | |
|---|---|
| **Prioridad** | P0 |
| **Esfuerzo** | M |
| **Rol** | 🛡️ Admin |
| **Descripción** | Dashboard con ingresos desglosados por método de pago. Crítico para control de efectivo. |

**Criterios de aceptación:**
- [ ] Total de ingresos por período (día, semana, mes)
- [ ] Desglose por método: tarjeta, OXXO, SPEI, efectivo
- [ ] Tabla de pedidos en efectivo (para conciliación)
- [ ] Filtros por fecha, zona, operador
- [ ] Exportar a CSV/Excel

**Dependencias:** F-005, F-009

---

### F-019: Métricas / Dashboard
| | |
|---|---|
| **Prioridad** | P1 |
| **Esfuerzo** | M |
| **Rol** | 🛡️ Admin |
| **Descripción** | KPIs principales del negocio en vista resumida. |

**Métricas MVP:**
- Pedidos completados hoy / esta semana / este mes
- Ingresos totales por período
- Comisiones generadas
- Pedidos por zona (si hay zonas configuradas)
- Operadores activos
- Tasa de cancelación
- Tiempo promedio entre confirmación y entrega

**Criterios de aceptación:**
- [ ] Dashboard con cards de KPIs principales
- [ ] Gráfica de ventas por día (últimos 30 días)
- [ ] Tabla resumen de operadores con pedidos completados

**Dependencias:** F-018

---

### F-020: Configuración de ventana de corte
| | |
|---|---|
| **Prioridad** | P1 |
| **Esfuerzo** | S |
| **Rol** | 🛡️ Admin |
| **Descripción** | El admin configura cuántas horas antes de la salida del camión es el límite para pedir/cancelar. |

**Criterios de aceptación:**
- [ ] Campo configurable: "Horas de corte para pedidos" (ej: 2 horas)
- [ ] Campo configurable: "Horas de corte para cancelación" (ej: 1 hora)
- [ ] Estos valores se usan en F-005 y F-008

**Dependencias:** Ninguna

---

## MÓDULO 7: Notificaciones y Recordatorios

### F-021: Notificaciones push
| | |
|---|---|
| **Prioridad** | P0 |
| **Esfuerzo** | M |
| **Rol** | 👤🚚 Cliente + Operador |
| **Descripción** | Sistema de notificaciones push para eventos del pedido. |

**Eventos que disparan notificación:**

| Evento | Destinatario | Mensaje |
|--------|-------------|---------|
| Pedido creado | Cliente | "Tu pedido #X fue recibido" |
| Operador asignado | Cliente | "Juan te atenderá hoy (placa ABC-123)" |
| Pedido asignado | Operador | "Nuevo pedido asignado: [dirección]" |
| En camino | Cliente | "Tu recarga está en camino" |
| Entregado | Cliente | "Recarga completada. Ver ticket" |
| Recordatorio mensual | Cliente | "¡Es hora de recargar tu gas!" |

**Criterios de aceptación:**
- [ ] Integración con Firebase Cloud Messaging
- [ ] Registro de device token al login
- [ ] Notificaciones enviadas en cada cambio de estado
- [ ] Historial de notificaciones en la app

**Dependencias:** F-002

---

### F-022: Recordatorio mensual
| | |
|---|---|
| **Prioridad** | P1 |
| **Esfuerzo** | S |
| **Rol** | 👤 Cliente |
| **Descripción** | ~30 días después de la última recarga, enviar push notification recordando al cliente que recargue. Configurable. |

**Criterios de aceptación:**
- [ ] Job/cron que revisa última fecha de pedido completado por cliente
- [ ] Si han pasado >= 30 días (configurable), enviar push
- [ ] El cliente puede desactivar recordatorios desde su perfil
- [ ] No enviar si el cliente ya tiene un pedido pendiente

**Dependencias:** F-021

---

## MÓDULO 8: Historial y Estado

### F-023: Historial de pedidos (Cliente)
| | |
|---|---|
| **Prioridad** | P1 |
| **Esfuerzo** | S |
| **Rol** | 👤 Cliente |
| **Descripción** | El cliente ve todos sus pedidos anteriores con detalle y puede repetir. |

**Criterios de aceptación:**
- [ ] Lista de pedidos ordenados por fecha (más reciente primero)
- [ ] Detalle: producto, monto, fecha, operador, estado, ticket
- [ ] Botón "Repetir pedido" (pre-llena checkout con mismos datos)
- [ ] Filtro por estado (completados, cancelados)

**Dependencias:** F-005

---

### F-024: Vista de estado del pedido (tracking)
| | |
|---|---|
| **Prioridad** | P0 |
| **Esfuerzo** | S |
| **Rol** | 👤 Cliente |
| **Descripción** | El cliente ve el estado actual de su pedido activo. Sin mapa, solo estados con timeline visual. |

**Estados:**
```
● Pedido confirmado
● Operador asignado (muestra credencial)
● En camino
● Entregado (muestra ticket)
```

**Criterios de aceptación:**
- [ ] Timeline visual con estados
- [ ] Actualización en tiempo real (websocket o polling)
- [ ] Al llegar a "Operador asignado": mostrar datos del operador
- [ ] Al llegar a "Entregado": mostrar link al ticket

**Dependencias:** F-009, F-010

---

## Resumen de Prioridades

### P0 — Bloqueantes para MVP (sin esto no se lanza)

| Feature | Módulo | Esfuerzo |
|---------|--------|----------|
| F-001 Registro cliente | Auth | M |
| F-002 Login | Auth | S |
| F-003 Gestión usuarios (admin) | Auth | M |
| F-004 Catálogo | Pedidos | S |
| F-005 Flujo de pedido | Pedidos | L |
| F-006 Direcciones | Pedidos | S |
| F-007 Métodos de pago | Pedidos | L |
| F-009 Vista operador | Operador | M |
| F-013 Ticket digital | Tickets | M |
| F-014 Catálogo admin | Admin | S |
| F-016 Asignación pedidos | Admin | M |
| F-018 Reporte ingresos | Admin | M |
| F-021 Notificaciones | Notif. | M |
| F-024 Estado del pedido | Historial | S |

### P1 — Necesario para MVP completo

| Feature | Módulo | Esfuerzo |
|---------|--------|----------|
| F-008 Cancelación | Pedidos | S |
| F-010 Credencial operador | Operador | S |
| F-011 Código vendedor | Vendedor | S |
| F-012 Comisiones | Vendedor | M |
| F-015 Gestión camiones | Admin | S |
| F-017 Monitoreo GPS | Admin | L |
| F-019 Dashboard métricas | Admin | M |
| F-020 Ventana de corte | Admin | S |
| F-022 Recordatorio mensual | Notif. | S |
| F-023 Historial pedidos | Historial | S |

---

## Estimación de Esfuerzo Total (MVP)

| Categoría | Features | Esfuerzo estimado |
|-----------|----------|-------------------|
| P0 (bloqueantes) | 14 features | ~6-7 semanas (2 devs) |
| P1 (MVP completo) | 10 features | ~3-4 semanas (2 devs) |
| **Total MVP** | **24 features** | **~10 semanas (2 devs)** |

> Nota: Estas estimaciones asumen 2 desarrolladores senior full-stack trabajando en paralelo (frontend + backend). No incluye diseño UI/UX ni QA dedicado.

---

*Documento vivo — última actualización: 14 mayo 2026*
