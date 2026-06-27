# evaluator.py
from testcases import TEST_CASES
from runner import run_code  # if already present, ignore
import re

# Reference CORRECT code — fixed versions of PYTHON_BUGGY_CODE
# Reference CORRECT code — fixed versions of PYTHON_BUGGY_CODE
CORRECT_CODE = {
# ================= EASY =================

    "Star Pattern": """rows = 3
for i in range(rows):
    for j in range(rows):
        if i == j:
            print('#', end='')
        else:
            print('*', end='')
    print()""",

    "Even / Odd": """num = int(input())
print('Checking number...')
if num % 2 == 0:
    result = 'Even'
else:
    result = 'Odd'
print('The number is:', result)
print('Program Finished')""",

    "Sum Of Digits": """num = int(input())
print('Calculating sum of digits...')
total = 0
while num > 0:
    digit = num % 10
    total += digit
    num //= 10
print('Sum of digits is:', total)
print('Done!')""",

    "Factorial": """num = int(input())
print('Calculating factorial...')
fact = 1
for i in range(1, num + 1):
    fact = fact * i
print('Factorial of', num, 'is:', fact)
print('Program Finished')""",

    "Largest Of 3 Numbers": """a = int(input())
b = int(input())
c = int(input())
print('Comparing the numbers...')
if a > b and a > c:
    largest = a
elif b > a and b > c:
    largest = b
else:
    largest = c
print('The largest number is:', largest)""",

    # ================= MEDIUM =================

    "Armstrong": """num = int(input())
temp = num
order = len(str(num))
total = 0
while temp > 0:
    digit = temp % 10
    total += digit ** order
    temp //= 10
if total == num:
    print('Armstrong Number')
else:
    print('Not an Armstrong Number')""",

    "Fibonacci": """n = int(input())
a = 0
b = 1
print('Fibonacci Series:')
for i in range(n):
    print(a, end=' ')
    next_value = a + b
    a = b
    b = next_value""",

    "Array Reverse": """arr = list(map(int, input().split()))
print('Original Array:', arr)
left = 0
right = len(arr) - 1
while left < right:
    arr[left], arr[right] = arr[right], arr[left]
    left += 1
    right -= 1
print('Reversed Array:', arr)""",

    "Palindrome": """num = int(input())
original = num
reverse = 0
while num > 0:
    digit = num % 10
    reverse = reverse * 10 + digit
    num //= 10
if original == reverse:
    print('Palindrome Number')
else:
    print('Not a Palindrome Number')""",

    "Sum Of Array Elements": """arr = list(map(int, input().split()))
print('Array:', arr)
total = 0
for num in arr:
    total += num
print('Sum of array elements is:', total)""", 

    # ================= HARD =================

    "String Reverse": """text = input()
print('Reversing the string...')
reversed_text = ''

for char in text:
    reversed_text = char + reversed_text

print('Reversed String:', reversed_text)""",

    "Complex Pattern": """rows = 5
print('Printing complex pattern...')

for i in range(1, rows + 1):
    for j in range(1, rows + 1):
        if i == j or i + j == rows + 1:
            print('#', end=' ')
        else:
            print('*', end=' ')
    print()""",

    "Recursion Logic": """def factorial(n):
    if n == 1:
        return 1
    else:
        return n * factorial(n - 1)

num = int(input())
print('Calculating factorial using recursion...')
result = factorial(num)
print('Factorial is:', result)""",

    "Prime Number": """num = int(input())
print('Checking if number is prime...')
is_prime = True

if num <= 1:
    is_prime = False
else:
    for i in range(2, int(num ** 0.5) + 1):
        if num % i == 0:
            is_prime = False
            break

if is_prime:
    print('Prime Number')
else:
    print('Not a Prime Number')""",

    "Number To Words Conversion": """num = int(input())

ones = ['zero','one','two','three','four','five','six','seven','eight','nine']
tens = ['ten','eleven','twelve','thirteen','fourteen','fifteen','sixteen','seventeen','eighteen','nineteen']
twenties = ['','','twenty','thirty','forty','fifty','sixty','seventy','eighty','ninety']

if num < 10:
    print(ones[num])
elif num < 20:
    print(tens[num - 10])
else:
    print(twenties[num // 10], ones[num % 10])"""


}

TOPIC_DIFFICULTY = {
    # EASY
    "Star Pattern": "easy",
    "Even / Odd": "easy",
    "Sum Of Digits": "easy",
    "Factorial": "easy",
    "Largest Of 3 Numbers": "easy",

    # MEDIUM
    "Armstrong": "medium",
    "Fibonacci": "medium",
    "Array Reverse": "medium",
    "Palindrome": "medium",
    "Sum Of Array Elements": "medium",

    # HARD
    "String Reverse": "hard",
    "Complex Pattern": "hard",
    "Recursion Logic": "hard",
    "Prime Number": "hard",
    "Number To Words Conversion": "hard",
}
def normalize(line: str) -> str:
    line = line.lower()
    line = re.sub(r'\s+', '', line)
    line = re.sub(r'\b[a-z_][a-z0-9_]*\b', 'var', line)
    return line

