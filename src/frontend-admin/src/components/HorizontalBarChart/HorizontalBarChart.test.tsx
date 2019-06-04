import React from 'react';
import ReactDOM from 'react-dom';
import {HorizontalBarChart} from './HorizontalBarChart';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<HorizontalBarChart title={"Test"} amount={8} outOf={10} />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('renders without crashing when amount > outOf', () => {
  const div = document.createElement('div');
  ReactDOM.render(<HorizontalBarChart title={"Test"} amount={8} outOf={4} />, div);
  ReactDOM.unmountComponentAtNode(div);
})