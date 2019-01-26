import React from 'react';
import { render } from 'react-dom';
import { getTrendData } from './utils';
import Chart from './components/Chart';

const rootElement = document.getElementById('root');

render(<Chart getTrendData={getTrendData} />, rootElement);
