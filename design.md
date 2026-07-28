---
name: MiraiWay Digital Interface
colors:
  surface: '#f8fafc'
  surface-dim: '#e2e8f0'
  surface-bright: '#ffffff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f1f5f9'
  surface-container: '#e2e8f0'
  surface-container-high: '#cbd5e1'
  surface-container-highest: '#94a3b8'
  on-surface: '#0f172a'
  on-surface-variant: '#475569'
  inverse-surface: '#0f172a'
  inverse-on-surface: '#f8fafc'
  outline: '#cbd5e1'
  outline-variant: '#e2e8f0'
  surface-tint: '#0284c7'
  primary: '#0f172a'
  on-primary: '#ffffff'
  primary-container: '#042158'
  on-primary-container: '#38bdf8'
  inverse-primary: '#38bdf8'
  secondary: '#1155a9'
  on-secondary: '#ffffff'
  secondary-container: '#0284c7'
  on-secondary-container: '#e0f2fe'
  tertiary: '#f59c1a'
  on-tertiary: '#0f172a'
  tertiary-container: '#efa004'
  on-tertiary-container: '#ffffff'
  error: '#dc2626'
  on-error: '#ffffff'
  error-container: '#fef2f2'
  on-error-container: '#991b1b'
  primary-fixed: '#0f172a'
  primary-fixed-dim: '#1e293b'
  on-primary-fixed: '#ffffff'
  on-primary-fixed-variant: '#cbd5e1'
  secondary-fixed: '#0284c7'
  secondary-fixed-dim: '#0369a1'
  on-secondary-fixed: '#ffffff'
  on-secondary-fixed-variant: '#e0f2fe'
  tertiary-fixed: '#f59c1a'
  tertiary-fixed-dim: '#d97706'
  on-tertiary-fixed: '#0f172a'
  on-tertiary-fixed-variant: '#ffffff'
  background: '#ffffff'
  on-background: '#0f172a'
  surface-variant: '#f1f5f9'
  navy-deep: '#042158'
  navy-dark: '#0f172a'
  blue-corporate: '#1155a9'
  blue-sky: '#0284c7'
  emerald-accent: '#059669'
  gold-accent: '#f59c1a'
  gold-decorative: '#efa004'
  gold-star: '#fcb30c'
  surface-light: '#f8fafc'
  border-subtle: '#e2e8f0'
  border-hairline: 'rgba(255, 255, 255, 0.12)'
  text-primary: '#0f172a'
  text-sub: '#475569'
typography:
  headline-xl:
    fontFamily: Noto Sans JP
    fontSize: 48px
    fontWeight: '800'
    lineHeight: '1.2'
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Noto Sans JP
    fontSize: 32px
    fontWeight: '800'
    lineHeight: '1.3'
  headline-lg-mobile:
    fontFamily: Noto Sans JP
    fontSize: 24px
    fontWeight: '800'
    lineHeight: '1.3'
  headline-md:
    fontFamily: Noto Sans JP
    fontSize: 24px
    fontWeight: '700'
    lineHeight: '1.4'
  body-lg:
    fontFamily: Noto Sans JP
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Noto Sans JP
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  label-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '700'
    lineHeight: '1'
    letterSpacing: 0.08em
  label-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '800'
    lineHeight: '1'
  data-numeric:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '800'
    lineHeight: '1'
rounded:
  sm: 0px
  DEFAULT: 0px
  md: 0px
  lg: 0px
  xl: 0px
  full: 0px
spacing:
  unit: 4px
  gutter: 24px
  margin-mobile: 16px
  margin-desktop: 48px
  container-max: 1280px
---

# MiraiWay Digital Interface System — Design Guidelines

## 1. Brand & Style Philosophy

The **MiraiWay Digital Interface System** is engineered to express **global authority, executive prestige, and technological momentum**. Designed for corporate clients, enterprise decision-makers, and global talent, the visual identity balances institutional reliability with Apple-inspired sharp precision and modern flat architecture.

### Core Visual Pillars
1. **Apple-Inspired Sharp Flat Precision**: Replaces generic rounded corners with crisp 0px flat geometry, delivering a sharp, sophisticated corporate profile.
2. **High-Contrast Typography & Kinetic Overlay**: Combines clean Japanese Noto Sans JP headlines with bold Inter numbers and kinetic background text for dynamic energy.
3. **Structured Infographic Hierarchy**: Employs color-coded step cards (`STEP 01-03`), executive philosophy banners, and interactive outline stroke keyframes (`-webkit-text-stroke`).
4. **Infinite Activity Marquee**: Incorporates seamless 60fps horizontal marquee scrolling to showcase real-world operational activities beneath key brand messaging.

---

## 2. Color Palette & Token Architecture

The color strategy is built on **"Trust & Prosperity"**.

