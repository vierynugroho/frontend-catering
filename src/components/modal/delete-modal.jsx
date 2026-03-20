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
}) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>
            Apakah anda yakin ingin menghapus data{" "}
            <span className="font-semibold">{selectedData?.name}</span>?
            Tindakan ini tidak dapat dibatalkan.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="mt-4">
          <DialogClose asChild>
            <Button type="button" variant="outline">
              Cancel
            </Button>
          </DialogClose>
          <Button
            variant="destructive"
            type="submit"
            disabled={isPending}
            onClick={onSubmit}
          >
            {isPending && <Spinner></Spinner>}
            Hapus
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
