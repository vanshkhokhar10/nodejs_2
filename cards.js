 
const express = require('express');
const app = express();
 
app.use(express.json());
 
let cards = [
    { id: 1, suit: "hearts", value: "A" },
    { id: 2, suit: "spades", value: "K" },
    { id: 3, suit: "clubs", value: "Q" },
    { id: 4, suit: "diamonds", value: "J" }
];
 
app.get('/', (req, res) => {
    res.send('Welcome to the Playing Card API');
});
 
app.get('/cards', (req, res) => {
    res.status(200).json(cards);
});
 
app.get('/cards/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const card = cards.find(c => c.id === id);
    if (!card) {
        return res.status(404).json({ message: 'Card not found' });
    }
    res.status(200).json(card);
});
 
app.post('/cards', (req, res) => {
    const { suit, value } = req.body;
    const newCard = {
        id: cards.length + 1,
        suit,
        value
    };
    cards.push(newCard);
    res.status(201).json(newCard);
});
 
app.delete('/cards/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = cards.findIndex(c => c.id === id);
    if (index === -1) {
        return res.status(404).json({ message: 'Card not found' });
    }
    const deletedCard = cards.splice(index, 1);
    res.status(200).json({
        message: `Deleted card with ID ${id}`,
        card: deletedCard[0]
    });
});
 
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
