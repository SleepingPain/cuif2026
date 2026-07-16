import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { 
  Wifi, 
  Car, 
  Music, 
  Coffee, 
  Utensils, 
  CreditCard, 
  Users, 
  Clock,
  Smartphone,
  Gift
} from 'lucide-react';

export function FeaturesSection() {
  const features = [
    {
      icon: Wifi,
      title: "Free WiFi",
      description: "High-speed internet throughout the cafe"
    },
    {
      icon: Car,
      title: "Valet Parking",
      description: "Complimentary valet service for guests"
    },
    {
      icon: Music,
      title: "Live Piano",
      description: "Evening performances by local musicians"
    },
    {
      icon: Coffee,
      title: "Specialty Coffee",
      description: "Single-origin beans roasted in-house daily"
    },
    {
      icon: Utensils,
      title: "Fine Dining",
      description: "Russian & international cuisine"
    },
    {
      icon: CreditCard,
      title: "All Payments",
      description: "Cash, cards, and contactless accepted"
    },
    {
      icon: Users,
      title: "Private Events",
      description: "Exclusive dining rooms for special occasions"
    },
    {
      icon: Clock,
      title: "Extended Hours",
      description: "Open from 8 AM to 11 PM daily"
    },
    {
      icon: Smartphone,
      title: "Table Reservations",
      description: "Easy online and phone reservations"
    },
    {
      icon: Gift,
      title: "Gift Cards",
      description: "Perfect gifts for food lovers"
    }
  ];

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4">
            Premium Amenities
          </Badge>
          <h2 className="text-4xl md:text-5xl mb-6">
            Everything You Need for the Perfect Experience
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            From artisanal coffee to fine dining, we've thoughtfully designed every aspect 
            of your visit to exceed your expectations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="text-center hover:shadow-lg transition-shadow duration-300">
              <CardHeader className="pb-4">
                <div className="mx-auto mb-4 p-3 bg-primary/10 rounded-full w-fit">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <CardTitle className="text-lg">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-sm text-muted-foreground">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}