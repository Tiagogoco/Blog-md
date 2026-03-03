---
title: "Repositorios y fronteras"
date: "2026-02-28"
tags: ["arquitectura", "backend", "dominio"]
excerpt: "Como aislar la logica de negocio de los detalles tecnicos."
---

# Repositorios y fronteras

Una arquitectura limpia no depende de tener muchas capas. Depende de que cada parte sepa hasta donde llega su responsabilidad.

El patron repositorio es util cuando se quiere evitar que la capa de aplicacion conozca si los datos vienen de archivos, una base de datos o una API externa.

Por ejemplo, una funcion como `listPosts` no deberia preocuparse por rutas de carpetas ni por librerias de parsing. Solo necesita una abstraccion que responda a una interfaz estable.

Eso deja varios beneficios:

- Las pruebas son mas sencillas.
- Los cambios de infraestructura impactan menos.
- La logica de uso del sistema queda mas facil de leer.

Tambien obliga a pensar mejor en los contratos. Si el repositorio devuelve demasiada informacion o mezcla formatos inconsistentes, la frontera se vuelve difusa.

Una buena regla es simple: la capa de dominio define que necesita; la infraestructura resuelve como obtenerlo.
