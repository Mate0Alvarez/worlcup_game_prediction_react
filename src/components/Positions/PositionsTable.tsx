import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableFooter from "@mui/material/TableFooter";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { useEffect, useState } from "react";
import { IUserWithPoints } from "../../interfaces/interfaces";
import PositionsTablePagination from "./PositionsTablePagination";
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';

export interface IPositionsTableProps {
    users_with_points: IUserWithPoints[] | [];
}

export default function PositionsTable({
    users_with_points,
}: IPositionsTableProps) {
    const [page, setPage] = useState<number>(0);
    const [rowsPerPage, setRowsPerPage] = useState<number>(5);

    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows =
        page > 0
            ? Math.max(0, (1 + page) * rowsPerPage - users_with_points.length)
            : 0;

    const handleChangePage = (
        event: React.MouseEvent<HTMLButtonElement> | null,
        newPage: number
    ) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    useEffect(() => { }, [users_with_points]);

    return (
        <TableContainer component={Paper}>
            <Table aria-label="Positions table">
                <TableHead>
                    <TableRow>
                        <TableCell>Email</TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell align="right">Points</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {(rowsPerPage > 0
                        ? users_with_points.slice(
                            page * rowsPerPage,
                            page * rowsPerPage + rowsPerPage
                        )
                        : users_with_points
                    ).map((row) => (
                        <TableRow key={row.name}>
                            <TableCell component="th" scope="row">
                                {row.email}
                            </TableCell>
                            <TableCell component="th" scope="row">
                                {row.name}
                            </TableCell>
                            <TableCell style={{ width: 160 }} align="right">
                                {row.points}
                            </TableCell>
                        </TableRow>
                    ))}
                    {
                        users_with_points.length === 0 && (
                            <TableRow>
                                <TableCell colSpan={3}>
                                    <Box sx={{ width: "100%" }}>
                                        <LinearProgress sx={{ borderRadius: 5 }} />
                                    </Box>
                                </TableCell>

                            </TableRow>
                        )
                    }
                    {emptyRows > 0 && (
                        <TableRow style={{ height: 53 * emptyRows }}>
                            <TableCell colSpan={6} />
                        </TableRow>
                    )}
                </TableBody>
                <TableFooter>
                    <TableRow>
                        <TablePagination
                            rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
                            colSpan={3}
                            count={users_with_points.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            SelectProps={{
                                inputProps: {
                                    "aria-label": "Users per page",
                                },
                                native: true,
                            }}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                            ActionsComponent={PositionsTablePagination}
                        />
                    </TableRow>
                </TableFooter>
            </Table>
        </TableContainer>
    );
}
