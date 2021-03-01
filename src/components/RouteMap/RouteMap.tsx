import React, { useEffect, useState } from 'react';
import { Map, Marker, Overlay } from 'pigeon-maps';
import uniqBy from 'lodash/uniqBy';
import { NexTripApi } from '../../api/nexTripApi';
import { Departure, Stop, Vehicle } from '../../types';
import { makeStyles } from '@material-ui/core';
interface RouteMapProps {
  stop: Stop;
  departures: Departure[];
}

const useStyles = makeStyles({
  busMarker: {
    fontSize: '15px',
    backgroundColor: 'teal',
    color: 'white',
    width: '30px',
    height: '30px',
    borderRadius: '15px',
    textAlign: 'center',
    verticalAlign: 'middle',
    lineHeight: '30px',
  },
  mapContainer: {
    width: '300px',
    height: '300px',
    padding: '10px',
  },
});
const RouteMap: React.FC<RouteMapProps> = ({ stop, departures }) => {
  const { busMarker } = useStyles();
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  useEffect(() => {
    const getVehicles = async () => {
      const uniqueRouteIds = uniqBy(departures, 'route_id').map((departure) => departure.route_id);

      let retrievedVehicles = await Promise.all(
        uniqueRouteIds.map(async (routeId) => {
          return await NexTripApi.getVehiclesByRoute(routeId);
        })
      );

      setVehicles(retrievedVehicles.flat());
    };

    getVehicles();

    const interval = setInterval(() => {
      getVehicles();
    }, 15 * 1000);

    //cleanup
    return () => {
      clearInterval(interval);
    };
  }, [departures]);

  return (
    <Map
      provider={(x, y, z, dpr) => {
        return `https://c.tile.openstreetmap.org/${z}/${x}/${y}.png`;
      }}
      defaultCenter={[stop.latitude, stop.longitude]}
      defaultZoom={12}
      width={300}
      height={300}
    >
      <Marker anchor={[stop.latitude, stop.longitude]} />
      {vehicles?.map((vehicle) => {
        return (
          <Overlay key={vehicle.trip_id} anchor={[vehicle.latitude, vehicle.longitude]}>
            <div className={busMarker}>{vehicle.route_id}</div>
          </Overlay>
        );
      })}
    </Map>
  );
};

export default RouteMap;
