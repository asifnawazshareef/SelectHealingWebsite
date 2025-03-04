import axios from "axios";
import { useState, useEffect } from "react";
import { Button } from "../ui/button";
import { FaRegComment } from "react-icons/fa";
import { FiUsers } from "react-icons/fi";
import { CiCalendar } from "react-icons/ci";
import { GrNext, GrPrevious } from "react-icons/gr";
import { HiDotsHorizontal } from "react-icons/hi";
import { FaPlus } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import utils from "../utils/utils";
import { toast } from "react-toastify";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

const Courses = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [courseListings, setCourseListings] = useState([]);
  const placeholderImage =
    "https://via.placeholder.com/128x80?text=Placeholder";

  const staticCourses = [
    {
      id: 1,
      title: "Static Course 1",
      caption: "This is a static course",
      thumbnail: placeholderImage,
      description: "Description of Static Course 1",
      createdAt: new Date().toLocaleDateString(),
      products: 10,
    },
    {
      id: 2,
      title: "Static Course 2",
      caption: "Another static course",
      thumbnail: placeholderImage,
      description: "Description of Static Course 2",
      createdAt: new Date().toLocaleDateString(),
      products: 5,
    },
  ];

  useEffect(() => {
    fetchCourseListings();
  }, []);
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

      const coursesList = response.data?.data?.map((item) => {
        const thumbnail = item.attributes?.media?.data?.attributes?.url;
        return {
          id: item.id,
          title: item.attributes?.title || "No Title",
          caption: item.attributes?.caption || "No Caption",
          thumbnail,
          description: item.attributes?.description || "No Description",
          createdAt: new Date(item.attributes?.createdAt).toLocaleDateString(),
          products: item.attributes?.products?.length || 0,
          buys: item.attributes?.buys?.data?.length || 0,
        };
      });

      setCourseListings(coursesList);
      setError(null);
    } catch (error) {
      toast.error("failed to fetch courses");
    } finally {
      setLoading(false);
    }
  };

  const confirmAndDelete = (message, deleteHandler) => {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div className="bg-white shadow-lg rounded-lg p-6 max-w-md w-full mx-auto">
            <h2 className="text-xl font-semibold text-gray-800">Confirm Deletion</h2>
            <p className="text-gray-600 mt-2">{message}</p>
            <div className="mt-6 flex justify-end gap-4">
              <button
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition"
                onClick={onClose}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition"
                onClick={() => {
                  deleteHandler(); // Call the delete handler
                  onClose(); // Close the dialog
                }}
              >
                Confirm
              </button>
            </div>
          </div>
        );
      },
      overlayClassName:
        "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center",
    });
  };

  const deleteCourse = async (id) => {
  const deleteHandler = async () => {
    const url = `${utils.BASE_URL}courses/${id}`;
    try {
      const response = await axios.delete(url, {
        headers: {
          Authorization: `Bearer ${utils.token}`,
        },
      });

      if (response.status === 200) {
        console.log("Course deleted successfully:", response.data);
        fetchCourseListings();
      } else {
        console.error("Unexpected response status:", response.status);
      }
    } catch (error) {
      console.error("Error deleting course:", error.message);
      if (error.response) {
        console.log("Error details:", error.response.data);
      }
      alert("An error occurred while deleting the course.");
    } finally {
      setLoading(false);
    }
  };

  confirmAndDelete("Are you sure you want to delete this course? This action cannot be undone.", deleteHandler);
};

  
  return (
    <div className="min-w-full">
      <div className="px-5 min-h-screen">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Courses</h1>
          <Button
            onClick={() => navigate("/add-course")}
            className="bg-black text-white px-5 py-5 rounded-full"
          >
            <FaPlus />
            New course
          </Button>
        </div>
        {/* <div className="flex items-center gap-1 mb-8">
          <FaRegComment />
          <h2 className="font-semibold">Manage Comments</h2>
        </div> */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-300">
          <div className="flex">
            <h2 className="text-lg font-semibold py-10 px-6">
              {courseListings.length}
              <span className="font-light"> Courses</span>
            </h2>
            <div className="ml-auto px-5 flex text-xl items-center gap-5">
              <span>
                <GrPrevious className="text-gray-500" />
              </span>
              <GrNext className="text-gray-500" />
            </div>
          </div>
          {loading ? (
            <div className="flex justify-center items-center min-h-[50vh]">
              <div className="spinner-border animate-spin border-t-4 border-blue-600 border-solid w-16 h-16 rounded-full"></div>
            </div>
          ) : (
            <div>
              {courseListings.map((course) => (
                <div
                  key={course.id}
                  className="flex items-start gap-4 px-6 py-8 bg-white border-t outline-none border-gray-200"
                >
                  <div className="flex-shrink-0 text-center flex items-center justify-center">
                    <img
                      src={
                        course?.thumbnail?.startsWith("http")
                          ? course.thumbnail
                          : `https://admin.selecthealing.online${course.thumbnail}`
                      }
                      alt="Course Thumbnail"
                      className="rounded-lg w-32 h-20 object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <Link
                      to={`/course-detail/${course.id}`}
                      className="flex items-center gap-2 cursor-pointer hover:text-blue-700"
                    >
                      <h3 className="text-medium font-semibold">
                        {course.title}
                      </h3>
                    </Link>
                    <div className="mt-2 flex gap-6 text-black">
                      <p className="flex gap-2 font-medium items-center">
                        <FiUsers /> {course.buys}
                      </p>
                      <p className="flex gap-1 font-medium items-center">
                        <CiCalendar className="text-2xl" />
                        Created {course.createdAt}
                      </p>
                    </div>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger className="text-gray-500 hover:text-black pt-8">
                      <HiDotsHorizontal />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="bg-white border border-gray-300 rounded-md shadow-lg w-40">
                      <Link
                        to={`/course-detail/${course.id}`}
                        className="flex items-center gap-2 cursor-pointer hover:text-blue-700"
                      >
                        <DropdownMenuItem>Edit</DropdownMenuItem>
                      </Link>
                      <DropdownMenuItem onClick={() => deleteCourse(course.id)}>
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Courses;
