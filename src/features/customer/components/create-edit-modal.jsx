import { FormInput } from "@/components/form/form-input";
import { FormSelect } from "@/components/form/form-select";
import { FormTextarea } from "@/components/form/form-textarea";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { FieldGroup } from "@/components/ui/field";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Spinner } from "@/components/ui/spinner";

export function CreateEditModal({
  isOpen,
  mode,
  onClose,
  onSubmit,
  isPending,
  setPayloadData,
  payloadData,
  errors,
}) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-h-[100vh] md:max-w-2xl">
        <DialogHeader className="p-2">
          <DialogTitle>
            {mode === "edit" ? "Edit Pelanggan" : "Tambah Pelanggan"}
          </DialogTitle>
          <DialogDescription>
            {mode === "edit"
              ? "Perbarui detail Pelanggan ini."
              : "Isi detail Pelanggan baru."}
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="max-h-[50vh] pr-4">
          <FieldGroup className="gap-6 grid grid-cols-2 pb-4 px-4">
            <FormInput
              label="Nama"
              name="fullname"
              type="text"
              placeholder="Masukan nama lengkap"
              required
              value={payloadData.fullname}
              onChange={(e) =>
                setPayloadData((prev) => ({
                  ...prev,
                  fullname: e.target.value,
                }))
              }
              error={errors?.fullname?.[0]}
            />
            <FormInput
              label="Email"
              name="email"
              type="text"
              placeholder="@user.com"
              required
              value={payloadData.email}
              onChange={(e) =>
                setPayloadData((prev) => ({
                  ...prev,
                  email: e.target.value,
                }))
              }
              error={errors?.email?.[0]}
            />
            <FormInput
              label="Password"
              name="password"
              type="password"
              required
              value={payloadData.password}
              onChange={(e) =>
                setPayloadData((prev) => ({
                  ...prev,
                  password: e.target.value,
                }))
              }
              error={errors?.password?.[0]}
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
              label="Role"
              name="role"
              placeholder="Select role"
              required
              value={payloadData.role}
              onChange={(val) =>
                setPayloadData((prev) => ({
                  ...prev,
                  role: val,
                }))
              }
              options={[
                { label: "Admin", value: "admin" },
                { label: "Customer", value: "customer" },
              ]}
              error={errors?.role?.[0]}
            />
            {payloadData.role === "customer" && (
              <FormSelect
                label="Tipe pelanggan"
                name="customer_type"
                placeholder="Pilih tipe pelanggan"
                required
                value={payloadData.customer_type}
                onChange={(val) =>
                  setPayloadData((prev) => ({
                    ...prev,
                    customer_type: val,
                  }))
                }
                options={[
                  { label: "Pelanggan Baru", value: "new_customer" },
                  { label: "Pelanggan Reguler", value: "reguler_customer" },
                ]}
                error={errors?.customer_type?.[0]}
              />
            )}
            <FormTextarea
              containerClassName="col-span-2"
              required
              label="Alamat"
              name="address"
              placeholder="Masukan alamat"
              value={payloadData.address}
              onChange={(e) =>
                setPayloadData((prev) => ({
                  ...prev,
                  address: e.target.value,
                }))
              }
              error={errors?.address?.[0]}
            />
          </FieldGroup>
        </ScrollArea>
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" className="h-11" variant="outline">
              Batalkan
            </Button>
          </DialogClose>
          <Button className="h-11" onClick={onSubmit} disabled={isPending}>
            {isPending && <Spinner />}
            {mode === "edit" ? "Simpan" : "Buat"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
