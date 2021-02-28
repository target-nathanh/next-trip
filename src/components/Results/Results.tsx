import React, { useEffect, useState } from 'react';
import ResultsHeader from '../ResultsHeader/ResultsHeader';
import ResultsTable from '../ResultsTable/ResultsTable';
import RouteMap from '../RouteMap/RouteMap';
import { useLocation, useParams } from 'react-router-dom';
import { NexTripResult, RouteParams } from '../../types';
import { NexTripApi } from '../../api/nex-trip-api';

interface LocationState {
  results: NexTripResult;
}

const Results: React.FC = () => {
  const location = useLocation<LocationState>();
  const params = useParams<RouteParams>();
  const [results, setResults] = useState<NexTripResult>(location.state.results);

  useEffect(() => {
    const getResults = async () => {
      let nexTripResult;
      if (params.stopNumber) {
        nexTripResult = await NexTripApi.getNexTripResultByStopId(params.stopNumber);
      } else if (params.routeId && params.directionId && params.placeCode) {
        nexTripResult = await NexTripApi.getNexTripResult(
          params.routeId,
          parseInt(params.directionId, 10),
          params.placeCode
        );
      }

      if (nexTripResult) {
        setResults(nexTripResult);
      }
    };
    if (!results) {
      getResults();
    }

    const nexTripInterval = setInterval(() => {
      getResults();
    }, 30 * 1000);

    //clean up interval
    return () => clearInterval(nexTripInterval);
  }, []);

  return (
    <>
      <ResultsHeader
        stopNumber={results.stops[0].stop_id}
        stationName={results.stops[0].description}
      />
      <ResultsTable departures={results.departures} />
      {results.departures && <RouteMap stop={results.stops[0]} departures={results.departures} />}
    </>
  );
};

export default Results;
