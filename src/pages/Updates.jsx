// import { Bell, Info, AlertTriangle, Star } from "lucide-react";
// import React from "react";

// // Optional icons library

// const updatesData = [
//   {
//     title: "🚀 Ticket Action Model",
//     description:
//       "To open the action model( where location, category, assignee, employee etc we are change or closing tickets) now we have one more way is that just double click one that ticket model will be open",
//     type: "New",
//     timestamp: "2025-07-10T12:00:00",
//   },
//   {
//     title: "🐞 Maximize the Chat section",
//     description:
//       "As every tickets have one chating section after clicking on there it is being open, that was seems small to read the texts so now one squire button is there on top just click there chating section will be spread in full window. ",
//     type: "Bug Fix",
//     timestamp: "2025-07-08T10:30:00",
//   },
//   {
//     title: "⚠️ Closing to Chat section",
//     description:
//       "To close the chat section we have one cross button as that was seems small so now we have big red button there only to close the ticket chat section. ",
//     type: "Downtime",
//     timestamp: "2025-07-06T18:00:00",
//   },
//   {
//     title: "🎨 UI Enhancements",
//     description: "Improved the ticket list layout and added quick filters.",
//     type: "Info",
//     timestamp: "2025-07-03T08:45:00",
//   },
// ];

// const badgeStyles = {
//   New: "bg-green-200 text-green-800",
//   "Bug Fix": "bg-yellow-100 text-yellow-800",
//   Downtime: "bg-red-100 text-red-700",
//   Info: "bg-blue-100 text-blue-700",
// };

// const iconMap = {
//   New: <Star className="w-4 h-4 mr-1" />,
//   "Bug Fix": <AlertTriangle className="w-4 h-4 mr-1" />,
//   Downtime: <Bell className="w-4 h-4 mr-1" />,
//   Info: <Info className="w-4 h-4 mr-1" />,
// };

// const Updates = () => {
//   return (
//     <div className="lg:ml-40 pt-16 mr-8">
//       <h1 className="text-3xl font-bold mb-8 text-center text-blue-800">
//         📢 Latest Updates Will Show Here
//       </h1>

//       <div className="grid md:grid-cols-2 gap-6">
//         {updatesData.map((update, index) => (
//           <div
//             key={index}
//             className="bg-white rounded-2xl p-5 shadow-md border hover:shadow-lg transition-all"
//           >
//             <div className="flex justify-between items-start">
//               <div>
//                 <div className="flex items-center text-lg font-semibold text-gray-800">
//                   {iconMap[update.type]} {update.title}
//                 </div>
//                 <p className="mt-2 text-gray-600">{update.description}</p>
//               </div>
//               <span
//                 className={`text-xs font-medium px-3 py-1 rounded-full ${
//                   badgeStyles[update.type]
//                 }`}
//               >
//                 {update.type}
//               </span>
//             </div>
//             <div className="mt-3 text-sm text-gray-400">
//               {new Date(update.timestamp).toLocaleString()}
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Updates;



import { Bell, Info, AlertTriangle, Star, Sparkles } from "lucide-react";
import React from "react";

const updatesData = [
  {
    title: "🚀 Ticket Action Model Enhancement",
    description:
      "The Ticket Action Model can now be opened by simply double-clicking on any ticket row. This provides faster access to modify location, category, assignee, employee details, or to close tickets.",
    type: "New",
    timestamp: "2025-07-10T12:00:00",
  },
  {
    title: "🖥️ Full-Screen Chat Expansion",
    description:
      "The ticket chat section can now be expanded to full screen using the maximize button located at the top-right corner of the chat window for better readability.",
    type: "Improvement",
    timestamp: "2025-07-12T09:30:00",
  },
  {
    title: "🔴 Improved Chat Close Button",
    description:
      "The chat section close button has been redesigned with a larger red button for improved visibility and easier access.",
    type: "Update",
    timestamp: "2025-07-08T10:30:00",
  },
  {
    title: "🎨 UI Enhancements",
    description:
      "Enhanced the ticket list layout with improved spacing, better readability, and quick filter options for smoother navigation.",
    type: "Info",
    timestamp: "2025-07-03T08:45:00",
  },
  {
    title: "✨ Ticket Resolution Policy Update",
    description:
      "Tickets will now be marked as RESOLVED instead of directly CLOSED. Users may reopen tickets within 3 days by opening the resolved ticket, navigating to the Chat section, and clicking the 'Reopen' button at the top.",
    type: "Announcement",
    timestamp: "2025-07-15T11:00:00",
  },
];

const badgeStyles = {
  New: "bg-green-100 text-green-700",
  Improvement: "bg-indigo-100 text-indigo-700",
  Update: "bg-yellow-100 text-yellow-800",
  Info: "bg-blue-100 text-blue-700",
  Announcement: "bg-purple-100 text-purple-700",
};

const iconMap = {
  New: <Star className="w-4 h-4 mr-1" />,
  Improvement: <Sparkles className="w-4 h-4 mr-1" />,
  Update: <AlertTriangle className="w-4 h-4 mr-1" />,
  Info: <Info className="w-4 h-4 mr-1" />,
  Announcement: <Bell className="w-4 h-4 mr-1" />,
};

const Updates = () => {
  return (
    <div className="lg:ml-48 bg-gray-50 min-h-screen">
      
      {/* Page Header */}
      <div className="bg-gradient-to-r from-blue-700 to-indigo-700 text-white py-10 px-6 shadow-md">
        <h1 className="text-4xl font-bold text-center tracking-wide">
          📢 System Updates & Announcements
        </h1>
        <p className="text-center mt-2 text-blue-100 text-sm">
          Stay informed about the latest improvements and changes
        </p>
      </div>

      {/* Updates Section */}
      <div className="p-8 grid md:grid-cols-2 gap-8">
        {updatesData.map((update, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl p-6 shadow-md border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
          >
            <div className="flex justify-between items-start">
              <div>
                <div className="flex items-center text-lg font-semibold text-gray-800">
                  {iconMap[update.type]} {update.title}
                </div>

                <p className="mt-3 text-gray-600 leading-relaxed text-sm">
                  {update.description}
                </p>
              </div>

              <span
                className={`text-xs font-semibold px-3 py-1 rounded-full flex items-center ${badgeStyles[update.type]}`}
              >
                {update.type}
              </span>
            </div>

            <div className="mt-5 text-xs text-gray-400 border-t pt-3">
              {new Date(update.timestamp).toLocaleString()}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Updates;