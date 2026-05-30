---
layout: "../../layouts/BlogLayout.astro"
title: "POC | N8N"
author: "Judlup"
image:
  url: "https://pbs.twimg.com/media/Glj85k2WwAAVUFG?format=jpg&name=large"
  alt: "POC | N8N"
tags:
  [
    "- n8n",
    "- Automatización",
    "- IA",
    "- Desarrollo",
    "- Integraciones",
    "- Prueba de concepto",
    "- Workflow"
  ]
date: 2025-03-08
slug: "poc-n8n"
published: true
---

# POC | N8N

En esta transmisión exploramos N8N, una poderosa herramienta open-source para construir workflows e integraciones visuales. Durante la sesión revisamos qué es N8N, cómo instalarlo de manera local con Docker y aprendimos cómo se pueden crear poderosas integraciones mediante la creación de flujos de trabajo visuales que incorporan inteligencia artificial.

## Contenido

### ¿Qué es N8N y para qué sirve?

N8N es una herramienta de automatización visual que permite crear workflows complejos integrando cientos de plataformas y aplicaciones, todo sin necesidad de codificar. Este software open-source ofrece la posibilidad de auto hospedarse, lo que permite a desarrolladores implementar sus propias instancias y manejarlo con total privacidad y flexibilidad.

### Instalación local con Docker

Durante la transmisión se realizó exitosamente la instalación de manera local usando Docker. Esto permitió ejecutar rápidamente una instancia de N8N en el entorno local, manejando componentes como LlamaGPT integrados, además de entender la utilización de bases de datos embebidas, como Quadran y PostgreSQL.

### Creando nuestro primer flujo de trabajo

Hicimos una primera prueba creando un flujo sencillo; utilizamos una herramienta visual intuitiva con componentes denominados “nodos”, capaces de escuchar eventos (triggers) y realizar ciertas acciones o llamadas a API externas que permiten obtener información o realizar procesos específicos.

Entre los nodos destacados explorados fueron:

- **Triggers**: Activar flujos de trabajo a partir de formularios, webhooks o de forma manual.
- **HTTP Requests**: Códigos personalizados para interactuar con APIs externas.
- **OpenAI**: Uso de inteligencia artificial para procesar contenidos y generación automática de textos.

### Caso práctico: Automatización de entradas de blog del canal

Aplicamos el conocimiento para crear una solución real: Generar automáticamente entradas de blog a partir de la transcripción obtenida desde YouTube mediante API. A través de este flujo se logra:

1. Obtener subtítulos del video de YouTube.
2. Procesar y transformar la transcripción usando OpenAI.
3. Generar un archivo Markdown listo que puede ser posteriormente publicado.

### Análisis y desafíos encontrados

Aunque logramos buenos resultados, también observamos algunos retos. Por ejemplo, la necesidad de ajustar el **prompt** usado en la IA, para obtener resúmenes más adecuados y precisos que se acerquen más a los generados manualmente. Otro aspecto revisado fue el costo asociado al uso de OpenAI, encontrando que el consumo de tokens resultó bastante económico para este caso puntual.

### Conclusiones y recomendaciones

N8N demostró ser una solución extremadamente flexible y potente, ideal para múltiples casos de uso, especialmente donde se requiere integrar aplicaciones externas y automatizar tareas repetitivas. Se recomendó, además, evaluar desplegar la solución en la propia nube de N8N por temas de costo-beneficio y facilidad de mantenimiento frente al auto hospedaje.

Para la siguiente sesión se planeó continuar afinando el flujo creado, incluyendo la generación automática de Pull Requests en Github al finalizar la creación de la entrada del blog.

## 📹 Video relacionado:

[![POC | N8N](https://img.youtube.com/vi/nGwGyyKEJIg/0.jpg)](https://youtu.be/nGwGyyKEJIg "POC | N8N")

## 🔗 Recursos o enlaces adicionales:

- [Sitio oficial de N8N](https://n8n.io/)
- [Repositorio oficial GitHub N8N](https://github.com/n8n-io/n8n)
- [Documentación oficial N8N](https://docs.n8n.io/)
- [API de transcripción utilizada en transmisión](https://youtubetranscript.com/)
- [OpenAI - Plataforma](https://platform.openai.com/)

## Más contenido

Sigue a TryCatch.tv en [YouTube](https://www.youtube.com/trycatch_tv), [Instagram](https://www.instagram.com/trycatch_tv/), [TikTok](https://www.tiktok.com/@trycatch.tv), [Twitch](https://www.twitch.tv/trycatch_tv), y [LinkedIn](https://www.linkedin.com/company/trycatch-tv) / [LinkedIn Personal](https://www.linkedin.com/in/judlup/).