import { forwardRef } from "react";

const SimAcknowledgementPDF = forwardRef(
  (
    {
      simData,
      employeeData,
      companyName = "Adishwar Auto Diagnostics Pvt Ltd",
    },
    ref
  ) => {
    const formatDate = (dateString) => {
      if (!dateString) return "_______________";
      const date = new Date(dateString);
      return date.toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      });
    };

    const generateDocNo = () => {
      const now = new Date();
      const year = now.getFullYear();
      const nextYear = (year + 1).toString().slice(-2);
      const currentYear = year.toString().slice(-2);
      return `CUG/${currentYear}-${nextYear}/${simData?.id || "XXX"}`;
    };

    return (
      <div
        ref={ref}
        className="bg-white p-8 max-w-[210mm] mx-auto"
        style={{ fontFamily: "Arial, sans-serif" }}
      >
        {/* Header */}
        {/* <div className="text-center mb-6">
          <h1 className="text-xl font-bold text-gray-800">{companyName}</h1>
        </div> */}

        {/* Header */}
        <div className="flex items-center gap-4 mb-6 border-b pb-4">
          <img
            src="/pwa-512x512.png"
            alt="Company Logo"
            className="w-16 h-16 object-contain"
          />
          <div>
            <h1 className="text-xl font-bold text-gray-800">{companyName}</h1>
            <p className="text-sm text-gray-500">
              CUG SIM Card Acknowledgement
            </p>
          </div>
        </div>

        {/* Employee Details Section */}
        <div className="mb-6 text-sm">
          <div className="grid grid-cols-2 gap-x-8 gap-y-2">
            <div className="flex">
              <span className="font-semibold w-36">Employee ID</span>
              <span>: {employeeData?.employeeId || "_______________"}</span>
            </div>
            <div className="flex">
              <span className="font-semibold w-36">Date</span>
              <span>: {formatDate(simData?.assignedAt)}</span>
            </div>
            <div className="flex">
              <span className="font-semibold w-36">Employee Name</span>
              <span>
                :{" "}
                {employeeData?.fullName ||
                  simData?.assignedUserName ||
                  "_______________"}
              </span>
            </div>
            <div className="flex">
              <span className="font-semibold w-36">Doc No</span>
              <span>: {generateDocNo()}</span>
            </div>
            <div className="flex">
              <span className="font-semibold w-36">Emp Designation</span>
              <span>: {employeeData?.designation || "_______________"}</span>
            </div>
            <div className="flex">
              <span className="font-semibold w-36">Location</span>
              <span>
                :{" "}
                {simData?.locationName ||
                  employeeData?.location ||
                  "_______________"}
              </span>
            </div>
          </div>
        </div>

        {/* Subject */}
        <div className="mb-6">
          <p className="font-bold text-sm">
            Subject: Acknowledgment of SIM Card
          </p>
        </div>

        {/* Body */}
        <div className="mb-6 text-sm leading-relaxed">
          <p className="mb-4">Dear Employee,</p>
          <p className="mb-4">
            We are writing to confirm that you have collected your assigned SIM
            card from the {companyName} on Date{" "}
            <span className="font-semibold">
              {formatDate(simData?.assignedAt)}
            </span>
            .
          </p>
        </div>

        {/* SIM Card Details Box */}
        <div className="border-2 border-gray-800 p-4 mb-6">
          <h3 className="font-bold text-center mb-4 text-sm">
            SIM Card Details
          </h3>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="flex">
              <span className="font-semibold w-32">ICCID/SIM NO</span>
              <span>: {simData?.iccid || "_______________"}</span>
            </div>
            <div className="flex">
              <span className="font-semibold w-32">CUG Number</span>
              <span>: {simData?.phoneNumber || "_______________"}</span>
            </div>
            <div className="flex">
              <span className="font-semibold w-32">Used For</span>
              <span>: Mobile</span>
            </div>
            <div className="flex">
              <span className="font-semibold w-32">SIM Network</span>
              <span>: {simData?.provider || "_______________"}</span>
            </div>
          </div>
        </div>

        {/* Terms and Conditions */}
        <div className="mb-6 text-sm leading-relaxed space-y-3">
          <p>
            Please ensure that you adhere to the company's communication and
            usage policies when using this SIM card.
          </p>
          <p>
            It is your responsibility to protect and secure this SIM card to
            prevent unauthorized usage or loss.
          </p>
          <p>
            Resigned employees must hand over their SIM cards to respective
            representatives/HR on their last working day; failure to submit the
            SIM card will result in the corresponding amount being deducted from
            your full and final settlement.
          </p>
          <p>
            In the event of any issues or questions related to the SIM card,
            connectivity, or associated services, please reach out to the
            respective HR SPOC.
          </p>
          <p className="mt-4">
            By signing below, you acknowledge the receipt of the aforementioned
            SIM card and agree to comply with the company's policies regarding
            its usage.
          </p>
        </div>

        {/* Signature Section */}
        <div className="mt-16 flex justify-between text-sm">
          <div className="text-center">
            <div className="border-t border-gray-800 w-48 pt-2">
              <p className="font-semibold">Employee Signature</p>
            </div>
          </div>
          <div className="text-center">
            <div className="border-t border-gray-800 w-48 pt-2">
              <p className="font-semibold">IT HOD Signature</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
);

SimAcknowledgementPDF.displayName = "SimAcknowledgementPDF";

export default SimAcknowledgementPDF;
