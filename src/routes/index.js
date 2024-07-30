const express = require('express');
const router = express.Router();
const response = require('../data/response');

router.get('/', (req, res) => {
    const query = req.query.q ? req.query.q.toLowerCase() : "";
    console.log(">>>>>>>>>", query);

    const containsWord = (string) => string.includes(query)

    const filteredHighlights = response.highlights.filter(item =>
        item.title.includes(query) || item.queries.some(i => containsWord(i))
    );

    const filteredSuggestions = response.suggestions.filter(item =>
        item.includes(query)
    );

    if (filteredSuggestions.length > 0 || filteredHighlights.length > 0) {
        const highlights = filteredHighlights.map(item => ({
            title: item.title,
            queries: item.queries,
            logo: item.logo,
            url: item.url
        }));
        const suggestions = filteredSuggestions.map(search => ({
            search,
            url: `http://g1.globo.com/busca/?q=${encodeURIComponent(search)}`
        }));
        res.json({ highlights, suggestions });
    } else {
        res.json({ url: `http://g1.globo.com/busca/?q=${encodeURIComponent(query)}` });
    }
});


module.exports = router;
