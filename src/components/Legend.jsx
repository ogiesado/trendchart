import React from 'react';
import { CSS_LEGEND } from '../constants';
import Trend from './Trend';

export default function Legend({ onChange, fhr, chs, sim }) {
  return (
    <div className={CSS_LEGEND}>
      <Trend title="FHR" type="fhr" checked={fhr} onChange={onChange} />
      <Trend title="Simulated FHR" type="sim" checked={sim} onChange={onChange} />
      <Trend title="CHS" type="chs" checked={chs} onChange={onChange} />
    </div>
  );
}
