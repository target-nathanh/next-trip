import React from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import find from 'lodash/find';
import { Route } from '../../types';

interface RoutesDropdownProps {
  routes: Route[];
  selectedRoute?: Route;
  onSelectRoute: (route: Route) => void;
}

const RoutesDropdown: React.FC<RoutesDropdownProps> = (props: RoutesDropdownProps) => {
  const onChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    const selectedRoute = find(props.routes, { route_id: event.target.value }) as Route;
    if (selectedRoute) {
      props.onSelectRoute(selectedRoute);
    }
  };
  return (
    <Select value={props.selectedRoute?.route_id} onChange={onChange}>
      {props.routes?.map((route: Route) => (
        <MenuItem key={route.route_id} value={route.route_id}>
          {route.route_label}
        </MenuItem>
      ))}
    </Select>
  );
};

export default RoutesDropdown;
