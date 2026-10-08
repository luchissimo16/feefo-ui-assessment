import { describe, expect, it } from 'vitest';
import type { RatingDistributionItem } from '../types/rating';
import { productRating } from '../data/productRating';
import {
  calculateAverageRating,
  calculateRatingPercentage,
  calculateTotalReviews,
  formatAverageRating,
  getRatingLabel,
  getTileFillAmount,
  normaliseDistribution,
} from './rating';

const sample = productRating.distribution;

describe('calculateTotalReviews', () => {
  it('sums the supplied distribution counts', () => {
    expect(calculateTotalReviews(sample)).toBe(1232);
  });

  it('returns 0 for an empty distribution', () => {
    expect(calculateTotalReviews([])).toBe(0);
  });

  it('returns 0 when all counts are zero', () => {
    const zeros: RatingDistributionItem[] = [
      { stars: 5, count: 0 },
      { stars: 4, count: 0 },
      { stars: 3, count: 0 },
      { stars: 2, count: 0 },
      { stars: 1, count: 0 },
    ];
    expect(calculateTotalReviews(zeros)).toBe(0);
  });
});

describe('calculateAverageRating', () => {
  it('computes the weighted average for the sample data', () => {
    const average = calculateAverageRating(sample);
    // (5*952 + 4*171 + 3*55 + 2*14 + 1*40) / 1232 = 5677 / 1232 ≈ 4.608
    expect(average).toBeCloseTo(5677 / 1232, 10);
  });

  it('rounds to 4.6 for display', () => {
    expect(formatAverageRating(calculateAverageRating(sample))).toBe('4.6');
  });

  it('returns 0 when there are no reviews', () => {
    expect(calculateAverageRating([])).toBe(0);
    expect(
      calculateAverageRating([
        { stars: 5, count: 0 },
        { stars: 1, count: 0 },
      ]),
    ).toBe(0);
  });
});

describe('calculateRatingPercentage', () => {
  it('calculates percentages from the sample totals', () => {
    const total = 1232;
    expect(calculateRatingPercentage(952, total)).toBeCloseTo(77.2727, 3);
    expect(calculateRatingPercentage(171, total)).toBeCloseTo(13.8799, 3);
    expect(calculateRatingPercentage(55, total)).toBeCloseTo(4.4643, 3);
    expect(calculateRatingPercentage(14, total)).toBeCloseTo(1.1364, 3);
    expect(calculateRatingPercentage(40, total)).toBeCloseTo(3.2468, 3);
  });

  it('returns 0 when total is 0', () => {
    expect(calculateRatingPercentage(10, 0)).toBe(0);
  });
});

describe('formatAverageRating', () => {
  it('formats to one decimal place intentionally', () => {
    expect(formatAverageRating(4.607142857)).toBe('4.6');
    expect(formatAverageRating(5)).toBe('5.0');
    expect(formatAverageRating(0)).toBe('0.0');
  });
});

describe('getRatingLabel', () => {
  it('returns EXCELLENT for the sample average', () => {
    expect(getRatingLabel(4.6)).toBe('EXCELLENT');
  });

  it('maps other bands', () => {
    expect(getRatingLabel(4.2)).toBe('GREAT');
    expect(getRatingLabel(3.5)).toBe('AVERAGE');
    expect(getRatingLabel(2.1)).toBe('POOR');
    expect(getRatingLabel(1.0)).toBe('BAD');
    expect(getRatingLabel(0)).toBe('NO RATINGS');
  });
});

describe('normaliseDistribution', () => {
  it('orders from 5 stars down to 1', () => {
    const unordered: RatingDistributionItem[] = [
      { stars: 1, count: 40 },
      { stars: 5, count: 952 },
      { stars: 3, count: 55 },
      { stars: 2, count: 14 },
      { stars: 4, count: 171 },
    ];

    expect(normaliseDistribution(unordered).map((item) => item.stars)).toEqual([
      5, 4, 3, 2, 1,
    ]);
  });

  it('fills missing star categories with count 0', () => {
    const partial: RatingDistributionItem[] = [
      { stars: 5, count: 10 },
      { stars: 1, count: 2 },
    ];

    expect(normaliseDistribution(partial)).toEqual([
      { stars: 5, count: 10 },
      { stars: 4, count: 0 },
      { stars: 3, count: 0 },
      { stars: 2, count: 0 },
      { stars: 1, count: 2 },
    ]);
  });

  it('sums duplicate star entries', () => {
    const duplicates: RatingDistributionItem[] = [
      { stars: 5, count: 100 },
      { stars: 5, count: 50 },
    ];

    expect(normaliseDistribution(duplicates)[0]).toEqual({
      stars: 5,
      count: 150,
    });
  });
});

describe('getTileFillAmount', () => {
  it('represents a fractional rating of 4.6 across five tiles', () => {
    expect(getTileFillAmount(4.6, 1)).toBe(1);
    expect(getTileFillAmount(4.6, 2)).toBe(1);
    expect(getTileFillAmount(4.6, 3)).toBe(1);
    expect(getTileFillAmount(4.6, 4)).toBe(1);
    expect(getTileFillAmount(4.6, 5)).toBeCloseTo(0.6);
  });

  it('clamps fully empty and fully filled ratings', () => {
    expect(getTileFillAmount(0, 1)).toBe(0);
    expect(getTileFillAmount(5, 5)).toBe(1);
    expect(getTileFillAmount(5, 1)).toBe(1);
  });
});
