# c_evaluator.py
from testcases_c import TEST_CASES_C
from runner import run_code

# Reference CORRECT code — C versions (SYNCED with cCorrectCode.js)
C_CORRECT_CODE = {
# ================= EASY =================

    "Star Pattern": """#include <stdio.h>
int main() {
int n;
printf("Enter a number: ");
scanf("%d", &n);
for (int i = 1; i <= n; i++) {
for (int j = 1; j <= i; j++) {
printf("* ");
}
printf("\\n");
}
return 0;
}""",

    "Even / Odd": """#include <stdio.h>
int main() {
int num;
printf("Enter an number: ");
scanf("%d", &num);
if (num % 2 == 0) {
printf("Even\\n");
} else {
printf("Odd\\n");
}
return 0;
}""",

    "Sum Of Digits": """#include <stdio.h>
int main() {
int num, sum = 0;
printf("Enter a number: ");
scanf("%d", &num);
while (num > 0) {
sum += num % 10;
num /= 10;
}
printf("Sum of digits:%d\\n", sum);
return 0;
}""",

    "Factorial": """#include <stdio.h>
int main() {
int n, fact = 1;
printf("Enter a number: ");
scanf("%d", &n);
for (int i = 1; i <= n; i++) {
fact *= i;
}
printf("%d\\n", fact);
return 0;
}""",

    "Largest Of 3 Numbers": """#include <stdio.h>
int main() {
int num1, num2, num3;
printf("Enter the numbers: ");
scanf("%d %d %d", &num1, &num2, &num3);
if (num1 >= num2 && num1 >= num3) {
printf("%d is the largest number.", num1);}
else if (num2 >= num1 && num2 >= num3) {
printf("%d is the largest number.", num2);}
else {
printf("%d is the largest number.", num3);}
return 0;}""",

# ================= MEDIUM =================

    "Armstrong": """#include <stdio.h>
#include <math.h>
int main() {
int num, sum = 0;
printf("Enter a number: ");
scanf("%d", &num);
int temp = num;
while (temp > 0) {
int digit = temp % 10;
sum += digit * digit * digit;
temp /= 10;
}
if (sum == num) printf("%d is an Armstrong number\\n", num);
else printf("%d is not an Armstrong number\\n", num);
return 0;
}""",

    "Fibonacci": """#include <stdio.h>
int main() {
int n, a = 0, b = 1;
printf("Enter the number of terms: ");
scanf("%d", &n);
printf("%d ", a);
for (int i = 1; i < n; i++) {
printf("%d ", b);
int temp = a + b;
a = b;
b = temp;
}
return 0;
}""",

    "Array Reverse": """#include <stdio.h>
int main() {
int arr[5];
printf("Enter array elements: ");
for (int i = 0; i < 5; i++) {
scanf("%d", &arr[i]);
}
int n = 5;
for (int i = n - 1; i >= 0; i--) {
printf("Reverse array: %d ", arr[i]);
}
return 0;
}""",

    "Palindrome": """#include <stdio.h>
int main() {
int num, rev = 0, rem, temp;
printf("Enter number: ");
scanf("%d", &num);
temp = num;
while (temp != 0) {
rem = temp % 10;
rev = rev * 10 + rem;
temp /= 10; }
if (num == rev)
printf("%d is a palindrome", num);
else
printf("%d is not a palindrome", num);
return 0;}""",

    "Sum Of Array Elements": """#include <stdio.h>
int main() {
int arr[5];
printf("Enter array elements: ");
for (int i = 0; i < 5; i++) {
scanf("%d", &arr[i]);
}
int n = 5, sum = 0;
for (int i = 0; i < n; i++) {
sum += arr[i];
}
printf("Sum of array elements: %d\\n", sum);
return 0;
}""",

# ================= HARD =================

    "String Reverse": """#include <stdio.h>
#include <string.h>
int main() {
char str[100];
printf("Enter a string: ");
scanf("%s", str);
int n = strlen(str);
for (int i = n - 1; i >= 0; i--) {
printf("%c", str[i]);
}
return 0;
}""",

    "Complex Pattern": """#include <stdio.h>
int main() {
int n;
printf("Enter number of rows: ");
scanf("%d", &n);
for (int i = 1; i <= n; i++) {
for (int j = 1; j <= n - i; j++) printf(" ");
for (int j = 1; j <= 2 * i - 1; j++) printf("*");
printf("\\n");
}
return 0;
}""",

    "Recursion Logic": """#include <stdio.h>
int factorial(int n) {
if (n <= 1) return 1;
return n * factorial(n - 1);
}
int main() {
int num;
printf("Enter a number: ");
scanf("%d", &num);
printf("Factorial is %d\\n", factorial(num));
return 0;
}""",

    "Prime Number": """#include <stdio.h>
int main() {
int num, isPrime = 1;
printf("Enter a number: ");
scanf("%d", &num);
if (num <= 1) isPrime = 0;
for (int i = 2; i <= num / 2; i++) {
if (num % i == 0) {
isPrime = 0;
break;
}
}
if (isPrime) printf("%d is Prime\\n", num);
else printf("%d is Not Prime\\n", num);
return 0;
}""",

    "Number To Words Conversion": """#include <stdio.h>
int main() {
int num;
char *ones[] = {"", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine"};
char *tens[] = {"", "Ten", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"};
char *teens[] = {"Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen", "Seventeen", "Eighteen", "Nineteen"};
printf("Enter a number (1 to 99): ");
scanf("%d", &num);
if (num >= 1 && num <= 99) {
if (num >= 11 && num <= 19) {
printf("%s", teens[num - 11]);
}
else {
printf("%s ", tens[num / 10]);
printf("%s", ones[num % 10]);
}
}
return 0;
}"""
}

