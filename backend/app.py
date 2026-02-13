from flask import Flask, request, jsonify
from flask_cors import CORS
from evaluator import check_code_line_by_line, calculate_line_progress, run_test_cases, normalize, classify_error, CORRECT_CODE
from c_evaluator import check_code_line_by_line_c, calculate_line_progress_c, run_test_cases_c, classify_error_c, C_CORRECT_CODE

app = Flask(__name__)

CORS(
    app,
    origins=["http://localhost:5173"],
    methods=["GET", "POST", "OPTIONS"],
    allow_headers=["Content-Type"]
)

MAX_SCORE = 100
START_SCORE = 50
PENALTY_PER_FAIL = 2


@app.route("/evaluate", methods=["POST", "OPTIONS"])
def evaluate():
    if request.method == "OPTIONS":
        return "", 200

    try:
        data = request.get_json()
        if not data:
            return jsonify(success=False, message="No data received", progress=0), 400

        topic = data.get("topic")
        code = data.get("code")
        language = data.get("language", "python").lower()
        attempts = data.get("attempts", 0)

        if not topic or not code:
            return jsonify(success=False, message="Missing topic or code", progress=0), 400

        # 🔀 ROUTE BASED ON LANGUAGE
        if language == "c":
            return evaluate_c_code(topic, code, attempts)
        else:
            return evaluate_python_code(topic, code, attempts)
            
    except Exception as e:
        return jsonify(success=False, message=f"Server error: {str(e)}", progress=0), 500


def evaluate_python_code(topic, code, attempts):
    """Evaluate Python code"""
    
    correct_code = CORRECT_CODE.get(topic)
    if not correct_code:
        return jsonify(
            success=False,
            message="⚠️ No reference code found for Python",
            progress=0
        ), 400

    # 1️⃣ LOGIC TEST
    logic_passed = run_test_cases(topic, code)
    
    # 2️⃣ LINE-BY-LINE CHECK
    success_ll, ll_message, ll_progress, wrong_lines = check_code_line_by_line(code, topic, attempts)
    # If test cases pass, consider the student's solution correct from a
    # functional perspective and show full progress for the debug bar.
    if logic_passed:
        progress = 100
    else:
        progress = ll_progress

    # 3️⃣ FINAL DECISION
    # If the student's code exactly matches the reference (line-by-line),
    # treat it as SUCCESS even if testcases are misaligned.
    if success_ll:
        final_status = "SUCCESS"
    elif logic_passed and progress >= 60:
        final_status = "SUCCESS"
    elif logic_passed:
        final_status = "LOGIC_OK_BUT_INCOMPLETE_FIX"
    else:
        final_status = "INCORRECT"

    return jsonify(
        success=final_status == "SUCCESS",
        finalStatus=final_status,
        logicPassed=logic_passed,
        progress=progress,
        lineProgress=ll_progress,
        wrongLines=wrong_lines if not success_ll else [],
        message=(
            "🎉 All bugs fixed!"
            if final_status == "SUCCESS"
            else ll_message
            if not logic_passed
            else "🧠 Logic is correct, but bugs still remain 👀"
        )
    )


def evaluate_c_code(topic, code, attempts):
    """Evaluate C code"""
    
    correct_code = C_CORRECT_CODE.get(topic)
    if not correct_code:
        return jsonify(
            success=False,
            message="⚠️ No reference code found for C",
            progress=0
        ), 400

    # 1️⃣ LOGIC TEST (Most important - checks if output is correct)
    logic_passed = run_test_cases_c(topic, code)
    
    # 2️⃣ LINE-BY-LINE CHECK (For detailed feedback if logic fails)
    success_ll, ll_message, ll_progress, wrong_lines = check_code_line_by_line_c(code, topic, attempts)
    
    # 3️⃣ DETERMINE PROGRESS
    # If test cases pass (logic is correct), always show 100% progress
    if logic_passed:
        progress = 100
    else:
        progress = ll_progress

    # 4️⃣ FINAL DECISION
    # SUCCESS only if both output is correct AND code matches reference
    if success_ll:
        final_status = "SUCCESS"
    elif logic_passed:
        # Logic works but formatting/structure differs - still mark as success
        final_status = "SUCCESS"
    else:
        final_status = "INCORRECT"

    return jsonify(
        success=final_status == "SUCCESS",
        finalStatus=final_status,
        logicPassed=logic_passed,
        progress=progress,
        lineProgress=ll_progress,
        wrongLines=wrong_lines if not logic_passed else [],
        message=(
            "🎉 All bugs fixed!"
            if final_status == "SUCCESS"
            else ll_message
            if not logic_passed
            else "Logic is correct!"
        )
    )


if __name__ == "__main__":
    app.run(host="localhost", port=5000, debug=True)
