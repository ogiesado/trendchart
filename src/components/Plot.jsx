import React, { Component, Fragment } from 'react';
import {
  RATING_TYPE_FHR,
  RATING_TYPE_CHS,
  RATING_TYPE_SIM,
  PLOT_X_ORIGIN,
  PLOT_Y_ORIGIN,
  PLOT_HEIGHT,
  PLOT_Y_AXIS_WIDTH,
  PLOT_RATING_RANGE_HEIGHT,
  PLOT_RATING_RANGE_BORDER_WIDTH,
  PLOT_BORDER_WIDTH,
  PLOT_PERIOD_WIDTH,
  PLOT_COLUMN_WIDTH,
  VERY_LOW_RISK_COLOUR,
  LOW_RISK_COLOUR,
  MEDIUM_RISK_COLOUR,
  HIGH_RISK_COLOUR,
  VERY_HIGH_RISK_COLOUR,
  PRIMARY_BG_COLOUR,
  PLOT_BORDER_COLOUR,
  PLOT_LINE_COLOUR
} from '../constants';

export default class Plot extends Component {
  static defaultProps = {
    labels: []
  };

  /**
   * Renders the yAxis rating scale
   * @return {ReactElement}
   */
  renderYAxis() {
    return (
      <Fragment>
        {this.renderYAxisRange(0, VERY_LOW_RISK_COLOUR)}
        {this.renderYAxisRangeLabel(0, '100')}

        {this.renderYAxisRange(1, LOW_RISK_COLOUR)}
        {this.renderYAxisRangeLabel(1, '80', 7)}

        {this.renderYAxisRange(2, MEDIUM_RISK_COLOUR)}
        {this.renderYAxisRangeLabel(2, '60', 7)}

        {this.renderYAxisRange(3, HIGH_RISK_COLOUR)}
        {this.renderYAxisRangeLabel(3, '40', 7)}

        {this.renderYAxisRange(4, VERY_HIGH_RISK_COLOUR)}
        {this.renderYAxisRangeLabel(4, '20', 7)}
        {this.renderYAxisRangeLabel(5, '0', 14)}
      </Fragment>
    );
  }

  /**
   * Renders a y-xis range
   * @param {Number} position The position of the range starting at zero and counting from top to bottom
   * @param {String} colour The colour for the range
   * @param {ReactElement}
   */
  renderYAxisRange(position, colour) {
    return (
      <rect
        style={{ fill: colour }}
        x={PLOT_X_ORIGIN + PLOT_Y_AXIS_WIDTH}
        y={PLOT_RATING_RANGE_HEIGHT * position}
        width={PLOT_RATING_RANGE_BORDER_WIDTH}
        height={PLOT_RATING_RANGE_HEIGHT}
      />
    );
  }

  /**
   * Renders a y-xis range label
   * @param {Number} position The position of the range starting at zero and counting from top to bottom
   * @param {String} label The range label
   * @param {Number} xMargin A margin to be added to left offset
   * @param {ReactElement}
   */
  renderYAxisRangeLabel(position, label, xMargin = 0) {
    return (
      <text x={PLOT_X_ORIGIN + xMargin} y={PLOT_RATING_RANGE_HEIGHT * position + 10}>
        {label}
      </text>
    );
  }

  /**
   * Renders the x-axis
   * @return {Array<ReactElement>}
   */
  renderXAxis() {
    return (
      <Fragment>
        {this.props.labels.map(this.renderColumnCells)}
        {this.props.labels.map(this.renderYearPeriodColumns)}
        {this.props.labels.map(this.renderColumnCellBottomLines)}
        {this.props.labels.map(this.renderYearColumnsLabels)}
      </Fragment>
    );
  }

  /**
   * Renders the year column cells for the x-axis
   * @param {String} label The label for the year column x-axis
   * @param {Number} index The year index
   * @return {ReactElement}
   */
  renderColumnCells = (label, index) => {
    return (
      <Fragment>
        {this.renderColumnCell(index, 0)}
        {this.renderColumnCell(index, 1)}
        {this.renderColumnCell(index, 2)}
        {this.renderColumnCell(index, 3)}
        {this.renderColumnCell(index, 4)}
      </Fragment>
    );
  };

