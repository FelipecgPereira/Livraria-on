import React, { Component } from "react";
import api from "../../services/api";
import { Link } from "react-router-dom";

import "./styles.css";
export default class Main extends Component {
  state = {
    books: [],
    booksInfo: {},
    page: 1
  };
  //Ciclo de vida Reac -> Execultado assim que é exibido em tela.
  componentDidMount() {
    this.loadBooks();
  }

  //Função de carregar livros
  loadBooks = async (page = 1) => {
    const response = await api.get(`/products?page=${page}`);
    //Armazenando dados dentro booksInfo utilizando restoperation
    const { docs, ...booksInfo } = response.data;
    //Atribui valor a state.books
    this.setState({ books: docs, booksInfo, page });
  };

  //Função navegação entre paginas
  prevPage = () => {
    const { page } = this.state;
    if (page === 1) return;

    const pageNumber = page - 1;

    this.loadBooks(pageNumber);
  };
  nextPage = () => {
    const { page, booksInfo } = this.state;
    if (page === booksInfo.pages) return;

    const pageNumber = page + 1;

    this.loadBooks(pageNumber);
  };

  render() {
    const { books, page, booksInfo } = this.state;
    return (
      <div className="books-list">
        {books.map(books => (
          <article key={books._id}>
            <strong>{books.title}</strong>
            <p>{books.description}</p>
            <Link to={`/products/${books._id}`}>Acessar</Link>
          </article>
        ))}
        <div className="actions">
          <button disabled={page === 1} onClick={this.prevPage}>
            Anterior
          </button>
          <button disabled={page === booksInfo.pages} onClick={this.nextPage}>
            Proximo
          </button>
        </div>
      </div>
    );
  }
}
