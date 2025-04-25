# memorai/backend/app.py hsdalk
from flask import Flask, request, jsonify
from supermemo2 import first_review, review as sm2_review
from transformers import pipeline
from diffusers import DiffusionPipeline
from drl_scheduler import get_next_interval, init_drl_agent
# from transformers import AutoTokenizer, AutoModelForSeq2SeqLM, pipeline
# from transformers import pipeline
from transformers import AutoTokenizer, AutoModelForSeq2SeqLM, pipeline


from bkt_model import BKTModel

from flask import Flask, request, jsonify
from flask_cors import CORS           # ← add this
# …

app = Flask(__name__)
CORS(app) 

# app = Flask(__name__)

# 1. Load QG pipeline
# 1. Load QG model and slow tokenizer to avoid fast-tokenizer conversion errors
# Replace the tokenizer and model initialization with this:
from transformers import T5ForConditionalGeneration, T5TokenizerFast

# Initialize tokenizer and model
model_name = "t5-small"  # Using the base t5-small model instead
tokenizer = T5TokenizerFast.from_pretrained(model_name)
model = T5ForConditionalGeneration.from_pretrained(model_name)

# Create the pipeline
qg = pipeline(
    "text2text-generation",
    model=model,
    tokenizer=tokenizer
)

# 2. Load Stable Diffusion for offline imagery
import os
# os.environ["HF_HUB_OFFLINE"] = "1"
img_pipe = DiffusionPipeline.from_pretrained("stabilityai/stable-diffusion-2-1")

# 3. Initialize DRL and BKT modules
drl_agent = init_drl_agent()      # loads or trains SB3 DQN agent
bkt = BKTModel()                  # wraps pyBKT model

@app.route("/generate_cards", methods=["POST"])
def generate_cards():
    text = request.json["text"]
    qas = qg(text)  # List[{"question":..., "answer":...}]
    return jsonify(qas)

@app.route("/schedule", methods=["POST"])
def schedule():
    stats = request.json
    # Use DRL to pick next interval
    state = stats["state"]           # e.g. [easiness, repetitions, interval]
    next_int = get_next_interval(state)
    # Also update SM-2 for fallback & mastery
    if stats["repetitions"] == 0:
        sm2 = first_review(stats["quality"])
    else:
        sm2 = sm2_review(stats["quality"],
                         stats["repetitions"],
                         stats["easiness"],
                         stats["interval"])
    # Update BKT mastery
    mastery = bkt.update(stats["user_id"],
                         stats["skill"],
                         stats["correct"])
    return jsonify({
        "next_interval": next_int,
        "sm2": sm2,
        "mastery_prob": mastery
    })

@app.route("/generate_image", methods=["POST"])
def generate_image():
    prompt = request.json["prompt"]
    img = img_pipe(prompt).images[0]
    path = f"static/{prompt[:50]}.png"
    img.save(path)
    return jsonify({"url": f"/{path}"})

if __name__ == "__main__":
    app.run(debug=True)
