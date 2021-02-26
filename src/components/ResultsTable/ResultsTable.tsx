import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Departure } from '../../types';
import { Container } from '@material-ui/core';

interface ResultsTableProps {
  departures?: Departure[];
}

const ResultsTable: React.FC<ResultsTableProps> = ({ departures }) => {
  const hasDepartures = departures && departures.length > 0;
  return (
    <Container>
      {!hasDepartures && <div>No departures at this time</div>}
      {hasDepartures && (
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Route</TableCell>
                <TableCell>Destination</TableCell>
                <TableCell>Departs</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {departures?.map((departure) => (
                <TableRow key={departure.trip_id}>
                  <TableCell component="th" scope="row">
                    {departure.route_short_name}
                  </TableCell>
                  <TableCell>{departure.description}</TableCell>
                  <TableCell>{departure.departure_text}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Container>
  );
};

export default ResultsTable;
