import { useState, useEffect } from 'react';
import { Search, ShoppingBag, Home, Grid, User, Heart, Star, Menu, Bell, LogIn, Info, Phone, HelpCircle, ChevronRight, Trash2, Minus, Plus, ArrowLeft, Send, Package, Truck, MapPin, CheckCircle, X } from 'lucide-react';
import { motion } from 'motion/react';

// Mock Data
const CATEGORIES = ['All', 'Electronics', 'Sports', 'Wearables', 'Watches', 'Clothing'];
const PRODUCTS = [
  { id: 1, name: 'Pro Vision 4K Drone', price: 799.99, rating: 4.8, category: 'Electronics', image: 'https://images.unsplash.com/photo-1507582020474-9a35b7d455d9?auto=format&fit=crop&w=400&q=80', description: 'Capture stunning aerial footage with this professional-grade 4K drone. Features obstacle avoidance and 30-minute flight time.', origin: 'Mumbai, Maharashtra', deliveryDate: 'April 8, 2026' },
  { id: 2, name: 'UltraSlim Laptop', price: 1299.50, rating: 4.9, category: 'Electronics', image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=400&q=80', description: 'Powerful, lightweight, and designed for professionals on the go. Features a 14-inch retina display and all-day battery life.', origin: 'Bangalore, Karnataka', deliveryDate: 'April 9, 2026' },
  { id: 3, name: 'Pro Tennis Racket', price: 150.00, rating: 4.5, category: 'Sports', image: 'https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?auto=format&fit=crop&w=400&q=80', description: 'Lightweight carbon fiber tennis racket designed for maximum power and control. Perfect for intermediate to advanced players.', origin: 'Delhi', deliveryDate: 'April 7, 2026' },
  { id: 4, name: 'Adjustable Dumbbells', price: 85.00, rating: 4.7, category: 'Sports', image: 'https://images.unsplash.com/photo-1586401100295-7a8096fd231a?auto=format&fit=crop&w=400&q=80', description: 'Space-saving adjustable dumbbells. Easily switch weights from 5 to 52.5 lbs with a simple turn of a dial.', origin: 'Pune, Maharashtra', deliveryDate: 'April 10, 2026' },
  { id: 5, name: 'HealthTrack Smart Ring', price: 199.99, rating: 4.6, category: 'Wearables', image: 'https://images.unsplash.com/photo-1617043786394-f977fa12eddf?auto=format&fit=crop&w=400&q=80', description: 'Track your sleep, activity, and recovery with this sleek, titanium smart ring. Water-resistant and 7-day battery life.', origin: 'Hyderabad, Telangana', deliveryDate: 'April 8, 2026' },
  { id: 6, name: 'VR Gaming Headset', price: 349.00, rating: 4.8, category: 'Wearables', image: 'https://images.unsplash.com/photo-1622979135225-d2ba269cf1ac?auto=format&fit=crop&w=400&q=80', description: 'Immerse yourself in virtual worlds with this high-resolution standalone VR headset. No PC required.', origin: 'Chennai, Tamil Nadu', deliveryDate: 'April 11, 2026' },
  { id: 7, name: 'Titanium Chronograph', price: 295.00, rating: 4.9, category: 'Watches', image: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?auto=format&fit=crop&w=400&q=80', description: 'A premium titanium chronograph watch featuring sapphire crystal, luminous hands, and 100m water resistance.', origin: 'Surat, Gujarat', deliveryDate: 'April 7, 2026' },
  { id: 8, name: 'Minimalist Leather Watch', price: 125.00, rating: 4.4, category: 'Watches', image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=400&q=80', description: 'Elegant minimalist watch with a genuine leather strap and a slim profile. Perfect for everyday wear.', origin: 'Jaipur, Rajasthan', deliveryDate: 'April 9, 2026' },
  { id: 9, name: 'Breathable Running Tee', price: 35.00, rating: 4.3, category: 'Clothing', image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=400&q=80', description: 'Moisture-wicking, ultra-breathable running t-shirt designed to keep you cool and dry during intense workouts.', origin: 'Ludhiana, Punjab', deliveryDate: 'April 6, 2026' },
  { id: 10, name: 'Waterproof Hiking Jacket', price: 110.00, rating: 4.7, category: 'Clothing', image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=400&q=80', description: 'Durable, fully waterproof and windproof hiking jacket with adjustable hood and breathable mesh lining.', origin: 'Dehradun, Uttarakhand', deliveryDate: 'April 12, 2026' },
  { id: 11, name: "Men's Classic Oxford Shirt", price: 45.00, rating: 4.6, category: 'Clothing', image: 'https://images.unsplash.com/photo-1598032895397-b9472444bf93?auto=format&fit=crop&w=400&q=80', description: 'A timeless wardrobe staple. This 100% cotton Oxford shirt offers a comfortable fit and versatile style for any occasion.', origin: 'Surat, Gujarat', deliveryDate: 'April 10, 2026' },
  { id: 12, name: "Women's Floral Summer Dress", price: 55.00, rating: 4.8, category: 'Clothing', image: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=400&q=80', description: 'Lightweight and breezy, this floral dress is perfect for warm summer days and outdoor gatherings.', origin: 'Mumbai, Maharashtra', deliveryDate: 'April 8, 2026' },
  { id: 13, name: "Boys' Graphic T-Shirt", price: 18.00, rating: 4.5, category: 'Clothing', image: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=400&q=80', description: 'Fun and vibrant graphic tee made from soft, durable cotton. Perfect for active boys.', origin: 'Delhi', deliveryDate: 'April 7, 2026' },
  { id: 14, name: "Girls' Princess Party Dress", price: 42.00, rating: 4.9, category: 'Clothing', image: 'https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?auto=format&fit=crop&w=400&q=80', description: 'A magical tulle dress with sparkling details, making every girl feel like a princess on special occasions.', origin: 'Bangalore, Karnataka', deliveryDate: 'April 9, 2026' },
  { id: 15, name: "Men's Slim Fit Jeans", price: 65.00, rating: 4.4, category: 'Clothing', image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=400&q=80', description: 'Premium denim with a modern slim cut and a hint of stretch for all-day comfort.', origin: 'Pune, Maharashtra', deliveryDate: 'April 11, 2026' },
  { id: 16, name: "Women's Yoga Leggings", price: 38.00, rating: 4.7, category: 'Clothing', image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=400&q=80', description: 'High-waisted, squat-proof leggings designed for maximum flexibility and support during your workouts.', origin: 'Hyderabad, Telangana', deliveryDate: 'April 8, 2026' },
  { id: 17, name: "Kids' Unisex Winter Beanie", price: 15.00, rating: 4.6, category: 'Clothing', image: 'https://images.unsplash.com/photo-1576871337622-98d48d1cf531?auto=format&fit=crop&w=400&q=80', description: 'Keep your little ones warm with this cozy, knit winter beanie featuring a fun pom-pom.', origin: 'Shimla, Himachal Pradesh', deliveryDate: 'April 12, 2026' },
];

const NOTIFICATIONS = [
  { id: 1, title: 'Spring Sale is Live!', message: 'Get up to 20% off on all new arrivals. Limited time only.', time: '2 hours ago', unread: true },
  { id: 2, title: 'Flash Discount', message: 'Extra 10% off on Electronics using code FLASH10.', time: '5 hours ago', unread: true },
  { id: 3, title: 'Free Shipping', message: 'Enjoy free shipping on all orders over ₹50 this weekend.', time: '1 day ago', unread: false },
];

type Product = typeof PRODUCTS[0];
interface CartItem {
  product: Product;
  quantity: number;
}

interface Order {
  id: string;
  date: string;
  items: CartItem[];
  total: number;
  status: string;
}

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [activeCategory, setActiveCategory] = useState('All');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [productReviews, setProductReviews] = useState<Record<number, string[]>>({});
  const [reviewText, setReviewText] = useState('');
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  const [showNotifications, setShowNotifications] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const [showPaymentOptions, setShowPaymentOptions] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');
  const [gpayId, setGpayId] = useState('');
  const [gpayPassword, setGpayPassword] = useState('');
  const [user, setUser] = useState<{email: string, mobile: string, address: string} | null>(null);
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginMobile, setLoginMobile] = useState('+91 ');
  const [loginAddress, setLoginAddress] = useState('');
  const [orders, setOrders] = useState<Order[]>([]);
  const [trackingOrder, setTrackingOrder] = useState<Order | null>(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('shophub_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    const savedOrders = localStorage.getItem('shophub_orders');
    if (savedOrders) {
      setOrders(JSON.parse(savedOrders));
    }
  }, []);

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginEmail && loginPassword) {
      const newUser = { email: loginEmail, mobile: loginMobile, address: loginAddress };
      setUser(newUser);
      localStorage.setItem('shophub_user', JSON.stringify(newUser));
      setLoginPassword('');
    }
  };

  const handleSignOut = () => {
    setUser(null);
    localStorage.removeItem('shophub_user');
  };

  const cancelOrder = (orderId: string) => {
    const updatedOrders = orders.filter(order => order.id !== orderId);
    setOrders(updatedOrders);
    localStorage.setItem('shophub_orders', JSON.stringify(updatedOrders));
  };

  const isPaymentValid = selectedPaymentMethod && (
    (selectedPaymentMethod === 'Cash on Delivery') ||
    ((selectedPaymentMethod === 'Credit Card' || selectedPaymentMethod === 'Debit Card') && cardNumber.length > 0 && cardExpiry.length > 0 && cardCvv.length > 0) ||
    (selectedPaymentMethod === 'Google Pay' && gpayId.length > 0 && gpayPassword.length > 0)
  );

  const toggleSection = (section: string) => {
    setExpandedSection(prev => prev === section ? null : section);
  };

  const handleAddReview = () => {
    if (!reviewText.trim() || !selectedProduct) return;
    setProductReviews(prev => ({
      ...prev,
      [selectedProduct.id]: [...(prev[selectedProduct.id] || []), reviewText]
    }));
    setReviewText('');
  };

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item => item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: number) => {
    setCart(prev => prev.filter(item => item.product.id !== productId));
  };

  const updateQuantity = (productId: number, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.product.id === productId) {
        const newQuantity = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQuantity };
      }
      return item;
    }));
  };

  const cartTotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const renderContent = () => {
    if (activeTab === 'profile') {
      return (
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="px-4 py-6 space-y-6"
        >
          {/* Sign In Card */}
          {user ? (
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mb-4">
                <User className="w-8 h-8 text-green-600" />
              </div>
              <h2 className="text-xl font-bold mb-2">Welcome Back!</h2>
              <p className="text-gray-500 text-sm mb-6">{user.email}</p>
              
              <div className="w-full text-left bg-gray-50 p-4 rounded-xl mb-6 space-y-2 text-sm">
                <p><strong className="text-gray-700">Mobile:</strong> {user.mobile}</p>
                <p><strong className="text-gray-700">Address:</strong> {user.address || 'Not provided'}</p>
              </div>

              <button onClick={handleSignOut} className="w-full bg-red-50 text-red-600 py-3.5 rounded-xl font-semibold hover:bg-red-100 transition-colors">
                Sign Out
              </button>
            </div>
          ) : (
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-indigo-50 rounded-full flex items-center justify-center mb-4">
                <User className="w-8 h-8 text-indigo-600" />
              </div>
              <h2 className="text-xl font-bold mb-2">Welcome to ShopHub</h2>
              <p className="text-gray-500 text-sm mb-6">Sign in to track orders, save items, and checkout faster.</p>
              
              <form className="w-full flex flex-col gap-4" onSubmit={handleSignIn}>
                <div className="flex flex-col text-left">
                  <label className="text-xs font-semibold text-gray-600 mb-1 ml-1">Email Address</label>
                  <input 
                    type="email" 
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    placeholder="you@example.com" 
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
                    required
                  />
                </div>
                <div className="flex flex-col text-left">
                  <label className="text-xs font-semibold text-gray-600 mb-1 ml-1">Password</label>
                  <input 
                    type="password" 
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    placeholder="••••••••" 
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
                    required
                  />
                </div>
                <div className="flex flex-col text-left">
                  <label className="text-xs font-semibold text-gray-600 mb-1 ml-1">Mobile Number</label>
                  <input 
                    type="tel" 
                    value={loginMobile}
                    onChange={(e) => setLoginMobile(e.target.value)}
                    placeholder="+91 98765 43210" 
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
                  />
                </div>
                <div className="flex flex-col text-left">
                  <label className="text-xs font-semibold text-gray-600 mb-1 ml-1">Delivery Address</label>
                  <textarea 
                    value={loginAddress}
                    onChange={(e) => setLoginAddress(e.target.value)}
                    placeholder="123 Main St, City, Country" 
                    rows={2}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all resize-none"
                  />
                </div>
                <button type="submit" className="w-full bg-gray-900 text-white py-3.5 rounded-xl font-semibold hover:bg-gray-800 transition-colors flex items-center justify-center gap-2 shadow-md mt-2">
                  <LogIn className="w-5 h-5" />
                  Sign In / Register
                </button>
              </form>
              
              <div className="mt-4 text-sm text-gray-500">
                Don't have an account? <button className="text-indigo-600 font-semibold hover:underline">Register</button>
              </div>
            </div>
          )}

          {/* Menu Links */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="border-b border-gray-100">
              <button onClick={() => toggleSection('about')} className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center">
                    <Info className="w-4 h-4 text-blue-600" />
                  </div>
                  <span className="font-medium text-gray-700">About Us</span>
                </div>
                <ChevronRight className={`w-5 h-5 text-gray-300 transition-transform ${expandedSection === 'about' ? 'rotate-90' : ''}`} />
              </button>
              {expandedSection === 'about' && (
                <div className="px-4 pb-4 pt-1 text-sm text-gray-600 leading-relaxed bg-gray-50">
                  ShopHub is your premier destination for high-quality electronics, sports gear, and modern apparel. We believe in providing top-tier products with exceptional customer service.
                </div>
              )}
            </div>

            <div className="border-b border-gray-100">
              <button onClick={() => toggleSection('contact')} className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-green-50 flex items-center justify-center">
                    <Phone className="w-4 h-4 text-green-600" />
                  </div>
                  <span className="font-medium text-gray-700">Contact Us</span>
                </div>
                <ChevronRight className={`w-5 h-5 text-gray-300 transition-transform ${expandedSection === 'contact' ? 'rotate-90' : ''}`} />
              </button>
              {expandedSection === 'contact' && (
                <div className="px-4 pb-4 pt-1 text-sm text-gray-600 bg-gray-50 flex flex-col gap-2">
                  <p><strong>Name:</strong> Harsh .S. Parmar</p>
                  <p><strong>Mobile:</strong> 1234567890</p>
                  <p><strong>Email:</strong> support@shophub.com</p>
                </div>
              )}
            </div>

            <div className="border-b border-gray-100">
              <button onClick={() => toggleSection('orders')} className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-orange-50 flex items-center justify-center">
                    <ShoppingBag className="w-4 h-4 text-orange-600" />
                  </div>
                  <span className="font-medium text-gray-700">My Orders</span>
                </div>
                <ChevronRight className={`w-5 h-5 text-gray-300 transition-transform ${expandedSection === 'orders' ? 'rotate-90' : ''}`} />
              </button>
              {expandedSection === 'orders' && (
                <div className="px-4 pb-4 pt-1 text-sm text-gray-600 bg-gray-50">
                  {orders.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-6 text-gray-400">
                      <ShoppingBag className="w-8 h-8 mb-2 text-gray-300" />
                      <p>No recent orders found.</p>
                    </div>
                  ) : (
                    <div className="space-y-3 mt-2">
                      {orders.map(order => (
                        <div key={order.id} className="bg-white p-3 rounded-xl border border-gray-200 shadow-sm">
                          <div className="flex justify-between items-center mb-2 border-b border-gray-100 pb-2">
                            <span className="font-bold text-gray-800">Order #{order.id.toUpperCase()}</span>
                            <span className="text-xs text-gray-500">{order.date}</span>
                          </div>
                          <div className="space-y-2 mb-2">
                            {order.items.map((item, idx) => (
                              <div key={idx} className="flex justify-between text-xs">
                                <span className="truncate pr-2">{item.quantity}x {item.product.name}</span>
                                <span className="font-medium">₹{(item.product.price * item.quantity).toFixed(2)}</span>
                              </div>
                            ))}
                          </div>
                          <div className="flex justify-between items-center pt-2 border-t border-gray-100">
                            <div className="flex items-center gap-2">
                              <span className={`text-xs font-medium ${order.status === 'Cancelled' ? 'text-red-500' : 'text-indigo-600'}`}>{order.status}</span>
                              {order.status !== 'Cancelled' && (
                                <>
                                  <button 
                                    onClick={() => setTrackingOrder(order)}
                                    className="text-[10px] bg-indigo-50 text-indigo-600 px-2 py-1 rounded hover:bg-indigo-100 transition-colors"
                                  >
                                    Track
                                  </button>
                                  <button 
                                    onClick={() => cancelOrder(order.id)}
                                    className="text-[10px] bg-red-50 text-red-600 px-2 py-1 rounded hover:bg-red-100 transition-colors"
                                  >
                                    Cancel
                                  </button>
                                </>
                              )}
                            </div>
                            <span className="font-bold text-gray-900">Total: ₹{order.total.toFixed(2)}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>

            <div>
              <button onClick={() => toggleSection('faq')} className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-purple-50 flex items-center justify-center">
                    <HelpCircle className="w-4 h-4 text-purple-600" />
                  </div>
                  <span className="font-medium text-gray-700">FAQ's</span>
                </div>
                <ChevronRight className={`w-5 h-5 text-gray-300 transition-transform ${expandedSection === 'faq' ? 'rotate-90' : ''}`} />
              </button>
              {expandedSection === 'faq' && (
                <div className="px-4 pb-4 pt-1 text-sm text-gray-600 bg-gray-50">
                  <p className="font-semibold mb-1">Q: How long does shipping take?</p>
                  <p className="mb-3">A: Standard shipping takes 3-5 business days.</p>
                  
                  <p className="font-semibold mb-1">Q: What is your return policy?</p>
                  <p className="mb-3">A: We offer a 30-day money-back guarantee on all unused items.</p>
                  
                  <p className="font-semibold mb-1">Q: Do you ship internationally?</p>
                  <p className="mb-3">A: Yes, we ship to over 50 countries worldwide. Shipping costs apply.</p>
                  
                  <p className="font-semibold mb-1">Q: How can I track my order?</p>
                  <p className="mb-3">A: Once your order ships, you'll receive an email with a tracking link.</p>
                  
                  <p className="font-semibold mb-1">Q: What payment methods do you accept?</p>
                  <p className="mb-3">A: We accept Visa, MasterCard, American Express, PayPal, and Apple Pay.</p>
                  
                  <p className="font-semibold mb-1">Q: Can I change or cancel my order?</p>
                  <p>A: Orders can be modified or canceled within 2 hours of placement.</p>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      );
    }

    if (activeTab === 'cart') {
      if (paymentSuccess) {
        return (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="px-4 py-12 flex flex-col items-center justify-center min-h-full text-center"
          >
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
              <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white text-xl font-bold">✓</div>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Payment Successful!</h2>
            <p className="text-gray-600 mb-8">Your order has been placed successfully.</p>
            <button 
              onClick={() => {
                setPaymentSuccess(false);
                setShowPaymentOptions(false);
                setCart([]);
                setActiveTab('home');
              }}
              className="px-8 py-3 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700 transition-colors"
            >
              Continue Shopping
            </button>
          </motion.div>
        );
      }

      if (showPaymentOptions) {
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="px-4 py-6 flex flex-col min-h-full"
          >
            <div className="flex items-center gap-3 mb-6">
              <button 
                onClick={() => setShowPaymentOptions(false)}
                className="p-2 -ml-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <h2 className="text-xl font-bold">Payment Method</h2>
            </div>

            <div className="space-y-3 flex-1">
              {['Cash on Delivery', 'Google Pay', 'Credit Card', 'Debit Card'].map((method) => (
                <div key={method} className={`rounded-2xl border ${selectedPaymentMethod === method ? 'border-indigo-600 bg-indigo-50/50' : 'border-gray-200 bg-white'} transition-colors overflow-hidden`}>
                  <button
                    onClick={() => setSelectedPaymentMethod(method)}
                    className="w-full flex items-center justify-between p-4"
                  >
                    <span className="font-medium text-gray-800">{method}</span>
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${selectedPaymentMethod === method ? 'border-indigo-600' : 'border-gray-300'}`}>
                      {selectedPaymentMethod === method && <div className="w-2.5 h-2.5 bg-indigo-600 rounded-full" />}
                    </div>
                  </button>
                  {selectedPaymentMethod === method && (method === 'Credit Card' || method === 'Debit Card') && (
                    <div className="px-4 pb-4 pt-2 space-y-3">
                      <input
                        type="text"
                        placeholder="Card Number"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
                      />
                      <div className="flex gap-3">
                        <input
                          type="text"
                          placeholder="MM/YY"
                          value={cardExpiry}
                          onChange={(e) => setCardExpiry(e.target.value)}
                          className="w-1/2 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
                        />
                        <input
                          type="text"
                          placeholder="CVV"
                          value={cardCvv}
                          onChange={(e) => setCardCvv(e.target.value)}
                          className="w-1/2 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
                        />
                      </div>
                    </div>
                  )}
                  {selectedPaymentMethod === method && method === 'Google Pay' && (
                    <div className="px-4 pb-4 pt-2 space-y-3">
                      <input
                        type="text"
                        placeholder="Google Pay ID (UPI ID)"
                        value={gpayId}
                        onChange={(e) => setGpayId(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
                      />
                      <input
                        type="password"
                        placeholder="Password / UPI PIN"
                        value={gpayPassword}
                        onChange={(e) => setGpayPassword(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="mt-6 bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
              <div className="flex justify-between mb-6 font-bold text-lg">
                <span>Total to pay</span>
                <span>₹{cartTotal.toFixed(2)}</span>
              </div>
              <button 
                disabled={!isPaymentValid}
                onClick={() => {
                  const newOrder: Order = {
                    id: Math.random().toString(36).substr(2, 9),
                    date: new Date().toLocaleDateString(),
                    items: [...cart],
                    total: cartTotal,
                    status: 'Processing'
                  };
                  const updatedOrders = [newOrder, ...orders];
                  setOrders(updatedOrders);
                  localStorage.setItem('shophub_orders', JSON.stringify(updatedOrders));
                  setPaymentSuccess(true);
                }}
                className={`w-full py-3.5 rounded-xl font-semibold transition-colors shadow-md ${isPaymentValid ? 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-indigo-200' : 'bg-gray-200 text-gray-400 cursor-not-allowed shadow-none'}`}
              >
                Confirm Payment
              </button>
            </div>
          </motion.div>
        );
      }

      return (
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="px-4 py-6 flex flex-col min-h-full"
        >
          <h2 className="text-xl font-bold mb-4">Your Cart</h2>
          {cart.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center text-gray-400 gap-4 mt-10">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
                <ShoppingBag className="w-8 h-8 text-gray-300" />
              </div>
              <p className="font-medium">Your cart is empty</p>
              <button onClick={() => setActiveTab('home')} className="mt-2 px-6 py-2 bg-indigo-50 text-indigo-600 rounded-full font-medium hover:bg-indigo-100 transition-colors">
                Start Shopping
              </button>
            </div>
          ) : (
            <>
              <div className="space-y-4 flex-1">
                {cart.map(item => (
                  <div key={item.product.id} className="bg-white p-3 rounded-2xl shadow-sm border border-gray-100 flex gap-4">
                    <img src={item.product.image} alt={item.product.name} className="w-20 h-20 object-cover rounded-xl bg-gray-100" referrerPolicy="no-referrer" />
                    <div className="flex-1 flex flex-col justify-between py-1">
                      <div className="flex justify-between items-start">
                        <h4 className="text-sm font-medium text-gray-800 line-clamp-2 pr-2">{item.product.name}</h4>
                        <button onClick={() => removeFromCart(item.product.id)} className="text-gray-400 hover:text-red-500 transition-colors">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <div className="flex items-center justify-between mt-2">
                        <span className="font-bold text-gray-900">₹{(item.product.price * item.quantity).toFixed(2)}</span>
                        <div className="flex items-center gap-3 bg-gray-50 rounded-lg px-2 py-1 border border-gray-100">
                          <button onClick={() => updateQuantity(item.product.id, -1)} className="w-5 h-5 flex items-center justify-center text-gray-500 hover:text-gray-900 bg-white rounded shadow-sm">
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="text-sm font-medium w-4 text-center">{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.product.id, 1)} className="w-5 h-5 flex items-center justify-center text-gray-500 hover:text-gray-900 bg-white rounded shadow-sm">
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
                <div className="flex justify-between mb-2 text-sm text-gray-600">
                  <span>Subtotal</span>
                  <span>₹{cartTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between mb-4 text-sm text-gray-600">
                  <span>Shipping</span>
                  <span className="text-green-600 font-medium">Free</span>
                </div>
                <div className="h-px bg-gray-100 w-full mb-4"></div>
                <div className="flex justify-between mb-6 font-bold text-lg">
                  <span>Total</span>
                  <span>₹{cartTotal.toFixed(2)}</span>
                </div>
                <button 
                  onClick={() => {
                    if (!user) {
                      setActiveTab('profile');
                    } else {
                      setShowPaymentOptions(true);
                    }
                  }}
                  className="w-full bg-indigo-600 text-white py-3.5 rounded-xl font-semibold hover:bg-indigo-700 transition-colors shadow-md shadow-indigo-200"
                >
                  {!user ? 'Sign in to Buy' : 'Buy now'}
                </button>
              </div>
            </>
          )}
        </motion.div>
      );
    }

    if (activeTab === 'home') {
      let filteredProducts = activeCategory === 'All' 
        ? PRODUCTS 
        : PRODUCTS.filter(p => p.category === activeCategory);

      let filteredCategories = CATEGORIES;

      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        filteredProducts = filteredProducts.filter(p => 
          p.name.toLowerCase().includes(query) || 
          p.category.toLowerCase().includes(query)
        );
        filteredCategories = CATEGORIES.filter(cat => 
          cat.toLowerCase().includes(query)
        );
      }

      return (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {/* Banner */}
          <div className="px-4 py-4">
            <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl p-6 text-white relative overflow-hidden shadow-lg">
              <div className="relative z-10">
                <span className="text-xs font-semibold uppercase tracking-wider bg-white/20 px-2 py-1 rounded-full backdrop-blur-sm">Spring Sale</span>
                <h2 className="text-2xl font-bold mt-3 mb-1">Get 20% Off</h2>
                <p className="text-indigo-100 text-sm mb-4">On all new arrivals</p>
                <button className="bg-white text-indigo-600 px-4 py-2 rounded-full text-sm font-semibold hover:bg-indigo-50 transition-colors">
                  Shop Now
                </button>
              </div>
              <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-white/10 rounded-full blur-2xl"></div>
              <div className="absolute -top-10 -left-10 w-32 h-32 bg-white/10 rounded-full blur-xl"></div>
            </div>
          </div>

          {/* Categories */}
          <div className="px-4 py-2">
            <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-2 -mx-4 px-4">
              {filteredCategories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`whitespace-nowrap px-5 py-2 rounded-full text-sm font-medium transition-all ${
                    activeCategory === cat
                      ? 'bg-gray-900 text-white shadow-md'
                      : 'bg-white text-gray-600 border border-gray-200 hover:border-gray-300'
                  }`}
                >
                  {cat}
                </button>
              ))}
              {filteredCategories.length === 0 && (
                <span className="text-sm text-gray-500 py-2">No categories found</span>
              )}
            </div>
          </div>

          {/* Section Title */}
          <div className="px-4 py-4 flex justify-between items-end mt-2">
            <h3 className="text-lg font-bold">Popular Products</h3>
            <button className="text-sm text-indigo-600 font-medium hover:underline">View All</button>
          </div>

          {/* Product Grid */}
          <div className="px-4 grid grid-cols-2 gap-4">
            {filteredProducts.map((product, idx) => (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                key={product.id}
                onClick={() => setSelectedProduct(product)}
                className="bg-white rounded-2xl p-3 shadow-sm border border-gray-100 flex flex-col group cursor-pointer hover:shadow-md transition-shadow"
              >
                <div className="relative aspect-square rounded-xl overflow-hidden mb-3 bg-gray-100">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <button className="absolute top-2 right-2 p-1.5 bg-white/80 backdrop-blur-sm rounded-full text-gray-400 hover:text-red-500 transition-colors">
                    <Heart className="w-4 h-4" />
                  </button>
                </div>
                <div className="flex-1 flex flex-col">
                  <h4 className="text-sm font-medium text-gray-800 line-clamp-2 mb-1">{product.name}</h4>
                  <div className="flex items-center gap-1 mb-2">
                    <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                    <span className="text-xs text-gray-500 font-medium">{product.rating}</span>
                  </div>
                  <div className="mt-auto flex flex-col gap-2 pt-2">
                    <span className="font-bold text-gray-900">₹{product.price.toFixed(2)}</span>
                    <button 
                      onClick={(e) => { e.stopPropagation(); addToCart(product); }}
                      className="w-full bg-gray-900 text-white py-2 rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors flex items-center justify-center gap-2"
                    >
                      <ShoppingBag className="w-4 h-4" /> Add to Cart
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      );
    }

    if (activeTab === 'catalog') {
      const catalogCategories = ['Clothing', 'Sports', 'Electronics', 'Watches', 'Wearables'];
      
      return (
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="px-4 py-6 flex flex-col min-h-full"
        >
          <h2 className="text-xl font-bold mb-6">Browse Categories</h2>
          
          <div className="grid grid-cols-2 gap-4">
            {catalogCategories.map((category, idx) => {
              const categoryProduct = PRODUCTS.find(p => p.category === category);
              const bgImage = categoryProduct ? categoryProduct.image : 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?auto=format&fit=crop&w=400&q=80';

              return (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  key={category}
                  onClick={() => {
                    setActiveCategory(category);
                    setActiveTab('home');
                  }}
                  className="relative h-32 rounded-2xl overflow-hidden cursor-pointer group shadow-sm border border-gray-100"
                >
                  <img 
                    src={bgImage} 
                    alt={category} 
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <h3 className="text-white font-bold text-lg tracking-wide">{category}</h3>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      );
    }

    // Fallback for other tabs
    return (
      <div className="flex-1 flex items-center justify-center h-full text-gray-400 flex-col gap-4 mt-20">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
          {activeTab === 'catalog' && <Grid className="w-8 h-8 text-gray-300" />}
        </div>
        <p className="font-medium capitalize">{activeTab} coming soon</p>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-200 flex justify-center font-sans text-gray-900">
      {/* Mobile Device Container */}
      <div className="w-full max-w-md bg-gray-50 min-h-screen relative shadow-2xl flex flex-col overflow-hidden sm:border-x sm:border-gray-300">
        
        {selectedProduct && (
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            className="absolute inset-0 z-50 bg-white flex flex-col"
          >
            <header className="px-4 py-4 flex items-center justify-between absolute top-0 w-full z-10 bg-gradient-to-b from-black/50 to-transparent text-white">
              <button onClick={() => setSelectedProduct(null)} className="p-2 bg-white/20 backdrop-blur-md rounded-full hover:bg-white/30 transition-colors">
                <ArrowLeft className="w-6 h-6" />
              </button>
              <button className="p-2 bg-white/20 backdrop-blur-md rounded-full hover:bg-white/30 transition-colors">
                <Heart className="w-6 h-6" />
              </button>
            </header>

            <main className="flex-1 overflow-y-auto pb-6 scrollbar-hide">
              <div className="w-full aspect-[4/5] bg-gray-100 relative">
                <img src={selectedProduct.image} alt={selectedProduct.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              </div>
              
              <div className="p-5 bg-white rounded-t-3xl -mt-6 relative z-10">
                <div className="flex justify-between items-start mb-2">
                  <h2 className="text-2xl font-bold text-gray-900">{selectedProduct.name}</h2>
                  <span className="text-2xl font-bold text-indigo-600">₹{selectedProduct.price.toFixed(2)}</span>
                </div>
                
                <div className="flex items-center gap-1 mb-6">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                  <span className="text-sm font-medium text-gray-700">{selectedProduct.rating} Rating</span>
                </div>

                <button 
                  onClick={() => { addToCart(selectedProduct); setSelectedProduct(null); setActiveTab('cart'); }}
                  className="w-full bg-gray-900 text-white py-4 rounded-xl font-semibold hover:bg-gray-800 transition-colors flex items-center justify-center gap-2 shadow-sm mb-8"
                >
                  <ShoppingBag className="w-5 h-5" /> Add to Cart - ₹{selectedProduct.price.toFixed(2)}
                </button>
                
                <h3 className="text-lg font-bold mb-2">Description</h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-6">
                  {selectedProduct.description}
                </p>
                
                <div className="bg-indigo-50/50 p-4 rounded-xl border border-indigo-100 mb-8 space-y-3">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-indigo-600 mt-0.5" />
                    <div>
                      <p className="text-xs text-gray-500 font-medium">Ships from</p>
                      <p className="text-sm font-semibold text-gray-900">{selectedProduct.origin}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Truck className="w-5 h-5 text-indigo-600 mt-0.5" />
                    <div>
                      <p className="text-xs text-gray-500 font-medium">Estimated Delivery</p>
                      <p className="text-sm font-semibold text-gray-900">{selectedProduct.deliveryDate}</p>
                    </div>
                  </div>
                </div>
                
                <h3 className="text-lg font-bold mb-4">Customer Reviews</h3>
                <div className="space-y-4 mb-6">
                  <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center text-xs font-bold text-indigo-600">JD</div>
                      <div>
                        <span className="text-sm font-bold block">John Doe</span>
                        <div className="flex text-amber-400">
                          <Star className="w-3 h-3 fill-current" /><Star className="w-3 h-3 fill-current" /><Star className="w-3 h-3 fill-current" /><Star className="w-3 h-3 fill-current" /><Star className="w-3 h-3 fill-current" />
                        </div>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600">Absolutely love this! The quality is top-notch and it looks exactly like the pictures. Highly recommend.</p>
                  </div>
                  
                  {(productReviews[selectedProduct.id] || []).map((review, idx) => (
                    <div key={idx} className="bg-gray-50 p-4 rounded-2xl border border-gray-100">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center text-xs font-bold text-green-600">You</div>
                        <div>
                          <span className="text-sm font-bold block">You</span>
                          <div className="flex text-amber-400">
                            <Star className="w-3 h-3 fill-current" /><Star className="w-3 h-3 fill-current" /><Star className="w-3 h-3 fill-current" /><Star className="w-3 h-3 fill-current" /><Star className="w-3 h-3 fill-current" />
                          </div>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600">{review}</p>
                    </div>
                  ))}
                </div>

                <div className="flex items-center gap-2 bg-gray-50 p-2 rounded-xl border border-gray-200">
                  <input 
                    type="text" 
                    value={reviewText}
                    onChange={(e) => setReviewText(e.target.value)}
                    placeholder="Write your review..." 
                    className="flex-1 bg-transparent outline-none px-3 text-sm"
                    onKeyDown={(e) => e.key === 'Enter' && handleAddReview()}
                  />
                  <button onClick={handleAddReview} className="p-2.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </main>
          </motion.div>
        )}

        {/* Sidebar Overlay */}
        {isSidebarOpen && (
          <div className="absolute inset-0 z-50 flex">
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              className="absolute inset-0 bg-black/50"
              onClick={() => setIsSidebarOpen(false)}
            />
            <motion.div 
              initial={{ x: '-100%' }} 
              animate={{ x: 0 }} 
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="relative w-3/4 max-w-sm bg-white h-full shadow-2xl flex flex-col z-10"
            >
              <div className="p-6 bg-indigo-600 text-white flex items-center gap-4">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                  <User className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="font-bold text-lg">Welcome</h2>
                  <p className="text-indigo-200 text-sm">Sign in to your account</p>
                </div>
              </div>
              
              <div className="flex-1 overflow-y-auto py-4">
                <div className="px-4 mb-2">
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Menu</p>
                </div>
                
                <button 
                  onClick={() => { setIsSidebarOpen(false); setActiveTab('home'); }}
                  className="w-full flex items-center gap-4 px-6 py-3 hover:bg-gray-50 transition-colors text-left"
                >
                  <Home className="w-5 h-5 text-gray-400" />
                  <span className="font-medium text-gray-700">Home</span>
                </button>

                <button 
                  onClick={() => { setIsSidebarOpen(false); setActiveTab('profile'); }}
                  className="w-full flex items-center gap-4 px-6 py-3 hover:bg-gray-50 transition-colors text-left"
                >
                  <LogIn className="w-5 h-5 text-gray-400" />
                  <span className="font-medium text-gray-700">Sign In</span>
                </button>
                
                <button 
                  onClick={() => { setIsSidebarOpen(false); setActiveTab('cart'); }}
                  className="w-full flex items-center gap-4 px-6 py-3 hover:bg-gray-50 transition-colors text-left"
                >
                  <ShoppingBag className="w-5 h-5 text-gray-400" />
                  <span className="font-medium text-gray-700">Cart</span>
                </button>
                
                <button 
                  onClick={() => { setIsSidebarOpen(false); setActiveTab('profile'); setExpandedSection('orders'); }}
                  className="w-full flex items-center gap-4 px-6 py-3 hover:bg-gray-50 transition-colors text-left"
                >
                  <Grid className="w-5 h-5 text-gray-400" />
                  <span className="font-medium text-gray-700">My Orders</span>
                </button>

                <div className="px-4 mt-6 mb-2">
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Support</p>
                </div>

                <button 
                  onClick={() => { setIsSidebarOpen(false); setActiveTab('profile'); setExpandedSection('about'); }}
                  className="w-full flex items-center gap-4 px-6 py-3 hover:bg-gray-50 transition-colors text-left"
                >
                  <Info className="w-5 h-5 text-gray-400" />
                  <span className="font-medium text-gray-700">About Us</span>
                </button>

                <button 
                  onClick={() => { setIsSidebarOpen(false); setActiveTab('profile'); setExpandedSection('contact'); }}
                  className="w-full flex items-center gap-4 px-6 py-3 hover:bg-gray-50 transition-colors text-left"
                >
                  <Phone className="w-5 h-5 text-gray-400" />
                  <span className="font-medium text-gray-700">Contact Us</span>
                </button>
                
                <button 
                  onClick={() => { setIsSidebarOpen(false); setActiveTab('profile'); setExpandedSection('faq'); }}
                  className="w-full flex items-center gap-4 px-6 py-3 hover:bg-gray-50 transition-colors text-left"
                >
                  <HelpCircle className="w-5 h-5 text-gray-400" />
                  <span className="font-medium text-gray-700">FAQ's</span>
                </button>
              </div>
            </motion.div>
          </div>
        )}

        {/* Header */}
        <header className="bg-white px-4 py-4 flex items-center justify-between sticky top-0 z-30 shadow-sm">
          <div className="flex items-center gap-3">
            <button onClick={() => setIsSidebarOpen(true)} className="p-2 -ml-2 hover:bg-gray-100 rounded-full transition-colors">
              <Menu className="w-6 h-6" />
            </button>
            {activeTab === 'home' ? (
              <h1 className="text-xl font-bold tracking-tight">ShopHub</h1>
            ) : (
              <h1 className="text-xl font-bold tracking-tight capitalize">{activeTab}</h1>
            )}
          </div>
          <div className="flex items-center gap-2">
            <button 
              onClick={() => setShowNotifications(!showNotifications)}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors relative"
            >
              <Bell className="w-5 h-5" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
            </button>
            {activeTab === 'home' && (
              <button 
                onClick={() => {
                  setIsSearchOpen(!isSearchOpen);
                  if (isSearchOpen) {
                    setSearchQuery('');
                    setSearchInput('');
                  }
                }}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <Search className="w-5 h-5" />
              </button>
            )}
          </div>
        </header>

        {/* Search Bar */}
        {isSearchOpen && activeTab === 'home' && (
          <div className="px-4 py-3 bg-white border-b border-gray-100 z-20 relative shadow-sm">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input 
                type="text" 
                placeholder="Search products or categories..." 
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    setSearchQuery(searchInput);
                    e.currentTarget.blur();
                  }
                }}
                className="w-full bg-gray-50 border border-gray-200 rounded-full py-2.5 pl-10 pr-4 text-sm outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
                autoFocus
              />
            </div>
          </div>
        )}

        {/* Notifications Dropdown */}
        {showNotifications && (
          <div className="absolute top-16 left-4 right-4 bg-white rounded-2xl shadow-xl border border-gray-100 z-40 overflow-hidden flex flex-col max-h-[60vh]">
            <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
              <h3 className="font-bold text-gray-900">Notifications</h3>
              <button onClick={() => setShowNotifications(false)} className="text-xs text-indigo-600 font-medium hover:underline">Close</button>
            </div>
            <div className="overflow-y-auto scrollbar-hide">
              {NOTIFICATIONS.map(notif => (
                <div key={notif.id} className={`p-4 border-b border-gray-50 hover:bg-gray-50 transition-colors ${notif.unread ? 'bg-indigo-50/30' : ''}`}>
                  <div className="flex justify-between items-start mb-1">
                    <h4 className={`text-sm ${notif.unread ? 'font-bold text-gray-900' : 'font-medium text-gray-700'}`}>{notif.title}</h4>
                    <span className="text-[10px] text-gray-400 whitespace-nowrap ml-2">{notif.time}</span>
                  </div>
                  <p className="text-xs text-gray-600 leading-relaxed">{notif.message}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto pb-24 scrollbar-hide">
          {renderContent()}
        </main>

        {/* Bottom Navigation */}
        <nav className="absolute bottom-0 w-full bg-white border-t border-gray-200 px-6 py-3 flex justify-between items-center z-20 pb-6 sm:pb-3">
          {[
            { id: 'home', icon: Home, label: 'Home' },
            { id: 'catalog', icon: Grid, label: 'Catalog' },
            { id: 'cart', icon: ShoppingBag, label: 'Cart', badge: cartItemCount > 0 ? cartItemCount : undefined },
            { id: 'profile', icon: User, label: 'Profile' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex flex-col items-center gap-1 p-2 ${
                activeTab === tab.id ? 'text-indigo-600' : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              <div className="relative">
                <tab.icon className={`w-6 h-6 ${activeTab === tab.id ? 'fill-indigo-50' : ''}`} />
                {tab.badge && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center border-2 border-white">
                    {tab.badge}
                  </span>
                )}
              </div>
              <span className="text-[10px] font-medium">{tab.label}</span>
            </button>
          ))}
        </nav>

        {/* Tracking Modal */}
        {trackingOrder && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-2xl w-full max-w-md overflow-hidden flex flex-col max-h-[90vh]"
            >
              <div className="p-4 border-b flex justify-between items-center bg-gray-50">
                <h3 className="font-bold text-lg">Track Order #{trackingOrder.id.toUpperCase()}</h3>
                <button onClick={() => setTrackingOrder(null)} className="p-1 hover:bg-gray-200 rounded-full transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="p-4 overflow-y-auto">
                <div className="mb-6">
                  <h4 className="font-semibold text-gray-700 mb-3">Order Details</h4>
                  <div className="space-y-3">
                    {trackingOrder.items.map((item, idx) => (
                      <div key={idx} className="flex items-center gap-3 bg-gray-50 p-2 rounded-xl">
                        <img src={item.product.image} alt={item.product.name} className="w-12 h-12 object-cover rounded-lg" />
                        <div className="flex-1">
                          <p className="text-sm font-medium">{item.product.name}</p>
                          <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                        </div>
                        <span className="font-semibold text-sm">₹{(item.product.price * item.quantity).toFixed(2)}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold text-gray-700 mb-4">Tracking Status</h4>
                  <div className="relative pl-4 border-l-2 border-indigo-100 space-y-6 pb-4">
                    <div className="relative">
                      <div className="absolute -left-[21px] bg-indigo-600 rounded-full p-1">
                        <CheckCircle className="w-3 h-3 text-white" />
                      </div>
                      <p className="text-sm font-bold text-indigo-600">Order Placed</p>
                      <p className="text-xs text-gray-500">{trackingOrder.date}</p>
                    </div>
                    <div className="relative">
                      <div className="absolute -left-[21px] bg-indigo-600 rounded-full p-1">
                        <Package className="w-3 h-3 text-white" />
                      </div>
                      <p className="text-sm font-bold text-indigo-600">Processing</p>
                      <p className="text-xs text-gray-500">Currently being packed</p>
                    </div>
                    <div className="relative">
                      <div className="absolute -left-[21px] bg-gray-200 rounded-full p-1">
                        <Truck className="w-3 h-3 text-gray-400" />
                      </div>
                      <p className="text-sm font-medium text-gray-500">Shipped</p>
                      <p className="text-xs text-gray-400">Pending</p>
                    </div>
                    <div className="relative">
                      <div className="absolute -left-[21px] bg-gray-200 rounded-full p-1">
                        <MapPin className="w-3 h-3 text-gray-400" />
                      </div>
                      <p className="text-sm font-medium text-gray-500">Out for Delivery</p>
                      <p className="text-xs text-gray-400">Pending</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
}
