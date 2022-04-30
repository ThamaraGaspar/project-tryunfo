import React from 'react';
import PropTypes from 'prop-types';

class Filters extends React.Component {
  render() {
    const { nameFilter, filterRarity, filterName, rareFilter } = this.props;
    return (
      <div>
        <form>
          <label htmlFor="name-filter">
            Name:
            <input
              type="text"
              data-testid="name-filter"
              id="name-filter"
              name="nameFilter"
              value={ nameFilter }
              onChange={ filterName }
            />
          </label>
          <label htmlFor="rare-filter">
            Raridade:
            <select
              data-testid="rare-filter"
              id="rare-filter"
              name="rareFilter"
              value={ rareFilter }
              onChange={ filterName }
            >
              <option value="todas">Todas</option>
              <option value="normal">Normal</option>
              <option value="raro">Raro</option>
              <option value="muito raro">Muito Raro</option>
            </select>
          </label>
          <label htmlFor="trunfo-filter">
            Super Trunfo:
            <input
              type="checkbox"
              data-testid="trunfo-filter"
              id="trunfo-filter"
              name="trunfoFilter"
              onClick={ filterRarity }
            />
          </label>
        </form>
      </div>
    );
  }
}
Filters.propTypes = {
  nameFilter: PropTypes.string.isRequired,
  filterName: PropTypes.func.isRequired,
  filterRarity: PropTypes.func.isRequired,
  rareFilter: PropTypes.string.isRequired,
};
export default Filters;
