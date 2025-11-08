import { useState } from "react";
import { Play, Copy, RotateCcw } from "lucide-react";

export default function CodeEditor({ experimentName }) {
  const [code, setCode] = useState(getDefaultCode(experimentName));
  const [output, setOutput] = useState("");
  const [isRunning, setIsRunning] = useState(false);

  const handleRun = async () => {
    setIsRunning(true);
    setOutput("Compiling and running...");

    try {
      const response = await fetch("https://emkc.org/api/v2/piston/execute", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          language: "c",
          version: "10.2.0",
          files: [{
            content: code
          }]
        })
      });

      const data = await response.json();
      if (data.run) {
        setOutput(data.run.output || data.run.stderr || "No output");
      } else {
        setOutput("Error: Unable to execute code");
      }
    } catch (error) {
      setOutput("Error: " + error.message);
    } finally {
      setIsRunning(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    alert("Code copied to clipboard!");
  };

  const handleReset = () => {
    setCode(getDefaultCode(experimentName));
    setOutput("");
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold text-gray-800 dark:text-white">C Code Editor</h3>
        <div className="flex gap-2">
          <button
            onClick={handleCopy}
            className="p-2 bg-gray-200 dark:bg-gray-700 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-all"
            title="Copy Code"
          >
            <Copy size={18} />
          </button>
          <button
            onClick={handleReset}
            className="p-2 bg-gray-200 dark:bg-gray-700 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-all"
            title="Reset Code"
          >
            <RotateCcw size={18} />
          </button>
          <button
            onClick={handleRun}
            disabled={isRunning}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg hover:shadow-lg transition-all disabled:opacity-50"
          >
            <Play size={18} />
            {isRunning ? "Running..." : "Run Code"}
          </button>
        </div>
      </div>

      <textarea
        value={code}
        onChange={(e) => setCode(e.target.value)}
        className="w-full h-96 p-4 bg-gray-900 text-green-400 font-mono text-sm rounded-xl border-2 border-gray-700 focus:border-indigo-500 focus:outline-none"
        spellCheck="false"
      />

      <div>
        <h4 className="text-sm font-bold text-gray-800 dark:text-white mb-2">Output:</h4>
        <pre className="w-full min-h-32 p-4 bg-gray-900 text-white font-mono text-sm rounded-xl border-2 border-gray-700 whitespace-pre-wrap">
          {output || "Run your code to see output here..."}
        </pre>
      </div>
    </div>
  );
}

function getDefaultCode(experimentName) {
  const templates = {
    "SQL Queries on Database": `#include <stdio.h>
#include <string.h>

int main() {
    printf("SQL Query Simulation\\n");
    printf("SELECT * FROM students;\\n");
    return 0;
}`,
    "Implementation of Stack and Queue (DSA)": `#include <stdio.h>
#define MAX 100

int stack[MAX], top = -1;

void push(int val) {
    if(top >= MAX-1) {
        printf("Stack Overflow\\n");
        return;
    }
    stack[++top] = val;
    printf("Pushed %d\\n", val);
}

void pop() {
    if(top < 0) {
        printf("Stack Underflow\\n");
        return;
    }
    printf("Popped %d\\n", stack[top--]);
}

void display() {
    if(top < 0) {
        printf("Stack is empty\\n");
        return;
    }
    printf("Stack: ");
    for(int i = 0; i <= top; i++)
        printf("%d ", stack[i]);
    printf("\\n");
}

int main() {
    push(10);
    push(20);
    push(30);
    display();
    pop();
    display();
    return 0;
}`,
    "Sorting Algorithms (Bubble, Quick, Merge)": `#include <stdio.h>

void bubbleSort(int arr[], int n) {
    for(int i = 0; i < n-1; i++) {
        for(int j = 0; j < n-i-1; j++) {
            if(arr[j] > arr[j+1]) {
                int temp = arr[j];
                arr[j] = arr[j+1];
                arr[j+1] = temp;
            }
        }
    }
}

void printArray(int arr[], int n) {
    for(int i = 0; i < n; i++)
        printf("%d ", arr[i]);
    printf("\\n");
}

int main() {
    int arr[] = {64, 34, 25, 12, 22, 11, 90};
    int n = sizeof(arr)/sizeof(arr[0]);
    
    printf("Original array: ");
    printArray(arr, n);
    
    bubbleSort(arr, n);
    
    printf("Sorted array: ");
    printArray(arr, n);
    
    return 0;
}`,
    "default": `#include <stdio.h>

int main() {
    printf("Hello, Computer Science Lab!\\n");
    printf("Write your code here...\\n");
    return 0;
}`
  };

  return templates[experimentName] || templates["default"];
}
