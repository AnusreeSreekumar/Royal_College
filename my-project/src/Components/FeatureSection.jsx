import React from 'react';
import FeatureCard from './FeatureCard';
import card1 from '../college_website/card1.jpg'
import card2 from '../college_website/card2.jpg'
import card3 from '../college_website/card3.jpg'

const features = [
  {
    image: card1,
    title: 'Top Instructors',
    description: 'Learn from the best with real industry insights.',
  },
  {
    image: card2,
    title: 'Interactive Courses',
    description: 'Hands-on learning that keeps you engaged and informed.',
  },
  {
    image: card3,
    title: 'Student Community',
    description: 'Join thousands of learners worldwide on our platform.',
  },
];

const FeatureSection = () => {
  return (
    <section className="py-16">
      <div className="container mx-auto px-6">
        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              image={feature.image}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;