def calculate_line_progress(user_code, correct_code):
    user = [l.strip() for l in user_code.splitlines() if l.strip()]
    correct = [l.strip() for l in correct_code.splitlines() if l.strip()]

    matched = 0
    for u, c in zip(user, correct):
        if normalize(u) == normalize(c):
            matched += 1

    return round((matched / len(correct)) * 100) if correct else 0


def run_test_cases(topic, code):
    cases = TEST_CASES.get(topic, [])
    for inp, expected in cases:
        output, error = run_code(code, inp)
        if error or expected.lower() not in output.lower():
            return False
    return True




# def normalize(line: str) -> str:
#     """
#     Normalize a line for comparison:
#     - remove spaces
#     - lowercase
#     """
#     return line.replace(" ", "").lower()


def classify_error(student_line: str, correct_line: str, difficulty: str):
    """
    Returns (errorType, message)
    """

    # EASY → explicit guidance
    if difficulty == "easy":
        if correct_line.strip().endswith(":") and not student_line.strip().endswith(":"):
            return "SYNTAX", "Missing ':' at the end of this line."

        if "=" in student_line and "==" in correct_line:
            return "CONDITION", "Use '==' for comparison, not '='."

        return "LOGIC", "This line does not match the expected logic."

    # MEDIUM → partial guidance
    if difficulty == "medium":
        if correct_line.strip().endswith(":"):
            return "SYNTAX", "Check the statement ending."

        if "for" in correct_line or "while" in correct_line:
            return "LOOP", "Loop logic seems incorrect."

        return "LOGIC", "This line behaves differently than expected."

    # HARD → minimal hint (VS Code style)
    if difficulty == "hard":
        return "HINT", "This line needs rethinking. Check variable usage or flow."

    return "LOGIC", "Unexpected logic issue."


def check_code_line_by_line(student_code: str, topic: str, attempts: int):
    """
    Compares student code against reference correct code.

    Returns:
        success (bool)
        message (str)
        progress (int)
        wrong_lines (list of tuples)
    """

    correct_code = CORRECT_CODE.get(topic)
    if not correct_code:
        return False, f"⚠️ No reference code found for '{topic}'", 0, []

    student_lines = [
        line.rstrip()
        for line in student_code.strip().splitlines()
        if line.strip()
    ]

    correct_lines = [
        line.rstrip()
        for line in correct_code.strip().splitlines()
        if line.strip()
    ]

    total_lines = len(correct_lines)
    correct_count = 0
    wrong_lines = []

    for i, expected_line in enumerate(correct_lines):
        if i < len(student_lines):
            if normalize(student_lines[i]) == normalize(expected_line):
                correct_count += 1
            else:
                difficulty = TOPIC_DIFFICULTY.get(topic, "medium")
                hints_unlocked = attempts >= 5
                error_type, message = classify_error(
                    student_lines[i],
                    expected_line,
                    difficulty
                    )

                # wrong_lines.append({
                #     "line": i + 1,
                #     "expected": expected_line,
                #     "errorType": error_type,
                #     "message": message
                # })
                
                expected_value = None
                
                if hints_unlocked:
                    if difficulty == "hard":
                        expected_value = expected_line
                    elif difficulty == "medium":
                        #expected_value = expected_line[:len(expected_line)//2] + " ..."
                        expected_value = (
    expected_line[: max(1, len(expected_line)//2)] + " ..."
)

                    elif difficulty == "easy":
                        expected_value = None
                        
                wrong_lines.append({
                    "line": i + 1,
                    "expected": expected_value,
                    "errorType": error_type if hints_unlocked else "HINT_LOCKED",
                    "message": (
                        message if hints_unlocked
                        else "Some issues are still pending to be resolved."
                        )})


        else:
            expected_value = None
            
            if attempts >= 5:
                difficulty = TOPIC_DIFFICULTY.get(topic, "medium")
                if difficulty == "hard":
                    expected_value = expected_line
                elif difficulty == "medium":
                    #expected_value = expected_line[:len(expected_line)//2] + " ..."
                    expected_value = (
    expected_line[: max(1, len(expected_line)//2)] + " ..."
)

                elif difficulty == "easy":
                    expected_value = None
                    
            wrong_lines.append({
                "line": i + 1,
                "expected": expected_value,
                "errorType": "MISSING" if attempts >= 5 else "HINT_LOCKED",
                "message": (
                    "This line is missing."
                    if attempts >= 5
                    else "Some lines are still incorrect."
                    )})



    progress = int((correct_count / total_lines) * 100)
    success = correct_count == total_lines

    if success:
        message = "🎉 Code debugged successfully!"
    else:
        message = f"❌ Some lines are still incorrect. ({correct_count}/{total_lines} fixed)"

    return success, message, progress, wrong_lines

