import * as React from "react";
import { useNavigate, Link } from "react-router-dom";
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

const pages = [
  { name: "Home", link: "/", icon: <HomeIcon /> },
  { name: "Search", link: "/search", icon: <SearchIcon /> },
  {
    name: "Saved Cards",
    link: "/saved-cards",
    icon: <FavoriteIcon />,
  },
];

const settings = [
  { name: "Profile", link: "/profile" },
  { name: "My List", link: "/my-list" },
  { name: "Logout", link: "/logout" },
];

function Header() {
  const navigate = useNavigate();

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
      }}
    >
      <Container maxWidth={false} disableGutters sx={{ width: "100%" }}>
        <Toolbar
          disableGutters
          sx={{
            minHeight: "80px",
            px: 2,
            position: "relative",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {/* LEFT SIDE */}
          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              alignItems: "center",
              gap: 1.5,
            }}
          >
            {pages.map((page) => (
              <Box
                key={page.name}
                sx={{
                  borderRadius: "50%",
                  backgroundColor: "#58d1bf",
                  width: "3rem",
                  height: "2.75rem",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Button
                  component={Link}
                  to={page.link}
                  onClick={handleCloseNavMenu}
                  sx={{
                    minWidth: 0,
                    color: "white",
                    p: 1,
                  }}
                >
                  {page.icon}
                </Button>
              </Box>
            ))}
          </Box>

          {/* MOBILE MENU */}
          <Box
            sx={{
              display: { xs: "flex", md: "none" },
            }}
          >
            <IconButton
              size="large"
              color="inherit"
              aria-label="navigation menu"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
            >
              <HomeIcon />
            </IconButton>

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
            >
              {pages.map((page) => (
                <MenuItem
                  key={page.name}
                  onClick={() => {
                    navigate(page.link);
                    handleCloseNavMenu();
                  }}
                >
                  <Typography>{page.name}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          {/* CENTER TITLE */}
          <Typography
            variant="h6"
            noWrap
            sx={{
              position: "absolute",
              left: "50%",
              transform: "translateX(-50%)",
              fontFamily: "'Bitcount Prop Double Ink', sans-serif",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "white",
              textDecoration: "none",
              display: { xs: "none", md: "block" },
            }}
          >
            Jirachi's Wishlist
          </Typography>

          {/* RIGHT SIDE */}
          <Box
            sx={{
              ml: "auto",
              display: { xs: "none", md: "flex" },
              alignItems: "center",
              gap: 1.5,
            }}
          >
            <Tooltip title="Open settings">
              <IconButton
                onClick={handleOpenUserMenu}
                sx={{
                  p: 0,
                  backgroundColor: "#58d1bf",
                  "&:hover": {
                    backgroundColor: "#45bfae",
                  },
                }}
              >
                <Avatar
                  sx={{
                    backgroundColor: "#58d1bf",
                  }}
                />
              </IconButton>
            </Tooltip>

            <Menu
              sx={{ mt: "45px" }}
              id="user-menu"
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
                  onClick={() => {
                    navigate(setting.link);
                    handleCloseUserMenu();
                  }}
                >
                  <Typography>{setting.name}</Typography>
                </MenuItem>
              ))}
            </Menu>

            <Button
              onClick={() => navigate("/logout")}
              sx={{
                color: "white",
              }}
            >
              Logout
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Header;
