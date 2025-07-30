/**
 * Finds the minimum number of modifications needed to satisfy the constraints:
 * 1. array[i][j] == array[i+1][j] (if element below exists)
 * 2. array[i][j] != array[i][j+1] (if element to right exists)
 * 
 * @param {number[][]} array - The 2D array to modify
 * @returns {number} - Minimum number of modifications needed
 */
function minModifications(array) {
    if (!array || array.length === 0 || array[0].length === 0) {
        return 0;
    }
    
    const m = array.length;
    const n = array[0].length;
    
    // The key insight: we need to make each column have the same value
    // while ensuring adjacent elements in each row are different
    
    // For each column, we need to choose a value that minimizes modifications
    // while ensuring that adjacent columns have different values
    
    // Step 1: For each column, find the most frequent value and its count
    const columnStats = [];
    for (let j = 0; j < n; j++) {
        const column = [];
        for (let i = 0; i < m; i++) {
            column.push(array[i][j]);
        }
        
        // Find the most frequent value in this column
        const frequency = {};
        let maxFreq = 0;
        let mostFrequentValue = column[0];
        
        for (const val of column) {
            frequency[val] = (frequency[val] || 0) + 1;
            if (frequency[val] > maxFreq) {
                maxFreq = frequency[val];
                mostFrequentValue = val;
            }
        }
        
        // Modifications needed for this column = total elements - most frequent count
        const mods = m - maxFreq;
        columnStats.push({
            mostFrequentValue,
            modifications: mods,
            frequency: frequency
        });
    }
    
    // Step 2: Find the optimal assignment of values to columns
    // We need to ensure adjacent columns have different values
    let minTotalMods = Infinity;
    
    // Try all possible combinations of values for columns
    // Since we can use any non-negative integer, we can use 0, 1, 2, ..., n-1
    const maxValue = Math.max(n, 10); // Use a reasonable upper bound
    
    function tryAssignment(colIndex, usedValues, currentMods) {
        if (colIndex === n) {
            minTotalMods = Math.min(minTotalMods, currentMods);
            return;
        }
        
        // Try different values for this column
        for (let val = 0; val < maxValue; val++) {
            // Check if this value conflicts with the previous column
            if (colIndex > 0 && usedValues[colIndex - 1] === val) {
                continue;
            }
            
            // Calculate modifications needed for this column with this value
            let mods = 0;
            for (let i = 0; i < m; i++) {
                if (array[i][colIndex] !== val) {
                    mods++;
                }
            }
            
            usedValues[colIndex] = val;
            tryAssignment(colIndex + 1, usedValues, currentMods + mods);
        }
    }
    
    tryAssignment(0, [], 0);
    
    return minTotalMods;
}

// Test cases
function testSolution() {
    // Example 1: [[1,0,2],[1,0,2]]
    const test1 = [[1,0,2],[1,0,2]];
    console.log("Test 1:", test1);
    console.log("Result:", minModifications(test1));
    console.log("Expected: 2");
    console.log();
    
    // Example 2: [[1,1,1],[1,1,1]]
    const test2 = [[1,1,1],[1,1,1]];
    console.log("Test 2:", test2);
    console.log("Result:", minModifications(test2));
    console.log("Expected: 3");
    console.log();
    
    // Example 3: [[1,2,3],[4,5,6]]
    const test3 = [[1,2,3],[4,5,6]];
    console.log("Test 3:", test3);
    console.log("Result:", minModifications(test3));
    console.log("Expected: 6");
    console.log();
    
    // Example 4: [[1,1],[1,1]]
    const test4 = [[1,1],[1,1]];
    console.log("Test 4:", test4);
    console.log("Result:", minModifications(test4));
    console.log("Expected: 2");
    
    // Additional test cases
    console.log("\nAdditional test cases:");
    
    // Test 5: [[1,0],[0,1]] - should be 0
    const test5 = [[1,0],[0,1]];
    console.log("Test 5:", test5);
    console.log("Result:", minModifications(test5));
    console.log("Expected: 0");
    
    // Test 6: [[1,1],[0,0]] - should be 2
    const test6 = [[1,1],[0,0]];
    console.log("Test 6:", test6);
    console.log("Result:", minModifications(test6));
    console.log("Expected: 2");
}

// Run tests
testSolution();