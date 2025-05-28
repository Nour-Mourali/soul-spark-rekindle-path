
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const chakras = [
  {
    name: "Root Chakra",
    sanskrit: "Muladhara",
    color: "red",
    location: "Base of spine",
    element: "Earth",
    description: "Foundation of stability, security, and grounding. Connects you to the physical world.",
    affirmation: "I am safe, secure, and grounded in my being."
  },
  {
    name: "Sacral Chakra",
    sanskrit: "Svadhisthana",
    color: "orange",
    location: "Lower abdomen",
    element: "Water",
    description: "Center of creativity, sexuality, and emotional balance. Source of passion and joy.",
    affirmation: "I embrace my creativity and allow my emotions to flow freely."
  },
  {
    name: "Solar Plexus",
    sanskrit: "Manipura",
    color: "yellow",
    location: "Upper abdomen",
    element: "Fire",
    description: "Core of personal power, confidence, and self-esteem. Your inner fire and will.",
    affirmation: "I am confident in my personal power and trust my inner wisdom."
  },
  {
    name: "Heart Chakra",
    sanskrit: "Anahata",
    color: "green",
    location: "Center of chest",
    element: "Air",
    description: "Gateway to love, compassion, and connection. Bridge between physical and spiritual.",
    affirmation: "I give and receive love freely and unconditionally."
  },
  {
    name: "Throat Chakra",
    sanskrit: "Vishuddha",
    color: "blue",
    location: "Throat",
    element: "Space",
    description: "Center of communication, truth, and authentic expression. Your voice in the world.",
    affirmation: "I speak my truth with clarity, confidence, and compassion."
  },
  {
    name: "Third Eye",
    sanskrit: "Ajna",
    color: "indigo",
    location: "Between eyebrows",
    element: "Light",
    description: "Seat of intuition, wisdom, and spiritual insight. Your inner vision and clarity.",
    affirmation: "I trust my intuition and see clearly with my inner vision."
  },
  {
    name: "Crown Chakra",
    sanskrit: "Sahasrara",
    color: "violet",
    location: "Top of head",
    element: "Thought",
    description: "Connection to divine consciousness and spiritual enlightenment. Unity with all.",
    affirmation: "I am connected to the divine wisdom and universal consciousness."
  }
];

const ChakraCards = () => {
  const [selectedChakra, setSelectedChakra] = useState<number | null>(null);

  const getColorClasses = (color: string) => {
    const colorMap: { [key: string]: string } = {
      red: "from-red-500 to-red-700 shadow-red-500/20",
      orange: "from-orange-500 to-orange-700 shadow-orange-500/20",
      yellow: "from-yellow-500 to-yellow-700 shadow-yellow-500/20",
      green: "from-green-500 to-green-700 shadow-green-500/20",
      blue: "from-blue-500 to-blue-700 shadow-blue-500/20",
      indigo: "from-indigo-500 to-indigo-700 shadow-indigo-500/20",
      violet: "from-violet-500 to-violet-700 shadow-violet-500/20"
    };
    return colorMap[color] || "from-purple-500 to-purple-700 shadow-purple-500/20";
  };

  return (
    <section className="container mx-auto px-6 py-20">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-pink-300 mb-6">
          The Seven Chakras
        </h2>
        <p className="text-xl text-purple-200 max-w-3xl mx-auto">
          Explore the energy centers within your body. Each chakra governs different aspects of your physical, emotional, and spiritual well-being.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
        {chakras.map((chakra, index) => (
          <Card 
            key={index}
            className={`bg-white/10 backdrop-blur-lg border-purple-300/20 hover:border-purple-300/40 transition-all duration-300 cursor-pointer transform hover:scale-105 ${
              selectedChakra === index ? 'ring-2 ring-purple-300' : ''
            }`}
            onClick={() => setSelectedChakra(selectedChakra === index ? null : index)}
          >
            <CardHeader className="text-center">
              <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${getColorClasses(chakra.color)} mx-auto mb-4 shadow-lg flex items-center justify-center`}>
                <div className="w-8 h-8 bg-white/20 rounded-full"></div>
              </div>
              <CardTitle className="text-purple-200">{chakra.name}</CardTitle>
              <CardDescription className="text-purple-300 italic">{chakra.sanskrit}</CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-purple-200 text-sm mb-2">{chakra.location}</p>
              <p className="text-purple-300 text-xs">Element: {chakra.element}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {selectedChakra !== null && (
        <div className="max-w-4xl mx-auto">
          <Card className="bg-white/10 backdrop-blur-lg border-purple-300/20 shadow-2xl">
            <CardHeader className="text-center">
              <div className={`w-24 h-24 rounded-full bg-gradient-to-br ${getColorClasses(chakras[selectedChakra].color)} mx-auto mb-6 shadow-lg flex items-center justify-center`}>
                <div className="w-12 h-12 bg-white/20 rounded-full"></div>
              </div>
              <CardTitle className="text-3xl text-purple-200">{chakras[selectedChakra].name}</CardTitle>
              <CardDescription className="text-xl text-purple-300 italic">{chakras[selectedChakra].sanskrit}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center">
                <p className="text-purple-200 text-lg leading-relaxed">
                  {chakras[selectedChakra].description}
                </p>
              </div>
              <div className="bg-white/5 rounded-2xl p-6 border border-purple-300/10">
                <h4 className="text-lg font-semibold text-purple-300 mb-3">Daily Affirmation</h4>
                <p className="text-purple-200 text-center italic text-lg">
                  "{chakras[selectedChakra].affirmation}"
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </section>
  );
};

export default ChakraCards;
