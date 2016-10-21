import React from 'react';
import { shallow, mount } from 'enzyme';
import chai from 'chai';
import chaiEnzyme from 'chai-enzyme';
import sinon from 'sinon';
import { jsdom } from 'jsdom';
import App from '../../src/app.jsx';

chai.should();
chai.use(chaiEnzyme());

const LocalStorage = require('node-localstorage').LocalStorage;

global.localStorage = new LocalStorage('./../localStorageTemp');
global.document = jsdom('');
global.window = document.defaultView;
global.window.localStorage = global.localStorage;

describe('<App />', () => {
  const then = sinon.stub(); // info: need to find a better way to mock a Promise
  const props = {
    model: () => ({ get: () => ({ then }) }),
    falcorPath: '/model.json'
  };

  describe('when rendered', () => {
    it('then it should have descendants "div.App"', () => {
      const wrapper = shallow(<App {...props} />);

      wrapper.should.have.descendants('div.App');
    });

    describe.skip('and "onChange" ".App-textarea.query"', () => {
      it('then "handleOnChange" should be called', () => {
        sinon.spy(App.prototype, 'updateQuery');

        mount(<App {...props} />);

        App.prototype.find('.App-textarea.query').simulate('change');

        App.prototype.updateQuery.calledOnce.should.equal(true);
        App.prototype.updateQuery.restore();
      });
    });

    describe.skip('and "onClick" "button"', () => {
      it('then "handleOnClick" should be called', () => {
        sinon.spy(App.prototype, 'handleOnClick');
        mount(<App {...props} />);

        App.prototype.find('button').simulate('click');

        App.prototype.handleOnClick.calledOnce.should.equal(true);
        App.prototype.handleOnClick.restore();
      });
    });

    describe.skip('and "falcorGet"', () => {
      it('then ".then" w/ response should be called', () => {
        mount(<App {...props} />);
        then.yields({});

        App.prototype.find('button').simulate('click');

        sinon.assert.called(then);
      });

      it('then ".then" w/o response should be called', () => {
        mount(<App {...props} />);
        then.yields(null);

        App.prototype.find('button').simulate('click');

        sinon.assert.called(then);
      });
    });
  });
});
