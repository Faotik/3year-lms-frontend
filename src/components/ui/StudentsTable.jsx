import {
    Chip,
    Paper,
    Table, TableBody, TableCell,
    TableContainer, TableHead,
    TableRow
} from "@mui/material";
import PropTypes from "prop-types";

/**
 * StudentsTable component displays table with the student names, ID, module and role
 */
function StudentsTable({ rows }) {
    return (
        <TableContainer component={Paper} variant="outlined" sx={{ borderColor: "divider", borderRadius: 0.5 }}>
            <Table size="small">
                {/* Table Header with column names */}
                <TableHead>
                    <TableRow>
                        <TableCell>Student</TableCell>
                        <TableCell>Module</TableCell>
                        <TableCell>Role</TableCell>
                        <TableCell>ID</TableCell>
                    </TableRow>
                </TableHead>

                {/* Table body containing student data rows */}
                <TableBody>
                    {rows.map((row) => (
                        <TableRow key={row.email} hover>
                            {/* Student name */}
                            <TableCell>{row.name}</TableCell>
                            {/* Module name */}
                            <TableCell>{row.module}</TableCell>
                            {/* User Role */}
                            <TableCell>
                                <Chip size="small" label={row.role} />
                            </TableCell>
                            {/* Student ID */}
                            <TableCell>№{row.ID || row.id || row._id || "N/A"}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
// Prop types for the StudentsTable component
StudentsTable.propTypes = {
    rows: PropTypes.arrayOf(
        PropTypes.shape({
            module: PropTypes.string.isRequired,
            email: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
            progress: PropTypes.number.isRequired,
            role: PropTypes.string.isRequired
        })
    ).isRequired
};

export default StudentsTable