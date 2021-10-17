import { Component } from "react";
import styles from "./ImageGallery.module.css";
import ImageGalleryItem from "../ImageGalleryItem/ImageGalleryItem";
import Modal from "../Modal/Modal";
import Button from "../Button/Button";
import ApiService from "../../apiService/apiService";
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import PropTypes from "prop-types";

const URL = "https://pixabay.com/api/";
const key = "23099756-b59a1c1cdbe94bc1dac04ed03";
const ApiServiceObj = new ApiService(URL, key);

export default class ImageGallery extends Component {
  state = {
    fetchedImgs: [],
    status: "init",
    modalImgId: null,

    isModalOpen: false,
  };

  static propTypes = {
    searchValue: PropTypes.string.isRequired,
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.searchValue !== this.props.searchValue) {
      this.setState({ status: "pending" });
      ApiServiceObj.resetPage();
      ApiServiceObj.searchQuery = this.props.searchValue;
      ApiServiceObj.fetchImages()
        .then((res) => {
          this.setState({ fetchedImgs: res, status: "success" });
        })
        .catch((err) => {
          console.log(err);
          this.setState({ status: "error" });
        });
    }
  }

  handleClick = () => {
    ApiServiceObj.incPageNumber();
    console.log(ApiServiceObj.page);
    ApiServiceObj.fetchImages()
      .then((searchResults) => {
        this.setState((prev) => ({
          fetchedImgs: [...prev.fetchedImgs, ...searchResults],
          status: "success",
        }));
      })
      .then(() => {
        window.scrollTo({
          top: document.documentElement.scrollHeight,
          behavior: "smooth",
        });
      })
      .catch((err) => {
        console.log(err);
        this.setState({ status: "error" });
      });
  };

  modalImg = () => {
    const { fetchedImgs, modalImgId } = this.state;
    const modalImg = fetchedImgs.find((fetchedImgs) => {
      return fetchedImgs.id === modalImgId;
    });
    return modalImg;
  };

  openModal = (e) => {
    this.setState({
      isModalOpen: true,
      modalImgId: Number(e.currentTarget.id),
    });
  };

  closeModal = () => {
    this.setState({ isModalOpen: false });
  };

  render() {
    const { isModalOpen, modalImgId } = this.state;
    if (this.state.status === "init") {
      return <h2>Awaiting for your query...</h2>;
    }
    if (this.state.status === "pending") {
      return (
        <div>
          <Loader
            type="BallTriangle"
            color="yellowgreen"
            height={200}
            width={200}
            timeout={3000}
          />
        </div>
      );
    }
    if (this.state.status === "success") {
      return (
        <>
          <ul className={styles.image_gallery}>
            <ImageGalleryItem
              drawData={this.state.fetchedImgs}
              openModal={this.openModal}
            />
          </ul>
          <Button onClick={this.handleClick} />
          {isModalOpen && (
            <Modal modalImgId={modalImgId} onClose={this.closeModal}>
              <img src={this.modalImg().largeImageURL} alt="some pic" />
            </Modal>
          )}
        </>
      );
    }
  }
}
