import { getTileFillAmount } from '../../utils/rating';
import { StarIcon } from './StarIcon';
import styles from './StarRating.module.css';

interface StarRatingProps {
  rating: number;
}

export function StarRating({ rating }: StarRatingProps) {
  return (
    <div className={styles.row} aria-hidden="true">
      {[1, 2, 3, 4, 5].map((tileIndex) => {
        const fillAmount = getTileFillAmount(rating, tileIndex);

        return (
          <div key={tileIndex} className={styles.tile}>
            <div
              className={styles.fill}
              style={{ width: `${fillAmount * 100}%` }}
              data-testid={`star-tile-fill-${tileIndex}`}
              data-fill={fillAmount}
            />
            <StarIcon className={styles.star} />
          </div>
        );
      })}
    </div>
  );
}
