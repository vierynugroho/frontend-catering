import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { downloadReports } from "@/services/dashboard";
import { extractErrorMessage } from "@/lib/utils";

export const useDownloadReport = () => {
  return useMutation({
    mutationFn: async ({ type, params }) => {
      const blobData = await downloadReports(type, params);

      // tentukan nama file & extension
      const fileType =
        type === "pdf"
          ? "application/pdf"
          : "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";

      const fileExtension =
        type === "pdf" ? "pdf" : type === "xlsx" ? "xlsx" : "csv";

      // buat blob
      const blob = new Blob([blobData], { type: fileType });

      // buat URL sementara
      const url = window.URL.createObjectURL(blob);

      // trigger download
      const link = document.createElement("a");
      link.href = url;
      link.download = `report-${Date.now()}.${fileExtension}`;
      document.body.appendChild(link);
      link.click();

      // cleanup
      link.remove();
      window.URL.revokeObjectURL(url);

      return true;
    },
    onSuccess: () => {
      toast.success("Berhasil mengunduh data");
    },
    onError: (error) => {
      const message = extractErrorMessage(error);
      toast.error(message);
    },
  });
};
