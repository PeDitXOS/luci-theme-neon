# luci-theme-neon

**Neon Theme for OpenWrt LuCI** — A modern, mobile-first theme converted from neobird with PeDitX branding.

![License](https://img.shields.io/badge/license-Apache--2.0-blue.svg)
![OpenWrt](https://img.shields.io/badge/OpenWrt-24.10%20%7C%2025.10+-green.svg)
![Architecture](https://img.shields.io/badge/arch-all-orange.svg)

## Features

- 🎨 **Modern Design** — Clean HTML5/CSS3 based on Material Design
- 📱 **Mobile-First** — Optimized for phone/tablet screens
- 🌙 **Dark/Light Mode** — Automatic via `prefers-color-scheme`
- ⚡ **Animated Brand Logo** — Circular PeDitX logo with smooth bounce animation
- 🔧 **Zero Dependencies** — Only requires `luci-base`
- 📦 **Dual Package Format** — Builds as IPK (≤24.10) or APK (≥25.10) automatically

## Screenshots

| Light | Dark |
|-------|------|
| ![Light](preview/SCR-20220223-iw6.png) | ![Dark](preview/SCR-20220223-iwp.png) |

## Installation

### On OpenWrt Device (opkg / apk)

```bash
# OpenWrt 24.10 and earlier (IPK)
opkg update
opkg install luci-theme-neon

# OpenWrt 25.10+ (APK)
apk update
apk add luci-theme-neon
```

### Build from Source (OpenWrt SDK / Buildroot)

```bash
# Clone into your feed (e.g., feeds/luci/themes or package/lean)
git clone https://github.com/PeDitXOS/luci-theme-neon.git package/lean/luci-theme-neon

# Or as a custom feed
echo "src-git peditxos https://github.com/PeDitXOS/luci-theme-neon.git" >> feeds.conf.default
./scripts/feeds update peditxos
./scripts/feeds install luci-theme-neon

# Configure and build
make menuconfig    # LuCI → Themes → luci-theme-neon
make -j$(nproc) package/luci-theme-neon/compile V=s
```

## Configuration

After installation, activate the theme:

```bash
uci set luci.main.mediaurlbase=/luci-static/neon
uci commit luci
/etc/init.d/uhttpd restart
```

Or via LuCI: **System → System → Language and Style → Theme → Neon**

## Project Structure

```
luci-theme-neon/
├── Make                 # OpenWrt package Makefile
├── README.md            # This file
├── LICENSE              # Apache-2.0
├── htdocs/
│   └── luci-static/
│       └── neon/
│           ├── css/style.css        # Main stylesheet + animations
│           ├── js/
│           │   ├── jquery.min.js
│           │   └── script.js
│           ├── fonts/               # Icon font (neobird family)
│           ├── images/
│           │   ├── brand.png        # PeDitX circular animated logo
│           │   ├── logo.png         # Light sidebar logo
│           │   ├── logod.png        # Dark sidebar logo
│           │   ├── mlogo.png        # Light mobile logo
│           │   ├── mlogod.png       # Dark mobile logo
│           │   └── ... (UI icons)
│           ├── manifest.json        # PWA manifest
│           └── favicon.ico
├── luasrc/
│   └── view/
│       └── themes/
│           └── neon/
│               ├── header.htm       # Header template with brand logo
│               └── footer.htm       # Footer template
└── root/
    └── etc/
        └── uci-defaults/
            └── 30_luci-theme-neon   # Auto-activate on first boot
```

## Customization

### Brand Logo

Replace `htdocs/luci-static/neon/images/brand.png` with your own 200×200 circular PNG. The CSS animation (`.brand-bounce`) applies automatically.

### Colors

Edit CSS variables in `htdocs/luci-static/neon/css/style.css`:

```css
:root {
  --activeColor: #51c291;   /* Primary accent (teal) */
  --bg: #fafafa;            /* Light background */
  --bgwhite: #fff;          /* Card background */
  --textColor: #333;        /* Text color */
  /* Dark mode overrides in @media (prefers-color-scheme: dark) */
}
```

## Requirements

| Component | Version |
|-----------|---------|
| OpenWrt   | 21.02+ (tested on 24.10, 25.10) |
| LuCI      | luci-base (auto-dependency) |
| Kernel    | Any |

## Building for Multiple Versions

The same source builds for all OpenWrt versions via `luci.mk`:

- **21.02, 22.03, 23.05, 24.10** → `.ipk` packages
- **25.10+** → `.apk` packages (apk-tools)

No changes needed — the build system detects the target automatically.

## License

Apache-2.0 — see [LICENSE](LICENSE)

## Credits

- Original neobird theme by [2smile/thinktip](https://github.com/thinktip/luci-theme-neobird)
- Material Design by [Lutty Yang](https://github.com/LuttyYang/luci-theme-material)
- Bootstrap theme by Steven Barth, Jo-Philipp Wich, David Menting
- PeDitX branding & conversion by [PeDitXOS](https://peditxos.ir)

## Repository

- **Source:** https://github.com/PeDitXOS/luci-theme-neon
- **Issues:** https://github.com/PeDitXOS/luci-theme-neon/issues
- **OpenWrt Feed:** Add to `feeds.conf.default`:
  ```
  src-git peditxos https://github.com/PeDitXOS/luci-theme-neon.git
  ```