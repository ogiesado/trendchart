import {
  FIRST_QUARTER,
  SECOND_QUARTER,
  THIRD_QUARTER,
  YEAR_END,
  CHART_TITLE,
  TREND_UP,
  TREND_DOWN,
  TREND_SAME
} from './constants';
import result from './data/result.json';

/**
 * Gets the trend data and simulates an async request being made with setTimeout
 * @return {Promise}
 */
export function getTrendData() {
  return new Promise(resolve => {
    setTimeout(() => resolve(result.results.periods), 1000);
  });
}

/**
 * The periods data
 * @param {Array} periods The periods as an array
 * @return {Object} The trend data { labels: array, ratings: array }
 */
export function transformTrendData(periods = []) {
  const formattedPeriods = formatPeriods(periods);
  const yearLabels = getYearRatingLabels(formattedPeriods);
  const description = getDescription(
    formattedPeriods[0],
    formattedPeriods[formattedPeriods.length - 1]
  );

  return {
    yearLabels,
    description,
    ratings: formattedPeriods,
    title: CHART_TITLE
  };
}

/**
 * Converts the periods to the desired format including trends
 * @param {Array<Object>} periods
 * @return {Array<Object>}
 */
export function formatPeriods(periods = []) {
  return periods.reduce((formattedPeriods, { period, year, chs, fhr, sim }, index) => {
    const trendChs = index === 0 ? 0 : chs - formattedPeriods[index - 1].chs.score;
    const trendFhr = index === 0 ? 0 : fhr - formattedPeriods[index - 1].fhr.score;
    const trendSim = index === 0 ? 0 : sim - formattedPeriods[index - 1].sim.score;

    formattedPeriods.push({
      period,
      year: Number(year),
      chs: { score: Number(chs), trend: trendChs },
      fhr: { score: Number(fhr), trend: trendFhr },
      sim: { score: Number(sim), trend: trendSim }
    });

    return formattedPeriods;
  }, []);
}

/**
 * Gets the title decription for the data
 * @param {Object} firstPeriod The first period in the data
 * @param {Object} lastPeriod The last period in the data
 * @return {String}
 */
export function getDescription(firstPeriod, lastPeriod) {
  const correspondingLastPeriods = {
    [FIRST_QUARTER]: YEAR_END,
    [SECOND_QUARTER]: FIRST_QUARTER,
    [THIRD_QUARTER]: SECOND_QUARTER,
    [YEAR_END]: THIRD_QUARTER
  };

  const lastRatingPeriod = correspondingLastPeriods[firstPeriod.period];
  const lastRatingYear =
    firstPeriod.period === FIRST_QUARTER ? firstPeriod.year - 1 : firstPeriod.year;

  return `fiscal ${lastRatingPeriod} ${lastRatingYear} to ${lastPeriod.period} ${lastPeriod.year}`;
}

/**
 * Get the labels for the yearly ratings
 * @param {Array<Object>} periods
 * @return {Array<String>}
 */
export function getYearRatingLabels(periods = []) {
  const labels = [];

  for (let i = 0; i < periods.length; i++) {
    if (i === periods.length - 1 || periods[i].year !== periods[i + 1].year) {
      labels.push(`${periods[i].period} ${periods[i].year}`);
    }
  }

  return labels;
}

/**
 * Returns the trend indicator type for the trend
 * @param {Number} trend
 * @return {String}
 */
export function getTrendIndicatorType(trend) {
  if (trend < 0) {
    return TREND_DOWN;
  }

  if (trend > 0) {
    return TREND_UP;
  }

  return TREND_SAME;
}
