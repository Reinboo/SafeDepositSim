import React from 'react';
import { shallow, mount } from 'enzyme';
import toJson from 'enzyme-to-json';

import Key from '../../../src/components/Keypad/Key';


describe('Key component', () => {
  test('renders correctly', () => {
    const mockHandler = jest.fn();
    const wrapper = shallow(<Key keyFace="1" handleClick={mockHandler} />);
    const component = wrapper.dive();

    expect(toJson(component)).toMatchSnapshot();
  });

  test('invokes handler', () => {
    const mockHandler = jest.fn();
    const wrapper = mount(<Key keyFace="1" handleClick={mockHandler} />);
    wrapper.find('button').at(0).simulate('click');

    expect(mockHandler).toHaveBeenCalled();
  });
});
