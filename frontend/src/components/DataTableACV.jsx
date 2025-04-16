import React from 'react';
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Typography,
} from '@mui/material';

const DataTableACV = ({ stages = [] }) => {
    console.log("DataTableACV stages:", stages);
  return (
    <Paper elevation={3} sx={{ p: 2 }}>
      <Typography variant="h6" gutterBottom>
        ACV Table
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Stage</TableCell>
            <TableCell>ACV</TableCell>
            <TableCell>Moved to Next Stage</TableCell>
            <TableCell>Lost</TableCell>
            <TableCell>Win Rate %</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Array.isArray(stages) && stages.length > 0 ? (
            stages.map((stage, index) => (
              <TableRow key={index}>
                <TableCell>{stage.label}</TableCell>
                <TableCell>${stage.acv.toLocaleString()}</TableCell>
                <TableCell>${stage.movedToNextACV.toLocaleString()}</TableCell>
                <TableCell>${stage.lostACV.toLocaleString()}</TableCell>
                <TableCell>{stage.winRateACV}%</TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={5} align="center">
                No data available
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </Paper>
  );
};

export default DataTableACV;