import { Box, createTheme, CssBaseline, Grid, Stack, ThemeProvider, Typography } from "@mui/material";
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

function AdminPanel() {
    //const themeMode = "dark";
    const themeMode = "light";
    const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
    const [activePage, setActivePage] = useState("dashboard");

    const [users, setUsers] = useState([
        { name: "John Doe", email: "john@example.com", role: "student", course: "Math", ID: 82 },
        { name: "Anna Smith", email: "anna@example.com", role: "teacher", course: "Physics", ID: 67 },
        { name: "Maya Brown", email: "maya@example.com", role: "student", course: "Programming", ID: 91 }
    ]);

    const dashboardStats = useMemo(() => {
        const totalUsers = users.length;
        const students = users.filter((user) => user.role === "student").length;
        const teachers = users.filter((user) => user.role === "teacher").length;
        const averageProgress =
            users.reduce((sum, user) => sum + user.ID, 0) / (users.length || 1);

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
                ID: 0
            },
            ...prev
        ]);
        setActivePage("dashboard");
    };

    const pageTitle = activePage === "dashboard" ? "Admin panel" : "Register users";

    const adminTheme = useMemo(
        () =>
            createTheme({
                palette: {
                    mode: themeMode,
                    primary: {
                        main: "#3b82f6"
                    },
                    secondary: {
                        main: themeMode === "dark" ? "#22c55e" : "#16a34a"
                    },
                    divider: themeMode === "dark" ? "#2a2f3a" : "#d7e0ef",
                    background:
                        themeMode === "dark"
                            ? {
                                  default: "#0b0b0b",
                                  paper: "#151515"
                              }
                            : {
                                  default: "#f3f7ff",
                                  paper: "#ffffff"
                              },
                    text:
                        themeMode === "dark"
                            ? {
                                  primary: "#f5f5f5",
                                  secondary: "#b8b8b8"
                              }
                            : {
                                  primary: "#101828",
                                  secondary: "#475467"
                              }
                },
                shape: {
                    borderRadius: 14
                },
                typography: {
                    fontFamily: "'Inter', 'Roboto', 'Segoe UI', sans-serif"
                },
                components: {
                    MuiAppBar: {
                        styleOverrides: {
                            root: {
                                backgroundImage: "none",
                                backgroundColor: themeMode === "dark" ? "#101217" : "#ffffff"
                            }
                        }
                    },
                    MuiDrawer: {
                        styleOverrides: {
                            paper: {
                                backgroundImage: "none",
                                backgroundColor: themeMode === "dark" ? "#101217" : "#ffffff"
                            }
                        }
                    },
                    MuiCard: {
                        styleOverrides: {
                            root: {
                                backgroundImage: "none",
                                borderColor: themeMode === "dark" ? "#2a2f3a" : "#d7e0ef"
                            }
                        }
                    },
                    MuiChip: {
                        styleOverrides: {
                            root: {
                                borderRadius: 10
                            }
                        }
                    }
                }
            }),
        [themeMode]
    );

    return (
        <ThemeProvider theme={adminTheme}>
            <CssBaseline />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <Box sx={{ display: "flex", minHeight: "100vh" }}>
                    <Sidebar
                        activePage={activePage}
                        onChangePage={setActivePage}
                        mobileOpen={mobileSidebarOpen}
                        onMobileClose={() => setMobileSidebarOpen(false)}
                    />
                    <Box
                        sx={{
                            flexGrow: 1,
                            minWidth: 0,
                            maxWidth: "100%",
                            display: "flex",
                            flexDirection: "column",
                        }}
                    >
                        <NavBar title={pageTitle} description={"Platform administration"} onOpenSidebar={() => setMobileSidebarOpen(true)} />
                        <Box
                            component="main"
                            sx={{
                                flex: 1,
                                minWidth: 0,
                                overflowX: "auto",
                                p: { xs: 2, md: 3 },
                            }}
                        >
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
        </ThemeProvider>
    );
}

export default AdminPanel