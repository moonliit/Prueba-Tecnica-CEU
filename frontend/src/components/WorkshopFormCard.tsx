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

type Errors = {
  name?: string;
  category?: string;
  startDate?: string;
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
  const [errors, setErrors] = useState<Errors>({});
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
    setErrors({});
    setIsDirty(false);
  }, [initialData, visible]);

  const validate = (): boolean => {
    const nextErrors: Errors = {};
    const now = new Date();

    if (!form.name.trim()) {
      nextErrors.name = "El nombre es obligatorio";
    }

    if (!form.category.trim()) {
      nextErrors.category = "La categoría es obligatoria";
    }

    if (!form.startDate) {
      nextErrors.startDate = "La fecha de inicio es obligatoria";
    } else if (new Date(form.startDate) < now) {
      nextErrors.startDate =
        "La fecha de inicio no puede ser anterior a la actual";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;

    onSubmit(
      form.name,
      form.description,
      form.category,
      new Date(form.startDate),
    );
  };

  const inputBase =
    "w-full border rounded px-3 py-2 outline-none transition-colors";

  const errorClass = "border-red-500 focus:border-red-500";

  return (
    <div
      className={`
        overflow-hidden transition-all duration-300 space-y-4
        ${visible ? "max-h-[1000px] mt-4 opacity-100" : "max-h-0 opacity-0"}
      `}
    >
      <div className="rounded-xl bg-white p-6 border shadow-sm space-y-4">
        <h2 className="text-xl font-semibold">
          {isEditing ? "Editando taller" : "Creando taller"}
        </h2>

        <div>
          <input
            className={`${inputBase} ${errors.name ? errorClass : ""}`}
            placeholder="Nombre del taller"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
          {errors.name && (
            <p className="mt-1 text-sm text-red-600">{errors.name}</p>
          )}
        </div>

        <div>
          <textarea
            className={inputBase}
            placeholder="Descripción (opcional)"
            rows={3}
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />
        </div>

        <div className="flex gap-4">
          <div className="flex-1">
            <input
              className={`${inputBase} ${errors.category ? errorClass : ""}`}
              placeholder="Categoría"
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
            />
            {errors.category && (
              <p className="mt-1 text-sm text-red-600">{errors.category}</p>
            )}
          </div>

          <div className="flex-1">
            <input
              type="datetime-local"
              className={`${inputBase} ${errors.startDate ? errorClass : ""}`}
              value={form.startDate}
              onChange={(e) => setForm({ ...form, startDate: e.target.value })}
            />
            {errors.startDate && (
              <p className="mt-1 text-sm text-red-600">{errors.startDate}</p>
            )}
          </div>
        </div>

        <div className="flex justify-end gap-3">
          <button
            onClick={onCancel}
            className="px-4 py-2 rounded text-gray-600 hover:bg-gray-100"
          >
            Cancelar
          </button>

          <button
            onClick={handleSubmit}
            className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
          >
            {initialData ? "Guardar cambios" : "Crear taller"}
          </button>
        </div>
      </div>
    </div>
  );
};
