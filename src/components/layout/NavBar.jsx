import { AppBar, Avatar, Box, IconButton, Stack, Toolbar, Typography } from "@mui/material";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";

function Navbar({ title, onOpenSidebar }) {
    return (
        <AppBar
            position="sticky"
            color="inherit"
            elevation={0}
            sx={{ borderBottom: "1px solid", borderColor: "divider" }}
        >
            <Toolbar>
                <IconButton
                    edge="start"
                    color="inherit"
                    aria-label="open sidebar"
                    onClick={onOpenSidebar}
                    sx={{ display: { xs: "inline-flex", md: "none" }, mr: 1 }}
                >
                    <MenuRoundedIcon />
                </IconButton>
                <Box sx={{ flexGrow: 1 }}>
                    <Typography variant="h6" fontWeight={700}>
                        {title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Friendly learning system administration
                    </Typography>
                </Box>

                <Stack direction="row" spacing={1.5} alignItems="center">
                    <Avatar sx={{ bgcolor: "primary.main", width: 34, height: 34 }}/>
                </Stack>
            </Toolbar>
        </AppBar>
    );
}

export default Navbar;