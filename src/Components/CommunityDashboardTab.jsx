import { Chart } from "react-google-charts";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Card } from "@/ui/card";

// Calculate the last 30 days dynamically
const currentDate = new Date();
const thirtyDaysAgo = new Date();
thirtyDaysAgo.setDate(currentDate.getDate() - 30);

// Format Date for 30 days range
const formatDate = (date) => {
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
};

// For 30 Days (Last 30 Days Data)
const generateThirtyDaysData = () => {
  const data = [["Date", "Users"]];
  data.push([formatDate(thirtyDaysAgo), Math.floor(Math.random() * 1000)]); // First date
  data.push([formatDate(currentDate), Math.floor(Math.random() * 1000)]); // Last date
  return data;
};
export const thirtyDaysData = generateThirtyDaysData();

// Static data for 7 days and 3 months
export const sevenDaysData = [
  ["Date", "Users"],
  ["Dec 23", 50],
  ["Dec 24", 200],
  ["Dec 25", 300],
  ["Dec 26", 250],
  ["Dec 27", 400],
  ["Dec 28", 450],
  ["Dec 29", 500],
];

export const threeMonthsData = [
  ["Date", "Users"],
  ["Oct 23", 100],
  ["Nov 23", 300],
  ["Dec 23", 500],
  ["Jan 23", 800],
];

const thirtyDaysOptions = {
  curveType: "function",
  legend: "none",
  hAxis: {
    gridlines: { color: "transparent" },
  },
  vAxis: {
    gridlines: { color: "transparent" },
  },
};

const sevenDaysOptions = {
  curveType: "function",
  legend: "none",
  hAxis: {
    gridlines: { color: "transparent" },
  },
  vAxis: {
    gridlines: { color: "transparent" },
  },
};

const threeMonthsOptions = {
  curveType: "function",
  legend: "none",
  hAxis: {
    gridlines: { color: "transparent" },
  },
  vAxis: {
    gridlines: { color: "transparent" },
  },
};

export function CommunityDashboardTab({ communityListings }) {
  const [activeTab, setActiveTab] = useState("30 days");
  const tabs = [{ name: "7 days" }, { name: "30 days" }, { name: "3 months" }];

  // Get the last updated date from communityListings data (if available)
  const lastUpdated = communityListings?.[0]?.attributes?.updatedAt;

  return (
    <div>
      <section>
        <div className="">
          <section className="flex flex-col">
            <div className="flex justify-between items-center py-6 bg-[#f8f8f8]">
              <div className="flex flex-col justify-between">
                <nav className="hidden lg:flex border-[#ececec] border-2 bg-white rounded-2xl outline-none">
                  {tabs.map((tab) => (
                    <button
                      key={tab.name}
                      className={cn(
                        "text-base font-medium rounded-2xl transition-all px-6 py-3",
                        activeTab === tab.name
                          ? "text-white shadow-xl bg-[#343332]"
                          : "text-[#343332] bg-white",
                        {
                          "border-r-2 rounded-r-none": tab.name === "7 days",
                          "rounded-none": tab.name === "30 days",
                          "rounded-l-none border-l-2": tab.name === "3 months",
                        }
                      )}
                      onClick={() => setActiveTab(tab.name)}
                    >
                      {tab.name}
                    </button>
                  ))}
                </nav>
              </div>
              <h3>
                Last updated: {lastUpdated ? new Date(lastUpdated).toLocaleString() : "N/A"}
              </h3>
            </div>
            <div className="lg:hidden flex items-center justify-center">
              <nav className="flex gap-3 mt-5">
                {tabs.map((tab) => (
                  <button
                    key={tab.name}
                    className={cn(
                      "pb-3 text-sm font-medium transition-all",
                      activeTab === tab.name
                        ? "text-red-500 border-b-4 border-[#ff3e15]"
                        : "text-gray-700 font-medium hover:text-gray-900"
                    )}
                    onClick={() => setActiveTab(tab.name)}
                  >
                    {tab.name}
                  </button>
                ))}
              </nav>
            </div>
          </section>
          <Card className="mt-6 rounded-lg shadow-none border-none">
            {activeTab === "7 days" && (
              <div>
                <Chart
                  chartType="LineChart"
                  width="100%"
                  height="300px"
                  data={sevenDaysData}
                  options={sevenDaysOptions}
                />
              </div>
            )}
            {activeTab === "3 months" && (
              <div>
                <Chart
                  chartType="LineChart"
                  width="100%"
                  height="300px"
                  data={threeMonthsData}
                  options={threeMonthsOptions}
                />
              </div>
            )}
            {activeTab === "30 days" && (
              <div>
                <div className="px-14">
                  <h2 className="font-semibold text-lg text-[#343332]">Active Users</h2>
                  <h3 className="font-bold text-2xl text-[#343332]">
                    {" "}
                    {communityListings?.flatMap(
                      (community) =>
                        community?.attributes?.course?.data?.attributes?.buys
                          ?.data
                    )?.length || 0}
                  </h3>
                </div>
                <Chart
                  chartType="LineChart"
                  width="100%"
                  height="300px"
                  data={thirtyDaysData}
                  options={thirtyDaysOptions}
                />
              </div>
            )}
          </Card>
        </div>
      </section>
    </div>
  );
}
