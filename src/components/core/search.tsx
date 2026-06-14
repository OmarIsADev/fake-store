import { SearchIcon } from "lucide-react";
import Button from "../ui/button";
import Input from "../ui/input";
import { useStore } from "../../context/store-context";

function Search({ className }: { className?: string }) {
  const { searchQuery, setSearchQuery } = useStore();

  return (
    <Input
      classNames={{ wrapper: className }}
      placeholder="Search Products"
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
      Suffix={
        <Button className="rounded-full bg-primary/40" size="icon">
          <SearchIcon size={16} />
        </Button>
      }
    />
  );
}

export default Search;
