import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Play, Copy, Download, RotateCcw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface CodeEditorProps {
  code: string;
  onChange: (code: string) => void;
}

export const CodeEditor: React.FC<CodeEditorProps> = ({ code, onChange }) => {
  const [output, setOutput] = useState("");
  const [isRunning, setIsRunning] = useState(false);
  const { toast } = useToast();

  // Simple syntax highlighting
  const highlightCode = (code: string) => {
    return code
      .replace(/(function|const|let|var|if|else|for|while|return|console)/g, '<span class="code-keyword">$1</span>')
      .replace(/(["'].*?["'])/g, '<span class="code-string">$1</span>')
      .replace(/(\d+)/g, '<span class="code-number">$1</span>')
      .replace(/(\/\/.*)/g, '<span class="code-comment">$1</span>');
  };

  const runCode = async () => {
    setIsRunning(true);
    setOutput("");
    
    try {
      // Simulate code execution
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Simple evaluation for demo purposes
      if (code.includes("fibonacci")) {
        setOutput("Fibonacci sequence calculated:\n55");
      } else if (code.includes("console.log")) {
        const matches = code.match(/console\.log\((.*?)\)/g);
        if (matches) {
          setOutput(matches.join("\n").replace(/console\.log\((.*?)\)/g, "$1"));
        }
      } else {
        setOutput("Code executed successfully!");
      }
      
      toast({
        title: "Code executed",
        description: "Your code has been run successfully.",
      });
    } catch (error) {
      setOutput("Error: " + error);
      toast({
        title: "Execution error",
        description: "There was an error running your code.",
        variant: "destructive",
      });
    } finally {
      setIsRunning(false);
    }
  };

  const copyCode = () => {
    navigator.clipboard.writeText(code);
    toast({
      title: "Code copied",
      description: "Code has been copied to clipboard.",
    });
  };

  const resetCode = () => {
    onChange(`// Welcome to CodeLearn Platform
function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

console.log(fibonacci(10));`);
    setOutput("");
  };

  return (
    <div className="space-y-4">
      <Card className="p-0 overflow-hidden">
        <div className="flex items-center justify-between p-4 border-b bg-muted/50">
          <h3 className="font-semibold">Code Editor</h3>
          <div className="flex items-center space-x-2">
            <Button size="sm" variant="outline" onClick={copyCode}>
              <Copy className="w-4 h-4" />
            </Button>
            <Button size="sm" variant="outline" onClick={resetCode}>
              <RotateCcw className="w-4 h-4" />
            </Button>
            <Button 
              size="sm" 
              onClick={runCode}
              disabled={isRunning}
              className="gradient-primary text-white hover:opacity-90"
            >
              <Play className="w-4 h-4 mr-2" />
              {isRunning ? "Running..." : "Run"}
            </Button>
          </div>
        </div>
        
        <div className="relative">
          <textarea
            value={code}
            onChange={(e) => onChange(e.target.value)}
            className="code-editor w-full h-64 resize-none focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="Write your code here..."
            spellCheck={false}
          />
          <div className="absolute top-4 right-4 text-xs text-muted-foreground">
            Lines: {code.split('\n').length}
          </div>
        </div>
      </Card>

      {/* Output Panel */}
      <Card className="p-0 overflow-hidden">
        <div className="flex items-center justify-between p-4 border-b bg-muted/50">
          <h3 className="font-semibold">Output</h3>
          <Button size="sm" variant="outline">
            <Download className="w-4 h-4" />
          </Button>
        </div>
        <div className="p-4">
          <pre className="font-mono text-sm whitespace-pre-wrap min-h-[100px] p-4 bg-code-bg text-code-foreground rounded-lg">
            {output || "Run your code to see output here..."}
          </pre>
        </div>
      </Card>
    </div>
  );
};