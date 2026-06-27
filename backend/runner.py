import subprocess
import tempfile
import os
import sys
from typing import Tuple

TIMEOUT = 5  # seconds

def run_code(code: str, input_data: str = "", language: str = "python") -> Tuple[str, str]:

    if language == "python":
        try:
            with tempfile.NamedTemporaryFile(mode="w", suffix=".py", delete=False) as f:
                f.write(code)
                filename = f.name

            result = subprocess.run(
                [sys.executable, filename],
                input=input_data + "\n" if input_data else "",
                text=True,
                capture_output=True,
                timeout=TIMEOUT
            )

            os.unlink(filename)

            output = result.stdout.strip().replace("\r\n", "\n")
            error = result.stderr.strip().replace("\r\n", "\n")

            return output, error

        except subprocess.TimeoutExpired:
            return "", "Execution timeout"
        except Exception as e:
            return "", str(e)

    elif language == "c":
        with tempfile.TemporaryDirectory() as td:
            src_path = os.path.join(td, "prog.c")
            exe_name = "prog.exe" if sys.platform == "win32" else "prog.out"
            exe_path = os.path.join(td, exe_name)

            try:
                with open(src_path, "w", encoding="utf-8") as f:
                    f.write(code)
            except Exception as e:
                return "", f"Write error: {str(e)}"

            try:
                cproc = subprocess.run(
                    ["gcc", src_path, "-o", exe_path, "-Wall"],   # ✅ Added -Wall
                    stdout=subprocess.PIPE,
                    stderr=subprocess.PIPE,
                    timeout=TIMEOUT,
                    text=True
                )
            except subprocess.TimeoutExpired:
                return "", "Compilation timeout"
            except FileNotFoundError:
                return "", "gcc not found. Install gcc."

            if cproc.returncode != 0:
                return "", f"Compilation error:\n{cproc.stderr}"

            try:
                rproc = subprocess.run(
                    [exe_path],
                    input=input_data + "\n" if input_data else "",
                    stdout=subprocess.PIPE,
                    stderr=subprocess.PIPE,
                    timeout=TIMEOUT,
                    text=True
                )

                output = rproc.stdout.strip().replace("\r\n", "\n")
                error = rproc.stderr.strip().replace("\r\n", "\n")

                return output, error

            except subprocess.TimeoutExpired:
                return "", "Execution timeout"
            except Exception as e:
                return "", f"Runtime error: {str(e)}"

    return "", f"Unsupported language: {language}"
