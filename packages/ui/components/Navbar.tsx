import { gql } from '@apollo/client';
import MenuIcon from '@mui/icons-material/Menu';
import {
  AppBar,
  Box,
  Button,
  Container,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Tooltip,
  Typography,
} from '@mui/material';
import NextLink from 'next/link';
import * as React from 'react';

import { useNavbarTitleQuery } from '../graphql/generated/client';
import { usePluginProvider } from '../hooks';
import { PackageSearchInput } from './';

gql`
  query NavbarTitle {
    title
  }
`;

interface NavBarProps {
  title?: string;
}

const NavBar: React.FC<NavBarProps> = (props) => {
  const pluginProvider = usePluginProvider();

  const { data } = useNavbarTitleQuery();

  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const [anchorElPluginMenu, setAnchorElUser] =
    React.useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenPluginMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleClosePluginMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <NextLink href="/">
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
            >
              <Button sx={{ my: 2, color: 'white', display: 'block' }}>
                {props.title || data?.title || '...'}
              </Button>
            </Typography>
          </NextLink>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              <MenuItem onClick={handleCloseNavMenu}>
                <NextLink href="/details">
                  <Typography textAlign="center">Details</Typography>
                </NextLink>
              </MenuItem>
              <MenuItem onClick={handleCloseNavMenu}>
                <NextLink href="/packages">
                  <Typography textAlign="center">Packages</Typography>
                </NextLink>
              </MenuItem>
            </Menu>
          </Box>
          <NextLink href="/">
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
            >
              <Button sx={{ my: 2, color: 'white', display: 'block' }}>
                {props.title || data?.title || '...'}
              </Button>
            </Typography>
          </NextLink>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            <Button sx={{ my: 2, color: 'white', display: 'block' }}>
              <NextLink href="/details">
                <Typography textAlign="center">Details</Typography>
              </NextLink>
            </Button>
            <Button sx={{ my: 2, color: 'white', display: 'block' }}>
              <NextLink href="/packages">
                <Typography textAlign="center">Packages</Typography>
              </NextLink>
            </Button>
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <PackageSearchInput />
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Button onClick={handleOpenPluginMenu} color="inherit">
              <Tooltip title="Open Plugin Menu">
                <Typography textAlign="center">Plugins</Typography>
              </Tooltip>
            </Button>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElPluginMenu}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElPluginMenu)}
              onClose={handleClosePluginMenu}
            >
              {pluginProvider?.hasReportView().map((pluginTarget) => (
                <MenuItem key={pluginTarget} onClick={handleClosePluginMenu}>
                  <NextLink
                    href={`/plugin/${encodeURIComponent(pluginTarget)}`}
                  >
                    <Typography textAlign="center">{pluginTarget}</Typography>
                  </NextLink>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default NavBar;
