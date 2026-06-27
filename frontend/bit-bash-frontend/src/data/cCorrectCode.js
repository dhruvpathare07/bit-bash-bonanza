export const C_CORRECT_CODE = {
  /* =========== EASY =========== */
  "Star Pattern": `#include <stdio.h>
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
}`,

  "Even / Odd": `#include <stdio.h>
int main() {
printf("Enter an number: ");
scanf("%d", &num);
if (num % 2 == 0) {
printf("Even\\n");
} else {
printf("Odd\\n");
}
return 0;
}`,

  "Sum Of Digits": `#include <stdio.h>
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
}`,

  "Factorial": `#include <stdio.h>
int main() {
int n, fact = 1;
printf("Enter a number: ");
scanf("%d", &n);
for (int i = 1; i <= n; i++) {
fact *= i;
}
printf("%d\\n", fact);
return 0;
}`,

  "Largest Of 3 Numbers": `#include <stdio.h>
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
return 0;}`,

  /* =========== MEDIUM =========== */

  "Armstrong": `#include <stdio.h>
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
}`,

  "Fibonacci": `#include <stdio.h>
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
}`,

  "Array Reverse": `#include <stdio.h>
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
}`,

  "Palindrome": `#include <stdio.h>
#include <string.h>
int main() {
char str[] = "racecar";
int n = strlen(str);
int isPalin = 1;
for (int i = 0; i < n / 2; i++) {
if (str[i] != str[n - 1 - i]) {
isPalin = 0;
break;
}
}
if (isPalin) printf("Palindrome\\n");
else printf("Not Palindrome\\n");
return 0;
}`,

  "Sum Of Array Elements": `#include <stdio.h>
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
}`,

  /* =========== HARD =========== */

  "String Reverse": `#include <stdio.h>
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
}`,

  "Complex Pattern": `#include <stdio.h>
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
}`,

  "Recursion Logic": `#include <stdio.h>
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
}`,

  "Prime Number": `#include <stdio.h>
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
}`,

  "Number To Words Conversion": `#include <stdio.h>
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
}
`
};