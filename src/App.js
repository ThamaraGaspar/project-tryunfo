import React from 'react';
import Card from './components/Card';
import Filters from './components/Filters';
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
      nameFilter: '',
      rareFilter: 'todas',
      trunfoFilter: false,
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

  filterName = ({ target }) => {
    this.setState({
      [target.name]: target.value,
    });
  }

  filterarity = () => {
    this.setState(({ trunfoFilter }) => ({
      trunfoFilter: !trunfoFilter,
    }));
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

  onFilterChange = ({ target }) => {
    console.log(target.value);
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;

    this.setState({
      [name]: value,
    });
  }

  changeHasTrunfo = () => {
    const { cards } = this.state;
    const changeTrunfo = cards
      .some((filtered) => filtered.cardTrunfo === true);
    this.setState({
      hasTrunfo: changeTrunfo,
    });
  }

  removeCard = (filtered) => {
    const { cards } = this.state;
    console.log(filtered);
    const newKeyContents = cards
      .filter(({ cardName }) => cardName !== filtered.cardName);
    this.setState({
      cards: newKeyContents,
    }, () => this.changeHasTrunfo());
  }

  render() {
    const {
      isSaveButtonDisabled,
      cards,
      nameFilter,
      rareFilter,
      trunfoFilter,
    } = this.state;

    const alreadyFiltered = (
      trunfoFilter
        ? cards.filter((c) => c.cardTrunfo === true)
        : (
          cards
            .filter((filtered) => filtered.cardName.includes(nameFilter))
            .filter((filtered) => (rareFilter === 'todas'
              ? filtered : filtered.cardRare === rareFilter))
        )
    );

    return (
      <>
        <Form
          { ...this.state }
          onInputChange={ this.onInputChange }
          isSaveButtonDisabled={ isSaveButtonDisabled }
          onSaveButtonClick={ this.onSaveButtonClick }
        />
        <Card { ...this.state } />
        <Filters
          { ... this.state }
          filterarity={ this.filterarity }
          filterName={ this.filterName }
        />
        {alreadyFiltered
          .map((filtered) => (
            <div key={ filtered.cardName }>
              <Card { ...filtered } />
              <button
                type="submit"
                data-testid="delete-button"
                onClick={ () => this.removeCard(filtered) }
              >
                Excluir
              </button>
            </div>
          ))}
      </>
    );
  }
}

export default App;
