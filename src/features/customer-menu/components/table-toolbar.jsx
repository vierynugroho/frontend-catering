import { FormComboBox } from "@/components/form/combobox";
import { FormDatePicker } from "@/components/form/form-datepicker"; // Jika tidak digunakan, Anda bisa menghapusnya
import { Input } from "@/components/ui/input";
import { OrderStatus } from "@/types/enums";
import { ChevronDown, SearchIcon } from "lucide-react";
import { usePublicCategory } from "../hooks/use-list";

export const TableToolbar = ({ queryParams, setQueryParams }) => {
  const { data } = usePublicCategory({ limit: 500 });

  const categoryOptions = data?.data?.map((item) => ({
    label: item.name,
    value: item.id,
  }));

  return (
    <div className="px-1 w-full">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 sm:pr-3">
        {/* Title */}
        <h1 className="font-bold text-xl md:text-2xl">Menu</h1>

        {/* Filter Controls */}
        <div className="flex flex-col sm:flex-row w-full md:w-auto gap-3">
          {/* Search Input */}
          <div className="relative w-full sm:w-auto flex-1">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
              <SearchIcon className="h-4 md:h-5 w-4 md:w-5" />
            </span>
            <Input
              placeholder="Cari berdasarkan nama..."
              value={queryParams.search || ""}
              onChange={(e) =>
                setQueryParams((prev) => ({
                  ...prev,
                  search: e.target.value,
                }))
              }
              className="h-10 pl-10 w-full text-sm"
            />
          </div>

          {/* Category Combobox */}
          <FormComboBox
            containerClassName="w-full sm:w-52"
            name="category_id"
            required
            placeholder="Kategori Menu"
            options={categoryOptions || []}
            value={queryParams.category_id}
            onChange={(val) =>
              setQueryParams((prev) => ({
                ...prev,
                category_id: val,
              }))
            }
          />
        </div>
      </div>
    </div>
  );
};
