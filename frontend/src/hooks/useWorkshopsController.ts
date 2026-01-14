import { useEffect, useState } from "react";
import { type Workshop } from "../types/workshop";
import {
  listWorkshops,
  createWorkshop,
  deleteWorkshop,
  updateWorkshop,
} from "../api/workshop";

type PendingAction =
  | { type: "create" }
  | { type: "edit"; workshop: Workshop }
  | { type: "cancel" }
  | null;

export const useWorkshopsController = () => {
  const [workshops, setWorkshops] = useState<Workshop[]>([]);
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [editingWorkshop, setEditingWorkshop] = useState<Workshop | null>(null);
  const [deletingWorkshop, setDeletingWorkshop] = useState<Workshop | null>(
    null,
  );
  const [isCreating, setIsCreating] = useState(false);
  const [isDirty, setIsDirty] = useState(false);
  const [pendingAction, setPendingAction] = useState<PendingAction>(null);
  const [categoryFilter, setCategoryFilter] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const filteredWorkshops = workshops.filter((w) =>
    w.category.toLowerCase().includes(categoryFilter.toLowerCase()),
  );

  // fetch
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
    setIsDirty(false);
    setPendingAction(null);
  }, []);

  // create
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

    setIsDirty(false);
    setPendingAction(null);
    setIsCreating(false);
    setEditingWorkshop(null);
    setWorkshops((prev) => [...prev, newWorkshop]);
  };

  // edit (curried)
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

      setIsDirty(false);
      setPendingAction(null);
      setIsCreating(false);
      setEditingWorkshop(null);
      setWorkshops((prev) =>
        prev.map((w) => (w.id === workshopId ? updated : w)),
      );
    };
    return handleEditCurry;
  };

  // delete
  const handleDelete = async (id: number) => {
    await deleteWorkshop(id);
    setWorkshops((prev) => prev.filter((w) => w.id !== id));
  };

  // extra
  const toggleExpanded = (id: number) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  const startCreate = () => {
    if (isDirty) {
      setPendingAction({ type: "create" });
      return;
    }

    setEditingWorkshop(null);
    setIsCreating(true);
  };

  const startEdit = (workshop: Workshop) => {
    if (isDirty) {
      setPendingAction({ type: "edit", workshop });
      return;
    }

    setEditingWorkshop(workshop);
    setIsCreating(true);
  };

  const cancelEditing = () => {
    if (isDirty) {
      setPendingAction({ type: "cancel" });
      return;
    }

    setIsCreating(false);
    setEditingWorkshop(null);
  };

  const confirmPendingAction = () => {
    if (!pendingAction) return;

    setIsDirty(false);

    switch (pendingAction.type) {
      case "create":
        setEditingWorkshop(null);
        setIsCreating(true);
        break;

      case "edit":
        setEditingWorkshop(pendingAction.workshop);
        setIsCreating(true);
        break;

      case "cancel":
        setEditingWorkshop(null);
        setIsCreating(false);
        break;
    }

    setPendingAction(null);
  };

  const abortPendingAction = () => {
    setPendingAction(null);
  };

  return {
    workshops,
    filteredWorkshops,
    expandedId,
    editingWorkshop,
    deletingWorkshop,
    setDeletingWorkshop,
    isCreating,
    isDirty,
    setIsDirty,
    pendingAction,
    confirmPendingAction,
    abortPendingAction,
    categoryFilter,
    loading,
    error,

    setCategoryFilter,
    toggleExpanded,
    startCreate,
    startEdit,
    cancelEditing,
    handleCreate,
    handleEdit,
    handleDelete,
  };
};
