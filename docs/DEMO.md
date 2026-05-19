# GasYa MX - Guia de Navegacion y Demo

## 1) Como ejecutar rapido

Opciones:

1. Doble clic en `index.html` para abrir en el navegador.
2. O desde terminal en esta carpeta:
   - `python3 -m http.server 8080`
   - abrir [http://localhost:8080](http://localhost:8080)

## 2) Flujo de navegacion (botones principales)

- **Pantalla Seleccion**
  - `Pipeta 20kg / 30kg`: cambia el producto y precio.
  - `Activar` en Suscripcion mensual: activa/desactiva recurrencia visual.
  - `Continuar al checkout`: abre checkout.

- **Checkout Simplificado**
  - Campo `Direccion`: editable (mock local).
  - Select `Metodo de pago`: Tarjeta o Efectivo.
  - `Confirmar pedido`: crea pedido mock y abre tracking.
  - `Volver`: regresa a seleccion.

- **Tracking (Wow factor)**
  - Muestra repartidor asignado (`Julio Ramirez`) y placa (`CDMX-482-A`).
  - Estado simulado: `Preparando -> En camino -> En la puerta`.
  - Avance automatico cada ~4.5 segundos.
  - Boton `Avanzar estado (demo)` para forzar progreso manual.

- **Confirmacion**
  - Muestra entrega completada y total en MXN.
  - `Nuevo pedido`: reinicia el flujo.

## 3) Script de demostracion (hablado)

1. "Esta es una experiencia tipo Rappi, adaptada a gas en pipeta para Mexico."
2. "El usuario escoge su presentacion de pipeta y puede activar una suscripcion mensual para retencion."
3. "En checkout, definimos direccion y metodo de pago, aqui se puede conectar despues con mapa real y pasarela."
4. "Al confirmar, el sistema asigna repartidor automaticamente con datos de unidad."
5. "Esta vista de tracking simula el avance del pedido en tiempo real para dar certeza al cliente."
6. "Finalmente confirmamos entrega y dejamos listo el reinicio de pedido."

## 4) Nota tecnica para confianza cliente

Este MVP funciona con datos mock hardcodeados para demo rapida, pero esta preparado para evolucionar a:

- API real (Node/Python/Java o microservicios).
- Eventos de tracking por WebSocket o polling.
- Persistencia en nube (AWS/Azure/GCP).
