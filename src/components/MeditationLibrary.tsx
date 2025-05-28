
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Play, Clock, Users, Star } from 'lucide-react';

const meditations = [
  {
    title: "Chakra Balancing Journey",
    description: "A complete guided meditation to align and balance all seven chakras",
    duration: "20 min",
    difficulty: "Beginner",
    rating: 4.9,
    participants: 12500,
    category: "Chakra Healing"
  },
  {
    title: "Third Eye Awakening",
    description: "Deepen your intuition and awaken your inner sight",
    duration: "15 min",
    difficulty: "Intermediate",
    rating: 4.8,
    participants: 8900,
    category: "Spiritual Growth"
  },
  {
    title: "Heart Space Opening",
    description: "Cultivate compassion and open your heart to love",
    duration: "12 min",
    difficulty: "Beginner",
    rating: 4.9,
    participants: 15600,
    category: "Love & Compassion"
  },
  {
    title: "Cosmic Connection",
    description: "Connect with universal consciousness and divine energy",
    duration: "25 min",
    difficulty: "Advanced",
    rating: 4.7,
    participants: 6800,
    category: "Spiritual Union"
  },
  {
    title: "Grounding & Protection",
    description: "Root yourself deeply and create energetic boundaries",
    duration: "10 min",
    difficulty: "Beginner",
    rating: 4.8,
    participants: 11200,
    category: "Grounding"
  },
  {
    title: "Soul Purpose Discovery",
    description: "Uncover your life's purpose and align with your soul's mission",
    duration: "30 min",
    difficulty: "Intermediate",
    rating: 4.9,
    participants: 9400,
    category: "Life Purpose"
  }
];

const MeditationLibrary = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  
  const categories = ["All", "Chakra Healing", "Spiritual Growth", "Love & Compassion", "Spiritual Union", "Grounding", "Life Purpose"];
  
  const filteredMeditations = selectedCategory === "All" 
    ? meditations 
    : meditations.filter(meditation => meditation.category === selectedCategory);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner": return "text-green-400";
      case "Intermediate": return "text-yellow-400";
      case "Advanced": return "text-red-400";
      default: return "text-purple-400";
    }
  };

  return (
    <section className="container mx-auto px-6 py-20">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-pink-300 mb-6">
          Guided Meditations
        </h2>
        <p className="text-xl text-purple-200 max-w-3xl mx-auto">
          Embark on transformative journeys through carefully crafted meditations designed to elevate your consciousness.
        </p>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap justify-center gap-3 mb-12">
        {categories.map((category) => (
          <Button
            key={category}
            onClick={() => setSelectedCategory(category)}
            variant={selectedCategory === category ? "default" : "outline"}
            className={`rounded-full px-6 py-2 transition-all duration-300 ${
              selectedCategory === category
                ? "bg-purple-600 hover:bg-purple-700 text-white shadow-lg shadow-purple-500/25"
                : "border-purple-300 text-purple-300 hover:bg-purple-300/10"
            }`}
          >
            {category}
          </Button>
        ))}
      </div>

      {/* Meditation Cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredMeditations.map((meditation, index) => (
          <Card 
            key={index}
            className="bg-white/10 backdrop-blur-lg border-purple-300/20 hover:border-purple-300/40 transition-all duration-300 hover:transform hover:scale-105 shadow-lg hover:shadow-2xl"
          >
            <CardHeader>
              <div className="flex justify-between items-start mb-3">
                <span className="text-sm text-purple-300 bg-purple-300/10 px-3 py-1 rounded-full">
                  {meditation.category}
                </span>
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span className="text-sm text-purple-200">{meditation.rating}</span>
                </div>
              </div>
              <CardTitle className="text-purple-200 text-xl leading-tight">
                {meditation.title}
              </CardTitle>
              <CardDescription className="text-purple-300">
                {meditation.description}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between mb-4 text-sm text-purple-300">
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {meditation.duration}
                </div>
                <div className="flex items-center gap-1">
                  <Users className="w-4 h-4" />
                  {meditation.participants.toLocaleString()}
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <span className={`text-sm font-medium ${getDifficultyColor(meditation.difficulty)}`}>
                  {meditation.difficulty}
                </span>
                <Button className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-full transition-all duration-300 shadow-lg hover:shadow-purple-500/25">
                  <Play className="w-4 h-4 mr-2" />
                  Begin
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Call to Action */}
      <div className="text-center mt-16">
        <Card className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 backdrop-blur-lg border-purple-300/30 max-w-2xl mx-auto">
          <CardContent className="p-8">
            <h3 className="text-2xl font-bold text-purple-200 mb-4">
              Ready to begin your spiritual journey?
            </h3>
            <p className="text-purple-300 mb-6">
              Join thousands of souls who have transformed their lives through mindful meditation and spiritual practice.
            </p>
            <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-3 rounded-full text-lg transition-all duration-300 shadow-lg hover:shadow-purple-500/25">
              Start Your Journey
            </Button>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default MeditationLibrary;
