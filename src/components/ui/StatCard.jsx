import { Card, CardContent, Chip, Stack, Typography } from "@mui/material";
import PropTypes from "prop-types";

const trendConfig = {
    up: { color: "success", label: "Improving" },
    down: { color: "error", label: "Needs attention" },
    neutral: { color: "default", label: "Stable" }
};

function StatCard({ title, value, interval, trend }) {
    const selectedTrend = trendConfig[trend] || trendConfig.neutral;

    return (
        <Card variant="outlined" sx={{ height: "100%", borderColor: "divider" }}>
            <CardContent>
                <Stack spacing={1.2}>
                    <Typography variant="body2" color="text.secondary">
                        {title}
                    </Typography>
                    <Typography variant="h4" fontWeight={700}>
                        {value}
                    </Typography>
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

StatCard.propTypes = {
    interval: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    trend: PropTypes.oneOf(["down", "neutral", "up"]).isRequired,
    value: PropTypes.string.isRequired
};

export default StatCard;