import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, CheckCircle, Lightbulb, X, RefreshCw } from "lucide-react";

interface CodeIssue {
  type: "error" | "warning" | "suggestion";
  line: number;
  message: string;
  fix?: string;
}

interface ErrorPanelProps {
  code: string;
}

export const ErrorPanel: React.FC<ErrorPanelProps> = ({ code }) => {
  const [issues, setIssues] = useState<CodeIssue[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  // Simple code analysis simulation
  const analyzeCode = (code: string): CodeIssue[] => {
    const issues: CodeIssue[] = [];
    const lines = code.split('\n');

    lines.forEach((line, index) => {
      const lineNumber = index + 1;
      
      // Check for common issues
      if (line.includes('console.log') && !line.includes('//')) {
        issues.push({
          type: "warning",
          line: lineNumber,
          message: "Consider removing console.log statements in production",
          fix: "Use proper logging or remove the statement"
        });
      }

      if (line.includes('var ')) {
        issues.push({
          type: "suggestion",
          line: lineNumber,
          message: "Consider using 'let' or 'const' instead of 'var'",
          fix: "Replace 'var' with 'let' or 'const'"
        });
      }

      if (line.includes('== ') && !line.includes('===')) {
        issues.push({
          type: "warning",
          line: lineNumber,
          message: "Use strict equality (===) instead of loose equality (==)",
          fix: "Replace '==' with '==='"
        });
      }

      if (line.includes('function') && !line.trim().endsWith('{') && !line.includes('=>')) {
        const nextLine = lines[index + 1];
        if (!nextLine || !nextLine.trim().startsWith('{')) {
          issues.push({
            type: "error",
            line: lineNumber,
            message: "Missing opening brace for function",
            fix: "Add opening brace after function declaration"
          });
        }
      }

      // Performance suggestions
      if (line.includes('fibonacci') && line.includes('return fibonacci')) {
        issues.push({
          type: "suggestion",
          line: lineNumber,
          message: "Recursive fibonacci has exponential time complexity",
          fix: "Consider using dynamic programming or iteration for better performance"
        });
      }
    });

    // Add some positive feedback if no issues
    if (issues.length === 0) {
      issues.push({
        type: "suggestion",
        line: 0,
        message: "Great! No issues detected in your code",
        fix: "Keep up the good coding practices!"
      });
    }

    return issues;
  };

  useEffect(() => {
    if (code.trim()) {
      setIsAnalyzing(true);
      // Simulate analysis delay
      const timer = setTimeout(() => {
        setIssues(analyzeCode(code));
        setIsAnalyzing(false);
      }, 500);

      return () => clearTimeout(timer);
    } else {
      setIssues([]);
    }
  }, [code]);

  const getIssueIcon = (type: string) => {
    switch (type) {
      case "error":
        return <X className="w-4 h-4 text-error" />;
      case "warning":
        return <AlertTriangle className="w-4 h-4 text-warning" />;
      case "suggestion":
        return <Lightbulb className="w-4 h-4 text-primary" />;
      default:
        return <CheckCircle className="w-4 h-4 text-success" />;
    }
  };

  const getIssueColor = (type: string) => {
    switch (type) {
      case "error":
        return "bg-error/10 border-error/20";
      case "warning":
        return "bg-warning/10 border-warning/20";
      case "suggestion":
        return "bg-primary/10 border-primary/20";
      default:
        return "bg-success/10 border-success/20";
    }
  };

  const getBadgeVariant = (type: string) => {
    switch (type) {
      case "error":
        return "destructive";
      case "warning":
        return "secondary";
      case "suggestion":
        return "outline";
      default:
        return "default";
    }
  };

  return (
    <Card className="p-0 overflow-hidden">
      <div className="flex items-center justify-between p-4 border-b bg-muted/50">
        <h3 className="font-semibold">Code Analysis</h3>
        <div className="flex items-center space-x-2">
          {isAnalyzing && (
            <RefreshCw className="w-4 h-4 animate-spin text-primary" />
          )}
          <Badge variant="outline">
            {issues.length} {issues.length === 1 ? 'issue' : 'issues'}
          </Badge>
        </div>
      </div>

      <div className="p-4 space-y-3 max-h-96 overflow-y-auto">
        {isAnalyzing ? (
          <div className="flex items-center justify-center py-8">
            <div className="text-center">
              <RefreshCw className="w-8 h-8 animate-spin text-primary mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">Analyzing your code...</p>
            </div>
          </div>
        ) : issues.length > 0 ? (
          issues.map((issue, index) => (
            <div
              key={index}
              className={`p-4 rounded-lg border ${getIssueColor(issue.type)}`}
            >
              <div className="flex items-start space-x-3">
                {getIssueIcon(issue.type)}
                <div className="flex-1 space-y-2">
                  <div className="flex items-center space-x-2">
                    <Badge variant={getBadgeVariant(issue.type)} className="text-xs">
                      {issue.type.toUpperCase()}
                    </Badge>
                    {issue.line > 0 && (
                      <span className="text-xs text-muted-foreground">
                        Line {issue.line}
                      </span>
                    )}
                  </div>
                  <p className="text-sm font-medium">{issue.message}</p>
                  {issue.fix && (
                    <p className="text-xs text-muted-foreground bg-muted/50 p-2 rounded">
                      💡 {issue.fix}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-8">
            <CheckCircle className="w-12 h-12 text-success mx-auto mb-2" />
            <p className="text-sm text-muted-foreground">
              Write some code to see analysis results
            </p>
          </div>
        )}
      </div>

      {issues.length > 0 && !isAnalyzing && (
        <div className="p-4 border-t bg-muted/30">
          <Button
            size="sm"
            variant="outline"
            className="w-full"
            onClick={() => setIssues(analyzeCode(code))}
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Re-analyze Code
          </Button>
        </div>
      )}
    </Card>
  );
};