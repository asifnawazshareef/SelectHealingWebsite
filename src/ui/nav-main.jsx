"use client";
import { NavLink, useLocation } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/ui/collapsible";
import { useState, useEffect } from "react";
import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/ui/sidebar";

export function NavMain({ items }) {
  const location = useLocation();
  const [activePath, setActivePath] = useState(location.pathname);

  useEffect(() => {
    setActivePath(location.pathname);
  }, [location.pathname]);

  return (
    <SidebarGroup>
      <SidebarMenu>
        {items.map((item) => {
          const isParentActive = item.items?.some((subItem) =>
            activePath.startsWith(subItem.url)
          );

          return (
            <Collapsible
              key={item.title}
              asChild
              defaultOpen={isParentActive || activePath.startsWith(item.url)}
              className="group/collapsible"
            >
              <SidebarMenuItem>
                {item.items?.length > 0 ? (
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton tooltip={item.title}>
                      {item.icon && <item.icon className="text-red-600" />}
                      <span className="font-medium text-gray-600">
                        {item.title}
                      </span>
                      <ChevronDown className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-180" />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                ) : (
                  item.url && (
                    <NavLink
                      to={item.url}
                      className={`${
                        activePath === item.url
                          ? "font-medium  bg-[#FFDECD] text-gray-800"
                          : " bg-transparent"
                      } transition-all duration-200 text-gray-600 hover:text-[#d13f23] rounded-lg flex items-center w-full`}
                    >
                      <SidebarMenuButton
                        tooltip={item.title}
                        className="flex items-center  font-medium w-full"
                      >
                        {item.icon && <item.icon className="text-red-600" />}
                        <span>{item.title}</span>
                      </SidebarMenuButton>
                    </NavLink>
                  )
                )}

                {item.items?.length > 0 && (
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      {item.items.map((subItem) => {
                        const isSubItemActive = activePath === subItem.url;

                        return (
                          <SidebarMenuSubItem key={subItem.title}>
                            <NavLink
                              to={subItem.url}
                              className={`${
                                isSubItemActive ? "bg-[#FFDECD]" : ""
                              } transition-all duration-200 rounded-lg flex items-center w-full`}
                            >
                              <SidebarMenuSubButton className="flex items-center w-full">
                                <span
                                  className={`${
                                    isSubItemActive ? "text-black" : ""
                                  } `}
                                >
                                  {subItem.title}
                                </span>
                              </SidebarMenuSubButton>
                            </NavLink>
                          </SidebarMenuSubItem>
                        );
                      })}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                )}
              </SidebarMenuItem>
            </Collapsible>
          );
        })}
      </SidebarMenu>
    </SidebarGroup>
  );
}
