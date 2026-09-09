const express = require('express');
const router = express.Router();
const {
  getReviews,
  createReview,
  getQA,
  createQuestion,
  getTickets,
  createTicket,
  updateTicket,
  getRFQs,
  createRFQ,
  updateRFQ,
  getReturnRequests,
  createReturnRequest,
  updateReturnRequest
} = require('../controllers/communityController');

// Reviews & Q&A
router.get('/reviews/:sku', getReviews);
router.post('/reviews', createReview);
router.get('/qa/:sku', getQA);
router.post('/qa', createQuestion);

// Support Tickets
router.get('/tickets', getTickets);
router.post('/tickets', createTicket);
router.patch('/tickets/:id', updateTicket);

// RFQ
router.get('/rfqs', getRFQs);
router.post('/rfqs', createRFQ);
router.patch('/rfqs/:id', updateRFQ);

// Returns
router.get('/returns', getReturnRequests);
router.post('/returns', createReturnRequest);
router.patch('/returns/:id', updateReturnRequest);

module.exports = router;
