# SOLARIS // 3D Solar System Scroll Odyssey

An interactive 3D Solar System tour web application built with **Three.js**, **GSAP ScrollTrigger**, and **Lenis Smooth Scroll**.

Scrolling down with the mouse wheel (or trackpad / arrow keys) flies the camera sequentially from **The Sun** outward through all **8 Planets**, **20 Major Moons**, and **2 Dwarf Planets (Ceres & Pluto)**—31 stops in total.

## Features
- **31 Celestial Tour Stops**:
  - **Sun** → **Mercury** → **Venus** → **Earth** (+ *Moon*) → **Mars** (+ *Phobos, Deimos*) → **Ceres** (Asteroid Belt) → **Jupiter** (+ *Io, Europa, Ganymede, Callisto*) → **Saturn** (+ *Mimas, Enceladus, Rhea, Titan, Iapetus*) → **Uranus** (+ *Miranda, Ariel, Umbriel, Titania, Oberon*) → **Neptune** (+ *Proteus, Triton*) → **Pluto** (+ *Charon*).
- **Real-Time Distance from Earth**:
  - Computes 3D heliocentric coordinates for the current UTC epoch using JPL J2000 Keplerian elements (`js/astro/orbits.js`) and displays live distance in **kilometers**, **Astronomical Units (AU)**, **light-travel time**, and **min/max orbital range**.
- **Interactive 3D Viewport**:
  - Scroll down/up to fly through the Solar System.
  - Click and drag on the 3D canvas at any stop to orbit around the active planet or moon.
  - Click any stop in the right-side timeline or satellite quick-jump chips to fly directly to that world.

## Quick Start (Windows PowerShell)

No Node.js or Python installation is required. Run the included `.NET HttpListener` static server:

```powershell
powershell -ExecutionPolicy Bypass -File .\serve.ps1
```

Then open **http://localhost:8080** in your browser.
