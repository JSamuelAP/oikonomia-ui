# Política de seguridad

## Versiones con soporte

Este es un proyecto personal mantenido por una sola persona. Solo se corrigen vulnerabilidades en la **última versión
publicada**.

| Versión              | Soporte |
| -------------------- | ------- |
| Última release (1.x) | ✅      |
| Anteriores           | ❌      |

## Cómo reportar una vulnerabilidad

**No abras un issue público.** Usa el reporte privado de
GitHub: [Reportar una vulnerabilidad](https://github.com/JSamuelAP/oikonomia-ui/security/advisories/new)
(pestaña **Security** → **Report a vulnerability**).

De preferencia, incluye:

- Descripción y el impacto que crees que tiene.
- Pasos para reproducirlo o una prueba de concepto.
- Versión afectada.

## Qué esperar

Se atiende con el mejor esfuerzo posible, sin acuerdos de nivel de servicio:

- Acuse de recibo en 7 días.
- Evaluación inicial en 14 días.
- La corrección se publica en una nueva versión con un aviso de seguridad (security advisory). Si lo deseas, se te
  mencionará como autor del reporte.

## Alcance

### Dentro del alcance

- Cross-site scripting (XSS) y mal uso de la sanitización de Angular.
- Manejo de tokens: exposición o robo del access token.
- Redirecciones abiertas (por ejemplo, a través de `returnUrl`).
- Datos sensibles almacenados de forma insegura en el navegador.
- Configuración del servidor web de la imagen (cabeceras, CSP) con impacto demostrable.
- Vulnerabilidades en dependencias con una ruta de explotación demostrable.

### Fuera del alcance

- Ataques que dependan de extensiones del navegador maliciosas o acceso físico al dispositivo.
- Resultados de escáneres automáticos sin prueba de concepto.
- Dependencias vulnerables sin ruta de explotación (ya se monitorean con Dependabot).
- Ingeniería social.

Si el problema está en el servidor (autenticación, autorización o datos), repórtalo en
el [repositorio de la API](https://github.com/JSamuelAP/oikonomia-api/security/policy).

## Divulgación coordinada

Por favor, no hagas público el problema hasta que haya una corrección disponible o hayan pasado 90 días desde el reporte,
lo que ocurra primero.
