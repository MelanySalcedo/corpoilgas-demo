# Corpoilgas — Entendimiento del Problema y Flujos

---

## ¿Qué es esto?

Corpoilgas es una empresa mexicana de distribución de gas LP. Tienen camiones que recorren zonas recargando cilindros/tanques en casas y negocios. Quieren una app que digitalice ese proceso.

**Hoy (sin app):**
El camión sale con una ruta. Pasa por las calles tocando claxon o con altavoz. El cliente sale, le pide la recarga, el operador la hace, cobra en efectivo, y se va. No hay registro formal, no hay comprobante, no hay forma de que el cliente "pida" sin estar en casa esperando.

**Con la app:**
El cliente pide desde su celular. La empresa organiza las recargas. El operador sabe a dónde ir. El cliente sabe quién viene y cuándo. Hay comprobante. Hay control de ingresos.

---

## El Problema Real (lo que la app resuelve)

```
CLIENTE:
  "No sé cuándo pasa el camión"
  "Tengo que estar en casa esperando"
  "No tengo comprobante de lo que pagué"
  "No sé quién es el que viene a mi casa"

EMPRESA:
  "No sé cuánto vendió cada operador"
  "No sé cuánto efectivo se cobró en la calle"
  "No puedo asociar ventas a vendedores para pagarles comisión"
  "No tengo métricas de nada"
  "No puedo planificar rutas basándome en demanda"
```

---

## Los Actores

### Cliente
La persona que tiene un cilindro o tanque estacionario en su casa/negocio y necesita que se lo recarguen.

**¿Qué necesita?**
- Pedir una recarga sin tener que esperar al camión
- Saber quién viene (seguridad)
- Pagar como quiera (efectivo, tarjeta, transferencia)
- Tener un comprobante
- Que le recuerden cuando ya va a necesitar gas otra vez

### Operador (el "pipero")
La persona que maneja el camión y ejecuta la recarga física del cilindro.

**¿Qué necesita?**
- Saber a dónde ir (lista de pedidos del día)
- Confirmar que hizo la recarga
- Si cobró en efectivo, reportarlo

### Vendedor
Persona que genera la venta. A veces es el mismo operador, a veces no. Gana comisión.

**¿Qué necesita?**
- Que sus ventas queden registradas con su código
- Ver cuánto ha ganado en comisiones

### Admin (la empresa)
Corpoilgas como entidad que controla todo.

**¿Qué necesita?**
- Ver dónde están sus camiones (GPS)
- Saber cuánto se vendió, por quién, y cómo se cobró
- Asignar pedidos a operadores
- Controlar quién trabaja para ellos
- Métricas para tomar decisiones

---

## El Flujo Real del Negocio (cómo funciona con la app)

### Flujo completo paso a paso:

```
1. CLIENTE abre la app
   └─▶ Ve el catálogo (recargas por kg o por precio)
   └─▶ Elige qué quiere, confirma su dirección
   └─▶ Elige cómo pagar (tarjeta/OXXO/SPEI/efectivo)
   └─▶ Confirma pedido
       ⚠️ Hay un CORTE: no puede pedir si el camión ya salió
       ⚠️ Tampoco puede cancelar después del corte

2. ADMIN ve el pedido nuevo en su panel
   └─▶ Decide qué operador/camión lo atiende
   └─▶ Asigna el pedido
       → El CLIENTE recibe notificación: "Te atenderá Juan, placa XYZ-123" (credencial)
       → El OPERADOR recibe notificación: "Tienes un pedido nuevo en [dirección]"

3. OPERADOR sale con su ruta del día
   └─▶ Ve su lista de pedidos asignados
   └─▶ Llega a la dirección del cliente
   └─▶ Hace la recarga física
   └─▶ Si el pago es en efectivo → cobra y registra en la app
   └─▶ Marca "Entregado" en la app
       → Se genera TICKET automático para el cliente
       → Se registra la COMISIÓN del vendedor asociado
       → El CLIENTE recibe notificación + ticket

4. CLIENTE recibe su comprobante
   └─▶ Puede verlo en su historial
   └─▶ ~30 días después → recibe recordatorio: "¿Ya necesitas gas?"
```

---

## ¿Qué NO es esta app?

- **NO es Rappi/Uber** donde el pedido es "para ahorita" y ves al repartidor moverse en mapa
- **NO hay tracking de ruta** para el cliente. Solo ve estados: Confirmado → Asignado → En camino → Entregado
- **NO es un marketplace** con múltiples proveedores. Es solo Corpoilgas
- **NO hay inventario complejo**. El camión sale lleno y recarga hasta que se vacía
- **El GPS es para el admin**, no para el cliente

---

## Lo que NO entendemos todavía (huecos)

