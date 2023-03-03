import React from 'react';
import Card from './components/Card';
import Form from './components/Form';
import './App.css';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      cardName: '',
      cardDescription: '',
      cardAttr1: '',
      cardAttr2: '',
      cardAttr3: '',
      cardImage: '',
      cardRare: '',
      cardTrunfo: true,

    };
  }

  render() {
    return (
      <div className="container">
        <Form
          { ...this.state }
        />
        <Card
          { ...this.state }
        />
      </div>
    );
  }
}

export default App;
