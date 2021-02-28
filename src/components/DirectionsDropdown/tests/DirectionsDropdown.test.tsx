import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import directions from '../../../mockData/directionsMock.json';
import DirectionsDropdown from '../DirectionsDropdown';
import { MemoryRouter } from 'react-router-dom';

describe('DirectionsDropdown', () => {
  test('matches snapshot', () => {
    const { container } = render(
      <MemoryRouter>
        <DirectionsDropdown
          directions={directions}
          selectedDirectionId={directions[0].direction_id}
          onSelectDirection={() => {}}
        />
      </MemoryRouter>
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  test('calls onSelectDirection when new direction is selected', async () => {
    const onSelectDirectionMock = jest.fn();
    const { getByRole } = render(
      <MemoryRouter>
        <DirectionsDropdown
          directions={directions}
          selectedDirectionId={directions[0].direction_id}
          onSelectDirection={onSelectDirectionMock}
        />
      </MemoryRouter>
    );
    fireEvent.mouseDown(getByRole('button'));

    const option = await screen.findByText(directions[1].direction_name);
    fireEvent.click(option);
    expect(onSelectDirectionMock).toBeCalledWith(directions[1].direction_id);
  });
});
