import React, { Component, Fragment } from 'react';
import {
  CSS_CHART,
  CSS_CHART_TITLE,
  CSS_CHART_SUB_TITLE,
  CSS_CHART_INFO,
  CSS_CHART_LOADING,
  CSS_CHART_LOADING_INDICATOR
} from '../constants';
import Legend from './Legend';
import Highlight from './Highlight';
import Plot from './Plot';
import { transformTrendData } from '../utils';

import '../styles/chart.scss';

export default class Chart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
      description: '',
      ratings: [],
      yearLabels: [],
      loading: false,
      error: '',
      highlightedRatingIndex: -1,
      legend: {
        fhr: true,
        sim: false,
        chs: false
      }
    };
  }

  componentDidMount() {
    this.showLoading()
      .then(this.fetchData)
      .then(this.hideLoading)
      .catch(this.showError);
  }

  /**
   * Overrides parent setState to use a Promise interface
   * @param {Object} state
   * @return {Promise}
   */
  setState = state => new Promise(resolve => super.setState(state, resolve));

  /**
   * Sets loading state to active
   * @return {Promise}
   */
  showLoading = () => this.setState({ loading: true });

  /**
   * Sets loading state to inactive
   * @return {Promise}
   */
  hideLoading = () => this.setState({ loading: false });

  /**
   * Fetch the data for the chart
   * @return {Promise}
   */
  fetchData = () =>
    this.props
      .getTrendData()
      .then(transformTrendData)
      .then(this.setData);

  /**
   * Sets the chart data state
   * @return {Promise}
   */
  setData = ({ title, description, yearLabels, ratings }) =>
    this.setState({ title, description, yearLabels, ratings });

  /**
   * Handles the legend checkbox change
   * @param {Object} legendChange The legend type change
   * @return {Promise}
   */
  handleLegendChange = legendChange =>
    this.setState({ legend: { ...this.state.legend, ...legendChange } });

  /**
   * Handles the point hover
   * @param {Number} index The rating period index
   * @return {Promise}
   */
  handlePointHover = index => {
    const highlightedRatingIndex = this.isValidRatingIndex(index) ? index : -1;
    return this.setState({ highlightedRatingIndex });
  };

  /**
   * Checks if it is a valid rating index
   * @param {Number} index
   * @return {Boolean}
   */
  isValidRatingIndex(index) {
    return index > -1 && index < this.state.ratings.length;
  }

  /**
   * Checks if there are ratings
   * @return {Boolean}
   */
  hasRatings() {
    return this.state.ratings.length > 0;
  }

  /**
   * Handles the mouseout on the plot area
   * @return {Promise}
   */
  handlePlotMouseLeave = index => {
    return this.setState({ highlightedRatingIndex: -1 });
  };

  /**
   * Renders the selected highlight
   * @return {ReactElement}
   */
  renderHighlights() {
    const { highlightedRatingIndex, ratings } = this.state;

    return this.isValidRatingIndex(highlightedRatingIndex) ? (
      <Highlight {...ratings[highlightedRatingIndex]} />
    ) : null;
  }

  /**
   * Renders the legend
   * @return {ReactElement}
   */
  renderLegend() {
    return <Legend {...this.state.legend} onChange={this.handleLegendChange} />;
  }

  /**
   * Renders the plot
   * @return {ReactElement}
   */
  renderPlot() {
    const { yearLabels, ratings, legend, highlightedRatingIndex } = this.state;

    return (
      <Plot
        onPointOver={this.handlePointHover}
        onMouseLeave={this.handlePlotMouseLeave}
        labels={yearLabels}
        ratings={ratings}
        highlightedRatingIndex={highlightedRatingIndex}
        {...legend}
      />
    );
  }

  /**
   * Renders the chart
   * @return {ReactElement}
   */
  renderChart() {
    const { title, description } = this.state;

    return (
      <Fragment>
        <h1 className={CSS_CHART_TITLE}>{title}</h1>
        <h2 className={CSS_CHART_SUB_TITLE}>{description}</h2>
        {this.renderPlot()}
        <div className={CSS_CHART_INFO}>
          {this.renderLegend()}
          {this.renderHighlights()}
        </div>
      </Fragment>
    );
  }

  /**
   * Renders the loading indicator
   * @return {ReactElement}
   */
  renderLoadingIndicator() {
    return (
      <div className={CSS_CHART_LOADING}>
        <div className={CSS_CHART_LOADING_INDICATOR} />
      </div>
    );
  }

  /**
   * Renders error view
   * @return {ReactElement}
   */
  renderError() {
    return <div>{this.state.error}</div>;
  }

  render() {
    const { loading, error } = this.state;
    const shouldRenderChart = !error && !loading && this.hasRatings();
    const hasError = error && !loading;

    return (
      <div className={CSS_CHART}>
        {loading && this.renderLoadingIndicator()}
        {hasError && this.renderError()}
        {shouldRenderChart && this.renderChart()}
      </div>
    );
  }
}
