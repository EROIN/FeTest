import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {bindActionCreators, compose} from 'redux';
import {connect} from 'react-redux';
import classNames from 'classnames/bind';
import {debounce} from 'lodash';

import {moduleActions} from '../../redux/modules';
import {NewsArticle} from '../../components';
import styles from './Home.styles.scss';

class Home extends Component {

  state = {
    query: ''
  }

  changeQuery = (event) => {
    this.setState({
      query: event.target.value
    }, this.callSearchAPI)
  }

  searchNews = () => {
    const {query} = this.state;
    if(!query)
      return;
    const {actions} = this.props;
    actions.searchNews(query);
  }

  callSearchAPI = debounce(this.searchNews, 300);

  componentDidMount () {
    const {actions} = this.props;
    actions.getTopNews();
  }

  addArticles = (feed, index) => 
    <NewsArticle
      data={feed}
      key={`news_article_${index}`}/>

  render () {
    const {news} = this.props;
    const {query} = this.state;
    return (
      <main className={classNames(styles.wrapper)}>
        <section>
          <input value={query} onChange={this.changeQuery}/>
        </section>
        <section>
          <h1 className={classNames(styles.title)}>
            {
              query.length ===0 ?
              (
                <span>
                  Showing Top News
                  {news.data.length === 0 ? ' (API sending no articles)' : ''}
                </span>
              ) : `Search for ${query}`
            }
          </h1>
        </section>
        {news.data.map(this.addArticles)}
      </main>
    );
  }
}

Home.propTypes = {
  actions: PropTypes.object.isRequired,
  news: PropTypes.object.isRequired
};

const mapStateToProps = ({news}) => {
  return {
    news
  };
};

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(moduleActions, dispatch)
});

export const HomeContainer = compose(
  connect(mapStateToProps, mapDispatchToProps)
)(Home);

