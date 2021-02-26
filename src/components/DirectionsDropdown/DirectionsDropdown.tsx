import React from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import find from 'lodash/find';
import { Direction } from '../../types';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
  select: {
    width: '33%',
    fontSize: '20px',
  },
});

interface DirectionDropdownProps {
  directions: Direction[];
  selectedDirection?: Direction;
  onSelectDirection: (direction: Direction) => void;
}

const DirectionsDropdown: React.FC<DirectionDropdownProps> = ({
  selectedDirection,
  directions,
  onSelectDirection,
}) => {
  const classes = useStyles();
  const onChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    const selectedDirection = find(directions, { direction_id: event.target.value }) as Direction;
    if (selectedDirection) {
      onSelectDirection(selectedDirection);
    }
  };
  return (
    <Select className={classes.select} value={selectedDirection?.direction_id} onChange={onChange}>
      {directions?.map((direction: Direction) => (
        <MenuItem key={direction.direction_id} value={direction.direction_id}>
          {direction.direction_name}
        </MenuItem>
      ))}
    </Select>
  );
};

export default DirectionsDropdown;
