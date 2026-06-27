# C-specific test cases (synced with C_CORRECT_CODE output)

TEST_CASES_C = {
    # ================= EASY =================
    
    "Star Pattern": [
        ("5", "* \n* * \n* * * \n* * * * \n* * * * * "),
        ("4", "* \n* * \n* * * \n* * * *")
    ],

    "Even / Odd": [
        ("2", "Even"),
        ("3", "Odd")
    ],

    "Sum Of Digits": [
        ("123", "6"),
        ("456", "15")
    ],

    "Factorial": [
        ("5", "120"),
        ("4", "24"),
    ],

    "Largest Of 3 Numbers": [
        ("3 7 5", "7"),
        ("10 2 8", "10"),
    ],
    
    # ================= MEDIUM =================
    
    "Armstrong": [
        ("153", "153 is an Armstrong number"),
        ("123", "123 is not an Armstrong number"),
     ],

    "Fibonacci": [
        ("10", "0 1 1 2 3 5 8 13 21 34"),
        ("5", "0 1 1 2 3"),
    ],

    "Array Reverse": [
        ("1 2 3 4 5", "5 4 3 2 1"),
        ("10 20 30", "30 20 10"),
    ],

    "Palindrome": [
        ("121", "121"),
        ("123", "123"),
    ],

    "Sum Of Array Elements": [
        ("1 2 3 1 2 3  ", "12"),
        ("5 10 1 1 1", "18"),
    ],
    
    # ================= HARD =================
    
    "String Reverse": [
        ("hello", "olleh"),
        ("world", "dlrow"),
        ("hi", "ih"),
    ],

"Complex Pattern": [
    ("5", "    *\n   ***\n  *****\n *******\n*********"),
    ("4", "   *\n  ***\n *****\n*******"),
],


    "Recursion Logic": [
        ("5", "120"),
        ("4", "24"),

    ],

    "Prime Number": [
        ("14", "14"),
        ("17", "17"),
        ("1", "1 is Not Prime"),
    ],

    "Number To Words Conversion": [
        ("56", "Fifty Six"),
        ("99", "Ninety Nine"),
        ("23", "Twenty Three"),
    ],
}