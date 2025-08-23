# React Three Parallax Clone

A production-ready React (Vite) template that clones the feel of a "Business & Corporate" portfolio with parallax, WebGL hero, and responsive UI.

## Stack
- React + Vite
- Tailwind CSS
- Framer Motion
- Three.js via @react-three/fiber + @react-three/drei

## Run Locally
```bash
npm install
npm run dev
```
Build for production:
```bash
npm run build && npm run preview
```

## Customize
- Replace copy in `Hero.jsx`, `Features.jsx`.
- Swap 3D shapes in `Showcase3D.jsx` with your GLTF (use `<Suspense><Model /></Suspense>`).
- Adjust colors in `tailwind.config.js`.
