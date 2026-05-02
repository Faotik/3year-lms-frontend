import {
    Chip,
    Paper,
    Table, TableBody, TableCell,
    TableContainer, TableHead,
    TableRow
} from "@mui/material";
import PropTypes from "prop-types";

function StudentsTable({ rows }) {
    return (
        <TableContainer component={Paper} variant="outlined" sx={{ borderColor: "divider", borderRadius: 0.5 }}>
            <Table size="small">
                <TableHead>
                    <TableRow>
                        <TableCell>Student</TableCell>
                        <TableCell>Module</TableCell>
                        <TableCell>Role</TableCell>
                        <TableCell>ID</TableCell>
                    </TableRow>
                </TableHead>

                <TableBody>
                    {rows.map((row) => (
                        <TableRow key={row.email} hover>
                            <TableCell>{row.name}</TableCell>
                            <TableCell>{row.module}</TableCell>
                            <TableCell>
                                <Chip size="small" label={row.role} />
                            </TableCell>
                            <TableCell>№{row.ID || row.id || row._id || "N/A"}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

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