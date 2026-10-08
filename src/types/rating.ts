export type StarValue = 1 | 2 | 3 | 4 | 5;

export interface RatingDistributionItem {
  stars: StarValue;
  count: number;
}

export interface ProductRatingData {
  title: string;
  distribution: RatingDistributionItem[];
}

export interface ProductRatingCardProps {
  data: ProductRatingData;
}
