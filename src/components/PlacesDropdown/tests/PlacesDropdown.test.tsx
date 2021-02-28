import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import places from '../../../mockData/placesMock.json';
import PlacesDropdown from '../PlacesDropdown';
import { MemoryRouter } from 'react-router-dom';

describe('PlacesDropdown', () => {
  test('matches snapshot', () => {
    const { container } = render(
      <MemoryRouter>
        <PlacesDropdown
          places={places}
          selectedPlaceId={places[0].place_code}
          onSelectPlace={() => {}}
        />
      </MemoryRouter>
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  test('calls onSelectPlace when new place is selected', async () => {
    const onSelectPlaceMock = jest.fn();
    const { getByRole } = render(
      <MemoryRouter>
        <PlacesDropdown
          places={places}
          selectedPlaceId={places[0].place_code}
          onSelectPlace={onSelectPlaceMock}
        />
      </MemoryRouter>
    );
    fireEvent.mouseDown(getByRole('button'));

    const option = await screen.findByText(places[1].description);
    fireEvent.click(option);
    expect(onSelectPlaceMock).toBeCalledWith(places[1].place_code);
  });
});
