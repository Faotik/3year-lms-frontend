import { Box, Grid, Stack, Typography } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useMemo, useState } from "react";
import NavBar from "../components/layout/NavBar";
import Sidebar from "../components/layout/Sidebar";
import StatCard from "../components/ui/StatCard";
import ChartCard from "../components/ui/ChartCard";
import CalendarCard from "../components/ui/CalendarCard";
import StudentsTable from "../components/ui/StudentsTable";
import UserRegistrationForm from "../components/ui/UserRegistrationForm";

function AdminPage() {
    const [activePage, setActivePage] = useState("dashboard");
    const [users, setUsers] = useState([
        { name: "John Doe", email: "john@example.com", role: "student", course: "Math", progress: 82 },
        { name: "Anna Smith", email: "anna@example.com", role: "teacher", course: "Physics", progress: 67 },
        { name: "Maya Brown", email: "maya@example.com", role: "student", course: "Programming", progress: 91 }
    ]);

    const dashboardStats = useMemo(() => {
        const totalUsers = users.length;
        const students = users.filter((user) => user.role === "student").length;
        const teachers = users.filter((user) => user.role === "teacher").length;
        const averageProgress =
            users.reduce((sum, user) => sum + user.progress, 0) / (users.length || 1);

        return [
            { title: "Total users", value: String(totalUsers), interval: "Current workspace", trend: "up" },
            { title: "Students", value: String(students), interval: "Active learners", trend: "up" },
            { title: "Teachers", value: String(teachers), interval: "Course mentors", trend: "neutral" },
            { title: "Avg progress", value: `${Math.round(averageProgress)}%`, interval: "All users", trend: "up" }
        ];
    }, [users]);

    const handleRegisterUser = (form) => {
        setUsers((prev) => [
            {
                ...form,
                email: form.email.toLowerCase(),
                progress: 0
            },
            ...prev
        ]);
        setActivePage("dashboard");
    };

    const pageTitle = activePage === "dashboard" ? "Dashboard" : "Register users";

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Box sx={{ display: "flex", minHeight: "100vh" }}>
                <Sidebar activePage={activePage} onChangePage={setActivePage} />
                <Box sx={{ flexGrow: 1 }}>
                    <NavBar title={pageTitle} />
                    <Box sx={{ p: { xs: 2, md: 3 } }}>
                        {activePage === "dashboard" ? (
                            <Stack spacing={3}>
                                <Grid container spacing={2}>
                                    {dashboardStats.map((card) => (
                                        <Grid key={card.title} size={{ xs: 12, sm: 6, lg: 3 }}>
                                            <StatCard
                                                title={card.title}
                                                value={card.value}
                                                interval={card.interval}
                                                trend={card.trend}
                                            />
                                        </Grid>
                                    ))}
                                </Grid>

                                <Grid container spacing={2}>
                                    <Grid size={{ xs: 12, lg: 8 }}>
                                        <ChartCard />
                                    </Grid>
                                    <Grid size={{ xs: 12, lg: 4 }}>
                                        <CalendarCard />
                                    </Grid>
                                </Grid>

                                <Box>
                                    <Typography variant="h6" sx={{ mb: 1.2 }} fontWeight={700}>
                                        Registered users
                                    </Typography>
                                    <StudentsTable rows={users} />
                                </Box>
                            </Stack>
                        ) : (
                            <UserRegistrationForm onRegister={handleRegisterUser} />
                        )}
                    </Box>
                </Box>
            </Box>
        </LocalizationProvider>
    );
}

export default AdminPage