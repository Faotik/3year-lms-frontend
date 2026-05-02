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

function UserManagement({ users, modules = [], onUserUpdated, onUserDeleted }) {
    const [editingUser, setEditingUser] = useState(null);
    const [editForm, setEditForm] = useState({
        name: "",
        email: "",
        role: "",
        module: "",
        password: ""
    });
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [openDialog, setOpenDialog] = useState(false);

    const handleEditClick = (user) => {
        setEditingUser(user);
        setEditForm({
            name: user.name || "",
            email: user.email || "",
            role: user.role || "student",
            module: user.moduleId || "",
            password: "" // Keep password empty by default
        });
        setOpenDialog(true);
        setError("");
        setSuccess("");
    };

    const handleDeleteClick = async (userId, role) => {
        if (role === "admin") {
            setError("Cannot delete an admin user.");
            return;
        }

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

    const handleEditFormChange = (e) => {
        const { name, value } = e.target;
        setEditForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSaveEdit = async () => {
        setError("");
        setSuccess("");
        
        try {
            const userId = editingUser.id || editingUser._id || editingUser.ID;
            const payload = { ...editForm };
            if (!payload.password) delete payload.password; // Don't send empty password

            const response = await updateUser(userId, payload);
            if (response.ok) {
                const updatedUser = await response.json();
                
                // Manually sync module association if it changed
                const oldModuleId = editingUser.moduleId;
                const newModuleId = editForm.module;

                if (oldModuleId !== newModuleId) {
                    // 1. Remove from old module
                    if (oldModuleId) {
                        const oldModule = modules.find(m => (m._id || m.id) === oldModuleId);
                        if (oldModule) {
                            const updatedUsers = (oldModule.users || []).filter(id => id !== userId);
                            await updateModule(oldModuleId, { users: updatedUsers });
                        }
                    }
                    // 2. Add to new module
                    if (newModuleId) {
                        const newModule = modules.find(m => (m._id || m.id) === newModuleId);
                        if (newModule) {
                            const currentUsers = newModule.users || [];
                            if (!currentUsers.includes(userId)) {
                                await updateModule(newModuleId, { users: [...currentUsers, userId] });
                            }
                        }
                    }
                }

                onUserUpdated(updatedUser);
                setSuccess("User updated successfully!");
                setTimeout(() => {
                    setOpenDialog(false);
                }, 1500);
            } else {
                const data = await response.json();
                setError(data.message || "Failed to update user.");
            }
        } catch (err) {
            setError("An error occurred while updating user.");
        }
    };

    return (
        <Box>
            {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
            {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}

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
                        {users.map((user) => (
                            <TableRow key={user.email}>
                                <TableCell>{user.name}</TableCell>
                                <TableCell>{user.email}</TableCell>
                                <TableCell>
                                    <Chip 
                                        label={user.role} 
                                        size="small" 
                                        color={user.role === 'admin' ? 'error' : user.role === 'teacher' ? 'primary' : 'default'} 
                                    />
                                </TableCell>
                                <TableCell align="right">
                                    <IconButton onClick={() => handleEditClick(user)} color="primary">
                                        <EditRoundedIcon />
                                    </IconButton>
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

            <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="sm" fullWidth>
                <DialogTitle>Edit User</DialogTitle>
                <DialogContent>
                    <Stack spacing={2} sx={{ mt: 1 }}>
                        <TextField
                            label="Name"
                            name="name"
                            value={editForm.name}
                            onChange={handleEditFormChange}
                            fullWidth
                        />
                        <TextField
                            label="Email"
                            name="email"
                            value={editForm.email}
                            onChange={handleEditFormChange}
                            fullWidth
                        />
                        <TextField
                            select
                            label="Role"
                            name="role"
                            value={editForm.role}
                            onChange={handleEditFormChange}
                            fullWidth
                        >
                            <MenuItem value="student">Student</MenuItem>
                            <MenuItem value="teacher">Teacher</MenuItem>
                            <MenuItem value="admin">Admin</MenuItem>
                        </TextField>
                        <TextField
                            select
                            label="Module"
                            name="module"
                            value={editForm.module}
                            onChange={handleEditFormChange}
                            fullWidth
                        >
                            <MenuItem value="">None</MenuItem>
                            {modules.map((module) => (
                                <MenuItem key={module._id || module.id} value={module._id || module.id}>
                                    {module.title}
                                </MenuItem>
                            ))}
                        </TextField>
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

UserManagement.propTypes = {
    users: PropTypes.array.isRequired,
    modules: PropTypes.array,
    onUserUpdated: PropTypes.func.isRequired,
    onUserDeleted: PropTypes.func.isRequired
};

export default UserManagement;
