import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { NexTripApi } from '../../../api/nexTripApi';
import SearchByRoute from '../SearchByRoute';
import { MemoryRouter } from 'react-router-dom';
import mockRoutes from '../../../mockData/routesMock.json';
import mockPlaces from '../../../mockData/placesMock.json';
import mockDirections from '../../../mockData/directionsMock.json';

describe('SearchByRoute', () => {
  test('matches snapshot for default state', () => {
    const { container } = render(
      <MemoryRouter initialEntries={['/route']}>
        <SearchByRoute />
      </MemoryRouter>
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  test('calls the api with the selected stop id on clicking the icon', async () => {
    NexTripApi.getRoutes = jest.fn().mockResolvedValue(mockRoutes);
    NexTripApi.getPlaces = jest.fn().mockResolvedValue(mockPlaces);
    NexTripApi.getDirectionsForRoute = jest.fn().mockResolvedValue(mockDirections);
    NexTripApi.getNexTripResult = jest.fn();
    const { getByRole, getAllByRole } = render(
      <MemoryRouter initialEntries={['/route']}>
        <SearchByRoute />
      </MemoryRouter>
    );
    fireEvent.mouseDown(getByRole('button'));

    const selectedRoute = mockRoutes[1];
    const selectedDirection = mockDirections[1];
    const selectedPlace = mockPlaces[1];

    const routeOption = await screen.findByText(selectedRoute.route_label);
    fireEvent.click(routeOption);
    expect(NexTripApi.getDirectionsForRoute).toHaveBeenCalledWith(selectedRoute.route_id);

    // Directions
    let buttons = getAllByRole('button');
    expect(buttons.length).toEqual(2);
    fireEvent.mouseDown(buttons[1]);

    const directionOption = await screen.findByText(selectedDirection.direction_name);
    fireEvent.click(directionOption);
    expect(NexTripApi.getPlaces).toHaveBeenCalledWith(
      selectedRoute.route_id,
      selectedDirection.direction_id
    );

    // Places
    buttons = getAllByRole('button');
    expect(buttons.length).toEqual(3);
    fireEvent.mouseDown(buttons[2]);

    const placesOption = await screen.findByText(selectedPlace.description);
    fireEvent.click(placesOption);
    expect(NexTripApi.getNexTripResult).toHaveBeenCalledWith(
      selectedRoute.route_id,
      selectedDirection.direction_id,
      selectedPlace.place_code
    );
  });
});
