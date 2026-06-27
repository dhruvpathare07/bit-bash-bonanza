from flask import Flask, request, jsonify
from flask_cors import CORS
from evaluator import check_code_line_by_line, calculate_line_progress, run_test_cases, normalize, classify_error, CORRECT_CODE
from c_evaluator import check_code_line_by_line_c, calculate_line_progress_c, run_test_cases_c, classify_error_c, C_CORRECT_CODE
from runner import run_code   # ✅ Added

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


# ✅ NEW RUN ENDPOINT
@app.route("/run", methods=["POST"])
def run():
    try:
        data = request.get_json()

        code = data.get("code")
        language = data.get("language", "python").lower()
        input_data = data.get("input", "")

        if not code:
            return jsonify(success=False, error="No code provided")

        output, error = run_code(code, input_data, language)

        return jsonify(
            success=error == "",
            output=output,
            error=error
        )

    except Exception as e:
        return jsonify(success=False, error=str(e))


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

        if language == "c":
            return evaluate_c_code(topic, code, attempts)
        else:
            return evaluate_python_code(topic, code, attempts)
            
    except Exception as e:
        return jsonify(success=False, message=f"Server error: {str(e)}", progress=0), 500


def evaluate_python_code(topic, code, attempts):

    correct_code = CORRECT_CODE.get(topic)
    if not correct_code:
        return jsonify(success=False, message="⚠️ No reference code found for Python", progress=0), 400

    logic_passed = run_test_cases(topic, code)
    success_ll, ll_message, ll_progress, wrong_lines = check_code_line_by_line(code, topic, attempts)

    progress = 100 if logic_passed else ll_progress

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

    correct_code = C_CORRECT_CODE.get(topic)
    if not correct_code:
        return jsonify(success=False, message="⚠️ No reference code found for C", progress=0), 400

    logic_passed = run_test_cases_c(topic, code)
    success_ll, ll_message, ll_progress, wrong_lines = check_code_line_by_line_c(code, topic, attempts)

    progress = 100 if logic_passed else ll_progress

    if success_ll:
        final_status = "SUCCESS"
    elif logic_passed:
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
