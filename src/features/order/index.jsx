"use client";
import React, { useState } from "react";
import { useTableData } from "./hooks/use-table";
import { TableData } from "./components/table-data";
import { TableToolbar } from "./components/table-toolbar";
import { useModal } from "@/hooks/use-modal";
import { defaultValues } from "./schema";
import { DeleteModal } from "@/components/modal/delete-modal";
import { useDeleteOrder } from "./hooks/use-delete";
import { useRouter } from "next/navigation";

export default function OrderTableData() {
  const { deleted } = useDeleteOrder({
    onSuccessCallback: () => {
      closeModal();
      setPayloadData(defaultValues);
    },
  });
  const route = useRouter();

  // payload data
  const [payloadData, setPayloadData] = useState(defaultValues);

  // modal handler
  const { isOpen, openModal, closeModal } = useModal();
  const [modalMode, setModalMode] = useState("add");

  const handleOpenAddModal = () => {
    route.push("/admin/order/create");
  };

  const handleOpenDeleteModal = (data) => {
    setModalMode("delete");
    setPayloadData({
      id: data.id,
      name: data.name,
      slug: data.slug,
    });
    openModal();
  };

  const handleDeleteModal = () => {
    if (!payloadData?.id) return toast.error("Tidak ada data yang dipilih.");

    deleted.mutate({ id: payloadData.id });
  };

  // table data
  const {
    table,
    currentPage,
    setCurrentPage,
    queryParams,
    setQueryParams,
    data,
    isPending,
    range,
    setRange,
  } = useTableData({
    onDelete: handleOpenDeleteModal,
  });

  return (
    <>
      {/* toolbar */}
      <TableToolbar
        table={table}
        queryParams={queryParams}
        setQueryParams={setQueryParams}
        onAdd={handleOpenAddModal}
        addLabel="Tambah Pesanan"
        range={range}
        setRange={setRange}
      />
      {/* table */}
      <TableData
        table={table}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        data={data}
        isPending={isPending}
      />

      {modalMode === "delete" && (
        <DeleteModal
          isOpen={isOpen}
          onClose={() => {
            closeModal();
          }}
          onSubmit={handleDeleteModal}
          selectedData={payloadData}
          isPending={deleted.isPending}
          title="Hapus Pesanan"
        />
      )}
    </>
  );
}
