import { type Workshop } from "../types/workshop";

type Props = {
  workshop: Workshop;
  isExpanded: boolean;
  onToggle: () => void;
  onDelete: () => void;
  onEdit: () => void;
};

export const WorkshopCard = ({
  workshop,
  isExpanded,
  onToggle,
  onDelete,
  onEdit,
}: Props) => (
  <div
    onClick={onToggle}
    className="cursor-pointer rounded-xl bg-white p-6 border transition hover:shadow-lg"
  >
    <div className="flex justify-between gap-4">
      <div>
        <h2 className="text-xl font-semibold">{workshop.name}</h2>
        <p className="text-gray-600 mt-1">{workshop.description}</p>
      </div>

      <div className="flex flex-col items-end gap-2">
        <span className="text-sm px-3 py-1 rounded bg-blue-100 text-blue-700">
          {workshop.category}
        </span>

        <div className="flex gap-3 text-sm">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onEdit();
            }}
            className="cursor-pointer text-blue-600 hover:text-blue-800"
          >
            Editar
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete();
            }}
            className="cursor-pointer text-red-600 hover:text-red-800"
          >
            Eliminar
          </button>
        </div>
      </div>
    </div>

    <div
      className={`
        overflow-hidden transition-all duration-200
        ${isExpanded ? "max-h-96 mt-4 opacity-100" : "max-h-0 opacity-0"}
      `}
    >
      <div className="pt-4 border-t text-gray-700 text-sm">
        <p>
          <strong>Fecha de inicio:</strong>{" "}
          {workshop.startDate.toLocaleString()}
        </p>
        <p>
          <strong>Fecha de creación:</strong>{" "}
          {workshop.createdAt.toLocaleString()}
        </p>
      </div>
    </div>
  </div>
);
