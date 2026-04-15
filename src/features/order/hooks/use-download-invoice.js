import { useMutation } from "@tanstack/react-query";
import { adminDownloadInvoice } from "@/services/order";
import { toast } from "sonner";
import { extractErrorMessage } from "@/lib/utils";

export const useDownloadInvoice = () => {
  return useMutation({
    mutationFn: async ({ order_id, order_code }) => {
      const blobData = await adminDownloadInvoice(order_id);

      const url = window.URL.createObjectURL(new Blob([blobData]));

      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `Invoice-${order_code || order_id}.pdf`);

      document.body.appendChild(link);
      link.click();

      link.parentNode.removeChild(link);
      window.URL.revokeObjectURL(url);

      return true;
    },
    onSuccess: () => {
      toast.success("Berhasil mengunduh invoice");
    },
    onError: (error) => {
      const message = extractErrorMessage(error);
      toast.error(message);
    },
  });
};
