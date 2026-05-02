import { Card, CardContent, Divider, List, ListItem, ListItemText, Typography } from "@mui/material";
import { DateCalendar } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import getUpcoming from "../../services/getUpcoming";

/**
 * CalendarCard component displays a calendar with a list of upcoming deadlines.
 * It fetches deadline data with the help of 'getUpcoming' service. 
 */
function CalendarCard() {
    // Displays the current date  in format of day name, month and date
    const todayLabel = dayjs().format("dddd, MMMM D");

    // Hook for list of upcoming deadlines
    const [deadlines, setDeadlines] = useState([]);

    /**
     * Hook for fetching upcoming deadlines on component mount.
     */
    useEffect(() => {
        async function fetchUpcoming() {
            try {
                // Fetch upcoming deadlines from 'getUpcoming' service
                const response = await getUpcoming();
                if (response.ok) {
                    const data = await response.json();
                    // Update state with fetched deadlines
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
                {/* Header with title and current date */}
                <Typography variant="h6" fontWeight={700}>
                    Calendar
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                    {todayLabel}
                </Typography>

                {/* Date Calendar Component */}
                <DateCalendar views={["day"]} sx={{ width: "100%" }} />

                <Divider sx={{ my: 1.5 }} />

                {/* Upcoming deadlines */}
                <Typography variant="subtitle2" sx={{ mb: 1 }}>
                    Upcoming deadlines
                </Typography>

                <List dense disablePadding>
                    {/* Shows deadlines if any fetched, if not, shows warning message */}
                    {deadlines.length === 0 ? (
                        <ListItem disableGutters>
                            <ListItemText primary="No upcoming deadlines" secondary="Enjoy your free time!" />
                        </ListItem>
                    ) : (
                        // Map over deadlines and display them
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