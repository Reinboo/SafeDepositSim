import React from 'react';
import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';

import Keypad from '../../../src/components/Keypad';
import Key from '../../../src/components/Keypad/Key';

describe('Keypad component', () => {
  test('renders correctly', () => {
    const mockHandleLock = jest.fn();
    const mockHandleUpdate = jest.fn();
    const wrapper = mount(
      <Keypad
        handleLock={mockHandleLock}
        handleUpdate={mockHandleUpdate}
        isServiceMode={false}
      />,
    );

    expect(toJson(wrapper)).toMatchSnapshot();
  });

  test('supplies proper handler on L press', () => {
    const mockHandleLock = jest.fn();
    const mockHandleUpdate = jest.fn();
    const wrapper = mount(
      <Keypad
        handleLock={mockHandleLock}
        handleUpdate={mockHandleUpdate}
        isServiceMode={false}
      />,
    );
  });


});
