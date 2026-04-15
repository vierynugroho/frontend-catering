import { FormInput } from "@/components/form/form-input";
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
            {mode === "edit" ? "Edit Kategori" : "Tambah Kategori"}
          </DialogTitle>
          <DialogDescription>
            {mode === "edit"
              ? "Perbarui detail kategori ini."
              : "Isi detail kategori baru."}
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="max-h-[50vh] pr-4">
          <FieldGroup className="gap-6 pb-4 px-4">
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
                  slug: e.target.value,
                }))
              }
              error={errors?.slug?.[0]}
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
