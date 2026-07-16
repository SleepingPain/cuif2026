import { ImageWithFallback } from './figma/ImageWithFallback';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Star, Clock } from 'lucide-react';

export function MenuSection() {
  const menuCategories = [
    {
      title: "Breakfast & Brunch",
      time: "8:00 - 12:00",
      image: "https://images.unsplash.com/photo-1551218808-94e220e084d2?w=400&h=300&fit=crop",
      items: [
        { name: "Russian Blini Stack", price: "₽850", description: "Traditional blini with caviar, sour cream, and fresh herbs" },
        { name: "Moscow Benedict", price: "₽950", description: "Poached eggs on toast with smoked salmon and hollandaise" },
        { name: "Pushkin Pancakes", price: "₽750", description: "Fluffy pancakes with honey, berries, and whipped cream" }
      ]
    },
    {
      title: "Signature Coffee",
      time: "All Day",
      image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&h=300&fit=crop",
      items: [
        { name: "Pushkin Espresso", price: "₽450", description: "Our signature single-origin blend with notes of chocolate and caramel" },
        { name: "Imperial Latte", price: "₽550", description: "Smooth espresso with steamed milk and a touch of vanilla" },
        { name: "Moscow Mocha", price: "₽650", description: "Rich chocolate and coffee blend topped with whipped cream" }
      ]
    },
    {
      title: "Dinner Specialties",
      time: "18:00 - 23:00",
      image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop",
      items: [
        { name: "Beef Stroganoff", price: "₽1,850", description: "Classic Russian dish with tender beef in rich cream sauce" },
        { name: "Siberian Salmon", price: "₽2,150", description: "Pan-seared salmon with caviar cream and seasonal vegetables" },
        { name: "Duck à l'Orange", price: "₽2,450", description: "French-inspired roasted duck with orange glaze and potato gratin" }
      ]
    }
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4">
            Culinary Excellence
          </Badge>
          <h2 className="text-4xl md:text-5xl mb-6">
            Menu Highlights
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Discover our carefully curated selection of traditional Russian dishes 
            and international favorites, all prepared with the finest ingredients.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {menuCategories.map((category, index) => (
            <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <CardHeader className="p-0">
                <div className="relative">
                  <ImageWithFallback
                    src={category.image}
                    alt={category.title}
                    className="w-full h-48 object-cover"
                  />
                  <Badge className="absolute top-4 right-4 bg-black/70 text-white">
                    <Clock className="w-3 h-3 mr-1" />
                    {category.time}
                  </Badge>
                </div>
              </CardHeader>
              
              <CardContent className="p-6">
                <CardTitle className="text-xl mb-4">{category.title}</CardTitle>
                
                <div className="space-y-4">
                  {category.items.map((item, itemIndex) => (
                    <div key={itemIndex} className="border-b border-border last:border-b-0 pb-4 last:pb-0">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-medium">{item.name}</h4>
                        <span className="font-medium text-primary">{item.price}</span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {item.description}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button size="lg" className="mr-4">
            View Full Menu
          </Button>
          <Button variant="outline" size="lg">
            Wine List
          </Button>
        </div>
      </div>
    </section>
  );
}