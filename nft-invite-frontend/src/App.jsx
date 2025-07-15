// import { useKeplr } from "./hooks/useKeplr";
// import { useState } from "react";
// import "./index.css";

// function App() {
//   const { walletAddress, connectKeplr } = useKeplr();
//   const [loading, setLoading] = useState(false);
//   const [inviteCode, setInviteCode] = useState(null);
//   const [error, setError] = useState(null);

//   const checkInvite = async () => {
//     if (!walletAddress) return;

//     setLoading(true);
//     setError(null);

//     try {
//       const res = await fetch(
//         `http://localhost:3000/auth/check-nft/${walletAddress}`
//       );
//       const data = await res.json();
//       if (data.inviteCode) {
//         setInviteCode(data.inviteCode);
//       } else {
//         setError(data.error);
//       }
//     } catch (err) {
//       setError("Failed to connect to backend");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center px-4">
//       <h1 className="text-3xl font-bold mb-6">🚀 Stargaze Invite System</h1>

//       {!walletAddress ? (
//         <button
//           className="bg-indigo-600 px-6 py-2 rounded hover:bg-indigo-500"
//           onClick={connectKeplr}
//         >
//           Connect Keplr Wallet
//         </button>
//       ) : (
//         <>
//           <div className="mb-4">🔗 Connected: {walletAddress}</div>
//           <button
//             className="bg-green-600 px-6 py-2 rounded hover:bg-green-500"
//             onClick={checkInvite}
//           >
//             Check Invite Code
//           </button>
//         </>
//       )}

//       {loading && <p className="mt-4">Checking NFT ownership...</p>}

//       {inviteCode && (
//         <div className="mt-6 bg-gray-800 p-4 rounded">
//           <p className="text-lg">🎉 Your Invite Code:</p>
//           <p className="text-2xl font-mono text-yellow-400">{inviteCode}</p>
//         </div>
//       )}

//       {error && <p className="mt-4 text-red-400">⚠️ {error}</p>}
//     </div>
//   );
// }

// export default App;

// import { useKeplr } from "./hooks/useKeplr";
// import { useState } from "react";
// import "./index.css";

// function App() {
//   const { walletAddress: keplrAddress, connectKeplr } = useKeplr();

//   const [customAddress, setCustomAddress] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [inviteCode, setInviteCode] = useState(null);
//   const [error, setError] = useState(null);

//   const addressToUse = customAddress || keplrAddress;

//   const checkInvite = async () => {
//     if (!addressToUse) return;

//     setLoading(true);
//     setInviteCode(null);
//     setError(null);

//     try {
//       const res = await fetch(
//         `http://localhost:3000/auth/check-nft/${addressToUse}`
//       );
//       const data = await res.json();
//       if (data.inviteCode) {
//         setInviteCode(data.inviteCode);
//       } else {
//         setError(data.error || "Not eligible");
//       }
//     } catch (err) {
//       setError("⚠️ Failed to connect to backend");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center px-4">
//       <h1 className="text-3xl font-bold mb-6">🚀 Stargaze Invite System</h1>

//       <div className="w-full max-w-md bg-gray-800 p-6 rounded shadow-lg space-y-4">
//         <div className="flex flex-col space-y-2">
//           <label htmlFor="customAddress" className="text-sm text-gray-300">
//             🧪 Test with a different wallet address:
//           </label>
//           <input
//             type="text"
//             id="customAddress"
//             placeholder="stars1..."
//             className="px-3 py-2 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring"
//             value={customAddress}
//             onChange={(e) => setCustomAddress(e.target.value.trim())}
//           />
//         </div>

//         <div className="text-sm text-gray-400">
//           🔗 Connected (Keplr):{" "}
//           <span className="text-indigo-400 break-words">
//             {keplrAddress || "Not connected"}
//           </span>
//         </div>

//         <div className="flex space-x-2">
//           <button
//             onClick={connectKeplr}
//             className="bg-indigo-600 hover:bg-indigo-500 px-4 py-2 rounded"
//           >
//             Connect Keplr Wallet
//           </button>
//           <button
//             onClick={checkInvite}
//             className="bg-green-600 hover:bg-green-500 px-4 py-2 rounded"
//             disabled={loading || !addressToUse}
//           >
//             {loading ? "Checking..." : "Check Invite Code"}
//           </button>
//         </div>

