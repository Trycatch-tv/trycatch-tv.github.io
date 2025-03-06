---
layout: "../../layouts/BlogLayout.astro"
title: "POC | Pulumi: Infraestructura como código con TypeScript"
author: "Judlup"
image:
  url: "https://www.f5.com/content/dam/f5-com/nginx-import/Pulumi-logo_featured.jpg"
  alt: "Pulumi Infraestructura como código con TypeScript"
tags:
  [
    "- Pulumi\n- Infraestructura como código\n- TypeScript\n- Cloud Computing\n- AWS\n- Desarrollo de software\n- Automatización"
  ]
date: 2025-01-21
slug: "poc-pulumi-infraestructura-codigo-typescript"
published: true
---

En esta sesión realizamos una prueba de concepto con **Pulumi**, una herramienta innovadora para gestionar infraestructura como código utilizando lenguajes de programación familiares, en este caso, TypeScript. Exploramos qué es Pulumi, cómo funciona, sus ventajas y su posible valor frente a alternativas populares como Terraform.

## ¿Qué es Pulumi?

Pulumi es una herramienta de infraestructura como código que permite crear, desplegar y administrar infraestructura utilizando lenguajes de programación convencionales como TypeScript, Python, Go, Java, y C#. A diferencia de otras herramientas como Terraform, Pulumi permite utilizar código real, facilitando la lógica, modularización y reusabilidad del código.

## ¿Cómo funciona Pulumi?

En nuestra prueba práctica realizamos lo siguiente:

1. **Instalación y configuración inicial**:
   - Instalación local de Pulumi usando Chocolatey.
   - Configuración básica del entorno AWS.

2. **Creación del primer proyecto**:
   - Definición de un proyecto básico con Pulumi para AWS usando TypeScript.
   - Aprovisionamiento inicial de un bucket en Amazon S3.

3. **Despliegue de un sitio web estático**:
   - Creación y configuración de un archivo `index.html`.
   - Uso del objeto Bucket en S3 para alojar el sitio web.

4. **Actualizaciones y gestión de recursos**:
   - Aplicación de configuraciones adicionales (public access, bucket policy).
   - Visualización de outputs del despliegue desde la línea de comandos.

## Ventajas de Pulumi

- **Lenguajes familiares**: Permite utilizar lenguajes de programación convencionales, facilitando la adopción por desarrolladores.
- **Flexibilidad**: Capacidad para implementar lógica compleja directamente en la definición de infraestructura.
- **Automatización y scripting avanzado**: Ideal para automatización y despliegue dinámico de infraestructura.
- **Plataforma agnóstica**: Posibilidad de trabajar con múltiples proveedores (AWS, Azure, GCP).

## ¿Qué diferencia a Pulumi de Terraform?

Pulumi se diferencia principalmente en que no utiliza únicamente archivos de configuración estáticos (como YAML o JSON), sino que permite escribir código real con lógica condicional, bucles y estructuras complejas, lo cual potencia su flexibilidad para resolver problemas complejos en la creación de infraestructura.

## Desventajas y consideraciones

- Menor popularidad respecto a Terraform, lo que puede implicar menor soporte comunitario.
- Posible dependencia inicial con Pulumi Cloud para ciertas operaciones avanzadas.
- Curva de aprendizaje relacionada con el uso de programación real en lugar de archivos declarativos simples.

## Conclusión

Pulumi ofrece una alternativa potente e innovadora para la gestión de infraestructura como código, especialmente atractiva para desarrolladores que prefieren utilizar lenguajes convencionales y estructuras programáticas avanzadas. Aunque Terraform sigue siendo más popular, Pulumi presenta ventajas claras en términos de flexibilidad, potencial y productividad para proyectos específicos.

## 📹 Video relacionado:

[![POC | Pulumi](https://img.youtube.com/vi/uJ_hiFe4mFM/0.jpg)](https://youtu.be/uJ_hiFe4mFM "POC | Pulumi")

## Más contenido

Sigue a TryCatch.tv en [YouTube](https://www.youtube.com/trycatch_tv), [Instagram](https://www.instagram.com/trycatch_tv), [TikTok](https://www.tiktok.com/@trycatch.tv), [Twitch](https://www.twitch.tv/trycatch_tv), y [LinkedIn](https://www.linkedin.com/company/trycatch-tv) / [LinkedIn Personal](https://www.linkedin.com/in/judlup/).

---