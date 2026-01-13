import { useEffect, useState } from "react";
import type { Workshop } from "../types/workshop";
import {
  listWorkshops,
  createWorkshop,
  deleteWorkshop,
  updateWorkshop,
} from "../api/workshop";
import { WorkshopCard } from "./WorkshopCard";
import { WorkshopFormCard } from "./WorkshopFormCard";
import { AnimatePresence, motion } from "motion/react";

export const WorkshopList = () => {
  const [workshops, setWorkshops] = useState<Workshop[]>([]);
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [editingWorkshop, setEditingWorkshop] = useState<Workshop | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [categoryFilter, setCategoryFilter] = useState("");

  const filteredWorkshops = workshops.filter((w) =>
    w.category.toLowerCase().includes(categoryFilter.toLowerCase()),
  );

  useEffect(() => {
    const fetchWorkshops = async () => {
      try {
        const data = await listWorkshops();
        setWorkshops(data);
      } catch {
        setError("No se pudieron cargar los talleres.");
      } finally {
        setLoading(false);
      }
    };

    fetchWorkshops();
  }, []);

  const toggleExpanded = (id: number) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  const handleDelete = async (id: number) => {
    await deleteWorkshop(id);
    setWorkshops((prev) => prev.filter((w) => w.id !== id));
  };

  const startCreate = () => {
    setEditingWorkshop(null);
    setIsCreating(true);
  };

  const startEdit = (workshop: Workshop) => {
    setEditingWorkshop(workshop);
    setIsCreating(true);
  };

  const cancelEditing = () => {
    setIsCreating(false);
    setEditingWorkshop(null);
  };

  const handleCreate = async (
    name: string,
    description: string,
    category: string,
    startDate: Date,
  ) => {
    const newWorkshop = await createWorkshop(
      name,
      description,
      category,
      startDate,
    );

    setWorkshops((prev) => [newWorkshop, ...prev]);
    cancelEditing();
  };

  const handleEdit = (workshopId: number) => {
    // Se utiliza currying para inyectar la dependencia de workshopId sin duplicar funciones
    const handleEditCurry = async (
      name: string,
      description: string,
      category: string,
      startDate: Date,
    ) => {
      const updated = await updateWorkshop(
        workshopId,
        name,
        description,
        category,
        startDate,
      );

      setWorkshops((prev) =>
        prev.map((w) => (w.id === workshopId ? updated : w)),
      );
      cancelEditing();
    };
    return handleEditCurry;
  };

  if (loading) {
    return <p className="text-center mt-8 text-lg">Cargando talleres...</p>;
  }

  if (error) {
    return <p className="text-center mt-8 text-red-600 text-lg">{error}</p>;
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
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
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
              onClick={startCreate}
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
              "
              title="Crear nuevo taller"
            >
              +
            </button>
          </div>
        </div>

        {/* Card de creación */}
        <WorkshopFormCard
          isEditing={false}
          visible={isCreating && editingWorkshop === null}
          initialData={editingWorkshop}
          onCancel={cancelEditing}
          onSubmit={handleCreate}
        />

        {/* Lista de talleres */}
        {filteredWorkshops.map((workshop) => {
          const isEditing = editingWorkshop?.id === workshop.id;

          return (
            <AnimatePresence key={workshop.id} mode="wait">
              {isEditing ? (
                <motion.div
                  key="form"
                  layout
                  initial={{ scaleY: 0 }}
                  animate={{ scaleY: 1 }}
                  exit={{ scaleY: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <WorkshopFormCard
                    isEditing={true}
                    visible={isEditing}
                    initialData={workshop}
                    onCancel={cancelEditing}
                    onSubmit={handleEdit(workshop.id)}
                  />
                </motion.div>
              ) : (
                <motion.div
                  key="card"
                  layout
                  initial={{ scaleY: 0 }}
                  animate={{ scaleY: 1 }}
                  exit={{ scaleY: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <WorkshopCard
                    workshop={workshop}
                    isExpanded={expandedId === workshop.id}
                    onToggle={() => toggleExpanded(workshop.id)}
                    onDelete={() => handleDelete(workshop.id)}
                    onEdit={() => startEdit(workshop)}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          );
        })}
      </div>
    </div>
  );
};
