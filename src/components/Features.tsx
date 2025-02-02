import { Check } from "lucide-react";

const features = [
  {
    title: "Offline Capability",
    description: "Access your app even without internet connection",
  },
  {
    title: "Push Notifications",
    description: "Engage users with timely updates and alerts",
  },
  {
    title: "App-like Experience",
    description: "Provide a native app feel in the browser",
  },
  {
    title: "Cross-platform",
    description: "Work seamlessly across all devices and platforms",
  },
];

const Features = () => {
  return (
    <section id="features" className="py-20 bg-secondary">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-12">
          Why Choose <span className="text-primary">PWAMaster</span>
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="p-6 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
            >
              <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mb-4">
                <Check className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-400">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;