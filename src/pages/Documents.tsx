import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import DocumentList from "@/components/documents/DocumentList";
import DocumentUpload from "@/components/documents/DocumentUpload";
import { Button } from "@/components/ui/button";
import { Plus, Filter } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

const Documents = () => {
  const [filterOpen, setFilterOpen] = useState(false);

  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />
      <div className="container mx-auto px-4 py-24">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-2">
              My
              <span className="bg-gradient-to-r from-green-500 via-blue-500 to-pink-500 text-transparent bg-clip-text"> Documents</span>
            </h1>
            <p className="text-gray-400">Manage and organize your documents</p>
          </div>
          <div className="flex gap-4">
            <Sheet open={filterOpen} onOpenChange={setFilterOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" className="gap-2">
                  <Filter className="w-4 h-4" />
                  Filters
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Filter Documents</SheetTitle>
                </SheetHeader>
                <div className="py-4">
                  {/* Filter options will be added here when connected to backend */}
                </div>
              </SheetContent>
            </Sheet>
            <DocumentUpload />
          </div>
        </div>
        <DocumentList />
      </div>
      <Footer />
    </main>
  );
};

export default Documents;