import { Button } from "@/components/ui/button";
import { format } from "date-fns";
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

  const categoryOptions = categoryData?.data.map((item) => ({
    label: item.name,
    value: item.id,
  }));

  return (
    <div className="grid grid-cols-1 gap-4 ">
      <div className="flex justify-between items-center">
        <h1 className="font-bold text-2xl">Menu</h1>

        {onAdd && (
          <Button variant="default" onClick={onAdd}>
            <PlusIcon className="h-4 w-4" />
            {addLabel}
          </Button>
        )}
      </div>
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div className="flex gap-4 items-center">
          <div className="grid grid-cols-4 gap-4 items-center">
            {/* Input with search icon */}
            <div className="relative">
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
                className="h-10 pl-10"
              />
            </div>

            <FormDatePicker
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
            <FormComboBox
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
          </div>
          <Button
            className="rounded-full"
            variant="outline"
            onClick={() =>
              setQueryParams({ from: "", to: "", category_id: "" })
            }
          >
            <RefreshCcw className="h-4 w-4" />
          </Button>
        </div>

        <div className="flex w-full items-center gap-3 sm:w-auto">
          {/* Column visibility dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                <Columns className=" h-4 w-4" /> Kolom
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
