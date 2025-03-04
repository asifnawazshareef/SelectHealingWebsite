import { FiUsers } from "react-icons/fi";
import { RiUserCommunityLine } from "react-icons/ri";
import { MdOutlineCastForEducation } from "react-icons/md";
import { FaChartSimple } from "react-icons/fa6";
import axios from "axios";
import utils from "../utils/utils";
import { useState, useEffect } from "react";
const DashboardCards = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalCourses, setTotalCourses] = useState(0);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalSales, setTotalSales] = useState(0);
  const [totalCommunities, setTotalCommunities] = useState(0);
  useEffect(() => {
    fetchCourseListings();
    fetchUserListings();
    fetchCommunityListings();
  }, []);

  // Get Courses API
  const fetchCourseListings = async () => {
    try {
      const response = await axios.get(
        `${utils.BASE_URL}courses?populate[buys][populate]=user&populate[downloads][populate]=user&populate[media]=true&populate[author]=true&populate[favorites][populate]=user`,
        {
          headers: {
            Authorization: `Bearer ${utils.token}`,
          },
        }
      );
      const courses = response.data.data;
      const buyersLength =
        response.data?.data[0]?.attributes?.buys?.data?.length || 0;
      const coursePrice = response.data?.data[0]?.attributes?.price || 0;
      const calculateTotalSales = buyersLength * coursePrice;
      setTotalCourses(courses.length);
      setTotalSales(calculateTotalSales);
      setError(null);
    } catch (error) {
      toast.error("failed to fetch courses");
    } finally {
      setLoading(false);
    }
  };
  // Get Users API
  const fetchUserListings = async () => {
    try {
      const response = await axios.get(`${utils.BASE_URL}users`, {
        headers: {
          Authorization: `Bearer ${utils.token}`,
        },
      });
      const users = response.data;
      setTotalUsers(users.length);
      setError(null);
    } catch (error) {
      toast.error("failed to fetch users");
    } finally {
      setLoading(false);
    }
  };
  // Get Community API
  const fetchCommunityListings = async () => {
    try {
      const response = await axios.get(
        `${utils.BASE_URL}communities?populate[course][populate][buys][populate]=user`,
        {
          headers: {
            Authorization: `Bearer ${utils.token}`,
          },
        }
      );
      const communities = response.data.data;
      setTotalCommunities(communities.length);
      setError(null);
    } catch (error) {
      toast.error("failed to fetch communities");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="flex flex-1 flex-col gap-5   pt-10">
      <div className="flex justify-between text-gray-600 font-medium items-center">
        <h3>What's happening in your business</h3>
        <h3>Last 30 days</h3>
      </div>
      <div className="grid auto-rows-min gap-5 grid-cols-1 lg:grid-cols-2">
        <div className="xl:aspect-[4/1] lg:aspect-[4/1/2] aspect-auto  rounded-xl bg-muted/50">
          <div className="bg-gradient-to-b h-full flex   from-pink-200 to-pink-100 border-b-4 border-pink-500 rounded-lg shadow-xl">
            <div className="flex-shrink p-5">
              <div className="rounded-full p-5 bg-pink-600 shadow-lg shadow-slate-500/50	">
                <FiUsers className="text-white text-3xl" />
              </div>
            </div>
            <div className="flex flex-col justify-end gap-1 p-5 items-end w-full">
              <div className="text-lg flex gap-3 items-center text-gray-600">
                <FiUsers className="text-3xl" />
                <h3>Total users</h3>
              </div>
              <p className="font-bold text-2xl md:text-4xl">{totalUsers}</p>
            </div>
          </div>
        </div>
        <div className="xl:aspect-[4/1] lg:aspect-[4/1/2] aspect-auto rounded-xl bg-muted/50">
          <div className="bg-gradient-to-b h-full flex    from-green-200 to-green-100 border-b-4 border-green-600 rounded-lg shadow-xl">
            <div className="flex-shrink p-5">
              <div className="rounded-full p-5 bg-green-600 shadow-lg shadow-slate-500/50	">
                <MdOutlineCastForEducation className="text-white text-3xl" />
              </div>
            </div>
            <div className="flex flex-col justify-end gap-1 p-5 items-end w-full">
              <div className="text-lg  flex gap-3 items-center text-gray-600">
                <MdOutlineCastForEducation className=" text-3xl" />
                <h3>Total courses</h3>
              </div>
              <p className="font-bold text-2xl md:text-4xl">{totalCourses}</p>
            </div>
          </div>
        </div>
        <div className="xl:aspect-[4/1] lg:aspect-[4/1/2] aspect-auto rounded-xl bg-muted/50">
          <div className="bg-gradient-to-b h-full flex   from-yellow-200 to-yellow-100 border-b-4 border-yellow-600 rounded-lg shadow-xl">
            <div className="flex-shrink p-5">
              <div className="rounded-full p-5 bg-yellow-600 shadow-lg shadow-slate-500/50	">
                <RiUserCommunityLine className="text-white text-3xl" />
              </div>
            </div>
            <div className="flex flex-col justify-end  gap-1 p-5 items-end w-full">
              <div className="text-lg   flex gap-3 items-center text-gray-600">
                <RiUserCommunityLine className=" text-3xl" />
                <h3>Total community</h3>
              </div>
              <p className="font-bold text-2xl md:text-4xl">
                {totalCommunities}
              </p>
            </div>
          </div>
        </div>
        <div className="xl:aspect-[4/1] lg:aspect-[4/1/2] aspect-auto rounded-xl bg-muted/50">
          <div className="bg-gradient-to-b h-full flex   from-blue-200 to-blue-100 border-b-4 border-blue-500 rounded-lg shadow-xl">
            <div className="flex-shrink p-5">
              <div className="rounded-full p-5 bg-blue-600 shadow-lg shadow-slate-500/50	">
                <FaChartSimple className="text-white text-3xl" />
              </div>
            </div>
            <div className="flex flex-col gap-1 justify-end p-5 items-end w-full">
              <div className="text-lg   flex gap-3 items-center text-gray-600">
                <FaChartSimple className="text-3xl" />
                <h3>Total sales</h3>
              </div>
              <p className="font-bold text-2xl md:text-4xl">${totalSales}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardCards;
