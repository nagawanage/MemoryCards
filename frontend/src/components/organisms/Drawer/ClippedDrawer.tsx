import React from "react";
import { ReactNode } from "react";
import Link from "next/link";

import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import AppBar from "@mui/material/AppBar";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import HomeIcon from "@mui/icons-material/Home";
import LogoutIcon from "@mui/icons-material/Logout";
// import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import ViewListIcon from "@mui/icons-material/ViewList";

const drawerWidth = 240;

const drawerItemsTop = [{ name: "Home", icon: HomeIcon, url: "/" }];
const drawerItemsMain = [
  { name: "新規作成", icon: EditIcon, url: "/word/create" },
  { name: "一覧", icon: ViewListIcon, url: "/word/list" },
];
const drawerItemsBottom = [{ name: "Logout", icon: LogoutIcon, url: "/" }];

type Props = {
  children: ReactNode;
};

type CustomListItemProps = {
  item: {
    name: string;
    url: string;
  };
  children: React.ReactNode;
};

const CustomListItem = ({
  item,
  children,
}: CustomListItemProps): JSX.Element => {
  return (
    <ListItem
      key={item.name}
      disablePadding
      component={Link}
      href={item.url}
      sx={{
        color: "inherit",
        textDecoration: "none",
        "&:hover": {
          textDecoration: "underline",
        },
      }}
    >
      {children}
    </ListItem>
  );
};

const ClippedDrawer = (props: Props) => {
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            単語カードアプリ
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: "auto" }}>
          {/* Menu Top */}
          <List>
            {drawerItemsTop.map((item, index) => (
              <CustomListItem key={item.name} item={item}>
                <ListItemButton>
                  <ListItemIcon key={item.name}>
                    {/* <item.icon className="w-8 h-8" /> */}
                    <item.icon />
                    {/* <Link href="/about">Go to the about page</Link> */}
                  </ListItemIcon>
                  <ListItemText primary={item.name} />
                </ListItemButton>
              </CustomListItem>
            ))}
          </List>
          <Divider />

          {/* Menu Main */}
          <List>
            {drawerItemsMain.map((item, index) => (
              <CustomListItem key={item.name} item={item}>
                <ListItemButton>
                  <ListItemIcon key={item.name}>
                    {/* <item.icon className="w-8 h-8" /> */}
                    <item.icon />
                    {/* <Link href="/about">Go to the about page</Link> */}
                  </ListItemIcon>
                  <ListItemText primary={item.name} />
                </ListItemButton>
              </CustomListItem>
            ))}
          </List>
          <Divider />

          {/* Menu Bottom */}
          <List>
            {drawerItemsBottom.map((item, index) => (
              <CustomListItem key={item.name} item={item}>
                <ListItemButton>
                  <ListItemIcon>
                    <LogoutIcon />
                  </ListItemIcon>
                  <ListItemText primary={item.name} />
                </ListItemButton>
              </CustomListItem>
            ))}
          </List>
        </Box>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        {props.children}
      </Box>
    </Box>
  );
};

export default ClippedDrawer;
