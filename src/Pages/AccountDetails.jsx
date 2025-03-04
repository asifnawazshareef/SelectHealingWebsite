import { useState, useEffect } from "react";
import { Textarea } from "@/ui/textarea";
import { PiCopyLight } from "react-icons/pi";
import { Label } from "@/ui/label";
import { Input } from "@/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/ui/select";
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/ui/card";
import { useSelector, useDispatch } from "react-redux";
import { Button } from "@/ui/button";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { IoPersonCircle } from "react-icons/io5";
import axios from "axios";
import utils from "../utils/utils";

const AccountDetails = () => {
  const userId = useSelector((state) => state.auth.userId);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [userPicture, setUserPicture] = useState("");
  const [thumbnailImage, setThumbnailImage] = useState(null);
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
  // for form data
  const methods = useForm({
    defaultValues: {
      marketing_emails: false,
      security_emails: true,
    },
  });

  const { handleSubmit, control } = methods;

  const onSubmit = (data) => {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  };

  const dispatch = useDispatch();

  useEffect(() => {
    if (!userId) {
      const storedUserId = localStorage.getItem("userId");
      if (storedUserId) {
        dispatch(
          loginSuccess({
            email: localStorage.getItem("email"),
            authToken: localStorage.getItem("authToken"),
            userId: storedUserId,
          })
        );
      }
    }
  }, [userId, dispatch]);
  // Get Users

  // Check if user data is already in localStorage
  useEffect(() => {
    const storedData = localStorage.getItem("userDetails");
    if (storedData) {
      // Parse and use stored data if available
      const parsedData = JSON.parse(storedData);
      setFirstName(parsedData.firstName);
      setLastName(parsedData.lastName);
      setEmail(parsedData.email);
      setUserPicture(parsedData.userPicture);
    } else {
      // Fetch user data from API if not found in localStorage
      getUsers();
    }
  }, [userId]);

  const getUsers = async () => {
    try {
      const response = await axios.get(
        `${utils.BASE_URL}users/${userId}?populate=*`,
        {
          headers: { Authorization: `Bearer ${utils.token}` },
        }
      );
      console.log("User data fetched successfully:", response.data);

      // Update state with fetched data
      setFirstName(response.data.fname);
      setLastName(response.data.lname);
      setEmail(response.data.email);
      setUserPicture(response.data.picture);

      // Store the fetched data in localStorage
      localStorage.setItem(
        "userDetails",
        JSON.stringify({
          firstName: response.data.fname,
          lastName: response.data.lname,
          email: response.data.email,
          userPicture: response.data.picture,
        })
      );
    } catch (error) {
      console.error("Error while fetching users:", error);
      toast({
        title: "Error",
        description: "Failed to fetch user details. Please try again later.",
        status: "error",
      });
    }
  };

  // Edit Users Details API
  const editUserDetails = async () => {
    const formData = {
      fname: firstName,
      lname: lastName,
      email: email,
      picture: thumbnailImage || userPicture,
    };
    try {
      const response = await axios.put(
        `${utils.BASE_URL}users/${userId}`,
        formData,
        {
          headers: { Authorization: `Bearer ${utils.token}` },
        }
      );
      console.log("User data updated successfully:", response.data);
      toast({
        title: "Success",
        description: "User details have been updated.",
        status: "success",
      });

      // Update local storage with the new data
      localStorage.setItem(
        "userDetails",
        JSON.stringify({
          firstName: response.data.fname,
          lastName: response.data.lname,
          email: response.data.email,
          userPicture: response.data.picture,
        })
      );
    } catch (error) {
      console.error("Error while updating user details:", error);
      toast({
        title: "Error",
        description: "Failed to update your details. Please try again later.",
        status: "error",
      });
    }
  };
  return (
    <>
      <section className="bg-[#F7F7F7] flex flex-col lg:flex-row  gap-7 pb-5">
        <div className="2xl:basis-1/3 lg:basis-1/2 shadow-none flex  flex-col gap-7 font-semibold  text-lg">
          <h2 className="text-xl font-medium ">Details</h2>
          <p className="text-gray-600 text-base font-normal">
            your account information, here
          </p>
        </div>
        <Card className="w-full">
          <CardContent className="px-10 pt-5 pb-3">
            <div className="mb-6">
              <div className="space-y-1 pb-3">
                <Label htmlFor="firstName">First name</Label>
                <Input
                  id="firstName"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="First Name"
                  type="text"
                />
              </div>
              <div className="space-y-1 pb-3">
                <Label htmlFor="lastName">Last name</Label>
                <Input
                  id="lastName"
                  placeholder="Last Name"
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
              <div className="space-y-1 pb-3">
                <Label htmlFor="current">Account ID</Label>
                <Input id="current" placeholder="Account ID" type="text" />
              </div>
              <div className="space-y-1 pb-3">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                  type="email"
                />
              </div>
              <div className="space-y-1 pb-3">
                <Label htmlFor="current">Phone Number</Label>
                <Input
                  id="current"
                  placeholder="Phone Number"
                  type="settings"
                />
                <div className="flex flex-col  space-y-1  py-3">
                  <Label htmlFor="framework">Time zone</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a timezone" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>North America</SelectLabel>
                        <SelectItem value="est">
                          Eastern Standard Time (EST)
                        </SelectItem>
                        <SelectItem value="cst">
                          Central Standard Time (CST)
                        </SelectItem>
                        <SelectItem value="mst">
                          Mountain Standard Time (MST)
                        </SelectItem>
                        <SelectItem value="pst">
                          Pacific Standard Time (PST)
                        </SelectItem>
                        <SelectItem value="akst">
                          Alaska Standard Time (AKST)
                        </SelectItem>
                        <SelectItem value="hst">
                          Hawaii Standard Time (HST)
                        </SelectItem>
                      </SelectGroup>
                      <SelectGroup>
                        <SelectLabel>Europe & Africa</SelectLabel>
                        <SelectItem value="gmt">
                          Greenwich Mean Time (GMT)
                        </SelectItem>
                        <SelectItem value="cet">
                          Central European Time (CET)
                        </SelectItem>
                        <SelectItem value="eet">
                          Eastern European Time (EET)
                        </SelectItem>
                        <SelectItem value="west">
                          Western European Summer Time (WEST)
                        </SelectItem>
                        <SelectItem value="cat">
                          Central Africa Time (CAT)
                        </SelectItem>
                        <SelectItem value="eat">
                          East Africa Time (EAT)
                        </SelectItem>
                      </SelectGroup>
                      <SelectGroup>
                        <SelectLabel>Asia</SelectLabel>
                        <SelectItem value="msk">Moscow Time (MSK)</SelectItem>
                        <SelectItem value="ist">
                          India Standard Time (IST)
                        </SelectItem>
                        <SelectItem value="cst_china">
                          China Standard Time (CST)
                        </SelectItem>
                        <SelectItem value="jst">
                          Japan Standard Time (JST)
                        </SelectItem>
                        <SelectItem value="kst">
                          Korea Standard Time (KST)
                        </SelectItem>
                        <SelectItem value="ist_indonesia">
                          Indonesia Central Standard Time (WITA)
                        </SelectItem>
                      </SelectGroup>
                      <SelectGroup>
                        <SelectLabel>Australia & Pacific</SelectLabel>
                        <SelectItem value="awst">
                          Australian Western Standard Time (AWST)
                        </SelectItem>
                        <SelectItem value="acst">
                          Australian Central Standard Time (ACST)
                        </SelectItem>
                        <SelectItem value="aest">
                          Australian Eastern Standard Time (AEST)
                        </SelectItem>
                        <SelectItem value="nzst">
                          New Zealand Standard Time (NZST)
                        </SelectItem>
                        <SelectItem value="fjt">Fiji Time (FJT)</SelectItem>
                      </SelectGroup>
                      <SelectGroup>
                        <SelectLabel>South America</SelectLabel>
                        <SelectItem value="art">
                          Argentina Time (ART)
                        </SelectItem>
                        <SelectItem value="bot">Bolivia Time (BOT)</SelectItem>
                        <SelectItem value="brt">Brasilia Time (BRT)</SelectItem>
                        <SelectItem value="clt">
                          Chile Standard Time (CLT)
                        </SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <Card className="p-6">
                  <CardHeader className="pb-3">
                    <CardTitle>Avatar</CardTitle>
                  </CardHeader>
                  <CardContent className="p-0 m-0 flex gap-7 items-center">
                    {userPicture ? (
                      <div>
                        <img className="w-20  h-20 m-0 p-0" src={userPicture} />
                      </div>
                    ) : (
                      <div>
                        <IoPersonCircle className="w-20  h-20 m-0 p-0" />
                      </div>
                    )}

                    <div className="flex flex-col gap-2">
                      <h2 className="text-[#62605f] font-medium">
                        Recommended dimensions of <strong>IOOXIOO</strong>
                      </h2>
                      <Button
                        variant="link"
                        className="max-w-fit p-0 m-0 font-medium"
                      >
                        Change Avatar
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      <section className=" bg-[#f8f8f8] flex gap-5  py-8">
        <div className="flex min-w-[33%] gap-3 flex-col">
          <CardTitle>Social Profile</CardTitle>
          <CardDescription>
            Edit information displayed publicly in communities.
          </CardDescription>
        </div>
        <Card className="w-full">
          <CardContent className="px-10 pt-5 pb-3">
            <div className="space-y-4 ">
              <div className="grid w-full gap-1.5">
                <Label htmlFor="message-2">Bio</Label>
                <Textarea placeholder="Public Bio" id="message-2" />
              </div>
              <div className="flex flex-col  space-y-1  py-3">
                <Label htmlFor="framework">Pronoun</Label>
                <Select>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a Pronoun" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Fruits</SelectLabel>
                      <SelectItem value="apple">Apple</SelectItem>
                      <SelectItem value="banana">Banana</SelectItem>
                      <SelectItem value="blueberry">Blueberry</SelectItem>
                      <SelectItem value="grapes">Grapes</SelectItem>
                      <SelectItem value="pineapple">Pineapple</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-1 pb-3">
              <Label htmlFor="current">Location</Label>
              <Input
                id="current"
                placeholder="Public Location"
                type="settings"
              />
            </div>
          </CardContent>
        </Card>
      </section>
      <section className=" bg-[#f8f8f8] flex gap-5   py-8">
        <div className="flex min-w-[33%] gap-3 flex-col">
          <CardTitle>API Credentials</CardTitle>
          <CardDescription>
            The API credentials for this account.
          </CardDescription>
        </div>
        <Card className="w-full">
          <CardContent className="px-10 pt-5 pb-3">
            <div className="space-y-1 pb-3">
              <Label htmlFor="current">API Key</Label>
              <div className="flex gap-3 items-center">
                <Input id="current" placeholder="API Key" type="settings" />
                <PiCopyLight className="w-5 h-5" />
              </div>
            </div>
            <div className="space-y-1 pb-3">
              <Label htmlFor="current">API Secret</Label>
              <div className="flex gap-3 items-center">
                <Input id="current" placeholder="API Secret" type="settings" />
                <PiCopyLight className="w-5 h-5" />
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      <section className="bg-[#f8f8f8] py-1">
        <CardFooter className="flex justify-end items-center">
          <Button onClick={editUserDetails} className="rounded-full">
            Save
          </Button>
        </CardFooter>
      </section>
    </>
  );
};

export default AccountDetails;
