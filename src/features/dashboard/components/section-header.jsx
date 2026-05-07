import { FormDateRangePicker } from "@/components/form/form-simple-daterange";
import { Button } from "@/components/ui/button";
import { DownloadIcon } from "lucide-react";
import React from "react";

export default function HeaderSection({ range, setRange, onOpenModal }) {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 lg:px-6 px-4 mb-6">
      <h1 className="font-bold text-xl md:text-2xl text-left">
        Dashboard Catering Dhewi
      </h1>

      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full md:w-auto">
        <FormDateRangePicker
          containerClassName="w-full sm:w-[300px] md:w-auto"
          showLabel={false}
          value={range}
          onChange={setRange}
        />

        <Button
          variant="default"
          onClick={onOpenModal}
          className="w-full sm:w-auto"
        >
          <DownloadIcon className="w-4 h-4 mr-2" />
          Download
        </Button>
      </div>
    </div>
  );
}