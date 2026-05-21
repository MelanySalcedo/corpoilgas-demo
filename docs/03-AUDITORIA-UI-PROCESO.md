# Auditoría UI/UX y de Proceso — Demo Corpoilgas

**Fecha:** 20 mayo 2026  
**Contexto:** Corpoilgas opera en San Luis Potosí, México. Distribuye Gas LP a domicilio con camiones cisterna propios. El mercado local incluye competidores como Gas Imperial (30+ años), Global Gas (app propia), y Gasconnect. En SLP, el servicio de relleno con pipa es exclusivamente para tanques estacionarios (Gas Imperial lo aclara explícitamente). Los cilindros se intercambian, no se rellenan en sitio.

---

## 1. AUDITORÍA DEL PROCESO (Flujo de negocio)

### ✅ Lo que está bien

| Aspecto | Evaluación |
|---------|-----------|
| Modelo de cobro tipo Uber (estimado → cobro real) | Correcto. El gas LP se cobra por litro real despachado. El medidor del camión determina la cantidad exacta. Esto es estándar en la industria. |
| Pre-autorización en tarjeta | Correcto. Protege a la empresa y al cliente. |
| Efectivo como opción | Indispensable. En SLP la mayoría de transacciones de gas siguen siendo en efectivo. |
| Inspección de seguridad antes de recargar | Correcto. La NOM-004-SEDG obliga a verificar estado del tanque. Un tanque caducado o con fuga no se puede recargar legalmente. |
| Credencial del operador al cliente | Excelente. Diferenciador de seguridad vs. el modelo informal actual. |
| Ticket/comprobante digital | Necesario. Resuelve la queja principal: "no tengo comprobante de lo que pagué". |

### ⚠️ Problemas detectados en el proceso

**P1: Confusión cilindro vs. tanque estacionario**

En San Luis Potosí (y en general en México), las pipas/camiones cisterna **solo recargan tanques estacionarios**. Los cilindros portátiles (20kg, 30kg, 45kg) **se intercambian**, no se rellenan en sitio. Gas Imperial lo dice explícitamente: "No contamos con servicio de relleno en cilindro con pipa."

**Impacto en el demo:** El demo permite seleccionar "Cilindro" como tipo de tanque, pero el flujo de "recarga por litros con medidor" solo aplica a estacionarios. Si el cliente tiene cilindro, el servicio es diferente: se le lleva un cilindro lleno y se retira el vacío.

**Recomendación:** Bifurcar el flujo:
- Tanque estacionario → recarga por litros (flujo actual)
- Cilindro → intercambio de cilindro (precio fijo por presentación: 20kg, 30kg, 45kg)

---

**P2: No hay validación de zona de cobertura**

El demo permite cualquier dirección. En la realidad, Corpoilgas opera en zonas específicas de SLP. Si un cliente pone una dirección fuera de cobertura, no debería poder completar el pedido.

**Recomendación:** Agregar validación de zona (aunque sea mock) con mensaje: "Lo sentimos, aún no llegamos a tu zona."

---

**P3: El precio por litro es estático**

En México, el precio del Gas LP cambia semanalmente (la CRE publica precios máximos). El demo muestra $12.50/L fijo.

**Recomendación:** Mostrar "Precio vigente: $X.XX/L (actualizado al [fecha])" para que el cliente entienda que es variable. En producción, este precio se actualiza desde el admin.

---

**P4: Falta el concepto de "ventana de servicio"**

La máquina de estados menciona "ventana de entrega" y "corte X horas antes", pero el demo no muestra al cliente cuándo será atendido. Solo dice "estimado" sin fecha/hora.

**Recomendación:** Después de confirmar, mostrar: "Tu recarga está programada para: [Hoy entre 10:00-14:00]" o "Mañana entre 8:00-12:00". Esto es lo que el cliente más necesita saber.

---

**P5: No hay confirmación de que alguien estará en casa**

