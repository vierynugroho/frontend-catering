import { FormDatePicker } from "@/components/form/form-datepicker";
import { Input } from "@/components/ui/input";
import { ChevronDown, SearchIcon } from "lucide-react";

export const TableToolbar = ({ queryParams, setQueryParams }) => {
  return (
    <div className="grid grid-cols-1 gap-4 ">
      <div className="flex justify-between items-center">
        <h1 className="font-bold text-2xl">Menu</h1>

        <div className="flex items-center gap-4">
          <FormDatePicker
            containerClassName="w-3/12"
            name="from"
            placeholder="Tanggal mulai"
            value={queryParams.from}
            onChange={(val) =>
              setQueryParams((prev) => ({
                ...prev,
                from: val,
              }))
            }
            showLabel={false}
          />
          <FormDatePicker
            containerClassName="w-3/12"
            placeholder="Tanggal selesai"
            name="to"
            value={queryParams.to}
            onChange={(val) =>
              setQueryParams((prev) => ({
                ...prev,
                to: val,
              }))
            }
            showLabel={false}
          />
          <div className="relative w-6/12">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
              <SearchIcon className="h-5 w-5" />
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
              className="h-10 pl-10 w-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
