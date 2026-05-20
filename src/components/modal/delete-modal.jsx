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
import { Spinner } from "../ui/spinner";
import { SearchIcon, XCircleIcon } from "lucide-react";

export function DeleteModal({
  isOpen,
  onClose,
  onSubmit,
  selectedData,
  isPending,
  title = "Hapus Data",
  mode = "delete",
}) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>
            {mode === "delete" ? (
              <>
                Apakah anda yakin ingin menghapus data{" "}
                <span className="font-semibold">{selectedData?.name}</span>?
                Tindakan ini tidak dapat dibatalkan.
              </>
            ) : (
              <>
                Apakah anda yakin ingin menonaktifkan data{" "}
                <span className="font-semibold">{selectedData?.name}</span>?
              </>
            )}
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="mt-4">
          <DialogClose asChild>
            <Button type="button" variant="outline">
              Batalkan
            </Button>
          </DialogClose>
          <Button
            variant="destructive"
            type="submit"
            disabled={isPending}
            onClick={onSubmit}
          >
            {isPending && <Spinner></Spinner>}
            {mode === "delete" ? "Hapus" : "Nonaktifkan"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