C_TOPIC_DIFFICULTY = {
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


def normalize_c(line: str) -> str:
    """Normalize C code line for comparison"""
    return line.replace(" ", "").lower()


def merge_braces_with_lines(lines):
    """Merge standalone braces with the previous line for fair comparison"""
    merged = []
    i = 0
    while i < len(lines):
        current = lines[i].rstrip()
        
        # Check if next line is a standalone opening brace
        if i + 1 < len(lines):
            next_line = lines[i + 1].strip()
            if next_line in ["{", "{;"]:
                # Merge the brace with current line
                if not current.endswith("{") and not current.endswith(";{"):
                    current = current + " " + next_line
                merged.append(current)
                i += 2
                continue
        
        merged.append(current)
        i += 1
    
    return merged


def run_test_cases_c(topic, code):
    """Run test cases for C code"""
    cases = TEST_CASES_C.get(topic, [])
    if not cases:
        return False
    
    for inp, expected in cases:
        try:
            output, error = run_code(code, inp, language="c")
            
            if error and "error" in error.lower():
                return False
            
            # Normalize both strings: strip whitespace, lowercase, handle line endings
            normalized_output = " ".join(output.lower().split())
            normalized_expected = " ".join(expected.lower().split())
            
            if normalized_expected not in normalized_output:
                return False
        except Exception as e:
            return False
    
    return True


def classify_error_c(student_line: str, correct_line: str, difficulty: str):
    """Returns (errorType, message) for C code errors"""

    if difficulty == "easy":
        if correct_line.strip().endswith(";") and not student_line.strip().endswith(";"):
            return "SYNTAX", "Missing ';' at the end of this statement."

        if "=" in student_line and "==" in correct_line:
            return "CONDITION", "Use '==' for comparison, not '='."

        if "{" in correct_line and "{" not in student_line:
            return "SYNTAX", "Missing opening brace '{'."

        if "}" in correct_line and "}" not in student_line:
            return "SYNTAX", "Missing closing brace '}'."

        return "LOGIC", "This line does not match the expected logic."

    if difficulty == "medium":
        if correct_line.strip().endswith(";"):
            return "SYNTAX", "Check statement formatting and semicolons."

        if "for" in correct_line or "while" in correct_line:
            return "LOOP", "Loop syntax or logic seems incorrect."

        if "printf" in correct_line or "scanf" in correct_line:
            return "IO", "Input/output operation seems incorrect."

        return "LOGIC", "This line behaves differently than expected."

    if difficulty == "hard":
        return "HINT", "This line needs rethinking. Check syntax and logic carefully."

    return "LOGIC", "Unexpected logic issue."


def check_code_line_by_line_c(student_code: str, topic: str, attempts: int):
    """Compares C student code against reference correct C code"""

    correct_code = C_CORRECT_CODE.get(topic)
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

    # Merge lines with standalone braces to allow formatting flexibility
    student_lines = merge_braces_with_lines(student_lines)
    correct_lines = merge_braces_with_lines(correct_lines)

    total_lines = len(correct_lines)
    correct_count = 0
    wrong_lines = []

    for i, expected_line in enumerate(correct_lines):
        if i < len(student_lines):
            if normalize_c(student_lines[i]) == normalize_c(expected_line):
                correct_count += 1
            else:
                difficulty = C_TOPIC_DIFFICULTY.get(topic, "medium")
                hints_unlocked = attempts >= 5
                error_type, message = classify_error_c(
                    student_lines[i],
                    expected_line,
                    difficulty
                )

                expected_value = None
                if hints_unlocked:
                    if difficulty == "hard":
                        expected_value = expected_line
                    elif difficulty == "medium":
                        expected_value = expected_line[: max(1, len(expected_line)//2)] + " ..."

                wrong_lines.append({
                    "line": i + 1,
                    "expected": expected_value,
                    "errorType": error_type if hints_unlocked else "HINT_LOCKED",
                    "message": message if hints_unlocked else "Some issues are still pending to be resolved."
                })
        else:
            expected_value = None
            if attempts >= 5:
                difficulty = C_TOPIC_DIFFICULTY.get(topic, "medium")
                if difficulty == "hard":
                    expected_value = expected_line
                elif difficulty == "medium":
                    expected_value = expected_line[: max(1, len(expected_line)//2)] + " ..."

            wrong_lines.append({
                "line": i + 1,
                "expected": expected_value,
                "errorType": "MISSING" if attempts >= 5 else "HINT_LOCKED",
                "message": "This line is missing." if attempts >= 5 else "Some lines are still incorrect."
            })

    progress = int((correct_count / total_lines) * 100)
    success = correct_count == total_lines

    if success:
        message = "🎉 Code debugged successfully!"
    else:
        message = f"❌ Some lines are still incorrect. ({correct_count}/{total_lines} fixed)"

    return success, message, progress, wrong_lines


def calculate_line_progress_c(student_lines, correct_lines):
    """Calculate progress percentage based on matching lines"""
    # Merge lines with standalone braces for fair comparison
    student_lines = merge_braces_with_lines(student_lines)
    correct_lines = merge_braces_with_lines(correct_lines)
    
    if not correct_lines:
        return 0
    
    matched = sum(1 for i, line in enumerate(correct_lines) 
                  if i < len(student_lines) and 
                  normalize_c(student_lines[i]) == normalize_c(line))
    
    return int((matched / len(correct_lines)) * 100)