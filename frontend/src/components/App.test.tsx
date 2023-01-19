import React, {ChangeEvent} from 'react';
import { render, screen } from '@testing-library/react';
import Switcher from './Switcher/Switcher';

test('Type of comments', () => {
  render(<Switcher radioValue={'main'} handleRadioChange={(e: ChangeEvent<HTMLInputElement>) => {console.log('switch')}}/>);
  const linkElement = screen.getByText(/Type of comments/i);
  expect(linkElement).toBeInTheDocument();
});
