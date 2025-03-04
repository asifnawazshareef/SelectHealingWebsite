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

import DashboardCards from "../Components/DashboardCards";
import Header from "../Components/Header";

export default function Layout() {
  return (
    <div className="flex flex-col w-full ">
      <Header />
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset className="bg-[#f7f7f7]">
          <header className="flex  h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear  group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
            <div className="flex items-center gap-2 px-4">
              <SidebarTrigger className="-ml-1" />
              <Separator orientation="vertical" className="mr-2 h-4" />
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem className="hidden md:block">
                    <BreadcrumbLink href="#">
                      Building Your Application
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator className="hidden md:block" />
                  <BreadcrumbItem>
                    <BreadcrumbPage>Data Fetching</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>
          </header>
          <section className="px-5 py-10">
            <h2 className="text-2xl font-bold">Welcome back, .</h2>
            <DashboardCards />
          </section>
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
}
