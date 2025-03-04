"use client";
import { Link } from "react-router";
import { Box, ChartNoAxesCombined } from "lucide-react";
import { RxDashboard } from "react-icons/rx";
import { NavMain } from "@/ui/nav-main";

import { NavUser } from "@/ui/nav-user";
import { Sidebar, SidebarContent, SidebarFooter } from "@/ui/sidebar";
import { useSelector } from "react-redux";

const data = {
  user: {
    name: "Settings",
    email: "",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Dashboard",
      icon: RxDashboard,
      isActive: true,
      url: "/",
    },
    {
      title: "Products",
      icon: Box,
      isActive: false,
      items: [
        {
          title: "Courses",
          url: "/courses",
        },
        {
          title: "Community",
          url: "/community",
        },
        {
          title: "Podcasts",
          url: "/podcastsListing",
        },
        {
          title: "Newsletters",
          url: "/newsletters",
        },
        {
          title: "Downloads",
          url: "/downloads",
        },
      ],
    },
    {
      title: "Sales",
      icon: ChartNoAxesCombined,
      isActive: false,
      items: [
        {
          title: "Offers",
          url: "/offers",
        },
      ],
    },
  ],
};

export function AppSidebar({ ...props }) {
  const email = useSelector((state) => state.auth.email);

  return (
    <Sidebar variant="inset" {...props} className="bg-white">
      <SidebarContent className="bg-white">
        <NavMain items={data.navMain} />
        {/* <div className="px-5 mx-5 max-w-[1200px]  p-5 bg-[#f4f9ff] shadow-sm rounded-md">
          <h2 className="font-medium mb-1">Heads up!</h2>
          <p className="text-sm text-gray-500">
            We will be undergoing routine maintenance on December 7th, 4pm PST
            for up to 30 minutes. Please see status.kajabi.com for more info.
          </p>
          <Link to="/" className="underline text-[#3543b2]">
            Learn more
          </Link>
        </div> */}
      </SidebarContent>
      <SidebarFooter className="bg-white">
        <NavUser user={{ ...data.user, email }} />
      </SidebarFooter>
    </Sidebar>
  );
}
