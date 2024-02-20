import { MouseEventHandler, useEffect, useState } from "react";
import { useRefValue } from "../../../hooks/useRefValue";

export const useDragHandlers = (
  onDragEnd: (distance: { x: number; y: number }) => void
) => {
  const [isDragging, setIsDragging] = useState(false);
  const [dragDistance, setDragDistance] = useState<{
    x: number;
    y: number;
  } | null>(null);

  const onMouseDown: MouseEventHandler = (event) => {
    event.preventDefault();
    setIsDragging(true);
  };

  const dragDistanceRef = useRefValue(dragDistance);

  useEffect(() => {
    if (!isDragging) {
      return;
    }

    const onMouseMove = (event: MouseEvent) => {
      event.preventDefault();
      setDragDistance((oldDragDistance) => ({
        x: (oldDragDistance?.x ?? 0) + event.movementX,
        y: (oldDragDistance?.y ?? 0) + event.movementY,
      }));
    };

    const onMouseUp = (event: MouseEvent) => {
      event.preventDefault();

      onDragEnd(dragDistanceRef.current ?? { x: 0, y: 0 });
      setIsDragging(false);
      setDragDistance(null);
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };
  }, [isDragging, dragDistanceRef]);

  return {
    onMouseDown,
    dragDistance,
  };
};
