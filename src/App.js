import "./App.css";
import { v4 as uuidv4 } from "uuid";
import { Component } from "react";
import styles from "./App.css";
import apiService from "./apiService/apiService";
import Modal from "./components/Modal/Modal";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import SearchBar from "./components/Searchbar/Searchbar";

class App extends Component {
  state = {
    searchValue: "",
  };

  getSearchValue = (searchValue) => {
    console.log("get search Value");
    this.setState({ searchValue });
  };

  render() {
    const { searchValue } = this.state;
    const { getSearchValue } = this;
    return (
      <>
        <SearchBar getSearchValue={getSearchValue} />
        <ImageGallery searchValue={searchValue} />
      </>
    );
  }
}

export default App;

// render() {
//   const { showModal, pics, isLoading } = this.state;
//   const { toggleModal, onFormSubmit } = this;
//   return (
//     <>
//       <SearchBar onSubmit={onFormSubmit} />
//       <button type='button' onClick={toggleModal}>Open modal</button>
//       {showModal && <Modal>
//         <p>Hi, it is me, modal</p>
//         <button type='button' onClick={toggleModal}>Close</button>
//       </Modal>}
//       {pics.length > 0 && <ImageGallery drawData={pics} />}
//     </>
//   );
// }
