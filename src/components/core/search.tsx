import { SearchIcon } from "lucide-react";
import Button from "../ui/button";
import Input from "../ui/input";

function Search({ className }: { className?: string }) {
  return (
    <Input
      classNames={{ wrapper: className }}
      placeholder="Search Products"
      Suffix={
        <Button className="rounded-full" size="icon">
          <SearchIcon size={16} />
        </Button>
      }
    />
  );
}

export default Search;
