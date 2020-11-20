import logo from './logo.svg';
import './App.css';
import { Button } from 'antd-mobile';
import { useEffect } from 'react';
import liff from '@line/liff';

function App() {
  useEffect(() => {
    console.log('useEffect')
    liff.init({ liffId: process.env.REACT_APP_LIFF_ID });
  }, []);

  return (
    <div className="App">
      <Button type="primary">Start</Button>
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
