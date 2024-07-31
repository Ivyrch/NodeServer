const express = require('express');
const router = express.Router();
const response = require('../data/response');
const { normalizeString, containsWord } = require('../Utils/utils');

router.get('/', (req, res) => {
    const search = req.query.q ? req.query.q : "";
    console.log(">>>>>>>>>", search);

    const filteredHighlights = response.highlights.filter(item => {
        const simpleTitle = normalizeString(item.title);
        const simpleQueries = item.queries.map(normalizeString);
        return containsWord(simpleTitle, search) || simpleQueries.some(srtQueries => containsWord(srtQueries, search));
    });
    
    const filteredSuggestions = response.suggestions.filter(item =>
        item.includes(search)
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
        res.json({ url: `http://g1.globo.com/busca/?q=${encodeURIComponent(search)}` });
    }
});


module.exports = router;
