// src/api.js
import { openDB } from 'idb';

export async function fetchCards(text) {
    const res = await fetch('/generate_cards', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text })
    });
    return res.json();
  }
  

export async function scheduleReview(stats) {
  const res = await fetch('/schedule', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(stats)
  });
  return res.json();
}

export async function saveProgress(item) {
  const db = await openDB('memorai-store', 1, {
    upgrade(db) {
      db.createObjectStore('cards', { keyPath: 'id', autoIncrement: true });
    }
  });
  await db.put('cards', item);
}
