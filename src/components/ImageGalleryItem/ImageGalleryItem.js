import { Component } from "react";
import styles from "./ImageGalleryItem.module.css";
import { v4 as uuidv4 } from "uuid";

export default class ImageGalleryItem extends Component {
  render() {
    console.log("this.props on modal open click :>> ", this.props);
    return (
      <>
        {this.props.drawData.map(({ id, webformatURL }) => {
          return (
            <li
              key={id}
              id={id}
              onClick={this.props.openModal}
              className={styles.image_gallery__item}
            >
              <img
                src={webformatURL}
                alt="some pic"
                className={styles.image_gallery_image}
              />
            </li>
          );
        })}
      </>
    );
  }
}
