# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

### Development
- `npm run dev` - Start development server with auto-reload at http://localhost:3030
- `npm run build` - Build the presentation for production (outputs to `dist/`)
- `npm run export` - Export slides to PDF or other formats

### Installation
- `npm install` - Install dependencies

## Architecture Overview

This is a **Slidev presentation project** - a modern slide deck framework that uses Vue.js components and Markdown for creating interactive presentations.

### Key Structure
- **`slides.md`** - Main presentation content in Markdown with frontmatter configuration
- **`components/`** - Vue components used within slides (e.g., `BaselineNewly.vue`, `DialogDemo.vue`)
- **`layouts/`** - Custom Slidev layout components (e.g., `centered-content.vue`)
- **`snippets/`** - External code snippets and utilities
- **`pages/`** - Additional slide pages if needed

### Slidev-Specific Patterns
- Slides use frontmatter YAML configuration at the top of `slides.md`
- Slide separators are `---`
- Vue components can be embedded directly in Markdown using `<ComponentName />`
- Slides support special Slidev features like `v-click` for animations
- Layout slots are used with `:: slot-name ::` syntax in slides
- Custom CSS styling uses Vue's scoped styles in `.vue` files

### Theme and Styling
- Uses the `seriph` theme with custom components
- Custom layout `centered-content` provides title/content slot structure
- Components use scoped CSS with modern features like CSS custom properties
- SVG icons are inlined in Vue components for baseline status indicators

### Deployment
- Configured for both Netlify (`netlify.toml`) and Vercel (`vercel.json`)
- Build outputs static files to `dist/` directory
- SPA routing with fallback to `index.html` for client-side navigation