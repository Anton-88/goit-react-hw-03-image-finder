import { Component } from "react/cjs/react.production.min";
import PropTypes from "prop-types";
import styles from "./Button.module.css";

export default class Button extends Component {
  render() {
    return (
      <button
        type="button"
        onClick={this.props.onClick}
        className={styles.button_more}
      >
        Load more
      </button>
    );
  }
}

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
};
