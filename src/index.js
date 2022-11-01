import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';
const HTMLContainer = document.getElementById('root');
const reactRoot = createRoot(HTMLContainer);

reactRoot.render(<App />);
