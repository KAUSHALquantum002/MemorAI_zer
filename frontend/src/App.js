import React, { useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import Flashcard from './components/Flashcard';

// 👉 Import fetchCards (and any other API helpers) here:
import { fetchCards } from './api';


export default function App() {
  const [text, setText] = useState('');
  const [cards, setCards] = useState([]);

  const handleSubmit = async e => {
    e.preventDefault();
    const qas = await fetchCards(text);
    setCards(qas.map(q => ({
      ...q,
      stats: { user_id:'user1', skill:'skill1',
               quality:null, repetitions:0, easiness:2.5,
               interval:0, state:[2.5,0,0], correct:null }
    })));
  };

  return (
    <Container className="p-4">
      <h1>MemorAI</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Control as="textarea" rows={3}
          placeholder="Paste STEM notes here…"
          value={text} onChange={e=>setText(e.target.value)} />
        <Button className="mt-2" type="submit">Generate Flashcards</Button>
      </Form>
      <div className="d-flex flex-wrap">
        {cards.map((c,i)=><Flashcard key={i} card={c}/>)}
      </div>
    </Container>
  );
}
