import { StarRating } from './StarRating';
import styles from './RatingSummary.module.css';

interface RatingSummaryProps {
  label: string;
  formattedAverage: string;
  average: number;
}

export function RatingSummary({
  label,
  formattedAverage,
  average,
}: RatingSummaryProps) {
  return (
    <div
      className={styles.summary}
      aria-label={`Rated ${formattedAverage} out of 5`}
    >
      <p className={styles.label}>{label}</p>
      <StarRating rating={average} />
      <p className={styles.score}>
        {formattedAverage} OUT OF 5
      </p>
    </div>
  );
}
