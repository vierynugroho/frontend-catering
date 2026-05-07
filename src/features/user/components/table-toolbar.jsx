import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { ChevronDown, SearchIcon, PlusIcon, Columns } from "lucide-react";

export const TableToolbar = ({
  table,
  queryParams,
  setQueryParams,
  onAdd,
  addLabel = "Tambah",
}) => {
  return (
    <div className="grid grid-cols-1 gap-4">
      <div className="flex justify-between items-center">
        <h1 className="font-bold text-xl sm:text-2xl">Pengguna</h1>

        {onAdd && (
          <Button variant="default" onClick={onAdd} className="w-auto">
            <PlusIcon className="h-4 w-4 sm:mr-2" />
            <span className="hidden sm:inline">{addLabel}</span>
          </Button>
        )}
      </div>
      <div className="mb-4 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div className="relative w-full sm:w-72">
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

        <div className="flex w-full sm:w-auto items-center gap-3">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="w-full sm:w-auto">
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