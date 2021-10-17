import { Component } from "react";
import { findRenderedDOMComponentWithClass } from "react-dom/test-utils";
import PropTypes from "prop-types";
import styles from "./Searchbar.module.css";

export default class SearchBar extends Component {
  state = {
    searchValue: "",
  };
  static propTypes = {
    getSearchValue: PropTypes.func.isRequired,
  };

  handleSearchChange = (e) => {
    this.setState({ searchValue: e.target.value });
  };

  handleSearchSubmit = (e) => {
    e.preventDefault();
    console.log("before fetch :>> ", this.state.searchValue);
    this.props.getSearchValue(this.state.searchValue);
    this.setState({ searchValue: "" });
  };
  render() {
    return (
      <header className={styles.searchbar}>
        <form className={styles.search_form} onSubmit={this.handleSearchSubmit}>
          <button type="submit" className={styles.search_form__button}>
            <span className={styles.search_form__label}></span>
          </button>

          <input
            className={styles.search_form__input}
            name="searchValue"
            // value={this.state.searchValue}
            type="text"
            autoComplete="off"
            autoFocus
            onChange={this.handleSearchChange}
          />
        </form>
      </header>
    );
  }
}
