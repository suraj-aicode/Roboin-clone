const express = require('express');
const router = express.Router();
const { getAdminKPIs, getAuditLogs } = require('../controllers/adminController');
const { protect, authorize } = require('../middleware/auth');

router.get('/kpis', protect, authorize('admin', 'super_admin'), getAdminKPIs);
router.get('/audit-logs', protect, authorize('admin', 'super_admin'), getAuditLogs);

module.exports = router;
