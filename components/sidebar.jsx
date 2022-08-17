import Link from "next/link";
import { useRouter } from "next/router";
import CloseIcon from "@mui/icons-material/Close";
import { IconButton } from "@mui/material";

const Sidebar = ({ isOpen, setIsOpen }) => {
  const router = useRouter();

  return (
    <div
      className={`h-screen transition-all w-0 overflow-hidden z-50 bg-black opacity-80 md:w-60 lg:w-80 top-0 left-0 ${
        isOpen ? "absolute w-80 top-0 left-0" : ""
      }`}
    >
      <IconButton
        onClick={() => {
          setIsOpen(!isOpen);
        }}
        className="text-white absolute right-4 top-4 md:hidden"
      >
        <CloseIcon />
      </IconButton>

      <ul className="flex flex-col gap-4 px-8 py-14 justify-center items-center text-white font-roboto tracking-widest">
        <li className={router.pathname == "/" ? "active" : ""}>
          <Link href="/">
            <a>Home</a>
          </Link>
        </li>
        <li className={router.pathname == "/favorite" ? "active" : ""}>
          <Link href="/favorite">
            <a>Favorite</a>
          </Link>
        </li>
        <li className={router.pathname == "/bookmark" ? "active" : ""}>
          <Link href="/bookmark">
            <a>Bookmark</a>
          </Link>
        </li>
        <li className={router.pathname == "/myrecipes" ? "active" : ""}>
          <Link href="/myrecipes">
            <a>My Recipes</a>
          </Link>
        </li>
        <li className={router.pathname == "/createrecipes" ? "active" : ""}>
          <Link href="/createrecipes">
            <a>Create Recipes</a>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
