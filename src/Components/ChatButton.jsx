import { Dialog, DialogTrigger, DialogContent } from "@/ui/dialog";
import { MessageSquareText } from "lucide-react";
import { Button } from "@/ui/button";
const ChatButton = () => {
  return (
    <div>
      {/* Chat Floating Button */}
      <Dialog>
        <DialogTrigger asChild>
          <button
            className="fixed bottom-4 right-4 p-4 text-white bg-[#242122] rounded-full shadow-lg hover:bg-[#574e51] focus:outline-none focus:ring-4 focus:ring-blue-300"
            aria-label="Open Chat"
          >
            <MessageSquareText className="text-3xl" />
          </button>
        </DialogTrigger>
        <DialogContent>
          <div className="flex flex-col items-start space-y-4">
            <h3 className="text-lg font-semibold">Chat with us</h3>
            <p className="text-gray-600">
              How can we help you? Start a conversation or ask a question.
            </p>
            <textarea
              placeholder="Type your message here..."
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            ></textarea>
            <Button className="self-end">Send</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ChatButton;
