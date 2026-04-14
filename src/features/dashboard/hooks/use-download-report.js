import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { downloadReports } from "@/services/dashboard";

export const useDownloadReport = () => {
  return useMutation({
    mutationFn: async (params) => {
      const blobData = await downloadReports(params);

      // tentukan nama file & extension
      const fileType =
        params.type === "pdf"
          ? "application/pdf"
          : "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";

      const fileExtension = params.type === "pdf" ? "pdf" : "xlsx";

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
      const message = error?.response?.data?.message || "Terjadi kesalahan";
      toast.error(message);
    },
  });
};
