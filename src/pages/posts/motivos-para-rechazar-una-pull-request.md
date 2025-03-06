---
layout: "../../layouts/BlogLayout.astro"
title: "Motivos para rechazar una Pull Request"
author: "Judlup"
image:
  url: "https://images.unsplash.com/photo-1564931768730-7e4d8e240044?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  alt: "Motivos para rechazar una Pull Request"
tags:
  [
    "- Pull Request\n- Buenas prácticas\n- Desarrollo de software\n- Code review\n- Soft skills\n- Clean code\n- GitHub"
  ]
date: 2025-02-16
slug: "motivos-para-rechazar-pull-request"
published: true
---

El proceso de revisión de código a través de Pull Requests (PR) es fundamental en el desarrollo de software moderno. Sin embargo, es común encontrarse con PRs que no cumplen con ciertos criterios clave y que, por lo tanto, deben ser rechazadas. Aquí te explicamos cuáles son esos motivos frecuentes.

## Principales motivos para rechazar una PR

A continuación, se describen algunos principios fundamentales que, si no se cumplen, pueden llevar a que una PR sea rechazada:

### 1. Complejidad excesiva del código

La complejidad del código debe ser minimizada. Si tu código introduce una complejidad innecesaria, será difícil de mantener y escalar en el futuro.

- **Solución:** Refactoriza tu código y busca simplificar mediante módulos claros y funciones específicas.

### 2. Módulos superficiales

Los módulos superficiales exponen demasiados detalles internos, obligando a otros desarrolladores a comprender completamente su implementación, aumentando la carga cognitiva.

- **Solución:** Utiliza abstracciones y encapsula los detalles internos, ofreciendo interfaces sencillas y claras.

### 3. Alta dependencia y acoplamiento

Si los módulos o funciones dependen excesivamente unos de otros, los cambios en una parte del sistema afectarán inevitablemente a otras partes, haciendo que el sistema sea frágil.

- **Solución:** Minimiza dependencias y crea componentes autónomos e independientes.

### 4. Mezcla de lógica de negocio y presentación

Si mezclas lógica de negocio con lógica de interfaz, el mantenimiento y la comprensión del código se complican enormemente.

- **Solución:** Asegura una clara separación de preocupaciones (single responsibility principle - SRP).

### 5. Código no estructurado ni testeable

Un código bien estructurado facilita la realización de pruebas unitarias y funcionales. Si tu código es complicado de probar, posiblemente será rechazado.

- **Solución:** Crea módulos que se puedan probar de forma independiente, aislando la lógica compleja en componentes separados.

## Consejos para mejorar tus Pull Requests

- **Usa descripciones claras**: Siempre explica qué hace tu PR y por qué.
- **Realiza revisiones previas**: Revisa tu propio código antes de abrir una PR.
- **Asegura la calidad**: Cumple con los estándares y principios establecidos por tu equipo.
- **No hagas PRs a última hora**: Evita realizar PRs justo antes del cierre de la jornada laboral o en fines de semana, pues dificulta la revisión adecuada.

## 📹 Video relacionado:

[![Motivos para rechazar una Pull Request](https://img.youtube.com/vi/-FS7KNquXX8/0.jpg)](https://youtu.be/-FS7KNquXX8 "Motivos para rechazar una Pull Request")

## 🔗 Artículo original:

Puedes leer el artículo completo aquí: [Motivos para rechazar una Pull Request](https://levelup.gitconnected.com/i-will-reject-your-pull-request-if-you-violate-these-design-principles-ded589981c0e)

---

## Más contenido


Sigue a TryCatch.tv en [YouTube](https://www.youtube.com/trycatch_tv), [Instagram](https://www.instagram.com/trycatch_tv/), [TikTok](https://www.tiktok.com/@trycatch.tv), [Twitch](https://www.twitch.tv/trycatch_tv), y [LinkedIn (empresa)](https://www.linkedin.com/company/trycatch-tv/) / [LinkedIn Personal](https://www.linkedin.com/in/judlup/).

Explora más artículos técnicos en mi cuenta de [Medium](https://medium.trycatch.tv/).

