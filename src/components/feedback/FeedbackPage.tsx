import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import FeedbackForm from "./FeedbackForm";
import { MessageSquare } from "lucide-react";
import Testimonials from "@/components/Testimonials";

const FeedbackPage = () => {
  return (
    <section className="py-20 bg-black">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Your Opinion
            <span className="bg-gradient-to-r from-green-500 via-blue-500 to-pink-500 text-transparent bg-clip-text">
              {" "}
              Matters
            </span>
          </h2>
          <p className="text-gray-400 mb-8">
            Help us improve our services by sharing your experience
          </p>

          <Dialog>
            <DialogTrigger asChild>
              <Button
                size="lg"
                className="bg-gradient-to-r from-green-500 to-blue-500 hover:shadow-lg hover:shadow-green-500/20"
              >
                <MessageSquare className="mr-2 h-5 w-5" />
                Share Your Feedback
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] bg-gray-900 text-white">
              <DialogHeader>
                <DialogTitle>Share Your Feedback</DialogTitle>
                <DialogDescription className="text-gray-400">
                  Your feedback helps us improve our service for everyone.
                </DialogDescription>
              </DialogHeader>
              <FeedbackForm />
            </DialogContent>
          </Dialog>
        </div>

        {/* Display existing testimonials */}
        <div className="mt-20">
          <h3 className="text-2xl font-bold text-center mb-12">
            What Others Are Saying
          </h3>
          <Testimonials />
        </div>
      </div>
    </section>
  );
};

export default FeedbackPage;
