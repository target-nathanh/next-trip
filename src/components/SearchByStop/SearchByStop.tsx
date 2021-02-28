import TextField from '@material-ui/core/TextField';
import Icon from '@material-ui/core/Icon';
import React, { KeyboardEvent, useState } from 'react';
import { Container, IconButton, makeStyles } from '@material-ui/core';
import { NexTripApi } from '../../api/nexTripApi';
import { matchPath, Route, Switch, useHistory, useRouteMatch } from 'react-router-dom';
import Results from '../Results/Results';
import { RouteParams } from '../../types';

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
  const { path, url } = useRouteMatch<RouteParams>();
  const history = useHistory();
  const match = matchPath<RouteParams>(history.location.pathname, {
    path: '/stop/:stopId',
  });

  const { input, inputContainer } = useStyles();
  const [stopId, setStopId] = useState<string>(
    match && match.params.stopId ? match.params.stopId : ''
  );
  const [showError, setShowError] = useState<boolean>(false);

  const onSearch = async () => {
    try {
      const results = await NexTripApi.getNexTripResultByStopId(stopId);
      if (results.stops) {
        history.push({ pathname: `${url}/${stopId}`, state: { results } });
      }
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
        helperText={showError ? 'The entered stop number is not valid' : null}
        type="number"
        value={stopId}
        onChange={(event) => setStopId(event.target.value)}
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
