import { Table, TableHead, TableRow, TableCell, TableBody, Paper, TableContainer } from "@mui/material";

const DataTableCount = ({ data = [] }) => (
  <TableContainer component={Paper}>
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Stage</TableCell>
          <TableCell>Lost / Disqualified</TableCell>
          <TableCell>Moved to Next</TableCell>
          <TableCell>Win Rate %</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {data.map((stage) => (
          <TableRow key={stage.label}>
            <TableCell>{stage.label}</TableCell>
            <TableCell>{stage.lost}</TableCell>
            <TableCell>{stage.movedToNext}</TableCell>
            <TableCell>{stage.winRate}%</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
);

export default DataTableCount;