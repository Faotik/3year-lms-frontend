import {
    Card, CardContent, Typography
} from "@mui/material";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    CartesianGrid
} from "recharts";

const data = [
    { name: "Mon", attendance: 40 },
    { name: "Tue", attendance: 60 },
    { name: "Wed", attendance: 78 },
    { name: "Thu", attendance: 67 },
    { name: "Fri", attendance: 88 },
    { name: "Sat", attendance: 55 },
    { name: "Sun", attendance: 30 },
];

function ChartCard() {
    return (
        <Card variant="outlined" sx={{ borderColor: "divider", height: "100%" }}>
            <CardContent>
                <Typography variant="h6" fontWeight={700}>
                    Weekly attendance
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2.5 }}>
                    Student activity over the last 7 days
                </Typography>
                <ResponsiveContainer width="100%" height={260}>
                    <LineChart data={data} margin={{ top: 8, right: 8, left: -20, bottom: 0 }}>
                        <CartesianGrid stroke="#2b2b2b" strokeDasharray="4 4" />
                        <XAxis dataKey="name" tickLine={false} axisLine={false} />
                        <YAxis tickLine={false} axisLine={false} />
                        <Tooltip />
                        <Line
                            type="monotone"
                            dataKey="attendance"
                            stroke="#2563eb"
                            strokeWidth={3}
                            dot={{ r: 3 }}
                            activeDot={{ r: 5 }}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    );
}

export default ChartCard