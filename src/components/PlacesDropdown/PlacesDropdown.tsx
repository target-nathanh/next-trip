import React from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { Place } from '../../types';
import { useDropdownStyles } from '../../common/styles/dropDownStyles';
import { FormControl, InputLabel } from '@material-ui/core';

interface PlacesDropdownProps {
  places?: Place[];
  selectedPlaceId?: string;
  onSelectPlace: (placeId: string) => void;
}

const PlacesDropdown: React.FC<PlacesDropdownProps> = ({
  places,
  selectedPlaceId,
  onSelectPlace,
}) => {
  const classes = useDropdownStyles();

  return (
    <FormControl>
      <InputLabel id="route-select-label">Route</InputLabel>
      <Select
        className={classes.select}
        labelId="route-select-label"
        value={selectedPlaceId}
        onChange={(event: React.ChangeEvent<{ value: unknown }>) =>
          onSelectPlace(event.target.value as string)
        }
      >
        {places?.map((place: Place, index) => (
          <MenuItem key={place.place_code} value={place.place_code}>
            {place.description}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default PlacesDropdown;
