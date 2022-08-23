import { useSelector } from "react-redux";

const useIsOpen = () => {
  const isOpen = useSelector((state) => state.isOpen.isOpen);

  return isOpen;
};

export default useIsOpen;
