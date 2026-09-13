const { Review, QuestionAnswer } = require('../models/Review');
const Ticket = require('../models/Ticket');
const RFQ = require('../models/RFQ');
const ReturnRequest = require('../models/ReturnRequest');
const AuditLog = require('../models/AuditLog');
const { sendTicketEmail } = require('../utils/sendEmail');

// @desc Get reviews for a product SKU
exports.getReviews = async (req, res) => {
  try {
    const { sku } = req.params;
    const reviews = await Review.find({ sku, status: 'Approved' }).sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: reviews.length, data: reviews });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc Add a review
exports.createReview = async (req, res) => {
  try {
    const { product, sku, authorName, rating, title, comment, hardwareSetup } = req.body;
    const review = await Review.create({
      product,
      sku,
      authorName,
      rating,
      title,
      comment,
      hardwareSetup,
      isVerifiedPurchase: true,
      status: 'Approved'
    });
    res.status(201).json({ success: true, data: review });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// @desc Get Q&A for a product SKU
exports.getQA = async (req, res) => {
  try {
    const { sku } = req.params;
    const qas = await QuestionAnswer.find({ sku }).sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: qas.length, data: qas });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc Post a question
exports.createQuestion = async (req, res) => {
  try {
    const { product, sku, question, askedBy } = req.body;
    const qa = await QuestionAnswer.create({
      product,
      sku,
      question,
      askedBy,
      answer: 'Thank you for your question. A VoltCart hardware specialist will verify the datasheet specifications and reply shortly.',
      answeredBy: 'VoltCart Tech Support',
      status: 'Answered'
    });
    res.status(201).json({ success: true, data: qa });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// @desc Get all support tickets
exports.getTickets = async (req, res) => {
  try {
    const tickets = await Ticket.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: tickets.length, data: tickets });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc Create support ticket
exports.createTicket = async (req, res) => {
  try {
    const customerName = req.body.customerName || req.body.name || 'Customer';
    const customerEmail = req.body.customerEmail || req.body.email || '';
    const phone = req.body.phone || '';
    const category = req.body.category || 'Technical Hardware Support';
    const priority = req.body.priority || 'Medium';
    const subject = req.body.subject || 'Support Inquiry';
    const description = req.body.description || req.body.message || '';
    const relatedOrderNumber = req.body.relatedOrderNumber || req.body.orderId || '';

    const ticketId = `TCK-2026-${Math.floor(1000 + Math.random() * 9000)}`;

    const ticket = await Ticket.create({
      ticketId,
      customerName,
      customerEmail,
      phone,
      category,
      priority,
      subject,
      description,
      relatedOrderNumber,
      status: 'Open'
    });

    // Send email notification (non-blocking)
    sendTicketEmail({
      ticketId,
      customerName,
      customerEmail,
      phone,
      category,
      subject,
      description,
      relatedOrderNumber
    }).catch(err => console.warn('[Email Dispatch Error]', err.message));

    res.status(201).json({ success: true, data: ticket });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// @desc Update ticket status / internal notes
exports.updateTicket = async (req, res) => {
  try {
    const { status, internalNotes, assignedTo } = req.body;
    const ticket = await Ticket.findByIdAndUpdate(
      req.params.id,
      { status, internalNotes, assignedTo },
      { new: true }
    );
    res.status(200).json({ success: true, data: ticket });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// @desc Get all RFQs
exports.getRFQs = async (req, res) => {
  try {
    const rfqs = await RFQ.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: rfqs.length, data: rfqs });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc Create RFQ
exports.createRFQ = async (req, res) => {
  try {
    const { organizationName, contactPerson, email, phone, gstin, items, targetDeliveryDate, specialRequirements } = req.body;
    const rfqId = `RFQ-2026-${Math.floor(1000 + Math.random() * 9000)}`;

    const rfq = await RFQ.create({
      rfqId,
      organizationName,
      contactPerson,
      email,
      phone,
      gstin: gstin || '',
      items,
      targetDeliveryDate,
      specialRequirements,
      status: 'Submitted'
    });

    res.status(201).json({ success: true, data: rfq });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// @desc Update RFQ quote
exports.updateRFQ = async (req, res) => {
  try {
    const { status, quotedAmount } = req.body;
    const rfq = await RFQ.findByIdAndUpdate(
      req.params.id,
      { status, quotedAmount },
      { new: true }
    );
    res.status(200).json({ success: true, data: rfq });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// @desc Get return requests
exports.getReturnRequests = async (req, res) => {
  try {
    const returns = await ReturnRequest.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: returns.length, data: returns });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc Submit return request
exports.createReturnRequest = async (req, res) => {
  try {
    const { orderNumber, customerName, customerEmail, sku, productTitle, returnType, reason, evidenceNote } = req.body;
    const returnId = `RET-2026-${Math.floor(1000 + Math.random() * 9000)}`;

    const returnReq = await ReturnRequest.create({
      returnId,
      orderNumber,
      customerName,
      customerEmail,
      sku,
      productTitle,
      returnType,
      reason,
      evidenceNote,
      status: 'Requested'
    });

    res.status(201).json({ success: true, data: returnReq });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// @desc Update return status
exports.updateReturnRequest = async (req, res) => {
  try {
    const { status, disposition } = req.body;
    const returnReq = await ReturnRequest.findByIdAndUpdate(
      req.params.id,
      { status, disposition },
      { new: true }
    );
    res.status(200).json({ success: true, data: returnReq });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
