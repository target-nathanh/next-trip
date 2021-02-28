import React from 'react';
import { render, screen } from '@testing-library/react';
import SearchMethodPicker from '../SearchMethodPicker';
import { MemoryRouter } from 'react-router-dom';

describe('SearchMethodPicker', () => {
  test('matches snapshot', () => {
    const { container } = render(
      <MemoryRouter>
        <SearchMethodPicker />
      </MemoryRouter>
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  test('selects Route as default option', () => {
    render(
      <MemoryRouter>
        <SearchMethodPicker />
      </MemoryRouter>
    );
    const routeOption = screen.getByText('By Route');
    expect(routeOption.parentElement?.getAttribute('aria-selected')).toEqual('true');

    const stopOption = screen.getByText('By Stop #');
    expect(stopOption.parentElement?.getAttribute('aria-selected')).toEqual('false');
  });

  test('selects route from url if available on load', () => {
    render(
      <MemoryRouter initialEntries={['/stop']}>
        <SearchMethodPicker />
      </MemoryRouter>
    );
    const routeOption = screen.getByText('By Route');
    expect(routeOption.parentElement?.getAttribute('aria-selected')).toEqual('false');

    const stopOption = screen.getByText('By Stop #');
    expect(stopOption.parentElement?.getAttribute('aria-selected')).toEqual('true');
  });
});
