import React, { useEffect, useState } from 'react';
import RoutesDropdown from '../RoutesDropdown/RoutesDropdown';
import { Direction, NexTripResult, Route, Place } from '../../types';
import { NexTripApi } from '../../api/nex-trip-api';
import DirectionsDropdown from '../DirectionsDropdown/DirectionsDropdown';
import PlacesDropdown from '../PlacesDropdown/PlacesDropdown';
import { Grid } from '@material-ui/core';
interface SearchByRouteWizardProps {
  onResultsRetrieved: (results: NexTripResult) => void;
}

const SearchByRouteWizard: React.FC<SearchByRouteWizardProps> = ({ onResultsRetrieved }) => {
  const [routes, setRoutes] = useState<Route[]>([]);
  const [selectedRoute, setSelectedRoute] = useState<Route | undefined>();

  const [directions, setDirections] = useState<Direction[]>([]);
  const [selectedDirection, setSelectedDirection] = useState<Direction | undefined>();

  const [places, setPlaces] = useState<Place[]>([]);
  const [selectedPlace, setSelectedPlace] = useState<Place | undefined>();

  const clearState = () => {
    setDirections([]);
    setPlaces([]);
    setSelectedPlace(undefined);
    setSelectedDirection(undefined);
  };

  useEffect(() => {
    async function getRoutes() {
      clearState();
      const routes = await NexTripApi.getRoutes();
      setRoutes(routes);
    }
    getRoutes();
  }, []);

  useEffect(() => {
    async function getDirections() {
      clearState();
      if (selectedRoute) {
        const directions = await NexTripApi.getDirectionsForRoute(selectedRoute.route_id);
        setDirections(directions);
      }
    }
    getDirections();
  }, [selectedRoute]);

  useEffect(() => {
    async function getPlaces() {
      if (selectedRoute && selectedDirection) {
        const places = await NexTripApi.getPlaces(
          selectedRoute.route_id,
          selectedDirection.direction_id
        );
        setPlaces(places);
      }
    }
    getPlaces();
  }, [selectedRoute, selectedDirection]);

  let nexTripInterval: NodeJS.Timeout;
  const onPlaceSelected = (place: Place) => {
    //TODO: DO I need to save the place? Maybe for routing.
    setSelectedPlace(place);
    if (nexTripInterval) {
      clearInterval(nexTripInterval);
    }
    const getNexTrip = async () => {
      if (selectedRoute?.route_id && selectedDirection?.direction_id && place.place_code) {
        const places = await NexTripApi.getNexTripResult(
          selectedRoute?.route_id,
          selectedDirection?.direction_id,
          place.place_code
        );
        onResultsRetrieved(places);
      }
    };
    getNexTrip();
    nexTripInterval = setInterval(() => {
      getNexTrip();
    }, 30 * 1000);
  };

  return (
    <Grid container direction="column" justify="center" alignItems="center">
      <RoutesDropdown
        routes={routes}
        selectedRoute={selectedRoute}
        onSelectRoute={(route: Route) => setSelectedRoute(route)}
      />
      {selectedRoute && (
        <DirectionsDropdown
          directions={directions}
          selectedDirection={selectedDirection}
          onSelectDirection={(direction: Direction) => setSelectedDirection(direction)}
        />
      )}
      {selectedDirection && selectedRoute && (
        <PlacesDropdown
          places={places}
          selectedPlace={selectedPlace}
          onSelectPlace={(place: Place) => onPlaceSelected(place)}
        />
      )}
    </Grid>
  );
};

export default SearchByRouteWizard;
