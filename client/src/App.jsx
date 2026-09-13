import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setProducts } from "./redux/slices/productSlice";
import { setOrders } from "./redux/slices/orderSlice";
import { setTutorialsModalOpen } from "./redux/slices/communitySlice";
import { API_URL } from "./config/api";
import { ALL_CATALOG_PRODUCTS } from "./data/categoryData";

// Shared Layout Header & Footer
import Navbar from "./components/Navbar";
import RobuFooter from "./components/RobuFooter";

// Dedicated Routed Full Pages
import HomePage from "./pages/HomePage";
import CategoryPageWrapper from "./pages/CategoryPageWrapper";
import ProductDetailPage from "./pages/ProductDetailPage";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import OrdersPage from "./pages/OrdersPage";
import WishlistPage from "./pages/WishlistPage";
import ComparePage from "./pages/ComparePage";
import AdminPage from "./pages/AdminPage";
import TutorialsPage from "./pages/TutorialsPage";
import B2BQuotePage from "./pages/B2BQuotePage";
import SupportPage from "./pages/SupportPage";
import ReturnsPage from "./pages/ReturnsPage";

// Global Overlays, Drawers & Modals
import AuthModal from "./components/AuthModal";
import InvoiceModal from "./components/InvoiceModal";
import ReturnModal from "./components/ReturnModal";
import CartNotificationToast from "./components/CartNotificationToast";
import AbandonedCartModal from "./components/AbandonedCartModal";
import CreditNoteModal from "./components/CreditNoteModal";
import NotificationDrawer from "./components/NotificationDrawer";
import B2BQuoteModal from "./components/B2BQuoteModal";
import SupportTicketModal from "./components/SupportTicketModal";
import TutorialsHubModal from "./components/TutorialsHubModal";
import ComparisonModal from "./components/ComparisonModal";

// Fallback initial electronics data if server is restarting
const FALLBACK_PRODUCTS = [
  {
    _id: "prod-001",
    title: "Arduino Uno R4 WiFi Microcontroller Board",
    sku: "SKU-ARD-R4-WIFI",
    category: "microcontrollers",
    brand: "Arduino",
    price: 2499,
    gstRate: 0.18,
    hsnCode: "85423190",
    stockOnHand: 45,
    stockReserved: 3,
    warehouse: "WH-BLR-01",
    image: "/assets/images/arduino_uno_r4.jpg",
    description:
      "The Arduino Uno R4 WiFi pairs the RA4M1 32-bit ARM Cortex-M4 processor from Renesas with an ESP32-S3 module for Wi-Fi and Bluetooth connectivity, plus an integrated 12x8 LED matrix.",
    specs: {
      "Processor Architecture": "Renesas RA4M1 (ARM Cortex-M4 @ 48 MHz)",
      "Operating Voltage": "5V DC",
      "Input Voltage (VIN)": "6V - 24V DC",
      "Flash Memory": "256 KB",
      SRAM: "32 KB",
      "Wireless Connectivity": "Wi-Fi 802.11 b/g/n + Bluetooth 5.0 (ESP32-S3)",
      "Digital I/O Pins": "14 pins (6 PWM outputs)",
      "Analog Input Pins": "6 channels (14-bit ADC)",
      "LED Matrix": "12x8 Red Matrix",
    },
    datasheetUrl:
      "https://docs.arduino.cc/resources/datasheets/ABX00087-datasheet.pdf",
  },
  {
    _id: "prod-002",
    title: "Raspberry Pi 5 - 8GB RAM Single Board Computer",
    sku: "SKU-RPI-5-8GB",
    category: "single-board-computers",
    brand: "Raspberry Pi Foundation",
    price: 7999,
    gstRate: 0.18,
    hsnCode: "84713010",
    stockOnHand: 22,
    stockReserved: 2,
    warehouse: "WH-BLR-01",
    image: "/assets/images/raspberry_pi_5.jpg",
    description:
      "Featuring a 64-bit quad-core Arm Cortex-A76 processor running at 2.4GHz, Raspberry Pi 5 delivers a 2-3x increase in CPU performance relative to Raspberry Pi 4.",
    specs: {
      "CPU Architecture": "Broadcom BCM2712 Quad-core ARM Cortex-A76 @ 2.4GHz",
      "System Memory (RAM)": "8GB LPDDR4X-4267 SDRAM",
      "GPU Video Engine": "VideoCore VII @ 800MHz (Vulkan 1.2)",
      "Display Connectors": "Dual 4Kp60 micro-HDMI outputs with HDR",
      "PCIe Expansion": "PCIe 2.0 x1 interface for NVMe SSD",
      "Wireless Connectivity": "Dual-band 802.11ac Wi-Fi + Bluetooth 5.0",
    },
    datasheetUrl:
      "https://datasheets.raspberrypi.com/rpi5/raspberry-pi-5-product-brief.pdf",
  },
  {
    _id: "prod-003",
    title: "ESP32-WROOM-32D Development Board (WiFi + Bluetooth BLE)",
    sku: "SKU-ESP32-DEV-WROOM",
    category: "microcontrollers",
    brand: "Espressif Systems",
    price: 449,
    gstRate: 0.18,
    hsnCode: "85423190",
    stockOnHand: 180,
    stockReserved: 12,
    warehouse: "WH-PUN-02",
    image: "/assets/images/esp32_dev_board.jpg",
    description:
      "The ESP32-WROOM-32D is a powerful, generic Wi-Fi+BT+BLE MCU module that targets a wide variety of applications, ranging from low-power sensor networks to the most demanding tasks.",
    specs: {
      "Processor Architecture": "Xtensa Dual-Core 32-bit LX6 @ 240MHz",
      "Operating Voltage": "3.3V DC (5V via Micro-USB)",
      "Wireless Connectivity":
        "Wi-Fi 802.11 b/g/n (up to 150 Mbps) + Bluetooth v4.2 BR/EDR and BLE",
      SRAM: "520 KB",
      "Flash Memory": "4 MB SPI Flash",
      "GPIO Pins":
        "36 pins with capacitive touch sensors, Hall sensors, ADC, DAC",
    },
    datasheetUrl:
      "https://www.espressif.com/sites/default/files/documentation/esp32-wroom-32d_esp32-wroom-32u_datasheet_en.pdf",
  },
];

