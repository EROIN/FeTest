import React, { Component } from "react";
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';

import styles from './NewsArticle.styles.scss';

export class NewsArticle extends Component {
  render() {
    const {data} = this.props;
    return (
      <div className={classNames(styles.wrapper)}>
        <header>
          <img
            className={classNames(styles.image)}
            src={data.urlToImage}/>
        </header>
        <div>
          <h2 className={classNames(styles.title)}>
            {data.title}
          </h2>
          <div className={classNames(styles.details)}>
            Published on: {new Date(data.publishedAt).toUTCString()}, by {data.author}
          </div>
          <div className={classNames(styles.description)}>
            {data.description}
          </div>
          <p className={classNames(styles.content)}>
            {data.content}
          </p>
          <footer>
            <a 
              href={data.url}
              target="_blank"
              className={classNames(styles.link)}>
              Continue Reading...
            </a>
          </footer>
        </div>
      </div>
    );
  }
}

NewsArticle.defaultProps = {
  data: {}
}

NewsArticle.propTypes = {
  data: PropTypes.object.isRequired,
};
