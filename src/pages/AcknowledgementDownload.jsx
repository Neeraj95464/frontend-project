// // src/components/AcknowledgementDownload.jsx
// import React, { useState } from 'react';
// import { 
//   generateAcknowledgement, 
//   downloadAcknowledgement,
//   verifyAssignment 
// } from '../services/api';

// const AcknowledgementDownload = () => {
//   const [activeTab, setActiveTab] = useState('asset');
//   const [formData, setFormData] = useState({
//     assetTag: '',
//     simCardNumber: '',
//     userId: ''
//   });
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');
//   const [success, setSuccess] = useState('');
//   const [verificationData, setVerificationData] = useState({
//     token: '',
//     showVerification: false
//   });

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));
//     setError('');
//     setSuccess('');
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError('');
//     setSuccess('');

//     try {
//       let requestData = {};
      
//       switch (activeTab) {
//         case 'asset':
//           if (!formData.assetTag.trim()) {
//             throw new Error('Please enter Asset Tag');
//           }
//           requestData = {
//             requestType: 'ASSET',
//             assetTag: formData.assetTag.trim()
//           };
//           break;
          
//         case 'sim':
//           if (!formData.simCardNumber.trim()) {
//             throw new Error('Please enter SIM Card Number');
//           }
//           requestData = {
//             requestType: 'SIM',
//             simCardNumber: formData.simCardNumber.trim()
//           };
//           break;
          
//         // case 'user':
//         //   if (!formData.userId.trim()) {
//         //     throw new Error('Please enter User ID');
//         //   }
//         //   requestData = {
//         //     requestType: 'USER',
//         //     userId: parseInt(formData.userId.trim())
//         //   };
//         //   break;
        
//         case 'user':
//   if (!formData.userId.trim()) {
//     throw new Error('Please enter User ID');
//   }
//   requestData = {
//     requestType: 'USER',
//     userId: formData.userId.trim()  // Send as string, not parsed to integer
//   };
//   break;

//         default:
//           throw new Error('Invalid request type');
//       }

//       const result = await generateAcknowledgement(requestData);
      
