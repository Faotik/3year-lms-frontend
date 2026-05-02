import {
    Alert,
    Button,
    Card,
    CardContent,
    Grid,
    MenuItem,
    Stack,
    TextField,
    Typography
} from "@mui/material";
import PropTypes from "prop-types";
import { useState } from "react";

const initialForm = {
    name: "",
    email: "",
    role: "student",
    module: "",
    password: ""
};

function UserRegistrationForm({ onRegister, modules = [] }) {
    const [form, setForm] = useState(initialForm);
    const [success, setSuccess] = useState("");

    const handleChange = (event) => {
        const { name, value } = event.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        onRegister(form);
        setSuccess(`${form.name} was added successfully.`);
        setForm(initialForm);
    };

    return (
        <Card variant="outlined" sx={{ borderColor: "divider", maxWidth: 860 }}>
            <CardContent>
                <Stack spacing={2.5}>
                    <div>
                        <Typography variant="h5" fontWeight={700}>
                            Register user
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Add a new student, teacher, or admin with a few fields.
                        </Typography>
                    </div>

                    {success && <Alert severity="success">{success}</Alert>}

                    <form onSubmit={handleSubmit}>
                        <Grid container spacing={2}>
                            <Grid size={{ xs: 12, md: 6 }}>
                                <TextField
                                    fullWidth
                                    required
                                    name="name"
                                    label="Full name"
                                    value={form.name}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid size={{ xs: 12, md: 6 }}>
                                <TextField
                                    fullWidth
                                    required
                                    type="email"
                                    name="email"
                                    label="Email"
                                    value={form.email}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid size={{ xs: 12, md: 6 }}>
                                <TextField
                                    select
                                    fullWidth
                                    required
                                    name="role"
                                    label="Role"
                                    value={form.role}
                                    onChange={handleChange}
                                >
                                    <MenuItem value="student">Student</MenuItem>
                                    <MenuItem value="teacher">Teacher</MenuItem>
                                    <MenuItem value="admin">Admin</MenuItem>
                                </TextField>
                            </Grid>
                            <Grid size={{ xs: 12, md: 6 }}>
                                <TextField
                                    select
                                    fullWidth
                                    required
                                    name="module"
                                    label="Primary module"
                                    value={form.module}
                                    onChange={handleChange}
                                >
                                {modules.map((module) => (
                                    <MenuItem key={module._id} value={module._id}>
                                        {module.title}
                                    </MenuItem>
                                ))}
                                </TextField>
                            </Grid>
                            <Grid size={{ xs: 12 }}>
                                <TextField
                                    fullWidth
                                    required
                                    type="password"
                                    name="password"
                                    label="Password"
                                    value={form.password}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid size={12}>
                                <Button type="submit" variant="contained" size="large">
                                    Register user
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                </Stack>
            </CardContent>
        </Card>
    );
}

UserRegistrationForm.propTypes = {
    onRegister: PropTypes.func.isRequired,
    modules: PropTypes.array
};

export default UserRegistrationForm;