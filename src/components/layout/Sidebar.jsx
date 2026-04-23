import { Drawer, List, ListItem, ListItemText } from "@mui/material";

const drawerWidth = 240;

function Sidebar() {
    return (
        <Drawer
            variant="permanent"
            sx={{
                width: drawerWidth,
                [`& .MuiDrawer-paper`]: { width: drawerWidth },
            }}
        >
            <List>
                {["Dashboard", "Users", "Settings"].map((text) => (
                    <ListItem button key={text}>
                        <ListItemText primary={text} />
                    </ListItem>
                ))}
            </List>
        </Drawer>
    );
}

export default Sidebar;