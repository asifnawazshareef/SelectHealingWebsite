import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/ui/dropdown-menu";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../features/auth/authSlice";
import { toast } from "react-toastify";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/ui/breadcrumb";
import { FiExternalLink, FiUser } from "react-icons/fi";
import { RiUserStarLine } from "react-icons/ri";
import { IoSearchOutline } from "react-icons/io5";
import { IoMdPerson } from "react-icons/io";
import { Command } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
const Header = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const pageNameMapping = {
    dashboard: "Dashboard",
    account: "Account",
    "account-details": "Account Details",
    "course-details": "Course Details",
  };

  // Process path segments
  const pathSegments = location.pathname.split("/").filter(Boolean);

  // Breadcrumb logic with fallback for root path
  const breadcrumbSegments =
    pathSegments.length === 0
      ? ["Dashboard"] // Fallback for root path
      : pathSegments.map((segment, index) => {
          return pageNameMapping[segment] || (isNaN(segment) ? segment : "");
        });


  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    toast.success("Logged out successfully!");
    navigate("/login");
  };
  const [isOpen, setIsOpen] = useState(false);
  const toggleModal = () => {
    setIsOpen((prev) => !isOpen);
  };
  return (
    <div className="sticky top-0 z-50 flex justify-between w-full items-center bg-white px-5 py-3 shadow-sm">
      <div className="flex items-center gap-10">
        <Link
          to="/"
          className="flex items-center gap-2 bg-[#ededed] pl-1 pr-3 py-1 rounded-xl"
        >
          <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
            <Command className="size-4" />
          </div>
          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-semibold">Select Healing</span>
          </div>
        </Link>
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem className="hidden md:block">
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator className="hidden md:block" />
            {breadcrumbSegments.map((name, index) => (
              <BreadcrumbItem key={index}>
                {index === breadcrumbSegments.length - 1 ? (
                  <BreadcrumbPage>
                    {name.charAt(0).toUpperCase() + name.slice(1)}
                  </BreadcrumbPage>
                ) : (
                  <BreadcrumbLink
                    href={`/${pathSegments.slice(0, index + 1).join("/")}`}
                  >
                    {name.charAt(0).toUpperCase() + name.slice(1)}
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
            ))}
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <div className="flex justify-center items-center text-3xl">
        <div className="flex text-[#6d6c6c]  items-center gap-3">
          <div
            className={`transition-all duration-300 ease-in-out flex items-center bg-gray-100 border border-gray-300 shadow-sm rounded-full ${
              isExpanded ? "w-64 px-4" : "w-10"
            }`}
          >
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="p-2 text-gray-500 focus:outline-none outline-none"
            >
              <IoSearchOutline className="text-xl" />
            </button>
            {isExpanded && (
              <input
                type="text"
                className="w-full bg-transparent outline-none text-gray-700 px-3 text-sm"
                placeholder="Search..."
              />
            )}
          </div>
          <div className="relative flex justify-center items-center">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button>
                  <div className="bg-gray-200 pl-[2px] cursor-pointer pr-3 py-[2px] rounded-md">
                    <IoMdPerson className="p-2 rounded-md text-[#ff3e15] bg-white hover:text-[#f08c76] size-8" />
                  </div>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="max-w-[600px] py-3 text-[#333231]  font-medium bg-white border border-gray-200 rounded-lg shadow-lg"
              >
                <DropdownMenuItem className="flex items-center px-4 py-2 hover:bg-gray-100">
                  <IoMdPerson className=" rounded-md text-[#ff3e15]  hover:text-[#f08c76]" />
                  <span className="font-medium text-[#4C4C4B]">
                    projectlead@innovativemojo.com
                  </span>
                </DropdownMenuItem>
                <DropdownMenuSeparator className="my-3 border-[#E1E1E1] border-[1px]" />
                <Link to="account-details">
                  <DropdownMenuItem className="flex items-center  px-4 py-2 hover:bg-gray-100">
                    <FiUser className="w-7 h-7 text-gray-400 mr-3" />
                    Account settings
                  </DropdownMenuItem>
                </Link>
                <DropdownMenuItem className="flex items-center px-4 py-2 hover:bg-gray-100">
                  <RiUserStarLine className="w-7 h-7 text-gray-400 mr-3" />
                  Partner program
                </DropdownMenuItem>
                <DropdownMenuSeparator className="my-3 border-[#E1E1E1] border-[1px]" />
                <DropdownMenuItem className="flex items-center justify-between px-4 py-2 hover:bg-gray-100">
                  Contact support
                  <FiExternalLink className="w-4 h-4 text-gray-500" />
                </DropdownMenuItem>
                <DropdownMenuItem className="flex items-center justify-between px-4 py-2 hover:bg-gray-100">
                  Kajabi Experts
                  <FiExternalLink className="w-4 h-4 text-gray-500" />
                </DropdownMenuItem>
                <DropdownMenuItem className="flex items-center justify-between px-4 py-2 hover:bg-gray-100">
                  Kajabi University
                  <FiExternalLink className="w-4 h-4 text-gray-500" />
                </DropdownMenuItem>
                <DropdownMenuSeparator className="my-3 border-[#E1E1E1] border-[1px]" />
                <DropdownMenuItem
                  onClick={handleLogout}
                  className="flex items-center px-4 py-2  hover:bg-gray-100"
                >
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
