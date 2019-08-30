import React from 'react';
import Enzyme from './enzyme.js'
import { expect } from 'chai';
import { shallow } from 'enzyme';

import Questions from '../../client/src/components/Questions/Questions';
import QuestionWithAnswer from '../../client/src/components/Questions/QuestionWithAnswer';
import QuestionWithoutAnswer from '../../client/src/components/Questions/QuestionWithoutAnswer';

var mockQuestions = [{
  question: 'thisIsAQuestion',
  asker: 'thisIsAnAsker',
  answer: 'thisIsAnAnswer',
  dateAnswered: 'thisIsDateAnswered',
  dateAsked: 'thisIsDateAsked',
  helpfulCount: 1,
  unhelpfulCount: 0
  }]

  describe('<Questions />', () => {
    it('renders a questionWithAnswer OR questionWithoutAnswer component, but not both', () => {
      const wrapper = shallow(<Questions details={mockQuestions}/>);
      const totalLength = wrapper.find(QuestionWithAnswer).length + wrapper.find(QuestionWithoutAnswer).length
      expect(totalLength).to.equal(1);
    });

    it('renders a `.question` class', () => {
      const wrapper = shallow(<Questions details={mockQuestions}/>);
      expect(wrapper.find('.question')).to.have.lengthOf(1);
    });
  });

  describe('<QuestionWithAnswer />', () => {
    it('renders a `.questionWithAnswer` class', () => {
      const wrapper = shallow(<QuestionWithAnswer question={mockQuestions[0]} />);
      expect(wrapper.find('.questionWithAnswer')).to.have.lengthOf(1);
    });

    it('renders an answer', () => {
      const wrapper = shallow(<QuestionWithAnswer question={mockQuestions[0]} />);
      expect(wrapper.text()).to.include('thisIsAnAnswer');
    });

    it('renders a date answered', () => {
      const wrapper = shallow(<QuestionWithAnswer question={mockQuestions[0]} />);
      expect(wrapper.text()).to.include('thisIsDateAnswered');
    });

    it('renders a helpfulCount', () => {
      const wrapper = shallow(<QuestionWithAnswer question={mockQuestions[0]} />);
      expect(wrapper.text()).to.include('1');
    });

    it('renders an unhelpfulCount', () => {
      const wrapper = shallow(<QuestionWithAnswer question={mockQuestions[0]} />);
      expect(wrapper.text()).to.include('0');
    });

  })

  describe('<QuestionWithoutAnswer />', () => {
    it('renders a `.questionWithoutAnswer` class', () => {
      const wrapper = shallow(<QuestionWithoutAnswer question={mockQuestions[0]}/>);
      expect(wrapper.find('.questionWithoutAnswer')).to.have.lengthOf(1);
    });

    it('renders a question', () => {
      const wrapper = shallow(<QuestionWithoutAnswer question={mockQuestions[0]}/>);
      expect(wrapper.text()).to.include('thisIsAQuestion')
    });

    it('renders an asker', () => {
      const wrapper = shallow(<QuestionWithoutAnswer question={mockQuestions[0]}/>);
      expect(wrapper.text()).to.include('thisIsAnAsker')
    });

    it('renders a date asked', () => {
      const wrapper = shallow(<QuestionWithoutAnswer question={mockQuestions[0]}/>);
      expect(wrapper.text()).to.include('thisIsDateAsked')
    });

    it('does not render an answer', () => {
      const wrapper = shallow(<QuestionWithoutAnswer question={mockQuestions[0]}/>);
      expect(wrapper.text()).to.not.include('thisIsAnAnswer')
    });

    it('does not render a date answered', () => {
      const wrapper = shallow(<QuestionWithoutAnswer question={mockQuestions[0]}/>);
      expect(wrapper.text()).to.not.include('thisIsDateAnswered')
    });

    it('does not render a helpful count', () => {
      const wrapper = shallow(<QuestionWithoutAnswer question={mockQuestions[0]}/>);
      expect(wrapper.text()).to.not.include(1)
    });

    it('does not render an unhelpful count', () => {
      const wrapper = shallow(<QuestionWithoutAnswer question={mockQuestions[0]}/>);
      expect(wrapper.text()).to.not.include(0)
    });
  })
