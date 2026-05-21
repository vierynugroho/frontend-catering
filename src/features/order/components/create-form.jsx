import { FormComboBox } from "@/components/form/combobox";
import { FormInput } from "@/components/form/form-input";
import { FormSelect } from "@/components/form/form-select";
import { FormDateTimePicker } from "@/components/form/form-simple-datepicker";
import { FormTextarea } from "@/components/form/form-textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";
import { Plus, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useMemo } from "react";

export default function CreateOrderForm({
  menuData,
  payloadData,
  setPayloadData,
  errors,
  checkStock,
  checkStockResult,
  handleOrder,
  isPending,
}) {
  const route = useRouter();
  const isStockUnavailable =
    checkStockResult && checkStockResult?.data?.is_available === false;

  const menuOptions = useMemo(() => {
    return (
      menuData?.data?.map((item) => ({
        label: item.name,
        value: item.id,
      })) || []
    );
  }, [menuData]);

  const addItem = () => {
    setPayloadData((prev) => ({
      ...prev,
      items: [...prev.items, { menu_id: "", quantity: 1 }],
    }));
  };

  const removeItem = (index) => {
    setPayloadData((prev) => ({
      ...prev,
      items: prev.items.filter((_, i) => i !== index),
    }));
  };

  const handleItemChange = (index, field, value) => {
    const updatedItems = [...payloadData.items];
    updatedItems[index] = {
      ...updatedItems[index],
      [field]: field === "quantity" ? parseInt(value) || 0 : value,
    };
    setPayloadData((prev) => ({
      ...prev,
      items: updatedItems,
    }));
  };

  return (
    <div className="grid grid-cols-1 gap-6">
      {/* informasi umum */}
      <Card>
        <CardHeader>
          <CardTitle>Informasi Umum</CardTitle>
        </CardHeader>
        <CardContent>
          <FormDateTimePicker
            label="Waktu Pengambilan Pesanan"
            required
            name="order_date"
            placeholder="Tanggal order"
            value={payloadData.order_date}
            onChange={(val) => {
              setPayloadData((prev) => ({
                ...prev,
                order_date: val,
              }));
              checkStock.mutate({ order_date: val });
            }}
            disabled={checkStock.isPending}
            error={
              errors?.order_date?.[0] ||
              (isStockUnavailable && ["Tanggal order tidak tersedia"])
            }
          />
        </CardContent>
      </Card>

      {/* informasi pemesan */}
      <Card>
        <CardHeader>
          <CardTitle>Informasi Pemesan</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 gap-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormInput
              label="Nama"
              name="customer_name"
              type="text"
              placeholder="John Doe"
              required
              value={payloadData.customer_name}
              onChange={(e) =>
                setPayloadData((prev) => ({
                  ...prev,
                  customer_name: e.target.value,
                }))
              }
              error={errors?.customer_name?.[0]}
            />
            <FormInput
              label="Telepon"
              name="phone"
              type="text"
              placeholder="08123423223"
              required
              value={payloadData.phone}
              onChange={(e) =>
                setPayloadData((prev) => ({
                  ...prev,
                  phone: e.target.value,
                }))
              }
              error={errors?.phone?.[0]}
            />

            <FormSelect
              label="Metode Pengiriman"
              name="delivery_method"
              placeholder="Pilih Metode Pengiriman"
              required
              value={payloadData.delivery_method}
              onChange={(val) =>
                setPayloadData((prev) => ({
                  ...prev,
                  delivery_method: val,
                }))
              }
              options={[
                { label: "Dikirim", value: "dikirim" },
                { label: "Ambil Sendiri", value: "ambil_sendiri" },
              ]}
              error={errors?.delivery_method?.[0]}
            />
            {payloadData.delivery_method === "dikirim" && (
              <FormInput
                label="Tempat Pengiriman"
                name="destination"
                type="text"
                placeholder="Jakarta, Bandung, dsb"
                value={payloadData.destination}
                onChange={(e) =>
                  setPayloadData((prev) => ({
                    ...prev,
                    destination: e.target.value,
                  }))
                }
                error={errors?.destination?.[0]}
              />
            )}
          </div>
          <FormTextarea
            label="Catatan"
            name="note"
            placeholder="Masukan catatan"
            value={payloadData.note}
            onChange={(e) =>
              setPayloadData((prev) => ({
                ...prev,
                note: e.target.value,
              }))
            }
            error={errors?.note?.[0]}
          />
        </CardContent>
      </Card>

      {/* Informasi Menu */}

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Informasi Menu</CardTitle>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={addItem}
            className="flex items-center gap-2"
          >
            <Plus className="w-4 h-4" /> Tambah Menu
          </Button>
        </CardHeader>
        <CardContent className="grid grid-cols-1 gap-4">
          {payloadData?.items?.length === 0 && (
            <p className="text-sm text-muted-foreground text-center py-4">
              Belum ada menu yang dipilih. Klik Tambah Menu.
            </p>
          )}

          {payloadData?.items?.map((item, index) => {
            const availableMenuOptions = menuOptions.filter((option) => {
              const isAlreadySelected = payloadData.items.some(
                (selectedItem, i) =>
                  selectedItem.menu_id === option.value && i !== index,
              );
              return !isAlreadySelected;
            });

            return (
              <div
                key={index}
                className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end  pb-4 "
              >
                <div className="md:col-span-7">
                  <FormComboBox
                    label="Pilih Menu"
                    placeholder="Cari menu..."
                    // 2. Gunakan opsi yang sudah difilter
                    options={availableMenuOptions}
                    value={item.menu_id}
                    onChange={(val) => handleItemChange(index, "menu_id", val)}
                    error={errors?.[`items.${index}.menu_id`]}
                  />
                </div>

                <div className="md:col-span-3">
                  <FormInput
                    label="Quantity"
                    type="number"
                    min="1"
                    placeholder="0"
                    value={item.quantity}
                    onChange={(e) =>
                      handleItemChange(index, "quantity", e.target.value)
                    }
                    error={errors?.[`items.${index}.quantity`]}
                  />
                </div>
                <div className="md:col-span-2">
                  <Button
                    type="button"
                    variant="destructive"
                    size="icon"
                    onClick={() => removeItem(index)}
                    className="w-full h-10 md:w-full"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            );
          })}
          {errors?.items && typeof errors.items === "string" && (
            <p className="text-red-500 text-sm">{errors.items}</p>
          )}
        </CardContent>
      </Card>

      <div className="flex flex-row justify-end gap-4">
        <Button
          type="button"
          className="h-11"
          variant="outline"
          onClick={() => route.push("/admin/order")}
        >
          Batalkan
        </Button>
        <Button className="h-11" disabled={isPending} onClick={handleOrder}>
          {isPending && <Spinner />}
          Buat Pesanan
        </Button>
      </div>
    </div>
  );
}
