

import { verifyAssetOtp, resendAssetOtp, getAcceptanceDetails } from "../services/api";
import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";

export default function AssetAcceptance() {
  const { token } = useParams();

  const [emailOtp, setEmailOtp] = useState("");
  const [mobileOtp, setMobileOtp] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [loading, setLoading] = useState(false);

  const [assetDetails, setAssetDetails] = useState(null);
  const [policyHtml, setPolicyHtml] = useState("");
  const [pageLoading, setPageLoading] = useState(true);

  const [policyRead, setPolicyRead] = useState(false);

  const policyRef = useRef(null);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await getAcceptanceDetails(token);
        setAssetDetails(res);
        setPolicyHtml(res.policyHtml);
      } catch (err) {
        alert("Unable to load asset details");
      } finally {
        setPageLoading(false);
      }
    };

    if (token) load();
  }, [token]);

  // Detect scroll end
  const handleScroll = () => {
    const el = policyRef.current;

    if (!el) return;

    const isBottom =
      el.scrollHeight - el.scrollTop <= el.clientHeight + 5;

    if (isBottom) {
      setPolicyRead(true);
    }
  };

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
      await resendAssetOtp({ token });
      alert("OTP resent successfully");
    } catch (err) {
      alert("Unable to resend OTP");
    }
  };

  if (pageLoading) {
    return (
      <div className="flex items-center justify-center h-screen text-gray-600 text-lg">
        Loading Asset Policy...
      </div>
    );
  }

  return (
    // <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 flex justify-center p-6">
<div className="lg:ml-48 bg-gray-50 min-h-screen">
      <div className="bg-white shadow-2xl rounded-2xl w-full max-w-5xl p-8">

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-blue-700">
            Asset Acceptance
          </h1>
          <p className="text-gray-500 mt-2">
            Mahavir Group – IT Asset Digital Confirmation
          </p>
        </div>

        {/* Top Sections */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">

          {/* User Details */}
          <div className="border rounded-xl p-5 bg-blue-50 shadow-sm">
            <h2 className="text-lg font-semibold text-blue-700 mb-3">
              Employee Details
            </h2>

            <div className="space-y-2 text-sm text-gray-700">
              <p><b>Name:</b> {assetDetails.employeeName}</p>
              <p><b>Employee ID:</b> {assetDetails.employeeId}</p>
              <p><b>Email:</b> {assetDetails.email}</p>
              <p><b>Mobile:</b> {assetDetails.phone}</p>

              <p><b>Company:</b> {assetDetails.company}</p>
            </div>
          </div>

          {/* Asset Details */}
          <div className="border rounded-xl p-5 bg-green-50 shadow-sm">
            <h2 className="text-lg font-semibold text-green-700 mb-3">
              Asset Details
            </h2>

            <div className="space-y-2 text-sm text-gray-700">
              <p><b>Asset Tag:</b> {assetDetails.assetTag}</p>
              <p><b>Asset Type:</b> {assetDetails.assetType}</p>
              <p><b>Brand:</b> {assetDetails.brand}</p>
              <p><b>Model:</b> {assetDetails.model}</p>
              <p><b>Serial Number:</b> {assetDetails.serialNumber}</p>
            </div>
          </div>
        </div>

        {/* Policy Section */}
        <div className="mb-6">

          <div className="flex justify-between items-center mb-2">
            <h2 className="text-lg font-semibold text-gray-700">
              IT Asset Usage Policy
            </h2>

            {!policyRead && (
              <span className="text-xs text-red-500">
                Please scroll to the bottom to continue
              </span>
            )}
          </div>

          <div
            ref={policyRef}
            onScroll={handleScroll}
            className="border rounded-xl p-6 h-80 overflow-y-auto bg-gray-50 prose max-w-none"
            dangerouslySetInnerHTML={{ __html: policyHtml }}
          />

        </div>

        {/* Agreement */}
        <div className="flex items-start gap-3 mb-6">
          <input
            type="checkbox"
            disabled={!policyRead}
            checked={agreed}
            onChange={(e) => setAgreed(e.target.checked)}
            className="mt-1 h-4 w-4 text-blue-600"
          />

          <span className={`text-sm ${policyRead ? "text-gray-700" : "text-gray-400"}`}>
            I confirm that I have read and understood the IT Asset Usage Policy
            and agree to comply with the organization's rules.
            This digital acceptance is legally binding and equivalent to a
            physical signature.
          </span>
        </div>

        {/* OTP */}
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
            disabled={loading || !agreed}
            className={`w-full md:w-auto px-10 py-3 rounded-lg font-medium text-white transition ${
              loading || !agreed
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