| Role | Color Name | Hex / Value | Usage Scope |
| :--- | :--- | :--- | :--- |
| **Primary Navy** | Deep Titanium Navy | `#0F172A` / `#042158` | Dark hero canvas, executive banners, dark footers, high-contrast headings |
| **Corporate Blue** | Sky Blue Accent | `#0284C7` / `#1155A9` | Active UI states, STEP 02 badges, category tags, link hovers |
| **Emerald Accent** | Settlement Support Emerald | `#059669` / `#34D399` | STEP 03 badges, settlement support highlights, checkmark accents |
| **Gold Accent** | Radiant Amber | `#F59C1A` / `#EFA004` | Logo star mark, CTA highlights, diagonal background ribbon, hero accents |
| **Surface Light** | Off-White Slate | `#F8FAFC` | Section card backgrounds, container fills, zebra rows |
| **Surface Pure** | Crisp Pure White | `#FFFFFF` | News flat section background, main content cards, input fields |
| **Border Subtle** | Hairline Border | `#E2E8F0` / `rgba(255,255,255,0.12)` | Component separation, outline cards, flat list dividers |
| **Text Main** | Solid Dark Slate | `#0F172A` | Primary body text and headlines on white backgrounds (100% legibility) |
| **Text Muted** | Slate Gray | `#475569` | Dates, captions, subtitle descriptions |

---

## 3. Typography System

Typography operates on a **dual-path standard**:

1. **Noto Sans JP** (Primary Body & Headings): Ensures seamless legibility across Japanese titles, body text, and executive messages with tight headline letter spacing (`-0.02em`) and generous body line heights (`1.6`).
2. **Inter** (Technical & Numeric Layer): Applied to all numeric data, step counters (`01`, `02`, `03`), section badges (`STEP 01`), category labels (`PRESS RELEASE`, `お知らせ`), and metrics.

### Typography Hierarchy

- **Headline XL** (`48px` / Bold `800`): Hero slogans & section main titles.
- **Headline LG** (`32px` / Bold `800`): Section headers (`01 ABOUT US`, `02 NEWS & TOPICS`).
- **Headline MD** (`24px` / Bold `700`): Sub-headers & card titles.
- **Body LG** (`18px` / Regular `400`): Lead paragraphs & executive statement excerpts.
- **Body MD** (`16px` / Regular `400`): Standard body paragraphs.
- **Data Numeric** (`Inter` / Bold `800`): Giant numbers (`01`, `02`, `03`) with dynamic stroke-fill transitions on hover (`-webkit-text-stroke: 1.5px #38bdf8`).

---

## 4. Sharp Edge & Flat Geometry Policy (0px Radius)

> [!IMPORTANT]
> **Corner Radius Directive**: Per project design standards, all rounded corners (`rounded-lg`, `rounded-md`, `border-radius: 4px`) are strictly prohibited in structural UI elements. All components must utilize **0px sharp geometry** (`border-radius: 0px`).

- **Cards & Banners**: 0px radius with 1px crisp hairline borders (`#E2E8F0` or `#1E293B`).
- **Buttons & Tags**: 0px rectangular bounds (`.btn-sharp`, `.step-badge`, `.btn-corporate-mission`).
- **Input Elements**: 0px crisp form fields with high-contrast active borders.

---

## 5. Layout & Grid Architecture

- **Container Width**: Max `1280px` (`margin: 0 auto`, padding `0 24px`).
- **Vertical Section Spacing**: Large editorial gaps (`100px` desktop / `60px` mobile) between major sections.
- **Section Grid Structure**:
  - `01 | ABOUT US`: 3-Column Infographic Step Grid + Full-width Executive Mission Banner.
  - `02 | NEWS & TOPICS`: Full-bleed flat container with 26vw background typography `"NEWS"` & grid news rows (`240px 1fr 40px`).
  - `03 | SERVICES`: 5 Core Services (`Global HR`, `DX Support`, `Offshore Development`, `BPO`, `Creative`).
  - `04 | PROCESS`: 6-Step Flow Panels with pure white legibility (`#FFFFFF`).
  - `05 | COMPANY`: Company Overview Table & Message Link.
  - `06 | CONTACT`: Dark Navy CTAs with high-contrast inquiry form.

---

## 6. Component Specifications

### 6.1 Ultra Stable Corporate Infographic Cards (`STEP 01–03`)

The 3-step infographic card grid delivers a structured, high-trust breakdown of core operations.

#### Visual Architecture & Badge Matrix
- **Step Badges (0px Sharp Bounds)**:
  - `STEP 01` (現地教育 / LOCAL EDUCATION): Dark Navy Badge (`#0F172A`).
  - `STEP 02` (人材紹介 / MATCHING): Sky Blue Badge (`#0284C7`).
  - `STEP 03` (来日・定着支援 / SETTLEMENT SUPPORT): Emerald Badge (`#059669`).
