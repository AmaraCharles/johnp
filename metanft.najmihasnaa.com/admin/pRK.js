const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = 3000;

// Middleware
app.use(express.json());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/nftDB', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Connection error', err));

// User Schema
const artworkSchema = new mongoose.Schema({
    transactionId: String,
    title: String,
    description: String,
    price: String,
    from: String,
    category: String,
    status: String,
    views: Number,
    collection: String,
    imgUrl: String
});

const userSchema = new mongoose.Schema({
    _id: String,
    name: String,
    artWorks: [artworkSchema]
});

const User = mongoose.model('User', userSchema);

// Fetch Artwork by User ID and Transaction ID
router.get('/users/art/:_id/:transactionId', async (req, res) => {
    const { _id, transactionId } = req.params;
    try {
        const user = await User.findById(_id);
        if (!user) return res.status(404).json({ success: false, message: 'User not found' });

        const artwork = user.artWorks.find(item => item.transactionId === transactionId);
        if (!artwork) return res.status(404).json({ success: false, message: 'Artwork not found' });

        res.status(200).json({ success: true, data: artwork });
    } catch (error) {
        console.error('Error fetching artwork:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

// Update Artwork Details
app.put('/users/art/:_id/:transactionId', async (req, res) => {
    const { _id, transactionId } = req.params;
    const { from, title, price, imgUrl, category, collection, views, description, status } = req.body;

    try {
        const user = await User.findById(_id);
        if (!user) return res.status(404).json({ success: false, message: 'User not found' });

        const artwork = user.artWorks.find(item => item.transactionId === transactionId);
        if (!artwork) return res.status(404).json({ success: false, message: 'Artwork not found' });

        // Update artwork details
        artwork.from = from;
        artwork.title = title;
        artwork.price = price;
        artwork.imgUrl = imgUrl;
        artwork.category = category;
        artwork.collection = collection;
        artwork.views = views;
        artwork.description = description;
        artwork.status = status;

        await user.save();
        res.status(200).json({ success: true, message: 'Artwork updated successfully' });
    } catch (error) {
        console.error('Error updating artwork:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
