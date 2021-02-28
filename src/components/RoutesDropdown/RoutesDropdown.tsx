import React from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { Route } from '../../types';
import { useDropdownStyles } from '../../common/styles/dropDownStyles';

interface RoutesDropdownProps {
  routes?: Route[];
  selectedRouteId?: string;
  onSelectRoute: (routeId: string) => void;
}

const RoutesDropdown: React.FC<RoutesDropdownProps> = ({
  routes,
  onSelectRoute,
  selectedRouteId,
}) => {
  const classes = useDropdownStyles();

  return (
    <Select
      className={classes.select}
      value={selectedRouteId}
      placeholder={'Select route'}
      onChange={(event: React.ChangeEvent<{ value: unknown }>) =>
        onSelectRoute(event.target.value as string)
      }
    >
      {routes?.map((route: Route) => (
        <MenuItem key={route.route_id} value={route.route_id}>
          {route.route_label}
        </MenuItem>
      ))}
    </Select>
  );
};

export default RoutesDropdown;
