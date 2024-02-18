import { clamp } from "lodash";
import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import { ZOOM_INCREMENTS } from "../constants";

type ZoomLevelContextValue = {
  zoomLevel: number;
  zoomIn(): void;
  zoomOut(): void;
};

const ZoomLevelContext = createContext<ZoomLevelContextValue | null>(null);

const MAX_ZOOM_STEP_INDEX = ZOOM_INCREMENTS.length - 1;

type ZoomLevelContextProviderProps = {
  children?: ReactNode;
};

export const ZoomLevelContextProvider = ({
  children,
}: ZoomLevelContextProviderProps) => {
  const [zoomIndex, setZoomIndex] = useState(MAX_ZOOM_STEP_INDEX);
  const zoomLevel = ZOOM_INCREMENTS.at(zoomIndex) ?? 1;

  const zoomOut = useCallback(() => {
    setZoomIndex((oldZoomIndex) =>
      clamp(oldZoomIndex - 1, 0, MAX_ZOOM_STEP_INDEX)
    );
  }, []);

  const zoomIn = useCallback(() => {
    setZoomIndex((oldZoomIndex) =>
      clamp(oldZoomIndex + 1, 0, MAX_ZOOM_STEP_INDEX)
    );
  }, []);

  const contextValue = useMemo(
    () => ({
      zoomLevel,
      zoomIn,
      zoomOut,
    }),
    [zoomLevel, zoomIn, zoomOut]
  );

  return (
    <ZoomLevelContext.Provider value={contextValue}>
      {children}
    </ZoomLevelContext.Provider>
  );
};
export const useZoomLevel = () => useContext(ZoomLevelContext);
