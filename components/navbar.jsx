import ListIcon from "@mui/icons-material/List";
import * as React from "react";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Link from "next/link";
import useUser from "../custom-hooks/useUser";
import { Button } from "@mui/material";
import { useDispatch } from "react-redux";
import { logout } from "../redux-slices/userSlice";
import jwt from "jsonwebtoken";
import { useRouter } from "next/router";
import CloseIcon from "@mui/icons-material/Close";
import useIsOpen from "../custom-hooks/useIsOpen";
import { closed, opened } from "../redux-slices/isOpenSlice";
import jwtDecode from "jwt-decode";

const Navbar = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const user = useUser();
  const isOpen = useIsOpen();
  const dispatch = useDispatch();
  const [userName, setUserName] = React.useState("");
  const router = useRouter();

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const closeSideNav = () => {
    dispatch(closed());
  };

  React.useEffect(() => {
    const accessData = jwt.decode(
      user.accessToken,
      process.env.ACCESS_TOKEN_SECRET
    );
    if (accessData) setUserName(accessData.name);
  }, [user.accessToken]);

  return (
    <div className="h-14 border w-screen p-4 shadow-sm z-50 fixed bg-white ">
      <div className="w-full flex justify-between items-center h-full max-w-[1024px] m-auto">
        <div className="flex gap-4 h-full items-center">
          <div className="md:hidden">
            <IconButton
              onClick={() => {
                dispatch(opened());
              }}
            >
              <ListIcon />
            </IconButton>
          </div>
          <h1 className="text-xl md:text-3xl">
            <Link href="/">
              <a>
                <b className="text-orange-500">Food</b> Recipe
              </a>
            </Link>
          </h1>
        </div>

        <div
          className={`md:static md:w-auto md:bg-transparent md:h-fit fixed left-0 top-0 bg-orange-700 text-white h-screen w-[50%] transition-all md:border md:p-2 md:rounded-xl md:shadow-inner md:text-black  ${
            !isOpen && "w-0 overflow-hidden "
          }`}
        >
          <div className="absolute right-3 top-3 text-white md:hidden">
            <IconButton
              onClick={() => {
                dispatch(closed());
              }}
            >
              <CloseIcon className="text-white" />
            </IconButton>
          </div>

          <ul className="md:flex-row md:h-fit flex flex-col gap-4 justify-center items-center h-full">
            <li
              onClick={closeSideNav}
              className={router.pathname == "/" ? "active" : ""}
            >
              <Link href="/">
                <a>Home</a>
              </Link>
            </li>
            <li
              onClick={closeSideNav}
              className={router.pathname == "/favorite" ? "active" : ""}
            >
              <Link href="/favorite">
                <a>Favorite</a>
              </Link>
            </li>
            <li
              onClick={closeSideNav}
              className={router.pathname == "/bookmark" ? "active" : ""}
            >
              <Link href="/bookmark">
                <a>Bookmark</a>
              </Link>
            </li>
            <li
              onClick={closeSideNav}
              className={router.pathname == "/myrecipes" ? "active" : ""}
            >
              <Link href="/myrecipes">
                <a>My Recipes</a>
              </Link>
            </li>
            <li
              onClick={closeSideNav}
              className={router.pathname == "/createrecipes" ? "active" : ""}
            >
              <Link href="/createrecipes">
                <a>Create Recipes</a>
              </Link>
            </li>
          </ul>
        </div>

        <Box
          sx={{ display: "flex", alignItems: "center", textAlign: "center" }}
        >
          <Tooltip title="Account settings">
            <IconButton
              onClick={handleClick}
              size="small"
              sx={{ ml: 2 }}
              aria-controls={open ? "account-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
            >
              <Avatar sx={{ width: 40, height: 40 }}>
                {user.accessToken && userName[0]}
              </Avatar>
            </IconButton>
          </Tooltip>
        </Box>
        <Menu
          anchorEl={anchorEl}
          id="account-menu"
          open={open}
          onClose={handleClose}
          onClick={handleClose}
          PaperProps={{
            elevation: 0,
            sx: {
              overflow: "visible",
              filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
              mt: 1.5,
              "& .MuiAvatar-root": {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              "&:before": {
                content: '""',
                display: "block",
                position: "absolute",
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: "background.paper",
                transform: "translateY(-50%) rotate(45deg)",
                zIndex: 0,
              },
            },
          }}
          transformOrigin={{ horizontal: "right", vertical: "top" }}
          anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        >
          {user.accessToken ? (
            <MenuItem>
              <Button
                variant="text"
                onClick={() => {
                  dispatch(logout());
                }}
              >
                Logout
              </Button>
            </MenuItem>
          ) : (
            <Link href="/auth/signin">
              <a>
                <MenuItem>
                  <Button variant="text">Login </Button>
                </MenuItem>
              </a>
            </Link>
          )}
        </Menu>
      </div>
    </div>
  );
};

export default Navbar;
