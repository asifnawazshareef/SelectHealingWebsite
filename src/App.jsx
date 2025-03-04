import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./Pages/Home";
import Courses from "./Pages/Courses";
import Podcasts from "./Pages/Podcasts";
import Community from "./Pages/Community";
import Newsletters from "./Pages/Newsletters";
import Downloads from "./Pages/Downloads";
import Settings from "./Pages/Settings";
import AppLayout from "./Components/layout/AppLayout";
import Sidebar from "./Components/SidebarComponent";
import CourseDetails from "./Pages/CourseDetails";
import AddNewsletter from "./Pages/AddNewsletter";
import AddCourse from "./Pages/AddCourse";
import AddRoom from "./Pages/AddRoom";
import ProtectedRoute from "./Components/ProtectedRoute";
import AddPodcast from "./Pages/AddPodcast";
import AddDownload from "./Pages/AddDownload";
import Sales from "./Pages/Sales";
import NewDownload from "./Pages/NewDownload";
import NewOffer from "./Pages/NewOffer";
import CreateOffer from "./Pages/CreateOffer";
import AccountDetails from "./Pages/AccountDetails";
import OfferDetails from "./Pages/OfferDetails";
import Offers from "./Pages/Offers";
import PodcastsListing from "./Pages/PodcastsListing";
import PodcastDetails from "./Pages/PodcastDetails";
import AddCommunity from "./Pages/AddCommunity";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CommunityDetails from "./Pages/CommunityDetails";
import AddOfferByCourse from "./Pages/AddOfferByCourse";
import AddOffer from "./Pages/AddOffer";
import LoginForm from "./Pages/LoginForm";
const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <ProtectedRoute>
          <AppLayout />
        </ProtectedRoute>
      ),
      children: [
        {
          path: "/",
          element: <Sidebar />,
          children: [
            { path: "/", element: <Home /> },
            { path: "/courses", element: <Courses /> },
            { path: "/podcasts", element: <Podcasts /> },
            { path: "/podcast-detail/:id", element: <PodcastDetails /> },
            { path: "/podcastsListing", element: <PodcastsListing /> },
            { path: "/community", element: <Community /> },
            { path: "/community-details", element: <CommunityDetails /> },
            { path: "/downloads", element: <Downloads /> },
            { path: "/settings", element: <Settings /> },
            { path: "/newsletters", element: <Newsletters /> },
            { path: "/add-newsletter", element: <AddNewsletter /> },
            { path: "/add-download", element: <AddDownload /> },
            { path: "/sales", element: <Sales /> },
            { path: "/account-details", element: <AccountDetails /> },
            { path: "/offer-details/:id", element: <OfferDetails /> },
            { path: "/add-offer/:id", element: <AddOfferByCourse /> },
            { path: "/add-offer", element: <AddOffer /> },
            { path: "/add-room", element: <AddRoom /> },
            { path: "/offers", element: <Offers /> },
            { path: "/course-detail/:id", element: <CourseDetails /> },
          ],
        },
      ],
    },
    {
      path: "/add-course",
      element: (
        <ProtectedRoute>
          <AddCourse />
        </ProtectedRoute>
      ),
    },
    {
      path: "/add-podcast",
      element: (
        <ProtectedRoute>
          <AddPodcast />
        </ProtectedRoute>
      ),
    },
    {
      path: "/add-community",
      element: (
        <ProtectedRoute>
          <AddCommunity />
        </ProtectedRoute>
      ),
    },
    {
      path: "/new-download",
      element: (
        <ProtectedRoute>
          <NewDownload />
        </ProtectedRoute>
      ),
    },
    {
      path: "/new-offer",
      element: (
        <ProtectedRoute>
          <NewOffer />
        </ProtectedRoute>
      ),
    },
    {
      path: "/login",
      element: <LoginForm />,
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer />
    </>
  );
};

export default App;