- **Background Accent Ribbon**: A subtle gold geometric ribbon accent (`linear-gradient(135deg, rgba(245, 156, 26, 0.15) ...)`) runs diagonally behind the card grid to connect the steps.

#### Dynamic Hover Keyframes
- **Card Background**: Shifts from Off-White Slate (`#F8FAFC`) to Dark Titanium Navy (`#0F172A`).
- **Giant Inter Numbers (`01`, `02`, `03`)**: Font size `3.8rem` (`fontWeight: 900`). On hover, solid text fill transitions to transparent with glowing sky-blue or emerald outline stroke (`-webkit-text-stroke: 1.5px #38bdf8` / `-webkit-text-stroke: 1.5px #34d399`).
- **Card Title & Body Text**: Title turns crisp White (`#FFFFFF`), body copy turns soft slate (`#CBD5E1`).
- **Checklist Hairline**: Top dashed divider (`border-top: 1px dashed #E2E8F0`) transforms to dark slate (`#334155`), and checkmark icons highlight to `#38BDF8` or `#34D399`.

---

### 6.2 Executive Philosophy Banner (`PHILOSOPHY / OUR MISSION`)

Full-width dark executive card establishing corporate credibility and core mission values.

#### Structural Layout & Style Specs
- **Container**: Dark Titanium Navy (`#0F172A`) with 0px sharp corners, hairline slate border (`1px solid #1E293B`), and soft elevation shadow (`0 10px 35px rgba(15, 23, 42, 0.12)`).
- **Header Bar**: Top flex row featuring `PHILOSOPHY` badge in Sky Blue (`#0284C7`) on the left and `OUR MISSION` text in muted slate (`#94A3B8`) on the right, grounded by a 1px slate divider (`#334155`).
- **Main Heading**: High-contrast White (`#FFFFFF`) title with sky blue text highlight (**信頼とサポート** -> `#38BDF8`).
- **3-Column Core Values Grid**:
  1. `1. 一人ひとりに寄り添う丁寧なサポート` (Border-left: `2.5px solid #0284c7`)
  2. `2. 安心・安全を守る透明性の高い運営` (Border-left: `2.5px solid #475569`)
  3. `3. 継続的な成長を支えるパートナーシップ` (Border-left: `2.5px solid #475569`)
- **Primary CTA Button (`.btn-corporate-mission`)**: 0px rectangular sharp button in Solid White (`#FFFFFF`) with Dark Navy (`#0F172A`) text, featuring right-arrow icon transition on hover (`transform: translateX(4px)`).

---

### 6.3 Infinite Activity Marquee
- **Structure**: Continuous 60fps horizontal marquee track (`.marquee-track`).
- **Placement**: Situated directly beneath Section 01 body copy.
- **Visuals**: Real-world operational photographs with crisp 0px borders and subtle shadow elevation.

---

### 6.4 News & Topics Flat Section (`02 | NEWS & TOPICS`)
- **Background**: Pure Crisp White (`#FFFFFF`) with semi-transparent background typography `"NEWS"` (`rgba(15, 23, 42, 0.04)`).
- **Row Cards**: 3-Column Grid (`240px` date & tag, `1fr` headline, `40px` arrow icon).
- **Hover Action**: Background shifts to `#F8FAFC`, title turns `#0284C7`, arrow translates `+6px` right.

---

### 6.5 Core Service Grid (`03 | SERVICES`)
- Service 1: **特定技能・登録支援 / Global HR**
- Service 2: **DX支援・エンジニア育成 / DX Support**
- Service 3: **オフショア開発 / Offshore Development**
- Service 4: **BPO・業務アウトソーシング / BPO**
- Service 5: **クリエイティブ制作 / Creative** (Renamed from legacy "動画制作")

---

### 6.6 Logo Mark & Navigation
- **SVG Dual-ID System**:
  - `variant="full"` & `variant="markOnly"` with unique gradient IDs (`lm-blue-left-norm` vs `lm-blue-left-inv`).
  - Header: Navy & Sky Blue Fill.
  - Footer: Inverted White & Sky Blue Fill against dark navy background (`#0F172A`).

---

## 7. Quality Assurance & Verification Rules

1. **Preloader Clearance**: The curtain loader (`.page-loader`) must have `overflow: hidden !important;` and `display: none !important;` when `.is-loaded` to prevent bottom scroll space protrusion.
2. **Text Contrast**: Text on light backgrounds must use `#0F172A` (never low-contrast light grays); text on dark backgrounds must use `#FFFFFF` or `#38BDF8`.
3. **Build Validation**: All modifications must pass `npm run build` with zero TypeScript or JSX syntax errors.
