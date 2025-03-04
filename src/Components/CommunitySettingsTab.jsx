import { useEffect, useState } from "react";
import { useForm, Controller, FormProvider } from "react-hook-form";
import { Textarea } from "@/ui/textarea";
import { ChevronDown, Trash2 } from "lucide-react";
import { Label } from "@/ui/label";
import { Input } from "@/ui/input";
import {
  Card,
  CardContent,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/ui/card";
import { Switch } from "@/ui/switch";
import { Button } from "@/ui/button";
import { toast } from "react-toastify";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import axios from "axios";
import utils from "../utils/utils";
import { FormControl, FormItem, FormLabel } from "../ui/form";

const CommunitySettingsTab = ({ community }) => {
  const [thumbnailImage, setThumbnailImage] = useState(null);
  const [courses, setCourses] = useState([]);
  const methods = useForm({
    defaultValues: {
      title: "",
      caption: "",
      media: "",
      publishedAt: "",
      createdAt: "",
      time: "",
      day: "",
      selectedCourseId: "",
    },
  });

  const { control, reset, handleSubmit } = methods;

  const daysOfWeek = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  // Populate form fields when `community` prop changes
  useEffect(() => {
    if (community) {
      // Reset the form with the community data
      reset({
        title: community?.attributes?.title || "",
        caption: community?.attributes?.caption || "",
        media: community?.attributes?.media || "",
        publishedAt: community?.attributes?.publishedAt || "",
        createdAt: community?.attributes?.createdAt || "",
        time: community?.attributes?.time || "",
        day: community?.attributes?.day || "",
        selectedCourseId: community?.attributes?.course?.data?.id || "",
      });
      setThumbnailImage(
        community?.attributes?.media?.data?.attributes.url || null
      );
    }
  }, [community, reset]);

  console.log(community, "community");

  // Fetch courses
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get(
          `${utils.BASE_URL}courses?populate=*`,
          {
            headers: {
              Authorization: `Bearer ${utils.token}`,
            },
          }
        );
        if (response.status === 200) {
          setCourses(response?.data?.data);
        } else {
          toast.error("Failed to fetch courses.");
        }
      } catch (error) {
        console.error("Error fetching courses:", error);
        toast.error("Error fetching courses. Please try again.");
      }
    };
    fetchCourses();
  }, []);

  const handleThumbnailImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setThumbnailImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEditModule = async (data) => {
    try {
      const toastId = toast.loading("Updating community...");
      const formData = new FormData();

      // Format time and day fields properly
      const formattedTime = data.time
        ? `${data.createdAt}:00.000` // Ensure milliseconds are included
        : "00:00:00.000"; // Default time if none is selected

      // if (!daysOfWeek.includes(data.publishedAt)) {
      //   toast.error("Please select a valid day.");
      //   return; // Stop the submission if the day is invalid
      // }

      // Prepare the community data for submission
      formData.append(
        "data",
        JSON.stringify({
          title: data.title,
          caption: data.caption,
          time: formattedTime, // Include formatted time
          day: data.publishedAt, // Day should match selected value
          course: data.selectedCourseId, // Use selected course ID
          going: community?.going || 0, // Preserve existing "going" count
        })
      );

      // Add thumbnail image if updated
      if (thumbnailImage) {
        const imageBlob = await fetch(thumbnailImage).then((res) => res.blob());
        formData.append("files.media", imageBlob, "thumbnail.jpg");
      }

      // Send PUT request to update the community
      const response = await axios.put(
        `${utils.BASE_URL}communities/${community?.id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${utils.token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200) {
        toast.update(toastId, {
          render: "Community updated successfully!",
          type: "success",
          isLoading: false,
          autoClose: 1000,
        });
      } else {
        throw new Error("Unexpected response status: " + response.status);
      }
    } catch (error) {
      console.error("Error updating community:", error.message);
      toast.error("Failed to update the community. Please try again.");
    }
  };

  return (
    <>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(handleEditModule)}>
          <section className="bg-[#F7F7F7] flex flex-col lg:flex-row gap-7 pb-10">
            <div className="2xl:basis-1/3 lg:basis-1/2 flex flex-col gap-3">
              <h2 className="text-lg font-semibold text-[#444343]">
                Community Details
              </h2>
              <p className="text-gray-600 text-sm">
                Give your community a title, description, and thumbnail image.
              </p>
            </div>
            <Card className="w-full">
              <CardContent className="p-10">
                <div className="space-y-4">
                  <Controller
                    name="title"
                    control={control}
                    render={({ field }) => (
                      <div className="space-y-1">
                        <Label>Title</Label>
                        <Input {...field} placeholder="Enter title" />
                      </div>
                    )}
                  />
                  <Controller
                    name="caption"
                    control={control}
                    render={({ field }) => (
                      <div className="space-y-1">
                        <Label>Description</Label>
                        <Textarea {...field} placeholder="Enter description" />
                      </div>
                    )}
                  />
                  <Controller
                    name="selectedCourseId"
                    control={control}
                    render={({ field }) => {
                      console.log("Selected Course ID:", field.value); // Debugging
                      return (
                        <div className="space-y-1">
                          <Label>Select Course</Label>
                          <Select
                            value={field.value}
                            onValueChange={(value) => {
                              console.log("Selected Value:", value); // Debugging
                              field.onChange(value);
                            }}
                          >
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Select Course" />
                            </SelectTrigger>
                            <SelectContent>
                              {courses?.map((course) => (
                                <SelectItem
                                  key={course?.id}
                                  value={course?.id.toString()}
                                >
                                  {course?.attributes?.title}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      );
                    }}
                  />
                  <Controller
                    name="day"
                    control={control}
                    render={({ field }) => (
                      <div className="space-y-1">
                        <Label>Select Day</Label>
                        <select
                          {...field}
                          className="border border-gray-300 rounded-md px-3 py-2 w-full"
                        >
                          <option value="">-- Choose a day --</option>
                          {daysOfWeek.map((day) => (
                            <option key={day} value={day}>
                              {day}
                            </option>
                          ))}
                        </select>
                      </div>
                    )}
                  />
                  <Controller
                    name="time"
                    control={control}
                    render={({ field }) => (
                      <div className="space-y-1">
                        <Label>Select Time</Label>
                        <input
                          type="time"
                          {...field}
                          className="border border-gray-300 rounded-md px-3 py-2 w-full"
                        />
                      </div>
                    )}
                  />
                  <div>
                    <Label>Cover Image</Label>
                    <div className="flex items-center gap-6">
                      {thumbnailImage ? (
                        <img
                          src={`${utils.BASE_URL_MEDIA}${thumbnailImage}`}
                          alt="Thumbnail"
                          className="w-32 h-32 object-cover rounded"
                        />
                      ) : (
                        <div className="w-32 h-32 bg-gray-200 rounded flex items-center justify-center">
                          No Image
                        </div>
                      )}
                      <Label className="cursor-pointer">
                        <Input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={handleThumbnailImage}
                        />
                        Upload Image
                      </Label>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>
          <div className="flex justify-end bg-[#F7F7F7]">
            <Button type="submit" className="rounded-full">
              Save
            </Button>
          </div>
        </form>
      </FormProvider>

      {/* <section className=" bg-[#f8f8f8] flex gap-5   py-8">
        <div className="flex max-w-[33%] gap-3 flex-col">
          <CardTitle>Live Rooms</CardTitle>
          <CardDescription>
            Give your live sessions a title and description. These details will
            appear in your student's course.
          </CardDescription>
          <CardDescription>
            Live sessions are limited to 200 participants.
          </CardDescription>
        </div>
        <FormProvider {...methods}>
          <form className="w-full  space-y-6">
            <div>
              <div className="space-y-4 ">
                <Controller
                  control={control}
                  name="marketing_emails"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center bg-white gap-3 rounded-2xl border p-8 shadow-sm">
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          className="mt-1"
                        />
                      </FormControl>
                      <div className="space-y-0.5">
                        <FormLabel>
                          Provide a live video session tor this course
                        </FormLabel>
                      </div>
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </form>
        </FormProvider>
      </section> */}
      <section className="bg-[#f8f8f8] py-5">
        <CardFooter className="flex justify-between items-center">
          <Button className="text-red-500 p-0" variant="link">
            <Trash2 /> Delete Community
          </Button>
          {/* <Button className="rounded-full">Save</Button> */}
        </CardFooter>
      </section>
    </>
  );
};

export default CommunitySettingsTab;