//       if (result.success) {
//         setSuccess('Acknowledgement generated successfully! Downloading...');
//         // Download the PDF
//         await downloadAcknowledgement(result.data.fileName);
//         setSuccess('Download started! Check your downloads folder.');
//         // Reset form
//         if (activeTab === 'asset') setFormData(prev => ({ ...prev, assetTag: '' }));
//         if (activeTab === 'sim') setFormData(prev => ({ ...prev, simCardNumber: '' }));
//         if (activeTab === 'user') setFormData(prev => ({ ...prev, userId: '' }));
//       } else {
//         throw new Error(result.message || 'Failed to generate acknowledgement');
//       }
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleVerification = async (e) => {
//     e.preventDefault();
//     if (!verificationData.token.trim()) {
//       setError('Please enter verification token');
//       return;
//     }
    
//     setLoading(true);
//     setError('');
//     setSuccess('');
    
//     try {
//       // Get client IP (you might want to get this from your backend)
//       const result = await verifyAssignment(verificationData.token.trim());
      
//       if (result.success) {
//         setSuccess('Assignment verified successfully!');
//         setVerificationData(prev => ({ ...prev, token: '', showVerification: false }));
//       } else {
//         throw new Error(result.message || 'Verification failed');
//       }
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const tabs = [
//     { id: 'asset', label: 'Asset Tag', icon: '📱' },
//     { id: 'sim', label: 'SIM Card', icon: '📞' },
//     { id: 'user', label: 'User ID', icon: '👤' }
//   ];

//   return (
//     // <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      
//     <div className="lg:ml-48 bg-gray-50 min-h-screen">
//       <div className="max-w-4xl mx-auto">
//         {/* Header */}
//         <div className="text-center mb-10">
//           <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 mb-4">
//             <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
//             </svg>
//           </div>
//           <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
//             Download <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Acknowledgement</span>
//           </h1>
//           <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
//             Get your asset or SIM card assignment acknowledgement instantly
//           </p>
//         </div>

//         {/* Main Card */}
//         <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
//           {/* Tab Navigation */}
//           <div className="border-b border-gray-200">
//             <nav className="flex -mb-px">
//               {tabs.map((tab) => (
//                 <button
//                   key={tab.id}
//                   onClick={() => {
//                     setActiveTab(tab.id);
//                     setError('');
//                     setSuccess('');
//                   }}
//                   className={`
//                     flex-1 py-4 px-1 text-center border-b-2 font-medium text-sm sm:text-base
//                     transition-all duration-200 ease-in-out
//                     ${activeTab === tab.id
//                       ? 'border-blue-500 text-blue-600 bg-blue-50'
//                       : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
//                     }
//                   `}
//                 >
//                   <span className="mr-2">{tab.icon}</span>
//                   {tab.label}
//                 </button>
//               ))}
//             </nav>
//           </div>

//           {/* Form Content */}
//           <div className="p-6 sm:p-8">
//             {/* Success Message */}
//             {success && (
//               <div className="mb-6 p-4 rounded-lg bg-green-50 border border-green-200">
//                 <div className="flex items-center">
//                   <svg className="w-5 h-5 text-green-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
//                     <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
//                   </svg>
//                   <span className="text-green-800">{success}</span>
//                 </div>
//               </div>
//             )}

//             {/* Error Message */}
//             {error && (
//               <div className="mb-6 p-4 rounded-lg bg-red-50 border border-red-200">
//                 <div className="flex items-center">
//                   <svg className="w-5 h-5 text-red-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
//                     <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
//                   </svg>
//                   <span className="text-red-800">{error}</span>
//                 </div>
//               </div>
//             )}

//             <form onSubmit={handleSubmit}>
//               {activeTab === 'asset' && (
//                 <div className="space-y-6">
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Asset Tag
//                     </label>
//                     <input
//                       type="text"
//                       name="assetTag"
//                       value={formData.assetTag}
//                       onChange={handleInputChange}
//                       placeholder="Enter asset tag (e.g., MGIT001234)"
//                       className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                       disabled={loading}
//                     />
//                     <p className="mt-2 text-sm text-gray-500">
//                       Enter the unique asset tag assigned to your device
//                     </p>
//                   </div>
//                 </div>
//               )}

//               {activeTab === 'sim' && (
//                 <div className="space-y-6">
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       SIM Card Number
//                     </label>
//                     <input
//                       type="text"
//                       name="simCardNumber"
//                       value={formData.simCardNumber}
//                       onChange={handleInputChange}
//                       placeholder="Enter phone number or ICCID"
//                       className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                       disabled={loading}
//                     />
//                     <p className="mt-2 text-sm text-gray-500">
//                       Enter the phone number or ICCID of your SIM card
//                     </p>
//                   </div>
//                 </div>
//               )}

//               {activeTab === 'user' && (
//                 <div className="space-y-6">
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       User ID
//                     </label>
//                     <input
//                       type="text"
//                       name="userId"
//                       value={formData.userId}
//                       onChange={handleInputChange}
//                       placeholder="Enter your user ID"
//                       className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//                       disabled={loading}
//                     />
//                     <p className="mt-2 text-sm text-gray-500">
//                       Enter your user ID to download all pending assignments
//                     </p>
//                   </div>
//                 </div>
//               )}

//               <button
//                 type="submit"
//                 disabled={loading}
//                 className={`
//                   w-full mt-8 py-3 px-4 rounded-lg text-white font-semibold
//                   transition-all duration-200 transform
//                   ${loading 
//                     ? 'bg-gray-400 cursor-not-allowed' 
//                     : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 hover:shadow-lg hover:scale-[1.02]'
//                   }
//                 `}
//               >
//                 {loading ? (
//                   <span className="flex items-center justify-center">
//                     <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                       <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                       <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                     </svg>
//                     Generating PDF...
//                   </span>
//                 ) : (
//                   'Download Acknowledgement'
//                 )}
//               </button>
//             </form>

//             {/* Divider */}
//             <div className="relative my-8">
//               <div className="absolute inset-0 flex items-center">
//                 <div className="w-full border-t border-gray-300"></div>
//               </div>
//               <div className="relative flex justify-center text-sm">
//                 <span className="px-2 bg-white text-gray-500">Or</span>
//               </div>
//             </div>

//             {/* Verification Section */}
//             <div>
//               <button
//                 onClick={() => setVerificationData(prev => ({ ...prev, showVerification: !prev.showVerification }))}
//                 className="w-full text-center text-blue-600 hover:text-blue-700 font-medium"
//               >
//                 {verificationData.showVerification ? 'Hide' : 'Verify Existing Assignment'}
//               </button>

//               {verificationData.showVerification && (
//                 <form onSubmit={handleVerification} className="mt-4 space-y-4">
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Verification Token
//                     </label>
//                     <input
//                       type="text"
//                       value={verificationData.token}
//                       onChange={(e) => setVerificationData(prev => ({ ...prev, token: e.target.value }))}
//                       placeholder="Enter verification token from PDF"
//                       className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
//                       disabled={loading}
//                     />
//                   </div>
//                   <button
//                     type="submit"
//                     disabled={loading}
//                     className="w-full py-3 px-4 rounded-lg bg-green-600 text-white font-semibold hover:bg-green-700 transition-all"
//                   >
//                     {loading ? 'Verifying...' : 'Verify Assignment'}
//                   </button>
//                 </form>
//               )}
//             </div>
//           </div>
//         </div>

//         {/* Info Cards */}
//         <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-3">
//           <div className="bg-white overflow-hidden shadow rounded-lg">
//             <div className="p-5">
//               <div className="flex items-center">
//                 <div className="flex-shrink-0">
//                   <svg className="h-6 w-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
//                   </svg>
//                 </div>
//                 <div className="ml-3">
//                   <h3 className="text-lg font-medium text-gray-900">Quick Download</h3>
//                   <p className="mt-1 text-sm text-gray-500">Instant PDF generation</p>
//                 </div>
//               </div>
//             </div>
//           </div>

//           <div className="bg-white overflow-hidden shadow rounded-lg">
//             <div className="p-5">
//               <div className="flex items-center">
//                 <div className="flex-shrink-0">
//                   <svg className="h-6 w-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
//                   </svg>
//                 </div>
//                 <div className="ml-3">
//                   <h3 className="text-lg font-medium text-gray-900">Secure</h3>
//                   <p className="mt-1 text-sm text-gray-500">OTP verified assignments</p>
//                 </div>
//               </div>
//             </div>
//           </div>

//           <div className="bg-white overflow-hidden shadow rounded-lg">
//             <div className="p-5">
//               <div className="flex items-center">
//                 <div className="flex-shrink-0">
//                   <svg className="h-6 w-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
//                   </svg>
//                 </div>
//                 <div className="ml-3">
//                   <h3 className="text-lg font-medium text-gray-900">Legal Document</h3>
//                   <p className="mt-1 text-sm text-gray-500">Official acknowledgement</p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AcknowledgementDownload;


// src/components/AcknowledgementDownload.jsx
import React, { useState } from 'react';
import { 
  generateAcknowledgement, 
  downloadAcknowledgement,
  verifyAssignment 
} from '../services/api';

const AcknowledgementDownload = () => {
  const [activeTab, setActiveTab] = useState('asset');
  const [formData, setFormData] = useState({
    assetTag: '',
    simCardNumber: '',
    userId: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [verificationData, setVerificationData] = useState({
    token: '',
    showVerification: false
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setError('');
    setSuccess('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      let requestData = {};
      
      switch (activeTab) {
        case 'asset':
          if (!formData.assetTag.trim()) {
            throw new Error('Please enter Asset Tag');
          }
          requestData = {
            requestType: 'ASSET',
            assetTag: formData.assetTag.trim()
          };
          break;
          
        case 'sim':
          if (!formData.simCardNumber.trim()) {
            throw new Error('Please enter SIM Card Number');
          }
          requestData = {
            requestType: 'SIM',
            simCardNumber: formData.simCardNumber.trim()
          };
          break;
          
        case 'user':
          if (!formData.userId.trim()) {
            throw new Error('Please enter Employee ID');
          }
          requestData = {
            requestType: 'USER',
            userId: formData.userId.trim()  // Send as string, not parsed to integer
          };
          break;
          
        default:
          throw new Error('Invalid request type');
      }

      const result = await generateAcknowledgement(requestData);
      
      if (result.success) {
        setSuccess('Acknowledgement generated successfully for VERIFIED assignment! Downloading...');
        // Download the PDF
        await downloadAcknowledgement(result.data.fileName);
        setSuccess('Download started! Check your downloads folder.');
        // Reset form
        if (activeTab === 'asset') setFormData(prev => ({ ...prev, assetTag: '' }));
        if (activeTab === 'sim') setFormData(prev => ({ ...prev, simCardNumber: '' }));
        if (activeTab === 'user') setFormData(prev => ({ ...prev, userId: '' }));
      } else {
        throw new Error(result.message || 'Failed to generate acknowledgement');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleVerification = async (e) => {
    e.preventDefault();
    if (!verificationData.token.trim()) {
      setError('Please enter verification token');
      return;
    }
    
    setLoading(true);
    setError('');
    setSuccess('');
    
    try {
      const result = await verifyAssignment(verificationData.token.trim());
      
      if (result.success) {
        setSuccess('Assignment verified successfully!');
        setVerificationData(prev => ({ ...prev, token: '', showVerification: false }));
      } else {
        throw new Error(result.message || 'Verification failed');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const tabs = [
    { id: 'asset', label: 'Asset Tag', icon: '📱' },
    { id: 'sim', label: 'SIM Card', icon: '📞' },
    { id: 'user', label: 'Employee ID', icon: '👤' }
  ];

  return (
    <div className="lg:ml-48 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 mb-4">
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
            Download <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Acknowledgement</span>
          </h1>
          <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            Get your verified asset or SIM card assignment acknowledgement instantly
          </p>
          <div className="mt-2 inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
            <span className="mr-1">✓</span> Only Verified Assignments
          </div>
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Tab Navigation */}
          <div className="border-b border-gray-200">
            <nav className="flex -mb-px">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id);
                    setError('');
                    setSuccess('');
                  }}
                  className={`
                    flex-1 py-4 px-1 text-center border-b-2 font-medium text-sm sm:text-base
                    transition-all duration-200 ease-in-out
                    ${activeTab === tab.id
                      ? 'border-blue-500 text-blue-600 bg-blue-50'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }
                  `}
                >
                  <span className="mr-2">{tab.icon}</span>
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          {/* Form Content */}
          <div className="p-6 sm:p-8">
            {/* Info Banner */}
            <div className="mb-6 p-3 rounded-lg bg-blue-50 border border-blue-200">
              <div className="flex items-center text-sm text-blue-800">
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
                <span>Only <strong>verified/accepted assignments</strong> can be downloaded as acknowledgement. Pending assignments need to be verified first.</span>
              </div>
            </div>

            {/* Success Message */}
            {success && (
              <div className="mb-6 p-4 rounded-lg bg-green-50 border border-green-200">
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-green-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-green-800">{success}</span>
                </div>
              </div>
            )}

            {/* Error Message */}
            {error && (
              <div className="mb-6 p-4 rounded-lg bg-red-50 border border-red-200">
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-red-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                  <span className="text-red-800">{error}</span>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit}>
              {activeTab === 'asset' && (
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Asset Tag
                    </label>
                    <input
                      type="text"
                      name="assetTag"
                      value={formData.assetTag}
                      onChange={handleInputChange}
                      placeholder="Enter asset tag (e.g., MGIT001234)"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      disabled={loading}
                    />
                    <p className="mt-2 text-sm text-gray-500">
                      Enter the unique asset tag assigned to your device (Only verified assignments)
                    </p>
                  </div>
                </div>
              )}

              {activeTab === 'sim' && (
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      SIM Card Number
                    </label>
                    <input
                      type="text"
                      name="simCardNumber"
                      value={formData.simCardNumber}
                      onChange={handleInputChange}
                      placeholder="Enter phone number or ICCID"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      disabled={loading}
                    />
                    <p className="mt-2 text-sm text-gray-500">
                      Enter the phone number or ICCID of your SIM card (Only verified assignments)
                    </p>
                  </div>
                </div>
              )}

              {activeTab === 'user' && (
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Employee ID
                    </label>
                    <input
                      type="text"
                      name="userId"
                      value={formData.userId}
                      onChange={handleInputChange}
                      placeholder="Enter your Employee ID (e.g., EMP001 or 12345)"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      disabled={loading}
                    />
                    <p className="mt-2 text-sm text-gray-500">
                      Enter your employee ID to download all verified assignments
                    </p>
                  </div>
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className={`
                  w-full mt-8 py-3 px-4 rounded-lg text-white font-semibold
                  transition-all duration-200 transform
                  ${loading 
                    ? 'bg-gray-400 cursor-not-allowed' 
                    : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 hover:shadow-lg hover:scale-[1.02]'
                  }
                `}
              >
                {loading ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Generating PDF...
                  </span>
                ) : (
                  'Download Verified Assignment Acknowledgement'
                )}
              </button>
            </form>

            {/* Divider */}
            <div className="relative my-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Or</span>
              </div>
            </div>

            {/* Verification Section */}
            <div>
              <button
                onClick={() => setVerificationData(prev => ({ ...prev, showVerification: !prev.showVerification }))}
                className="w-full text-center text-blue-600 hover:text-blue-700 font-medium"
              >
                {verificationData.showVerification ? 'Hide' : 'Verify Pending Assignment'}
              </button>

              {verificationData.showVerification && (
                <form onSubmit={handleVerification} className="mt-4 space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Verification Token
                    </label>
                    <input
                      type="text"
                      value={verificationData.token}
                      onChange={(e) => setVerificationData(prev => ({ ...prev, token: e.target.value }))}
                      placeholder="Enter verification token from email/SMS"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                      disabled={loading}
                    />
                    <p className="mt-2 text-sm text-gray-500">
                      Enter the verification token received via email or SMS to verify your pending assignment
                    </p>
                  </div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3 px-4 rounded-lg bg-green-600 text-white font-semibold hover:bg-green-700 transition-all"
                  >
                    {loading ? 'Verifying...' : 'Verify & Accept Assignment'}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Info Cards */}
        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-3">
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <svg className="h-6 w-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="text-lg font-medium text-gray-900">Verified Only</h3>
                  <p className="mt-1 text-sm text-gray-500">Download only accepted assignments</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <svg className="h-6 w-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="text-lg font-medium text-gray-900">Quick Download</h3>
                  <p className="mt-1 text-sm text-gray-500">Instant PDF generation</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <svg className="h-6 w-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="text-lg font-medium text-gray-900">Legal Document</h3>
                  <p className="mt-1 text-sm text-gray-500">Official acknowledgement</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AcknowledgementDownload;