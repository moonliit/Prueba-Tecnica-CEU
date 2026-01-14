import { useWorkshopsController } from "../hooks/useWorkshopsController";
import { WorkshopFormCard } from "./WorkshopFormCard";
import { EditableWorkshopCard } from "./EditableWorkshopCard";
import { ConfirmDialog } from "./ConfirmDialog";

export const WorkshopList = () => {
  const controller = useWorkshopsController();

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
    <div className="min-h-screen bg-gray-100 px-8 py-12 text-[17px]">
      <div className="max-w-5xl mx-auto space-y-4">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-10">
          <h1 className="text-3xl font-bold">Catálogo de Talleres</h1>

          {/* Barra de busqueda */}
          <div className="flex items-center gap-4">
            <input
              type="text"
              placeholder="Buscar por categoría..."
              value={controller.categoryFilter}
              onChange={(e) => controller.setCategoryFilter(e.target.value)}
              className="
                border
                rounded-lg
                px-4
                py-2
                bg-white
                focus:outline-none
                focus:ring-2
                focus:ring-blue-400
              "
            />

            {/* Boton de crear */}
            <button
              onClick={controller.startCreate}
              className="
                flex items-center justify-center
                w-10 h-10
                rounded-full
                bg-blue-600
                text-white
                text-xl
                font-semibold
                transition
                hover:bg-blue-700
                hover:scale-105
                focus:outline-none
                focus:ring-2
                focus:ring-blue-400
                cursor-pointer
              "
              title="Crear nuevo taller"
            >
              +
            </button>
          </div>
        </div>

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

        {/* Card de creación */}
        <WorkshopFormCard
          isEditing={false}
          visible={controller.isCreating && controller.editingWorkshop === null}
          initialData={controller.editingWorkshop}
          setIsDirty={controller.setIsDirty}
          onCancel={controller.cancelEditing}
          onSubmit={controller.handleCreate}
        />

        {/* Lista de talleres */}
        {controller.filteredWorkshops.map((workshop) => {
          const isEditing = controller.editingWorkshop?.id === workshop.id;

          return (
            <EditableWorkshopCard
              workshop={workshop}
              key={workshop.id}
              isEditing={isEditing}
              isExpanded={controller.expandedId === workshop.id}
              setIsDirty={controller.setIsDirty}
              onToggle={() => controller.toggleExpanded(workshop.id)}
              onDelete={() => controller.setDeletingWorkshop(workshop)}
              onEdit={() => controller.startEdit(workshop)}
              onCancel={controller.cancelEditing}
              onSubmit={controller.handleEdit(workshop.id)}
            />
          );
        })}
      </div>
    </div>
  );
};
