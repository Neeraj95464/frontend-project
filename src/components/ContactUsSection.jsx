import { useState } from "react";

export default function ContactITSupport() {
  return (
    <section className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-12">
      <div className="max-w-2xl w-full bg-white shadow-md rounded-xl p-8 text-center">
        <h2 className="text-3xl font-bold text-blue-600 mb-4">Need IT Help?</h2>

        <p className="text-gray-600 text-base">
          For any technical issues, access requests, or IT-related inquiries,
          please raise a support ticket through our internal helpdesk.
          <br />
          <span className="block mt-4 text-blue-700 font-medium underline underline-offset-4">
            📧 support@mahavirgroup.co
          </span>
        </p>

        <div className="mt-6">
          <p className="text-sm text-gray-500">
            Our IT Support Team responds Monday–Saturday
          </p>
        </div>

        <div className="mt-8">
          <a
            href="/ticket"
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-md shadow hover:bg-blue-700 transition"
          >
            Raise a Ticket
          </a>
        </div>
      </div>
    </section>
  );
}
