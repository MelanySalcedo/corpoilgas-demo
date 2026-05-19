# Cotización — Plataforma de Entrega de Gas a Domicilio

**Cliente:** Corpoilgas
**Fecha:** 21 de abril de 2026
**Vigencia:** 30 días
**Equipo asignado:** 2 desarrolladores senior full-stack

---

## Resumen del Proyecto

Desarrollo de una plataforma móvil/web tipo Rappi especializada exclusivamente en la entrega de tanques de gas (pipetas), con flujo completo de pedido, seguimiento en tiempo real del repartidor en mapa, y pasarela de pago integrada.

---

## Alcance Funcional

### Fase 1 — MVP (6 semanas)

| Módulo | Descripción |
|--------|-------------|
| **Catálogo de productos** | Listado de pipetas por peso (20kg, 30kg, 45kg) con precios y descripción |
| **Registro/Login** | Autenticación por correo y teléfono (OTP) |
| **Gestión de direcciones** | Alta, edición y selección de direcciones de entrega con mapa |
| **Flujo de pedido** | Selección de producto → checkout → confirmación |
| **Pasarela de pago** | Integración con Stripe o MercadoPago (tarjeta crédito/débito + efectivo) |
| **Tracking en tiempo real** | Mapa con ubicación del repartidor en vivo, ETA y estados del pedido |
| **Notificaciones push** | Confirmación de pedido, repartidor en camino, entrega completada |
| **Historial de pedidos** | Listado de pedidos anteriores con detalle y opción de repetir |
| **Panel básico de admin** | Gestión de pedidos, repartidores y catálogo de productos |

### Fase 2 — Mejoras (4 semanas)

| Módulo | Descripción |
|--------|-------------|
| **Suscripción recurrente** | Entrega automática programada (semanal, quincenal, mensual) |
| **Calificación y reseñas** | Rating del repartidor y del servicio post-entrega |
| **Cupones y promociones** | Sistema de descuentos y códigos promocionales |
| **App del repartidor** | App dedicada para aceptar pedidos, navegar y confirmar entregas |
| **Reportes y métricas** | Dashboard con ventas, pedidos por zona, tiempos de entrega |

---

## Stack Tecnológico

| Capa | Tecnología |
|------|-----------|
| Frontend móvil | React Native (iOS + Android) |
| Frontend web admin | React |
| Backend / API | Node.js |
| Base de datos | PostgreSQL + Redis (cache/sesiones) |
| Tracking en tiempo real | WebSockets |
| Pagos | Stripe o MercadoPago |
| Mapas | Google Maps / Mapbox |
| Infraestructura | AWS (ECS, RDS, S3, CloudFront) |
| Notificaciones | Firebase Cloud Messaging |

---

## Cronograma

| Fase | Duración | Entregable |
|------|----------|-----------|
| Diseño UI/UX | 1 semana | Wireframes y diseño en Figma |
| Fase 1 — MVP | 6 semanas | App funcional con flujo completo de pedido, pago y tracking |
| QA y ajustes | 1 semana | Testing, corrección de bugs, optimización |
| Fase 2 — Mejoras | 4 semanas | Suscripciones, app repartidor, reportes |
| **Total** | **12 semanas** | |

---

## Inversión

> Tarifa preferencial por cliente estratégico fundador.

### Fase 1 — MVP

| Concepto | Detalle | Costo |
|----------|---------|-------|
| Desarrollo (2 devs × 8 semanas) | Diseño + desarrollo + QA | $4,800 USD |
| Infraestructura (3 meses) | AWS, dominios, servicios terceros | $300 USD |
| Integración pasarela de pago | Stripe / MercadoPago | Incluido |
| **Subtotal Fase 1** | | **$5,100 USD** |

### Fase 2 — Mejoras

| Concepto | Detalle | Costo |
|----------|---------|-------|
| Desarrollo (2 devs × 4 semanas) | Suscripciones, app repartidor, reportes | $2,400 USD |
| **Subtotal Fase 2** | | **$2,400 USD** |

### Resumen

| | |
|---|---|
| **Total Fase 1 + Fase 2** | **$7,500 USD** |
| Forma de pago | 40% inicio · 30% entrega MVP · 30% entrega final |
| Mantenimiento mensual (opcional) | $400 USD/mes (soporte, hosting, actualizaciones menores) |

---

## Qué Incluye

- Código fuente completo entregado al cliente
- Despliegue en producción (App Store, Play Store, web admin)
- 30 días de soporte post-entrega sin costo adicional
- Documentación técnica básica
- Capacitación al equipo operativo (1 sesión)

## Qué No Incluye

- Contenido (textos, fotos de productos)
- Comisiones de la pasarela de pago (las cobra el proveedor directamente)
- Cuentas de desarrollador en App Store ($99 USD/año) y Play Store ($25 USD único)
- Funcionalidades no descritas en este documento

---

## Notas

- Los costos de infraestructura AWS pueden variar según volumen de usuarios.
- La tarifa refleja un precio preferencial como primer cliente estratégico. Proyectos similares en el mercado se cotizan entre $15,000 y $25,000 USD.
- Cualquier funcionalidad adicional fuera del alcance se cotiza por separado.

---

*Cotización preparada para Corpoilgas — Abril 2026*
