import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/ui/button";
import { Card } from "@/ui/card";
import { IoPricetagOutline } from "react-icons/io5";
import DownloadsSettingsTab from "../Components/DownloadsSettingsTab";
import img1 from "../assets/videoImg.png";

import { Link, useLocation } from "react-router-dom";
import { useNavigate } from "react-router";
import CommunitySettingsTab from "../Components/CommunitySettingsTab";
import { CommunityDashboardTab } from "../Components/CommunityDashboardTab";
import Feed from "../Components/Feed";
import axios from "axios";
import utils from "../utils/utils";
import { toast } from "react-toastify";
import { FaPlus } from "react-icons/fa6";
import AccressGroup from "../Components/CommunityComponents/AccressGroup";
const CommunityDetails = () => {
  const location = useLocation();
  const community = location.state?.community;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const [activeTab, setActiveTab] = useState("Dashboard");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [communityListings, setCommunityListings] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const tabs = [
    { name: "Dashboard" },
    { name: "Access group" },
    { name: "Feed" },
    { name: "Settings" },
  ];
  const handleAddContentClick = () => {
    setIsDialogOpen(true);
  };

  useEffect(() => {
    fetchCommunityListings();
  }, []);
  const fetchCommunityListings = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${utils.BASE_URL}communities?populate[course][populate][buys][populate]=user`,
        {
          headers: {
            Authorization: `Bearer ${utils.token}`,
          },
        }
      );

      const communityList = response?.data?.data;
      console.log(response.data);
      setCommunityListings(communityList);
    } catch (error) {
      toast.error("Failed to fetch community");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="">
      <section className="flex flex-col  ">
        <div>
          <div className="flex justify-between items-center mb-5">
            <h1 className="text-3xl font-bold">
              {community?.attributes?.title || "Community Details"}
            </h1>
          </div>
          <div className="border-b  border-gray-200 pb-5  flex flex-col  justify-between">
            <div className="flex justify-between items-center">
              {" "}
              <nav className="hidden lg:flex  gap-3 mt-5">
                {tabs.map((tab) => (
                  <button
                    key={tab.name}
                    className={cn(
                      "pb-3 text-sm font-medium transition-all ",
                      activeTab === tab.name
                        ? "text-[#363534] font-bold border-b-4 border-[#ff3e15]"
                        : "text-gray-700 font-medium hover:text-gray-900"
                    )}
                    onClick={() => setActiveTab(tab.name)}
                  >
                    {tab.name}
                    {tab.count !== undefined && <span> ({tab.count})</span>}
                  </button>
                ))}
              </nav>
              <Link to="/add-room" state={{ community }}>
                <Button className="bg-black text-white py-3 px-3 md:py-5 md:px-5 text-xs sm:text-sm md:text-base rounded-full">
                  {/* <FaPlus /> */}
                  Go to Live room
                </Button>
              </Link>
            </div>
          </div>
        </div>
        {/* Action Buttons */}{" "}
        <div className="lg:hidden  flex items-center justify-center">
          <nav className="flex  gap-3 mt-5">
            {tabs.map((tab) => (
              <button
                key={tab.name}
                className={cn(
                  "pb-3 text-sm font-medium transition-all ",
                  activeTab === tab.name
                    ? "text-red-500 border-b-4 border-[#ff3e15]"
                    : "text-gray-700 font-medium hover:text-gray-900"
                )}
                onClick={() => setActiveTab(tab.name)}
              >
                {tab.name}
                {tab.count !== undefined && <span> ({tab.count})</span>}
              </button>
            ))}
          </nav>
        </div>
      </section>

      {/* Tab Content */}
      <Card className="mt-6 rounded-lg shadow-none border-none">
        {activeTab === "Dashboard" && (
          <div>
            <CommunityDashboardTab communityListings={communityListings} />
          </div>
        )}
        {activeTab === "Access group" && (
          <AccressGroup communityListings={communityListings} />
        )}

        {activeTab === "Certificates" && (
          <div>
            <DownloadsSettingsTab />
          </div>
        )}
        {activeTab === "Feed" && (
          <div>
            <Feed />
          </div>
        )}
        {activeTab === "Settings" && (
          <div>
            <CommunitySettingsTab community={community} />
          </div>
        )}
      </Card>
    </div>
  );
};

export default CommunityDetails;
