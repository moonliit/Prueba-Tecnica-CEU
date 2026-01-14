import { AnimatePresence, motion } from "motion/react";
import { createPortal } from "react-dom";

type ConfirmVariant = "discard" | "delete";

type Props = {
  open: boolean;
  variant: ConfirmVariant;
  title: string;
  description: string;
  confirmLabel?: string;
  onConfirm: () => void;
  onCancel: () => void;
};

export const ConfirmDialog = ({
  open,
  variant,
  title,
  description,
  confirmLabel,
  onConfirm,
  onCancel,
}: Props) => {
  if (typeof document === "undefined") return null;

  const isDanger = variant === "delete";

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Overlay */}
          <div className="absolute inset-0 bg-black/40" onClick={onCancel} />

          {/* Dialog */}
          <motion.div
            role="dialog"
            aria-modal="true"
            className="relative w-full max-w-md rounded-xl bg-white p-6 shadow-xl"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          >
            <h2 className="text-lg font-semibold text-gray-900">{title}</h2>

            <p className="mt-2 text-sm text-gray-600">{description}</p>

            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={onCancel}
                className="rounded-lg px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                Cancelar
              </button>

              <button
                onClick={onConfirm}
                className={`
                  rounded-lg px-4 py-2 text-sm font-medium text-white
                  ${
                    isDanger
                      ? "bg-red-600 hover:bg-red-700"
                      : "bg-blue-600 hover:bg-blue-700"
                  }
                `}
              >
                {confirmLabel ?? (isDanger ? "Eliminar" : "Descartar")}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
};
