import React from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import find from 'lodash/find';
import { Place } from '../../types';

interface PlacesDropdownProps {
  places: Place[];
  selectedPlace?: Place;
  onSelectPlace: (place: Place) => void;
}

const PlacesDropdown: React.FC<PlacesDropdownProps> = (props: PlacesDropdownProps) => {
  const onChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    const selectedPlace = find(props.places, { place_code: event.target.value }) as Place;
    if (selectedPlace) {
      props.onSelectPlace(selectedPlace);
    }
  };
  return (
    <Select value={props.selectedPlace?.place_code} onChange={onChange}>
      {props.places?.map((place: Place) => (
        <MenuItem key={place.place_code} value={place.place_code}>
          {place.description}
        </MenuItem>
      ))}
    </Select>
  );
};

export default PlacesDropdown;
