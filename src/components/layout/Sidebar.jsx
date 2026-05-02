import {
    Box,
    Chip,
    Drawer,
    List,
    ListItemButton,
    ListItemText,
    Typography
} from "@mui/material";
import DashboardRoundedIcon from "@mui/icons-material/DashboardRounded";
import PersonAddAltRoundedIcon from "@mui/icons-material/PersonAddAltRounded";
import ManageAccountsRoundedIcon from "@mui/icons-material/ManageAccountsRounded";

/**
 * Menu items configuration for the sidebar
 */
const menuItems = [
    { key: "dashboard", label: "Dashboard", icon: <DashboardRoundedIcon fontSize="small" /> },
    { key: "register", label: "Register users", icon: <PersonAddAltRoundedIcon fontSize="small" /> },
    { key: "manage", label: "Manage users", icon: <ManageAccountsRoundedIcon fontSize="small" /> }
];

/**
 * Fixed width for the sidebar drawer
 */
const drawerWidth = 240;

/**
 * Sidebar component provides naviagation on the admin panel admin users
 * It displays constant sidebar on desktop and a burger menu on mobile
 */
function Sidebar({ activePage, onChangePage, mobileOpen, onMobileClose }) {
    // Side-bar sections for desktop and mobile
    const drawerContent = (
        <>
            {/* Admin Panel Information */}
            <Box sx={{ px: 1.5, py: 1, mb: 2 }}>
                <Typography variant="h6" fontWeight={700}>
                    LearnLite Admin
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Personal LMS panel
                </Typography>
                <Chip
                    label="Simple mode"
                    color="primary"
                    size="small"
                    sx={{ mt: 1.5, borderRadius: 2 }}
                />
            </Box>

            {/* Navigation list */}
            <List sx={{ px: 0.5 }}>
                {menuItems.map((item) => (
                    <ListItemButton
                        key={item.key}
                        selected={activePage === item.key}
                        onClick={() => {
                            onChangePage(item.key);
                            // Close mobile drawer after selection
                            if (onMobileClose) onMobileClose();
                        }}
                        sx={{
                            borderRadius: 3,
                            mb: 0.5,
                            gap: 1
                        }}
                    >
                        {item.icon}
                        <ListItemText primary={item.label} />
                    </ListItemButton>
                ))}
            </List>
        </>
    );

    return (
        <>
            {/* Burger menu for mobile screens */}
            <Drawer
                variant="temporary"
                open={mobileOpen}
                onClose={onMobileClose}
                ModalProps={{ keepMounted: true }}
                sx={{
                    display: { xs: "block", md: "none" },
                    [`& .MuiDrawer-paper`]: {
                        width: drawerWidth,
                        boxSizing: "border-box",
                        borderRight: "1px solid",
                        borderColor: "divider",
                        px: 1.5,
                        py: 2
                    }
                }}
            >
                {drawerContent}
            </Drawer>

            {/* Constant sidebar for desktop */}
            <Drawer
                variant="permanent"
                sx={{
                    display: { xs: "none", md: "block" },
                    width: drawerWidth,
                    flexShrink: 0,
                    [`& .MuiDrawer-paper`]: {
                        width: drawerWidth,
                        boxSizing: "border-box",
                        borderRight: "1px solid",
                        borderColor: "divider",
                        px: 1.5,
                        py: 2
                    }
                }}
                open
            >
                {drawerContent}
            </Drawer>
        </>
    );
}

export default Sidebar;