  /**
   * Renders the year period columns for the x-axis
   * @param {String} label The label for the year column x-axis
   * @param {Number} index The year index
   * @return {ReactElement}
   */
  renderYearPeriodColumns = (label, index) => {
    return (
      <Fragment>
        {this.renderYearPeriodColumn(index, 0)}
        {this.renderYearPeriodColumn(index, 1)}
        {this.renderYearPeriodColumn(index, 2)}
        {this.renderYearPeriodColumn(index, 3)}
      </Fragment>
    );
  };

  /**
   * Renders the year column cells bottom lines for the x-axis
   * @param {String} label The label for the year column x-axis
   * @param {Number} index The year index
   * @return {ReactElement}
   */
  renderColumnCellBottomLines = (label, index) => {
    return (
      <Fragment>
        {this.renderColumnCellBottomLine(index, 1, VERY_LOW_RISK_COLOUR)}
        {this.renderColumnCellBottomLine(index, 2, LOW_RISK_COLOUR)}
        {this.renderColumnCellBottomLine(index, 3, MEDIUM_RISK_COLOUR)}
        {this.renderColumnCellBottomLine(index, 4, HIGH_RISK_COLOUR)}
        {this.renderColumnCellBottomLine(index, 5, VERY_HIGH_RISK_COLOUR)}
      </Fragment>
    );
  };

  /**
   * Renders the year columns labels for the x-axis
   * @param {String} label The label for the year column x-axis
   * @param {Number} index The year index
   * @return {ReactElement}
   */
  renderYearColumnsLabels = (label, index) => {
    const X_OFFSET = this.getYAxisWidth() + index * PLOT_COLUMN_WIDTH;

    return (
      <Fragment>
        <line
          x1={X_OFFSET + PLOT_COLUMN_WIDTH}
          y1={PLOT_Y_ORIGIN}
          x2={X_OFFSET + PLOT_COLUMN_WIDTH}
          y2={PLOT_HEIGHT - 24}
          style={{ stroke: PLOT_BORDER_COLOUR, strokeWidth: PLOT_BORDER_WIDTH }}
        />
        <text x={X_OFFSET + PLOT_COLUMN_WIDTH - 50} y={PLOT_RATING_RANGE_HEIGHT * 5 + 15}>
          {label}
        </text>
      </Fragment>
    );
  };

  /**
   * Renders an x-xis column cell
   * @param {Number} index The zero-based index number of the column
   * @param {Number} position The position of the cell counting from top to bottom
   * @param {ReactElement}
   */
  renderColumnCell(index, position) {
    const X_OFFSET = this.getYAxisWidth() + index * PLOT_COLUMN_WIDTH;

    return (
      <rect
        style={{ fill: PRIMARY_BG_COLOUR }}
        x={X_OFFSET}
        y={PLOT_RATING_RANGE_HEIGHT * position}
        width={PLOT_COLUMN_WIDTH}
        height={PLOT_RATING_RANGE_HEIGHT}
      />
    );
  }

  /**
   * Renders an x-xis column cell bottom border line
   * @param {Number} index The zero-based index number of the year column
   * @param {Number} position The position of the period in the year column
   * @param {ReactElement}
   */
  renderYearPeriodColumn(index, position) {
    const X_OFFSET = this.getYAxisWidth() + index * PLOT_COLUMN_WIDTH;
    const COLUMN_OFFSET = position * PLOT_PERIOD_WIDTH + PLOT_PERIOD_WIDTH - PLOT_PERIOD_WIDTH / 8;
    const ratingIndex = index * 4 + position;
    const opacity = ratingIndex === this.props.highlightedRatingIndex ? 1 : 0;

    return (
      <Fragment>
        <rect
          style={{ fill: '#fff', opacity }}
          x={X_OFFSET + COLUMN_OFFSET}
          y={PLOT_Y_ORIGIN}
          width={PLOT_PERIOD_WIDTH / 4}
          height={PLOT_RATING_RANGE_HEIGHT * 5}
          onMouseOver={() => this.props.onPointOver(ratingIndex)}
        />
      </Fragment>
    );
  }

  /**
   * Renders an x-xis column cell bottom border line
   * @param {Number} index The zero-based index number of the column
   * @param {Number} position The position of the cell counting from top to bottom
   * @param {String} colour The color of the line
   * @param {ReactElement}
   */
  renderColumnCellBottomLine(index, position, colour) {
    const X_OFFSET = this.getYAxisWidth() + index * PLOT_COLUMN_WIDTH;

    return (
      <line
        x1={X_OFFSET}
        y1={PLOT_RATING_RANGE_HEIGHT * position - 0.5}
        x2={X_OFFSET + PLOT_COLUMN_WIDTH}
        y2={PLOT_RATING_RANGE_HEIGHT * position - 0.5}
        style={{
          stroke: colour,
          strokeWidth: PLOT_BORDER_WIDTH
        }}
      />
    );
  }