Para recargar un tanque estacionario, generalmente se necesita acceso al domicilio. El campo de "notas" ayuda, pero no hay una confirmación explícita.

**Recomendación:** Agregar checkbox: "Confirmo que habrá alguien para recibir al operador" o "El tanque es accesible sin necesidad de abrir" (tanques en exterior).

---

## 2. AUDITORÍA DE UI DESIGN

### ✅ Buenas prácticas que se cumplen

| Principio | Implementación |
|-----------|---------------|
| Jerarquía visual clara | Títulos, subtítulos y contenido bien diferenciados |
| Feedback de estado | Timeline de tracking con estados claros |
| Prevención de errores | Botón de cancelar solo visible cuando es posible |
| Consistencia | Mismo estilo de cards, botones y inputs en toda la app |
| Mobile-first | Shell de 390px simula correctamente un móvil |
| Acciones primarias destacadas | Botón rojo para acción principal, gris para secundarias |
| Información progresiva | "Ver detalle" → "Ver todo el pedido" (disclosure progresivo) |

### ⚠️ Problemas de UI detectados

**UI-1: La pantalla Home tiene demasiada carga cognitiva**

El usuario llega y ve: hero, tabs de modo, input numérico, card de dirección, card de "cómo funciona", y botón de continuar. Son 6 elementos compitiendo por atención.

**Recomendación:** 
- Mover "¿Cómo funciona?" a un onboarding de primera vez (o a FAQ)
- El hero puede ser más compacto
- Priorizar: 1) cuánto quieres, 2) dónde, 3) continuar

---

**UI-2: Los tabs "Por monto ($)" / "Por litros (L)" pueden confundir al usuario promedio**

El cliente típico de gas en SLP no piensa en litros. Piensa en "llena mi tanque" o "ponme $500". La opción de litros es más para clientes que saben exactamente cuánto les cabe.

**Recomendación:**
- Default en "Por monto" (correcto actualmente)
- Agregar tercera opción: "Llenar tanque" (usa la capacidad registrada como estimado)
- Hacer los tabs menos prominentes; la mayoría usará monto

---

**UI-3: El registro pide demasiada información de golpe**

Nombre, correo, teléfono, contraseña, código vendedor — todo en una pantalla. Esto genera fricción y abandono.

**Recomendación:** Registro progresivo:
1. Pantalla 1: Teléfono + código OTP (lo más rápido)
2. Pantalla 2: Nombre + código vendedor
3. Pantalla 3: Dirección + tanque (puede ser después del primer pedido)

---

**UI-4: El código de vendedor en el registro no tiene contexto suficiente**

Dice "Código del vendedor que te refirió (obligatorio)" pero:
- ¿Qué pasa si no tengo código?
- ¿Dónde lo consigo?
- ¿Por qué es obligatorio?

**Recomendación:** 
- Agregar texto de ayuda: "Tu vendedor Corpoilgas te dio este código. Si no lo tienes, pregúntale o llama al [teléfono]"
- Considerar si realmente debe ser obligatorio (¿qué pasa con clientes orgánicos?)

---

**UI-5: El checkout no muestra la dirección de forma editable**

La dirección se muestra como texto plano en una card. Si el usuario quiere cambiarla, tiene que volver al home → editar dirección → volver al checkout. Demasiados pasos.

**Recomendación:** Hacer la card de dirección clickeable directamente desde el checkout (como en Rappi/Uber).

---

**UI-6: El FAB de ayuda no es visible en todas las pantallas donde podría necesitarse**

Solo está en tracking y historial. Pero el usuario podría necesitar ayuda en:
- Checkout (duda sobre el cobro)
- Home (no entiende cómo funciona)
- Post-entrega (reclamo inmediato)

**Recomendación:** FAB de ayuda global (visible en todas las pantallas excepto login/registro).

---

**UI-7: La pantalla de "Recarga completada" no tiene CTA claro de siguiente paso**

