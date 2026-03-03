# Documentacion de la Aplicacion

## 1. Introduccion

Esta aplicacion es un blog construido con Next.js donde el contenido se escribe en archivos Markdown y se renderiza en la web. El sistema fue organizado con una arquitectura por capas para separar la lectura de archivos fisicos del servidor de la logica que organiza los posts por fecha o etiquetas.

El objetivo principal es mantener una base simple, clara y facil de extender, sin mezclar reglas de negocio con detalles tecnicos de infraestructura.

## 2. Objetivo del Sistema

El sistema permite:

- Escribir publicaciones en formato Markdown.
- Guardarlas localmente dentro del proyecto.
- Leerlas desde el servidor.
- Organizarlas por fecha, etiquetas y criterios de busqueda.
- Renderizarlas como paginas HTML dentro de la aplicacion web.

## 3. Requisitos que Cumple

### Requisito funcional principal

El sistema permite escribir posts en Markdown y mostrarlos en la web.

### Requisito arquitectonico

La lectura de archivos fisicos esta separada de la logica que organiza el contenido. La infraestructura se encarga de leer y parsear archivos, mientras que la aplicacion se encarga de ordenar, filtrar y buscar posts.

### Atributo de calidad: Portabilidad

La aplicacion busca ser portable, es decir, que el origen de datos pueda cambiar con el menor impacto posible. Actualmente esto se logra a traves de una interfaz de repositorio (`PostRepository`) que desacopla la logica de negocio de la implementacion concreta del acceso a datos.

## 4. Tecnologias Utilizadas

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS 4
- gray-matter para leer frontmatter
- remark y remark-html para transformar Markdown a HTML

## 5. Estructura del Proyecto

La estructura principal del proyecto es la siguiente:

- `content/posts`: contiene los archivos Markdown con las publicaciones.
- `src/domain`: define entidades y contratos del dominio.
- `src/application`: contiene casos de uso y reglas de negocio.
- `src/infrastructure`: contiene implementaciones tecnicas, como lectura de archivos y transformacion de Markdown.
- `src/components`: componentes visuales reutilizables.
- `src/app`: paginas y rutas de Next.js.

## 6. Arquitectura por Capas

### 6.1 Capa de Dominio

La capa de dominio define los conceptos base del sistema y las abstracciones que otras capas deben respetar.

Archivos clave:

- `src/domain/post.ts`
- `src/domain/postRepository.ts`

Responsabilidades:

- Definir la estructura de un post.
- Definir la interfaz `PostRepository`.

La interfaz `PostRepository` establece que cualquier origen de datos debe poder:

- Listar todos los posts.
- Obtener un post por su slug.

Esto permite que la logica de aplicacion no dependa de una base de datos, del filesystem o de una API concreta.

### 6.2 Capa de Aplicacion

La capa de aplicacion contiene la logica que organiza los posts y resuelve los casos de uso del sistema.

Archivos clave:

- `src/application/listPosts.ts`
- `src/application/getPostsByTag.ts`
- `src/application/searchPosts.ts`
- `src/application/getPostBySlug.ts`
- `src/application/sortPostsByDate.ts`

Responsabilidades:

- Listar publicaciones.
- Ordenarlas por fecha.
- Filtrarlas por etiquetas.
- Buscar por texto.
- Obtener una publicacion individual.

Esta capa no sabe como se leen los archivos. Solo recibe un `PostRepository` y trabaja con los datos ya obtenidos.

### 6.3 Capa de Infraestructura

La capa de infraestructura implementa los detalles tecnicos necesarios para que el sistema funcione.

Archivos clave:

- `src/infrastructure/fileSystemPostRepository.ts`
- `src/infrastructure/createPostRepository.ts`
- `src/infrastructure/markdowntoHtml.ts`

Responsabilidades:

- Leer archivos `.md` desde `content/posts`.
- Parsear el frontmatter de cada archivo.
- Convertir el contenido Markdown a HTML.
- Proveer una implementacion concreta de `PostRepository`.

`fileSystemPostRepository.ts` usa `node:fs/promises`, `node:path` y `gray-matter` para acceder al filesystem y transformar los archivos en objetos `Post`.

### 6.4 Capa de Presentacion

La capa de presentacion corresponde a las paginas y componentes visuales de Next.js.

Archivos clave:

- `src/app/page.tsx`
- `src/app/search/page.tsx`
- `src/app/tags/[tag]/page.tsx`
- `src/app/posts/[slug]/page.tsx`
- `src/components/PostCard.tsx`
- `src/components/SiteHeader.tsx`
- `src/components/SiteFooter.tsx`

Responsabilidades:

- Mostrar la informacion al usuario.
- Invocar los casos de uso.
- Renderizar listas, detalle de posts, busquedas y navegacion.

Esta capa no lee archivos directamente. Solo solicita datos a traves de los casos de uso.

## 7. Flujo de Funcionamiento

El flujo general del sistema es el siguiente:

