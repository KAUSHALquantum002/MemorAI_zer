# memorai/backend/drl_scheduler.py
import gym
from stable_baselines3 import DQN

# memorai/backend/drl_scheduler.py

def init_drl_agent():
    """
    Stub for DRL agent.
    We're skipping DRL entirely in this prototype.
    """
    return None

def get_next_interval(state):
    """
    Fallback scheduling heuristic:
      - state = [easiness, repetitions, previous_interval]
      - If the user has at least one repetition and finds it easy (easiness > 2.5),
        multiply last interval by easiness (but at least 1 day).
      - Otherwise, reset interval to 1 day.
    """
    easiness, repetitions, previous_interval = state

    if repetitions > 0 and easiness > 2.5:
        # Grow the interval (but ensure at least 1)
        return max(1, int(previous_interval * easiness))
    else:
        # First review or hard recall → next day
        return 1
