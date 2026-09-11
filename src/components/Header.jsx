import * as React from "react";
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  Container,
  Avatar,
  Button,
  Tooltip,
  MenuItem,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ProfileIcon from "@mui/icons-material/AccountCircle";

const pages = [
  { name: "Home", link: "/", icon: <HomeIcon /> },
  { name: "Search", link: "/search", icon: <SearchIcon /> },
  { name: "Saved Cards", link: "/saved-cards", icon: <FavoriteIcon /> },
];
const settings = [
  { name: "Profile", link: "/profile" },
  { name: "My List", link: "/my-list" },
  { name: "Logout", link: "/logout" },
];

function Header() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: "#d158b7",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.25)",
        display: "flex",
        justifyContent: "stretch",
        alignItems: "center",
      }}
    >
      <Container
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "stretch",
          margin: 0,
          padding: 0,
        }}
      >
        <Toolbar disableGutters>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <div
                style={{
                  borderRadius: "50%",
                  backgroundColor: "#58d1bf",
                  marginRight: "1rem",
                  paddingTop: "0.25rem",
                  width: "3rem",
                  height: "2.75rem",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Button
                  key={page.name}
                  onClick={() => (window.location.href = page.link)}
                  sx={{ my: 2, color: "white", display: "block" }}
                >
                  {page.icon}
                </Button>
              </div>
            ))}
          </Box>
          <div>
            <Typography
              variant="h6"
              noWrap
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "'Bitcount Prop Double Ink', sans-serif",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              Jirachi's Wishlist
            </Typography>
          </div>
          <div sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
            ></IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: "block", md: "none" } }}
            >
              {pages.map((page) => (
                <MenuItem
                  key={page.localId}
                  onClick={() => (window.location.href = page.link)}
                >
                  <Typography sx={{ textAlign: "center" }}>
                    {page.name}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </div>
          <div
            sx={{
              flexGrow: 0,
              display: "flex",
              alignItems: "center",
              gap: 2,
            }}
          >
            <Tooltip title="Open settings">
              <IconButton
                onClick={handleOpenUserMenu}
                style={{ p: 0, backgroundColor: "#58d1bf" }}
              >
                <Avatar
                  style={{ backgroundColor: "#58d1bf" }}
                  alt="Remy Sharp"
                  icon="ProfileIcon"
                />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem
                  key={setting.name}
                  onClick={() => (window.location.href = setting.link)}
                >
                  <Typography sx={{ textAlign: "center" }}>
                    {setting.name}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </div>
          <Button
            key={"logout"}
            onClick={() => (window.location.href = "/logout")}
            sx={{ my: 2, color: "white", display: "block" }}
          >
            Logout
          </Button>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Header;
