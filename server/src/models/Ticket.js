const mongoose = require('mongoose');

const TicketSchema = new mongoose.Schema({
  ticketId: { type: String, required: true, unique: true },
  customerName: { type: String, required: true },
  customerEmail: { type: String, required: true },
  category: { 
    type: String, 
    enum: ['Technical Hardware Support', 'Order & Delivery Issue', 'GST Invoicing / Billing', 'Dead on Arrival (DOA)'],
    default: 'Technical Hardware Support'
  },
  priority: {
    type: String,
    enum: ['Low', 'Medium', 'High', 'Critical'],
    default: 'Medium'
  },
  subject: { type: String, required: true },
  description: { type: String, required: true },
  relatedOrderNumber: { type: String, default: '' },
  status: {
    type: String,
    enum: ['Open', 'In Progress', 'Resolved', 'Closed'],
    default: 'Open'
  },
  internalNotes: { type: String, default: '' },
  assignedTo: { type: String, default: 'Unassigned' }
}, { timestamps: true });

module.exports = mongoose.model('Ticket', TicketSchema);
