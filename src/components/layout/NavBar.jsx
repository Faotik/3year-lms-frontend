import { AppBar, Avatar, Box, Chip, Stack, Toolbar, Typography } from "@mui/material";

export default function Navbar({ title }) {
    return (
        <AppBar
            position="sticky"
            color="inherit"
            elevation={0}
            sx={{ borderBottom: "1px solid", borderColor: "divider" }}
        >
            <Toolbar>
                <Box sx={{ flexGrow: 1 }}>
                    <Typography variant="h6" fontWeight={700}>
                        {title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Friendly learning system administration
                    </Typography>
                </Box>

                <Stack direction="row" spacing={1.5} alignItems="center">
                    <Chip size="small" label="Today: Active" color="success" />
                    <Avatar sx={{ bgcolor: "primary.main", width: 34, height: 34 }}>
                        A
                    </Avatar>
                </Stack>
            </Toolbar>
        </AppBar>
    );
}