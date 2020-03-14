import React, {Component} from 'react';
import {graphql} from 'react-apollo';
import {getBookQuery} from '../queries/queries';


class BookDetails extends Component {

  displayBookDetails() {
    const {book} = this.props.data;
    if(book) {
      return (
        <div>
              <h2>{book.name}</h2>
              <p>{book.genre}</p>
              <p>{book.author.name}</p>
              <p>Other books by same author</p>
              <ul className="other-books">
                {
                  book.author.books.map(book => {
                  return <li>{book.name}</li>
                  })
                }
              </ul>
        </div>
      )
    } else {
        return (<div>No Book selected</div>)
    };
  }
  

  render() {
      return (
      <div id="book-details">
        	<p>{this.displayBookDetails()}</p>
      </div>
    );
  }
}

export default graphql(getBookQuery, {
    options: (props) => {
        return {
            variables: {
                id: props.bookId
            }
        }
    }
})(BookDetails);
