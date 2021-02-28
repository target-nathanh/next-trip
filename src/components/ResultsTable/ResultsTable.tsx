import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Departure } from '../../types';
import { Container, makeStyles, Tooltip } from '@material-ui/core';
import Icon from '@material-ui/core/Icon';

interface ResultsTableProps {
  departures?: Departure[];
}

const useStyles = makeStyles({
  '@keyframes fadeInAndOut': {
    '0%': {
      opacity: 1,
    },
    '50%': {
      opacity: 0,
    },
    '100%': {
      opacity: 1,
    },
  },
  signalIcon: {
    animation: `$fadeInAndOut 2s infinite`,
    paddingLeft: '5px',
  },
  departureTextCell: {
    display: 'flex',
    alignItems: 'center',
  },
  departureText: {
    paddingLeft: '10px',
  },
  table: {
    margin: '10px',
  },
  headerCell: {
    fontSize: '16px',
  },
});

const ResultsTable: React.FC<ResultsTableProps> = ({ departures }) => {
  const classes = useStyles();
  const hasDepartures = departures && departures.length > 0;
  return (
    <Container>
      {!hasDepartures && <div>No departures at this time</div>}
      {hasDepartures && (
        <TableContainer className={classes.table}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell className={classes.headerCell}>Route</TableCell>
                <TableCell className={classes.headerCell}>Destination</TableCell>
                <TableCell className={classes.headerCell}>Departs</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {departures?.map((departure) => (
                <TableRow key={departure.trip_id}>
                  <TableCell component="th" scope="row">
                    {departure.route_short_name}
                  </TableCell>
                  <TableCell>{departure.description}</TableCell>
                  <TableCell className={classes.departureTextCell}>
                    {departure.departure_text}
                    {departure.actual && (
                      <Tooltip title="Live result">
                        <Icon className={classes.signalIcon} aria-label={'Live result'}>
                          wifi
                        </Icon>
                      </Tooltip>
                    )}
                  </TableCell>
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
