import React, { useState } from 'react';
import './App.css';
import SearchMethodPicker from './components/SearchMethodPicker/SearchMethodPicker';
import { SearchMode } from './common/constants';
import ResultsHeader from './components/ResultsHeader/ResultsHeader';
import SearchByStopInput from './components/SearchByStopInput/SearchByStopInput';
import RouteMap from './components/RouteMap/RouteMap';
import ResultsTable from './components/ResultsTable/ResultsTable';
import SearchByRouteWizard from './components/SearchByRouteWizard/SearchByRouteWizard';
import { NexTripResult } from './types';
import { Container } from '@material-ui/core';

function App() {
  const [selectedMethod, setSelectedMethod] = useState<string>(SearchMode.ROUTE);
  const [results, setResults] = useState<NexTripResult | null>(null);

  const selectedMethodChanged = (method: string) => {
    setSelectedMethod(method);
    setResults(null);
  };
  return (
    <Container maxWidth="md" className="App">
      <SearchMethodPicker
        searchMethod={selectedMethod}
        onSelectMethod={(method) => selectedMethodChanged(method)}
      />
      {selectedMethod === SearchMode.ROUTE && (
        <SearchByRouteWizard onResultsRetrieved={(results) => setResults(results)} />
      )}
      {selectedMethod === SearchMode.STOP && (
        <SearchByStopInput onResultsRetrieved={(results) => setResults(results)} />
      )}

      {results?.stops?.length && (
        <>
          <ResultsHeader
            stopNumber={results.stops[0].stop_id}
            stationName={results.stops[0].description}
          />
          <ResultsTable departures={results.departures} />
          {results.departures && (
            <RouteMap stop={results.stops[0]} departures={results.departures} />
          )}
        </>
      )}
    </Container>
  );
}

export default App;
