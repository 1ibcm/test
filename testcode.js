/**
 * Determine if the input string is valid.
 * 
 * An input string is valid if:
 * 1. Open brackets must be closed by the same type of brackets.
 * 2. Open brackets must be closed in the correct order.
 * 
 * @param {string} s - String containing only '(', ')', '{', '}', '[' and ']'
 * @returns {boolean} - True if valid, False otherwise
 */
function isValid(s) {
    // Stack to keep track of opening brackets
    const stack = [];
    
    // Mapping of closing brackets to their corresponding opening brackets
    const bracketMap = {
        ')': '(',
        '}': '{',
        ']': '['
    };
    
    // Iterate through each character in the string
    for (let char of s) {
        // If it's an opening bracket, push to stack
        if ('({['.includes(char)) {
            stack.push(char);
        }
        // If it's a closing bracket
        else if (')}]'.includes(char)) {
            // If stack is empty, no opening bracket to match
            if (stack.length === 0) {
                return false;
            }
            
            // Check if the top of stack matches the closing bracket
            if (stack.pop() !== bracketMap[char]) {
                return false;
            }
        }
    }
    
    // Stack should be empty if all brackets are properly closed
    return stack.length === 0;
}

/**
 * Test the isValid function with various examples
 */
function testValidParentheses() {
    const testCases = [
        ["()", true],
        ["()[]{}", true],
        ["(]", false],
        ["([)]", false],
        ["{[]}", true],
        ["", true],
        ["(", false],
        [")", false],
        ["(((", false],
        [")))", false],
        ["({[]})", true],
        ["({[}])", false],
    ];
    
    console.log("Testing valid parentheses function:");
    console.log("=".repeat(40));
    
    testCases.forEach(([testInput, expected], index) => {
        const result = isValid(testInput);
        const status = result === expected ? "✓ PASS" : "✗ FAIL";
        console.log(`Test ${index + 1}: '${testInput}' → ${result} (expected: ${expected}) ${status}`);
    });
    
    console.log("=".repeat(40));
}

/**
 * Interactive testing function
 */
function interactiveTest() {
    console.log("\nInteractive testing:");
    console.log("Enter strings to test (type 'quit' to exit):");
    
    // For Node.js environment
    if (typeof process !== 'undefined' && process.stdin) {
        const readline = require('readline');
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
        
        const askQuestion = () => {
            rl.question('\nEnter a string to test (or "quit" to exit): ', (answer) => {
                if (answer.toLowerCase() === 'quit') {
                    rl.close();
                    return;
                }
                
                const result = isValid(answer);
                console.log(`'${answer}' is ${result ? 'valid' : 'invalid'}`);
                askQuestion();
            });
        };
        
        askQuestion();
    }
}

// Run tests
testValidParentheses();

// Run interactive testing if in Node.js environment
if (typeof process !== 'undefined' && process.stdin) {
    interactiveTest();
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { isValid, testValidParentheses };
} 
