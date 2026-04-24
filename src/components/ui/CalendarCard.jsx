import { Card, CardContent, Divider, List, ListItem, ListItemText, Typography } from "@mui/material";
import { DateCalendar } from "@mui/x-date-pickers";
import dayjs from "dayjs";

function CalendarCard() {
    const todayLabel = dayjs().format("dddd, MMMM D");

    return (
        <Card variant="outlined" sx={{ borderColor: "divider" }}>
            <CardContent>
                <Typography variant="h6" fontWeight={700}>
                    Calendar
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                    {todayLabel}
                </Typography>
                <DateCalendar views={["day"]} sx={{ width: "100%" }} />
                <Divider sx={{ my: 1.5 }} />
                <Typography variant="subtitle2" sx={{ mb: 1 }}>
                    Upcoming lessons
                </Typography>

                <List dense disablePadding>
                    <ListItem disableGutters>
                        <ListItemText primary="Math basics" secondary="09:00 - 09:45" />
                    </ListItem>
                    <ListItem disableGutters>
                        <ListItemText primary="Programming intro" secondary="12:00 - 13:00" />
                    </ListItem>
                    <ListItem disableGutters>
                        <ListItemText primary="English conversation" secondary="15:00 - 15:40" />
                    </ListItem>
                </List>
            </CardContent>
        </Card>
    );
}

export default CalendarCard;