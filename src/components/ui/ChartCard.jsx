import {
    Card, CardContent, Typography, useTheme
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
import PropTypes from "prop-types";

function ChartCard({ data, title, subtitle, dataKey }) {
    const theme = useTheme();
    const isDark = theme.palette.mode === "dark";

    return (
        <Card variant="outlined" sx={{ borderColor: "divider", height: "100%" }}>
            <CardContent>
                <Typography variant="h6" fontWeight={700}>
                    {title}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2.5 }}>
                    {subtitle}
                </Typography>
                <ResponsiveContainer width="100%" height={260}>
                    <LineChart data={data} margin={{ top: 8, right: 8, left: -20, bottom: 0 }}>
                        <CartesianGrid stroke={theme.palette.divider} strokeDasharray="4 4" />
                        <XAxis
                            dataKey="name"
                            tickLine={false}
                            axisLine={false}
                            tick={{ fill: theme.palette.text.secondary }}
                        />
                        <YAxis
                            tickLine={false}
                            axisLine={false}
                            tick={{ fill: theme.palette.text.secondary }}
                        />
                        <Tooltip />
                        <Line
                            type="monotone"
                            dataKey={dataKey}
                            stroke={isDark ? "#60a5fa" : "#1d4ed8"}
                            strokeWidth={3}
                            dot={{ r: 3, fill: isDark ? "#60a5fa" : "#1d4ed8", strokeWidth: 0 }}
                            activeDot={{ r: 5, fill: isDark ? "#93c5fd" : "#1e40af", strokeWidth: 0 }}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    );
}

ChartCard.propTypes = {
    data: PropTypes.array,
    title: PropTypes.string,
    subtitle: PropTypes.string,
    dataKey: PropTypes.string
};

export default ChartCard;