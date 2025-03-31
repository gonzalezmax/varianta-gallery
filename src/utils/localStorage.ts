
// Define storage keys
const STORAGE_KEYS = {
  REVIEWS: 'ecommerce-reviews',
};

/**
 * Get stored reviews from localStorage
 */
export const getStoredReviews = () => {
  try {
    const storedReviews = localStorage.getItem(STORAGE_KEYS.REVIEWS);
    return storedReviews ? JSON.parse(storedReviews) : [];
  } catch (error) {
    console.error('Error retrieving reviews from localStorage:', error);
    return [];
  }
};

/**
 * Save reviews to localStorage
 */
export const saveReviews = (reviews: any[]) => {
  try {
    localStorage.setItem(STORAGE_KEYS.REVIEWS, JSON.stringify(reviews));
    return true;
  } catch (error) {
    console.error('Error saving reviews to localStorage:', error);
    return false;
  }
};
