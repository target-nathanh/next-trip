import TextField from '@material-ui/core/TextField';
import Icon from '@material-ui/core/Icon';
import React, { KeyboardEvent, useState } from 'react';
import { Container, IconButton, makeStyles } from '@material-ui/core';
import { NexTripApi } from '../../api/nex-trip-api';
import { Route, Switch, useHistory, useRouteMatch } from 'react-router-dom';
import Results from '../Results/Results';

const useStyles = makeStyles({
  input: {
    '& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button': {
      display: 'none',
      margin: 80,
    },
  },
  inputContainer: {
    marginTop: '10px',
    marginBottom: '10px',
  },
});

const SearchByStop: React.FC = () => {
  const { path, url } = useRouteMatch();
  const history = useHistory();
  const { input, inputContainer } = useStyles();
  const [stopNumber, setStopNumber] = useState<string>('');
  const [showError, setShowError] = useState<boolean>(false);

  const onSearch = async () => {
    try {
      const results = await NexTripApi.getNexTripResultByStopId(stopNumber);
      history.push({ pathname: `${url}/${stopNumber}`, state: { results } });
    } catch (e) {
      setShowError(true);
    }
  };
  const onKeyDownHandler = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter') {
      onSearch();
    }
  };

  return (
    <Container className={inputContainer}>
      <TextField
        variant="outlined"
        className={input}
        error={showError}
        aria-errormessage={'The entered stop number is not valid'}
        type="number"
        value={stopNumber}
        onChange={(event) => setStopNumber(event.target.value)}
        onKeyDown={(event) => onKeyDownHandler(event)}
        placeholder="Enter stop number"
      />
      <IconButton data-testid="search-icon" aria-label="search" onClick={() => onSearch()}>
        <Icon>search</Icon>
      </IconButton>

      <Switch>
        <Route path={`${path}/:stopId`}>
          <Results />
        </Route>
      </Switch>
    </Container>
  );
};

export default SearchByStop;
