import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CodeEditor } from "./CodeEditor";
import { TutorialBrowser } from "./TutorialBrowser";
import { ErrorPanel } from "./ErrorPanel";
import { ExerciseGenerator } from "./ExerciseGenerator";
import { Code, BookOpen, Bug, Zap, Play, Save } from "lucide-react";

export const PlatformLayout = () => {
  const [activeTab, setActiveTab] = useState("editor");
  const [code, setCode] = useState(`// Welcome to CodeLearn Platform
function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

console.log(fibonacci(10));`);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 gradient-primary rounded-lg flex items-center justify-center">
                <Code className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-2xl font-bold gradient-primary bg-clip-text text-transparent">
                CodeLearn
              </h1>
            </div>
            
            <nav className="hidden md:flex items-center space-x-6">
              <Button variant="ghost" className="hover:text-primary">
                <BookOpen className="w-4 h-4 mr-2" />
                Tutorials
              </Button>
              <Button variant="ghost" className="hover:text-primary">
                <Zap className="w-4 h-4 mr-2" />
                Exercises
              </Button>
              <Button variant="ghost" className="hover:text-primary">
                <Bug className="w-4 h-4 mr-2" />
                Debug Tools
              </Button>
            </nav>

            <div className="flex items-center space-x-2">
              <Button size="sm" className="gradient-primary text-white hover:opacity-90">
                <Play className="w-4 h-4 mr-2" />
                Run Code
              </Button>
              <Button size="sm" variant="outline">
                <Save className="w-4 h-4 mr-2" />
                Save
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-6">
            <TabsTrigger value="editor" className="flex items-center space-x-2">
              <Code className="w-4 h-4" />
              <span>Code Editor</span>
            </TabsTrigger>
            <TabsTrigger value="tutorials" className="flex items-center space-x-2">
              <BookOpen className="w-4 h-4" />
              <span>Tutorials</span>
            </TabsTrigger>
            <TabsTrigger value="exercises" className="flex items-center space-x-2">
              <Zap className="w-4 h-4" />
              <span>Exercises</span>
            </TabsTrigger>
            <TabsTrigger value="debug" className="flex items-center space-x-2">
              <Bug className="w-4 h-4" />
              <span>Debug Tools</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="editor">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <CodeEditor code={code} onChange={setCode} />
              </div>
              <div>
                <ErrorPanel code={code} />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="tutorials">
            <TutorialBrowser />
          </TabsContent>

          <TabsContent value="exercises">
            <ExerciseGenerator />
          </TabsContent>

          <TabsContent value="debug">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <ErrorPanel code={code} />
              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4">Performance Analysis</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-success-light rounded-lg">
                    <span className="text-sm font-medium">Time Complexity</span>
                    <span className="text-success font-mono">O(2^n)</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-warning-light rounded-lg">
                    <span className="text-sm font-medium">Space Complexity</span>
                    <span className="text-warning font-mono">O(n)</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-primary/10 rounded-lg">
                    <span className="text-sm font-medium">Execution Time</span>
                    <span className="text-primary font-mono">42ms</span>
                  </div>
                </div>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};