import {
    Alert,
    Button,
    Card,
    CardContent,
    Divider,
    Grid,
    MenuItem,
    Stack,
    TextField,
    Typography
} from "@mui/material";
import PropTypes from "prop-types";
import { useMemo, useState } from "react";

function TestDeleteForm({ tests, onConfirm }) {
    const [selectedId, setSelectedId] = useState("");
    const [armed, setArmed] = useState(false);
    const [success, setSuccess] = useState("");

    const selectedTest = useMemo(
        () => tests.find((t) => String(t.id) === String(selectedId)) || null,
        [tests, selectedId]
    );

    const reset = () => {
        setSelectedId("");
        setArmed(false);
    };

    const handleConfirm = () => {
        if (!selectedTest) return;
        onConfirm(selectedTest.id);
        setSuccess(`Deleted "${selectedTest.title || "Untitled"}" (frontend-only).`);
        reset();
    };

    return (
        <Card variant="outlined" sx={{ borderColor: "divider", maxWidth: 980 }}>
            <CardContent>
                <Stack spacing={2.5}>
                    <div>
                        <Typography variant="h5" fontWeight={700}>
                            Delete test
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Frontend-only delete (no backend request).
                        </Typography>
                    </div>

                    {success && <Alert severity="success">{success}</Alert>}

                    <Grid container spacing={2}>
                        <Grid size={{ xs: 12 }}>
                            <TextField
                                select
                                fullWidth
                                label="Fetched tests"
                                value={selectedId}
                                onChange={(e) => {
                                    setSelectedId(e.target.value);
                                    setArmed(false);
                                    setSuccess("");
                                }}
                                helperText={tests.length ? "Pick a test to delete." : "No tests available yet."}
                            >
                                {tests.map((t) => (
                                    <MenuItem key={t.id} value={t.id}>
                                        {t.title || "(Untitled)"} • {t.moduleId || "no module"}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Grid>

                        <Grid size={{ xs: 12 }}>
                            <Divider sx={{ my: 0.5 }} />
                        </Grid>

                        <Grid size={{ xs: 12 }}>
                            {!armed ? (
                                <Stack direction="row" spacing={1}>
                                    <Button
                                        variant="outlined"
                                        onClick={reset}
                                        disabled={!selectedTest}
                                    >
                                        Clear
                                    </Button>
                                    <Button
                                        variant="contained"
                                        color="error"
                                        onClick={() => setArmed(true)}
                                        disabled={!selectedTest}
                                    >
                                        Delete…
                                    </Button>
                                </Stack>
                            ) : (
                                <Stack spacing={1.5}>
                                    <Typography variant="body2">
                                        Delete <strong>{selectedTest?.title || "Untitled"}</strong>? This cannot be undone
                                        (in this UI).
                                    </Typography>
                                    <Stack direction="row" spacing={1}>
                                        <Button variant="outlined" onClick={() => setArmed(false)}>
                                            Cancel
                                        </Button>
                                        <Button variant="contained" color="error" onClick={handleConfirm}>
                                            Confirm delete
                                        </Button>
                                    </Stack>
                                </Stack>
                            )}
                        </Grid>
                    </Grid>
                </Stack>
            </CardContent>
        </Card>
    );
}

TestDeleteForm.propTypes = {
    tests: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
            title: PropTypes.string,
            moduleId: PropTypes.string
        })
    ).isRequired,
    onConfirm: PropTypes.func.isRequired
};

export default TestDeleteForm;

