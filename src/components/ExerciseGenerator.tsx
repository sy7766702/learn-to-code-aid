import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Zap, Trophy, Clock, Target, RefreshCw, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Exercise {
  id: string;
  title: string;
  description: string;
  difficulty: "Easy" | "Medium" | "Hard";
  category: string;
  timeLimit: string;
  points: number;
  starterCode: string;
  solution?: string;
  hints: string[];
}

const exercises: Exercise[] = [
  {
    id: "1",
    title: "Two Sum Problem",
    description: "Given an array of integers and a target sum, return indices of two numbers that add up to the target.",
    difficulty: "Easy",
    category: "Arrays",
    timeLimit: "15 min",
    points: 100,
    starterCode: `function twoSum(nums, target) {
  // Your code here
  
}

// Test cases
console.log(twoSum([2, 7, 11, 15], 9)); // Expected: [0, 1]`,
    hints: [
      "Consider using a hash map to store visited numbers",
      "For each number, check if target - number exists in the map"
    ]
  },
  {
    id: "2",
    title: "Fibonacci Optimization",
    description: "Implement an efficient fibonacci function using dynamic programming.",
    difficulty: "Medium",
    category: "Dynamic Programming",
    timeLimit: "20 min",
    points: 200,
    starterCode: `function fibonacci(n) {
  // Optimize this recursive solution
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

console.log(fibonacci(10)); // Should be efficient`,
    hints: [
      "Use memoization to avoid recalculating values",
      "Consider bottom-up approach with iteration"
    ]
  },
  {
    id: "3",
    title: "Binary Tree Traversal",
    description: "Implement in-order traversal of a binary tree without recursion.",
    difficulty: "Hard",
    category: "Trees",
    timeLimit: "30 min",
    points: 300,
    starterCode: `class TreeNode {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

function inorderTraversal(root) {
  // Implement iterative in-order traversal
  
}`,
    hints: [
      "Use a stack to simulate recursion",
      "Process left subtree, current node, then right subtree"
    ]
  }
];

