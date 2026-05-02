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

/**
 * ChartCard component displays a chart.
 */
function ChartCard({ data, title, subtitle, dataKey }) {
    const theme = useTheme();
    // Determine if the current theme is dark mode to adjust chart colors
    const isDark = theme.palette.mode === "dark";

    return (
        <Card variant="outlined" sx={{ borderColor: "divider", height: "100%" }}>
            <CardContent>
                {/* Header section with title and subtitle */}
                <Typography variant="h6" fontWeight={700}>
                    {title}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2.5 }}>
                    {subtitle}
                </Typography>

                {/* Container to make the chart responsive to its parent size */}
                <ResponsiveContainer width="100%" height={260}>
                    <LineChart data={data} margin={{ top: 8, right: 8, left: -20, bottom: 0 }}>
                        {/* Grid lines behind the chart lines */}
                        <CartesianGrid stroke={theme.palette.divider} strokeDasharray="4 4" />

                        {/* X-axis configuration */}
                        <XAxis
                            dataKey="name"
                            tickLine={false}
                            axisLine={false}
                            tick={{ fill: theme.palette.text.secondary }}
                        />

                        {/* Y-axis configuration */}
                        <YAxis
                            tickLine={false}
                            axisLine={false}
                            tick={{ fill: theme.palette.text.secondary }}
                        />

                        {/* Tooltip that appears on hover */}
                        <Tooltip />

                        {/* The actual line plotted on the chart */}
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
// PropTypes for validation
ChartCard.propTypes = {
    data: PropTypes.array,
    title: PropTypes.string,
    subtitle: PropTypes.string,
    dataKey: PropTypes.string
};

export default ChartCard;