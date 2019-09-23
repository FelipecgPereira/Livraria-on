import React, { Component } from "react";
import api from "../../services/api";
import "./styles.css";
export default class Books extends Component {
  state = {
    book: {}
  };

  async componentDidMount() {
    const { id } = this.props.match.params;
    console.log(id);
    const response = await api.get(`/products/${id}`);

    this.setState({ book: response.data });
  }
  render() {
    const { book } = this.state;

    return (
      <div className="book-info">
        <h1>{book.title}</h1>
        <p>{book.description}</p>

        <p>
          URL: <a href={book.url}>{book.url}</a>
        </p>
      </div>
    );
  }
}
