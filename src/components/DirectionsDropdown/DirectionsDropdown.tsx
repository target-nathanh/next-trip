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
      value={selectedDirectionId?.toString()}
      placeholder={'Select direction'}
      onChange={(event: React.ChangeEvent<{ value: unknown }>) =>
        onSelectDirection(parseInt(event.target.value as string, 10))
      }
    >
      {directions?.map((direction: Direction) => (
        <MenuItem key={direction.direction_id} value={direction.direction_id.toString()}>
          {direction.direction_name}
        </MenuItem>
      ))}
    </Select>
  );
};

export default DirectionsDropdown;
