import { Card, CardContent, Chip, Stack, Typography } from "@mui/material";
import PropTypes from "prop-types";

// Trend configuration for different trend types, including color and display label.
const trendConfig = {
    up: { color: "success", label: "Improving" },
    down: { color: "error", label: "Decreasing" },
    neutral: { color: "default", label: "Stable" }
};

// Displays a statistics card with a title, value, interval, and trend indicator.
function StatCard({ title, value, interval, trend }) {
    // Select the trend configuration based on the prop, defaulting to 'neutral'
    const selectedTrend = trendConfig[trend] || trendConfig.neutral;

    return (
        // Card component to display the statistics
        <Card variant="outlined" sx={{ height: "100%", borderColor: "divider" }}>
            <CardContent>
                <Stack spacing={1.2}>
                    {/* Statistic Title */}
                    <Typography variant="body2" color="text.secondary">
                        {title}
                    </Typography>

                    {/* Main Statistical Value */}
                    <Typography variant="h4" fontWeight={700}>
                        {value}
                    </Typography>

                    {/* Footer section with interval description and trend chip */}
                    <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mt: 0.8 }}>
                        <Typography variant="caption" color="text.secondary">
                            {interval}
                        </Typography>
                        <Chip
                            size="small"
                            color={selectedTrend.color}
                            label={selectedTrend.label}
                            sx={{ borderRadius: 2, ml: 1.5 }}
                        />
                    </Stack>
                </Stack>
            </CardContent>
        </Card>
    );
}

// PropType validation for the component
StatCard.propTypes = {
    interval: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    trend: PropTypes.oneOf(["down", "neutral", "up"]).isRequired,
    value: PropTypes.string.isRequired
};

export default StatCard;