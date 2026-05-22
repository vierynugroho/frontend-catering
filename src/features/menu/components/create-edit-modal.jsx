import { FormComboBox } from "@/components/form/combobox";
import { FormInput } from "@/components/form/form-input";
import { FormSelect } from "@/components/form/form-select";
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
import { FormTextarea } from "@/components/form/form-textarea";
import { FormImageUpload } from "@/components/form/form-image-select";
import { useAllCategories } from "@/features/category/hooks/use-list-all";
import { useMemo } from "react";
import { generateSlug } from "@/lib/utils";
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
  const { data } = useAllCategories({
    limit: 200,
  });

  const categoryOptions = useMemo(() => {
    return (
      data?.data?.map((item) => ({
        label: item.name,
        value: item.id,
      })) || []
    );
  }, [data]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-h-[100vh] md:max-w-3xl">
        <DialogHeader className="p-2">
          <DialogTitle>
            {mode === "edit" ? "Edit Menu" : "Tambah Menu"}
          </DialogTitle>
          <DialogDescription>
            {mode === "edit"
              ? "Perbarui detail menu ini."
              : "Isi detail menu baru."}
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="max-h-[50vh] pr-4">
          <FieldGroup className="gap-6 grid grid-cols-2 pb-4 px-4">
            <FormInput
              label="Nama"
              name="name"
              type="text"
              placeholder="Makanan sehat"
              required
              value={payloadData.name}
              onChange={(e) =>
                setPayloadData((prev) => ({
                  ...prev,
                  name: e.target.value,
                  slug: generateSlug(e.target.value),
                }))
              }
              error={errors?.name?.[0]}
            />
            <FormInput
              label="Slug"
              name="slug"
              type="text"
              placeholder="makanan-sehat"
              required
              value={payloadData.slug}
              onChange={(e) =>
                setPayloadData((prev) => ({
                  ...prev,
                  slug: generateSlug(e.target.value),
                }))
              }
              error={errors?.slug?.[0]}
            />
            <FormInput
              label="Harga"
              name="price"
              type="number"
              placeholder="2000000"
              required
              value={payloadData.price}
              onChange={(e) =>
                setPayloadData((prev) => ({
                  ...prev,
                  price: e.target.value,
                }))
              }
              error={errors?.price?.[0]}
            />
            <FormInput
              label="Min. Order"
              name="min_order"
              type="number"
              placeholder="1"
              required
              min={1}
              value={payloadData.min_order}
              onChange={(e) =>
                setPayloadData((prev) => ({
                  ...prev,
                  min_order: e.target.value === "" ? "" : Number(e.target.value),
                }))
              }
              error={errors?.min_order?.[0]}
            />
            <FormComboBox
              label="Kategori"
              name="category_id"
              required
              placeholder="Pilih Kategori"
              options={categoryOptions}
              value={payloadData.category_id}
              onChange={(val) =>
                setPayloadData((prev) => ({
                  ...prev,
                  category_id: val,
                }))
              }
              error={errors?.category_id?.[0]}
            />

            <FormSelect
              label="Status"
              name="status"
              placeholder="Select status"
              value={payloadData.is_active}
              onChange={(val) =>
                setPayloadData((prev) => ({
                  ...prev,
                  is_active: val,
                }))
              }
              options={[
                { label: "Aktif", value: true },
                { label: "Tidak Aktif", value: false },
              ]}
              error={errors?.is_active?.[0]}
            />
            <FormTextarea
              containerClassName="col-span-2"
              label="Description"
              name="description"
              placeholder="Enter description..."
              value={payloadData.description}
              onChange={(e) =>
                setPayloadData((prev) => ({
                  ...prev,
                  description: e.target.value,
                }))
              }
              error={errors?.description?.[0]}
            />
            <FormImageUpload
              containerClassName="col-span-2"
              label="Upload Images"
              name="images"
              value={payloadData.images}
              required
              onChange={(val) =>
                setPayloadData((prev) => ({
                  ...prev,
                  images: val,
                }))
              }
              error={errors?.images?.[0]}
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
