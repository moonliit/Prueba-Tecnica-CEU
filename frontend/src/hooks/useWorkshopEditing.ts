import { useEffect, useMemo } from "react";
import { type RefObject } from "react";
import { type Workshop } from "../types/workshop";

type FocusTarget =
  | { source: "lastEdited"; id: number }
  | { source: "editing"; id: number };

export const useWorkshopEditing = (
  lastEditedId: number | null,
  editingWorkshop: Workshop | null,
  workshopRefs: RefObject<Record<number, HTMLDivElement | null>>,
  onFocus: () => void,
) => {
  const focusTarget: FocusTarget | null = useMemo(() => {
    if (lastEditedId != null) {
      return { source: "lastEdited", id: lastEditedId };
    }

    if (editingWorkshop != null) {
      return { source: "editing", id: editingWorkshop.id };
    }

    return null;
  }, [lastEditedId, editingWorkshop?.id]);

  useEffect(() => {
    if (!focusTarget) return;

    const ref = workshopRefs.current[focusTarget.id];
    if (!ref) return;

    ref.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });

    const rafId = requestAnimationFrame(() => {
      ref.focus({ preventScroll: true });
      onFocus();
    });

    return () => cancelAnimationFrame(rafId);
  }, [focusTarget]);
};
