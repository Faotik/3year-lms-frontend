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

/**
 * TestDeleteForm component dispalying form to delete a test with addiitonal confirmation step.
 */
function TestDeleteForm({ tests, onConfirm, initialSelectedId }) {
    // state variables for managing the form
    const [selectedId, setSelectedId] = useState(initialSelectedId || "");
    const [armed, setArmed] = useState(false);
    const [success, setSuccess] = useState("");

    // getting a particular test based on selected id
    const selectedTest = useMemo(
        () => tests.find((t) => String(t.id) === String(selectedId)) || null,
        [tests, selectedId]
    );

    // Resets the form state
    const reset = () => {
        setSelectedId("");
        setArmed(false);
    };

    // delete confirmation handle function
    const handleConfirm = () => {
        if (!selectedTest) return;
        onConfirm(selectedTest.id);
        setSuccess(`Deleted "${selectedTest.title || "Untitled"}".`);
        reset();
    };

    return (
        <Card variant="outlined" sx={{ borderColor: "divider", maxWidth: 980 }}>
            <CardContent>
                <Stack spacing={2.5}>
                    {/* Header section */}
                    <div>
                        <Typography variant="h5" fontWeight={700}>
                            Delete test
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Permanently delete a test.
                        </Typography>
                    </div>

                    {/* Success alert displayed after deletion */}
                    {success && <Alert severity="success">{success}</Alert>}

                    <Grid container spacing={2}>
                        <Grid size={{ xs: 12 }}>
                            {/* Dropdown to select a test from the fetched list */}
                            <TextField
                                select
                                fullWidth
                                label="Fetched tests"
                                value={selectedId}
                                onChange={(e) => {
                                    setSelectedId(e.target.value);
                                    setArmed(false); // reset confirmation if selection changes
                                    setSuccess("");
                                }}
                                // show helpertext based on number of tests
                                helperText={tests.length ? "Pick a test to delete." : "No tests available yet."}
                            >
                                {/* add menu items for each test */}
                                {tests.map((t) => (
                                    <MenuItem key={t.id} value={t.id}>
                                        {t.title || "(Untitled)"} • {t.moduleId || "no module"}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Grid>

                        {/* horizontal line */}
                        <Grid size={{ xs: 12 }}>
                            <Divider sx={{ my: 0.5 }} />
                        </Grid>

                        {/* delete buttons */}
                        <Grid size={{ xs: 12 }}>
                            {/* buttons to delete or clear */}
                            {!armed ? (
                                <Stack direction="row" spacing={1}>
                                    {/* clear button */}
                                    <Button
                                        variant="outlined"
                                        onClick={reset}
                                        disabled={!selectedTest}
                                    >
                                        Clear
                                    </Button>
                                    {/* delete button */}
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
                                    {/* Confirmation message and buttons */}
                                    <Typography variant="body2">
                                        Delete <strong>{selectedTest?.title || "Untitled"}</strong>? This cannot be undone.
                                    </Typography>
                                    <Stack direction="row" spacing={1}>
                                        {/* cancel button */}
                                        <Button variant="outlined" onClick={() => setArmed(false)}>
                                            Cancel
                                        </Button>
                                        {/* confirm delete button */}
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

// PropTypes validation for the component
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

