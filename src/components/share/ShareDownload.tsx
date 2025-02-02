import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Facebook,
  Twitter,
  Share2,
  Download,
  Link,
  WhatsApp,
  Copy,
  CheckCircle2,
} from "lucide-react";

const ShareDownload = () => {
  const { toast } = useToast();
  const [format, setFormat] = useState<string>("mp3");
  const [copied, setCopied] = useState(false);

  const handleShare = (platform: string) => {
    // Mock share functionality - to be connected to backend
    toast({
      title: "Shared Successfully",
      description: `Shared to ${platform}`,
    });
  };

  const handleDownload = () => {
    // Mock download functionality - to be connected to backend
    toast({
      title: "Download Started",
      description: `Downloading in ${format.toUpperCase()} format`,
    });
  };

  const handleCopyLink = () => {
    // Mock copy link functionality - to be connected to backend
    const dummyLink = "https://youraudiobook.com/share/abc123";
    navigator.clipboard.writeText(dummyLink);
    setCopied(true);
    toast({
      title: "Link Copied",
      description: "Share link has been copied to clipboard",
    });
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="share-section" className="py-20 bg-black">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <Card className="bg-black/50 border border-gray-800">
            <CardHeader>
              <CardTitle className="text-2xl text-white">
                Share & Download Your Audiobook
              </CardTitle>
              <CardDescription>
                Share your audiobook with others or download it for offline listening
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Share Options */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-white">Share</h3>
                <div className="flex flex-wrap gap-3">
                  <Button
                    variant="outline"
                    className="bg-blue-500/10 hover:bg-blue-500/20 border-blue-500/50"
                    onClick={() => handleShare("Facebook")}
                  >
                    <Facebook className="mr-2 h-4 w-4" />
                    Facebook
                  </Button>
                  <Button
                    variant="outline"
                    className="bg-sky-500/10 hover:bg-sky-500/20 border-sky-500/50"
                    onClick={() => handleShare("Twitter")}
                  >
                    <Twitter className="mr-2 h-4 w-4" />
                    Twitter
                  </Button>
                  <Button
                    variant="outline"
                    className="bg-green-500/10 hover:bg-green-500/20 border-green-500/50"
                    onClick={() => handleShare("WhatsApp")}
                  >
                    <WhatsApp className="mr-2 h-4 w-4" />
                    WhatsApp
                  </Button>
                  <Button
                    variant="outline"
                    className="bg-purple-500/10 hover:bg-purple-500/20 border-purple-500/50"
                    onClick={handleCopyLink}
                  >
                    {copied ? (
                      <CheckCircle2 className="mr-2 h-4 w-4" />
                    ) : (
                      <Copy className="mr-2 h-4 w-4" />
                    )}
                    Copy Link
                  </Button>
                </div>
              </div>

              {/* Download Options */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-white">Download</h3>
                <div className="flex flex-wrap gap-3 items-center">
                  <Select
                    value={format}
                    onValueChange={setFormat}
                  >
                    <SelectTrigger className="w-[180px] bg-black/50">
                      <SelectValue placeholder="Select format" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="mp3">MP3</SelectItem>
                      <SelectItem value="wav">WAV</SelectItem>
                      <SelectItem value="m4a">M4A</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button
                    onClick={handleDownload}
                    className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600"
                  >
                    <Download className="mr-2 h-4 w-4" />
                    Download
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default ShareDownload;