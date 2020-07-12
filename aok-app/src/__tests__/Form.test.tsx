import React from 'react';
import Enzyme, { mount, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { act } from "react-dom/test-utils";

import Form from '../components/Form';

Enzyme.configure({ adapter: new Adapter()});

describe('<Form>', function() {

  it('Should show loader after submitting the form', async () => {
    const component = mount(<Form />);
    component.simulate('submit', { preventDefault: () => {} });
    expect(component.find('.Loader').length).toBe(1);
    await act(async () => {
      component.unmount();
    });
  })

  it('Error message should not be shown on successful response', async () => {
    const component = mount(<Form />);
    const mockResponse = (status, statusText, response) => {
      return new window.Response(response, {
        status: status,
        statusText: statusText,
        headers: {'Content-type': 'application/json'}
      });
    };
    jest.spyOn(global, "fetch").mockImplementation(() =>
      Promise.resolve(
        mockResponse(200, null, JSON.stringify({ sucess: true }))
      )
    );
    component.simulate('submit', { preventDefault: () => {} });
    expect(component.find('.ErrorMessage').length).toBe(0);
    await act(async () => {
      component.unmount();
    });
  });

});