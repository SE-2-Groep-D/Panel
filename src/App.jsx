import '@pagestyles/App.scss';


import {Icon} from '@components';

import { useState } from 'react';

function App() {
  const [open, setOpen] = useState(false);

  return (
      <>
       <Icon type='add' color='blue' size='50'/>
      </>
  )
}

export default App
