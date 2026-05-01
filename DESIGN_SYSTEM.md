# Project Design System & UI Guidelines

This document serves as the single source of truth for the project's UI structure, color combinations, themes, and design patterns. When implementing new features, this document must be strictly followed to ensure visual consistency.

## 1. Typography
- **Primary Font Family**: `'Inter', system-ui, -apple-system, sans-serif`
- **Font Weights**: `400` (Regular), `500` (Medium), `600` (Semi-bold), `700` (Bold), `800` (Extra-bold)
- **Line Height**: `1.5` globally, adjusted for specific headings.

## 2. Color Palette & Themes

The project supports both Dark Mode (default) and Light Mode. These are controlled via CSS variables attached to `:root` and `body.light-mode`.

### Dark Mode (Default)
- **Background (Main)**: `#070B14` (`--bg-dark`)
- **Background (Cards/Sections)**: `#111526` (`--bg-card`)
- **Background (Hover State)**: `#1A2033` (`--bg-hover`)
- **Border Color**: `#1F293B` (`--border-color`)
- **Text (Main)**: `#F8FAFC` (`--text-main`)
- **Text (Muted)**: `#94A3B8` (`--text-muted`)

### Light Mode (`.light-mode`)
- **Background (Main)**: `#F2EFE9` (`--bg-dark`)
- **Background (Cards/Sections)**: `#FAF8F2` (`--bg-card`)
- **Background (Hover State)**: `#E8E4DB` (`--bg-hover`)
- **Border Color**: `#D5CFC4` (`--border-color`)
- **Text (Main)**: `#36312B` (`--text-main`)
- **Text (Muted)**: `#736C61` (`--text-muted`)

### Core Brand Colors
- **Primary Color**: `#3B82F6` (Blue)
- **Brand Gradient**: `linear-gradient(135deg, var(--primary-color) 0%, var(--primary-color) 100%)`

### Tag / Badge Colors
Used for skills, categories, and labels.
- **Green**: Background `rgba(16, 185, 129, 0.1)`, Text `#10B981`
- **Orange**: Background `rgba(245, 158, 11, 0.1)`, Text `#F59E0B`
- **Pink**: Background `rgba(236, 72, 153, 0.1)`, Text `#EC4899`
- **Blue**: Background `rgba(59, 130, 246, 0.1)`, Text `#3B82F6`
- **Purple**: Background `rgba(168, 85, 247, 0.1)`, Text `#A855F7`

---

## 3. Global UI Elements & Effects

### Glowing Hero Effect
- **Glow 1**: Purple-ish (`--hero-glow-1`)
- **Glow 2**: Blue-ish (`--hero-glow-2`)
- **Implementation**: Used as a pseudo-element (`::before`) with a `radial-gradient` to create a soft ambient background light at the top of headers/hero sections.

### Buttons (`.btn`)
- **Base Padding**: `10px 20px`
- **Border Radius**: `6px`
- **Font**: `0.9rem`, `600` weight
- **Primary Button (`.btn-primary`)**: Uses `var(--text-main)` for background and `var(--bg-dark)` for text.
- **Outline Button (`.btn-outline`)**: Transparent background, `1px solid var(--border-color)`, `var(--text-main)` text. On hover, background changes to `var(--bg-hover)`.
- **Social Buttons (`.btn-social`)**: Specific brand colors (LinkedIn, GitHub, Email, Facebook) with `8px 16px` padding and `0.8rem` bold uppercase text.

---

## 4. Structural Layouts

### Navbar (`.navbar`)
- **Positioning**: `sticky`, `top: 0`, `z-index: 100`
- **Layout**: Flexbox with `space-between`.
- **Components**: `.nav-brand` (left), `.nav-links` (center), `.nav-actions` (right, includes theme toggle).
- **Responsive**: Stacks or wraps on mobile (`max-width: 768px`).

### Main Content Grid (`.container`)
- **Max Width**: `1200px`, centered.
- **Layout**: 2-column grid (`2fr 1fr` ratio) on desktop.
  - `.content-left`: Main lists, projects, experiences.
  - `.content-right`: Sidebar widgets (skills, academics).
- **Responsive**: Collapses to `1fr` (single column) at `992px`.

### Data Rows / Cards (`.data-row`)
- **Usage**: Project list, experience list.
- **Styling**: `var(--bg-card)` background, `1px solid var(--border-color)` border, `8px` border-radius.
- **Hover Effect**: Border color changes to `var(--primary-color)`.
- **Layout**: Grid layout (e.g., `30px 1fr` for number and content).

### Sidebar Panels (`.sidebar-panel`)
- **Styling**: Same card base (`--bg-card`, `--border-color`, `8px` radius) but with `16px` padding.
- **Headers**: Usually an `<h3>` with an icon colored `var(--primary-color)`.
- **Pill Tags (`.pill`)**: Used for skills. Transparent background, border, `20px` radius. Hover effect changes border to primary color and background to hover state.

---

## 5. Implementation Rules
1. **Never hardcode hex colors** for layout elements. Always use `var(--bg-dark)`, `var(--bg-card)`, `var(--text-main)`, etc., to ensure Light/Dark mode compatibility.
2. **Follow existing class conventions**: Use `.data-row`, `.section-head`, `.tag`, and `.btn` utilities rather than creating new custom classes for similar elements.
3. **Respect spacing**: Maintain consistent padding/margins (`16px`, `20px`, `24px` scales) and `8px` border radii for cards.
4. **Responsive First**: Always verify that new layouts collapse cleanly on tablets (`992px`), mobile (`768px`), and small screens (`480px`).
