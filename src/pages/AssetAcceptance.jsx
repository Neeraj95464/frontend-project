// import { verifyAssetOtp, resendAssetOtp } from "../services/api";
// import { useState } from "react";
// import { useParams } from "react-router-dom";

// export default function AssetAcceptance() {
//   const { token } = useParams();

//   const [emailOtp, setEmailOtp] = useState("");
//   const [mobileOtp, setMobileOtp] = useState("");
//   const [agreed, setAgreed] = useState(false);
//   const [loading, setLoading] = useState(false);

//   const handleSubmit = async () => {
//     if (!agreed) {
//       alert("Please accept the Asset Policy to continue");
//       return;
//     }

//     try {
//       setLoading(true);
//       await verifyAssetOtp({
//         token,
//         emailOtp,
//         mobileOtp,
//       });
//       alert("Asset accepted successfully");
//     } catch (err) {
//       alert(err.response?.data || "Verification failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleResend = async () => {
//     try {
//       await resendAssetOtp(token);
//       alert("OTP resent successfully");
//     } catch (err) {
//       alert("Unable to resend OTP");
//     }
//   };

//   return (
//     <div className="max-w-3xl mx-auto p-6">
//       <h1 className="text-2xl font-semibold mb-4">
//         Asset Acceptance – Mahavir Group
//       </h1>

//       <div className="border p-4 h-64 overflow-y-scroll text-sm mb-4">
//         <p className="font-semibold mb-2">Asset Usage & Acceptance Policy</p>
//         <p>All IT assets remain the property of Mahavir Group...</p>
//         <p className="mt-2">
//           Digital acceptance is legally binding and equivalent to a physical
//           signature.
//         </p>
//       </div>

//       <label className="flex items-center gap-2 mb-4">
//         <input
//           type="checkbox"
//           checked={agreed}
//           onChange={(e) => setAgreed(e.target.checked)}
//         />
//         <span>I have read and agree to the Asset Policy</span>
//       </label>

//       <div className="grid grid-cols-2 gap-4 mb-4">
//         <input
//           className="border p-2"
//           placeholder="Email OTP"
//           value={emailOtp}
//           onChange={(e) => setEmailOtp(e.target.value)}
//         />
//         <input
//           className="border p-2"
//           placeholder="Mobile OTP"
//           value={mobileOtp}
//           onChange={(e) => setMobileOtp(e.target.value)}
//         />
//       </div>

//       <div className="flex gap-4">
//         <button
//           onClick={handleSubmit}
//           disabled={loading}
//           className="bg-blue-600 text-white px-6 py-2 rounded"
//         >
//           Accept & Submit
//         </button>

//         <button onClick={handleResend} className="text-blue-600 underline">
//           Resend OTP
//         </button>
//       </div>
//     </div>
//   );
// }



import { verifyAssetOtp, resendAssetOtp } from "../services/api";
import { useState } from "react";
import { useParams } from "react-router-dom";

export default function AssetAcceptance() {
  const { token } = useParams();

  const [emailOtp, setEmailOtp] = useState("");
  const [mobileOtp, setMobileOtp] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!agreed) {
      alert("Please accept the Asset Policy to continue");
      return;
    }

    try {
      setLoading(true);
      await verifyAssetOtp({
        token,
        emailOtp,
        mobileOtp,
      });
      alert("Asset accepted successfully");
    } catch (err) {
      alert(err.response?.data || "Verification failed");
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    try {
      await resendAssetOtp(token);
      alert("OTP resent successfully");
    } catch (err) {
      alert("Unable to resend OTP");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 flex items-center justify-center p-6">
      <div className="bg-white shadow-2xl rounded-2xl w-full max-w-3xl p-8">
        
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-blue-700">
            Asset Acceptance
          </h1>
          <p className="text-gray-500 mt-1">
            Mahavir Group – IT Asset Digital Confirmation
          </p>
        </div>

        {/* Policy Box */}
        <div className="border rounded-xl p-5 h-60 overflow-y-auto text-sm bg-gray-50 mb-6">
          <h2 className="font-semibold text-gray-700 mb-3">
            Asset Usage & Acceptance Policy
          </h2>

          <p>
            All IT assets issued to employees remain the property of Mahavir
            Group. Employees are responsible for proper usage, safety, and
            compliance with company IT policies.
          </p>

          <p className="mt-3">
            Any misuse, damage, or unauthorized installation of software may
            result in disciplinary action as per company policy.
          </p>

          <p className="mt-3 font-medium text-red-600">
            Digital acceptance is legally binding and equivalent to a physical
            signature.
          </p>
        </div>

        {/* Agreement */}
        <div className="flex items-center gap-3 mb-6">
          <input
            type="checkbox"
            checked={agreed}
            onChange={(e) => setAgreed(e.target.checked)}
            className="h-4 w-4 text-blue-600"
          />
          <span className="text-gray-700">
            I have read and agree to the Asset Policy
          </span>
        </div>

        {/* OTP Inputs */}
        <div className="grid md:grid-cols-2 gap-4 mb-6">
          <input
            className="border rounded-lg p-3 focus:ring-2 focus:ring-blue-400 outline-none"
            placeholder="Enter Email OTP"
            value={emailOtp}
            onChange={(e) => setEmailOtp(e.target.value)}
          />
          <input
            className="border rounded-lg p-3 focus:ring-2 focus:ring-blue-400 outline-none"
            placeholder="Enter Mobile OTP"
            value={mobileOtp}
            onChange={(e) => setMobileOtp(e.target.value)}
          />
        </div>

        {/* Buttons */}
        <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
          <button
            onClick={handleSubmit}
            disabled={loading}
            className={`w-full md:w-auto px-8 py-3 rounded-lg font-medium text-white transition ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {loading ? "Processing..." : "Accept & Submit"}
          </button>

          <button
            onClick={handleResend}
            className="text-blue-600 hover:text-blue-800 font-medium underline"
          >
            Resend OTP
          </button>
        </div>
      </div>
    </div>
  );
}