1. El usuario entra a una pagina de la aplicacion.
2. La pagina obtiene una instancia del repositorio mediante `createPostRepository`.
3. La pagina llama a un caso de uso de la capa de aplicacion.
4. El caso de uso usa la interfaz `PostRepository`.
5. La implementacion concreta (`FileSystemPostRepository`) lee los archivos Markdown del directorio `content/posts`.
6. Los archivos se parsean y se convierten en objetos `Post`.
7. La capa de aplicacion organiza esos posts: los ordena, filtra o busca segun corresponda.
8. En el detalle de un post, el contenido Markdown se transforma a HTML con `markdowntoHtml`.
9. La capa de presentacion renderiza el resultado en la interfaz.

## 8. Ejemplo de Flujo: Home

En la pagina principal ocurre esto:

1. `src/app/page.tsx` solicita un repositorio.
2. Llama a `listPosts(repo)`.
3. `listPosts` pide todos los posts al repositorio.
4. `sortPostsByDate` ordena los posts en orden descendente por fecha.
5. La pagina renderiza los resultados con `PostCard`.

Esto demuestra que:

- La infraestructura obtiene los datos.
- La aplicacion decide como organizarlos.
- La UI solo presenta la informacion.

## 9. Ejemplo de Flujo: Detalle de Post

Cuando un usuario entra a un post individual:

1. `src/app/posts/[slug]/page.tsx` llama a `getPostBySlug(repo, slug)`.
2. El repositorio busca el archivo correspondiente.
3. Si existe, el archivo se parsea.
4. El contenido Markdown se transforma a HTML con `markdowntoHtml`.
5. La pagina muestra el contenido renderizado.

## 10. Por que la Aplicacion Cumple con los Requisitos

### 10.1 Render de posts en Markdown

Si cumple.

Los posts se escriben en archivos Markdown dentro de `content/posts` y luego se transforman a HTML antes de mostrarse en la aplicacion.

### 10.2 Separacion entre lectura fisica y logica de organizacion

Si cumple.

La lectura fisica de archivos esta en la capa de infraestructura:

- `fileSystemPostRepository.ts`

La organizacion de posts esta en la capa de aplicacion:

- `sortPostsByDate.ts`
- `getPostsByTag.ts`
- `searchPosts.ts`

Esto evita mezclar reglas de negocio con detalles de acceso al filesystem.

### 10.3 Portabilidad

Si cumple en buena medida.

La portabilidad se logra porque la logica de aplicacion depende de la interfaz `PostRepository`, no del acceso directo al filesystem. Esto significa que si en el futuro se quiere reemplazar el origen de datos, se podria crear otra implementacion del repositorio sin reescribir la logica principal del sistema.

Por ejemplo, en lugar de leer desde archivos `.md`, se podria implementar:

- Un repositorio basado en base de datos.
- Un repositorio que lea desde una API.
- Un repositorio conectado a un CMS.

Mientras esa nueva implementacion respete la interfaz `PostRepository`, el resto del sistema podria mantenerse casi igual.

## 11. Como Ejecutar el Proyecto

Para ejecutar la aplicacion en desarrollo:

1. Instalar dependencias:

```bash
npm install
```

2. Iniciar el servidor de desarrollo:

```bash
npm run dev
```

3. Abrir la aplicacion en el navegador en `http://localhost:3000`.

## 12. Validacion y Calidad

Para validar el proyecto:

```bash
npm run lint
```

Esto permite revisar reglas basicas de calidad y consistencia del codigo.

## 13. Como Agregar un Nuevo Post

Para agregar una nueva publicacion:

1. Crear un archivo `.md` dentro de `content/posts`.
2. Agregar frontmatter con esta estructura:

```md
---
title: "Titulo del post"
date: "2026-03-03"
tags: ["tag1", "tag2"]
excerpt: "Resumen corto del contenido."
---
```

3. Escribir el contenido en Markdown debajo del frontmatter.

## 14. Limitaciones Actuales

Aunque la arquitectura ya esta bien separada para el objetivo actual, existen algunas limitaciones:

- La capa `app/` todavia importa una funcion de infraestructura para crear el repositorio.
- El render de Markdown depende directamente de `remark`.
- No hay pruebas automatizadas en este momento.
- No existe una capa de composicion completamente desacoplada de la UI.

Estas limitaciones no impiden cumplir los requisitos, pero marcan oportunidades de mejora.

## 15. Mejoras Futuras

Posibles mejoras para evolucionar la aplicacion:

- Crear una capa de composicion independiente para inyectar dependencias.
- Agregar pruebas unitarias a los casos de uso.
- Permitir multiples fuentes de datos.
- Incorporar paginacion.
- Agregar soporte para destacados o series de posts.
- Mejorar el manejo de metadatos SEO por post.

## 16. Conclusion

La aplicacion cumple con el objetivo de renderizar posts escritos en Markdown y lo hace mediante una arquitectura clara, con separacion entre dominio, aplicacion, infraestructura y presentacion.

La lectura de archivos fisicos esta correctamente aislada en infraestructura, mientras que la logica para organizar los posts se mantiene en la capa de aplicacion. Gracias al uso de una interfaz de repositorio, el sistema tambien cumple razonablemente con el atributo de portabilidad, ya que puede adaptarse a otros origenes de datos con cambios limitados.

En resumen, se trata de una base sencilla, funcional y bien estructurada para un blog de contenido en Markdown.
