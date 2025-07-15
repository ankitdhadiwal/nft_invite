# 🚀 NFT Invite Code Distributor – Fullstack App (Stargaze + Keplr)

This fullstack project enables users to **claim invite codes** if they own NFTs from **whitelisted Stargaze collections**. Built with:

- 🧠 **NestJS** backend (with SQLite, TypeORM, Stargaze integration)
- 🌐 **React + TailwindCSS** frontend (with Keplr wallet support)

---

## 🧩 Features

✅ Admin can whitelist Stargaze NFT collection addresses  
✅ Users can connect via **Keplr wallet** or enter wallet manually  
✅ System checks if wallet owns any whitelisted NFT  
✅ If eligible, returns a **unique one-time invite code**  
✅ Prevents duplicate claims (one invite per wallet)  
✅ Built-in **rate limiting** (anti-abuse)  
✅ Clean and responsive frontend UI

---

## 🏗 Project Structure

```bash

nft-invite/
├── nft-invite-backend/ ← NestJS backend
│
├── nft-invite-frontend/ ← React + Tailwind frontend
│
├── README.md 

```

---


---

## ⚙️ Setup Instructions

### 1️⃣ Clone the Repo

```bash
git clone https://github.com/your-username/nft-invite.git
cd nft-invite

```

## 2 Backend Setup 

```bash 
cd nft-invite-backend
npm install
```

### ➕ Seed Invite Codes

Add codes to `codes.csv`

```bash 
INVITE-123
INVITE-456
INVITE-789

```

### ▶️ Run Backend

```bash 

npm run start:dev

```

Backend runs at: `http://localhost:3000`


---


## 💻 Frontend Setup (nft-invite-frontend)

```bash 

cd nft-invite-frontend
npm install
npm run dev

```

Frontend runs at: `http://localhost:5173`

---



## Screenshots


![Demo Screenshot](./Screenshot%20(538).png)






