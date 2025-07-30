def is_valid(s: str) -> bool:
    """
    Determine if the input string is valid.
    
    An input string is valid if:
    1. Open brackets must be closed by the same type of brackets.
    2. Open brackets must be closed in the correct order.
    
    Args:
        s: String containing only '(', ')', '{', '}', '[' and ']'
    
    Returns:
        bool: True if valid, False otherwise
    """
    # Stack to keep track of opening brackets
    stack = []
    
    # Mapping of closing brackets to their corresponding opening brackets
    bracket_map = {
        ')': '(',
        '}': '{',
        ']': '['
    }
    
    # Iterate through each character in the string
    for char in s:
        # If it's an opening bracket, push to stack
        if char in '({[':
            stack.append(char)
        # If it's a closing bracket
        elif char in ')}]':
            # If stack is empty, no opening bracket to match
            if not stack:
                return False
            
            # Check if the top of stack matches the closing bracket
            if stack.pop() != bracket_map[char]:
                return False
    
    # Stack should be empty if all brackets are properly closed
    return len(stack) == 0


def test_valid_parentheses():
    """Test the is_valid function with various examples."""
    test_cases = [
        ("()", True),
        ("()[]{}", True),
        ("(]", False),
        ("([)]", False),
        ("{[]}", True),
        ("", True),
        ("(", False),
        (")", False),
        ("(((", False),
        (")))", False),
        ("({[]})", True),
        ("({[}])", False),
    ]
    
    print("Testing valid parentheses function:")
    print("=" * 40)
    
    for i, (test_input, expected) in enumerate(test_cases, 1):
        result = is_valid(test_input)
        status = "✓ PASS" if result == expected else "✗ FAIL"
        print(f"Test {i}: '{test_input}' → {result} (expected: {expected}) {status}")
    
    print("=" * 40)


if __name__ == "__main__":
    # Run the test cases
    test_valid_parentheses()
    
    # Interactive testing
    print("\nInteractive testing:")
    while True:
        try:
            user_input = input("\nEnter a string to test (or 'quit' to exit): ")
            if user_input.lower() == 'quit':
                break
            
            result = is_valid(user_input)
            print(f"'{user_input}' is {'valid' if result else 'invalid'}")
            
        except KeyboardInterrupt:
            print("\nExiting...")
            break
        except EOFError:
            print("\nExiting...")
            break