import { type Workshop } from "../types/workshop";
import { motion } from "motion/react";
import { WorkshopCard } from "./WorkshopCard";
import { WorkshopFormCard } from "./WorkshopFormCard";

type Props = {
  workshop: Workshop;
  isEditing: boolean;
  isExpanded: boolean;
  setIsDirty: (isDirty: boolean) => void;
  onToggle: () => void;
  onDelete: () => void;
  onEdit: () => void;
  onCancel: () => void;
  onSubmit: (
    name: string,
    description: string,
    category: string,
    startDate: Date,
  ) => void;
};

export const EditableWorkshopCard = ({
  workshop,
  isEditing,
  isExpanded,
  setIsDirty,
  onToggle,
  onDelete,
  onEdit,
  onCancel,
  onSubmit,
}: Props) => (
  <>
    {isEditing ? (
      <motion.div
        key={`form-${workshop.id}`}
        layout
        initial={{ clipPath: "inset(0 0 100% 0)" }}
        animate={{ clipPath: "inset(0 0 0% 0)" }}
        exit={{ clipPath: "inset(0 0 100% 0)" }}
        transition={{ duration: 0.2, ease: "easeOut" }}
      >
        <WorkshopFormCard
          isEditing
          visible={isEditing}
          initialData={workshop}
          setIsDirty={setIsDirty}
          onCancel={onCancel}
          onSubmit={onSubmit}
        />
      </motion.div>
    ) : (
      <motion.div
        key={`card-${workshop.id}`}
        layout
        initial={{ clipPath: "inset(0 0 100% 0)" }}
        animate={{ clipPath: "inset(0 0 0% 0)" }}
        exit={{ clipPath: "inset(0 0 100% 0)" }}
        transition={{ duration: 0.2, ease: "easeOut" }}
      >
        <WorkshopCard
          workshop={workshop}
          isExpanded={isExpanded}
          onToggle={onToggle}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      </motion.div>
    )}
  </>
);
