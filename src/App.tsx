import { useQueryCall, useUpdateCall } from '@ic-reactor/react';
import './App.css';
import motokoLogo from './assets/motoko_moving.png';
import motokoShadowLogo from './assets/motoko_shadow.png';
import reactLogo from './assets/react.svg';
import viteLogo from './assets/vite.svg';
import { useState } from 'react';
import MapPage from './pages/MapPage';

function App() {
  const { data: count, refetch } = useQueryCall({
    functionName: 'get',
  });

  const { data: greet, refetch: refetchName } = useQueryCall({
    functionName: 'sayhello',
    args: ['Keyzar']
  })

  const { call: increment, loading } = useUpdateCall({
    functionName: 'inc',
    onSuccess: refetch,
  });



  return (
    <div className="App">

      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo vite" alt="Vite logo" />
        </a>
        <a href="https://reactjs.org" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
        <a
          href="https://internetcomputer.org/docs/current/developer-docs/build/cdks/motoko-dfinity/motoko/"
          target="_blank"
        >
          <span className="logo-stack">
            <img
              src={motokoShadowLogo}
              className="logo motoko-shadow"
              alt="Motoko logo"
            />
            <img src={motokoLogo} className="logo motoko" alt="Motoko logo" />
          </span>
        </a>
      </div>
      <h1 className='text-red-400'>Vite + React + Motoko</h1>
      <div className="card">
        <button onClick={increment} disabled={loading}>
          count is {count?.toString() ?? 'loading...'}
        </button>
        <p>
          Edit <code>{greet as string}</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite, React, and Motoko logos to learn more
      </p>
      <MapPage />
    </div>
  );
}

export default App;
