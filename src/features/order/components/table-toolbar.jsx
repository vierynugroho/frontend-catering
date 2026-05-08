import { FormComboBox } from "@/components/form/combobox";
import { FormDateRangePicker } from "@/components/form/form-simple-daterange";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { OrderStatus, ShippingStatus } from "@/types/enums";
import { ChevronDown, SearchIcon, PlusIcon, Columns } from "lucide-react";

export const TableToolbar = ({
  range,
  setRange,
  table,
  queryParams,
  setQueryParams,
  onAdd,
  addLabel = "Tambah",
}) => {
  return (
    <div className="grid grid-cols-1 gap-4">
      <div className="flex justify-between items-center">
        <h1 className="font-bold text-xl sm:text-2xl">Pesanan</h1>

        {onAdd && (
          <Button variant="default" onClick={onAdd} className="w-auto">
            <PlusIcon className="h-4 w-4 sm:mr-2" />
            <span className="hidden sm:inline">{addLabel}</span>
          </Button>
        )}
      </div>

      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-3">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full lg:w-auto">
          <div className="relative w-full sm:w-auto">
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
              className="h-10 pl-10 w-full sm:w-60"
            />
          </div>
          <FormDateRangePicker
            containerClassName="w-full sm:w-[300px] lg:w-auto"
            showLabel={false}
            value={range}
            onChange={setRange}
          />
        </div>

        <div className="flex w-full lg:w-auto items-center gap-3">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="w-full lg:w-auto">
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

      <div className="mb-4 flex flex-col sm:flex-row flex-wrap gap-3 items-stretch sm:items-center">
        <FormComboBox
          containerClassName="w-full sm:w-72 lg:w-80"
          name="shipping_status"
          required
          placeholder="Status Pengiriman"
          options={ShippingStatus}
          value={queryParams.shipping_status}
          onChange={(val) =>
            setQueryParams((prev) => ({
              ...prev,
              shipping_status: val,
            }))
          }
        />

        <FormComboBox
          containerClassName="w-full sm:w-48 lg:w-52"
          name="order_status"
          required
          placeholder="Status Pesanan"
          options={OrderStatus}
          value={queryParams.order_status}
          onChange={(val) =>
            setQueryParams((prev) => ({
              ...prev,
              order_status: val,
            }))
          }
        />

        <FormComboBox
          containerClassName="w-full sm:w-48 lg:w-52"
          name="delivery_method"
          required
          placeholder="Jenis Pengiriman"
          options={[
            { label: "Dikirim", value: "dikirim" },
            { label: "Ambil Sendiri", value: "ambil_sendiri" },
          ]}
          value={queryParams.delivery_method}
          onChange={(val) =>
            setQueryParams((prev) => ({
              ...prev,
              delivery_method: val,
            }))
          }
        />
      </div>
    </div>
  );
};
