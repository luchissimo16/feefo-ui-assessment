import type { StarValue } from '../../types/rating';
import { StarIcon } from './StarIcon';
import styles from './RatingDistributionRow.module.css';

interface RatingDistributionRowProps {
  stars: StarValue;
  count: number;
  percentage: number;
}

export function RatingDistributionRow({
  stars,
  count,
  percentage,
}: RatingDistributionRowProps) {
  const starLabel = stars === 1 ? 'star' : 'stars';
  const percentageLabel = percentage.toFixed(1);

  return (
    <li className={styles.row}>
      <span className={styles.visuallyHidden}>
        {stars} {starLabel}: {count} reviews ({percentageLabel} percent)
      </span>
      <span className={styles.label} aria-hidden="true">
        <span className={styles.number}>{stars}</span>
        <StarIcon className={styles.star} />
      </span>
      <div className={styles.track} aria-hidden="true">
        <div
          className={styles.fill}
          style={{ width: `${percentage}%` }}
          data-testid={`distribution-fill-${stars}`}
        />
      </div>
      <span className={styles.count} aria-hidden="true">
        {count}
      </span>
    </li>
  );
}
