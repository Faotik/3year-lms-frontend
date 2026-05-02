import {
    Alert,
    Box,
    Button,
    Chip,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    IconButton,
    MenuItem,
    Paper,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField
} from "@mui/material";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import { useState } from "react";
import PropTypes from "prop-types";
import updateUser from "../../services/updateUser";
import deleteUser from "../../services/deleteUser";
import updateModule from "../../services/updateModule";

// Admin interface component to view, edit, and delete users.
function UserManagement({ users, modules = [], onUserUpdated, onUserDeleted }) {

    // state variables for managing the form
    const [editingUser, setEditingUser] = useState(null);
    const [editForm, setEditForm] = useState({
        name: "",
        email: "",
        role: "",
        module: "",
        password: ""
    });

    // Status and UI states
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [openDialog, setOpenDialog] = useState(false);

    // handler function to open the edit dialog for a specific user
    const handleEditClick = (user) => {
        setEditingUser(user);
        setEditForm({
            name: user.name || "",
            email: user.email || "",
            role: user.role || "student",
            module: user.moduleId || "",
            password: "" // Keep password empty by default for security
        });
        setOpenDialog(true);
        setError("");
        setSuccess("");
    };

    // handler function to delete a user, with admin prevention.
    const handleDeleteClick = async (userId, role) => {
        if (role === "admin") {
            setError("Cannot delete an admin user.");
            return;
        }

        // confirmation popup before deleting
        if (window.confirm("Are you sure you want to delete this user?")) {
            try {
                const response = await deleteUser(userId);
                if (response.ok) {
                    onUserDeleted(userId);
                } else {
                    const data = await response.json();
                    setError(data.message || "Failed to delete user.");
                }
            } catch (err) {
                setError("An error occurred while deleting user.");
            }
        }
    };

    // handler function to update the edit form state on input change
    const handleEditFormChange = (e) => {
        const { name, value } = e.target;
        setEditForm((prev) => ({ ...prev, [name]: value }));
    };

    // handler function to save the user updates to the backend and handle module synchronization.
    const handleSaveEdit = async () => {
        setError("");
        setSuccess("");

        try {
            // Get the user ID and prepare the payload
            const userId = editingUser.id || editingUser._id || editingUser.ID;
            const payload = { ...editForm };

            // Do not send password if it hasn't been changed
            if (!payload.password) {
                delete payload.password;
            }

            // Send updated user details to the backend
            const response = await updateUser(userId, payload);

            // Handle the response from the backend
            if (response.ok) {
                const updatedUser = await response.json();

                // sync module association if it changed
                const oldModuleId = editingUser.moduleId;
                const newModuleId = editForm.module;

                // Remove user from the old module's list
                if (oldModuleId !== newModuleId) {
                    if (oldModuleId) {

                        // Find the old module in the modules array
                        const oldModule = modules.find(m => (m._id || m.id) === oldModuleId);

                        // Update the old module by removing the user from its users list
                        if (oldModule) {
                            const updatedUsers = (oldModule.users || []).filter(id => id !== userId);
                            await updateModule(oldModuleId, { users: updatedUsers });
                        }
                    }
                    // Add user to the new module's list
                    if (newModuleId) {

                        // Find the new module in the modules array
                        const newModule = modules.find(m => (m._id || m.id) === newModuleId);

                        // Update the new module by adding the user to its users list
                        if (newModule) {
                            const currentUsers = newModule.users || [];
                            // Prevent adding the same user to the same module multiple times
                            if (!currentUsers.includes(userId)) {
                                await updateModule(newModuleId, { users: [...currentUsers, userId] });
                            }
                        }
                    }
                }

                // Notify parent component of the update
                onUserUpdated(updatedUser);

                // Show success message
                setSuccess("User updated successfully!");

                // Close dialog after a short delay to show success state
                setTimeout(() => {
                    setOpenDialog(false);
                }, 1500);

                // Handle the error response from the backend
            } else {
                const data = await response.json();
                setError(data.message || "Failed to update user.");
            }
            // Handle the error response from the backend
        } catch (err) {
            setError("An error occurred while updating user.");
        }
    };

    return (
        <Box>
            {/* Status Messages */}
            {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
            {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}

            {/* Main Users Table */}
            <TableContainer component={Paper} variant="outlined" sx={{ borderRadius: 2 }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Role</TableCell>
                            <TableCell align="right">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {/* Map through the users array and render a table row for each user */}
                        {users.map((user) => (
                            <TableRow key={user.email}>
                                <TableCell>{user.name}</TableCell>
                                <TableCell>{user.email}</TableCell>
                                <TableCell>
                                    {/* Role Badge */}
                                    <Chip
                                        label={user.role}
                                        size="small"
                                        color={user.role === 'admin' ? 'error' : user.role === 'teacher' ? 'primary' : 'default'}
                                    />
                                </TableCell>
                                <TableCell align="right">
                                    {/* Edit Button */}
                                    <IconButton onClick={() => handleEditClick(user)} color="primary">
                                        <EditRoundedIcon />
                                    </IconButton>
                                    {/* Delete Button with Admin Check */}
                                    <IconButton
                                        onClick={() => handleDeleteClick(user.id || user._id || user.ID, user.role)}
                                        color="error"
                                        disabled={user.role === "admin"}
                                        title={user.role === "admin" ? "Admins cannot be deleted" : "Delete user"}
                                    >
                                        <DeleteRoundedIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* Edit User Dialog */}
            <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="sm" fullWidth>
                <DialogTitle>Edit User</DialogTitle>
                <DialogContent>
                    <Stack spacing={2} sx={{ mt: 1 }}>
                        {/* Edit Form */}
                        <TextField
                            label="Name"
                            name="name"
                            value={editForm.name}
                            onChange={handleEditFormChange}
                            fullWidth
                        />
                        {/* Email Field */}
                        <TextField
                            label="Email"
                            name="email"
                            value={editForm.email}
                            onChange={handleEditFormChange}
                            fullWidth
                        />
                        {/* Role Field */}
                        <TextField
                            select
                            label="Role"
                            name="role"
                            value={editForm.role}
                            onChange={handleEditFormChange}
                            fullWidth
                        >
                            {/* Dropdown Menu */}
                            <MenuItem value="student">Student</MenuItem>
                            <MenuItem value="teacher">Teacher</MenuItem>
                            <MenuItem value="admin">Admin</MenuItem>
                        </TextField>
                        {/* Module Field */}
                        <TextField
                            select
                            label="Module"
                            name="module"
                            value={editForm.module}
                            onChange={handleEditFormChange}
                            fullWidth
                        >
                            {/* Dropdown Menu */}
                            <MenuItem value="">None</MenuItem>
                            {/* Map through the modules array and display a menu item for each module */}
                            {modules.map((module) => (
                                <MenuItem key={module._id || module.id} value={module._id || module.id}>
                                    {module.title}
                                </MenuItem>
                            ))}
                        </TextField>
                        {/* Password Field */}
                        <TextField
                            label="New Password"
                            name="password"
                            type="password"
                            value={editForm.password}
                            onChange={handleEditFormChange}
                            fullWidth
                            placeholder="Leave empty to keep current password"
                        />
                    </Stack>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
                    <Button onClick={handleSaveEdit} variant="contained">Save Changes</Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}

// Prop Types for validation
UserManagement.propTypes = {
    users: PropTypes.array.isRequired,
    modules: PropTypes.array,
    onUserUpdated: PropTypes.func.isRequired,
    onUserDeleted: PropTypes.func.isRequired
};

export default UserManagement;
