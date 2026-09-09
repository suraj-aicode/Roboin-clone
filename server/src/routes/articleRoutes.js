const express = require('express');
const router = express.Router();
const { getArticles, getArticleBySlug, createArticle } = require('../controllers/articleController');

router.get('/', getArticles);
router.get('/:slug', getArticleBySlug);
router.post('/', createArticle);

module.exports = router;
