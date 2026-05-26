# howlyvine — Portfolio

Static portfolio site built with React + TypeScript + Vite.  
Optimized for IPFS hosting via [Pinata](https://app.pinata.cloud) and ENS domain `howlyvine.eth`.

## 🚀 Quick Start

```bash
# Install (using bun or npm)
bun install       # or: npm install

# Dev server
bun run dev       # or: npm run dev

# Build for production
bun run build     # or: npm run build
# → output goes to ./dist/
```

## 🔐 Admin Login

Default credentials (change before deploying!):

| Field    | Value       |
|----------|-------------|
| Username | `howlyvine` |
| Password | `howly2026` |

To change: edit `src/components/LoginModal.tsx`, lines:
```ts
const ADMIN_USERNAME = "howlyvine";
const ADMIN_PASSWORD = "howly2026";
```

After logging in, click your username in the navbar to open the **Admin Panel** where you can:
- ➕ Add / ✏️ Edit / 🗑️ Delete **Projects**
- ➕ Add / ✏️ Edit / 🗑️ Delete **Posts**

All data is saved to `localStorage` — it persists across browser sessions.

## 📦 Deploy to Pinata (IPFS)

1. Run `bun run build` → `dist/` folder is created
2. Go to [app.pinata.cloud](https://app.pinata.cloud)
3. Upload the entire `dist/` folder
4. Copy the IPFS CID (e.g. `Qm...` or `bafybei...`)
5. Point your ENS name `howlyvine.eth` to the CID:
   - Go to [app.ens.domains](https://app.ens.domains)
   - Manage `howlyvine.eth` → **Records**
   - Set **Content Hash** to `ipfs://YOUR_CID`
6. Access via `https://howlyvine.eth.limo` or `https://howlyvine.eth.link`

> **Note:** Because this is IPFS/static, data added via the admin panel is stored in your *browser's* localStorage only — not globally. For a production setup, consider integrating Pinata's JSON API to persist data on IPFS directly.

## 🛠 Tech Stack

- React 19
- TypeScript 5
- Vite 6
- JetBrains Mono + Inter (Google Fonts)
- 100% static — no backend needed
