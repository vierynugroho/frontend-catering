"use client";
import React, { useState } from "react";
import { useTableData } from "./hooks/use-table";
import { TableData } from "./components/table-data";
import { TableToolbar } from "./components/table-toolbar";
import { CreateEditModal } from "./components/create-edit-modal";
import { useModal } from "@/hooks/use-modal";
import { menuSchema, defaultValues } from "./schema";
import { useCreateMenu } from "./hooks/use-create";
import { useUpdateMenu } from "./hooks/use-update";
import { DeleteModal } from "@/components/modal/delete-modal";
import { useDeleteMenu } from "./hooks/use-delete";
import { useDisableMenu } from "./hooks/use-disable";

export default function MenuTableData() {
  // hooks
  const { create } = useCreateMenu({
    onSuccessCallback: () => {
      closeModal();
      setPayloadData(defaultValues);
      setErrors({});
    },
  });
  const { update } = useUpdateMenu({
    onSuccessCallback: () => {
      closeModal();
      setPayloadData(defaultValues);
      setErrors({});
    },
  });
  const { deleted } = useDeleteMenu({
    onSuccessCallback: () => {
      closeModal();
      setPayloadData(defaultValues);
      setErrors({});
    },
  });
  const { disable } = useDisableMenu({
    onSuccessCallback: () => {
      closeModal();
      setPayloadData(defaultValues);
      setErrors({});
    },
  });

  // payload data
  const [errors, setErrors] = useState({});
  const [payloadData, setPayloadData] = useState(defaultValues);

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
      is_active: data.is_active,
      category_id: data.category?.id,
      price: data.price.toString(),
      min_order: data.min_order ?? 1,
      description: data.description,
      images: data.images,
    });
    openModal();
  };

  const handleOpenDeleteModal = (data) => {
    setModalMode("delete");
    setPayloadData({
      id: data.id,
      name: data.name,
    });
    openModal();
  };
  const handleOpenDisableModal = (data) => {
    setModalMode("disable");
    setPayloadData({
      id: data.id,
      name: data.name,
    });
    openModal();
  };

  const handleSubmitModal = async () => {
    console.log("error", errors);

    const result = menuSchema.safeParse(payloadData);
    if (!result.success) {
      const fieldErrors = result.error.flatten().fieldErrors;
      setErrors(fieldErrors);
      return;
    }

    if (modalMode === "add") {
      const formData = new FormData();
      formData.append("name", payloadData.name);
      formData.append("slug", payloadData.slug);
      formData.append("is_active", payloadData.is_active);
      formData.append("category_id", payloadData.category_id);
      formData.append("price", payloadData.price);
      formData.append("min_order", payloadData.min_order);
      formData.append("description", payloadData.description);

      if (payloadData.images) {
        payloadData.images.forEach((item) => {
          formData.append("images", item);
        });
      }

      create.mutate(formData);
    }
    if (modalMode === "edit") {
      const { id, ...payload } = payloadData;

      const formData = new FormData();
      formData.append("name", payload.name);
      formData.append("slug", payload.slug);
      formData.append("is_active", payload.is_active);
      formData.append("category_id", payload.category_id);
      formData.append("price", payload.price);
      formData.append("min_order", payload.min_order);
      formData.append("description", payload.description);

      if (payload.images && payload.images.length > 0) {
        payload.images.forEach((item) => {
          if (item instanceof File) {
            formData.append("images", item);
          }
        });
      }

      update.mutate({ id, payload: formData });
    }
  };
  const handleDeleteModal = () => {
    if (!payloadData?.id) return toast.error("Tidak ada data yang dipilih.");

    if (modalMode === "delete") {
      deleted.mutate({ id: payloadData.id });
    }
    if (modalMode === "disable") {
      disable.mutate({ id: payloadData.id });
    }
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
    onDisable: handleOpenDisableModal,
  });

  return (
    <>
      {/* toolbar */}
      <TableToolbar
        table={table}
        queryParams={queryParams}
        setQueryParams={setQueryParams}
        onAdd={handleOpenAddModal}
        addLabel="Tambah Menu"
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
      {(modalMode === "delete" || modalMode === "disable") && (
        <DeleteModal
          mode={modalMode}
          isOpen={isOpen}
          onClose={() => {
            closeModal();
          }}
          onSubmit={handleDeleteModal}
          selectedData={payloadData}
          isPending={deleted.isPending || disable.isPending}
          title={modalMode === "delete" ? "Hapus Menu" : "Nonaktifkan Menu"}
        />
      )}
    </>
  );
}
