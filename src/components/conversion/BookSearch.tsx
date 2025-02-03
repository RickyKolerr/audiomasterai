import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Book {
  id: string;
  title: string;
}

interface BookSearchProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedBook: string;
  onBookSelect: (bookId: string) => void;
  availableBooks: Book[];
}

const BookSearch = ({
  searchQuery,
  onSearchChange,
  selectedBook,
  onBookSelect,
  availableBooks,
}: BookSearchProps) => {
  const filteredBooks = availableBooks.filter((book) =>
    book.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-4">
      <div className="flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search available books..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-8"
          />
        </div>
      </div>

      <Select value={selectedBook} onValueChange={onBookSelect}>
        <SelectTrigger>
          <SelectValue placeholder="Select a book" />
        </SelectTrigger>
        <SelectContent>
          {filteredBooks.map((book) => (
            <SelectItem key={book.id} value={book.id}>
              {book.title}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default BookSearch;