import { Direction, NexTripResult, Place, Route, Vehicle } from '../types';

const API_ROOT = 'https://svc.metrotransit.org/nextripv2';
async function getRoutes(): Promise<Route[]> {
  return baseFetch<Route[]>(`${API_ROOT}/routes`);
}

async function getDirectionsForRoute(routeId: string): Promise<Direction[]> {
  return baseFetch<Direction[]>(`${API_ROOT}/directions/${routeId}`);
}

async function getPlaces(routeId: string, directionId: number): Promise<Place[]> {
  return baseFetch<Place[]>(`${API_ROOT}/stops/${routeId}/${directionId}`);
}

async function getNexTripResult(
  routeId: string,
  directionId: number,
  placeCode: string
): Promise<NexTripResult> {
  return baseFetch<NexTripResult>(`${API_ROOT}/${routeId}/${directionId}/${placeCode}`);
}

async function getNexTripResultByStopId(stopId: string): Promise<NexTripResult> {
  return baseFetch<NexTripResult>(`${API_ROOT}/${stopId}`);
}

async function getVehiclesByRoute(routeId: string): Promise<Vehicle[]> {
  return baseFetch<Vehicle[]>(`${API_ROOT}/vehicles/${routeId}`);
}

async function getDirectionsAndPlaces(
  routeId: string,
  directionId: number
): Promise<{ places: Place[]; directions: Direction[] }> {
  const directions = await getDirectionsForRoute(routeId);
  const places = await getPlaces(routeId, directionId);

  return { places, directions };
}

async function baseFetch<T>(url: string, body?: any, extraHeaders = {}): Promise<T> {
  const fetchConfig: { body?: string; headers: Record<string, string> } = {
    headers: {
      'Content-Type': 'application/json',
      ...extraHeaders,
    },
  };
  if (body) {
    fetchConfig.body = JSON.stringify(body);
  }
  const response = await fetch(url, fetchConfig);

  if (response.ok) {
    return await response.json();
  }

  const error = new Error(response.status.toString());
  error.message = response.statusText;
  throw error;
}

export const NexTripApi = {
  getRoutes,
  getDirectionsForRoute,
  getNexTripResult,
  getPlaces,
  getNexTripResultByStopId,
  getVehiclesByRoute,
  getDirectionsAndPlaces,
};
