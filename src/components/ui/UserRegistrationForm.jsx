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

/**
 * Initial state for the user registration form.
 */
const initialForm = {
    name: "",
    email: "",
    role: "student",
    module: "",
    password: ""
};

/**
 * UserRegistrationForm component for admin users to register a new user.
 * It includes name, email, role, module assignment, and password fields.
 */
function UserRegistrationForm({ onRegister, modules = [] }) {
    // Local state for the form data and success message
    const [form, setForm] = useState(initialForm);
    const [success, setSuccess] = useState("");

    /**
     * Updates form data when input fields change.
     */
    const handleChange = (event) => {
        const { name, value } = event.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    /**
     * Form submission handler.
     */
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
                    {/* Header */}
                    <div>
                        <Typography variant="h5" fontWeight={700}>
                            Register user
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Add a new student, teacher, or admin with a few fields.
                        </Typography>
                    </div>

                    {/* Success alert */}
                    {success && <Alert severity="success">{success}</Alert>}

                    <form onSubmit={handleSubmit}>
                        <Grid container spacing={2}>
                            {/* Input field for name */}
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
                            {/* Input field for email */}
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
                            {/* Input field for role */}
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
                                    {/* List of roles to choose from */}
                                    <MenuItem value="student">Student</MenuItem>
                                    <MenuItem value="teacher">Teacher</MenuItem>
                                    <MenuItem value="admin">Admin</MenuItem>
                                </TextField>
                            </Grid>
                            {/* Input field for module */}
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
                                    {/* List of modules to choose from */}
                                    {modules.map((module) => (
                                        <MenuItem key={module._id} value={module._id}>
                                            {module.title}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </Grid>
                            {/* Input field for password */}
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
                                {/* register user button */}
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

// Props Validation
UserRegistrationForm.propTypes = {
    onRegister: PropTypes.func.isRequired,
    modules: PropTypes.array
};

export default UserRegistrationForm;