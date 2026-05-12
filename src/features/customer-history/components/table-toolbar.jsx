import { FormComboBox } from "@/components/form/combobox";
import { FormDateRangePicker } from "@/components/form/form-simple-daterange";

import { Input } from "@/components/ui/input";
import { OrderStatus, ShippingStatus } from "@/types/enums";
import { SearchIcon } from "lucide-react";

export const TableToolbar = ({
  range,
  setRange,
  queryParams,
  setQueryParams,
}) => {
  return (
    <div className="flex flex-col gap-5 mb-6 px-2 sm:px-0">
      {/* 1. Header Section */}
      <div className="flex items-center justify-between">
        <h1 className="font-bold text-xl sm:text-2xl tracking-tight">
          Detail Riwayat Pemesanan
        </h1>
      </div>

      {/* 2. Controls Section */}
      <div className="flex flex-col gap-3">
        {/* Baris Atas: Search & Date Range */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 w-full">
          {/* Search Input */}
          <div className="relative w-full sm:max-w-xs">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
              <SearchIcon className="h-5 w-5" />
            </span>
            <Input
              placeholder="Cari berdasarkan kode atau nama..."
              value={queryParams?.search}
              onChange={(e) =>
                setQueryParams((prev) => ({
                  ...prev,
                  search: e.target.value,
                }))
              }
              className="h-10 pl-10 w-full"
            />
          </div>

          {/* Date Picker (Didorong ke kanan di layar besar) */}
          <div className="w-full sm:w-auto">
            <FormDateRangePicker
              containerClassName="w-full sm:w-[280px]"
              showLabel={false}
              value={range}
              onChange={setRange}
            />
          </div>
        </div>

        {/* Baris Bawah: Kumpulan Filter ComboBox */}
        <div className="flex flex-col sm:flex-row flex-wrap items-center gap-3 w-full">
          <FormComboBox
            containerClassName="w-full sm:w-[300px]"
            name="shipping_status"
            required
            placeholder="Status Pengiriman"
            options={ShippingStatus}
            value={queryParams?.shipping_status}
            onChange={(val) =>
              setQueryParams((prev) => ({
                ...prev,
                shipping_status: val,
              }))
            }
          />

          <FormComboBox
            containerClassName="w-full sm:w-[200px]"
            name="order_status"
            required
            placeholder="Status Pesanan"
            options={OrderStatus}
            value={queryParams?.order_status}
            onChange={(val) =>
              setQueryParams((prev) => ({
                ...prev,
                order_status: val,
              }))
            }
          />

          <FormComboBox
            containerClassName="w-full sm:w-[200px]"
            name="delivery_method"
            required
            placeholder="Jenis Pengiriman"
            options={[
              { label: "Dikirim", value: "dikirim" },
              { label: "Ambil Sendiri", value: "ambil_sendiri" },
            ]}
            value={queryParams?.delivery_method}
            onChange={(val) =>
              setQueryParams((prev) => ({
                ...prev,
                delivery_method: val,
              }))
            }
          />
        </div>
      </div>
    </div>
  );
};
