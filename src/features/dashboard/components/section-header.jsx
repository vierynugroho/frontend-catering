import { FormDateRangePicker } from "@/components/form/form-simple-daterange";
import { Button } from "@/components/ui/button";
import { DownloadIcon } from "lucide-react";
import React from "react";

export default function HeaderSection({ range, setRange, onOpenModal }) {
  return (
    <div className="flex items-center justify-between items-center lg:px-6 px-4 mb-4">
      <h1 className="font-bold text-2xl">Dashboard Catering Dhewi</h1>

      <div className="flex items-center gap-4">
        <FormDateRangePicker
          containerClassName="w-120"
          showLabel={false}
          value={range}
          onChange={setRange}
        />
        <Button variant="default" onClick={onOpenModal}>
          <DownloadIcon />
          Download
        </Button>
      </div>
    </div>
  );
}