export const ExerciseGenerator = () => {
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null);
  const [currentCode, setCurrentCode] = useState("");
  const [filter, setFilter] = useState("All");
  const [showHints, setShowHints] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const filteredExercises = exercises.filter(exercise => 
    filter === "All" || exercise.difficulty === filter || exercise.category === filter
  );

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy": return "bg-success text-success-foreground";
      case "Medium": return "bg-warning text-warning-foreground";
      case "Hard": return "bg-error text-error-foreground";
      default: return "bg-primary text-primary-foreground";
    }
  };

  const startExercise = (exercise: Exercise) => {
    setSelectedExercise(exercise);
    setCurrentCode(exercise.starterCode);
    setShowHints(false);
  };

  const submitSolution = async () => {
    if (!selectedExercise) return;
    
    setIsSubmitting(true);
    
    // Simulate solution checking
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const isCorrect = currentCode.length > selectedExercise.starterCode.length;
    
    if (isCorrect) {
      toast({
        title: "🎉 Correct Solution!",
        description: `You earned ${selectedExercise.points} points!`,
      });
    } else {
      toast({
        title: "Not quite right",
        description: "Keep trying! Check the hints if you need help.",
        variant: "destructive",
      });
    }
    
    setIsSubmitting(false);
  };

  const generateNewExercise = () => {
    toast({
      title: "Generating new exercise...",
      description: "AI is creating a personalized challenge for you!",
    });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Exercise List */}
      <div className="lg:col-span-2 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Coding Exercises</h2>
          <div className="flex items-center space-x-2">
            <Select value={filter} onValueChange={setFilter}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Filter by..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All Exercises</SelectItem>
                <SelectItem value="Easy">Easy</SelectItem>
                <SelectItem value="Medium">Medium</SelectItem>
                <SelectItem value="Hard">Hard</SelectItem>
                <SelectItem value="Arrays">Arrays</SelectItem>
                <SelectItem value="Trees">Trees</SelectItem>
                <SelectItem value="Dynamic Programming">DP</SelectItem>
              </SelectContent>
            </Select>
            <Button onClick={generateNewExercise} className="gradient-primary text-white">
              <Zap className="w-4 h-4 mr-2" />
              Generate AI Exercise
            </Button>
          </div>
        </div>

        {!selectedExercise ? (
          <div className="space-y-4">
            {filteredExercises.map((exercise) => (
              <Card key={exercise.id} className="p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-lg font-semibold">{exercise.title}</h3>
                      <Badge className={getDifficultyColor(exercise.difficulty)}>
                        {exercise.difficulty}
                      </Badge>
                    </div>
                    
                    <p className="text-muted-foreground mb-4">{exercise.description}</p>
                    
                    <div className="flex items-center space-x-6 text-sm text-muted-foreground">
                      <div className="flex items-center space-x-1">
                        <Target className="w-4 h-4" />
                        <span>{exercise.category}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="w-4 h-4" />
                        <span>{exercise.timeLimit}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Trophy className="w-4 h-4 text-yellow-500" />
                        <span>{exercise.points} pts</span>
                      </div>
                    </div>
                  </div>
                  
                  <Button
                    onClick={() => startExercise(exercise)}
                    className="gradient-primary text-white hover:opacity-90"
                  >
                    Start Challenge
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-xl font-bold">{selectedExercise.title}</h3>
                  <p className="text-muted-foreground">{selectedExercise.description}</p>
                </div>
                <Button 
                  variant="outline" 
                  onClick={() => setSelectedExercise(null)}
                >
                  Back to List
                </Button>
              </div>
              
              <div className="flex items-center space-x-4 mb-4">
                <Badge className={getDifficultyColor(selectedExercise.difficulty)}>
                  {selectedExercise.difficulty}
                </Badge>
                <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                  <Clock className="w-4 h-4" />
                  <span>{selectedExercise.timeLimit}</span>
                </div>
                <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                  <Trophy className="w-4 h-4 text-yellow-500" />
                  <span>{selectedExercise.points} points</span>
                </div>
              </div>
            </Card>

            <Card className="p-0 overflow-hidden">
              <div className="flex items-center justify-between p-4 border-b bg-muted/50">
                <h4 className="font-semibold">Solution</h4>
                <div className="flex items-center space-x-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setShowHints(!showHints)}
                  >
                    {showHints ? "Hide" : "Show"} Hints
                  </Button>
                  <Button
                    size="sm"
                    onClick={submitSolution}
                    disabled={isSubmitting}
                    className="gradient-primary text-white hover:opacity-90"
                  >
                    {isSubmitting ? (
                      <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                    ) : (
                      <CheckCircle className="w-4 h-4 mr-2" />
                    )}
                    {isSubmitting ? "Checking..." : "Submit"}
                  </Button>
                </div>
              </div>
              
              <textarea
                value={currentCode}
                onChange={(e) => setCurrentCode(e.target.value)}
                className="code-editor w-full h-80 resize-none focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Write your solution here..."
                spellCheck={false}
              />
            </Card>

            {showHints && (
              <Card className="p-4">
                <h4 className="font-semibold mb-3">💡 Hints</h4>
                <div className="space-y-2">
                  {selectedExercise.hints.map((hint, index) => (
                    <div key={index} className="p-3 bg-primary/10 rounded-lg text-sm">
                      <span className="font-medium">Hint {index + 1}:</span> {hint}
                    </div>
                  ))}
                </div>
              </Card>
            )}
          </div>
        )}
      </div>

      {/* Sidebar */}
      <div className="space-y-4">
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Your Progress</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Total Points</span>
              <span className="text-lg font-bold text-primary">1,250</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Solved</span>
              <span className="text-sm">15/50</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Streak</span>
              <span className="text-sm">🔥 7 days</span>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Recommended</h3>
          <div className="space-y-3">
            <div className="p-3 bg-primary/10 rounded-lg">
              <p className="font-medium text-sm">Array Problems</p>
              <p className="text-xs text-muted-foreground">Practice fundamental array operations</p>
            </div>
            <div className="p-3 bg-secondary/10 rounded-lg">
              <p className="font-medium text-sm">Sorting Algorithms</p>
              <p className="text-xs text-muted-foreground">Master different sorting techniques</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Leaderboard</h3>
          <div className="space-y-3">
            {[
              { name: "Alex", points: 2150, rank: 1 },
              { name: "Sarah", points: 1980, rank: 2 },
              { name: "You", points: 1250, rank: 3 },
            ].map((user) => (
              <div key={user.rank} className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium">#{user.rank}</span>
                  <span className="text-sm">{user.name}</span>
                </div>
                <span className="text-sm text-muted-foreground">{user.points}pts</span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};