import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import MoneyIcon from "@mui/icons-material/Money";
import QrCode2Icon from "@mui/icons-material/QrCode2";
import AccessibilityIcon from "@mui/icons-material/Accessibility";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { Button } from "@mui/material";

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

const DrawerContent = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { text: "Payments", icon: <AttachMoneyIcon />, route: "customer" },
  ];

  const isActiveRoute = (route) => {
    const formattedRoute = route.startsWith("/") ? route.substring(1) : route;
    return location.pathname === `/${formattedRoute}`;
  };

  const handleClick = (route) => {
    navigate(`/${route}`);
  };

  return (
    <List>
      {menuItems.map((item, index) => (
        <ListItem key={item.text} disablePadding sx={{ display: "block" }}>
          <ListItemButton
            onClick={() => handleClick(item.route)}
            sx={{
              minHeight: 48,
              justifyContent: (theme) => (open ? "initial" : "center"),
              px: 2.5,
              backgroundColor: isActiveRoute(item.route)
                ? "#90caf9"
                : "transparent",
              color: isActiveRoute(item.route) ? "#ffff" : "black",
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: 0,
                mr: (theme) => (open ? 3 : "auto"),
                justifyContent: "center",
              }}
            >
              {item.icon}
            </ListItemIcon>
            <ListItemText
              primary={item.text}
              sx={{ opacity: (theme) => (open ? 1 : 0) }}
            />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );
};

export default function MiniDrawer() {
  const navigate = useNavigate();
  function logout() {
    localStorage.clear();
    navigate("/login");
  }
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  function logout() {
    localStorage.clear();
    navigate("/login");
  }
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: "none" }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              width: "100%",
              justifyContent: "space-between",
            }}
          >
            <Typography variant="h6" noWrap component="div">
              HSI
            </Typography>
            <Button variant="contained" onClick={() => logout()}>
              Logout
            </Button>
          </div>
        </Toolbar>
      </AppBar>

      <Drawer
        variant="permanent"
        open={open}
        PaperProps={{
          sx: {},
        }}
      >
        <DrawerHeader>
          <AccessibilityIcon style={{ fontSize: "2em" }} />
          <Typography variant="h6" noWrap component="div">
            Customer Portal
          </Typography>

          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <DrawerContent />
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        <Outlet />
      </Box>
    </Box>
  );
}
