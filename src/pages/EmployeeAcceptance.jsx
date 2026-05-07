// src/pages/EmployeeAcceptance.jsx
import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { employeeItemApi } from '../services/api';

const EmployeeAcceptance = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [details, setDetails] = useState(null);
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [agreedToPolicy, setAgreedToPolicy] = useState(false);
  const [policyRead, setPolicyRead] = useState(false);
  const policyContentRef = useRef(null);
  
  // Dress customization state
  const [dressCustomizations, setDressCustomizations] = useState([]);

  useEffect(() => {
    fetchDetails();
  }, [token]);

  const fetchDetails = async () => {
    const result = await employeeItemApi.getAcceptanceDetails(token);
    
    if (result.success) {
      // console.log('Fetched details:', result.data);
      setDetails(result.data.data);
      
      // Initialize dress customizations if it's a dress item
      if (result.data.itemType?.toLowerCase().includes('dress') && result.data.dressItems && Object.keys(result.data.dressItems).length > 0) {
        const initialCustomizations = Object.entries(result.data.dressItems).map(([name, quantity], index) => ({
          id: Date.now() + index,
          name: name,
          quantity: quantity,
          selectedSize: '',
          selectedColor: '',
          notes: ''
        }));
        setDressCustomizations(initialCustomizations);
      }
    } else {
      setError(result.message || 'This acceptance link is invalid or has expired. Please contact HR.');
    }
    setLoading(false);
  };

  const handleDressCustomizationChange = (id, field, value) => {
    setDressCustomizations(prev => 
      prev.map(item => item.id === id ? { ...item, [field]: value } : item)
    );
  };

  const handlePolicyScroll = () => {
    if (policyContentRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = policyContentRef.current;
      const isAtBottom = scrollTop + clientHeight >= scrollHeight - 10;
      if (isAtBottom && !policyRead) {
        setPolicyRead(true);
      }
    }
  };

  const handleAccept = async () => {
    // Validate policy agreement
    if (!policyRead) {
      setError('Please scroll to the end and read the complete policy');
      return;
    }
    
    if (!agreedToPolicy) {
      setError('Please agree to the policy before accepting');
      return;
    }

    // Validate based on item type
    if (details?.itemType?.toLowerCase().includes('dress')) {
      const missingSizes = dressCustomizations.filter(item => !item.selectedSize);
      if (missingSizes.length > 0) {
        setError(`Please select sizes for: ${missingSizes.map(i => i.name).join(', ')}`);
        return;
      }
    } else if (!otp) {
      setError('Please enter the OTP');
      return;
    }

    setSubmitting(true);
    setError('');

    let result;
    if (details?.itemType?.toLowerCase().includes('dress')) {
      const customizations = dressCustomizations.map(item => ({
        name: item.name,
        quantity: item.quantity,
        size: item.selectedSize,
        color: item.selectedColor,
        notes: item.notes
      }));
      result = await employeeItemApi.acceptDressWithCustomizations(token, customizations);
    } else {
      result = await employeeItemApi.acceptItem(token, otp);
    }

    if (result.success) {
      setSuccess(true);
      setTimeout(() => {
        navigate('/employee/dashboard');
      }, 3000);
    } else {
      setError(result.message || 'Acceptance failed. Please try again.');
    }
    setSubmitting(false);
  };

  const handleResendOtp = async () => {
    const result = await employeeItemApi.resendOtp(token);
    if (result.success) {
      setError('');
      alert('OTP resent successfully to your email and mobile');
    } else {
      setError(result.message || 'Failed to resend OTP');
    }
  };

  // Policy content based on item type
  const getPolicyContent = () => {
    const itemType = details?.itemType?.toLowerCase() || '';
    
    if (itemType.includes('id card')) {
      return {
        title: 'ID Card Policy Agreement',
        items: [
          'I understand that the ID card is the property of the company and must be returned upon resignation or termination.',
          'I agree to wear the ID card visibly at all times within company premises.',
          'I will report lost or damaged ID cards immediately to HR.',
          'I understand that a replacement fee may be charged for lost or damaged ID cards.',
          'I will not share my ID card with unauthorized individuals.',
          'I understand that my ID card grants access only to authorized areas as per my role.',
          'I acknowledge that any misuse of my ID card will result in disciplinary action.'
        ]
      };
    } else if (itemType.includes('appointment letter')) {
      return {
        title: 'Appointment Letter Policy Agreement',
        items: [
          'I acknowledge that this appointment letter is a confidential document.',
          'I agree to the terms and conditions outlined in the letter.',
          'I will sign and return a copy to HR within 7 days.',
          'I understand that this appointment letter serves as proof of employment.',
          'I will report any discrepancies to HR immediately.',
          'I will keep this document in a safe and secure location.',
          'I understand that loss of this document should be reported to HR for re-issuance (charges may apply).'
        ]
      };
    } else if (itemType.includes('dress') || itemType.includes('uniform')) {
      return {
        title: 'Dress/Uniform Policy Agreement',
        items: [
          'I understand that the uniform/dress is the property of the company and must be returned upon resignation.',
          'I agree to wear the uniform during working hours and official events.',
          'I will keep the uniform clean and in good condition.',
          'I will report any damage or loss immediately to HR.',
          'I understand that unauthorized alterations to the uniform are not permitted.',
          'I am responsible for the maintenance of my assigned uniform.',
          'I understand that replacement uniform may be provided after 12 months of service.',
          'I will provide accurate size and customization details for my uniform.'
        ]
      };
    }
    
    return {
      title: 'Acceptance Policy Agreement',
      items: [
        'I confirm that the information provided is accurate.',
        'I agree to comply with company policies regarding this item.',
        'I am responsible for the safe keeping of this item.',
        'I will report any loss or damage immediately.',
        'I will return this item upon request or termination of employment.'
      ]
    };
  };

  const policy = getPolicyContent();
  const isDressItem = details?.itemType?.toLowerCase().includes('dress');

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading acceptance details...</p>
        </div>
      </div>
    );
  }

  if (error && !details) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
          <div className="text-red-600 text-7xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Link Expired</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={() => navigate('/')}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Go to Home
          </button>
        </div>
      </div>
    );
  }

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Successfully Accepted!</h2>
          <p className="text-gray-600 mb-4">
            You have successfully accepted the {details?.itemType}. Redirecting to dashboard...
          </p>
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header Card */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-6">
          <div className="px-6 py-4 bg-gradient-to-r from-blue-600 to-purple-600">
            <h1 className="text-2xl font-bold text-white">
              Accept {details?.itemType}
            </h1>
            <p className="text-blue-100 text-sm mt-1">Please review the details and policy before accepting</p>
          </div>
        </div>

        {/* User Details Card */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-6">
          <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-800">Item Details</h2>
          </div>
          <div className="px-6 py-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="text-xs text-gray-500 uppercase font-semibold">Employee Name</label>
                  <p className="text-gray-900 font-medium text-lg">{details?.userName}</p>
                </div>
                <div>
                  <label className="text-xs text-gray-500 uppercase font-semibold">Employee ID</label>
                  <p className="text-gray-900 font-medium">{details?.employeeId}</p>
                </div>
                <div>
                  <label className="text-xs text-gray-500 uppercase font-semibold">Email</label>
                  <p className="text-gray-900">{details?.email}</p>
                </div>
                <div>
                  <label className="text-xs text-gray-500 uppercase font-semibold">Phone Number</label>
                  <p className="text-gray-900">{details?.phoneNumber}</p>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="text-xs text-gray-500 uppercase font-semibold">Item Type</label>
                  <p className="inline-block px-3 py-1 text-sm rounded-full bg-blue-100 text-blue-700 mt-1">
                    {details?.itemType}
                  </p>
                </div>
                <div>
                  <label className="text-xs text-gray-500 uppercase font-semibold">Issued Date</label>
                  <p className="text-gray-900">
                    {details?.issuedDate ? new Date(details.issuedDate).toLocaleString() : '-'}
                  </p>
                </div>
                <div>
                  <label className="text-xs text-gray-500 uppercase font-semibold">Issued By</label>
                  <p className="text-gray-900">{details?.issuedBy || '-'}</p>
                </div>
                {details?.notes && (
                  <div>
                    <label className="text-xs text-gray-500 uppercase font-semibold">Notes</label>
                    <p className="text-gray-700 bg-gray-50 p-2 rounded-lg mt-1">{details.notes}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Policy Section - Below User Details */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-6">
          <div className="px-6 py-4 bg-gradient-to-r from-gray-700 to-gray-900">
            <h3 className="text-lg font-semibold text-white">{policy.title}</h3>
            <p className="text-gray-300 text-sm mt-1">Please read the complete policy carefully and scroll to the end</p>
          </div>
          
          <div className="px-6 py-4">
            {/* Scrollable Policy Content */}
            <div 
              ref={policyContentRef}
              className="border border-gray-200 rounded-lg p-4 h-64 overflow-y-auto mb-4 bg-gray-50"
              onScroll={handlePolicyScroll}
            >
              <div className="space-y-3">
                {policy.items.map((item, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center mt-0.5">
                      <span className="text-blue-600 text-xs font-bold">{index + 1}</span>
                    </div>
                    <p className="text-gray-700 text-sm">{item}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Policy Agreement Checkboxes */}
            <div className="space-y-3 pt-2">
              <label className={`flex items-center gap-3 cursor-pointer ${!policyRead ? 'opacity-50' : ''}`}>
                <input
                  type="checkbox"
                  checked={policyRead}
                  onChange={() => {}}
                  disabled={!policyRead}
                  className="w-4 h-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <span className="text-sm text-gray-700">
                  I confirm that I have read and understood all the above policies.
                  {!policyRead && <span className="text-xs text-gray-400 ml-2">(Please scroll to the end of policy)</span>}
                </span>
              </label>
              
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={agreedToPolicy}
                  onChange={(e) => setAgreedToPolicy(e.target.checked)}
                  disabled={!policyRead}
                  className="w-4 h-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded disabled:opacity-50"
                />
                <span className="text-sm text-gray-700">
                  I agree to comply with all the terms and conditions mentioned above.
                </span>
              </label>
            </div>
          </div>
        </div>

        {/* Dress Customization Section (Only for Dress Items) */}
        {isDressItem && dressCustomizations.length > 0 && (
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-6">
            <div className="px-6 py-4 bg-gradient-to-r from-purple-600 to-pink-600">
              <h3 className="text-lg font-semibold text-white">Dress Customization</h3>
              <p className="text-purple-100 text-sm mt-1">Please select your sizes and preferences</p>
            </div>
            
            <div className="px-6 py-6">
              <div className="space-y-4">
                {dressCustomizations.map((item) => (
                  <div key={item.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="mb-3">
                      <label className="block text-sm font-medium text-gray-700">
                        {item.name} (Quantity: {item.quantity})
                      </label>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Select Size *
                        </label>
                        <select
                          value={item.selectedSize}
                          onChange={(e) => handleDressCustomizationChange(item.id, 'selectedSize', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          <option value="">Select Size</option>
                          <option value="XS">XS (Extra Small)</option>
                          <option value="S">S (Small)</option>
                          <option value="M">M (Medium)</option>
                          <option value="L">L (Large)</option>
                          <option value="XL">XL (Extra Large)</option>
                          <option value="XXL">XXL (Double Extra Large)</option>
                          <option value="XXXL">XXXL (Triple Extra Large)</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Preferred Color (Optional)
                        </label>
                        <select
                          value={item.selectedColor}
                          onChange={(e) => handleDressCustomizationChange(item.id, 'selectedColor', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          <option value="">Select Color</option>
                          <option value="White">White</option>
                          <option value="Black">Black</option>
                          <option value="Blue">Blue</option>
                          <option value="Navy Blue">Navy Blue</option>
                          <option value="Grey">Grey</option>
                          <option value="Brown">Brown</option>
                          <option value="Beige">Beige</option>
                        </select>
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Additional Notes (Optional)
                        </label>
                        <input
                          type="text"
                          value={item.notes}
                          onChange={(e) => handleDressCustomizationChange(item.id, 'notes', e.target.value)}
                          placeholder="Any special requirements (e.g., extra length, loose fit, etc.)"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* OTP Verification Section (Only for Non-Dress Items) */}
        {!isDressItem && (
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-6">
            <div className="px-6 py-4 bg-gradient-to-r from-blue-600 to-cyan-600">
              <h3 className="text-lg font-semibold text-white">OTP Verification</h3>
            </div>
            <div className="px-6 py-6">
              <p className="text-sm text-gray-600 mb-4">
                An OTP has been sent to your registered email and mobile number. 
                Please enter it below to accept this item.
              </p>
              
              <input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="Enter 6-digit OTP"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4 text-center text-lg tracking-wider"
                disabled={submitting}
                autoFocus
              />
              
              <div className="flex justify-end">
                <button
                  onClick={handleResendOtp}
                  disabled={submitting}
                  className="text-blue-600 hover:text-blue-800 text-sm transition-colors"
                >
                  Resend OTP
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl">
            <div className="flex items-start gap-2">
              <svg className="w-5 h-5 text-red-600 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-sm text-red-600">{error}</p>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex justify-end gap-3">
          <button
            onClick={() => navigate('/')}
            className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleAccept}
            disabled={submitting || !policyRead || !agreedToPolicy || (!isDressItem && !otp) || (isDressItem && dressCustomizations.some(item => !item.selectedSize))}
            className="px-8 py-2 bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-lg hover:from-green-700 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center gap-2 font-semibold"
          >
            {submitting ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                Processing...
              </>
            ) : (
              'Accept & Confirm'
            )}
          </button>
        </div>

        {/* Status Indicator */}
        <div className="mt-6 text-center">
          <div className="inline-flex items-center gap-2 text-xs text-gray-400">
            <div className="flex items-center gap-1">
              <div className={`w-2 h-2 rounded-full ${policyRead ? 'bg-green-500' : 'bg-gray-300'}`} />
              <span>Policy Read</span>
            </div>
            <span>→</span>
            <div className="flex items-center gap-1">
              <div className={`w-2 h-2 rounded-full ${agreedToPolicy ? 'bg-green-500' : 'bg-gray-300'}`} />
              <span>Policy Agreed</span>
            </div>
            <span>→</span>
            <div className="flex items-center gap-1">
              <div className={`w-2 h-2 rounded-full ${isDressItem ? (dressCustomizations.every(item => item.selectedSize) ? 'bg-green-500' : 'bg-gray-300') : (otp ? 'bg-green-500' : 'bg-gray-300')}`} />
              <span>Details Provided</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeAcceptance;