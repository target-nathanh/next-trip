import TextField from '@material-ui/core/TextField';
import Icon from '@material-ui/core/Icon';
import React, { KeyboardEvent, useState } from 'react';
import { IconButton, makeStyles } from '@material-ui/core';
import { NexTripResult } from '../../types';
import { NexTripApi } from '../../api/nex-trip-api';

const useStyles = makeStyles({
  input: {
    '& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button': {
      display: 'none',
      margin: 80,
    },
  },
});

interface SearchByStopInputProps {
  onResultsRetrieved: (nexTripResult: NexTripResult) => void;
}

const SearchByStopInput: React.FC<SearchByStopInputProps> = ({
  onResultsRetrieved,
}: SearchByStopInputProps) => {
  const { input } = useStyles();
  const [stopNumber, setStopNumber] = useState<string>('');
  const [showError, setShowError] = useState<boolean>(false);

  const onSearch = async () => {
    try {
      const results = await NexTripApi.getNexTripResultByStopId(stopNumber);
      onResultsRetrieved(results);
    } catch (e) {
      setShowError(true);
    }
  };
  const onKeyDownHandler = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter') {
      onSearch();
    }
  };

  return (
    <>
      <TextField
        className={input}
        error={showError}
        aria-errormessage={'The entered stop number is not valid'}
        type="number"
        value={stopNumber}
        onChange={(event) => setStopNumber(event.target.value)}
        onKeyDown={(event) => onKeyDownHandler(event)}
        placeholder="Enter stop number"
      />
      <IconButton aria-label="search" onClick={() => onSearch()}>
        <Icon>search</Icon>
      </IconButton>
    </>
  );
};

export default SearchByStopInput;
