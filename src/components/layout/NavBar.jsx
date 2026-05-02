import { AppBar, Avatar, Box, Button, IconButton, Stack, Toolbar, Typography } from "@mui/material";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../app/App";
import logout from "../../services/logout";

/**
 * Navbar component displaying dashboards and navigation links for users 
 * For admin users displays admin panel 
 * And logout button for all users
 */
function Navbar({ title, description, onOpenSidebar }) {
    // Hook for navigation between pages
    const navigate = useNavigate();

    // Local state to store the current user from localStorage
    const [user, setUser] = useState(() => JSON.parse(localStorage.getItem("user")));

    return (
        // Navbar container
        <AppBar
            position="sticky"
            color="inherit"
            elevation={0}
            sx={{
                borderBottom: "1px solid",
                borderColor: "divider",
                width: "100%",
                maxWidth: "100%",
                boxSizing: "border-box",
            }}
        >
            {/* Navbar toolbar */}
            <Toolbar
                sx={{
                    gap: 1,
                    px: { xs: 1, sm: 2 },
                    minWidth: 0,
                }}
            >
                {/* Mobile menu button*/}
                <IconButton
                    edge="start"
                    color="inherit"
                    aria-label="open sidebar"
                    onClick={onOpenSidebar}
                    sx={{ display: { xs: "inline-flex", md: "none" }, flexShrink: 0 }}
                >
                    <MenuRoundedIcon />
                </IconButton>

                {/* Title and description section */}
                <Box sx={{ flexGrow: 1, minWidth: 0, overflow: "hidden" }}>
                    <Typography
                        variant="h6"
                        fontWeight={700}
                        noWrap
                        title={title}
                    >
                        {title}
                    </Typography>
                    <Typography
                        variant="body2"
                        color="text.secondary"
                        noWrap
                        sx={{ display: { xs: "none", sm: "block" } }}
                        description={description}
                    >
                        {description}
                    </Typography>
                </Box>

                {/* Desktop navigation links*/}
                <Stack direction="row" spacing={1} sx={{ display: { xs: "none", md: "flex" } }}>
                    {/*Login button*/}
                    {!user && (
                        <Button color="inherit" component={RouterLink} to="/login">
                            Login
                        </Button>
                    )}

                    {/*Admin panel button*/}
                    {user && user.role == "admin" && (
                        <Button color="inherit" component={RouterLink} to="/admin-panel">
                            Admin panel
                        </Button>
                    )}

                    {/* Dashboard and Modules buttons for authenticated users*/}
                    {user && (
                        <>
                            <Button color="inherit" component={RouterLink} to="/dashboard">
                                Dashboard
                            </Button>
                            <Button color="inherit" component={RouterLink} to="/modules">
                                Modules
                            </Button>
                            {/* Logout button triggers the logout service and clears local state */}
                            <Button color="inherit" onClick={async () => {
                                await logout();
                                setUser(null);
                                localStorage.setItem("user", JSON.stringify(null));
                                navigate("/");
                            }}>
                                Logout
                            </Button>
                        </>
                    )}

                </Stack>

                {/* User avatar section*/}
                <Stack direction="row" spacing={{ xs: 0.5, sm: 1.5 }} alignItems="center" sx={{ flexShrink: 0 }}>
                    <Avatar sx={{ bgcolor: "primary.main", width: { xs: 32, sm: 34 }, height: { xs: 32, sm: 34 } }} />
                </Stack>
            </Toolbar>
        </AppBar >
    );
}

export default Navbar;