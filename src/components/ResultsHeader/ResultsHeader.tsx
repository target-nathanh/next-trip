import React from 'react';
import { Container, makeStyles } from '@material-ui/core';
interface ResultsHeaderProps {
  stationName?: string;
  stopNumber?: number;
}
const useStyles = makeStyles({
  header: {
    display: 'flex',
    justifyContent: 'space-between',
  },
});
const ResultsHeader: React.FC<ResultsHeaderProps> = (props: ResultsHeaderProps) => {
  const { header } = useStyles();
  return (
    <Container className={header}>
      <div>{props.stationName}</div>
      <div>Stop#: {props.stopNumber}</div>
    </Container>
  );
};

export default ResultsHeader;
