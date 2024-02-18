import { ReactNode, createContext, useContext, useMemo, useState } from "react";
import { Slide } from "../../slides/types";

type SelectedSlideContextValue = {
  selectedSlide: Slide | null;
  setSelectedSlide(slide: Slide): void;
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
  const [selectedSlide, setSelectedSlide] = useState<Slide>(slide);

  const contextValue = useMemo(
    () => ({
      selectedSlide,
      setSelectedSlide,
    }),
    [selectedSlide, setSelectedSlide]
  );

  return (
    <SelectedSlideContext.Provider value={contextValue}>
      {children}
    </SelectedSlideContext.Provider>
  );
};
export const useSelectedSlide = () => useContext(SelectedSlideContext);
