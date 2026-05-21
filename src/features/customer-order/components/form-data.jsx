import { FormInput } from "@/components/form/form-input";
import { FormSelect } from "@/components/form/form-select";
import { FormDateTimePicker } from "@/components/form/form-simple-datepicker";
import { FormTextarea } from "@/components/form/form-textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export const FormData = ({
  payloadData,
  setPayloadData,
  errors,
  checkStock,
  checkStockResult,
}) => {
  const isStockAvailable =
    checkStockResult?.data?.is_available &&
    !checkStockResult?.data?.out_of_stock;

  const isStockUnavailable = !isStockAvailable;
  return (
    <Card className="rounded-md ring-0">
      <CardHeader>
        <CardTitle className="font-semibold">Data Diri</CardTitle>
      </CardHeader>
      <CardContent className="px-4 grid grid-cols-1 gap-6 pb-8">
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

        <Separator />
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
  );
};
