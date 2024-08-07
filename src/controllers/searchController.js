const searchService = require('../services/searchService');

const getSearchResults = (req, res) => {
    const search = req.query.q ? req.query.q : "";

    const { filteredHighlights, filteredSuggestions } = searchService.filterResults(search);

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
};

module.exports = {
    getSearchResults,
};