### Sobre el flujo de pedido:

```
❓ ¿El cliente pide "para mañana" o "para cuando puedan"?
   → ¿Hay calendario? ¿O solo pide y la empresa decide cuándo?
   
❓ ¿Qué pasa si el camión no puede atender todos los pedidos del día?
   → ¿Se reprograman? ¿Se notifica al cliente?

❓ ¿El corte es por hora fija (ej: "antes de las 7am") o por horas antes de salida?
   → ¿Y si hay múltiples salidas al día?
```

### Sobre la asignación:

```
❓ ¿El admin asigna pedido por pedido o asigna una zona completa a un camión?
   → Si es por zona: ¿las zonas ya existen? ¿Cómo se definen?
   
❓ ¿Un camión puede tener múltiples pedidos en una salida?
   → Obvio que sí, pero ¿hay un límite? ¿Se optimiza la ruta?

❓ ¿El operador puede rechazar un pedido? ¿O lo que el admin dice es ley?
```

### Sobre el vendedor y la comisión:

```
❓ ¿Cómo se asocia el vendedor a la venta?
   → ¿El cliente ingresa el código del vendedor al pedir?
   → ¿O el admin lo asigna manualmente?
   → ¿O el operador (que también es vendedor) se auto-asocia?

❓ ¿La comisión es por cada recarga o solo por clientes nuevos?

❓ ¿Cuánto es la comisión? (% del total, monto fijo, escalonado)
```

### Sobre pagos y dinero:

```
❓ Si el cliente paga en efectivo, ¿el operador se queda con el dinero y luego lo entrega?
   → ¿Cómo se concilia? ¿Al final del día? ¿Por turno?

❓ ¿El precio del gas cambia? ¿Cada cuánto? ¿Quién lo actualiza?

❓ ¿Hay IVA? ¿El precio mostrado es con o sin impuestos?
```

### Sobre el GPS:

```
❓ ¿Qué sistema GPS tienen hoy? ¿Marca? ¿Tiene API?
   → Si no tiene API, ¿cómo lo integramos?
   → ¿O usamos el GPS del celular del operador como alternativa?
```

### Sobre el ticket:

```
❓ ¿El ticket es solo informativo o necesitan que sirva para facturar después?
   → Si es para facturar: necesitamos RFC del cliente, y eso cambia el registro

❓ ¿El ticket lleva datos fiscales de Corpoilgas? (RFC, razón social, dirección)
```

---

## Flujo visual simplificado

```
                    ┌─────────────────────────────────────────┐
                    │              ADMIN                       │
                    │  • Ve pedidos nuevos                     │
                    │  • Asigna a operador                     │
                    │  • Monitorea GPS                         │
                    │  • Ve métricas e ingresos                │
                    └────────────┬────────────────────────────┘
                                 │ asigna
                                 ▼
┌──────────────┐    ┌─────────────────────┐    ┌──────────────────┐
│   CLIENTE    │    │     OPERADOR        │    │    VENDEDOR      │
│              │    │                     │    │                  │
│ • Pide       │    │ • Recibe pedidos    │    │ • Tiene código   │
│ • Paga       │◀───│ • Hace la recarga   │    │ • Gana comisión  │
│ • Ve estado  │    │ • Confirma entrega  │    │ • (puede ser el  │
│ • Ve ticket  │    │ • Cobra efectivo    │    │    mismo operador)│
│ • Recibe     │    │                     │    │                  │
│   recordatorio│    └─────────────────────┘    └──────────────────┘
└──────────────┘              │
                              │ confirma entrega
                              ▼
                    ┌─────────────────────┐
                    │  SE GENERA:         │
                    │  • Ticket al cliente│
                    │  • Comisión vendedor│
                    │  • Registro ingreso │
                    └─────────────────────┘
```

---

## Estados de un Pedido

```
[Creado] ──▶ [Asignado] ──▶ [En camino] ──▶ [Entregado]
    │                                              │
    ▼                                              ▼
[Cancelado]                                  [Ticket generado]
(solo antes                                  [Comisión registrada]
 del corte)                                  [Ingreso registrado]
```

**¿Quién mueve cada estado?**
| Transición | Quién la hace |
|-----------|---------------|
| Creado → Asignado | Admin (asigna operador) |
| Asignado → En camino | Operador (sale a la dirección) |
| En camino → Entregado | Operador (confirma recarga) |
| Creado → Cancelado | Cliente (antes del corte) o Admin (siempre) |

---

## Próximos pasos

1. **Resolver los huecos** de la sección "Lo que NO entendemos" con el cliente
2. Con esas respuestas, definir reglas de negocio exactas
3. Entonces sí: desglosar features técnicas para desarrollo

---

*Última actualización: 14 mayo 2026*
