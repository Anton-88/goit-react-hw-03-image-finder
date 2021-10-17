import React, { Component } from "react";
import { createPortal } from "react-dom/cjs/react-dom.development";
import styles from "./Modal.module.css";
import PropTypes from "prop-types";

const modalRoot = document.getElementById("modal-root");

export default class Modal extends Component {
  static propTypes = {
    children: PropTypes.any.isRequired,
  };

  componentDidMount() {
    window.addEventListener("keydown", this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener("keydown", this.handleKeyDown);
  }

  handleKeyDown = (e) => {
    if (e.code === "Escape") {
      this.props.onClose();
    }
  };

  handleBackdropClick = (e) => {
    if (e.currentTarget === e.target) {
      this.props.onClose();
    }
  };

  render() {
    const { handleBackdropClick } = this;
    return createPortal(
      <div className={styles.modal_backdrop} onClick={handleBackdropClick}>
        <div className={styles.modal_content}>{this.props.children}</div>
      </div>,
      modalRoot
    );
  }
}
