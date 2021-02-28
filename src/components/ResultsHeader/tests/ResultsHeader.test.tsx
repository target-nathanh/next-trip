import React from 'react';
import { render } from '@testing-library/react';
import ResultsHeader from '../ResultsHeader';
import { MemoryRouter } from 'react-router-dom';

describe('ResultsHeader', () => {
  test('matches snapshot', () => {
    const { container } = render(
      <MemoryRouter>
        <ResultsHeader stationName={'Starblaster Station'} stopNumber={16137} />
      </MemoryRouter>
    );
    expect(container.firstChild).toMatchSnapshot();
  });
});
