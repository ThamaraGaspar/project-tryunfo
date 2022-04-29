import React from 'react';
import Card from './components/Card';
import Form from './components/Form';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      cardName: '',
      cardDescription: '',
      cardAttr1: 0,
      cardAttr2: 0,
      cardAttr3: 0,
      cardImage: '',
      cardRare: '',
      cardTrunfo: false,
      isSaveButtonDisabled: true,
      cards: [],
      hasTrunfo: false,
    };
  }

  onInputChange = ({ target }) => {
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    this.setState({
      [name]: value,
    }, () => {
      const { cardName, cardDescription,
        cardAttr1, cardAttr2,
        cardAttr3, cardImage,
        cardRare,
      } = this.state;

      const attr1 = parseInt(cardAttr1, 10);
      const attr2 = parseInt(cardAttr2, 10);
      const attr3 = parseInt(cardAttr3, 10);
      const Total = attr1 + attr2 + attr3;
      const maxTotal = 210;
      const maximum = 90;
      const Minimum = 0;

      if (
        cardName === ''
        || cardDescription === ''
        || cardImage === ''
        || cardRare === ''
        || cardAttr1 < Minimum
        || cardAttr1 > maximum
        || cardAttr2 < Minimum
        || cardAttr2 > maximum
        || cardAttr3 < Minimum
        || cardAttr3 > maximum
        || Total > maxTotal
      ) {
        this.setState({ isSaveButtonDisabled: true });
      } else {
        this.setState({ isSaveButtonDisabled: false });
      }
    });
  }

  onSaveButtonClick = (e) => {
    e.preventDefault();
    const {
      cardName,
      cardDescription,
      cardAttr1,
      cardAttr2,
      cardAttr3,
      cardImage,
      cardRare,
      cardTrunfo,
      hasTrunfo,
      cards,
    } = this.state;
    const saveCards = {
      cardName,
      cardDescription,
      cardAttr1,
      cardAttr2,
      cardAttr3,
      cardImage,
      cardRare,
      cardTrunfo,
      hasTrunfo,
    };
    cards.push(saveCards);
    this.setState({
      cardName: '',
      cardDescription: '',
      cardImage: '',
      cardAttr1: '0',
      cardAttr2: '0',
      cardAttr3: '0',
      cardRare: 'normal',
    });
    const isChecked = cards.some((checked) => checked.cardTrunfo === true);
    this.setState({
      hasTrunfo: isChecked,
    });
  }

  removeCard = ({ target }) => {
    const { cards } = this.state;
    const filter = cards.filter((saveCards) => saveCards.cardName !== target.value);
    this.setState({ cards: filter, hasTrunfo: false });
  }

  render() {
    const {
      cardName,
      cardDescription,
      cardAttr1,
      cardAttr2,
      cardAttr3,
      cardImage,
      cardRare,
      cardTrunfo,
      isSaveButtonDisabled,
      cards,
      hasTrunfo,
    } = this.state;
    return (
      <>
        <Form
          cardName={ cardName }
          cardDescription={ cardDescription }
          cardAttr1={ cardAttr1 }
          cardAttr2={ cardAttr2 }
          cardAttr3={ cardAttr3 }
          cardImage={ cardImage }
          cardRare={ cardRare }
          cardTrunfo={ cardTrunfo }
          onInputChange={ this.onInputChange }
          isSaveButtonDisabled={ isSaveButtonDisabled }
          onSaveButtonClick={ this.onSaveButtonClick }
          hasTrunfo={ hasTrunfo }
        />
        <Card
          cardName={ cardName }
          cardDescription={ cardDescription }
          cardAttr1={ cardAttr1 }
          cardAttr2={ cardAttr2 }
          cardAttr3={ cardAttr3 }
          cardImage={ cardImage }
          cardRare={ cardRare }
          cardTrunfo={ cardTrunfo }
          hasTrunfo={ hasTrunfo }
        />
        {cards.map((saveCards, index) => (
          <div key={ index }>
            <Card { ...saveCards } />
            <button
              type="button"
              data-testid="delete-button"
              onClick={ this.removeCard }
              value={ saveCards.cardName }
            >
              Excluir
            </button>
          </div>))}
      </>
    );
  }
}

export default App;
