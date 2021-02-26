import React from 'react';

import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { SearchMode } from '../../common/constants';
interface SearchMethodPickerProps {
  searchMethod: string;
  onSelectMethod: (method: string) => void;
}

const SearchMethodPicker: React.FC<SearchMethodPickerProps> = (props: SearchMethodPickerProps) => {
  return (
    <div>
      <Tabs
        value={props.searchMethod}
        onChange={(event: React.ChangeEvent<{}>, newValue: string) =>
          props.onSelectMethod(newValue)
        }
        indicatorColor="primary"
        textColor="primary"
        centered
      >
        <Tab label="By Route" value={SearchMode.ROUTE} />
        <Tab label="By Stop #" value={SearchMode.STOP} />
      </Tabs>
    </div>
  );
};

export default SearchMethodPicker;
