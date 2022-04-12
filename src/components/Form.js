import React from 'react';

class Form extends React.Component {
  render() {
    return (
      <form>
        <label htmlFor="name">
          Nome:
          <br />
          <input
            type="text"
            data-testid="name-input"
            name="name"
          />
        </label>
        <br />
        <br />
        <label htmlFor="description">
          Descrição:
          <br />
          <input
            type="text"
            data-testid="description-input"
            name="description"
          />
        </label>
        <label htmlFor="attr1">
          Attr1
          <br />
          <br />

          <input
            type="number"
            data-testid="attr1-input"
            name="attr1"
          />
        </label>
        <label htmlFor="attr2">
          Attr2
          <br />
          <br />
          <input
            type="number"
            data-testid="attr2-input"
            name="attr2"
          />
        </label>
        <label htmlFor="attr3">
          Attr3
          <br />
          <br />
          <input
            type="number"
            data-testid="attr3-input"
            name="attr3"
          />
        </label>
        <br />
        <br />
        <label htmlFor="inputImage">
          Adicionar Imagem:
          <br />
          <br />
          <input
            type="text"
            data-testid="image-input"
          />
        </label>
        <br />
        <br />
        <label htmlFor="optionsInput">
          Raridade:
          <br />
          <br />
          <select
            data-testid="rare-input"
          >
            <option>normal</option>
            <option>raro</option>
            <option>muito raro</option>
          </select>
        </label>
        <br />
        <br />
        <label htmlFor="checkboxInput">
          Super Trybe Trunfo:
          <input
            type="checkbox"
            data-testid="trunfo-input"
          />
        </label>
        <br />
        <br />
        <button
          type="submit"
          data-testid="save-button"
        >
          Salvar
        </button>
      </form>

    );
  }
}
export default Form;
