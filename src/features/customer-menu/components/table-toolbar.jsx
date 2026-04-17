import { FormDatePicker } from "@/components/form/form-datepicker";
import { Input } from "@/components/ui/input";
import { ChevronDown, SearchIcon } from "lucide-react";

export const TableToolbar = ({ queryParams, setQueryParams }) => {
  return (
    <div className="grid px-1 grid-cols-1 gap-3 md:gap-4">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-3 md:gap-4">
        <h1 className="font-bold text-xl md:text-2xl">Menu</h1>

        <div className="relative w-full md:w-auto flex-1 md:flex-none md:min-w-fit">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
            <SearchIcon className="h-4 md:h-5 w-4 md:w-5" />
          </span>
          <Input
            placeholder="Cari berdasarkan nama..."
            value={queryParams.search}
            onChange={(e) =>
              setQueryParams((prev) => ({
                ...prev,
                search: e.target.value,
              }))
            }
            className="h-9 md:h-10 pl-10 w-full text-sm md:text-base"
          />
        </div>
      </div>
    </div>
  );
};
