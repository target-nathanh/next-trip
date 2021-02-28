import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import SearchByStop from '../SearchByStop';
import { MemoryRouter } from 'react-router-dom';
import { NexTripApi } from '../../../api/nexTripApi';

describe('SearchByStop', () => {
  test('matches snapshot', () => {
    const { container } = render(
      <MemoryRouter initialEntries={['/stop']}>
        <SearchByStop />
      </MemoryRouter>
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  test('calls the api with the selected stop id on clicking the icon', () => {
    NexTripApi.getNexTripResultByStopId = jest.fn().mockResolvedValue({});

    render(
      <MemoryRouter initialEntries={['/stop']}>
        <SearchByStop />
      </MemoryRouter>
    );
    const input = screen.getByPlaceholderText('Enter stop number');
    const icon = screen.getByTestId('search-icon');

    fireEvent.change(input, { target: { value: '16137' } });
    fireEvent.click(icon);

    expect(NexTripApi.getNexTripResultByStopId).toHaveBeenCalledWith('16137');
  });

  test('calls the api with the selected stop id on hitting enter', () => {
    NexTripApi.getNexTripResultByStopId = jest.fn().mockResolvedValue({});

    render(
      <MemoryRouter initialEntries={['/stop']}>
        <SearchByStop />
      </MemoryRouter>
    );
    const input = screen.getByPlaceholderText('Enter stop number');

    fireEvent.change(input, { target: { value: '16137' } });
    fireEvent.keyDown(input, { key: 'Enter' });

    expect(NexTripApi.getNexTripResultByStopId).toHaveBeenCalledWith('16137');
  });
});
