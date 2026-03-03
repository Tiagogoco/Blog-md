---
title: "Capas que no estorban"
date: "2026-02-18"
tags: ["arquitectura", "codigo", "practicas"]
excerpt: "Cuando separar responsabilidades ayuda y cuando solo agrega peso."
---

# Capas que no estorban

Separar dominio, aplicacion e infraestructura puede ser una decision util, pero no siempre se implementa bien.

El problema no suele ser la idea de separar. El problema es convertir esa separacion en una cadena larga de archivos que apenas repiten nombres.

Una capa justifica su existencia cuando:

- Reduce acoplamiento real.
- Hace mas claro el flujo de datos.
- Permite cambiar una dependencia sin reescribir todo.

Una capa estorba cuando:

- Solo reexporta funciones sin aportar nada.
- Duplica modelos sin una razon.
- Vuelve dificil seguir una accion simple.

La meta no es tener mas carpetas. La meta es que el sistema sea mas entendible.

En un blog pequeno, esto significa mantener fronteras practicas. Si el dominio es una definicion de `Post`, la aplicacion coordina casos de uso y la infraestructura lee Markdown, ya existe una base suficiente.

No hace falta sobredisenar antes de tener un problema concreto.

