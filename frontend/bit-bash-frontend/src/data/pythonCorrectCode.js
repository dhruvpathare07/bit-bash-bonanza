export const PYTHON_CORRECT_CODE = {
  /* ================= EASY ================= */

  "Star Pattern": `
rows = 3
for i in range(rows):
    for j in range(rows):
        if i == j:
            print('#', end='')
        else:
            print('*', end='')
    print()
`,

  "Even / Odd": `
num = int(input('Enter a number: '))
print('Checking number...')
if num % 2 == 0:
    result = 'Even'
else:
    result = 'Odd'
print('The number is:', result)
print('Program Finished')
`,

  "Sum Of Digits": `
num = int(input('Enter a number: '))
print('Calculating sum of digits...')
total = 0
while num > 0:
    digit = num % 10
    total += digit
    num //= 10
print('Sum of digits is:', total)
print('Done!')
`,

  "Factorial": `
num = int(input('Enter a number: '))
print('Calculating factorial...')
fact = 1
for i in range(1, num + 1):
    fact = fact * i
print('Factorial of', num, 'is:', fact)
print('Program Finished')
`,

  "Largest Of 3 Numbers": `
a = int(input('Enter first number: '))
b = int(input('Enter second number: '))
c = int(input('Enter third number: '))
print('Comparing the numbers...')

if a > b and a > c:
    largest = a
elif b > a and b > c:
    largest = b
else:
    largest = c

print('The largest number is:', largest)
`,

  /* ================= MEDIUM ================= */

  "Armstrong": `
num = int(input('Enter a number: '))
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
    print('Not an Armstrong Number')
`,

  "Fibonacci": `
n = int(input('Enter number of terms: '))
a = 0
b = 1

print('Fibonacci Series:')
for i in range(n):
    print(a, end=' ')
    next_value = a + b
    a = b
    b = next_value
`,

  "Array Reverse": `
arr = list(map(int, input('Enter array elements: ').split()))
print('Original Array:', arr)

left = 0
right = len(arr) - 1
while left < right:
    arr[left], arr[right] = arr[right], arr[left]
    left += 1
    right -= 1

print('Reversed Array:', arr)
`,

  "Palindrome": `
num = int(input('Enter a number: '))
original = num
reverse = 0

while num > 0:
    digit = num % 10
    reverse = reverse * 10 + digit
    num //= 10

if original == reverse:
    print('Palindrome Number')
else:
    print('Not a Palindrome Number')
`,

  "Sum Of Array Elements": `
arr = list(map(int, input('Enter array elements: ').split()))
print('Array:', arr)

total = 0
for num in arr:
    total += num

print('Sum of array elements is:', total)
`, 

  /* ================= HARD ================= */

  "String Reverse": `
text = input('Enter a string: ')
print('Reversing the string...')

reversed_text = ''
for char in text:
    reversed_text = char + reversed_text

print('Reversed String:', reversed_text)
`,

  "Complex Pattern": `
rows = 5
print('Printing complex pattern...')

for i in range(1, rows + 1):
    for j in range(1, rows + 1):
        if i == j or i + j == rows + 1:
            print('#', end=' ')
        else:
            print('*', end=' ')
    print()
`,

  "Recursion Logic": `
def factorial(n):
    if n == 1:
        return 1
    else:
        return n * factorial(n - 1)

num = int(input('Enter a number: '))
print('Calculating factorial using recursion...')

result = factorial(num)
print('Factorial is:', result)
`,

  "Prime Number": `
num = int(input('Enter a number: '))
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
    print('Not a Prime Number')
`,

  "Number To Words Conversion": `
num = int(input('Enter a number (0–99): '))

ones = [
    'zero','one','two','three','four',
    'five','six','seven','eight','nine'
]

tens = [
    'ten','eleven','twelve','thirteen','fourteen',
    'fifteen','sixteen','seventeen','eighteen','nineteen'
]

twenties = [
    '','','twenty','thirty','forty',
    'fifty','sixty','seventy','eighty','ninety'
]

if num < 10:
    print(ones[num])
elif num < 20:
    print(tens[num - 10])
else:
    print(twenties[num // 10], ones[num % 10])
`


};
