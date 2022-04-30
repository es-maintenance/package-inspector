import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';

import NextLink from 'next/link';

import { PluginProvider } from '../lib/PluginProvider';

const ResponsiveAppBar = ({ title }: { title: string }) => {
  const pluginProvider = new PluginProvider();

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
              {title}
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
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
          >
            {title}
          </Typography>
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
              {pluginProvider.hasReportView().map((pluginTarget) => (
                <MenuItem key={pluginTarget} onClick={handleClosePluginMenu}>
                  <Typography textAlign="center">{pluginTarget}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default ResponsiveAppBar;
