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
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-4">
        Asset Acceptance – Mahavir Group
      </h1>

      <div className="border p-4 h-64 overflow-y-scroll text-sm mb-4">
        <p className="font-semibold mb-2">Asset Usage & Acceptance Policy</p>
        <p>All IT assets remain the property of Mahavir Group...</p>
        <p className="mt-2">
          Digital acceptance is legally binding and equivalent to a physical
          signature.
        </p>
      </div>

      <label className="flex items-center gap-2 mb-4">
        <input
          type="checkbox"
          checked={agreed}
          onChange={(e) => setAgreed(e.target.checked)}
        />
        <span>I have read and agree to the Asset Policy</span>
      </label>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <input
          className="border p-2"
          placeholder="Email OTP"
          value={emailOtp}
          onChange={(e) => setEmailOtp(e.target.value)}
        />
        <input
          className="border p-2"
          placeholder="Mobile OTP"
          value={mobileOtp}
          onChange={(e) => setMobileOtp(e.target.value)}
        />
      </div>

      <div className="flex gap-4">
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="bg-blue-600 text-white px-6 py-2 rounded"
        >
          Accept & Submit
        </button>

        <button onClick={handleResend} className="text-blue-600 underline">
          Resend OTP
        </button>
      </div>
    </div>
  );
}
