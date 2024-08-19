import React from "react";
import {
  BarChart2,
  Code,
  Brush,
  Stethoscope,
  Gavel,
  CloudHail,
} from "lucide-react";

const FeaturesSection = () => {
  const features = [
    {
      icon: (
        <BarChart2 className="w-12 h-12 text-blue-500 hover:text-blue-700 transition duration-300" />
      ),
      title: "Analytics",
      description: "Track your data with powerful analytics tools.",
    },
    {
      icon: (
        <Code className="w-12 h-12 text-green-500 hover:text-green-700 transition duration-300" />
      ),
      title: "Development",
      description: "Build and deploy scalable applications effortlessly.",
    },
    {
      icon: (
        <Brush className="w-12 h-12 text-purple-500 hover:text-purple-700 transition duration-300" />
      ),
      title: "Design",
      description: "Craft stunning user interfaces and experiences.",
    },
    {
      icon: (
        <Stethoscope className="w-12 h-12 text-red-500 hover:text-red-700 transition duration-300" />
      ),
      title: "Health Monitoring",
      description: "Ensure the health and performance of your systems.",
    },
    {
      icon: (
        <Gavel className="w-12 h-12 text-orange-500 hover:text-orange-700 transition duration-300" />
      ),
      title: "Legal",
      description: "Stay compliant with legal standards and practices.",
    },
    {
      icon: (
        <CloudHail className="w-12 h-12 text-sky-500 hover:text-sky-700 transition duration-300" />
      ),
      title: "Cloud Services",
      description: "Leverage cloud infrastructure for your business.",
    },
  ];

  return (
    <section className="py-12 bg-gray-50 relative">
      <div className="container mx-auto text-center">
        {/* Background Text */}
        <h2 className="text-7xl font-bold text-gray-300 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-0 opacity-20">
          Find your career path
        </h2>

        {/* Feature Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <div
              key={index}
              className="p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition duration-300"
            >
              <div className="flex justify-center mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
