import React from 'react';
import {
  CSS_HIGHLIGHT,
  CSS_HIGHLIGHT_SCORE,
  CSS_HIGHLIGHT_DIFFERENCE,
  CSS_HIGHLIGHT_SCORE_WRAPPER
} from '../constants';
import { getTrendIndicatorType } from '../utils';

import '../styles/highlight.scss';

export default function Highlight({ fhr, chs, sim }) {
  return (
    <div className={CSS_HIGHLIGHT}>
      <div className={CSS_HIGHLIGHT_SCORE_WRAPPER}>
        <div className={CSS_HIGHLIGHT_SCORE}>{fhr.score}</div>
        <span
          className={`${CSS_HIGHLIGHT_DIFFERENCE} ${CSS_HIGHLIGHT_DIFFERENCE}--${getTrendIndicatorType(
            fhr.trend
          )}`}
        >
          {Math.abs(fhr.trend)}
        </span>
      </div>
      <div className={CSS_HIGHLIGHT_SCORE_WRAPPER}>
        <div className={CSS_HIGHLIGHT_SCORE}>{sim.score}</div>
        <span
          className={`${CSS_HIGHLIGHT_DIFFERENCE} ${CSS_HIGHLIGHT_DIFFERENCE}--${getTrendIndicatorType(
            sim.trend
          )}`}
        >
          {Math.abs(sim.trend)}
        </span>
      </div>
      <div className={CSS_HIGHLIGHT_SCORE_WRAPPER}>
        <div className={CSS_HIGHLIGHT_SCORE}>{chs.score}</div>
        <span
          className={`${CSS_HIGHLIGHT_DIFFERENCE} ${CSS_HIGHLIGHT_DIFFERENCE}--${getTrendIndicatorType(
            chs.trend
          )}`}
        >
          {Math.abs(chs.trend)}
        </span>
      </div>
    </div>
  );
}
