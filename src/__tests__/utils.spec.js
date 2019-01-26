import { getTrendData, transformTrendData, getTrendIndicatorType } from '../utils';
import { CHART_TITLE, TREND_DOWN, TREND_UP, TREND_SAME } from '../constants';
import result from '../data/result.json';

describe('utils', () => {
  describe('getTrendData', () => {
    test('gets trend data for chart', () => {
      // Given
      const periods = result.results.periods;

      // When
      const promise = getTrendData();

      // Then
      return expect(promise).resolves.toEqual(periods);
    });
  });

  describe('transformTrendData', () => {
    test('transforms trend data to desired format', () => {
      // Given
      const periodOne = {
        year: '2011',
        date: '2011-06-30',
        fhr: '86',
        chs: '26',
        sim: '44',
        period: 'Q1'
      };
      const periodTwo = {
        year: '2011',
        date: '2011-06-30',
        fhr: '46',
        chs: '76',
        sim: '35',
        period: 'Q2'
      };
      const periods = [periodOne, periodTwo];

      // When
      const { description, ratings, yearLabels, title } = transformTrendData(periods);

      // Then
      expect(description).toEqual('fiscal YE 2010 to Q2 2011');

      expect(ratings.length).toEqual(2);
      expect(ratings[0].chs.score).toEqual(Number(periodOne.chs));
      expect(ratings[0].fhr.score).toEqual(Number(periodOne.fhr));
      expect(ratings[0].sim.score).toEqual(Number(periodOne.sim));
      expect(ratings[0].chs.trend).toEqual(0);
      expect(ratings[0].fhr.trend).toEqual(0);
      expect(ratings[0].sim.trend).toEqual(0);
      expect(ratings[1].chs.score).toEqual(Number(periodTwo.chs));
      expect(ratings[1].fhr.score).toEqual(Number(periodTwo.fhr));
      expect(ratings[1].sim.score).toEqual(Number(periodTwo.sim));
      expect(ratings[1].chs.trend).toEqual(Number(periodTwo.chs) - Number(periodOne.chs));
      expect(ratings[1].fhr.trend).toEqual(Number(periodTwo.fhr) - Number(periodOne.fhr));
      expect(ratings[1].sim.trend).toEqual(Number(periodTwo.sim) - Number(periodOne.sim));

      expect(yearLabels).toEqual(['Q2 2011']);
      expect(title).toEqual(CHART_TITLE);
    });
  });

  describe('getTrendIndicatorType', () => {
    test('gets the trend indicator type for the trend', () => {
      // Given
      const trendOne = -5;
      const trendTwo = 0;
      const trendThree = 3;

      // When
      const trendIndicatorOne = getTrendIndicatorType(trendOne);
      const trendIndicatorTwo = getTrendIndicatorType(trendTwo);
      const trendIndicatorThree = getTrendIndicatorType(trendThree);

      // Then
      expect(trendIndicatorOne).toEqual(TREND_DOWN);
      expect(trendIndicatorTwo).toEqual(TREND_SAME);
      expect(trendIndicatorThree).toEqual(TREND_UP);
    });
  });
});
