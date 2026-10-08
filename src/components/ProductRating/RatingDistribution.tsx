import type { RatingDistributionItem } from '../../types/rating';
import { calculateRatingPercentage } from '../../utils/rating';
import { RatingDistributionRow } from './RatingDistributionRow';
import styles from './RatingDistribution.module.css';

interface RatingDistributionProps {
  distribution: RatingDistributionItem[];
  totalReviews: number;
}

export function RatingDistribution({
  distribution,
  totalReviews,
}: RatingDistributionProps) {
  return (
    <ul className={styles.list}>
      {distribution.map((item) => (
        <RatingDistributionRow
          key={item.stars}
          stars={item.stars}
          count={item.count}
          percentage={calculateRatingPercentage(item.count, totalReviews)}
        />
      ))}
    </ul>
  );
}
