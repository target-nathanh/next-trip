import React from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { Place } from '../../types';
import { useDropdownStyles } from '../../common/styles/dropDownStyles';

interface PlacesDropdownProps {
  places: Place[];
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
    <Select
      className={classes.select}
      value={selectedPlaceId}
      onChange={(event: React.ChangeEvent<{ value: unknown }>) =>
        onSelectPlace(event.target.value as string)
      }
    >
      {places?.map((place: Place) => (
        <MenuItem key={place.place_code} value={place.place_code}>
          {place.description}
        </MenuItem>
      ))}
    </Select>
  );
};

export default PlacesDropdown;
