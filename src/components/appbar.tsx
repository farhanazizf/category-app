import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import {
  Box,
  Drawer,
  Toolbar,
  CssBaseline,
  List,
  Typography,
  Divider,
  IconButton,
  ListItemText,
  CardMedia,
  CardContent,
  // Button,
  Skeleton,
} from "@mui/material";
import {
  Menu as MenuIcon,
  ExpandLess,
  ExpandMore,
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
} from "@mui/icons-material";
import axios from "../libs/axios";
import Styled from "./style";
import useToast from "./toast";

const drawerWidth = 300;

interface IData {
  id: number;
  parent_id: number;
  name: string;
  is_active: boolean;
  position: number;
  level: number;
  product_count: number;
  children_data: IData[];
}

interface ICategory {
  sku: string;
  category_id: number;
  position: number;
}

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create("margin", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginRight: -drawerWidth,
  ...(open && {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginRight: 0,
  }),
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginRight: drawerWidth,
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-start",
}));

const initialLvl = { first: 0, second: 0, third: 0, fourth: 0 };

export default function PersistentDrawerRight() {
  const theme = useTheme();
  const [Toast, setToast] = useToast();
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [category, setCategory] = React.useState<IData>();
  const [indexesNow, setIndexes] = React.useState<{
    first: number;
    second: number;
    third: number;
    fourth: number;
  }>(initialLvl);
  // const [selected, setSelected] = React.useState("");
  const [selectCategory, setSelectedCategorty] = React.useState<ICategory[]>();

  React.useEffect(() => {
    const getAPI = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get<IData>("/rest/default/V1/categories");
        // console.log(data);
        setCategory(data);
      } catch (error) {
        setToast({ message: "Error, please try again later!" });
      } finally {
        setLoading(false);
      }
    };

    getAPI();

    // eslint-disable-next-line
  }, []);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleOpenSettings = (id: number, level: number) => {
    let levelNow = level - 1;
    // console.log(levelNow);
    switch (levelNow) {
      case 1:
        setIndexes({
          ...indexesNow,
          first: id === indexesNow.first ? initialLvl.first : id,
        });
        break;
      case 2:
        setIndexes({
          ...indexesNow,
          second: id === indexesNow.second ? initialLvl.second : id,
        });
        break;
      case 3:
        setIndexes({
          ...indexesNow,
          third: id === indexesNow.third ? initialLvl.third : id,
        });
        break;
      default:
        setIndexes({
          ...indexesNow,
          fourth: id === indexesNow.fourth ? initialLvl.fourth : id,
        });
        break;
    }
  };

  const handleMenu = async (category_id: number) => {
    try {
      setLoading(true);
      const { data } = await axios.get<ICategory[]>(
        `/rest/default/V1/categories/${category_id}/products`
      );
      // console.log(data);
      // setSelected(name);
      setSelectedCategorty(data);
    } catch (error) {
      setToast({ message: "Error, please try again later!" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <Typography variant="h6" noWrap sx={{ flexGrow: 1 }} component="div">
            Name
          </Typography>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="end"
            onClick={handleDrawerOpen}
            sx={{ ...(open && { display: "none" }) }}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Main open={open}>
        <Toast />
        <DrawerHeader />
        <Styled.FlexContainer>
          {!loading &&
            selectCategory?.map((val, indx) => (
              <Styled.Card sx={{ maxWidth: 345 }} key={indx}>
                <CardMedia
                  component="img"
                  alt="green iguana"
                  height="140"
                  image={"https://i.stack.imgur.com/y9DpT.jpg"}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {val.sku}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Rhoncus dolor purus non enim praesent elementum
                    facilisis leo vel. Risus at ultrices mi tempus imperdiet.
                    Semper risus in hendrerit gravida rutrum quisque non tellus.
                  </Typography>
                </CardContent>
                {/* <CardActions>
                <Button size="small">Share</Button>
                <Button size="small">Learn More</Button>
              </CardActions> */}
              </Styled.Card>
            ))}
          {loading ? (
            <Styled.FlexContainer>
              {[...Array(6)].map((_, indx) => (
                <Skeleton
                  key={indx}
                  variant="rectangular"
                  width={345}
                  height={250}
                  style={{ margin: 20 }}
                />
              ))}
            </Styled.FlexContainer>
          ) : null}
        </Styled.FlexContainer>
        {/* <Typography paragraph>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Rhoncus
          dolor purus non enim praesent elementum facilisis leo vel. Risus at
          ultrices mi tempus imperdiet. Semper risus in hendrerit gravida rutrum
          quisque non tellus. Convallis convallis tellus id interdum velit
          laoreet id donec ultrices. Odio morbi quis commodo odio aenean sed
          adipiscing. Amet nisl suscipit adipiscing bibendum est ultricies
          integer quis. Cursus euismod quis viverra nibh cras. Metus vulputate
          eu scelerisque felis imperdiet proin fermentum leo. Mauris commodo
          quis imperdiet massa tincidunt. Cras tincidunt lobortis feugiat
          vivamus at augue. At augue eget arcu dictum varius duis at consectetur
          lorem. Velit sed ullamcorper morbi tincidunt. Lorem donec massa sapien
          faucibus et molestie ac.
        </Typography>
        <Typography paragraph>
          Consequat mauris nunc congue nisi vitae suscipit. Fringilla est
          ullamcorper eget nulla facilisi etiam dignissim diam. Pulvinar
          elementum integer enim neque volutpat ac tincidunt. Ornare suspendisse
          sed nisi lacus sed viverra tellus. Purus sit amet volutpat consequat
          mauris. Elementum eu facilisis sed odio morbi. Euismod lacinia at quis
          risus sed vulputate odio. Morbi tincidunt ornare massa eget egestas
          purus viverra accumsan in. In hendrerit gravida rutrum quisque non
          tellus orci ac. Pellentesque nec nam aliquam sem et tortor. Habitant
          morbi tristique senectus et. Adipiscing elit duis tristique
          sollicitudin nibh sit. Ornare aenean euismod elementum nisi quis
          eleifend. Commodo viverra maecenas accumsan lacus vel facilisis. Nulla
          posuere sollicitudin aliquam ultrices sagittis orci a.
        </Typography> */}
      </Main>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
          },
        }}
        variant="persistent"
        anchor="right"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {category?.children_data.map((val) => (
            <React.Fragment key={val.id}>
              <Styled.ListFirst
                key={val.id}
                onClick={() =>
                  val.children_data.length > 0
                    ? handleOpenSettings(val.id, val.level)
                    : handleMenu(val.id)
                }
              >
                <ListItemText primary={val.name} />
                {val.children_data.length > 0 ? (
                  indexesNow.first === val.id ? (
                    <ExpandLess />
                  ) : (
                    <ExpandMore />
                  )
                ) : null}
              </Styled.ListFirst>
              {val.children_data.length > 0 ? (
                <Styled.CollapseFirst
                  in={indexesNow.first === val.id}
                  timeout="auto"
                  component="ul"
                  unmountOnExit
                >
                  <List component="li">
                    {val.children_data.map((vals) => (
                      <React.Fragment key={vals.id}>
                        <Styled.ListFirst
                          key={vals.id}
                          onClick={() =>
                            vals.children_data.length > 0
                              ? handleOpenSettings(vals.id, vals.level)
                              : handleMenu(vals.id)
                          }
                        >
                          <ListItemText inset primary={vals.name} />
                          {vals.children_data.length > 0 ? (
                            indexesNow.second === vals.id ? (
                              <ExpandLess />
                            ) : (
                              <ExpandMore />
                            )
                          ) : null}
                        </Styled.ListFirst>
                        {vals.children_data.length > 0 ? (
                          <Styled.CollapseFirst
                            in={indexesNow.second === vals.id}
                            timeout="auto"
                            component="ul"
                            unmountOnExit
                          >
                            <List component="li">
                              {vals.children_data.map((valz) => (
                                <React.Fragment key={valz.id}>
                                  <Styled.ListFirst
                                    onClick={() =>
                                      valz.children_data.length > 0
                                        ? handleOpenSettings(
                                            valz.id,
                                            valz.level
                                          )
                                        : handleMenu(valz.id)
                                    }
                                  >
                                    <ListItemText inset primary={valz.name} />
                                    {valz.children_data.length > 0 ? (
                                      indexesNow.third === valz.id ? (
                                        <ExpandLess />
                                      ) : (
                                        <ExpandMore />
                                      )
                                    ) : null}
                                  </Styled.ListFirst>
                                  {vals.children_data.length > 0 ? (
                                    <Styled.CollapseFirst
                                      in={indexesNow.third === valz.id}
                                      timeout="auto"
                                      component="ul"
                                      unmountOnExit
                                    >
                                      <List component="li">
                                        {valz.children_data.map((valx) => (
                                          <Styled.ListFirst
                                            key={valx.id}
                                            onClick={() => handleMenu(valx.id)}
                                          >
                                            <ListItemText
                                              inset
                                              primary={valx.name}
                                            />
                                          </Styled.ListFirst>
                                        ))}
                                      </List>
                                    </Styled.CollapseFirst>
                                  ) : null}
                                </React.Fragment>
                              ))}
                            </List>
                          </Styled.CollapseFirst>
                        ) : null}
                      </React.Fragment>
                    ))}
                  </List>
                </Styled.CollapseFirst>
              ) : null}
            </React.Fragment>
          ))}
        </List>
        {/* <Divider />
        <List>
          {["All mail", "Trash", "Spam"].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List> */}
      </Drawer>
    </Box>
  );
}
