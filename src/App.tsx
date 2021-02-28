import React from 'react';
import SearchMethodPicker from './components/SearchMethodPicker/SearchMethodPicker';
import SearchByStop from './components/SearchByStop/SearchByStop';
import SearchByRoute from './components/SearchByRoute/SearchByRoute';
import busBackground from './common/images/busBackground.jpg';
import { Grid, makeStyles, Paper } from '@material-ui/core';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';

const useStyles = makeStyles({
  base: {
    textAlign: 'center',
    backgroundImage: `url(${busBackground})`,
    height: '100vh',
    width: '100vw',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
  },
  container: {
    minHeight: '100vh',
  },
  nexTripApp: {
    minWidth: '50%',
    maxWidth: '100%',
    minHeight: '50vh',
    maxHeight: '70vh',
    overflowY: 'scroll',
  },
});

function App() {
  const classes = useStyles();
  return (
    <div className={classes.base}>
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justify="center"
        className={classes.container}
      >
        <Paper elevation={3} className={classes.nexTripApp}>
          <Router>
            <SearchMethodPicker />

            <Switch>
              <Route exact path="/">
                <Redirect to="/route" />
              </Route>

              <Route path={'/route'} children={<SearchByRoute />} />
              <Route path={'/stop'} children={<SearchByStop />} />
            </Switch>
          </Router>
        </Paper>
      </Grid>
    </div>
  );
}

export default App;
