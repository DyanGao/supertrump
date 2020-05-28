import React, { useCallback } from "react";
import { withRouter, RouteComponentProps } from "react-router";
import { AppBar, IconButton, Menu, MenuItem } from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import ExitIcon from "@material-ui/icons/ExitToApp";
import { Link } from "react-router-dom";
import { Toolbar } from "./Nav.styles";

interface Props {
  onLogout: () => void;
}

function Nav({ history, onLogout }: RouteComponentProps & Props) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const handleLogout = useCallback(() => {
    onLogout();
    history.push("/");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onLogout]);

  const handleMenuOpen = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) =>
      setAnchorEl(event.currentTarget),
    [setAnchorEl]
  );

  const handleMenuClose = useCallback(() => setAnchorEl(null), [setAnchorEl]);

  return (
    <AppBar>
      <Toolbar>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="Menu"
          onClick={handleMenuOpen}
        >
          <MenuIcon />
        </IconButton>
        <Menu
          id="navigation-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={handleMenuClose}>
            <Link to="/game">Game</Link>
          </MenuItem>
          <MenuItem onClick={handleMenuClose}>
            <Link to="/admin">Admin</Link>
          </MenuItem>
        </Menu>
        <IconButton
          edge="end"
          color="inherit"
          arial-label="Logout"
          onClick={handleLogout}
        >
          <ExitIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}

export default withRouter(Nav);