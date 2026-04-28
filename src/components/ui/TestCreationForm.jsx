import {
    Alert,
    Button,
    Card,
    CardContent,
    Divider,
    Grid,
    IconButton,
    MenuItem,
    Stack,
    TextField,
    Typography
} from "@mui/material";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
import PropTypes from "prop-types";
import { useMemo, useState } from "react";

const createOption = () => "";

const createQuestion = () => ({
    question: "",
    options: ["", ""],
    correctAnswer: "",
    marks: 1
});

const initialForm = {
    title: "",
    description: "",
    moduleId: "",
    deadline: "",
    questions: [createQuestion()]
};


function toBackendPayload(form) {
    return {
        title: form.title.trim(),
        description: form.description.trim(),
        moduleId: form.moduleId.trim(),
        deadline: form.deadline ? new Date(form.deadline).toISOString() : null,
        questions: form.questions.map((q) => ({
            question: q.question.trim(),
            options: q.options.map((o) => o.trim()).filter(Boolean),
            correctAnswer: q.correctAnswer,
            marks: Number(q.marks) || 0
        }))
    };
}

function TestCreationForm({ onCreate, defaultModuleId }) {
    const [form, setForm] = useState({ ...initialForm, moduleId: defaultModuleId || "" });
    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");

    const questionsSanity = useMemo(() => {
        const questionCount = form.questions.length;
        const optionCount = form.questions.reduce((sum, q) => sum + q.options.length, 0);
        return { questionCount, optionCount };
    }, [form.questions]);

    const setField = (name, value) => {
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const updateQuestion = (idx, patch) => {
        setForm((prev) => ({
            ...prev,
            questions: prev.questions.map((q, i) => (i === idx ? { ...q, ...patch } : q))
        }));
    };

    const addQuestion = () => {
        setForm((prev) => ({ ...prev, questions: [...prev.questions, createQuestion()] }));
    };

    const removeQuestion = (idx) => {
        setForm((prev) => ({
            ...prev,
            questions: prev.questions.filter((_, i) => i !== idx)
        }));
    };

    const addOption = (qIdx) => {
        setForm((prev) => ({
            ...prev,
            questions: prev.questions.map((q, i) =>
                i === qIdx ? { ...q, options: [...q.options, createOption()] } : q
            )
        }));
    };

    const updateOption = (qIdx, optIdx, value) => {
        setForm((prev) => ({
            ...prev,
            questions: prev.questions.map((q, i) => {
                if (i !== qIdx) return q;
                const nextOptions = q.options.map((o, oi) => (oi === optIdx ? value : o));
                const nextCorrectAnswer =
                    q.correctAnswer && nextOptions.includes(q.correctAnswer) ? q.correctAnswer : "";
                return { ...q, options: nextOptions, correctAnswer: nextCorrectAnswer };
            })
        }));
    };

    const removeOption = (qIdx, optIdx) => {
        setForm((prev) => ({
            ...prev,
            questions: prev.questions.map((q, i) => {
                if (i !== qIdx) return q;
                const nextOptions = q.options.filter((_, oi) => oi !== optIdx);
                const nextCorrectAnswer =
                    q.correctAnswer && nextOptions.includes(q.correctAnswer) ? q.correctAnswer : "";
                return { ...q, options: nextOptions, correctAnswer: nextCorrectAnswer };
            })
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        setSuccess("");
        setError("");

        const payload = toBackendPayload(form);

        if (!payload.title) {
            return setError("Title is required.");
        }
        if (!payload.moduleId) {
            return setError("Module ID is required.");
        }
        if (!payload.deadline) {
            return setError("Deadline is required.");
        }
        if (payload.questions.length === 0) {
            return setError("Add at least one question.");
        }

        const invalidQuestionIndex = payload.questions.findIndex((q) => {
            if (!q.question) {
                return true;
            }
            if (q.options.length < 2) {
                return true;
            }
            if (!q.correctAnswer) {
                return true;
            }
            if (!q.options.includes(q.correctAnswer)) {
                return true;
            }
            if (!Number.isFinite(q.marks) || q.marks <= 0) {
                return true;
            }
            return false;
        });

        if (invalidQuestionIndex !== -1) {
            return setError(`Question #${invalidQuestionIndex + 1} is incomplete (needs question, 2+ options, correct answer, and marks).`);
        }

        onCreate(payload);
        setSuccess("Test draft created successfully.");
        setForm({ ...initialForm, moduleId: defaultModuleId || "" });
    };

    return (
        <Card variant="outlined" sx={{ borderColor: "divider", maxWidth: 980 }}>
            <CardContent>
                <Stack spacing={2.5}>
                    <div>
                        <Typography variant="h5" fontWeight={700}>
                            Create test
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Build a multiple-choice test with unlimited choices per question.
                        </Typography>
                    </div>

                    {success && <Alert severity="success">{success}</Alert>}
                    {error && <Alert severity="error">{error}</Alert>}

                    <form onSubmit={handleSubmit}>
                        <Grid container spacing={2}>
                            <Grid size={{ xs: 12, md: 6 }}>
                                <TextField
                                    fullWidth
                                    required
                                    name="title"
                                    label="Title"
                                    value={form.title}
                                    onChange={(e) => setField("title", e.target.value)}
                                />
                            </Grid>
                            <Grid size={{ xs: 12, md: 6 }}>
                                <TextField
                                    fullWidth
                                    required
                                    name="moduleId"
                                    label="Module ID"
                                    value={form.moduleId}
                                    onChange={(e) => setField("moduleId", e.target.value)}
                                />
                            </Grid>
                            <Grid size={{ xs: 12 }}>
                                <TextField
                                    fullWidth
                                    name="description"
                                    label="Description"
                                    value={form.description}
                                    onChange={(e) => setField("description", e.target.value)}
                                />
                            </Grid>
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
                                />
                            </Grid>

                            <Grid size={{ xs: 12 }}>
                                <Divider sx={{ my: 0.5 }} />
                                <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 1 }}>
                                    <Typography variant="h6" fontWeight={700}>
                                        Questions
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {questionsSanity.questionCount} questions • {questionsSanity.optionCount} options
                                    </Typography>
                                </Stack>
                            </Grid>

                            {form.questions.map((q, qIdx) => {
                                const trimmedOptions = q.options.map((o) => o.trim()).filter(Boolean);
                                const correctOptions = trimmedOptions.length ? trimmedOptions : q.options.filter(Boolean);
                                const hasAtLeastTwoOptions = trimmedOptions.length >= 2;

                                return (
                                    <Grid key={`q-${qIdx}`} size={{ xs: 12 }}>
                                        <Card variant="outlined" sx={{ borderColor: "divider" }}>
                                            <CardContent>
                                                <Stack spacing={1.5}>
                                                    <Stack direction="row" alignItems="center" justifyContent="space-between">
                                                        <Typography variant="subtitle1" fontWeight={700}>
                                                            Question {qIdx + 1}
                                                        </Typography>
                                                        <IconButton
                                                            aria-label="remove question"
                                                            onClick={() => removeQuestion(qIdx)}
                                                            disabled={form.questions.length <= 1}
                                                        >
                                                            <DeleteOutlineRoundedIcon />
                                                        </IconButton>
                                                    </Stack>

                                                    <Grid container spacing={2}>
                                                        <Grid size={{ xs: 12, md: 8 }}>
                                                            <TextField
                                                                fullWidth
                                                                required
                                                                label="Question"
                                                                value={q.question}
                                                                onChange={(e) => updateQuestion(qIdx, { question: e.target.value })}
                                                            />
                                                        </Grid>
                                                        <Grid size={{ xs: 12, md: 4 }}>
                                                            <TextField
                                                                fullWidth
                                                                required
                                                                type="number"
                                                                label="Marks"
                                                                inputProps={{ min: 1, step: 1 }}
                                                                value={q.marks}
                                                                onChange={(e) => updateQuestion(qIdx, { marks: e.target.value })}
                                                            />
                                                        </Grid>

                                                        <Grid size={{ xs: 12 }}>
                                                            <Typography variant="subtitle2" fontWeight={700} sx={{ mb: 1 }}>
                                                                Options
                                                            </Typography>
                                                            <Stack spacing={1}>
                                                                {q.options.map((opt, optIdx) => (
                                                                    <Stack
                                                                        key={`q-${qIdx}-o-${optIdx}`}
                                                                        direction="row"
                                                                        spacing={1}
                                                                        alignItems="center"
                                                                    >
                                                                        <TextField
                                                                            fullWidth
                                                                            required={optIdx < 2}
                                                                            label={`Option ${optIdx + 1}`}
                                                                            value={opt}
                                                                            onChange={(e) => updateOption(qIdx, optIdx, e.target.value)}
                                                                        />
                                                                        <IconButton
                                                                            aria-label="remove option"
                                                                            onClick={() => removeOption(qIdx, optIdx)}
                                                                            disabled={q.options.length <= 2}
                                                                        >
                                                                            <DeleteOutlineRoundedIcon />
                                                                        </IconButton>
                                                                    </Stack>
                                                                ))}
                                                                <Button
                                                                    variant="text"
                                                                    startIcon={<AddRoundedIcon />}
                                                                    onClick={() => addOption(qIdx)}
                                                                    sx={{ alignSelf: "flex-start" }}
                                                                >
                                                                    Add option
                                                                </Button>
                                                            </Stack>
                                                        </Grid>

                                                        <Grid size={{ xs: 12, md: 6 }}>
                                                            <TextField
                                                                select
                                                                fullWidth
                                                                required
                                                                label="Correct answer"
                                                                value={q.correctAnswer}
                                                                onChange={(e) =>
                                                                    updateQuestion(qIdx, { correctAnswer: e.target.value })
                                                                }
                                                                helperText={
                                                                    hasAtLeastTwoOptions
                                                                        ? "Pick one of the options above."
                                                                        : "Add at least 2 non-empty options."
                                                                }
                                                            >
                                                                {correctOptions.map((o) => (
                                                                    <MenuItem key={o} value={o}>
                                                                        {o}
                                                                    </MenuItem>
                                                                ))}
                                                            </TextField>
                                                        </Grid>
                                                    </Grid>
                                                </Stack>
                                            </CardContent>
                                        </Card>
                                    </Grid>
                                );
                            })}

                            <Grid size={{ xs: 12 }}>
                                <Button variant="outlined" startIcon={<AddRoundedIcon />} onClick={addQuestion}>
                                    Add question
                                </Button>
                            </Grid>

                            <Grid size={{ xs: 12 }}>
                                <Button type="submit" variant="contained" size="large">
                                    Create test
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                </Stack>
            </CardContent>
        </Card>
    );
}

TestCreationForm.propTypes = {
    onCreate: PropTypes.func.isRequired,
    defaultModuleId: PropTypes.string
};

export default TestCreationForm;
