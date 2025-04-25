# memorai/backend/bkt_model.py
import pandas as pd
from pyBKT.models import Model

class BKTModel:
    def __init__(self):
        # Initialize an empty DataFrame with the proper columns
        self.data = pd.DataFrame(columns=["user", "skill", "correct", "timestamp"])
        self.model = Model()

    def update(self, user, skill, correct):
        # Build the new row as a single‐row DataFrame
        new_row = pd.DataFrame([{
            "user": user,
            "skill": skill,
            "correct": int(correct) if correct is not None else 0,
            "timestamp": pd.Timestamp.now()
        }])

        # Concatenate and reset index
        self.data = pd.concat([self.data, new_row], ignore_index=True)

        # Fit or update the BKT model using the DataFrame explicitly
        self.model.fit(data=self.data, skills=[skill])

        # Predict mastery probabilities using the DataFrame explicitly
        preds = self.model.predict(data=self.data)
        last_mastery = preds["y_pred"].iloc[-1]

        return last_mastery
