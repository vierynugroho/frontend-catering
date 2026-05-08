import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  ChevronDown,
  SearchIcon,
  PlusIcon,
  Columns,
  RefreshCcw,
} from "lucide-react";
import { FormDatePicker } from "@/components/form/form-datepicker";
import { useState } from "react";
import { FormComboBox } from "@/components/form/combobox";
import { useCategories } from "@/features/category/hooks/use-list";

export const TableToolbar = ({
  table,
  queryParams,
  setQueryParams,
  onAdd,
  addLabel = "Tambah",
}) => {
  const { data: categoryData } = useCategories({
    limit: 500,
  });

  const categoryOptions =
    categoryData?.data?.map((item) => ({
      label: item.name,
      value: item.id,
    })) || [];

  return (
    <div className="grid grid-cols-1 gap-4">
      <div className="flex justify-between items-center">
        <h1 className="font-bold text-xl sm:text-2xl">Menu</h1>

        {onAdd && (
          <Button variant="default" onClick={onAdd} className="w-auto">
            <PlusIcon className="h-4 w-4 sm:mr-2" />
            <span className="hidden sm:inline">{addLabel}</span>
          </Button>
        )}
      </div>
      <div className="mb-4 flex flex-col xl:flex-row items-start xl:items-center justify-between gap-4">
        <div className="flex flex-col md:flex-row flex-wrap items-stretch md:items-center gap-3 w-full xl:w-auto xl:flex-1">
          <div className="relative w-full md:w-60 lg:w-72">
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

          <div className="flex w-full sm:w-auto gap-2 items-center">
            <FormComboBox
              containerClassName="w-full sm:w-48"
              name="category_id"
              required
              placeholder="Kategori"
              options={categoryOptions}
              value={queryParams.category_id}
              onChange={(val) =>
                setQueryParams((prev) => ({
                  ...prev,
                  category_id: val,
                }))
              }
            />
            <Button
              className="rounded-full shrink-0"
              variant="outline"
              size="icon"
              onClick={() =>
                setQueryParams((prev) => ({
                  ...prev,
                  from: "",
                  to: "",
                  category_id: "",
                }))
              }
            >
              <RefreshCcw className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="flex w-full xl:w-auto items-center gap-3">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="w-full xl:w-auto">
                <Columns className="mr-2 h-4 w-4" /> Kolom
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {table
                ?.getAllColumns()
                .filter((column) => column.getCanHide())
                .map((column) => (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
};
