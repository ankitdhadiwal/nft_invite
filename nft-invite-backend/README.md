# 🚀 NFT-Gated Invite Code Distributor (NestJS Backend)

A backend service built with **NestJS** that distributes **invite codes** to users who **own NFTs from whitelisted Stargaze collections**. This is intended for use with frontend clients (e.g., DApps with Keplr wallet integration) and provides NFT-based gated access.

---

## 📦 Features

- ✅ Admin endpoint to register Stargaze NFT collection addresses.
- ✅ User endpoint to check NFT ownership and receive a one-time invite code.
- ✅ Integration with **Stargaze REST API** to verify wallet ownership.
- ✅ Rate limiting (anti-abuse) with `@nestjs/throttler`.
- ✅ Preloaded invite codes via `codes.csv` and seeder script.

---

## 🛠️ Tech Stack

- **Framework:** NestJS (v11)
- **Database:** SQLite + TypeORM
- **Rate Limiting:** @nestjs/throttler
- **External API:** Stargaze REST API

---

## 📂 Project Structure

```bash

nft-invite-backend/
│
├── src/
│   ├── admin/
│   │   ├── admin.controller.ts
│   │   └── admin.service.ts
│   ├── auth/
│   │   └── nft-check.controller.ts
│   ├── entities/
│   │   ├── collection.entity.ts
│   │   └── invite-code.entity.ts
│   ├── seeder.ts                    ← Invite code importer
│   ├── app.module.ts
│   └── main.ts
│
├── test/
│   └── app.e2e-spec.ts             ← E2E tests for claim logic
│
├── codes.csv                       ← Invite codes to preload
├── db.sqlite                       ← SQLite database file
└── README.md


```

---

## 📌 Setup Instructions

### 1. Clone the Repo

```bash
git clone https://github.com/your-username/nft-invite-backend.git
cd nft-invite-backend
```

### 2. Install Dependencies

```bash
npm install 
```

### 3. Seed Invite Codes

Put your codes in `codes.csv` like this :

```bash 
INVITE-123
INVITE-456
INVITE-789
```

Then run the seeder: 
```bash
npx ts-node src/seeder.ts
```

### 4. Run the server 
```bash 
npm run start:dev

```

Server will run on `http://localhost:3000`


---

## 🔐 API Endpoints

### 1. Whitelist a Collection

```bash 
POST /admin/collections
```

Body : 
```bash 
{
  "address": "stars1yourcollectioncontract..."
}
```

### 2. Check NFT Ownership & Claim Invite

```bash
GET /auth/check-nft/:walletAddress

```
If wallet owns a token from any whitelisted collection and hasn’t claimed before, returns:

```bash 
{ "inviteCode": "INVITE-123" }
```


Otherwise:
```bash 
{ "error": "Not eligible" }

```


---

## 🧪 Run Tests

```bash 

npm run test:e2e

```

Tests include:

✅ Eligible wallet receives invite
✅ Duplicate claim prevention
✅ Non-owner gets error

---

## 🛡 Rate Limiting

The app is rate-limited to:

 - 5 requests per minute per IP using `@nestjs/throttler`.










