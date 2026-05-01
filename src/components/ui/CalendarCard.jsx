import { Card, CardContent, Divider, List, ListItem, ListItemText, Typography } from "@mui/material";
import { DateCalendar } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import getUpcoming from "../../services/getUpcoming";

function CalendarCard() {
    const todayLabel = dayjs().format("dddd, MMMM D");
    const [deadlines, setDeadlines] = useState([]);

    useEffect(() => {
        async function fetchUpcoming() {
            try {
                const response = await getUpcoming();
                if (response.ok) {
                    const data = await response.json();
                    setDeadlines(data);
                }
            } catch (error) {
                console.error("Failed to fetch upcoming deadlines:", error);
            }
        }
        fetchUpcoming();
    }, []);

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
                    Upcoming deadlines
                </Typography>

                <List dense disablePadding>
                    {deadlines.length === 0 ? (
                        <ListItem disableGutters>
                            <ListItemText primary="No upcoming deadlines" secondary="Enjoy your free time!" />
                        </ListItem>
                    ) : (
                        deadlines.map((deadline) => (
                            <ListItem key={deadline.id || deadline._id} disableGutters>
                                <ListItemText
                                    primary={deadline.title}
                                    secondary={dayjs(deadline.deadline).format("MMM D, HH:mm")}
                                />
                            </ListItem>
                        ))
                    )}
                </List>
            </CardContent>
        </Card>
    );
}

export default CalendarCard;