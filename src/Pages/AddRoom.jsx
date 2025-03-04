import React, { useState, useRef } from "react";
import axios from "axios";
import Webcam from "react-webcam";
import { FaUnlockAlt, FaTimes, FaUserCircle } from "react-icons/fa";
import { CiSettings } from "react-icons/ci";
import { BsThreeDots } from "react-icons/bs";
import { RiPictureInPicture2Fill } from "react-icons/ri";
import { GrFormClose } from "react-icons/gr";
import { toast } from "react-toastify";
import { useLocation } from "react-router-dom";
import utils from "../utils/utils";
import { FaSpinner } from "react-icons/fa6";

const AddRoom = () => {
  const [isOpen, setIsOpen] = useState(false);
  const participants = [
    { name: "John Doe" },
    { name: "Alice Smith" },
    { name: "Bob Johnson" },
    { name: "Emily Davis" },
    { name: "Michael Brown" },
    { name: "Sophia Wilson" },
  ];
  const [roomSid, setRoomSid] = useState("");
  const [roomStatus, setRoomStatus] = useState("");
  const [capturing, setCapturing] = useState(false);
  const [recordedChunks, setRecordedChunks] = useState([]);
  const [muted, setMuted] = useState(false);
  const [webcamOn, setWebcamOn] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [activeButton, setActiveButton] = useState(null);
  const [recordingSid, setRecordingSid] = useState("");
  const [roomName, setRoomName] = useState("");
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const webcamRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const location = useLocation();
  const community = location.state?.community;
  console.log(community, "single commutiy");

  const createRoom = async () => {
    if (!roomName) {
      alert("Please enter a room name.");
      return;
    }

    try {
      const response = await axios.post(
        "http://44.204.6.60:4000/api/twilio/create-room",
        { roomName },
        { headers: { "Content-Type": "application/json" } }
      );
      setRoomSid(response.data.sid);
      setRoomStatus(response.data.status);
      setShowModal(false);
      console.log(response);
      toast.success(
        `Room created successfully! Room SID: ${response.data.sid}`
      );
    } catch (error) {
      console.error(
        "Error creating room:",
        error.response?.data || error.message
      );
      toast.error(
        `Failed to create room: ${
          error.response?.data?.message || "Unknown error"
        }`
      );
    }
  };

  const startRecording = async () => {
    if (!roomSid) {
      toast.error("No room created. Create a room first.");
      return;
    }

    try {
      const response = await axios.post(
        "http://44.204.6.60:4000/api/twilio/start-recording",
        { roomSid, rules: [{ all: true, type: "include" }] },

        { headers: { "Content-Type": "application/json" } }
      );
      // setRecordingSid(response.data.sid);
      console.log(response);
      handleStartCapture();
      toast.success("Recording started successfully!");
      console.log(response);
    } catch (error) {
      console.error(
        "Error starting recording:",
        error.response?.data || error.message
      );

      toast.success(
        `Failed to start recording: ${
          error.response?.data?.message || "Unknown error"
        }`
      );
    }
  };

  const stopRecording = async () => {
    if (!roomSid) {
      toast.error("Room or recording not available. Start a recording first.");
      return;
    }

    try {
      const response = await axios.post(
        "http://44.204.6.60:4000/api/twilio/stop-recording",
        {
          roomSid,
        },
        { headers: { "Content-Type": "application/json" } }
      );

      toast.success(`Recording stopped! Status`);
      handleStopCapture();
      console.log(response);

      // Call the uploadRecordedVideo function after stopping recording
      if (recordedChunks.length > 0) {
        await uploadRecordedVideo();
      } else {
        toast.error("No recorded video to upload.");
      }
    } catch (error) {
      console.error(
        "Error stopping recording:",
        error.response?.data || error.message
      );
      toast.error(
        `Failed to stop recording: ${
          error.response?.data?.message || "Unknown error"
        }`
      );
    }
  };

  const getRoomStatus = async () => {
    if (!roomSid) {
      toast.error("No room created. Create a room first.");
      return;
    }

    try {
      const response = await axios.get(
        `http://44.204.6.60:4000/api/twilio/room-status/${roomSid}`
      );
      console.log(response.data.status);
      toast.success(`Room Status: ${response.data.status}`);
      console.log(response);
    } catch (error) {
      console.error(
        "Error fetching room status:",
        error.response?.data || error.message
      );
      toast.error(
        `Failed to get room status: ${
          error.response?.data?.message || "Unknown error"
        }`
      );
    }
  };

  const handleButtonClick = (buttonId) => {
    setActiveButton(activeButton === buttonId ? null : buttonId);
  };

  const getButtonStyle = (buttonId) => {
    return activeButton === buttonId ? "bg-red-500" : "bg-[#68716d]";
  };

  const handleStartCapture = () => {
    if (webcamOn && webcamRef.current && webcamRef.current.video.srcObject) {
      setCapturing(true);
      const stream = webcamRef.current.video.srcObject;
      mediaRecorderRef.current = new MediaRecorder(stream, {
        mimeType: "video/webm",
      });

      // Add event listener for dataavailable
      mediaRecorderRef.current.addEventListener(
        "dataavailable",
        handleDataAvailable
      );

      // Start recording with a timeslice (e.g., 1000ms) to ensure dataavailable is triggered periodically
      mediaRecorderRef.current.start(1000); // Emit dataavailable every 1 second
    }
  };

  const handleDataAvailable = ({ data }) => {
    console.log("Data available:", data); // Debugging: Log the data
    if (data.size > 0) {
      setRecordedChunks((prev) => [...prev, data]);
      console.log("Recorded Chunks Updated:", recordedChunks); // Debugging: Log the updated chunks
    }
  };
  const handleStopCapture = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setCapturing(false);
    }
    handleButtonClick("stop");
  };

  const handleDownload = () => {
    if (recordedChunks.length > 0) {
      const blob = new Blob(recordedChunks, {
        type: "video/webm",
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      document.body.appendChild(a);
      a.style = "display: none";
      a.href = url;
      a.download = "recorded-video.webm";
      a.click();
      window.URL.revokeObjectURL(url);
    }
  };

  const handleTogglePiP = async () => {
    try {
      if (webcamRef.current && webcamRef.current.video) {
        const videoElement = webcamRef.current.video;
        if (document.pictureInPictureElement) {
          await document.exitPictureInPicture();
        } else {
          await videoElement.requestPictureInPicture();
        }
      }
    } catch (error) {
      console.error("Error enabling Picture-in-Picture:", error);
    }
  };

  const handleToggleMute = () => {
    setMuted((prev) => !prev);
    handleButtonClick("mute");
  };

  const handleToggleWebcam = () => {
    setWebcamOn((prev) => !prev);
    handleButtonClick("webcam");
  };
  // end room
  const endRoom = async () => {
    try {
      const response = await axios.post(
        "http://44.204.6.60:4000/api/twilio/end-room",
        {
          roomSid: roomSid,
        },
        { headers: { "Content-Type": "application/json" } }
      );

      console.log("End Room Response:", response);
      toast.success(`Room ended successfully! Room SID: ${response.data.sid}`);
    } catch (error) {
      console.error(
        "Error while ending room:",
        error.response?.data || error.message
      );
      toast.error(
        `Failed to end room: ${
          error.response?.data?.message || error.message || "Unknown error"
        }`
      );
    }
  };

  // Function to upload the recorded video
  const uploadRecordedVideo = async () => {
    try {
      setLoading(true); // Set loading to true
      setProgress(0); // Reset progress

      console.log("Recorded Chunks before upload:", recordedChunks);

      if (recordedChunks.length === 0) {
        toast.error("No recorded video to upload.");
        return;
      }

      const blob = new Blob(recordedChunks, { type: "video/webm" });
      const formData = new FormData();
      formData.append(
        "data",
        JSON.stringify({
          title: "Recorded Video",
          description: "Recorded video from the room",
          course: community.attributes.course.data.id,
        })
      );
      formData.append("files.video", blob, "recorded-video.webm");

      for (let [key, value] of formData.entries()) {
        console.log(key, value);
      }

      const response = await axios.post(
        `http://54.173.110.62:1337/api/contents`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${utils.token}`,
          },
          onUploadProgress: (progressEvent) => {
            const progress = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            setProgress(progress); // Update progress state
            console.log(`Upload Progress: ${progress}%`);
          },
        }
      );

      console.log("API Response:", response);

      if (response.status === 200 || response.status === 201) {
        toast.success("Video uploaded successfully!");
        setRecordedChunks([]); // Clear recorded chunks after upload
      } else {
        throw new Error(`Unexpected response status: ${response.status}`);
      }
    } catch (error) {
      console.error(
        "Error uploading video:",
        error.response?.data || error.message
      );
      toast.error(
        `Failed to upload video: ${
          error.response?.data?.message || error.message || "Unknown error"
        }`
      );
    } finally {
      setLoading(false); // Set loading to false when the upload is complete or fails
    }
  };

  return (
    <main className="flex flex-col gap-5 p-6">
      <div className="flex gap-2 md:gap-4 flex-wrap">
        <button
          onClick={() => setShowModal(true)}
          className="px-4 py-1 md:py-2 w-full md:w-auto bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Create Room
        </button>
        <button
          onClick={startRecording}
          className="px-4 py-1 md:py-2 w-full md:w-auto bg-green-500 text-white rounded hover:bg-green-600"
        >
          Start Recording
        </button>
        <button
          onClick={stopRecording}
          className="px-4 py-1 md:py-2 w-full md:w-auto bg-red-500 text-white rounded hover:bg-red-600"
        >
          Stop Recording
        </button>
        <button
          onClick={getRoomStatus}
          className="px-4 py-1 md:py-2 w-full md:w-auto bg-yellow-500 text-white rounded hover:bg-yellow-600"
        >
          Get Room Status
        </button>
        <button
          onClick={endRoom}
          className="px-4 py-1 md:py-2 w-full md:w-auto bg-yellow-500 text-white rounded hover:bg-yellow-600"
        >
          End Room
        </button>
      </div>
      {loading && (
        <div>
          <FaSpinner className="spinner" /> {/* Spinner icon */}
          <p>Uploading... {progress}%</p> {/* Progress percentage */}
        </div>
      )}
      {/* {roomSid && (
        <div className="p-4 bg-gray-100 rounded shadow">
          <p>
            <strong>Room ID:</strong> {roomSid}
          </p>
          <p>
            <strong>Status:</strong> {roomStatus}
          </p>
        </div>
      )} */}

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg relative p-6 w-[300px]">
            <h3 className="text-lg font-semibold mb-4">Create Room</h3>
            <input
              type="text"
              value={roomName}
              onChange={(e) => setRoomName(e.target.value)}
              placeholder="Enter room name"
              className="border border-gray-300 p-2 rounded-md mb-4 w-full"
            />
            <div className="flex gap-4">
              <button
                onClick={createRoom}
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 w-full"
              >
                Create
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="bg-gray-300 text-black px-4 py-2 rounded-md hover:bg-gray-400 w-full"
              >
                Cancel
              </button>
            </div>
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-2 right-2"
            >
              <GrFormClose />
            </button>
          </div>
        </div>
      )}

      <section className="bg-[#e7f5fe] text-xs md:text-sm lg:text-[16px] p-3 rounded-md flex flex-col md:flex-row gap-1 justify-between items-center ">
        <h3 className="font-bold">
          You are live! &nbsp;
          <span className="font-normal">
            Members of all access groups will be notified in 48 seconds.
          </span>
        </h3>
        <button className="bg-[#0073ec] px-5 py-2 rounded-md text-white">
          Don't notify
        </button>
      </section>

      <section className="flex flex-col md:flex-row justify-between gap-1 md:items-center">
        <div className="relative">
          {/* Button to Open Modal */}
          <button
            className="bg-[#68716d] rounded-md px-4 py-2 text-white flex gap-2 text-lg items-center hover:bg-[#5a625e] transition"
            onClick={() => setIsOpen(true)}
          >
            <FaUnlockAlt className="text-red-600 text-xl" />
            <span className="text-sm md:text-base">
              {participants.length}/200
            </span>
          </button>

          {/* Modal Overlay */}
          {isOpen && (
            <div
              className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-md z-50 p-4"
              onClick={() => setIsOpen(false)}
            >
              <div
                className="bg-white rounded-xl shadow-lg p-6 w-full max-w-lg transform transition-all scale-95 hover:scale-100"
                onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal
              >
                {/* Header */}
                <div className="flex justify-between items-center border-b pb-3">
                  <h2 className="text-xl font-semibold text-gray-800">
                    Participants ({participants.length})
                  </h2>
                  <button onClick={() => setIsOpen(false)}>
                    <FaTimes className="text-gray-500 text-2xl hover:text-gray-700 transition" />
                  </button>
                </div>

                {/* Participant List */}
                <div className="mt-4 max-h-72 overflow-y-auto space-y-3">
                  {participants.map((user, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 p-3 bg-gray-100 rounded-lg hover:bg-gray-200 transition"
                    >
                      <FaUserCircle className="text-gray-600 text-3xl" />
                      <span className="text-gray-800 font-medium">
                        {user.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="flex gap-1 items-center">
          <button
            onClick={handleTogglePiP}
            className="bg-[#68716d] rounded-md px-3 py-2 text-white flex gap-1 md:gap-2 text-xl items-center"
          >
            <RiPictureInPicture2Fill />
            <span className="text-xs md:text-base">Picture in Picture</span>
          </button>
          {/* <button className="bg-[#68716d] rounded-md px-3 py-2 text-white text-xl">
            <CiSettings />
          </button>
          <button
            onClick={() => setShowModal(true)}
            className="bg-[#68716d] rounded-md px-3 py-2 text-white text-xl"
          >
            <BsThreeDots />
          </button> */}
        </div>
      </section>

      <section className="flex flex-col items-center justify-center text-white">
        <div className="relative w-full lg:w-4/6 h-[350px] rounded-md overflow-hidden shadow-2xl">
          {webcamOn ? (
            <Webcam
              audio={false}
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              videoConstraints={{ facingMode: "user" }}
              className="object-cover"
            />
          ) : (
            <div className="bg-gray-400 w-full h-full flex justify-center items-center">
              Webcam Off
            </div>
          )}
        </div>
        <div className="flex gap-2 md:gap-4 mt-3">
          {/* <button
            onClick={handleStartCapture}
            className="bg-green-500 px-3 py-2 text-xs md:text-base  rounded-md"
          >
            Start Capture
          </button>
          <button
            onClick={handleStopCapture}
            className="bg-red-500 px-3 py-2 text-xs md:text-base rounded-md"
          >
            Stop Capture
          </button> */}
          <button
            onClick={handleDownload}
            className="bg-blue-500 px-3 py-2 text-xs md:text-base rounded-md"
          >
            Download
          </button>
        </div>
      </section>
    </main>
  );
};

export default AddRoom;
