import { AppBar, Avatar, Box, IconButton, Stack, Toolbar, Typography } from "@mui/material";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";

function Navbar({ title, onOpenSidebar }) {
    return (
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
            <Toolbar
                sx={{
                    gap: 1,
                    px: { xs: 1, sm: 2 },
                    minWidth: 0,
                }}
            >
                <IconButton
                    edge="start"
                    color="inherit"
                    aria-label="open sidebar"
                    onClick={onOpenSidebar}
                    sx={{ display: { xs: "inline-flex", md: "none" }, flexShrink: 0 }}
                >
                    <MenuRoundedIcon />
                </IconButton>
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
                    >
                        Friendly learning system administration
                    </Typography>
                </Box>

                <Stack direction="row" spacing={{ xs: 0.5, sm: 1.5 }} alignItems="center" sx={{ flexShrink: 0 }}>
                    <Avatar sx={{ bgcolor: "primary.main", width: { xs: 32, sm: 34 }, height: { xs: 32, sm: 34 } }} />
                </Stack>
            </Toolbar>
        </AppBar>
    );
}

export default Navbar;