import React from 'react';
import ReactDOM from 'react-dom';
import ItemDetails from './components/ItemDetails/ItemDetails';
import Shipping from './components/Shipping/Shipping';
import Sizing from './components/Sizing/Sizing';
import Questions from './components/Questions/Questions';
import GiftNow from './components/GiftNow/GiftNow';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      current: 'ItemDetails',
      itemDetails: [],
      sizing: [],
      questions: [],
    };
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams) {
      if (urlParams.get('productId')) {
        var id = urlParams.get('productId');
      } else {
        var id = 14;
      }
    }

    Promise.all([
      fetch(`/api/items/${id}`),
      fetch(`/api/questions/${id}`),
      fetch(`/api/sizing/${id}`),
    ])
      .then(([res1, res2, res3]) => Promise.all([res1.json(), res2.json(), res3.json()]))
      .then(([res1, res2, res3]) => {
        this.setState({
          itemDetails: res1,
          questions: res2,
          sizing: res3,
        });
      });
  }

  handleClick(e) {
    this.setState({
      current: e,
    });
  }

  getClassName(e) {
    if (e === this.state.current) {
      return 'clicked';
    }
  }

  render() {
    var currentEle;
    if (this.state.current === 'ItemDetails' && this.state.itemDetails.length) {
      currentEle = <ItemDetails details={this.state.itemDetails} />;
    } else if (this.state.current === 'Shipping') {
      currentEle = <Shipping details={this.state.itemDetails} />;
    } else if (this.state.current === 'Sizing') {
      currentEle = <Sizing details={this.state.sizing} />;
    } else if (this.state.current === 'Questions') {
      currentEle = <Questions details={this.state.questions} />;
    } else if (this.state.current === 'GiftNow') {
      currentEle = <GiftNow />;
    }

    if(this.state.current === 'Sizing' || this.state.current === 'GiftNow') {
      var currentlyRendered = 'currentlyRenderedCenter'
    } else {
      currentlyRendered = 'currentlyRenderedLeft'
    }
    return (
      <div>
      <h1>About this item</h1>
        <nav>
          <a className={this.getClassName('ItemDetails')} onClick={() => this.handleClick('ItemDetails')}>Details</a>
          <a className={this.getClassName('Sizing')} onClick={() => this.handleClick('Sizing')}>Size charts</a>
          <a className={this.getClassName('Shipping')} onClick={() => this.handleClick('Shipping')}>Shipping & Returns</a>
          <a className={this.getClassName('Questions')} onClick={() => this.handleClick('Questions')}>Q&A</a>
          <a className={this.getClassName('GiftNow')} onClick={() => this.handleClick('GiftNow')}>What's GiftNow?</a>
        </nav>
        <div className={currentlyRendered}>{currentEle}</div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('service'));