function AppContent() {
  const location = useLocation();
  const [progress, setProgress] = useState(0);
  const { isTutorialsModalOpen } = useSelector((state) => state.community);

  // Dynamic route switch animation & top progress indicator
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setProgress(35);
    const t1 = setTimeout(() => setProgress(75), 100);
    const t2 = setTimeout(() => setProgress(100), 240);
    const t3 = setTimeout(() => setProgress(0), 480);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [location.pathname]);

  return (
    <div
      style={{
        backgroundColor: "var(--robu-bg-body)",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        position: "relative",
      }}
    >
      {/* High-Tech Page Switch Loading Pulse Bar */}
      {progress > 0 && (
        <div
          className="page-switch-progress-bar"
          style={{ width: `${progress}%`, opacity: progress > 0 ? 1 : 0 }}
        />
      )}

      {/* Top Sticky Navigation */}
      <Navbar />

      {/* Animated Route Container */}
      <div key={location.pathname} className="page-transition-wrapper">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/category/:slug" element={<CategoryPageWrapper />} />
          <Route path="/product/:id" element={<ProductDetailPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/orders" element={<OrdersPage />} />
          <Route path="/wishlist" element={<WishlistPage />} />
          <Route path="/compare" element={<ComparePage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/tutorials" element={<TutorialsPage />} />
          <Route path="/b2b-quote" element={<B2BQuotePage />} />
          <Route path="/support" element={<SupportPage />} />
          <Route path="/returns" element={<ReturnsPage />} />
          <Route path="*" element={<HomePage />} />
        </Routes>
      </div>

      {/* Global Drawers & Modals */}
      <AuthModal />
      <InvoiceModal />
      <ReturnModal />
      <CartNotificationToast />
      <AbandonedCartModal />
      <CreditNoteModal />
      <NotificationDrawer />
      <B2BQuoteModal />
      <SupportTicketModal />
      <ComparisonModal />
      <TutorialsHubModal
        isOpen={isTutorialsModalOpen}
        onClose={() => dispatch(setTutorialsModalOpen(false))}
      />

      {/* Persistent Storefront Footer */}
      <RobuFooter />
    </div>
  );
}

export default function App() {
  const dispatch = useDispatch();

  // Fetch initial products and orders from server API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`${API_URL}/api/products`);
        const data = await res.json();
        if (data.success && data.data && data.data.length > 0) {
          dispatch(setProducts(data.data));
        } else {
          dispatch(
            setProducts(
              ALL_CATALOG_PRODUCTS.length > 0
                ? ALL_CATALOG_PRODUCTS
                : FALLBACK_PRODUCTS,
            ),
          );
        }

        const orderRes = await fetch(`${API_URL}/api/orders`);
        const orderData = await orderRes.json();
        if (orderData.success && orderData.data) {
          dispatch(setOrders(orderData.data));
        }
      } catch (err) {
        console.warn(
          "Backend offline or connecting; utilizing local state baseline",
          err,
        );
        dispatch(
          setProducts(
            ALL_CATALOG_PRODUCTS.length > 0
              ? ALL_CATALOG_PRODUCTS
              : FALLBACK_PRODUCTS,
          ),
        );
      }
    };

    fetchData();
  }, [dispatch]);

  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}
