import { Tabs, TabsList, TabsTrigger } from "@/ui/tabs";
import SettingsTabsContent from "../Components/SettingsTabsContent";
import PostTabsContent from "../Components/PostTabsContent";
const AddNewsletter = () => {
  return (
    <div className="">
      <Tabs defaultValue="post" className="max-w-5xl mx-auto min-h-screen">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="post">Post</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>
        <SettingsTabsContent />
        <PostTabsContent />
      </Tabs>
    </div>
  );
};

export default AddNewsletter;
