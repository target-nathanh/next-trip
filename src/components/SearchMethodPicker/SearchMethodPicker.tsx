import React, { useEffect, useState } from 'react';

import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { SearchMode } from '../../common/constants';
import { useHistory, useLocation } from 'react-router-dom';

const SearchMethodPicker: React.FC = () => {
  const history = useHistory();
  const [selectedMethod, setSelectedMethod] = useState<string>(
    history.location.pathname !== '/' ? history.location.pathname.split('/')[1] : SearchMode.ROUTE
  );

  const location = useLocation();

  useEffect(() => {
    if (location.pathname !== '/') {
      setSelectedMethod(location.pathname.split('/')[1]);
    }
  }, [location]);

  const selectedMethodChanged = (method: string) => {
    setSelectedMethod(method);
    history.push(`/${method}`);
  };
  return (
    <div>
      <Tabs
        value={selectedMethod}
        onChange={(event: React.ChangeEvent<{}>, newValue: string) =>
          selectedMethodChanged(newValue)
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
