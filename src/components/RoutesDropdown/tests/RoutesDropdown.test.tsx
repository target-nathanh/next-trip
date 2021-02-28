import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import routes from '../../../mockData/routesMock.json';
import RoutesDropdown from '../RoutesDropdown';
import { MemoryRouter } from 'react-router-dom';

describe('RoutesDropdown', () => {
  test('matches snapshot', () => {
    const { container } = render(
      <MemoryRouter>
        <RoutesDropdown
          routes={routes}
          selectedRouteId={routes[0].route_id}
          onSelectRoute={() => {}}
        />
      </MemoryRouter>
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  test('calls onSelectRoute when new route is selected', async () => {
    const onSelectRouteMock = jest.fn();
    const { getByRole } = render(
      <MemoryRouter>
        <RoutesDropdown
          routes={routes}
          selectedRouteId={routes[0].route_id}
          onSelectRoute={onSelectRouteMock}
        />
      </MemoryRouter>
    );
    fireEvent.mouseDown(getByRole('button'));

    const option = await screen.findByText(routes[1].route_label);
    fireEvent.click(option);
    expect(onSelectRouteMock).toBeCalledWith(routes[1].route_id);
  });
});
