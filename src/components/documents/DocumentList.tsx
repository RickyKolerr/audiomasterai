import { Card, CardContent } from "@/components/ui/card";
import { FileText, MoreVertical, Download, Trash2, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ScrollArea } from "@/components/ui/scroll-area";

// Mock data - will be replaced with real data from backend
const documents = [
  { id: 1, name: "Project Proposal.pdf", type: "PDF", size: "2.5 MB", date: "2024-02-02" },
  { id: 2, name: "Financial Report.xlsx", type: "Excel", size: "1.8 MB", date: "2024-02-01" },
  { id: 3, name: "Meeting Notes.docx", type: "Word", size: "856 KB", date: "2024-01-31" },
  { id: 4, name: "Presentation.pptx", type: "PowerPoint", size: "4.2 MB", date: "2024-01-30" },
];

const DocumentList = () => {
  return (
    <ScrollArea className="h-[600px] rounded-md">
      <div className="grid gap-4">
        {documents.map((doc) => (
          <Card key={doc.id} className="bg-black/50 border border-green-500/20 hover:border-green-500/40 transition-all">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-green-500/10 rounded-lg">
                    <FileText className="w-6 h-6 text-green-500" />
                  </div>
                  <div>
                    <h3 className="font-medium text-white">{doc.name}</h3>
                    <p className="text-sm text-gray-400">
                      {doc.type} • {doc.size} • {doc.date}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
                    <Download className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
                    <Share2 className="w-4 h-4" />
                  </Button>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
                        <MoreVertical className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-48">
                      <DropdownMenuItem className="text-red-500 focus:text-red-500">
                        <Trash2 className="w-4 h-4 mr-2" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </ScrollArea>
  );
};

export default DocumentList;