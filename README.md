# Nexus AI Voice site (voice.nexus-aisolution.com)

Static source for the AI Voice Agents site, served by the Vercel project
`nexusai-voice-preview` (Root Directory: `src`).

- `src/` is the site itself (plain HTML/CSS, no build step).
- The root `vercel.json` only stops the main Next.js project from trying to
  build this branch; the voice project reads `src/vercel.json`.
- The "Nexus AI" logo and the "← Nexus AI home" menu link point to the main
  site, https://www.nexus-aisolution.com/.