//         {inviteCode && (
//           <div className="bg-gray-700 p-4 rounded mt-4">
//             <p className="text-lg">🎉 Your Invite Code:</p>
//             <p className="text-2xl font-mono text-yellow-400">{inviteCode}</p>
//           </div>
//         )}

//         {error && <p className="mt-4 text-red-400">⚠️ {error}</p>}
//       </div>
//     </div>
//   );
// }

// export default App;

import { useKeplr } from "./hooks/useKeplr";
import { useState } from "react";
import "./index.css";

function App() {
  const { walletAddress: keplrAddress, connectKeplr } = useKeplr();

  const [customAddress, setCustomAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const [inviteCode, setInviteCode] = useState(null);
  const [error, setError] = useState(null);

  const addressToUse = keplrAddress || customAddress;

  const checkInvite = async () => {
    if (!addressToUse) return;

    setLoading(true);
    setInviteCode(null);
    setError(null);

    try {
      const res = await fetch(
        `http://localhost:3000/auth/check-nft/${addressToUse}`
      );
      const data = await res.json();
      if (data.inviteCode) {
        setInviteCode(data.inviteCode);
      } else {
        setError(data.error || "Not eligible");
      }
    } catch (err) {
      setError("⚠️ Failed to connect to backend");
    } finally {
      setLoading(false);
    }
  };

  const handleManualInput = (e) => {
    const value = e.target.value.trim();
    setCustomAddress(value);
  };

  const handleConnectKeplr = async () => {
    if (!customAddress) {
      await connectKeplr();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-tr from-gray-900 via-black to-gray-800 text-white flex flex-col items-center justify-center px-4 py-10 font-sans">
      <h1 className="text-4xl sm:text-5xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 animate-pulse">
        🌌 Stargaze Invite Code Generator
      </h1>

      <div className="w-full max-w-xl bg-gray-800/70 backdrop-blur-md border border-gray-700 rounded-xl p-8 shadow-xl space-y-6 transition-all">
        <div>
          <label htmlFor="customAddress" className="text-sm text-gray-300">
            🧪 Enter wallet manually:
          </label>
          <input
            type="text"
            id="customAddress"
            placeholder="stars1..."
            className="mt-2 w-full px-4 py-2 rounded bg-gray-700 text-white border border-gray-600 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all"
            value={customAddress}
            onChange={handleManualInput}
            disabled={!!keplrAddress}
          />
          {keplrAddress && (
            <p className="text-sm text-yellow-400 mt-2">
              🛑 Cannot edit manually while Keplr is connected
            </p>
          )}
        </div>

        <div className="text-sm text-gray-400">
          🔗 Connected Wallet:{" "}
          <span className="text-indigo-400 break-all">
            {addressToUse || "Not connected"}
          </span>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-between">
          <button
            onClick={handleConnectKeplr}
            disabled={!!customAddress}
            className={`${
              customAddress
                ? "bg-gray-700 cursor-not-allowed"
                : "bg-indigo-600 hover:bg-indigo-500"
            } px-5 py-2 rounded transition-all`}
          >
            🔌 Connect Keplr
          </button>

          <button
            onClick={checkInvite}
            className={`${
              loading || !addressToUse
                ? "bg-gray-600 cursor-not-allowed"
                : "bg-green-600 hover:bg-green-500"
            } px-5 py-2 rounded transition-all`}
            disabled={loading || !addressToUse}
          >
            {loading ? "⏳ Checking..." : "✅ Get Invite Code"}
          </button>
        </div>

        {inviteCode && (
          <div className="bg-gray-900 p-5 rounded-lg border border-yellow-400 text-center shadow-lg animate-fade-in-up">
            <p className="text-lg mb-2 text-yellow-300">🎉 Your Invite Code:</p>
            <code className="text-2xl font-bold text-yellow-500 bg-yellow-500/10 px-4 py-2 rounded-lg select-all">
              {inviteCode}
            </code>
          </div>
        )}

        {error && (
          <div className="text-red-400 border border-red-500 bg-red-500/10 rounded p-4">
            ⚠️ {error}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
