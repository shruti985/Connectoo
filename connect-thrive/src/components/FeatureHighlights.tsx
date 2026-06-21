import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Trophy, Rocket, ArrowRight, Users, Zap } from "lucide-react";

const features = [
  {
    id: "hackathon",
    title: "Build Your Winning Team",
    description:
      "Find teammates for upcoming hackathons. Match by skills, brainstorm ideas, and compete together.",
    icon: Trophy,
    link: "/hackathon",
    gradient: "bg-gradient-to-br from-violet-500 to-fuchsia-600",
    color: "text-violet-400",
    stats: [
      { icon: Users, label: "Find Teammates" },
      { icon: Zap, label: "Skill Matching" },
    ],
  },
  {
    id: "startup",
    title: "🚀 Startup & Project Ideas",
    description:
      "Discover ideas, share yours, and find your co-creators. Turn concepts into real projects.",
    icon: Rocket,
    link: "/startup/ideas",
    gradient: "bg-gradient-to-br from-orange-500 to-amber-600",
    color: "text-orange-400",
    stats: [
      { icon: Users, label: "Collaborate" },
      { icon: Zap, label: "Launch Ideas" },
    ],
  },
];

const FeatureHighlights = () => {
  return (
    <section className="py-12 relative">
      <div className="container mx-auto px-4">
        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {features.map((feature, index) => (
            <motion.div
              key={feature.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
            >
              <Link to={feature.link}>
                <motion.div
                  className="glass-card p-8 h-full group cursor-pointer relative overflow-hidden"
                  whileHover={{ scale: 1.02, y: -4 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Gradient glow effect on hover */}
                  <div
                    className={`absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500 ${feature.gradient}`}
                  />

                  {/* Icon */}
                  <motion.div
                    className={`w-14 h-14 rounded-xl flex items-center justify-center mb-5 ${feature.gradient}`}
                    whileHover={{ rotate: [0, -10, 10, 0] }}
                    transition={{ duration: 0.5 }}
                  >
                    <feature.icon className="w-7 h-7 text-white" />
                  </motion.div>

                  {/* Big Title */}
                  <h3 className="text-2xl md:text-3xl font-display font-bold mb-3 group-hover:text-primary transition-colors leading-tight">
                    {feature.title}
                  </h3>

                  {/* Description */}
                  <p className="text-muted-foreground mb-6">
                    {feature.description}
                  </p>

                  {/* Stats / CTA */}
                  <div className="flex items-center justify-between mt-auto pt-4 border-t border-border/50">
                    <div className="flex items-center gap-4">
                      {feature.stats.map((stat, i) => (
                        <div
                          key={i}
                          className="flex items-center gap-1.5 text-sm text-muted-foreground"
                        >
                          <stat.icon className="w-4 h-4" />
                          <span>{stat.label}</span>
                        </div>
                      ))}
                    </div>
                    <motion.div
                      className={`text-sm font-medium flex items-center gap-1 ${feature.color}`}
                      whileHover={{ x: 5 }}
                    >
                      Explore
                      <ArrowRight className="w-4 h-4" />
                    </motion.div>
                  </div>
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureHighlights;
