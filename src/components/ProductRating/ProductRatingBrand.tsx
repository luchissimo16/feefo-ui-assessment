import styles from './ProductRatingBrand.module.css';

interface ProductRatingBrandProps {
  title: string;
}

export function ProductRatingBrand({ title }: ProductRatingBrandProps) {
  return (
    <div className={styles.brand}>
      <span className={styles.title}>{title}</span>
      <span className={styles.wordmark} aria-label="Feefo">
        <span className={styles.feefoText}>feefo</span>
        <svg
          className={styles.mark}
          viewBox="0 0 20 20"
          aria-hidden="true"
          focusable="false"
        >
          <circle cx="10" cy="10" r="10" fill="currentColor" />
          <ellipse cx="7" cy="10" rx="2.35" ry="3.4" fill="#ffffff" />
          <ellipse cx="13" cy="10" rx="2.35" ry="3.4" fill="#ffffff" />
        </svg>
      </span>
    </div>
  );
}
