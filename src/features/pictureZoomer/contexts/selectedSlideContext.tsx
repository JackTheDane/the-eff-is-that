import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { Slide } from "../../slides/types";

type SelectedSlideContextValue = {
  selectedSlide: Slide | null;
};

const SelectedSlideContext = createContext<SelectedSlideContextValue | null>(
  null
);

export type SelectedSlideContextProviderProps = {
  slide: Slide;
  children?: ReactNode;
};

export const SelectedSlideContextProvider = ({
  slide,
  children,
}: SelectedSlideContextProviderProps) => {
  const contextValue = useMemo(
    () => ({
      selectedSlide: slide,
    }),
    [slide]
  );

  return (
    <SelectedSlideContext.Provider value={contextValue}>
      {children}
    </SelectedSlideContext.Provider>
  );
};
export const useSelectedSlide = () => useContext(SelectedSlideContext);
