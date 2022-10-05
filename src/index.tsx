import React, { FC } from 'react';
import { render } from 'react-dom';

const App: FC = () => {
  return <div>123</div>
}

export default App;

render(<App />, document.getElementById('app')!);