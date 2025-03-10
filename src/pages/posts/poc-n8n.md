---
layout: "../../layouts/BlogLayout.astro"
title: "POC | N8N"
author: "Judlup"
image:
  url: "https://pbs.twimg.com/media/Glj85k2WwAAVUFG?format=jpg&name=large"
  alt: "POC | N8N"
tags:
  [
    "- Automatización",
    "- N8N",
    "- Integraciones",
    "- Desarrollo",
    "- Software",
    "- Open Source",
    "- IA"
  ]
date: "2025-03-08"
slug: "poc-n8n"
published: true
---

# POC | N8N

En esta sesión de transmisión en vivo del canal TryCatch.tv, abordamos una prueba de concepto (POC) detallada para la poderosa herramienta de automatización open-source N8N. Exploramos desde la instalación y despliegue en un entorno local hasta la construcción de un flujo básico que involucra transcripción automática de videos desde YouTube, procesamiento inteligente con APIs externas (como OpenAI), producción automática del contenido para blogs, y finalmente, la posibilidad de integrarse a plataformas como GitHub para hacer Pull Requests automáticas.

## Introducción a N8N

N8N es una plataforma de automatización open-source que nos permite conectar múltiples aplicaciones y servicios sin necesidad de programación profunda, facilitando así la creación de flujos de trabajo automatizados. Destaca por su facilidad visual e intuitiva y la posibilidad de ejecución en tu propia infraestructura, dándote total control sobre los datos y procesos, aunque también cuenta con una versión en la nube muy accesible.

## Instalación y Despliegue

La primera parte de esta sesión consistió en probar cómo desplegar N8N. La primera tentativa, utilizando Netlify, no resultó efectiva debido a limitaciones propias de Netlify en aplicaciones basadas en Docker. Finalmente optamos por ejecutar N8N en un entorno local utilizando Docker con GPUs habilitadas. Si bien el consumo de recursos (CPU y GPU) fue notable, la configuración se logró satisfactoriamente y la herramienta quedó plenamente funcional.

## Creando flujos automatizados con N8N

Una vez desplegado el entorno local, se exploraron los nodos y las integraciones disponibles:

- Trigger manual para iniciar el flujo rápidamente.
- Uso del API de YouTube para obtener la transcripción de videos.
- Procesamiento con OpenAI para generar resumen y estructuración del contenido en formato Markdown.
- Generación inicial de un formulario para ingresar datos personalizados.

## Uso práctico: desde videos en YouTube hasta blogs automáticos

Lo que inicialmente parecía un ejercicio básico se convirtió en una solución que puede tener potencial real para automatizar y reducir considerablemente el esfuerzo operativo: generar automáticamente entradas en blogs desde transmisiones en vivo. Esto incluye:

- Detección de nuevos videos (o ingreso manual simplificado).
- Extracción de transcripción automática vía API.
- Consolidación y resumen de contenido usando modelos de lenguaje (OpenAI).
- Conversión inteligentemente estructurada en Markdown.
- Potencial integración futura con GitHub, para la publicación automática del contenido.

## Conclusiones y Recomendaciones

N8N demostró considerable flexibilidad y potencia para resolver flujos complejos con una interfaz amigable y la capacidad adicional de ejecutar código personalizado en JavaScript. Algunas consideraciones importantes surgieron respecto al deploy en producción:

- Se debe considerar el costo asociado si se utiliza con servicios externos como OpenAI.
- Evaluar si conviene más hospedar en infraestructura propia o utilizar la versión Cloud de N8N, según la complejidad y volumen de procesos.
- Refactorizar y ajustar prompts para mejorar resultados bajo diferentes modelos de LLM usados (GPT-4 vs GPT-4 mini).

Sin embargo, las ventajas observadas, especialmente a nivel gráfico y de integración, son notables y hacen valer su costo de mantenimiento y operación.

## 📹 Video relacionado:

[![POC | N8N](https://img.youtube.com/vi/nGwGyyKEJIg/0.jpg)](https://youtu.be/nGwGyyKEJIg "POC | N8N")

## 🔗 Recursos o enlaces adicionales:

- [Sitio oficial N8N](https://n8n.io)
- [Repositorio GitHub N8N](https://github.com/n8n-io/n8n)
- [OpenAI API](https://platform.openai.com/api-keys)
- [YouTube Transcripts API](https://youtubetranscript.com/)
- [Herramientas Alternativas - Make](https://www.make.com)
- [Alternativa gráfica de automatización Kanime](https://www.knime.com/)

## Más contenido

Sigue a TryCatch.tv en [YouTube](https://www.youtube.com/trycatch_tv), [Instagram](https://www.instagram.com/trycatch_tv/), [TikTok](https://www.tiktok.com/@trycatch.tv), [Twitch](https://www.twitch.tv/trycatch_tv), y [LinkedIn](https://www.linkedin.com/company/trycatch-tv) / [LinkedIn Personal](https://www.linkedin.com/in/judlup/).