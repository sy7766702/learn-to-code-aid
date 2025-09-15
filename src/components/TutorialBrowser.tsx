import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { BookOpen, Clock, Star, Play, CheckCircle } from "lucide-react";

interface Tutorial {
  id: string;
  title: string;
  description: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  duration: string;
  rating: number;
  completed: boolean;
  topics: string[];
}

const tutorials: Tutorial[] = [
  {
    id: "1",
    title: "JavaScript Fundamentals",
    description: "Learn the basics of JavaScript including variables, functions, and control structures.",
    difficulty: "Beginner",
    duration: "2 hours",
    rating: 4.8,
    completed: true,
    topics: ["Variables", "Functions", "Loops", "Conditionals"]
  },
  {
    id: "2",
    title: "Async Programming",
    description: "Master promises, async/await, and asynchronous JavaScript programming patterns.",
    difficulty: "Intermediate",
    duration: "3 hours",
    rating: 4.9,
    completed: false,
    topics: ["Promises", "Async/Await", "Callbacks", "Event Loop"]
  },
  {
    id: "3",
    title: "Data Structures & Algorithms",
    description: "Implement common data structures and algorithms from scratch.",
    difficulty: "Advanced",
    duration: "5 hours",
    rating: 4.7,
    completed: false,
    topics: ["Arrays", "Linked Lists", "Trees", "Sorting", "Searching"]
  },
  {
    id: "4",
    title: "React Fundamentals",
    description: "Build interactive user interfaces with React components and hooks.",
    difficulty: "Intermediate",
    duration: "4 hours",
    rating: 4.6,
    completed: false,
    topics: ["Components", "Props", "State", "Hooks", "JSX"]
  }
];

export const TutorialBrowser = () => {
  const [selectedTutorial, setSelectedTutorial] = useState<Tutorial | null>(null);
  const [filter, setFilter] = useState<"All" | "Beginner" | "Intermediate" | "Advanced">("All");

  const filteredTutorials = tutorials.filter(tutorial => 
    filter === "All" || tutorial.difficulty === filter
  );

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner": return "bg-success text-success-foreground";
      case "Intermediate": return "bg-warning text-warning-foreground";
      case "Advanced": return "bg-error text-error-foreground";
      default: return "bg-primary text-primary-foreground";
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Tutorial List */}
      <div className="lg:col-span-2 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Interactive Tutorials</h2>
          <div className="flex space-x-2">
            {["All", "Beginner", "Intermediate", "Advanced"].map((level) => (
              <Button
                key={level}
                size="sm"
                variant={filter === level ? "default" : "outline"}
                onClick={() => setFilter(level as any)}
                className={filter === level ? "gradient-primary text-white" : ""}
              >
                {level}
              </Button>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          {filteredTutorials.map((tutorial) => (
            <Card
              key={tutorial.id}
              className={`p-6 cursor-pointer transition-all hover:shadow-lg ${
                selectedTutorial?.id === tutorial.id ? "ring-2 ring-primary" : ""
              }`}
              onClick={() => setSelectedTutorial(tutorial)}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-lg font-semibold">{tutorial.title}</h3>
                    {tutorial.completed && (
                      <CheckCircle className="w-5 h-5 text-success" />
                    )}
                  </div>
                  <p className="text-muted-foreground mb-4">{tutorial.description}</p>
                  
                  <div className="flex items-center space-x-4 mb-4">
                    <Badge className={getDifficultyColor(tutorial.difficulty)}>
                      {tutorial.difficulty}
                    </Badge>
                    <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                      <Clock className="w-4 h-4" />
                      <span>{tutorial.duration}</span>
                    </div>
                    <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span>{tutorial.rating}</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {tutorial.topics.map((topic) => (
                      <Badge key={topic} variant="secondary" className="text-xs">
                        {topic}
                      </Badge>
                    ))}
                  </div>
                </div>

                <Button
                  size="sm"
                  className="gradient-primary text-white hover:opacity-90 ml-4"
                >
                  <Play className="w-4 h-4 mr-2" />
                  Start
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Tutorial Details */}
      <div className="space-y-4">
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Learning Progress</h3>
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Overall Progress</span>
                <span className="text-sm text-muted-foreground">25%</span>
              </div>
              <Progress value={25} className="h-2" />
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">JavaScript</span>
                <span className="text-sm text-muted-foreground">80%</span>
              </div>
              <Progress value={80} className="h-2" />
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">React</span>
                <span className="text-sm text-muted-foreground">10%</span>
              </div>
              <Progress value={10} className="h-2" />
            </div>
          </div>
        </Card>

        {selectedTutorial && (
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Tutorial Details</h3>
            <div className="space-y-3">
              <h4 className="font-medium">{selectedTutorial.title}</h4>
              <p className="text-sm text-muted-foreground">
                {selectedTutorial.description}
              </p>
              <div className="pt-4 border-t">
                <Button className="w-full gradient-primary text-white hover:opacity-90">
                  <BookOpen className="w-4 h-4 mr-2" />
                  Start Learning
                </Button>
              </div>
            </div>
          </Card>
        )}

        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Quick Tips</h3>
          <div className="space-y-3 text-sm">
            <div className="p-3 bg-primary/10 rounded-lg">
              <p className="font-medium text-primary">💡 Pro Tip</p>
              <p className="text-muted-foreground">Practice coding daily for better retention</p>
            </div>
            <div className="p-3 bg-success/10 rounded-lg">
              <p className="font-medium text-success">✅ Remember</p>
              <p className="text-muted-foreground">Debug step by step to understand errors</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};