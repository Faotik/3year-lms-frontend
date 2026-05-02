import { Alert, Button, Card, CardContent, Divider, Grid, MenuItem, Stack, TextField, Typography } from "@mui/material";
import PropTypes from "prop-types";
import { useEffect, useMemo, useState } from "react";
import { createTestDraft, toISOFromLocalDatetime, toLocalDatetimeValue } from "./testFormUtils";

/**
 * TestEditForm component provides feature to edit a test.
 */
function TestEditForm({ tests, onUpdate, defaultModuleId, initialSelectedId }) {

    //states for selected test ID, form data, success and error messages
    const [selectedId, setSelectedId] = useState(initialSelectedId || "");
    const [form, setForm] = useState(() => createTestDraft({ moduleId: defaultModuleId || "" }));
    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");

    // Hook to find the selected test object from the list of tests based on the selected ID
    const selectedTest = useMemo(
        () => tests.find((t) => String(t.id) === String(selectedId)) || null,
        [tests, selectedId]
    );

    // Hook to populate the form fields when a test is selected
    useEffect(() => {
        // reset form if no test is selected
        if (!selectedTest) {
            setForm(createTestDraft({ moduleId: defaultModuleId || "" }));
            return;
        }

        // populate form with selected test data
        setForm({
            id: selectedTest.id,
            title: selectedTest.title || "",
            description: selectedTest.description || "",
            moduleId: selectedTest.moduleId || defaultModuleId || "",
            deadline: toLocalDatetimeValue(selectedTest.deadline),
            questions: Array.isArray(selectedTest.questions) && selectedTest.questions.length
                ? selectedTest.questions
                : createTestDraft({ moduleId: defaultModuleId || "" }).questions
        });
    }, [selectedTest, defaultModuleId]);

    // Updates a specific field in the form state
    const setField = (name, value) => {
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    // Validates and submits the updated test data
    const handleSubmit = (event) => {
        event.preventDefault();
        setSuccess("");
        setError("");

        if (!selectedTest) {
            return setError("Pick a test to edit.");
        }

        // Payload by combining original test data with form updates
        const payload = {
            ...selectedTest,
            title: form.title.trim(),
            description: form.description.trim(),
            moduleId: String(form.moduleId || "").trim(),
            deadline: toISOFromLocalDatetime(form.deadline),
            questions: Array.isArray(form.questions) ? form.questions : []
        };

        // Validation for required fields
        if (!payload.title) {
            return setError("Title is required.");
        }
        if (!payload.moduleId) {
            return setError("Module ID is required.");
        }
        if (!payload.deadline) {
            return setError("Deadline is required.");
        }

        // send the updated test to the system and show a done message
        onUpdate(payload);
        setSuccess("Done!");
    };

    return (
        <Card variant="outlined" sx={{ borderColor: "divider", maxWidth: 980 }}>
            <CardContent>
                <Stack spacing={2.5}>
                    {/* Header section */}
                    <div>
                        <Typography variant="h5" fontWeight={700}>
                            Edit test
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Select a test and update its details.
                        </Typography>
                    </div>

                    {/* Success and Error Alerts */}
                    {success && <Alert severity="success">{success}</Alert>}
                    {error && <Alert severity="error">{error}</Alert>}

                    {/* Test editing form */}
                    <form onSubmit={handleSubmit}>
                        <Grid container spacing={2}>
                            <Grid size={{ xs: 12 }}>
                                {/* Dropdown to select a test to edit */}
                                <TextField
                                    select
                                    fullWidth
                                    label="Fetched tests"
                                    value={selectedId}
                                    onChange={(e) => setSelectedId(e.target.value)}
                                    helperText={
                                        tests.length
                                            ? "Choose a test to populate the form."
                                            : "No tests available yet. Create one first."
                                    }
                                >
                                    {/* Test options */}
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

                            {/* Editable Form Fields (Disabled if no test is selected) */}
                            <Grid size={{ xs: 12, md: 6 }}>
                                <TextField
                                    fullWidth
                                    required
                                    name="title"
                                    label="Title"
                                    value={form.title}
                                    onChange={(e) => setField("title", e.target.value)}
                                    disabled={!selectedTest}
                                />
                            </Grid>
                            {/* Module ID field */}
                            <Grid size={{ xs: 12, md: 6 }}>
                                <TextField
                                    fullWidth
                                    required
                                    name="moduleId"
                                    label="Module ID"
                                    value={form.moduleId}
                                    onChange={(e) => setField("moduleId", e.target.value)}
                                    disabled={!selectedTest}
                                />
                            </Grid>
                            {/* Description field */}
                            <Grid size={{ xs: 12 }}>
                                <TextField
                                    fullWidth
                                    name="description"
                                    label="Description"
                                    value={form.description}
                                    onChange={(e) => setField("description", e.target.value)}
                                    disabled={!selectedTest}
                                />
                            </Grid>
                            {/* Deadline field */}
                            <Grid size={{ xs: 12, md: 6 }}>
                                <TextField
                                    fullWidth
                                    required
                                    type="datetime-local"
                                    name="deadline"
                                    label="Deadline"
                                    InputLabelProps={{ shrink: true }}
                                    value={form.deadline}
                                    onChange={(e) => setField("deadline", e.target.value)}
                                    disabled={!selectedTest}
                                />
                            </Grid>

                            {/* Submit Button */}
                            <Grid size={{ xs: 12 }}>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    size="large"
                                    disabled={!selectedTest}
                                >
                                    Save changes
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                </Stack>
            </CardContent>
        </Card>
    );
}
// PropTypes for TestEditForm
TestEditForm.propTypes = {
    tests: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
            title: PropTypes.string,
            description: PropTypes.string,
            moduleId: PropTypes.string,
            deadline: PropTypes.string
        })
    ).isRequired,
    onUpdate: PropTypes.func.isRequired,
    defaultModuleId: PropTypes.string
};

export default TestEditForm;

