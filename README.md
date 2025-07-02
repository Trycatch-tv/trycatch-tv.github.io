# TryCatch.tv Website

Sitio web oficial de TryCatch.tv, una plataforma de contenido tecnológico en español.

## 🚀 Tecnologías

- [Astro](https://astro.build/) - Framework web moderno
- [React](https://reactjs.org/) - Biblioteca de UI
- [Tailwind CSS](https://tailwindcss.com/) - Framework de CSS
- [TypeScript](https://www.typescriptlang.org/) - Tipado estático
- [MDX](https://mdxjs.com/) - Markdown con componentes

## 📦 Instalación

```bash
# Clonar el repositorio
git clone https://github.com/trycatch-tv/trycatch-tv.github.io.git
cd trycatch-tv.github.io

# Instalar dependencias
npm install

# Ejecutar en modo desarrollo
npm run dev

# Construir para producción
npm run build

# Vista previa de la construcción
npm run preview
```

## 🏗️ Estructura del Proyecto

```
src/
├── components/     # Componentes reutilizables
├── layouts/        # Layouts de página
├── pages/          # Páginas y rutas
│   └── posts/      # Artículos del blog (MDX)
├── assets/         # Imágenes y recursos estáticos
└── env.d.ts        # Tipos de entorno
```

## 🎨 Personalización

El proyecto utiliza un sistema de colores personalizado definido en `tailwind.config.cjs`:

- `tc-black`: #232122
- `tc-black-l`: #474646
- `tc-cyan`: #A2F2F2
- `tc-yellow`: #EDF2C2
- `tc-gray`: #B5B5B5
- `tc-gray-l`: #F2F2F2

## 📝 Blog

Los artículos del blog se escriben en MDX y se almacenan en `src/pages/posts/`. Cada artículo debe incluir frontmatter con:

- `title`: Título del artículo
- `author`: Autor
- `image`: URL e información de la imagen destacada
- `date`: Fecha de publicación
- `tags`: Etiquetas del artículo

## 🌐 Despliegue

El sitio se despliega automáticamente en GitHub Pages desde la rama `main`.

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo [LICENSE](LICENSE) para más detalles.
