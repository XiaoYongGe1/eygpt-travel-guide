import { Restaurant } from '../types';

interface RestaurantCardProps {
  restaurant: Restaurant;
}

export default function RestaurantCard({ restaurant }: RestaurantCardProps) {
  return (
    <div className="magazine-card overflow-hidden">
      <div className="bg-magazine-sand/50 p-4">
        <div className="flex items-center space-x-2">
          <span className="text-2xl">🍽️</span>
          <div>
            <h4 className="text-lg font-serif text-magazine-text">{restaurant.name}</h4>
            {restaurant.cuisine && (
              <p className="text-sm text-magazine-secondary">{restaurant.cuisine}</p>
            )}
          </div>
        </div>
      </div>

      <div className="p-4">
        <p className="text-sm text-magazine-secondary">{restaurant.description}</p>
        
        {restaurant.priceRange && (
          <p className="text-sm mt-2">
            <span className="font-medium text-magazine-accent">人均:</span> {restaurant.priceRange}
          </p>
        )}
        
        {restaurant.recommendation && (
          <p className="text-sm mt-2 text-magazine-text">
            <span className="font-medium">推荐:</span> {restaurant.recommendation}
          </p>
        )}
      </div>
    </div>
  );
}
