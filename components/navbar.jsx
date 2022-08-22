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

const Navbar = ({ isOpen, setIsOpen }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const user = useUser();
  const dispatch = useDispatch();

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  function getUserName() {
    const accessData = jwt.decode(
      user.accessToken,
      process.env.ACCESS_TOKEN_SECRET
    );

    return accessData.name;
  }

  return (
    <div className="flex justify-between items-center h-14 border w-screen md:w-[calc(100%-15rem)] lg:w-[calc(100%-20rem)] px-12 md:px-8 shadow-sm">
      <div className="flex gap-4 h-[100%] items-center ">
        <IconButton
          className="text-black"
          onClick={() => {
            setIsOpen(!isOpen);
          }}
        >
          <ListIcon className="md:hidden w-8 h-8" />
        </IconButton>
        <h1 className="text-xl md:text-3xl">
          <Link href="/">
            <a>
              <b className="text-orange-500">Food</b> Recipe
            </a>
          </Link>
        </h1>
      </div>

      <input
        type="text"
        className="border rounded-md h-10 p-4 outline-orange-600 hidden sm:block"
        placeholder="Search..."
      />

      <Box sx={{ display: "flex", alignItems: "center", textAlign: "center" }}>
        <Tooltip title="Account settings">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
          >
            <Avatar sx={{ width: 32, height: 32 }}>
              {user.accessToken && getUserName()[0].toUpperCase()}
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
  );
};

export default Navbar;
