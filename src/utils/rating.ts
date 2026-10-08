import type { RatingDistributionItem, StarValue } from '../types/rating';

const STAR_VALUES: StarValue[] = [5, 4, 3, 2, 1];

/**
 * Ensures all star values 1–5 are present and ordered from 5 down to 1.
 * Missing categories become count 0. Duplicate star entries are summed.
 */
export function normaliseDistribution(
  distribution: RatingDistributionItem[],
): RatingDistributionItem[] {
  const counts = new Map<StarValue, number>();

  for (const item of distribution) {
    const existing = counts.get(item.stars) ?? 0;
    counts.set(item.stars, existing + Math.max(0, item.count));
  }

  return STAR_VALUES.map((stars) => ({
    stars,
    count: counts.get(stars) ?? 0,
  }));
}

export function calculateTotalReviews(
  distribution: RatingDistributionItem[],
): number {
  return distribution.reduce((sum, item) => sum + Math.max(0, item.count), 0);
}

export function calculateAverageRating(
  distribution: RatingDistributionItem[],
): number {
  const total = calculateTotalReviews(distribution);

  if (total === 0) {
    return 0;
  }

  const weightedSum = distribution.reduce(
    (sum, item) => sum + item.stars * Math.max(0, item.count),
    0,
  );

  return weightedSum / total;
}

export function calculateRatingPercentage(
  count: number,
  total: number,
): number {
  if (total <= 0) {
    return 0;
  }

  return (Math.max(0, count) / total) * 100;
}

/** Display rounding for the average rating (e.g. 4.607… → "4.6"). */
export function formatAverageRating(average: number): string {
  return average.toFixed(1);
}

/**
 * Qualitative label derived from the average rating.
 * Bands chosen to match the assessment screenshot (4.6 → EXCELLENT).
 */
export function getRatingLabel(average: number): string {
  if (average >= 4.5) {
    return 'EXCELLENT';
  }
  if (average >= 4.0) {
    return 'GREAT';
  }
  if (average >= 3.0) {
    return 'AVERAGE';
  }
  if (average >= 2.0) {
    return 'POOR';
  }
  if (average > 0) {
    return 'BAD';
  }
  return 'NO RATINGS';
}

/**
 * Fill amount for a star tile at 1-based index (1–5).
 * Example: rating 4.6 → tiles [1, 1, 1, 1, 0.6]
 */
export function getTileFillAmount(rating: number, tileIndex: number): number {
  const amount = clamp(rating - (tileIndex - 1), 0, 1);
  // Avoid binary floating-point artefacts (e.g. 4.6 - 4 → 0.5999…)
  return Math.round(amount * 1000) / 1000;
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}
