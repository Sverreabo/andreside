import brute
from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin
from socket import gethostbyname, gethostname

app = Flask(__name__)
cors = CORS(app)
app.config["CORS_HEADERS"] = "Content-Type"


@app.route("/")
@cross_origin()
def index():
    return "Vigenere API"


@app.route("/brute_api")
@cross_origin()
def brute_api():
    try:
        secret = request.args.get("secret")
        print("")
        print(secret)
        solutions = brute.sort_strings(brute.brute(str(secret)))[:6]
        return jsonify(
            [[str(solution), solution.score, solution.key] for solution in solutions]
        )
    except:
        return jsonify(["ERROR"])


@app.route("/encrypt_api")
@cross_origin()
def encrypt_api():
    try:
        msg = request.args.get("msg")
        key = request.args.get("key").lower()
        return jsonify([brute.vigenere_encode(msg, key)])

    except:
        return jsonify(["ERROR"])


@app.route("/decrypt_api")
@cross_origin()
def decrypt_api():
    try:
        secret = request.args.get("secret")
        key = request.args.get("key").lower()
        return jsonify([brute.vigenere_decode(secret, key)])

    except:
        return jsonify(["ERROR"])


if __name__ == "__main__":
    ip = gethostbyname(gethostname())
    app.run(host="10.0.0.114", port=5000)
