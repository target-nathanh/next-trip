import React, { useEffect, useState } from 'react';
import RoutesDropdown from '../RoutesDropdown/RoutesDropdown';
import { Direction, Place, NexTripResult, Route, RouteParams } from '../../types';
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

const SearchByRoute: React.FC = () => {
  const { path, url } = useRouteMatch();
  const history = useHistory();
  const match = matchPath<RouteParams>(history.location.pathname, {
    path: '/route/:routeId/:directionId/:placeCode',
  });
  const [routes, setRoutes] = useState<Route[]>([]);
  const [selectedRouteId, setSelectedRouteId] = useState<string | undefined>();

  const [directions, setDirections] = useState<Direction[]>([]);
  const [selectedDirectionId, setSelectedDirectionId] = useState<number | undefined>();

  const [places, setPlaces] = useState<Place[]>([]);
  const [selectedPlaceId, setSelectedPlaceId] = useState<string | undefined>();

  const clearState = () => {
    setDirections([]);
    setPlaces([]);
    setSelectedPlaceId(undefined);
    setSelectedDirectionId(undefined);
  };

  useEffect(() => {
    async function getRoutes() {
      clearState();
      const routes = await NexTripApi.getRoutes();
      setRoutes(routes);
    }

    if (match && match.params.routeId && match.params.directionId && match.params.placeCode) {
      setSelectedRouteId(match.params.routeId);
      setSelectedDirectionId(parseInt(match.params.directionId, 10));
      setSelectedPlaceId(match.params.placeCode);
    }

    getRoutes();
  }, []);

  useEffect(() => {
    async function getDirections() {
      clearState();
      if (selectedRouteId) {
        const directions = await NexTripApi.getDirectionsForRoute(selectedRouteId);
        setDirections(directions);
      }
    }
    getDirections();
  }, [selectedRouteId]);

  useEffect(() => {
    async function getPlaces() {
      if (selectedRouteId && selectedDirectionId) {
        const places = await NexTripApi.getPlaces(selectedRouteId, selectedDirectionId);
        setPlaces(places);
      }
    }
    getPlaces();
  }, [selectedRouteId, selectedDirectionId]);

  const onPlaceSelected = (placeId: string) => {
    setSelectedPlaceId(placeId);
    const getResults = async () => {
      if (selectedRouteId && selectedDirectionId && selectedPlaceId) {
        const nexTripResult = await NexTripApi.getNexTripResult(
          selectedRouteId,
          selectedDirectionId,
          selectedPlaceId
        );
        history.push({
          pathname: `${url}/${selectedRouteId}/${selectedDirectionId}/${selectedPlaceId}`,
          state: { results: nexTripResult },
        });
      }
    };
    getResults();
  };

  return (
    <Grid container direction="column" justify="center" alignItems="center">
      <RoutesDropdown
        routes={routes}
        selectedRouteId={selectedRouteId}
        onSelectRoute={(routeId: string) => setSelectedRouteId(routeId)}
      />
      {selectedRouteId && (
        <DirectionsDropdown
          directions={directions}
          selectedDirectionId={selectedDirectionId}
          onSelectDirection={(directionId: number) => setSelectedDirectionId(directionId)}
        />
      )}
      {selectedDirectionId && selectedRouteId && (
        <PlacesDropdown
          places={places}
          selectedPlaceId={selectedPlaceId}
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
