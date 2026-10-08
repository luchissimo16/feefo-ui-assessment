import type { ProductRatingCardProps } from '../../types/rating';
import {
  calculateAverageRating,
  calculateTotalReviews,
  formatAverageRating,
  getRatingLabel,
  normaliseDistribution,
} from '../../utils/rating';
import { ProductRatingBrand } from './ProductRatingBrand';
import { RatingDistribution } from './RatingDistribution';
import { RatingSummary } from './RatingSummary';
import styles from './ProductRatingCard.module.css';

export function ProductRatingCard({ data }: ProductRatingCardProps) {
  const distribution = normaliseDistribution(data.distribution);
  const totalReviews = calculateTotalReviews(distribution);
  const average = calculateAverageRating(distribution);
  const formattedAverage = formatAverageRating(average);
  // Star tiles follow the displayed one-decimal rating so visuals match the text.
  const displayAverage = Number(formattedAverage);
  const label = getRatingLabel(displayAverage);
  const headingId = 'product-rating-heading';

  return (
    <article className={styles.card} aria-labelledby={headingId}>
      <h2 id={headingId} className={styles.visuallyHidden}>
        {data.title}
      </h2>
      <RatingSummary
        label={label}
        formattedAverage={formattedAverage}
        average={displayAverage}
      />
      <ProductRatingBrand title={data.title} />
      <RatingDistribution
        distribution={distribution}
        totalReviews={totalReviews}
      />
    </article>
  );
}
