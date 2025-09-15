import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { PlatformLayout } from "@/components/PlatformLayout";
import { Code, BookOpen, Zap, Users, ArrowRight, Play } from "lucide-react";
import heroImage from "@/assets/hero-coding-platform.jpg";

const Index = () => {
  const [showPlatform, setShowPlatform] = useState(false);

  if (showPlatform) {
    return <PlatformLayout />;
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-10"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
        <div className="gradient-hero absolute inset-0 opacity-90" />
        
        <div className="relative container mx-auto px-4 py-20">
          <div className="text-center text-white">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 animate-float">
              Master Programming with
              <span className="block gradient-card bg-clip-text text-transparent">
                AI-Powered Learning
              </span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-white/90 max-w-3xl mx-auto">
              Learn to code with interactive tutorials, real-time error detection, 
              personalized exercises, and intelligent debugging assistance.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button 
                size="lg" 
                onClick={() => setShowPlatform(true)}
                className="bg-white text-primary hover:bg-white/90 px-8 py-3 text-lg font-semibold animate-glow"
              >
                <Play className="w-5 h-5 mr-2" />
                Start Learning Now
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white text-white hover:bg-white/10 px-8 py-3 text-lg"
              >
                View Demo
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Everything You Need to Learn Programming
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Our comprehensive platform combines cutting-edge AI with proven educational methods
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="p-6 text-center hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 gradient-primary rounded-lg flex items-center justify-center mx-auto mb-4">
                <Code className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Smart Code Editor</h3>
              <p className="text-muted-foreground">
                Advanced syntax highlighting with real-time error detection and intelligent autocomplete
              </p>
            </Card>

            <Card className="p-6 text-center hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 gradient-primary rounded-lg flex items-center justify-center mx-auto mb-4">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Interactive Tutorials</h3>
              <p className="text-muted-foreground">
                Step-by-step lessons with hands-on coding exercises and instant feedback
              </p>
            </Card>

            <Card className="p-6 text-center hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 gradient-primary rounded-lg flex items-center justify-center mx-auto mb-4">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">AI Exercise Generator</h3>
              <p className="text-muted-foreground">
                Personalized coding challenges that adapt to your skill level and learning pace
              </p>
            </Card>

            <Card className="p-6 text-center hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 gradient-primary rounded-lg flex items-center justify-center mx-auto mb-4">
                <Users className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Community Learning</h3>
              <p className="text-muted-foreground">
                Connect with fellow learners, share solutions, and learn from expert developers
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 gradient-primary text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl md:text-4xl font-bold mb-2">50K+</div>
              <div className="text-white/80">Students Learning</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold mb-2">1000+</div>
              <div className="text-white/80">Coding Exercises</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold mb-2">95%</div>
              <div className="text-white/80">Success Rate</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold mb-2">24/7</div>
              <div className="text-white/80">AI Assistance</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Start Your Coding Journey?
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of students who are already mastering programming with our AI-powered platform
          </p>
          <Button 
            size="lg" 
            onClick={() => setShowPlatform(true)}
            className="gradient-primary text-white hover:opacity-90 px-8 py-3 text-lg font-semibold"
          >
            <Play className="w-5 h-5 mr-2" />
            Launch CodeLearn Platform
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Index;
