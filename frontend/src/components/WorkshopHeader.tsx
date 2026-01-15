import { useScrolled } from "../hooks/useScrolled";
import { WorkshopFormCard } from "./WorkshopFormCard";
import { type Workshop } from "../types/workshop";

type Props = {
  categoryFilter: string;
  setCategoryFilter: (value: string) => void;
  startCreate: () => void;
  formVisible: boolean;
  initialFormData?: Workshop | null;
  setIsDirty: (isDirty: boolean) => void;
  onCancel: () => void;
  onSubmit: (
    name: string,
    description: string,
    category: string,
    startDate: Date,
  ) => void;
};

export const WorkshopHeader = ({
  categoryFilter,
  setCategoryFilter,
  startCreate,
  formVisible,
  initialFormData,
  setIsDirty,
  onCancel,
  onSubmit,
}: Props) => {
  const scrolled = useScrolled();

  return (
    <header
      className={`
        sticky top-0 z-40 w-full
        transition-all duration-200 ease-out
        bg-gray-50 py-8
        ${
          scrolled
            ? "shadow-md backdrop-blur border-b border-gray-200"
            : "border-b border-gray-200"
        }
      `}
    >
      <div className="max-w-5xl mx-auto px-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <h1 className="text-3xl font-bold text-gray-900">
            Catálogo de Talleres
          </h1>

          {/* Barra de búsqueda */}
          <div className="flex items-center gap-4">
            <input
              type="text"
              placeholder="Buscar por categoría..."
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="
                border rounded-lg px-4 py-2 bg-white
                focus:outline-none focus:ring-2 focus:ring-blue-400
              "
            />

            {/* Botón de crear */}
            <button
              onClick={startCreate}
              className="
                flex items-center justify-center
                w-10 h-10 rounded-full cursor-pointer
                bg-blue-600 text-white text-xl font-semibold
                transition hover:bg-blue-700 hover:scale-105
                focus:outline-none focus:ring-2 focus:ring-blue-400
              "
              title="Crear nuevo taller"
            >
              +
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto space-y-4">
        {/* Card de creación */}
        <WorkshopFormCard
          isEditing={false}
          visible={formVisible}
          initialData={initialFormData}
          setIsDirty={setIsDirty}
          onCancel={onCancel}
          onSubmit={onSubmit}
        />
      </div>
    </header>
  );
};