  /**
   * Renders the CHS plot line
   * @return {ReactElement}
   */
  renderChsLine() {
    return this.renderPlotLine(RATING_TYPE_CHS, this.getChsScores());
  }

  /**
   * Renders the FHR plot line
   * @return {ReactElement}
   */
  renderFhrLine() {
    return this.renderPlotLine(RATING_TYPE_FHR, this.getFhrScores());
  }

  /**
   * Renders the SIM plot line
   * @return {ReactElement}
   */
  renderSimLine() {
    return this.renderPlotLine(RATING_TYPE_SIM, this.getSimScores());
  }

  /**
   * Rendersa plot line
   * @param {String} type The line type
   * @param {Array} scores The scores for the line
   * @return {ReactElement}
   */
  renderPlotLine(type, scores = []) {
    const X_OFFSET = this.getYAxisWidth();
    const lineStyle = this.getLineStyle(type);
    const pointCircles = [];
    const points = [`${X_OFFSET},${this.calculateScalePercentage(scores[0])} `];

    for (let i = 0; i < scores.length; i++) {
      const x = (i + 1) * PLOT_PERIOD_WIDTH + X_OFFSET;
      const y = this.calculateScalePercentage(scores[i]);

      points.push(`${x},${y} `);
      pointCircles.push(<circle key={i} cx={x} cy={y} r="2" style={{ fill: PLOT_LINE_COLOUR }} />);
    }

    return (
      <Fragment>
        <polyline points={points.join(' ')} style={lineStyle} />
        {pointCircles}
      </Fragment>
    );
  }

  /**
   * Gets the scores for the CHS ratings
   * @return {Array<Number>}
   */
  getChsScores() {
    return this.props.ratings.map(({ chs: { score } }) => score);
  }

  /**
   * Gets the scores for the FHR ratings
   * @return {Array<Number>}
   */
  getFhrScores() {
    return this.props.ratings.map(({ fhr: { score } }) => score);
  }

  /**
   * Gets the scores for the SIM ratings
   * @return {Array<Number>}
   */
  getSimScores() {
    return this.props.ratings.map(({ sim: { score } }) => score);
  }

  /**
   * Gets the width of the x-axis. Used mostly to calculate the left offset
   * @return {Number}
   */
  getYAxisWidth() {
    return PLOT_Y_AXIS_WIDTH + PLOT_RATING_RANGE_BORDER_WIDTH;
  }

  /**
   * Gets the total width of the plot
   * @return {Number}
   */
  getPlotWidth() {
    return this.getYAxisWidth() + this.props.labels.length * PLOT_COLUMN_WIDTH;
  }

  /**
   * Get the style object for rating types
   * @return {Object}
   */
  getLineStyle(type) {
    const defaultStyle = {
      fill: 'none',
      stroke: PLOT_LINE_COLOUR,
      strokeWidth: PLOT_BORDER_WIDTH
    };
    const styles = {
      [RATING_TYPE_CHS]: {
        ...defaultStyle,
        strokeDasharray: '1 3'
      },
      [RATING_TYPE_FHR]: {
        ...defaultStyle
      },
      [RATING_TYPE_SIM]: {
        ...defaultStyle,
        strokeDasharray: '5 3'
      }
    };

    return styles[type];
  }

  /**
   * Calculate the percentage for the rating
   * @param {Number} rating The rating score
   * @return {Number}
   */
  calculateScalePercentage(rating) {
    const scale = PLOT_RATING_RANGE_HEIGHT * 5;
    return scale - (rating * scale) / 100;
  }

  render() {
    const {
      onMouseLeave,
      sim: shouldRenderSimLine,
      fhr: shouldRenderFhrLine,
      chs: shouldRenderChsLine
    } = this.props;

    return (
      <svg
        height={PLOT_HEIGHT}
        width={this.getPlotWidth()}
        style={{ fontSize: '12px' }}
        xmlns="http://www.w3.org/2000/svg"
        onMouseLeave={onMouseLeave}
      >
        {this.renderYAxis()}
        {this.renderXAxis()}
        {shouldRenderChsLine && this.renderChsLine()}
        {shouldRenderFhrLine && this.renderFhrLine()}
        {shouldRenderSimLine && this.renderSimLine()}
      </svg>
    );
  }
}
