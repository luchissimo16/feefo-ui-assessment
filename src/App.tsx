import { ProductRatingCard } from './components/ProductRating/ProductRatingCard';
import { productRating } from './data/productRating';
import styles from './App.module.css';

function App() {
  return (
    <main className={styles.page}>
      <ProductRatingCard data={productRating} />
    </main>
  );
}

export default App;
