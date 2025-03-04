import { AppSidebar } from "@/ui/app-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/ui/breadcrumb";
import { Separator } from "@/ui/separator";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/ui/sidebar";
import { Outlet, useLocation } from "react-router-dom";

const Sidebar = () => {
  // const location = useLocation();

  // const pathSegments = location.pathname.split('/').filter(Boolean);
  // const pageName = pathSegments.length > 0 ? pathSegments[pathSegments.length - 1] : 'Dashboard';

  return (
    <div className="flex flex-col w-full">
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset className="bg-[#f8f8f8]">
          <SidebarTrigger className="-ml-1 px-4" />
          <section className="px-5 py-5">
            <Outlet />
          </section>
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
};

export default Sidebar;
