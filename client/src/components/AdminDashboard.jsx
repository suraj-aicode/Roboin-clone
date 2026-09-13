import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateProductStock, addProduct } from '../redux/slices/productSlice';
import { updateOrderStatusLocal } from '../redux/slices/orderSlice';
import { updateTicketStatus, updateRFQStatus, updateReturnStatus } from '../redux/slices/communitySlice';
import AnalyticsBI from './AnalyticsBI';
import ArticleEditorModal from './ArticleEditorModal';
import { API_URL } from '../config/api';
import { 
  BarChart3, 
  Package, 
  Warehouse, 
  Clock, 
  ShieldAlert, 
  Plus, 
  Edit3, 
  CheckCircle2, 
  AlertTriangle,
  Building2,
  LifeBuoy,
  RotateCcw,
  TrendingUp,
  BookOpen,
  Tag,
  Truck,
  Star,
  Check,
  X,
  Megaphone,
  ArrowLeftRight,
  Users,
  ShieldCheck,
  Lock
} from 'lucide-react';

export default function AdminDashboard() {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.products);
  const { orders } = useSelector((state) => state.order);
  const { currentRole } = useSelector((state) => state.auth);
  const { rfqs, tickets, returns } = useSelector((state) => state.community);

  const [activeTab, setActiveTab] = useState('overview');
  const [isArticleModalOpen, setIsArticleModalOpen] = useState(false);
  const [cmsArticles, setCmsArticles] = useState([
    {
      _id: 'art-01',
      title: 'Building an Autonomous ROS2 Rover with Raspberry Pi 5 & LiDAR',
      slug: 'autonomous-ros2-rover-raspberry-pi-5',
      category: 'Robotics & Autonomous Systems',
      author: 'Dr. Anita Nair',
      status: 'Published',
      views: 485
    },
    {
      _id: 'art-02',
      title: 'Interfacing ESP32-WROOM with FreeRTOS & MQTT for Industrial Telemetry',
      slug: 'esp32-freertos-mqtt-industrial-telemetry',
      category: 'Embedded Firmware & RTOS',
      author: 'Vikram Joshi',
      status: 'Published',
      views: 340
    }
  ]);
  const [auditLogs, setAuditLogs] = useState([
    {
      id: 'LOG-00101',
      timestamp: new Date().toLocaleTimeString(),
      actor: 'Super Admin',
      action: 'INITIAL_SEED',
      entity: 'DATABASE',
      details: 'System started with 6 components and RBAC accounts.'
    },
    {
      id: 'LOG-00102',
      timestamp: new Date().toLocaleTimeString(),
      actor: 'Rohan Verma (WH-BLR-01)',
      action: 'RESERVE_STOCK',
      entity: 'SKU-ARD-R4-WIFI',
      details: 'Reserved 2x units for order ORD-2026-8941 under concurrency lock.'
    }
  ]);

  // Promotional Coupons State (MOD-16)
  const [coupons, setCoupons] = useState([
    {
      _id: 'cpn-001',
      code: 'VOLT10',
      discountType: 'percentage',
      value: 0.10,
      minOrderAmount: 500,
      usedCount: 42,
      maxUses: 500,
      isActive: true,
      description: '10% discount on orders above ₹500'
    },
    {
      _id: 'cpn-002',
      code: 'MAKER500',
      discountType: 'fixed',
      value: 500,
      minOrderAmount: 2999,
      usedCount: 18,
      maxUses: 200,
      isActive: true,
      description: 'Flat ₹500 discount for institutional orders'
    },
    {
      _id: 'cpn-003',
      code: 'FREESHIP',
      discountType: 'shipping',
      value: 99,
      minOrderAmount: 0,
      usedCount: 88,
      maxUses: 1000,
      isActive: true,
      description: 'Free expedited courier shipping'
    }
  ]);

  // Logistics & Shipments Oversight (MOD-11)
  const [shipments, setShipments] = useState([
    {
      awb: 'AWB-DLH-894102',
      orderNumber: 'ORD-2026-8941',
      carrier: 'Delhivery Surface Express',
      origin: 'WH-BLR-01 (Bengaluru)',
      destination: 'Bengaluru, KA (560100)',
      status: 'Delivered',
      itemsCount: 2
    },
    {
      awb: 'AWB-BLU-402918',
      orderNumber: 'ORD-2026-4029',
      carrier: 'BlueDart Air Express',
      origin: 'WH-BLR-01 (Bengaluru)',
      destination: 'Mumbai, MH (400093)',
      status: 'In Transit',
      itemsCount: 1
    }
  ]);

  // Customer Reviews Moderation (MOD-13)
  const [reviewsList, setReviewsList] = useState([
    {
      id: 'REV-101',
      product: 'Arduino Uno R4 WiFi',
      sku: 'SKU-ARD-R4-WIFI',
      author: 'Rohit K., Maker Lab',
      rating: 5,
      comment: 'The RA4M1 32-bit Cortex-M4 and onboard 12x8 LED matrix are fantastic for rapid robotics prototyping.',
      verified: true,
      status: 'Approved'
    },
    {
      id: 'REV-102',
      product: 'ESP32-WROOM-32U',
      sku: 'SKU-ESP32-WROOM-32U',
      author: 'Ananya S., IoT Engineer',
      rating: 4,
      comment: 'Good WiFi performance and FreeRTOS support. U.FL connector is fragile so handle carefully.',
      verified: true,
      status: 'Approved'
    },
    {
      id: 'REV-103',
      product: 'Raspberry Pi 5',
      sku: 'SKU-RPI-5-8GB',
      author: 'Guest Reviewer',
      rating: 1,
      comment: 'Spam review testing inappropriate content detection filter.',
      verified: false,
      status: 'Pending Moderation'
    }
  ]);

  // Inter-Warehouse Stock Transfers State (MOD-06)
  const [warehouseTransfers, setWarehouseTransfers] = useState([
    {
      id: 'TRF-001',
      sku: 'SKU-ARD-R4-WIFI',
      productTitle: 'Arduino Uno R4 WiFi',
      quantity: 15,
      fromWarehouse: 'WH-BLR-01 (Bengaluru)',
      toWarehouse: 'WH-DEL-02 (Delhi)',
      status: 'In Transit',
      courierPartner: 'Delhivery B2B Logistics',
      initiatedAt: 'Yesterday, 16:30'
    },
    {
      id: 'TRF-002',
      sku: 'SKU-ESP32-WROOM-32U',
      productTitle: 'ESP32-WROOM-32U',
      quantity: 30,
      fromWarehouse: 'WH-DEL-02 (Delhi)',
      toWarehouse: 'WH-BLR-01 (Bengaluru)',
      status: 'Completed',
      courierPartner: 'BlueDart Surface Cargo',
      initiatedAt: '3 days ago'
    }
  ]);

  // Merchandising & Marketing Campaigns (MOD-18)
  const [marketingCampaigns, setMarketingCampaigns] = useState([
    {
      id: 'MKT-01',
      name: 'Autumn Maker Blitz (10% Off)',
      code: 'VOLT10',
      type: 'Discount Coupon',
      clicks: 1420,
      redemptions: 42,
      status: 'Active'
    },
    {
      id: 'MKT-02',
      name: 'Abandoned Cart Automated Recovery',
      code: 'COMEBACK10',
      type: 'Behavioral Trigger',
      clicks: 340,
      redemptions: 19,
      status: 'Active'
    },
    {
      id: 'MKT-03',
      name: 'B2B Institutional Laboratory Bulk Pack',
      code: 'MAKER500',
      type: 'B2B Segmented',
      clicks: 85,
      redemptions: 18,
      status: 'Active'
    }
  ]);

  // Staff & User Access State (MOD-23 / Super Admin Exclusive)
  const [usersList, setUsersList] = useState([
    {
      id: 'USR-01',
      name: 'Super Admin',
      email: 'admin@voltcart.in',
      role: 'super_admin',
      organization: 'VoltCart HQ',
      status: 'Active',
      lastLogin: 'Today, 11:30 AM'
    },
    {
      id: 'USR-02',
      name: 'Arjun Mehta (Admin)',
      email: 'admin.ops@voltcart.in',
      role: 'admin',
      organization: 'VoltCart Operations HQ',
      status: 'Active',
      lastLogin: 'Today, 10:15 AM'
    },
    {
      id: 'USR-03',
      name: 'Kavita Iyer (Catalog)',
      email: 'catalog@voltcart.in',
      role: 'catalog_manager',
      organization: 'VoltCart Logistics',
      status: 'Active',
      lastLogin: 'Yesterday'
    },
    {
      id: 'USR-04',
      name: 'Rohan Verma (Inventory)',
      email: 'inventory@voltcart.in',
      role: 'inventory_manager',
      organization: 'VoltCart WH-BLR-01',
      status: 'Active',
      lastLogin: '2 days ago'
    },
    {
      id: 'USR-05',
      name: 'Satya Prakash (Maker Customer)',
      email: 'customer@voltcart.in',
      role: 'customer',
      organization: 'Apex Robotics Lab',
      status: 'Active',
      lastLogin: 'Today, 12:10 PM'
    }
  ]);

  // RBAC Permission Evaluator (SRS Section 12 & MOD-23)
  const canAccess = (tab) => {
    // 1. Customers and Guests have NO access to any administrative module
    if (!currentRole || currentRole === 'customer' || currentRole === 'guest') {
      return false;
    }

    // 2. Super Admin has unrestricted access to everything including audit & user management
    if (currentRole === 'super_admin') {
      return true;
    }

    // 3. Admin has access to operational modules EXCEPT Super Admin exclusives (Audit Log & User Management)
    if (currentRole === 'admin') {
      const superAdminOnlyTabs = ['audit', 'users'];
      return !superAdminOnlyTabs.includes(tab);
    }

    // 4. Department Staff Managers
    if (currentRole === 'catalog_manager') return ['products', 'cms', 'reviews'].includes(tab);
    if (currentRole === 'inventory_manager') return ['inventory', 'shipping'].includes(tab);
    if (currentRole === 'order_manager') return ['orders', 'shipping', 'returns', 'coupons'].includes(tab);
    if (currentRole === 'support_agent') return ['tickets', 'returns', 'reviews'].includes(tab);
    if (currentRole === 'marketing_manager') return ['overview', 'marketing', 'coupons', 'cms'].includes(tab);

    return false;
  };

  const handleUpdateUserRole = (userId, newRole) => {
    setUsersList(prev => prev.map(u => u.id === userId ? { ...u, role: newRole } : u));
    setAuditLogs(prev => [{
      id: `LOG-${Date.now().toString().slice(-5)}`,
      timestamp: new Date().toLocaleTimeString(),
      actor: 'Super Admin',
      action: 'UPDATE_USER_ROLE',
      entity: userId,
      details: `Changed role of user ${userId} to ${newRole.toUpperCase()}.`
    }, ...prev]);
  };

  const handleInitiateTransfer = () => {
    const sku = prompt("Enter SKU Code to Transfer (e.g. SKU-ARD-R4-WIFI):", "SKU-ARD-R4-WIFI");
    if (!sku) return;
    const qty = parseInt(prompt("Transfer Quantity (units):", "10"), 10);
    if (isNaN(qty) || qty <= 0) return;
    const fromWH = prompt("Source Warehouse:", "WH-BLR-01 (Bengaluru)");
    const toWH = prompt("Destination Warehouse:", "WH-DEL-02 (Delhi)");

    const newTransfer = {
      id: `TRF-00${warehouseTransfers.length + 1}`,
      sku: sku.toUpperCase(),
      productTitle: products.find(p => p.sku === sku.toUpperCase())?.title || 'Component Hardware',
      quantity: qty,
      fromWarehouse: fromWH,
      toWarehouse: toWH,
      status: 'In Transit',
      courierPartner: 'Delhivery B2B Freight',
      initiatedAt: 'Just now'
    };

    setWarehouseTransfers(prev => [newTransfer, ...prev]);

    setAuditLogs(prev => [{
      id: `LOG-${Date.now().toString().slice(-5)}`,
      timestamp: new Date().toLocaleTimeString(),
      actor: currentRole.toUpperCase(),
      action: 'STOCK_TRANSFER_INITIATED',
      entity: sku.toUpperCase(),
      details: `Initiated transfer of ${qty} units from ${fromWH} to ${toWH} under ${newTransfer.id}.`
    }, ...prev]);
  };

  const handleToggleCoupon = async (id) => {
    setCoupons(prev => prev.map(c => c._id === id ? { ...c, isActive: !c.isActive } : c));
    try {
      await fetch(`${API_URL}/api/coupons/${id}/toggle`, { method: 'PATCH' });
    } catch {}
  };

  const handleAddCoupon = () => {
    const code = prompt("Enter Promo Code (e.g. ROBO25):");
    if (!code) return;
    const value = parseFloat(prompt("Enter Discount Value (e.g. 0.25 for 25% or 200 for ₹200):", "0.20"));
    const minOrder = parseFloat(prompt("Enter Minimum Order Amount in INR:", "1000"));
    if (code && !isNaN(value)) {
      const newC = {
        _id: `cpn-${Date.now()}`,
        code: code.trim().toUpperCase(),
        discountType: value < 1 ? 'percentage' : 'fixed',
        value,
        minOrderAmount: minOrder || 0,
        usedCount: 0,
        maxUses: 500,
        isActive: true,
        description: `${value < 1 ? `${Math.round(value*100)}%` : `₹${value}`} Promo Discount`
      };
      setCoupons(prev => [newC, ...prev]);
      try {
        fetch(`${API_URL}/api/coupons`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newC)
        });
      } catch {}
    }
  };

  const handleReviewStatus = (id, newStatus) => {
    setReviewsList(prev => prev.map(r => r.id === id ? { ...r, status: newStatus } : r));
  };

  // KPIs
  const totalRevenue = orders.reduce((sum, o) => sum + (o.totalAmount || 0), 0);
  const totalOrders = orders.length;
  const lowStockProducts = products.filter(p => (p.stockOnHand - (p.stockReserved || 0)) < 25);
  const totalReserved = products.reduce((sum, p) => sum + (p.stockReserved || 0), 0);

  // Stock Adjustment Handler (FR-INV-103)
  const handleStockAdjustment = async (product) => {
    const newStock = prompt(`Update On-Hand Stock for ${product.title} (Current: ${product.stockOnHand}):`, product.stockOnHand);
    if (newStock !== null && !isNaN(parseInt(newStock))) {
      const reason = prompt("Enter mandatory audit reason for stock adjustment (FR-INV-103):", "Physical inventory count adjustment");
      if (reason) {
        const val = parseInt(newStock, 10);
        
        // Dispatch local Redux update
        dispatch(updateProductStock({ id: product._id, stockOnHand: val }));

        // Add to audit trail (FR-PLAT-003)
        setAuditLogs(prev => [{
          id: `LOG-${Date.now().toString().slice(-5)}`,
          timestamp: new Date().toLocaleTimeString(),
          actor: currentRole.toUpperCase(),
          action: 'ADJUST_STOCK',
          entity: product.sku,
          details: `Changed stock from ${product.stockOnHand} to ${val}. Reason: ${reason}`
        }, ...prev]);

        // Attempt server update
        try {
          await fetch(`${API_URL}/api/products/${product._id}/stock`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ stockOnHand: val, reason })
          });
        } catch (e) {
          console.warn('Offline stock update', e);
        }
      }
    }
  };

  // Order Status Transition (MOD-10)
  const handleStatusTransition = async (orderId, newStatus) => {
    dispatch(updateOrderStatusLocal({ orderId, status: newStatus }));

    setAuditLogs(prev => [{
      id: `LOG-${Date.now().toString().slice(-5)}`,
      timestamp: new Date().toLocaleTimeString(),
      actor: currentRole.toUpperCase(),
      action: 'ORDER_STATUS_TRANSITION',
      entity: orderId,
      details: `Transitioned order state to ${newStatus}`
    }, ...prev]);

    try {
      await fetch(`${API_URL}/api/orders/${orderId}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });
    } catch (e) {
      console.warn('Offline status update', e);
    }
  };

  // Add Product Prompt
  const handleAddProduct = () => {
    const title = prompt("Product Title:", "ESP32-S3 AI Vision Development Board");
    if (!title) return;
    const sku = prompt("Unique SKU:", `SKU-ESP32-S3-${Math.floor(100 + Math.random() * 900)}`);
    if (!sku) return;
    const price = parseFloat(prompt("Price (INR excl. GST):", "599"));
    const stock = parseInt(prompt("Initial On-Hand Stock:", "50"), 10);

    if (title && sku && !isNaN(price) && !isNaN(stock)) {
      const newProd = {
        _id: `prod_custom_${Date.now()}`,
        title,
        sku: sku.toUpperCase(),
        category: 'microcontrollers',
        brand: 'Espressif Systems',
        price,
        gstRate: 0.18,
        hsnCode: '85423190',
        stockOnHand: stock,
        stockReserved: 0,
        warehouse: 'WH-BLR-01',
        image: '/assets/images/esp32_dev_board.jpg',
        description: 'Next-gen ESP32-S3 dual-core microcontroller with vector instructions for AI edge models.',
        specs: {
          'Processor': 'ESP32-S3 Dual-Core LX7 @ 240 MHz',
          'AI Acceleration': 'Vector Instructions Supported',
          'Operating Voltage': '3.3V'
        }
      };

      dispatch(addProduct(newProd));

      setAuditLogs(prev => [{
        id: `LOG-${Date.now().toString().slice(-5)}`,
        timestamp: new Date().toLocaleTimeString(),
        actor: currentRole.toUpperCase(),
        action: 'CREATE_PRODUCT',
        entity: sku,
        details: `Created new product ${title} at ₹${price}`
      }, ...prev]);
    }
  };

  // Customer & Guest Protection Guard (MOD-23)
  if (!currentRole || currentRole === 'customer' || currentRole === 'guest') {
    return (
      <div style={{
        maxWidth: '620px',
        margin: '60px auto',
        padding: '36px',
        backgroundColor: '#FFFFFF',
        borderRadius: '16px',
        border: '1px solid #FCA5A5',
        boxShadow: '0 20px 25px -5px rgba(239, 68, 68, 0.1)',
        textAlign: 'center'
      }}>
        <div style={{
          width: '64px',
          height: '64px',
          borderRadius: '50%',
          backgroundColor: '#FEE2E2',
          color: '#DC2626',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 20px'
        }}>
          <ShieldAlert size={32} />
        </div>
        <h2 style={{ fontSize: '22px', fontWeight: 800, color: '#991B1B', marginBottom: '8px' }}>
          Access Restricted (403 Forbidden)
        </h2>
        <p style={{ color: '#64748B', fontSize: '14px', lineHeight: '1.6', marginBottom: '24px' }}>
          Your current account is registered as a <strong>Customer</strong>. Customers have access to storefront shopping, order tracking, and GST tax invoices. Administrative back-office portals are strictly restricted to verified staff and administrators.
        </p>
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
          <button
            className="robu-btn-primary"
            onClick={() => dispatch(setAdminView('storefront'))}
          >
            Return to Storefront
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-layout">
      {/* Sidebar Tabs */}
      <aside className="admin-sidebar">
        {/* Role Header Indicator */}
        <div style={{
          padding: '0.75rem',
          marginBottom: '0.75rem',
          borderRadius: '8px',
          backgroundColor: currentRole === 'super_admin' ? '#F3E8FF' : currentRole === 'admin' ? '#EFF6FF' : '#F1F5F9',
          border: `1px solid ${currentRole === 'super_admin' ? '#DDD6FE' : currentRole === 'admin' ? '#BFDBFE' : '#E2E8F0'}`
        }}>
          <div style={{ fontSize: '0.68rem', textTransform: 'uppercase', fontWeight: 700, color: currentRole === 'super_admin' ? '#7C3AED' : currentRole === 'admin' ? '#2563EB' : '#475569' }}>
            Current Portal Access
          </div>
          <div style={{ fontSize: '0.85rem', fontWeight: 800, color: '#0F172A', marginTop: '3px', display: 'flex', alignItems: 'center', gap: '6px' }}>
            {currentRole === 'super_admin' && '🛡️ Super Administrator'}
            {currentRole === 'admin' && '⚙️ Operations Admin'}
            {currentRole === 'catalog_manager' && '📦 Catalog Manager'}
            {currentRole === 'inventory_manager' && '🏭 Inventory Manager'}
            {currentRole === 'order_manager' && '📋 Order Manager'}
            {currentRole === 'support_agent' && '🎧 Support Agent'}
            {currentRole === 'marketing_manager' && '📣 Marketing Lead'}
          </div>
        </div>

        <div style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', padding: '0.4rem 0.5rem', letterSpacing: '0.05em' }}>
          Operational Modules
        </div>
        {canAccess('overview') && (
          <button 
            className={`admin-nav-item ${activeTab === 'overview' ? 'active' : ''}`}
            onClick={() => setActiveTab('overview')}
          >
            <BarChart3 size={16} /> Overview & KPIs
          </button>
        )}
        {canAccess('products') && (
          <button 
            className={`admin-nav-item ${activeTab === 'products' ? 'active' : ''}`}
            onClick={() => setActiveTab('products')}
          >
            <Package size={16} /> Product Catalog (MOD-03)
          </button>
        )}
        {canAccess('inventory') && (
          <button 
            className={`admin-nav-item ${activeTab === 'inventory' ? 'active' : ''}`}
            onClick={() => setActiveTab('inventory')}
          >
            <Warehouse size={16} /> Stock Control (MOD-06)
          </button>
        )}
        {canAccess('orders') && (
          <button 
            className={`admin-nav-item ${activeTab === 'orders' ? 'active' : ''}`}
            onClick={() => setActiveTab('orders')}
          >
            <Clock size={16} /> Order Lifecycle (MOD-10)
          </button>
        )}
        {canAccess('shipping') && (
          <button 
            className={`admin-nav-item ${activeTab === 'shipping' ? 'active' : ''}`}
            onClick={() => setActiveTab('shipping')}
          >
            <Truck size={16} /> Shipping & Logistics (MOD-11)
          </button>
        )}
        {canAccess('coupons') && (
          <button 
            className={`admin-nav-item ${activeTab === 'coupons' ? 'active' : ''}`}
            onClick={() => setActiveTab('coupons')}
          >
            <Tag size={16} /> Coupons & Promo (MOD-16)
          </button>
        )}
        {canAccess('marketing') && (
          <button 
            className={`admin-nav-item ${activeTab === 'marketing' ? 'active' : ''}`}
            onClick={() => setActiveTab('marketing')}
          >
            <Megaphone size={16} /> Marketing & Campaigns (MOD-18)
          </button>
        )}
        {canAccess('reviews') && (
          <button 
            className={`admin-nav-item ${activeTab === 'reviews' ? 'active' : ''}`}
            onClick={() => setActiveTab('reviews')}
          >
            <Star size={16} /> Reviews Moderation (MOD-13)
          </button>
        )}
        {canAccess('rfqs') && (
          <button 
            className={`admin-nav-item ${activeTab === 'rfqs' ? 'active' : ''}`}
            onClick={() => setActiveTab('rfqs')}
          >
            <Building2 size={16} /> B2B RFQ Quotes ({rfqs.length})
          </button>
        )}
        {canAccess('tickets') && (
          <button 
            className={`admin-nav-item ${activeTab === 'tickets' ? 'active' : ''}`}
            onClick={() => setActiveTab('tickets')}
          >
            <LifeBuoy size={16} /> Support Tickets ({tickets.length})
          </button>
        )}
        {canAccess('returns') && (
          <button 
            className={`admin-nav-item ${activeTab === 'returns' ? 'active' : ''}`}
            onClick={() => setActiveTab('returns')}
          >
            <RotateCcw size={16} /> Returns / RMA ({returns.length})
          </button>
        )}
        {canAccess('analytics') && (
          <button 
            className={`admin-nav-item ${activeTab === 'analytics' ? 'active' : ''}`}
            onClick={() => setActiveTab('analytics')}
          >
            <TrendingUp size={16} /> Analytics & BI (MOD-19)
          </button>
        )}
        {canAccess('cms') && (
          <button 
            className={`admin-nav-item ${activeTab === 'cms' ? 'active' : ''}`}
            onClick={() => setActiveTab('cms')}
          >
            <BookOpen size={16} /> Tutorial CMS (MOD-17)
          </button>
        )}
        {canAccess('audit') && (
          <button 
            className={`admin-nav-item ${activeTab === 'audit' ? 'active' : ''}`}
            onClick={() => setActiveTab('audit')}
          >
            <ShieldAlert size={16} /> Audit Trail (MOD-23)
          </button>
        )}
        {canAccess('users') && (
          <button 
            className={`admin-nav-item ${activeTab === 'users' ? 'active' : ''}`}
            onClick={() => setActiveTab('users')}
          >
            <Users size={16} /> User & Role Authority (MOD-23)
          </button>
        )}
      </aside>

      {/* Main Content Area */}
      <section>
        {activeTab === 'overview' && (
          <div>
            <h2 style={{ fontSize: '1.45rem', fontWeight: 800, marginBottom: '0.3rem' }}>
              Operational Overview
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '1.5rem' }}>
              Real-time server-authoritative e-commerce statistics and warehouse stock health.
            </p>

            <div className="kpi-grid">
              <div className="kpi-card">
                <div className="kpi-label">Total Commercial Revenue</div>
                <div className="kpi-val" style={{ color: 'var(--primary)' }}>
                  ₹{totalRevenue.toLocaleString('en-IN', { maximumFractionDigits: 2 })}
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--success)' }}>
                  ↑ Verified GST Invoices
                </div>
              </div>

              <div className="kpi-card">
                <div className="kpi-label">Commercial Orders</div>
                <div className="kpi-val">{totalOrders}</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                  Active Order State Machine
                </div>
              </div>

              <div className="kpi-card">
                <div className="kpi-label">Low Stock Alerts</div>
                <div className="kpi-val" style={{ color: 'var(--warning)' }}>
                  {lowStockProducts.length}
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--warning)' }}>
                  SKUs &lt; 25 Available Units
                </div>
              </div>

              <div className="kpi-card">
                <div className="kpi-label">Reserved Inventory</div>
                <div className="kpi-val">{totalReserved}</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                  Active Checkout Locks
                </div>
              </div>
            </div>

            <h3 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: '0.85rem' }}>
              Recent Orders
            </h3>
            <div className="data-table-wrap">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Order #</th>
                    <th>Customer Name</th>
                    <th>State</th>
                    <th>Total (INR)</th>
                    <th>Payment</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map(o => (
                    <tr key={o._id || o.orderNumber}>
                      <td className="mono" style={{ color: 'var(--primary)', fontWeight: 700 }}>
                        {o.orderNumber}
                      </td>
                      <td>{o.customerName}</td>
                      <td>{o.shippingAddress?.state || o.state || 'Karnataka'}</td>
                      <td style={{ fontWeight: 800 }}>₹{o.totalAmount.toFixed(2)}</td>
                      <td><span className="badge badge-success">{o.paymentDetails?.status || 'Paid'}</span></td>
                      <td><span className="badge badge-cyan">{o.status}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'products' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
              <div>
                <h2 style={{ fontSize: '1.45rem', fontWeight: 800 }}>Catalog & Product CRUD (MOD-03)</h2>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.82rem' }}>
                  Manage SKUs, technical parameters, HSN codes, and base pricing.
                </p>
              </div>
              <button className="btn btn-primary" onClick={handleAddProduct}>
                <Plus size={15} /> Add New SKU
              </button>
            </div>

            <div className="data-table-wrap">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Image</th>
                    <th>Title & SKU</th>
                    <th>Category</th>
                    <th>Base Rate</th>
                    <th>HSN</th>
                    <th>Stock</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map(p => (
                    <tr key={p._id || p.sku}>
                      <td>
                        <img src={p.image} alt={p.title} style={{ width: '38px', height: '38px', objectFit: 'cover', borderRadius: '4px' }} />
                      </td>
                      <td>
                        <div style={{ fontWeight: 700 }}>{p.title}</div>
                        <div className="mono" style={{ fontSize: '0.72rem', color: 'var(--text-dim)' }}>{p.sku}</div>
                      </td>
                      <td><span className="badge badge-indigo">{p.category}</span></td>
                      <td style={{ fontWeight: 700 }}>₹{p.price}</td>
                      <td className="mono">{p.hsnCode}</td>
                      <td>
                        <span className={`badge ${p.stockOnHand > 25 ? 'badge-success' : 'badge-warning'}`}>
                          {p.stockOnHand} on-hand
                        </span>
                      </td>
                      <td>
                        <button className="btn btn-outline btn-sm" onClick={() => handleStockAdjustment(p)}>
                          <Edit3 size={13} /> Stock
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'inventory' && (
          <div>
            <h2 style={{ fontSize: '1.45rem', fontWeight: 800, marginBottom: '0.3rem' }}>
              Inventory Control & Warehouse (MOD-06)
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.82rem', marginBottom: '1.5rem' }}>
              Formula: <strong>Available = On-Hand minus Reserved (FR-INV-101)</strong>
            </p>

            <div className="data-table-wrap">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>SKU Code</th>
                    <th>Component Title</th>
                    <th>Warehouse</th>
                    <th>On-Hand</th>
                    <th>Reserved</th>
                    <th>Available</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map(p => {
                    const avail = p.stockOnHand - (p.stockReserved || 0);
                    return (
                      <tr key={p._id || p.sku}>
                        <td className="mono" style={{ color: 'var(--primary)', fontWeight: 700 }}>{p.sku}</td>
                        <td style={{ fontWeight: 600 }}>{p.title}</td>
                        <td><span className="badge badge-cyan">{p.warehouse || 'WH-BLR-01'}</span></td>
                        <td style={{ fontWeight: 700 }}>{p.stockOnHand}</td>
                        <td style={{ color: 'var(--warning)', fontWeight: 600 }}>{p.stockReserved || 0}</td>
                        <td>
                          <strong style={{ color: avail > 0 ? 'var(--success)' : 'var(--danger)' }}>
                            {avail}
                          </strong>
                        </td>
                        <td>
                          <button className="btn btn-primary btn-sm" onClick={() => handleStockAdjustment(p)}>
                            Adjust Stock
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Inter-Warehouse Stock Transfers Panel (MOD-06) */}
            <div style={{ marginTop: '2rem', borderTop: '1px solid var(--border-color)', paddingTop: '1.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <div>
                  <h3 style={{ fontSize: '1.15rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                    <ArrowLeftRight size={18} style={{ color: 'var(--primary)' }} /> Inter-Warehouse Stock Transfers (MOD-06)
                  </h3>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>
                    Coordinate stock redistribution between regional hubs (WH-BLR-01 & WH-DEL-02) with audit compliance.
                  </p>
                </div>
                <button className="btn btn-primary btn-sm" onClick={handleInitiateTransfer} style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                  <Plus size={14} /> Initiate Warehouse Transfer
                </button>
              </div>

              <div className="data-table-wrap">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Transfer ID</th>
                      <th>SKU & Component</th>
                      <th>Qty</th>
                      <th>Source Hub</th>
                      <th>Destination Hub</th>
                      <th>Logistics Carrier</th>
                      <th>Transfer Status</th>
                      <th>Initiated</th>
                    </tr>
                  </thead>
                  <tbody>
                    {warehouseTransfers.map(t => (
                      <tr key={t.id}>
                        <td className="mono" style={{ fontWeight: 700, color: 'var(--primary)' }}>{t.id}</td>
                        <td>
                          <div style={{ fontWeight: 600 }}>{t.productTitle}</div>
                          <div className="mono" style={{ fontSize: '0.72rem', color: 'var(--text-dim)' }}>{t.sku}</div>
                        </td>
                        <td style={{ fontWeight: 700 }}>{t.quantity} units</td>
                        <td><span className="badge badge-cyan">{t.fromWarehouse}</span></td>
                        <td><span className="badge badge-indigo">{t.toWarehouse}</span></td>
                        <td style={{ fontSize: '0.8rem' }}>{t.courierPartner}</td>
                        <td>
                          <span className={`badge ${t.status === 'Completed' ? 'badge-success' : 'badge-warning'}`}>
                            {t.status}
                          </span>
                        </td>
                        <td style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{t.initiatedAt}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'orders' && (
          <div>
            <h2 style={{ fontSize: '1.45rem', fontWeight: 800, marginBottom: '0.3rem' }}>
              Order Lifecycle State Machine (MOD-10)
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.82rem', marginBottom: '1.5rem' }}>
              Transition orders through validated lifecycle stages: Processing → Shipped → Delivered / Cancelled.
            </p>

            <div className="data-table-wrap">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Order #</th>
                    <th>Customer Details</th>
                    <th>State</th>
                    <th>Grand Total</th>
                    <th>Shipment Tracking</th>
                    <th>Current Status</th>
                    <th>Transition</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map(o => (
                    <tr key={o._id || o.orderNumber}>
                      <td className="mono" style={{ color: 'var(--primary)', fontWeight: 700 }}>{o.orderNumber}</td>
                      <td>
                        <div style={{ fontWeight: 600 }}>{o.customerName}</div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{o.customerEmail}</div>
                      </td>
                      <td>{o.shippingAddress?.state || o.state || 'Karnataka'}</td>
                      <td style={{ fontWeight: 800 }}>₹{o.totalAmount.toFixed(2)}</td>
                      <td>
                        <div style={{ fontSize: '0.8rem' }}>{o.shipment?.carrier || 'Delhivery'}</div>
                        <div className="mono" style={{ fontSize: '0.72rem', color: 'var(--primary)' }}>
                          {o.shipment?.trackingNumber || 'DEL-PENDING'}
                        </div>
                      </td>
                      <td>
                        <span className={`badge ${
                          o.status === 'Delivered' ? 'badge-success' :
                          o.status === 'Shipped' ? 'badge-cyan' :
                          o.status === 'Cancelled' ? 'badge-danger' : 'badge-warning'
                        }`}>
                          {o.status}
                        </span>
                      </td>
                      <td>
                        <select 
                          className="form-control"
                          style={{ padding: '0.2rem 0.5rem', fontSize: '0.78rem' }}
                          value={o.status}
                          onChange={(e) => handleStatusTransition(o._id || o.orderNumber, e.target.value)}
                        >
                          <option value="Processing">Processing</option>
                          <option value="Shipped">Shipped</option>
                          <option value="Delivered">Delivered</option>
                          <option value="Cancelled">Cancelled</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'audit' && (
          <div>
            <h2 style={{ fontSize: '1.45rem', fontWeight: 800, marginBottom: '0.3rem' }}>
              Tamper-Evident Audit Trail (MOD-23 & FR-PLAT-003)
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.82rem', marginBottom: '1.5rem' }}>
              Append-only audit trail capturing administrative modifications, price shifts, and inventory allocations.
            </p>

            <div className="data-table-wrap">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Log ID</th>
                    <th>Time</th>
                    <th>Actor</th>
                    <th>Action</th>
                    <th>Entity</th>
                    <th>Details</th>
                  </tr>
                </thead>
                <tbody>
                  {auditLogs.map(l => (
                    <tr key={l.id}>
                      <td className="mono" style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>{l.id}</td>
                      <td style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{l.timestamp}</td>
                      <td><span className="badge badge-indigo">{l.actor}</span></td>
                      <td><strong style={{ color: 'var(--primary)' }}>{l.action}</strong></td>
                      <td className="mono" style={{ fontSize: '0.78rem' }}>{l.entity}</td>
                      <td style={{ fontSize: '0.82rem' }}>{l.details}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'rfqs' && (
          <div>
            <h2 style={{ fontSize: '1.45rem', fontWeight: 800, marginBottom: '0.3rem' }}>
              Institutional B2B RFQ Quotations (MOD-21)
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.82rem', marginBottom: '1.5rem' }}>
              Review bulk quotations from universities, robotics startups, and corporate labs.
            </p>

            <div className="data-table-wrap">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>RFQ ID</th>
                    <th>Institution & Contact</th>
                    <th>Requested Item & Qty</th>
                    <th>Target Date</th>
                    <th>Quoted Total</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {rfqs.map(r => (
                    <tr key={r._id || r.rfqId}>
                      <td className="mono" style={{ color: 'var(--primary)', fontWeight: 700 }}>{r.rfqId}</td>
                      <td>
                        <div style={{ fontWeight: 600 }}>{r.organizationName}</div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{r.contactPerson} ({r.email})</div>
                      </td>
                      <td>
                        {r.items?.map((it, idx) => (
                          <div key={idx} style={{ fontSize: '0.82rem' }}>
                            <strong>{it.quantity}x</strong> {it.title} (<span className="mono">{it.sku}</span>)
                          </div>
                        ))}
                      </td>
                      <td style={{ fontSize: '0.8rem' }}>{new Date(r.targetDeliveryDate).toLocaleDateString()}</td>
                      <td style={{ fontWeight: 700, color: 'var(--primary)' }}>
                        {r.quotedAmount ? `₹${r.quotedAmount.toLocaleString('en-IN')}` : 'Pending Quote'}
                      </td>
                      <td>
                        <span className={`badge ${
                          r.status === 'Accepted' ? 'badge-success' :
                          r.status === 'Quoted' ? 'badge-cyan' : 'badge-warning'
                        }`}>
                          {r.status}
                        </span>
                      </td>
                      <td>
                        <select 
                          className="form-control"
                          style={{ padding: '0.2rem 0.5rem', fontSize: '0.78rem' }}
                          value={r.status}
                          onChange={(e) => dispatch(updateRFQStatus({ rfqId: r.rfqId, status: e.target.value }))}
                        >
                          <option value="Submitted">Submitted</option>
                          <option value="Under Review">Under Review</option>
                          <option value="Quoted">Quoted</option>
                          <option value="Accepted">Accepted</option>
                          <option value="Rejected">Rejected</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'tickets' && (
          <div>
            <h2 style={{ fontSize: '1.45rem', fontWeight: 800, marginBottom: '0.3rem' }}>
              Customer Support & Hardware Diagnostics (MOD-15)
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.82rem', marginBottom: '1.5rem' }}>
              Triage technical hardware troubleshooting queries, DOA claims, and billing questions.
            </p>

            <div className="data-table-wrap">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Ticket ID</th>
                    <th>Customer</th>
                    <th>Category</th>
                    <th>Priority</th>
                    <th>Subject & Inquiry</th>
                    <th>Status</th>
                    <th>Transition</th>
                  </tr>
                </thead>
                <tbody>
                  {tickets.map(t => (
                    <tr key={t._id || t.ticketId}>
                      <td className="mono" style={{ color: 'var(--primary)', fontWeight: 700 }}>{t.ticketId}</td>
                      <td>
                        <div style={{ fontWeight: 600 }}>{t.customerName}</div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{t.customerEmail}</div>
                      </td>
                      <td><span className="badge badge-indigo">{t.category}</span></td>
                      <td>
                        <span className={`badge ${
                          t.priority === 'Critical' ? 'badge-danger' :
                          t.priority === 'High' ? 'badge-warning' : 'badge-cyan'
                        }`}>
                          {t.priority}
                        </span>
                      </td>
                      <td>
                        <div style={{ fontWeight: 700, fontSize: '0.82rem' }}>{t.subject}</div>
                        <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', maxWidth: '300px' }}>{t.description}</div>
                      </td>
                      <td>
                        <span className={`badge ${
                          t.status === 'Resolved' ? 'badge-success' :
                          t.status === 'In Progress' ? 'badge-cyan' : 'badge-warning'
                        }`}>
                          {t.status}
                        </span>
                      </td>
                      <td>
                        <select 
                          className="form-control"
                          style={{ padding: '0.2rem 0.5rem', fontSize: '0.78rem' }}
                          value={t.status}
                          onChange={(e) => dispatch(updateTicketStatus({ ticketId: t.ticketId, status: e.target.value }))}
                        >
                          <option value="Open">Open</option>
                          <option value="In Progress">In Progress</option>
                          <option value="Resolved">Resolved</option>
                          <option value="Closed">Closed</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'returns' && (
          <div>
            <h2 style={{ fontSize: '1.45rem', fontWeight: 800, marginBottom: '0.3rem' }}>
              Returns, Replacements & RMA Inspections (MOD-12)
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.82rem', marginBottom: '1.5rem' }}>
              Inspect and authorize customer return requests and reverse pickup dispatching.
            </p>

            <div className="data-table-wrap">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Return ID</th>
                    <th>Order #</th>
                    <th>Customer</th>
                    <th>Component</th>
                    <th>Reason</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {returns.map(ret => (
                    <tr key={ret._id || ret.returnId}>
                      <td className="mono" style={{ color: 'var(--primary)', fontWeight: 700 }}>{ret.returnId}</td>
                      <td className="mono">{ret.orderNumber}</td>
                      <td>
                        <div style={{ fontWeight: 600 }}>{ret.customerName}</div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{ret.customerEmail}</div>
                      </td>
                      <td>
                        <div style={{ fontWeight: 600 }}>{ret.productTitle}</div>
                        <div className="mono" style={{ fontSize: '0.72rem', color: 'var(--primary)' }}>{ret.sku}</div>
                      </td>
                      <td>
                        <div style={{ fontSize: '0.82rem', fontWeight: 600 }}>{ret.reason}</div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{ret.evidenceNote}</div>
                      </td>
                      <td>
                        <span className={`badge ${
                          ret.status === 'Resolved' || ret.status === 'Approved' ? 'badge-success' :
                          ret.status === 'Pickup Scheduled' ? 'badge-cyan' : 'badge-warning'
                        }`}>
                          {ret.status}
                        </span>
                      </td>
                      <td>
                        <select 
                          className="form-control"
                          style={{ padding: '0.2rem 0.5rem', fontSize: '0.78rem' }}
                          value={ret.status}
                          onChange={(e) => dispatch(updateReturnStatus({ returnId: ret.returnId, status: e.target.value }))}
                        >
                          <option value="Requested">Requested</option>
                          <option value="Approved">Approved</option>
                          <option value="Pickup Scheduled">Pickup Scheduled</option>
                          <option value="Inspected">Inspected</option>
                          <option value="Resolved">Resolved</option>
                          <option value="Rejected">Rejected</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'analytics' && (
          <AnalyticsBI />
        )}

        {activeTab === 'cms' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
              <div>
                <h2 style={{ fontSize: '1.45rem', fontWeight: 800 }}>Tutorial CMS & Educational Content (MOD-17)</h2>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.82rem' }}>
                  Publish hardware build logs, code snippets, and firmware tutorials to the storefront.
                </p>
              </div>
              <button className="btn btn-primary" onClick={() => setIsArticleModalOpen(true)}>
                <Plus size={15} /> Publish New Tutorial
              </button>
            </div>

            <div className="data-table-wrap">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Tutorial Title & Slug</th>
                    <th>Category</th>
                    <th>Author</th>
                    <th>Status</th>
                    <th>Read Count</th>
                  </tr>
                </thead>
                <tbody>
                  {cmsArticles.map(a => (
                    <tr key={a._id || a.slug}>
                      <td>
                        <div style={{ fontWeight: 700 }}>{a.title}</div>
                        <div className="mono" style={{ fontSize: '0.72rem', color: 'var(--text-dim)' }}>/{a.slug}</div>
                      </td>
                      <td><span className="badge badge-indigo">{a.category}</span></td>
                      <td>{a.author}</td>
                      <td><span className="badge badge-success">{a.status}</span></td>
                      <td><strong>{a.views || 100}</strong> views</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'coupons' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
              <div>
                <h2 style={{ fontSize: '1.45rem', fontWeight: 800 }}>Promotional Coupons & Discount Rules (MOD-16)</h2>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.82rem' }}>
                  Manage server-authoritative promo codes, minimum spend conditions, and redemption limits.
                </p>
              </div>
              <button className="btn btn-primary" onClick={handleAddCoupon}>
                <Plus size={15} /> Create Coupon Code
              </button>
            </div>

            <div className="data-table-wrap">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Coupon Code</th>
                    <th>Discount Type & Value</th>
                    <th>Min. Order Value</th>
                    <th>Redemption Usage</th>
                    <th>Description</th>
                    <th>Active Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {coupons.map(c => (
                    <tr key={c._id || c.code}>
                      <td className="mono" style={{ fontWeight: 800, color: 'var(--primary)' }}>{c.code}</td>
                      <td>
                        <span className="badge badge-cyan">
                          {c.discountType === 'percentage' ? `${Math.round(c.value * 100)}% OFF` :
                           c.discountType === 'shipping' ? 'FREE SHIPPING' : `₹${c.value} FLAT`}
                        </span>
                      </td>
                      <td>{c.minOrderAmount > 0 ? `₹${c.minOrderAmount}` : 'No Min.'}</td>
                      <td>
                        <strong>{c.usedCount}</strong> / {c.maxUses} used
                      </td>
                      <td style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{c.description}</td>
                      <td>
                        <span className={`badge ${c.isActive ? 'badge-success' : 'badge-danger'}`}>
                          {c.isActive ? 'Active' : 'Disabled'}
                        </span>
                      </td>
                      <td>
                        <button 
                          className="btn btn-outline btn-sm"
                          style={{ fontSize: '0.72rem', padding: '0.25rem 0.5rem' }}
                          onClick={() => handleToggleCoupon(c._id)}
                        >
                          {c.isActive ? 'Deactivate' : 'Activate'}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'marketing' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
              <div>
                <h2 style={{ fontSize: '1.45rem', fontWeight: 800 }}>Marketing & Abandoned Cart Recovery (MOD-18)</h2>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.82rem' }}>
                  Track behavioral retargeting campaigns, abandoned cart recovery funnels, and coupon conversion metrics.
                </p>
              </div>
              <button 
                className="btn btn-primary"
                onClick={() => {
                  dispatch(addNotification({
                    type: 'promo',
                    title: 'Automated Recovery Blast Triggered',
                    message: 'Sent 10% COMEBACK10 recovery emails to 14 customers with abandoned carts.',
                    link: '#promos'
                  }));
                  alert('Dispatched automated abandoned cart recovery email blast with coupon COMEBACK10!');
                }}
              >
                <Megaphone size={15} /> Trigger Recovery Campaign Blast
              </button>
            </div>

            {/* Abandoned Cart Recovery Funnel */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem', marginBottom: '1.5rem' }}>
              <div style={{ background: 'rgba(239, 68, 68, 0.05)', border: '1px solid rgba(239, 68, 68, 0.2)', padding: '1rem', borderRadius: 'var(--radius-sm)' }}>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Abandoned Carts</div>
                <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--danger)', marginTop: '0.2rem' }}>14 Carts</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)', marginTop: '0.2rem' }}>Last 7 Days Activity</div>
              </div>
              <div style={{ background: 'rgba(245, 158, 11, 0.05)', border: '1px solid rgba(245, 158, 11, 0.2)', padding: '1rem', borderRadius: 'var(--radius-sm)' }}>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Recovery Alerts Sent</div>
                <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#f59e0b', marginTop: '0.2rem' }}>14 Emails / Push</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)', marginTop: '0.2rem' }}>100% Delivery Rate</div>
              </div>
              <div style={{ background: 'rgba(34, 197, 94, 0.05)', border: '1px solid rgba(34, 197, 94, 0.2)', padding: '1rem', borderRadius: 'var(--radius-sm)' }}>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Recovered Orders</div>
                <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--success)', marginTop: '0.2rem' }}>6 Orders</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--success)', marginTop: '0.2rem' }}>↑ 42.8% Conversion</div>
              </div>
              <div style={{ background: 'rgba(56, 189, 248, 0.05)', border: '1px solid rgba(56, 189, 248, 0.2)', padding: '1rem', borderRadius: 'var(--radius-sm)' }}>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Recovered Revenue</div>
                <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--primary)', marginTop: '0.2rem' }}>₹38,400</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)', marginTop: '0.2rem' }}>Via COMEBACK10 Promo</div>
              </div>
            </div>

            <h3 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: '0.85rem' }}>
              Active Merchandising & Retargeting Campaigns
            </h3>
            <div className="data-table-wrap">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Campaign Name</th>
                    <th>Attached Code</th>
                    <th>Campaign Type</th>
                    <th>Clicks / Impressions</th>
                    <th>Completed Redemptions</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {marketingCampaigns.map(m => (
                    <tr key={m.id}>
                      <td style={{ fontWeight: 600 }}>{m.name}</td>
                      <td className="mono" style={{ fontWeight: 700, color: 'var(--primary)' }}>{m.code}</td>
                      <td><span className="badge badge-indigo">{m.type}</span></td>
                      <td>{m.clicks} interactions</td>
                      <td style={{ fontWeight: 700 }}>{m.redemptions} orders</td>
                      <td><span className="badge badge-success">{m.status}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'shipping' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
              <div>
                <h2 style={{ fontSize: '1.45rem', fontWeight: 800 }}>Logistics, Couriers & Dispatch Tracking (MOD-11)</h2>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.82rem' }}>
                  Track outbound waybills (AWBs), regional fulfillment gateways, and pan-India SLA performance.
                </p>
              </div>
            </div>

            {/* Logistics Status Cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', marginBottom: '1.5rem' }}>
              <div style={{ background: 'rgba(56, 189, 248, 0.05)', border: '1px solid rgba(56, 189, 248, 0.2)', padding: '1rem', borderRadius: 'var(--radius-sm)' }}>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Fulfillment Gateway</div>
                <div style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--primary)', marginTop: '0.2rem' }}>WH-BLR-01 (Bengaluru)</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--success)', marginTop: '0.2rem' }}>● Dispatch API Connected</div>
              </div>
              <div style={{ background: 'rgba(34, 197, 94, 0.05)', border: '1px solid rgba(34, 197, 94, 0.2)', padding: '1rem', borderRadius: 'var(--radius-sm)' }}>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Integrated Couriers</div>
                <div style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--success)', marginTop: '0.2rem' }}>Delhivery & BlueDart Air</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)', marginTop: '0.2rem' }}>Automatic AWB Assignment</div>
              </div>
              <div style={{ background: 'rgba(168, 85, 247, 0.05)', border: '1px solid rgba(168, 85, 247, 0.2)', padding: '1rem', borderRadius: 'var(--radius-sm)' }}>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Pan-India Pincode Coverage</div>
                <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#c084fc', marginTop: '0.2rem' }}>19,000+ PIN Codes</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)', marginTop: '0.2rem' }}>COD & Prepaid Supported</div>
              </div>
            </div>

            <div className="data-table-wrap">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>AWB / Tracking Number</th>
                    <th>Associated Order</th>
                    <th>Carrier Partner</th>
                    <th>Origin Hub</th>
                    <th>Destination Area</th>
                    <th>Shipment Status</th>
                  </tr>
                </thead>
                <tbody>
                  {shipments.map(s => (
                    <tr key={s.awb}>
                      <td className="mono" style={{ fontWeight: 700, color: 'var(--primary)' }}>{s.awb}</td>
                      <td className="mono">{s.orderNumber}</td>
                      <td>
                        <span className="badge badge-indigo">{s.carrier}</span>
                      </td>
                      <td style={{ fontSize: '0.8rem' }}>{s.origin}</td>
                      <td style={{ fontSize: '0.8rem' }}>{s.destination}</td>
                      <td>
                        <span className={`badge ${s.status === 'Delivered' ? 'badge-success' : 'badge-cyan'}`}>
                          {s.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'reviews' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
              <div>
                <h2 style={{ fontSize: '1.45rem', fontWeight: 800 }}>Customer Reviews Moderation (MOD-13)</h2>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.82rem' }}>
                  Inspect and moderate incoming customer feedback, technical ratings, and verified purchases before storefront indexing.
                </p>
              </div>
            </div>

            <div className="data-table-wrap">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Component & SKU</th>
                    <th>Reviewer</th>
                    <th>Rating</th>
                    <th>Review Feedback Content</th>
                    <th>Verified Purchase</th>
                    <th>Moderation State</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {reviewsList.map(r => (
                    <tr key={r.id}>
                      <td>
                        <div style={{ fontWeight: 700 }}>{r.product}</div>
                        <div className="mono" style={{ fontSize: '0.72rem', color: 'var(--text-dim)' }}>{r.sku}</div>
                      </td>
                      <td>{r.author}</td>
                      <td>
                        <span style={{ color: '#f59e0b', fontWeight: 700 }}>★ {r.rating}/5</span>
                      </td>
                      <td style={{ maxWidth: '320px', fontSize: '0.8rem', lineHeight: 1.4 }}>
                        "{r.comment}"
                      </td>
                      <td>
                        <span className={`badge ${r.verified ? 'badge-success' : 'badge-danger'}`}>
                          {r.verified ? 'Verified Buyer' : 'Unverified'}
                        </span>
                      </td>
                      <td>
                        <span className={`badge ${r.status === 'Approved' ? 'badge-success' : 'badge-warning'}`}>
                          {r.status}
                        </span>
                      </td>
                      <td>
                        <div style={{ display: 'flex', gap: '0.35rem' }}>
                          <button 
                            className="btn btn-primary btn-sm"
                            style={{ padding: '0.25rem 0.5rem', fontSize: '0.72rem' }}
                            onClick={() => handleReviewStatus(r.id, 'Approved')}
                          >
                            Approve
                          </button>
                          <button 
                            className="btn btn-outline btn-sm"
                            style={{ padding: '0.25rem 0.5rem', fontSize: '0.72rem', color: 'var(--danger)', borderColor: 'rgba(239,68,68,0.3)' }}
                            onClick={() => handleReviewStatus(r.id, 'Flagged / Hidden')}
                          >
                            Flag
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* 13. Audit Trail (Super Admin Exclusive) */}
        {activeTab === 'audit' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                  <h2 style={{ fontSize: '1.45rem', fontWeight: 800 }}>Audit Trail & Security Forensics (MOD-23)</h2>
                  <span style={{ backgroundColor: '#F3E8FF', color: '#7C3AED', border: '1px solid #DDD6FE', fontSize: '11px', fontWeight: 700, padding: '2px 8px', borderRadius: '4px' }}>
                    🛡️ Super Admin Exclusive
                  </span>
                </div>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.82rem' }}>
                  Cryptographically verified, immutable operational event logs capturing administrative actions, stock transfers, and authentication events.
                </p>
              </div>
            </div>

            <div className="data-table-wrap">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Log ID</th>
                    <th>Timestamp</th>
                    <th>Actor / Agent</th>
                    <th>Action</th>
                    <th>Target Entity</th>
                    <th>Details & Payload</th>
                  </tr>
                </thead>
                <tbody>
                  {auditLogs.map(log => (
                    <tr key={log.id}>
                      <td className="mono" style={{ fontWeight: 700, color: 'var(--primary)', fontSize: '0.78rem' }}>{log.id}</td>
                      <td style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{log.timestamp}</td>
                      <td>
                        <span style={{ fontWeight: 700, fontSize: '0.82rem' }}>{log.actor}</span>
                      </td>
                      <td>
                        <span className="badge badge-indigo">{log.action}</span>
                      </td>
                      <td className="mono" style={{ fontSize: '0.78rem' }}>{log.entity}</td>
                      <td style={{ fontSize: '0.8rem', color: 'var(--text-main)' }}>{log.details}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* 14. User & Role Access Management (Super Admin Exclusive) */}
        {activeTab === 'users' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                  <h2 style={{ fontSize: '1.45rem', fontWeight: 800 }}>User & Staff Role Authority (RBAC)</h2>
                  <span style={{ backgroundColor: '#F3E8FF', color: '#7C3AED', border: '1px solid #DDD6FE', fontSize: '11px', fontWeight: 700, padding: '2px 8px', borderRadius: '4px' }}>
                    🛡️ Super Admin Exclusive
                  </span>
                </div>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.82rem' }}>
                  Enforce strict separation of customer accounts from staff and administrators. Modify roles and assign departmental permissions.
                </p>
              </div>
            </div>

            {/* Role Hierarchy Info Strip */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', marginBottom: '1.5rem' }}>
              <div style={{ background: '#F3E8FF', border: '1px solid #DDD6FE', padding: '1rem', borderRadius: 'var(--radius-sm)' }}>
                <div style={{ fontSize: '0.75rem', color: '#6B21A8', textTransform: 'uppercase', fontWeight: 700 }}>Tier 1: Super Admin</div>
                <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#581C87', marginTop: '0.2rem' }}>Full System Authority</div>
                <div style={{ fontSize: '0.75rem', color: '#7E22CE', marginTop: '0.2rem' }}>All Modules + Audit Logs + Role Management</div>
              </div>
              <div style={{ background: '#EFF6FF', border: '1px solid #BFDBFE', padding: '1rem', borderRadius: 'var(--radius-sm)' }}>
                <div style={{ fontSize: '0.75rem', color: '#1E40AF', textTransform: 'uppercase', fontWeight: 700 }}>Tier 2: Administrator</div>
                <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#1D4ED8', marginTop: '0.2rem' }}>Operations & Catalog</div>
                <div style={{ fontSize: '0.75rem', color: '#2563EB', marginTop: '0.2rem' }}>Orders, Inventory, Products, Coupons, Support</div>
              </div>
              <div style={{ background: '#F1F5F9', border: '1px solid #CBD5E1', padding: '1rem', borderRadius: 'var(--radius-sm)' }}>
                <div style={{ fontSize: '0.75rem', color: '#475569', textTransform: 'uppercase', fontWeight: 700 }}>Tier 3: Customer</div>
                <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#334155', marginTop: '0.2rem' }}>Storefront Purchasing</div>
                <div style={{ fontSize: '0.75rem', color: '#64748B', marginTop: '0.2rem' }}>Strictly zero administrative panel access</div>
              </div>
            </div>

            <div className="data-table-wrap">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>User ID</th>
                    <th>Name & Email</th>
                    <th>Organization</th>
                    <th>Assigned Role</th>
                    <th>Account Status</th>
                    <th>Role Authority Action</th>
                  </tr>
                </thead>
                <tbody>
                  {usersList.map(u => (
                    <tr key={u.id}>
                      <td className="mono" style={{ fontWeight: 700, color: 'var(--primary)', fontSize: '0.78rem' }}>{u.id}</td>
                      <td>
                        <div style={{ fontWeight: 700 }}>{u.name}</div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{u.email}</div>
                      </td>
                      <td style={{ fontSize: '0.82rem' }}>{u.organization || 'Individual Maker'}</td>
                      <td>
                        <span className={`badge ${
                          u.role === 'super_admin' ? 'badge-purple' :
                          u.role === 'admin' ? 'badge-indigo' :
                          u.role === 'customer' ? 'badge-cyan' : 'badge-warning'
                        }`}>
                          {u.role.replace('_', ' ').toUpperCase()}
                        </span>
                      </td>
                      <td>
                        <span className="badge badge-success">{u.status}</span>
                      </td>
                      <td>
                        <select
                          value={u.role}
                          onChange={(e) => handleUpdateUserRole(u.id, e.target.value)}
                          style={{
                            padding: '4px 8px',
                            fontSize: '0.75rem',
                            borderRadius: '4px',
                            border: '1px solid var(--border-color)',
                            backgroundColor: '#FFFFFF',
                            color: 'var(--text-main)',
                            fontWeight: 600,
                            cursor: 'pointer'
                          }}
                        >
                          <option value="super_admin">Role: Super Admin</option>
                          <option value="admin">Role: Administrator</option>
                          <option value="catalog_manager">Role: Catalog Manager</option>
                          <option value="inventory_manager">Role: Inventory Manager</option>
                          <option value="customer">Role: Customer (No Admin)</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </section>

      <ArticleEditorModal 
        isOpen={isArticleModalOpen}
        onClose={() => setIsArticleModalOpen(false)}
        onArticleCreated={(art) => setCmsArticles(prev => [art, ...prev])}
      />
    </div>
  );
}