Después de ver los litros reales y el cobro, el único botón es "Nueva recarga". Pero el usuario probablemente quiere:
1. Descargar su comprobante
2. Calificar el servicio
3. Reportar un problema

**Recomendación:** Agregar botones secundarios: "📄 Ver comprobante" y "⚠️ Reportar problema" debajo del rating.

---

**UI-8: No hay empty states**

Si el usuario es nuevo y va a "Historial", no hay mensaje de "Aún no tienes recargas". Lo mismo para el perfil sin dirección configurada.

**Recomendación:** Agregar empty states con ilustración y CTA: "Haz tu primera recarga →"

---

**UI-9: Los métodos de pago en el checkout no muestran suficiente información**

"Tarjeta" no dice cuál tarjeta. "Saldo" muestra el monto pero no es claro que es un monedero prepagado.

**Recomendación:**
- Tarjeta: mostrar "VISA ****4521" si ya hay una guardada, o "Agregar tarjeta"
- Saldo: "Saldo Corpoilgas: $350.00 [Recargar]"
- Efectivo: "Pagas al operador al finalizar"

---

**UI-10: No hay indicador de precio vigente del gas**

El usuario no sabe si $12.50/L es caro o barato. No tiene referencia.

**Recomendación:** En el home, mostrar badge: "Precio vigente: $12.50/L · Actualizado hoy" con color verde si está por debajo del máximo CRE.

---

## 3. BENCHMARK vs. COMPETENCIA

| Feature | Corpoilgas (demo) | Global Gas (app) | Gasconnect | Gas Imperial (WhatsApp) |
|---------|-------------------|------------------|------------|------------------------|
| Pedir por app | ✅ | ✅ | ✅ | ❌ (solo WhatsApp/tel) |
| Cobro por litros reales | ✅ | ✅ | ✅ | ✅ |
| Tracking de estado | ✅ | ✅ | ✅ | ❌ |
| Credencial del operador | ✅ | ❌ | ❌ | ❌ |
| Comprobante digital | ✅ | ✅ | ❌ | ❌ |
| Pago digital | ✅ | ✅ | ✅ | Solo efectivo/transferencia |
| Saldo prepagado | ✅ | ❌ | ❌ | ❌ |
| Recordatorio mensual | ✅ (pendiente) | ❌ | ❌ | ❌ |
| Código vendedor/comisión | ✅ | ❌ | ❌ | ❌ |
| Soporte in-app | ✅ | Básico | ❌ | ❌ |

**Ventaja competitiva de Corpoilgas:** Credencial del operador + saldo prepagado + sistema de comisiones. Ningún competidor en SLP tiene las tres.

---

## 4. RESUMEN EJECUTIVO

### Calificación general

| Área | Nota | Comentario |
|------|------|-----------|
| Alineación con máquina de estados | 8/10 | Bien alineado. Falta bifurcación cilindro vs. estacionario |
| Flujo de compra | 7/10 | Funcional pero con fricción en registro y falta de ventana horaria |
| UI Design | 7/10 | Limpio y consistente, pero con carga cognitiva alta en home |
| Contexto de negocio (SLP) | 6/10 | Falta validación de zona, precio dinámico, y distinción cilindro/estacionario |
| Diferenciación vs. competencia | 9/10 | Muy buena propuesta de valor única |

### Top 5 cambios prioritarios

1. **Bifurcar flujo cilindro vs. estacionario** — Es un error de negocio, no solo de UI
2. **Agregar ventana horaria estimada** — El cliente necesita saber CUÁNDO, no solo el estado
3. **Simplificar registro** — Progresivo, empezar con teléfono
4. **Mostrar precio vigente con fecha** — Transparencia y confianza
5. **Validación de zona de cobertura** — Evitar pedidos que no se pueden atender

---

*Auditoría realizada sobre el demo HTML/CSS/JS en su estado actual (20 mayo 2026)*
