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
  const [results, setResults] = useState<NexTripResult | null>(location.state?.results);

  useEffect(() => {
    const getResults = async () => {
      let nexTripResult;
      try {
        if (params.stopId) {
          nexTripResult = await NexTripApi.getNexTripResultByStopId(params.stopId);
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
      } catch (e) {
        setResults(null);
      }
    };
    getResults();

    const nexTripInterval = setInterval(() => {
      getResults();
    }, 30 * 1000);

    //clean up interval
    return () => clearInterval(nexTripInterval);
  }, [location.state?.results]);

  return (
    <>
      {!results && <div>There are no results for that request</div>}
      {results && (
        <>
          <ResultsHeader
            stopNumber={results.stops[0].stop_id}
            stationName={results.stops[0].description}
          />
          <ResultsTable departures={results.departures} />
          {results.departures && results.departures.length > 0 && (
            <RouteMap stop={results.stops[0]} departures={results.departures} />
          )}
        </>
      )}
    </>
  );
};

export default Results;
