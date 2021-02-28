import React from 'react';
import { render } from '@testing-library/react';
import ResultsTable from '../ResultsTable';
import results from '../../../mockData/nexTripResultMock.json';
import { MemoryRouter } from 'react-router-dom';

describe('Results', () => {
  test('matches snapshot', () => {
    const { container } = render(
      <MemoryRouter>
        <ResultsTable departures={results.departures} />
      </MemoryRouter>
    );
    expect(container.firstChild).toMatchSnapshot();
  });
});
