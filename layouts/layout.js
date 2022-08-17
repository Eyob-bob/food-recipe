import { useState } from "react";
import Navbar from "../components/navbar";
import Sidebar from "../components/sidebar";
const layout = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex ">
      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />
      <Navbar isOpen={isOpen} setIsOpen={setIsOpen} />
    </div>
  );
};

export default layout;
