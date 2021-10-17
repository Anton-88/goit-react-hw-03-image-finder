import axios from "axios";

export default class ApiService {
  constructor(URL, key) {
    this.URL = URL;
    this.key = key;
    this._searchQuery = "";
    // this.URL = 'https://pixabay.com/api/';
    // this.key = '23099756-b59a1c1cdbe94bc1dac04ed03';
    this._page = 1;
    this._perPage = 12;
    this.orientation = "horizontal";
    this.type = "photo";
  }

  get searchQuery() {
    return this._searchQuery;
  }
  set searchQuery(value) {
    return (this._searchQuery = value);
  }

  get page() {
    return this._page;
  }
  set page(value) {
    return (this._page = value);
  }

  get perPage() {
    return this._perPage;
  }
  set perPage(value) {
    return (this._perPage = value);
  }

  resetPage() {
    return (this._page = 1);
  }

  incPageNumber() {
    this._page += 1;
  }

  async fetchImages() {
    const query = `${this.URL}?key=${this.key}&page=${this._page}&per_page=${this._perPage}
        &orientation=${this.orientation}&image_type=${this.type}&q=${this._searchQuery}`;
    console.log("query :>> ", query);
    try {
      const result = await axios.get(query);
      console.log("FETCHED PICTURES :>> ", result.data);
      return result.data.hits;
    } catch (err) {
      return err;
    }
  }
}
