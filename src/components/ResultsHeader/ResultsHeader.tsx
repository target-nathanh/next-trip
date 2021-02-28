import React from 'react';
import { Container, makeStyles } from '@material-ui/core';
interface ResultsHeaderProps {
  stationName?: string;
  stopNumber?: number;
}
const useStyles = makeStyles((theme) => ({
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    backgroundColor: 'lightGray',
    padding: '20px',
    marginTop: '20px',
    marginBottom: '10px',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
    },
  },
  headerText: {
    fontWeight: 'bold',
  },
}));
const ResultsHeader: React.FC<ResultsHeaderProps> = (props: ResultsHeaderProps) => {
  const { header, headerText } = useStyles();
  return (
    <Container className={header}>
      <div className={headerText}>{props.stationName}</div>
      <div className={headerText}>Stop#: {props.stopNumber}</div>
    </Container>
  );
};

export default ResultsHeader;
