import React from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { Direction } from '../../types';
import { useDropdownStyles } from '../../common/styles/dropDownStyles';

interface DirectionDropdownProps {
  directions?: Direction[];
  selectedDirectionId?: number;
  onSelectDirection: (directionId: number) => void;
}

const DirectionsDropdown: React.FC<DirectionDropdownProps> = ({
  selectedDirectionId,
  directions,
  onSelectDirection,
}) => {
  const classes = useDropdownStyles();
  return (
    <Select
      className={classes.select}
      value={selectedDirectionId}
      onChange={(event: React.ChangeEvent<{ value: unknown }>) =>
        onSelectDirection(event.target.value as number)
      }
    >
      {directions?.map((direction: Direction) => (
        <MenuItem key={direction.direction_id} value={direction.direction_id}>
          {direction.direction_name}
        </MenuItem>
      ))}
    </Select>
  );
};

export default DirectionsDropdown;
