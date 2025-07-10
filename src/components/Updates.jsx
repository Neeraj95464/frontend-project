import { Bell, Info, AlertTriangle, Star } from "lucide-react";
import React from "react";

// Optional icons library

const updatesData = [
  {
    title: "🚀 Ticket Action Model",
    description:
      "To open the action model( where location, category, assignee, employee etc we are change or closing tickets) now we have one more way is that just double click one that ticket model will be open",
    type: "New",
    timestamp: "2025-07-10T12:00:00",
  },
  {
    title: "🐞 Maximize the Chat section",
    description:
      "As every tickets have one chating section after clicking on there it is being open, that was seems small to read the texts so now one squire button is there on top just click there chating section will be spread in full window. ",
    type: "Bug Fix",
    timestamp: "2025-07-08T10:30:00",
  },
  {
    title: "⚠️ Closing to Chat section",
    description:
      "To close the chat section we have one cross button as that was seems small so now we have big red button there only to close the ticket chat section. ",
    type: "Downtime",
    timestamp: "2025-07-06T18:00:00",
  },
  {
    title: "🎨 UI Enhancements",
    description: "Improved the ticket list layout and added quick filters.",
    type: "Info",
    timestamp: "2025-07-03T08:45:00",
  },
];

const badgeStyles = {
  New: "bg-green-200 text-green-800",
  "Bug Fix": "bg-yellow-100 text-yellow-800",
  Downtime: "bg-red-100 text-red-700",
  Info: "bg-blue-100 text-blue-700",
};

const iconMap = {
  New: <Star className="w-4 h-4 mr-1" />,
  "Bug Fix": <AlertTriangle className="w-4 h-4 mr-1" />,
  Downtime: <Bell className="w-4 h-4 mr-1" />,
  Info: <Info className="w-4 h-4 mr-1" />,
};

const Updates = () => {
  return (
    <div className="lg:ml-40 pt-16 mr-8">
      <h1 className="text-3xl font-bold mb-8 text-center text-blue-800">
        📢 Latest Updates Will Show Here
      </h1>

      <div className="grid md:grid-cols-2 gap-6">
        {updatesData.map((update, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl p-5 shadow-md border hover:shadow-lg transition-all"
          >
            <div className="flex justify-between items-start">
              <div>
                <div className="flex items-center text-lg font-semibold text-gray-800">
                  {iconMap[update.type]} {update.title}
                </div>
                <p className="mt-2 text-gray-600">{update.description}</p>
              </div>
              <span
                className={`text-xs font-medium px-3 py-1 rounded-full ${
                  badgeStyles[update.type]
                }`}
              >
                {update.type}
              </span>
            </div>
            <div className="mt-3 text-sm text-gray-400">
              {new Date(update.timestamp).toLocaleString()}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Updates;
