# House of Aroob — Architectural & Interior Consultation

[![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-Live%20Demo-brightgreen?logo=github&style=flat-square)](https://yourusername.github.io/house-of-aroob/)
[![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white&style=flat-square)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white&style=flat-square)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/ES6%2B-F7DF1E?logo=javascript&logoColor=black&style=flat-square)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![GSAP](https://img.shields.io/badge/Motion-GSAP%203.x-88CE02?logo=greensock&logoColor=white&style=flat-square)](https://greensock.com/)
[![License](https://img.shields.io/badge/License-Proprietary-gold?style=flat-square)](#license)

> **A bespoke single-page static website for House of Aroob, a luxury construction and interior consultation atelier in Bengaluru, India.**

---

## 🏛️ Overview

**House of Aroob** is a Bengaluru-based architectural construction and interior consultation studio specializing in bespoke residential and commercial environments. The digital experience is constructed around **"The Drawing Set"** design concept — an homage to classic architectural blueprints and working drawings, translating drafting table precision into a modern, interactive web presentation.

Featuring sheet registration numbers, corner crop marks, hairline dimension guides, and a tactile dark-onyx canvas accented by rich gold highlights, the site delivers a high-end editorial feel with zero framework overhead.

### 🌐 Live Demo
🔗 **[https://arbaiarts.github.io/house-of-aroob/](https://arbaiarts.github.io/house-of-aroob/)**  
*(Replace `yourusername` with your GitHub handle upon deployment)*

---

## ✨ Features

- **Architectural "Drawing Set" Visual Identity**: Technical drafting aesthetic incorporating sheet markers (`SHT 01/08`), grid registration crosses, alignment dimension rules, and technical typography.
- **Atmospheric Palette**: Deep onyx and graphite grounds harmonized with warm champagne gold and natural cream text for optimal legibility and understated luxury.
- **Silky Motion & Scroll Choreography**: Powered by GSAP (GreenSock Animation Platform) and ScrollTrigger for staggered text reveals, coordinate shifts, and subtle viewport parallax.
- **Fluid & Responsive Architecture**: Built exclusively with modern CSS Grid, Flexbox, and dynamic `clamp()` typography to maintain proportion across mobile phones, tablets, ultra-wide monitors, and 4K displays.
- **Curated Sections**:
  - **Hero & Cover Sheet**: Architectural title block, status indicators, and hero visual framing.
  - **Philosophy & Practice**: Studio ethos, methodology, and design standards.
  - **Services Matrix**: Comprehensive consultation breakdown (Turnkey Construction, Interior Consultation, Fine Marble & Stone, Architectural Plastering, Custom Metal Fabrication, Structural Waterproofing).
  - **Curated Gallery**: Curated photographic project showcase with technical metadata.
  - **Material Library**: Tactile presentation of signature materials (Brushed Brass, Veined Marble, Fluted Wood, Honed Travertine).
  - **Contact & Consultation Dossier**: Direct engagement channel, studio coordinates in Bengaluru, and consultation request portal.
- **Ultra Lightweight & Performant**: 100% vanilla stack without heavy build tools, frameworks, or dependencies. Instantaneous First Contentful Paint (FCP) and low memory footprint.
- **Zero-Config Deployment**: Optimized specifically for hosting on GitHub Pages, Cloudflare Pages, Vercel, or any standard HTTP file server.

---

## 🛠️ Tech Stack

| Technology | Role | Notes |
| :--- | :--- | :--- |
| **HTML5** | Semantic Structure | Strict semantic markup, ARIA roles, meta tags, and OpenGraph protocol. |
| **CSS3** | Layout & Styling | CSS Custom Properties (variables), CSS Grid, Flexbox, `clamp()` fluid math. |
| **Vanilla JavaScript** | Interactive Behavior | Native ES6+ DOM manipulation, event routing, dynamic navigation state. |
| **GSAP + ScrollTrigger** | Motion Engine | Loaded via pinned CDN scripts (`gsap.min.js`, `ScrollTrigger.min.js`). |
| **Google Fonts** | Typography | *Cormorant Garamond* (display serifs) and *Montserrat* (technical sans-serifs). |

---

## 📁 Project Structure

```text
house-of-aroob/
├── index.html                   # Primary single-page HTML document
├── README.md                    # Project documentation & configuration guide
├── css/
│   └── style.css                # Global styles, variables, typography, & layouts
├── js/
│   ├── main.js                  # Primary interactive scripts & GSAP timelines
│   └── three-scene.js           # Supplementary visual enhancements / canvas logic
└── assets/
    ├── logo/                    # Brand identity assets
    │   ├── favicon.png          # Browser tab icon (square)
    │   ├── logo-full.png        # Complete brand logotype
    │   ├── logo-mark.png        # Monogram / isolated emblem
    │   └── og-image.png         # OpenGraph social share card (1200x630 / 16:9)
    └── images/                  # Categorized photography assets
        ├── hero/
        │   └── hero-poster.png  # Hero background / primary showcase image
        ├── about/
        │   └── about-frame.png  # Studio profile / founder portrait
        ├── philosophy/
        │   └── philosophy-bg.png# Philosophy section architectural texture
        ├── services/
        │   ├── interior.png       # Interior consultation highlight
        │   ├── fabrication.png    # Custom architectural metalwork
        │   ├── marble.png         # Stonework and fine masonry
        │   ├── painting.png       # Luxury surface finishing
        │   ├── plastering.png     # Textured and lime plasters
        │   └── waterproofing.png  # High-grade technical waterproofing
        ├── gallery/
        │   ├── space-01.png       # Project showcase 01
        │   ├── space-02.png       # Project showcase 02
        │   ├── space-03.png       # Project showcase 03
        │   ├── space-04.png       # Project showcase 04
        │   ├── space-05.png       # Project showcase 05
        │   └── space-06.png       # Project showcase 06
        ├── materials/
        │   ├── brass.png          # Raw material: Brushed / aged brass
        │   ├── marble.png         # Raw material: Statuario / Italian marble
        │   ├── travertine.png     # Raw material: Honed travertine
        │   └── wood.png           # Raw material: Fluted natural teak / oak
        └── contact/
            └── contact-bg.png     # Consultation section backdrop
```

---

## 💻 Running Locally

Because this project is built entirely with vanilla web standards, you do not need to install `npm` packages or configure bundlers.

### Option 1: Direct File Launch
Double-click `index.html` or open it directly in any web browser.

### Option 2: Using Node.js (`npx serve`)
If you have Node.js installed, launch a local development server by executing:

```bash
# From within the house-of-aroob directory
npx serve .
```
Access the server at the URL printed in the terminal (typically `http://localhost:3000`).

### Option 3: Using Python
If you have Python installed:

```bash
# Python 3
python -m http.server 8000

# macOS / Linux (if python defaults to 2)
python3 -m http.server 8000
```
Open your browser and navigate to `http://localhost:8000`.

### Option 4: VS Code Live Server
1. Install the **Live Server** extension (by Ritwick Dey) in Visual Studio Code.
2. Right-click `index.html` in the file explorer.
3. Click **"Open with Live Server"**.

---

## 🚀 GitHub Pages Deployment Guide

Deploy your website live on GitHub Pages in under two minutes:

### 1. Initialize Git and Commit Your Files
Open your terminal inside the project root folder (`d:/Web Dev Projects/house-of-aroob/`):

```bash
git init
git add .
git commit -m "feat: initial commit for House of Aroob static website"
```

### 2. Connect to Your GitHub Repository
Create a new public repository on [GitHub](https://github.com/new) named `house-of-aroob`. Do not initialize it with a README or .gitignore.

```bash
git branch -M main
git remote add origin https://github.com/yourusername/house-of-aroob.git
git push -u origin main
```
*(Make sure to replace `yourusername` with your actual GitHub username).*

### 3. Activate GitHub Pages
1. Open your repository on GitHub.
2. Go to the **Settings** tab (gear icon at the top right of the repo).
3. In the left-hand navigation sidebar, click on **Pages** (under the "Code and automation" section).
4. Under **Build and deployment**:
   - **Source**: Select `Deploy from a branch` from the dropdown.
   - **Branch**: Select `main`.
   - **Folder**: Select `/ (root)`.
5. Click **Save**.
6. Wait 1–2 minutes for the GitHub Actions workflow to finish.
7. Your site will be published at:
   ```text
   https://yourusername.github.io/house-of-aroob/
   ```

---

## 📸 Replacing Concept Images with Real Project Photos

All visual placeholders in `assets/images/` can be replaced with genuine high-resolution project photographs. 

> [!IMPORTANT]
> To preserve layout stability and visual alignment, ensure replacement images match the specified **aspect ratio**, are saved as **`.png`** files, and use the **exact filenames** listed below.

### Image Asset Specifications Table

| Category | File Path | Expected Aspect Ratio | Suggested Dimensions | Purpose / Content |
| :--- | :--- | :---: | :---: | :--- |
| **Hero** | `assets/images/hero/hero-poster.png` | **16:9** | 1920 × 1080 px | Flagship architectural project hero scene |
| **About** | `assets/images/about/about-frame.png` | **4:5** (Portrait) | 1200 × 1500 px | Principal architect portrait or flagship studio view |
| **Philosophy** | `assets/images/philosophy/philosophy-bg.png` | **16:9** | 1920 × 1080 px | Subtle architectural geometry or facade detail |
| **Services** | `assets/images/services/interior.png` | **4:5** (Portrait) | 1120 × 1400 px | Interior consultation & residential staging |
| | `assets/images/services/fabrication.png` | **4:5** (Portrait) | 1120 × 1400 px | Metal joinery, bespoke screens, staircases |
| | `assets/images/services/marble.png` | **4:5** (Portrait) | 1120 × 1400 px | Bookmatched marble, natural stone masonry |
| | `assets/images/services/painting.png` | **4:5** (Portrait) | 1120 × 1400 px | Artisanal paint textures, micro-cement walls |
| | `assets/images/services/plastering.png` | **4:5** (Portrait) | 1120 × 1400 px | Venetian plaster, lime finishes, acoustic coat |
| | `assets/images/services/waterproofing.png` | **4:5** (Portrait) | 1120 × 1400 px | Structural engineering, waterproofing membranes |
| **Gallery** | `assets/images/gallery/space-01.png` | **3:4** (Portrait) | 1200 × 1600 px | Completed residential / villa project 01 |
| | `assets/images/gallery/space-02.png` | **3:4** (Portrait) | 1200 × 1600 px | Completed luxury apartment project 02 |
| | `assets/images/gallery/space-03.png` | **3:4** (Portrait) | 1200 × 1600 px | Completed corporate / boardroom project 03 |
| | `assets/images/gallery/space-04.png` | **3:4** (Portrait) | 1200 × 1600 px | Bespoke penthouse interior project 04 |
| | `assets/images/gallery/space-05.png` | **3:4** (Portrait) | 1200 × 1600 px | Private estate courtyard project 05 |
| | `assets/images/gallery/space-06.png` | **3:4** (Portrait) | 1200 × 1600 px | Custom millwork / architectural lounge 06 |
| **Materials** | `assets/images/materials/brass.png` | **1:1** (Square) | 1200 × 1200 px | Brushed satin brass or patinated bronze swatch |
| | `assets/images/materials/marble.png` | **1:1** (Square) | 1200 × 1200 px | High-resolution Italian marble surface texture |
| | `assets/images/materials/travertine.png` | **1:1** (Square) | 1200 × 1200 px | Open-pore or honed Roman travertine texture |
| | `assets/images/materials/wood.png` | **1:1** (Square) | 1200 × 1200 px | Fluted smoked oak or natural Burma teak grain |
| **Contact** | `assets/images/contact/contact-bg.png` | **16:9** | 1920 × 1080 px | Muted architectural backdrop for contact sheet |
| **Branding** | `assets/logo/logo-full.png` | Transparent PNG | 1200 × 400 px (or 1:1) | Primary logotype for navigation & footer |
| | `assets/logo/logo-mark.png` | Transparent PNG | 600 × 600 px | Monogram icon for sheet headers |
| | `assets/logo/favicon.png` | Transparent PNG | 512 × 512 px | Browser favicon and mobile touch icon |
| | `assets/logo/og-image.png` | **1.91:1** | 1200 × 630 px | Social preview image for WhatsApp, LinkedIn, X |

### Pro-Tips for Photography Replacement
- **Color Grading**: For a consistent architectural look, use photos with neutral or warm color temperatures and muted shadows that complement the gold and onyx palette.
- **File Optimization**: Before replacing files, compress them using tools like [TinyPNG](https://tinypng.com/) or [Squoosh](https://squoosh.app/) to keep individual image sizes under 500 KB for optimal load performance.

---

## 🎨 Customizing the Color Palette

All colors are controlled globally using CSS Custom Properties in `css/style.css`. To modify the aesthetic of the website, adjust the variables inside the `:root` pseudo-class:

```css
/* File: css/style.css */
:root {
  /* Primary background surfaces */
  --onyx: #161618;        /* Main dark page background */
  --graphite: #202023;    /* Elevated card and module background */

  /* Metallic gold accents */
  --gold-light: #F1E0BC;  /* Bright champagne highlight & hover borders */
  --gold: #D9BC8E;        /* Signature architectural metallic gold */
  --gold-deep: #B08A5B;   /* Deep burnished bronze for muted accents */

  /* Text & line hierarchy */
  --cream: #E8DCC4;       /* Primary legible text and heading color */
  --line: rgba(217, 188, 142, 0.25); /* Hairline drafting grid & crop lines */
}
```

### Alternative Color Schemes

You can quickly swap the site's mood by updating the hex values:

#### 1. Noir Minimalist (Monochrome & Platinum)
```css
:root {
  --onyx: #121212;
  --graphite: #1C1C1E;
  --gold-light: #FFFFFF;
  --gold: #E5E5EA;
  --gold-deep: #8E8E93;
  --cream: #F2F2F7;
  --line: rgba(255, 255, 255, 0.18);
}
```

#### 2. Deep Slate & Rose Bronze
```css
:root {
  --onyx: #14171A;
  --graphite: #1C2024;
  --gold-light: #F7D6C8;
  --gold: #D8A48F;
  --gold-deep: #9E6B56;
  --cream: #EDE3DF;
  --line: rgba(216, 164, 143, 0.22);
}
```

---

## 🌐 Browser Support

The site is built with modern web standards and is validated across all evergreen web browsers:

| Browser | Supported Versions | Notes |
| :--- | :--- | :--- |
| **Google Chrome** | Latest 2 versions | Full feature support (CSS Grid, `clamp()`, GSAP) |
| **Apple Safari** (macOS & iOS) | Version 14+ | Full support with WebKit hardware acceleration |
| **Mozilla Firefox** | Latest 2 versions | Full feature support |
| **Microsoft Edge** | Latest 2 versions | Full Chromium-based support |
| **Mobile Browsers** (Chrome/Safari) | iOS 14+, Android 10+ | Fluid viewport scaling, touch-optimized layouts |

---

## 🖋️ Credits & Attributions

- **Typography**:
  - [Cormorant Garamond](https://fonts.google.com/specimen/Cormorant+Garamond) by Christian Thalmann (Catharsis Fonts) — Licensed under SIL Open Font License.
  - [Montserrat](https://fonts.google.com/specimen/Montserrat) by Julieta Ulanovsky — Licensed under SIL Open Font License.
- **Animation Framework**:
  - [GSAP (GreenSock Animation Platform)](https://greensock.com/gsap/) and [ScrollTrigger](https://greensock.com/scrolltrigger/) — Industry-standard JavaScript animation library.
- **Architectural Identity & Curation**:
  - Design concept, drawing set motifs, and layout architecture created for **House of Aroob**, Bengaluru, India.

---

## 📄 License

This project and its accompanying architectural layouts, copy, and branding are proprietary to **House of Aroob**, Bengaluru.

```text
Copyright (c) 2026 House of Aroob. All rights reserved.
Unauthorized duplication, distribution, or commercial exploitation is strictly prohibited.
```
*(For open-source distribution or template usage, you may replace this section with the standard MIT License).*
