import React from 'react';
import { CSS_TREND, CSS_TREND_TITLE, CSS_TREND_CHECKBOX, CSS_TREND_CHECKED } from '../constants';

import '../styles/trend.scss';

export default function Trend({ title, type, checked, onChange }) {
  return (
    <label className={`${CSS_TREND} ${checked ? CSS_TREND_CHECKED : ''}`}>
      <input
        type="checkbox"
        className={CSS_TREND_CHECKBOX}
        checked={checked}
        onChange={() => onChange({ [type]: !checked })}
      />
      <span className={`${CSS_TREND_TITLE} ${CSS_TREND_TITLE}--${type}`}>{title}</span>
    </label>
  );
}
