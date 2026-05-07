import { FormComboBox } from "@/components/form/combobox";
import { FormDatePicker } from "@/components/form/form-datepicker";
import { FormInput } from "@/components/form/form-input";
import { FormDateRangePicker } from "@/components/form/form-simple-daterange";
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

export function DownloadModal({
  isOpen,
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
          <DialogTitle>Download Report</DialogTitle>
        </DialogHeader>
        <ScrollArea className="max-h-[50vh] pr-4">
          <FieldGroup className="gap-6 pb-4 px-4">
            <div className="grid gap-6 grid-cols-2">
              <FormDatePicker
                name="from"
                placeholder="Tanggal mulai"
                value={payloadData.from}
                onChange={(val) =>
                  setPayloadData((prev) => ({
                    ...prev,
                    from: val,
                  }))
                }
                label={"Tanggal mulai"}
                error={errors?.from?.[0]}
              />
              <FormDatePicker
                placeholder="Tanggal selesai"
                name="to"
                value={payloadData.to}
                onChange={(val) =>
                  setPayloadData((prev) => ({
                    ...prev,
                    to: val,
                  }))
                }
                label={"Tanggal selesai"}
                error={errors?.to?.[0]}
              />
            </div>
            <FormComboBox
              name="type"
              label="Jenis FIle"
              placeholder="Pilih Jenis File"
              options={[
                { label: "PDF", value: "pdf" },
                { label: "CSV", value: "csv" },
                { label: "XLSX", value: "xlsx" },
              ]}
              value={payloadData.type}
              onChange={(val) =>
                setPayloadData((prev) => ({
                  ...prev,
                  type: val,
                }))
              }
              error={errors?.type?.[0]}
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
            Download
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
