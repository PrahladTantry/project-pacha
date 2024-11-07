import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Book, Search, Users, Globe, Leaf, BookOpen, Heart } from "lucide-react";

const globalStyles = `
  ::-webkit-scrollbar {
    width: 8px;
    background: transparent;
  }

  ::-webkit-scrollbar-track {
    background: transparent;
  }

  ::-webkit-scrollbar-thumb {
    background: rgba(34, 197, 94, 0.2);
    border-radius: 4px;
    transition: background 0.2s ease;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: rgba(34, 197, 94, 0.3);
  }

  * {
    scrollbar-width: thin;
    scrollbar-color: rgba(34, 197, 94, 0.2) transparent;
  }
`;

const Button = ({ children, variant = "default", className = "", onClick, ...props }) => {
  const baseStyles = "px-4 py-2 rounded-md font-medium transition-all duration-200";
  const variants = {
    default: "bg-green-600 hover:bg-green-700 text-white",
    ghost: "bg-transparent hover:bg-white/10 text-white",
    outline: "border-2 border-green-500 hover:bg-green-500/10 text-green-500",
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${className}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};

const Landing = () => {
  const [scrolled, setScrolled] = useState(false);
  const featuresRef = useRef(null);
  const aboutRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const styleSheet = document.createElement("style");
    styleSheet.innerText = globalStyles;
    document.head.appendChild(styleSheet);
    return () => document.head.removeChild(styleSheet);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (ref) => {
    const navbarHeight = 80;
    const element = ref.current;
    if (element) {
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({
        top: elementPosition - navbarHeight,
        behavior: "smooth"
      });
    }
  };

  const handleSearchClick = () => {
    navigate("/search");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white">
      {/* Background Animation */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animation: `float ${10 + Math.random() * 20}s infinite`,
                animationDelay: `${Math.random() * 20}s`
              }}
            >
              <Leaf className="w-8 h-8 text-green-500/20" />
            </div>
          ))}
        </div>
      </div>

      {/* Navbar */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? "bg-gray-900/80 backdrop-blur-lg" : "bg-transparent"}`}>
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Leaf className="w-6 md:w-8 h-6 md:h-8 text-green-500" />
            <span className="text-xl md:text-2xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
              പച്ച
            </span>
          </div>
          <div className="flex gap-4 md:gap-8">
            <Button 
              variant="ghost" 
              className="text-white hover:text-green-400 text-sm md:text-base"
              onClick={() => scrollToSection(featuresRef)}
            >
              Features
            </Button>
            <Button 
              variant="ghost" 
              className="text-white hover:text-green-400 text-sm md:text-base"
              onClick={() => scrollToSection(aboutRef)}
            >
              About
            </Button>
            <Button className="text-sm md:text-base" onClick={handleSearchClick}>
              Search Dictionary
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative min-h-screen flex items-center justify-center px-4 text-center">
        <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-6 py-24 md:py-32">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 md:mb-8 animate-fade-in">
            <span className="bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
              Project പച്ച
            </span>
          </h1>
          <p className="text-lg md:text-2xl text-gray-300 mb-6 md:mb-12 max-w-lg md:max-w-2xl mx-auto animate-fade-in-delayed">
            A comprehensive Malayalam-English dictionary enriched with modern technology
          </p>
          <div className="flex justify-center gap-4 md:gap-6 animate-fade-in-delayed-more">
            <Button className="px-6 py-2 md:px-8 md:py-3 text-sm md:text-lg" onClick={handleSearchClick}>
              Search Dictionary
            </Button>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div ref={featuresRef} className="relative z-10 bg-gray-900/80 backdrop-blur-lg py-16 md:py-32">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-12">
            {[
              {
                icon: <Book className="w-10 h-10 md:w-12 md:h-12 text-green-400" />,
                title: "Extensive Collection",
                description: "Over 100,000 words with detailed definitions and usage examples"
              },
              {
                icon: <Search className="w-10 h-10 md:w-12 md:h-12 text-green-400" />,
                title: "Smart Search",
                description: "Advanced search with phonetic matching and suggestions"
              },
              {
                icon: <Globe className="w-10 h-10 md:w-12 md:h-12 text-green-400" />,
                title: "Offline Access",
                description: "Access the dictionary anywhere, even without internet"
              },
              {
                icon: <Users className="w-10 h-10 md:w-12 md:h-12 text-green-400" />,
                title: "Community Driven",
                description: "Continuous updates with community contributions"
              },
              {
                icon: <BookOpen className="w-10 h-10 md:w-12 md:h-12 text-green-400" />,
                title: "Learn & Practice",
                description: "Interactive learning tools and daily word features"
              },
              {
                icon: <Heart className="w-10 h-10 md:w-12 md:h-12 text-green-400" />,
                title: "Free Forever",
                description: "Open-source project committed to free access"
              }
            ].map((feature, index) => (
              <div
                key={index}
                className="group p-6 md:p-8 rounded-2xl bg-gradient-to-br from-gray-800/80 to-gray-700/80 
                  hover:from-green-900/20 hover:to-emerald-900/20 transition-all duration-300 backdrop-blur-sm"
              >
                <div className="mb-4 md:mb-6 transform group-hover:scale-110 transition-transform">
                  {feature.icon}
                </div>
                <h3 className="text-xl md:text-2xl font-semibold mb-2 md:mb-4">{feature.title}</h3>
                <p className="text-gray-400 text-sm md:text-base">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* About Section */}
      <div ref={aboutRef} className="relative z-10 bg-gray-900 py-16 md:py-32">
        <div className="max-w-5xl mx-auto px-4 md:px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-green-400 mb-6 md:mb-8">About Project പച്ച</h2>
          <p className="text-base md:text-lg text-gray-300 max-w-lg md:max-w-3xl mx-auto mb-6 md:mb-8 leading-relaxed">
            Project പച്ച is a community-driven initiative to create the most comprehensive and accessible 
            Malayalam-English dictionary. Our mission is to preserve and promote the Malayalam language 
            while making it accessible to learners worldwide.
          </p>
          <div className="mt-8 md:mt-12">
            <Button className="px-6 py-2 md:px-8 md:py-3 text-sm md:text-lg">
              Join Our Community
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
