import { render, screen, within } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import type { ProductRatingData } from '../../types/rating';
import { productRating } from '../../data/productRating';
import { ProductRatingCard } from './ProductRatingCard';

describe('ProductRatingCard', () => {
  it('renders the EXCELLENT heading for the sample data', () => {
    render(<ProductRatingCard data={productRating} />);
    expect(screen.getByText('EXCELLENT')).toBeInTheDocument();
  });

  it('renders the calculated average as 4.6 OUT OF 5', () => {
    render(<ProductRatingCard data={productRating} />);
    expect(screen.getByText('4.6 OUT OF 5')).toBeInTheDocument();
  });

  it('renders all five distribution rows with the correct counts', () => {
    render(<ProductRatingCard data={productRating} />);

    const list = screen.getByRole('list');
    const rows = within(list).getAllByRole('listitem');

    expect(rows).toHaveLength(5);
    expect(screen.getByText('952')).toBeInTheDocument();
    expect(screen.getByText('171')).toBeInTheDocument();
    expect(screen.getByText('55')).toBeInTheDocument();
    expect(screen.getByText('14')).toBeInTheDocument();
    expect(screen.getByText('40')).toBeInTheDocument();
  });

  it('exposes accessible rating information', () => {
    render(<ProductRatingCard data={productRating} />);

    expect(
      screen.getByLabelText('Rated 4.6 out of 5'),
    ).toBeInTheDocument();
    expect(
      screen.getByText('5 stars: 952 reviews (77.3 percent)'),
    ).toBeInTheDocument();
  });

  it('represents fractional fill on the fifth star tile', () => {
    render(<ProductRatingCard data={productRating} />);

    const fifthFill = screen.getByTestId('star-tile-fill-5');
    expect(fifthFill).toHaveAttribute('data-fill', '0.6');
    expect(fifthFill).toHaveStyle({ width: '60%' });

    const firstFill = screen.getByTestId('star-tile-fill-1');
    expect(firstFill).toHaveAttribute('data-fill', '1');
    expect(firstFill).toHaveStyle({ width: '100%' });
  });

  it('sizes distribution bars from calculated percentages', () => {
    render(<ProductRatingCard data={productRating} />);

    expect(screen.getByTestId('distribution-fill-5')).toHaveStyle({
      width: `${(952 / 1232) * 100}%`,
    });
    expect(screen.getByTestId('distribution-fill-2')).toHaveStyle({
      width: `${(14 / 1232) * 100}%`,
    });
  });

  it('renders from props rather than hard-coded sample values', () => {
    const alternate: ProductRatingData = {
      title: 'Service Rating',
      distribution: [
        { stars: 5, count: 2 },
        { stars: 4, count: 0 },
        { stars: 3, count: 0 },
        { stars: 2, count: 0 },
        { stars: 1, count: 2 },
      ],
    };

    render(<ProductRatingCard data={alternate} />);

    expect(
      screen.getByRole('heading', { name: 'Service Rating' }),
    ).toBeInTheDocument();
    expect(screen.getByText('3.0 OUT OF 5')).toBeInTheDocument();
    expect(screen.getByText('AVERAGE')).toBeInTheDocument();
    expect(screen.getByLabelText('Rated 3.0 out of 5')).toBeInTheDocument();
  });

  it('handles an empty distribution without crashing', () => {
    const empty: ProductRatingData = {
      title: 'Product Rating',
      distribution: [],
    };

    render(<ProductRatingCard data={empty} />);

    expect(screen.getByText('NO RATINGS')).toBeInTheDocument();
    expect(screen.getByText('0.0 OUT OF 5')).toBeInTheDocument();
    expect(screen.getAllByRole('listitem')).toHaveLength(5);
  });
});
