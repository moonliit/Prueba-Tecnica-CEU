import { useWorkshopsController } from "../hooks/useWorkshopsController";
import { useWorkshopEditing } from "../hooks/useWorkshopEditing";
import { useState, useRef } from "react";
import { clsx } from "clsx";

import { EditableWorkshopCard } from "./EditableWorkshopCard";
import { ConfirmDialog } from "./ConfirmDialog";
import { WorkshopHeader } from "./WorkshopHeader";

export const WorkshopList = () => {
  const controller = useWorkshopsController();
  const workshopRefs = useRef<Record<number, HTMLDivElement | null>>({});
  const [isJustFocused, setIsJustFocused] = useState(false);
  useWorkshopEditing(
    controller.lastEditedId,
    controller.editingWorkshop,
    workshopRefs,
    () => {
      setIsJustFocused(true);

      setTimeout(() => {
        setIsJustFocused(false);
        controller.setLastEditedId(null);
      }, 1000);
    },
  );

  if (controller.loading) {
    return <p className="text-center mt-8 text-lg">Cargando talleres...</p>;
  }

  if (controller.error) {
    return (
      <p className="text-center mt-8 text-red-600 text-lg">
        {controller.error}
      </p>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 text-[17px]">
      {/* Header */}
      <WorkshopHeader
        categoryFilter={controller.categoryFilter}
        setCategoryFilter={controller.setCategoryFilter}
        startCreate={controller.startCreate}
        formVisible={
          controller.isCreating && controller.editingWorkshop === null
        }
        initialFormData={controller.editingWorkshop}
        setIsDirty={controller.setIsDirty}
        onCancel={controller.cancelEditing}
        onSubmit={controller.handleCreate}
      />

      <div className="bg-gray-100">
        <div className="max-w-5xl mx-auto px-8 py-8 space-y-4">
          {/* Popup de confirmación */}
          {controller.deletingWorkshop !== null ? (
            <ConfirmDialog
              open={controller.deletingWorkshop !== null}
              variant="delete"
              title="Eliminar taller"
              description="¿Quieres eliminar este taller?"
              onConfirm={() => {
                if (controller.deletingWorkshop === null) return;
                controller.handleDelete(controller.deletingWorkshop.id);
                controller.setDeletingWorkshop(null);
              }}
              onCancel={() => controller.setDeletingWorkshop(null)}
            />
          ) : (
            <ConfirmDialog
              open={controller.pendingAction !== null}
              variant="discard"
              title="Descartar cambios"
              description="Tienes cambios sin guardar. ¿Deseas descartarlos?"
              onConfirm={controller.confirmPendingAction}
              onCancel={controller.abortPendingAction}
            />
          )}

          {/* Lista de talleres */}
          {controller.filteredWorkshops.length > 0 ? (
            controller.filteredWorkshops.map((workshop) => {
              const isEditing = controller.editingWorkshop?.id === workshop.id;
              const isFocused =
                isJustFocused && controller.lastEditedId == workshop.id;

              return (
                <div
                  key={workshop.id}
                  ref={(el) => {
                    workshopRefs.current[workshop.id] = el;
                  }}
                  tabIndex={-1}
                  className={clsx(
                    "relative rounded-xl transition-shadow",
                    isFocused &&
                      "ring-4 ring-blue-400/40 shadow-lg shadow-blue-500/20",
                  )}
                >
                  <EditableWorkshopCard
                    workshop={workshop}
                    isEditing={isEditing}
                    isExpanded={controller.expandedId === workshop.id}
                    setIsDirty={controller.setIsDirty}
                    onToggle={() => controller.toggleExpanded(workshop.id)}
                    onDelete={() => controller.setDeletingWorkshop(workshop)}
                    onEdit={() => controller.startEdit(workshop)}
                    onCancel={controller.cancelEditing}
                    onSubmit={controller.handleEdit(workshop.id)}
                  />
                </div>
              );
            })
          ) : (
            <div className="flex items-center justify-center rounded-xl bg-gray-50 py-16">
              <span className="text-sm font-medium tracking-wide text-gray-500 uppercase">
                No hay talleres que mostrar
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
