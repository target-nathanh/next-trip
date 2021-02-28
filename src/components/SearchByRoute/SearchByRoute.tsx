import React, { useEffect, useReducer } from 'react';
import RoutesDropdown from '../RoutesDropdown/RoutesDropdown';
import { RouteParams } from '../../types';
import { NexTripApi } from '../../api/nex-trip-api';
import DirectionsDropdown from '../DirectionsDropdown/DirectionsDropdown';
import PlacesDropdown from '../PlacesDropdown/PlacesDropdown';
import { Grid } from '@material-ui/core';
import Results from '../Results/Results';
import {
  Route as RouterRoute,
  Switch,
  useHistory,
  useRouteMatch,
  matchPath,
} from 'react-router-dom';
import { searchByRouteReducer } from './searchByRouteReducer';

const SearchByRoute: React.FC = () => {
  const { path, url } = useRouteMatch();
  const history = useHistory();
  const match = matchPath<RouteParams>(history.location.pathname, {
    path: '/route/:routeId/:directionId/:placeCode',
  });
  const [state, dispatch] = useReducer(searchByRouteReducer, {
    directions: [],
    places: [],
    routes: [],
    selectedPlaceId: '',
    //Defaulting to -1 because some directionIds are 0, so in order to test for them in boolean statements I want to check that the value is greater than -1
    selectedDirectionId: -1,
    selectedRouteId: '',
  });

  useEffect(() => {
    async function getRoutes() {
      if (match && match.params.routeId && match.params.directionId && match.params.placeCode) {
        const result = await NexTripApi.getDirectionsAndPlaces(
          match.params.routeId,
          parseInt(match.params.directionId, 10)
        );
        dispatch({
          type: 'SET_PLACES_AND_DIRECTIONS',
          payload: {
            places: result.places,
            directions: result.directions,
            selectedRouteId: match.params.routeId,
            selectedDirectionId: parseInt(match.params.directionId, 10),
            selectedPlaceId: match.params.placeCode,
          },
        });
      } else {
        dispatch({ type: 'CLEAR_STATE' });
      }
      const routes = await NexTripApi.getRoutes();
      dispatch({ type: 'SET_ROUTES', payload: { routes } });
    }

    getRoutes();
  }, []);

  useEffect(() => {
    async function getDirections() {
      if (state.selectedRouteId) {
        const retrievedDirections = await NexTripApi.getDirectionsForRoute(state.selectedRouteId);
        dispatch({ type: 'SET_DIRECTIONS', payload: { directions: retrievedDirections } });
      }
    }
    getDirections();
  }, [state.selectedRouteId]);

  useEffect(() => {
    async function getPlaces() {
      if (state.selectedRouteId && state.selectedDirectionId && state.selectedDirectionId > -1) {
        const retrievedPlaces = await NexTripApi.getPlaces(
          state.selectedRouteId,
          state.selectedDirectionId
        );
        dispatch({ type: 'SET_PLACES', payload: { places: retrievedPlaces } });
      }
    }
    getPlaces();
  }, [state.selectedRouteId, state.selectedDirectionId]);

  const onPlaceSelected = (placeId: string) => {
    dispatch({ type: 'SET_SELECTED_PLACE', payload: { selectedPlaceId: placeId } });
    const getResults = async () => {
      if (
        state.selectedRouteId &&
        state.selectedDirectionId &&
        state.selectedDirectionId > -1 &&
        placeId
      ) {
        const nexTripResult = await NexTripApi.getNexTripResult(
          state.selectedRouteId,
          state.selectedDirectionId,
          placeId
        );
        history.push({
          pathname: `${url}/${state.selectedRouteId}/${state.selectedDirectionId}/${placeId}`,
          state: { results: nexTripResult },
        });
      }
    };
    getResults();
  };

  return (
    <Grid container direction="column" justify="center" alignItems="center">
      <RoutesDropdown
        routes={state.routes}
        selectedRouteId={state.selectedRouteId}
        onSelectRoute={(routeId: string) => {
          dispatch({ type: 'SET_SELECTED_ROUTE', payload: { selectedRouteId: routeId } });
          dispatch({ type: 'CLEAR_STATE' });
        }}
      />
      {state.selectedRouteId && (
        <DirectionsDropdown
          directions={state.directions}
          selectedDirectionId={state.selectedDirectionId}
          onSelectDirection={(directionId: number) =>
            dispatch({
              type: 'SET_SELECTED_DIRECTION',
              payload: { selectedDirectionId: directionId },
            })
          }
        />
      )}
      {state.selectedDirectionId && state.selectedDirectionId > -1 && state.selectedRouteId && (
        <PlacesDropdown
          places={state.places}
          selectedPlaceId={state.selectedPlaceId}
          onSelectPlace={(placeId: string) => onPlaceSelected(placeId)}
        />
      )}

      <Switch>
        <RouterRoute path={`${path}/:routeId/:directionId/:placeCode`}>
          <Results />
        </RouterRoute>
      </Switch>
    </Grid>
  );
};

export default SearchByRoute;
