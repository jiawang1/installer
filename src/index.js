import React from 'react';
import { render } from 'react-dom';

import App from './app/App';

import './index.css';

const root = document.createElement('div');
root.className = 'app-root';
root.id = 'app-root';
document.body.appendChild(root);

render(<App />, root);
