import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/ui/button";
import { Card } from "@/ui/card"; // Import Card for layout
import { EyeIcon } from "lucide-react";
import FileUploadPopup from "../Components/FileUploadPopup";
import ShareDownloadPopup from "../Components/ShareDownloadPopup";
import DownloadsSettingsTab from "../Components/DownloadsSettingsTab";
const AddDownload = () => {
  const [activeTab, setActiveTab] = useState("Files");

  const tabs = [
    { name: "Files", count: 0 },
    { name: "Offers", count: 0 },
    { name: "Customers", count: 0 },
    { name: "Settings" },
  ];

  return (
    <div className="px-5 py-10">
      <section className="flex justify-between w-full">
        <div className="flex gap-8 w-full">
          {/* Header Section */}
          <div className="flex items-center justify-center gap-6 h-32 w-32 border mb-6">
            {/* Profile Image Placeholder */}
            <div className="flex justify-center h-12 w-12  items-center  bg-gray-100 rounded-md">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-32 w-32 text-[#b2b0ae]"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                <circle cx="8.5" cy="8.5" r="1.5"></circle>
                <path d="M21 15l-5-5L5 21"></path>
              </svg>
            </div>
            {/* Profile Name */}
          </div>
          {/* Tabs Navigation */}
          <div className="border-b border-gray-200 pb-5  flex flex-col justify-between">
            <h1 className="text-xl font-semibold">abc</h1>
            <nav className="flex space-x-6">
              {tabs.map((tab) => (
                <button
                  key={tab.name}
                  className={cn(
                    "pb-3 text-sm font-medium transition-all ",
                    activeTab === tab.name
                      ? "text-red-500 border-b-2 border-red-500"
                      : "text-gray-500 hover:text-gray-700"
                  )}
                  onClick={() => setActiveTab(tab.name)}
                >
                  {tab.name}
                  {tab.count !== undefined && <span> ({tab.count})</span>}
                </button>
              ))}
            </nav>
          </div>
        </div>
        {/* Action Buttons */}
        <div className="flex justify-end gap-4 mt-4">
          {/* <Button
            variant="outline"
            className="flex items-center gap-2 rounded-full  border-gray-300"
          >
            <EyeIcon />
          </Button> */}
          <ShareDownloadPopup />
        </div>
      </section>

      {/* Tab Content */}
      <Card className="mt-6 rounded-lg shadow-none border-none">
        {activeTab === "Files" && (
          <div className="p-8 text-center shadow-md border border-gray-200">
            <p className="text-gray-600">Your files will appear here.</p>
            <FileUploadPopup />
          </div>
        )}
        {activeTab === "Offers" && (
          <div className="p-8 text-center shadow-md border border-gray-200">
            <p className="text-gray-600">No offers yet.</p>
          </div>
        )}
        {activeTab === "Customers" && (
          <div className="p-8 text-center shadow-md border border-gray-200">
            <p className="text-gray-600">No customers yet.</p>
          </div>
        )}
        {activeTab === "Settings" && (
          <div>
            <DownloadsSettingsTab />
          </div>
        )}
      </Card>
    </div>
  );
};

export default AddDownload;
