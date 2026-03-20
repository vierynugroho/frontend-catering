"use client";
import React, { useState } from "react";
import { useTableData } from "./hooks/use-table";
import { TableData } from "./components/table-data";
import { TableToolbar } from "./components/table-toolbar";
import { CreateEditModal } from "./components/create-edit-modal";
import { useModal } from "@/hooks/use-modal";
import { categorySchema, defaultValues } from "./schema";
import { useCreateCategory } from "./hooks/use-create";
import { useUpdateCategory } from "./hooks/use-update";
import { DeleteModal } from "@/components/modal/delete-modal";
import { useDeleteCategory } from "./hooks/use-delete";

export default function CategoryTableData() {
  // hooks
  const { create } = useCreateCategory({
    onSuccessCallback: () => {
      closeModal();
      setPayloadData(defaultValues);
      setErrors({});
    },
  });
  const { update } = useUpdateCategory({
    onSuccessCallback: () => {
      closeModal();
      setPayloadData(defaultValues);
      setErrors({});
    },
  });
  const { deleted } = useDeleteCategory({
    onSuccessCallback: () => {
      closeModal();
      setPayloadData(defaultValues);
      setErrors({});
    },
  });

  // payload data
  const [errors, setErrors] = useState({});
  const [payloadData, setPayloadData] = useState({
    id: "",
    name: "",
    slug: "",
  });

  // modal handler
  const { isOpen, openModal, closeModal } = useModal();
  const [modalMode, setModalMode] = useState("add");

  const handleOpenAddModal = () => {
    setModalMode("add");
    setPayloadData(defaultValues);
    openModal();
  };
  const handleOpenEditModal = (data) => {
    setModalMode("edit");
    setPayloadData({
      id: data.id,
      name: data.name,
      slug: data.slug,
    });
    openModal();
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

  const handleSubmitModal = async () => {
    console.log("error", errors);

    const result = categorySchema.safeParse(payloadData);
    if (!result.success) {
      const fieldErrors = result.error.flatten().fieldErrors;
      setErrors(fieldErrors);
      return;
    }

    if (modalMode === "add") {
      const { id, ...payload } = payloadData;
      create.mutate(payload);
    }
    if (modalMode === "edit") {
      const { id, ...payload } = payloadData;
      update.mutate({ id, payload });
    }
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
  } = useTableData({
    onEdit: handleOpenEditModal,
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
        addLabel="Tambah Kategori"
      />
      {/* table */}
      <TableData
        table={table}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        data={data}
        isPending={isPending}
      />
      {/* modal */}
      {(modalMode === "add" || modalMode === "edit") && (
        <CreateEditModal
          isOpen={isOpen}
          mode={modalMode}
          onClose={() => {
            closeModal();
          }}
          onSubmit={handleSubmitModal}
          isPending={create.isPending || update.isPending}
          errors={errors}
          payloadData={payloadData}
          setPayloadData={setPayloadData}
        />
      )}
      {modalMode === "delete" && (
        <DeleteModal
          isOpen={isOpen}
          onClose={() => {
            closeModal();
          }}
          onSubmit={handleDeleteModal}
          selectedData={payloadData}
          isPending={deleted.isPending}
          title="Hapus Kategori"
        />
      )}
    </>
  );
}
