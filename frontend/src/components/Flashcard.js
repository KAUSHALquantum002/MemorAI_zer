import React, { useState } from 'react';
import { Card, Button } from 'react-bootstrap';
import { scheduleReview, saveProgress } from '../api';

export default function Flashcard({ card }) {
  const [showAns, setShowAns] = useState(false);
  const [st, setSt] = useState(card.stats);

  const recall = async q => {
    // 1. Call scheduleReview with quality and new `correct` flag
    const out = await scheduleReview({
      ...st,
      quality: q,
      correct: q > 0 ? 1 : 0,
      state: st.state
    });

    // 2. Merge updated SM-2 and mastery info
    const updated = {
      ...st,
      repetitions: out.sm2.repetitions,
      easiness:   out.sm2.easiness,
      interval:   out.next_interval,
      mastery:    out.mastery_prob
    };

    // 3. Update local state and persist
    setSt(updated);
    await saveProgress({ question: card.question, stats: updated });

    // 4. Hide the answer again
    setShowAns(false);
  };

  return (
    <Card className="m-2" style={{ width: '18rem' }}>
      <Card.Body>
        <Card.Title dangerouslySetInnerHTML={{ __html: card.question }} />
        {showAns && (
          <Card.Text dangerouslySetInnerHTML={{ __html: card.answer }} />
        )}
        <div>
          <Button onClick={() => setShowAns(!showAns)}>Reveal</Button>{' '}
          <Button onClick={() => recall(5)} variant="success">
            Easy
          </Button>{' '}
          <Button onClick={() => recall(3)} variant="warning">
            Hard
          </Button>{' '}
          <Button onClick={() => recall(0)} variant="danger">
            Forgot
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
}
