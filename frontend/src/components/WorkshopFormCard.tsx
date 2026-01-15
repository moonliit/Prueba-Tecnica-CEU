import { useEffect, useRef, useState } from "react";
import { type Workshop } from "../types/workshop";

type Props = {
  isEditing: boolean;
  visible: boolean;
  initialData?: Workshop | null;
  setIsDirty: (isDirty: boolean) => void;
  onCancel: () => void;
  onSubmit: (
    name: string,
    description: string,
    category: string,
    startDate: Date,
  ) => void;
};

export const WorkshopFormCard = ({
  isEditing,
  visible,
  initialData,
  setIsDirty,
  onCancel,
  onSubmit,
}: Props) => {
  const buildForm = (data?: Workshop | null) => ({
    name: data?.name ?? "",
    description: data?.description ?? "",
    category: data?.category ?? "",
    startDate: data ? data.startDate.toISOString().slice(0, 16) : "",
  });

  const [form, setForm] = useState(() => buildForm(initialData));
  const initialFormRef = useRef(form);

  useEffect(() => {
    const isDirty =
      form.name !== initialFormRef.current.name ||
      form.description !== initialFormRef.current.description ||
      form.category !== initialFormRef.current.category ||
      form.startDate !== initialFormRef.current.startDate;

    setIsDirty(isDirty);
  }, [form, setIsDirty]);

  useEffect(() => {
    const nextForm = buildForm(initialData);
    setForm(nextForm);
    initialFormRef.current = nextForm;
    setIsDirty(false);
  }, [initialData, visible]);

  return (
    <div
      className={`
        overflow-hidden transition-all duration-300 space-y-4
        ${visible ? "max-h-96 mt-4 opacity-100" : "max-h-0 opacity-0"}
      `}
    >
      <div className="rounded-xl bg-white p-6 border shadow-sm space-y-4">
        <div>
          <h2 className="text-xl font-semibold">
            {isEditing ? "Editando taller" : "Creando taller"}
          </h2>
        </div>
        <input
          className="w-full border rounded px-3 py-2"
          placeholder="Nombre del taller"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        <textarea
          className="w-full border rounded px-3 py-2"
          placeholder="Descripción"
          rows={3}
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />

        <div className="flex gap-4">
          <input
            className="flex-1 border rounded px-3 py-2"
            placeholder="Categoría"
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
          />

          <input
            type="datetime-local"
            className="flex-1 border rounded px-3 py-2"
            value={form.startDate}
            onChange={(e) => setForm({ ...form, startDate: e.target.value })}
          />
        </div>

        <div className="flex justify-end gap-3">
          <button
            onClick={onCancel}
            className="px-4 py-2 rounded text-gray-600 cursor-pointer hover:bg-gray-100"
          >
            Cancelar
          </button>

          <button
            onClick={() =>
              onSubmit(
                form.name,
                form.description,
                form.category,
                new Date(form.startDate),
              )
            }
            className="px-4 py-2 rounded bg-blue-600 text-white cursor-pointer hover:bg-blue-700"
          >
            {initialData ? "Guardar cambios" : "Crear taller"}
          </button>
        </div>
      </div>
    </div>
  );
};
