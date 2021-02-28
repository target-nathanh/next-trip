import { Direction, Place, Route } from '../../types';

interface SearchByRouteReducerState {
  directions?: Direction[];
  routes?: Route[];
  places?: Place[];
  selectedRouteId?: string;
  selectedDirectionId?: number;
  selectedPlaceId?: string;
}

export function searchByRouteReducer(
  state: SearchByRouteReducerState,
  action: { type: string; payload?: any }
): SearchByRouteReducerState {
  switch (action.type) {
    case 'SET_PLACES_AND_DIRECTIONS': {
      const payload = action.payload;
      return {
        ...state,
        ...payload,
      };
    }
    case 'SET_ROUTES':
      return {
        ...state,
        routes: action.payload.routes,
      };
    case 'SET_PLACES':
      return {
        ...state,
        places: action.payload.places,
      };
    case 'SET_DIRECTIONS':
      return {
        ...state,
        directions: action.payload.directions,
      };
    case 'SET_SELECTED_ROUTE':
      return {
        ...state,
        selectedRouteId: action.payload.selectedRouteId,
      };
    case 'SET_SELECTED_DIRECTION':
      return {
        ...state,
        selectedDirectionId: action.payload.selectedDirectionId,
      };
    case 'SET_SELECTED_PLACE':
      return {
        ...state,
        selectedPlaceId: action.payload.selectedPlaceId,
      };
    case 'CLEAR_STATE':
      return {
        ...state,
        directions: [],
        places: [],
        selectedPlaceId: '',
        selectedDirectionId: -1,
      };
    default:
      throw new Error();
  }
}
