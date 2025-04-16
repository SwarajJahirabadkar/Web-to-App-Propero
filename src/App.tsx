import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { 
  AlertCircle, Check, ChevronRight, Info, Smartphone, Mail, 
  Building2, Lock, Upload, Bell, Navigation, 
  ArrowUp, Zap, Shield, Globe, ArrowRight 
} from 'lucide-react';

function FloatingLabel({ id, label, type = 'text', value, onChange, error, info, placeholder }) {
  return (
    <div className="relative mb-6">
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        className={`peer w-full px-4 py-3 rounded-lg border ${
          error ? 'border-red-300' : 'border-gray-300'
        } focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all bg-white`}
        placeholder={placeholder}
      />
      <label
        htmlFor={id}
        className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
      >
        {label}
      </label>
      {info && (
        <div className="absolute right-3 top-1/2 -translate-y-1/2">
          <div className="group relative">
            <Info className="w-4 h-4 text-gray-400" />
            <div className="absolute bottom-full mb-2 hidden group-hover:block w-48 bg-gray-800 text-white text-xs rounded p-2">
              {info}
            </div>
          </div>
        </div>
      )}
      {error && <p className="mt-1 text-xs text-red-500 flex items-center gap-1"><AlertCircle className="w-3 h-3" /> {error}</p>}
      {!error && value && <Check className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-green-500" />}
    </div>
  );
}

function FeatureCard({ icon: Icon, title, description, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
    >
      <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
        <Icon className="w-6 h-6 text-orange-500" />
      </div>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-gray-600 text-sm">{description}</p>
    </motion.div>
  );
}

function App() {
  const [formData, setFormData] = useState({
    appUrl: '',
    appName: '',
    email: '',
    company: '',
    password: '',
    addPushNotifications: false,
    addBottomNav: false
  });
  const [appLogo, setAppLogo] = useState(null);
  const [previewLogo, setPreviewLogo] = useState('');
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const fileInputRef = useRef(null);

  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAppLogo(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewLogo(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setShowSuccess(true);
    setIsLoading(false);
  };

  const highlights = [
    "Generate Android & iOS app in one click",
    "Easy push notification integration",
    "Custom branding with your company logo",
    "Seamless bottom navigation",
    "Real-time app preview"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white">
      {/* Hero Image */}
      <div className="absolute top-0 right-0 w-full h-[500px] bg-[url('https://images.unsplash.com/photo-1522199755839-a2bacb67c546?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2072&q=80')] bg-cover bg-center opacity-5"></div>

      {/* Back to Top Button */}
      <motion.button 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-8 right-8 bg-white p-3 rounded-full shadow-lg hover:shadow-xl transition-all z-50"
      >
        <ArrowUp className="w-5 h-5 text-gray-600" />
      </motion.button>

      <div className="max-w-7xl mx-auto px-4 py-12 relative">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Make Your Own App
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Transform your website into a native mobile app for both iOS and Android platforms.
            Get started in minutes with our simple conversion process.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Form Section */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8"
          >
            <form onSubmit={handleSubmit}>
              <FloatingLabel
                id="appUrl"
                label="App URL"
                value={formData.appUrl}
                onChange={(e) => setFormData({ ...formData, appUrl: e.target.value })}
                error={errors.appUrl}
                info="Your website URL that will be converted to an app"
                placeholder="https://example.com"
              />
              <FloatingLabel
                id="appName"
                label="App Name"
                value={formData.appName}
                onChange={(e) => setFormData({ ...formData, appName: e.target.value })}
                error={errors.appName}
                info="Name that will appear on app stores"
                placeholder="My Awesome App"
              />
              <FloatingLabel
                id="email"
                label="Email Address"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                error={errors.email}
                info="We'll send the app build status here"
                placeholder="your@company.com"
              />
              <FloatingLabel
                id="company"
                label="Company Name"
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                error={errors.company}
                info="Your company or organization name"
                placeholder="Acme Inc"
              />
              <FloatingLabel
                id="password"
                label="JKS File Password"
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                error={errors.password}
                info="Password for your Android keystore file"
                placeholder="Min. 8 characters with numbers and symbols"
              />

              {/* App Logo Upload */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  App Logo (200x200 to 512x512 pixels)
                </label>
                <div className="flex items-center gap-4">
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="px-4 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-orange-500/20"
                  >
                    <Upload className="w-4 h-4 inline-block mr-2" />
                    Choose File
                  </button>
                  {previewLogo && (
                    <div className="w-12 h-12 rounded-lg overflow-hidden">
                      <img src={previewLogo} alt="App Logo Preview" className="w-full h-full object-cover" />
                    </div>
                  )}
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleLogoChange}
                />
              </div>

              {/* Checkboxes */}
              <div className="space-y-4 mb-8">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.addPushNotifications}
                    onChange={(e) => setFormData({ ...formData, addPushNotifications: e.target.checked })}
                    className="w-4 h-4 text-orange-500 rounded focus:ring-orange-500"
                  />
                  <span className="text-gray-700">Add push notifications</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.addBottomNav}
                    onChange={(e) => setFormData({ ...formData, addBottomNav: e.target.checked })}
                    className="w-4 h-4 text-orange-500 rounded focus:ring-orange-500"
                  />
                  <span className="text-gray-700">Add bottom navigation</span>
                </label>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className={`w-full bg-orange-500 text-white px-6 py-3 rounded-lg font-medium
                  hover:bg-orange-600 focus:outline-none focus:ring-4 focus:ring-orange-500/20
                  transform active:scale-95 transition-all ${isLoading ? 'opacity-75' : ''}`}
              >
                {isLoading ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Converting...
                  </span>
                ) : 'Create My App'}
              </button>
            </form>
          </motion.div>

          {/* Preview Card */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8"
          >
            <h3 className="text-lg font-semibold mb-6">App Preview</h3>
            <div className="space-y-6">
              <div className="flex items-start gap-3">
                <Globe className="w-5 h-5 text-gray-400 mt-1" />
                <div>
                  <p className="font-medium text-gray-700">App URL</p>
                  <p className="text-gray-600">{formData.appUrl || 'Not set'}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Smartphone className="w-5 h-5 text-gray-400 mt-1" />
                <div>
                  <p className="font-medium text-gray-700">App Name</p>
                  <p className="text-gray-600">{formData.appName || 'Not set'}</p>
                </div>
              </div>
              {previewLogo && (
                <div className="flex items-start gap-3">
                  <div className="w-16 h-16 rounded-xl overflow-hidden">
                    <img src={previewLogo} alt="App Logo" className="w-full h-full object-cover" />
                  </div>
                </div>
              )}
              <div className="flex items-start gap-3">
                <Navigation className="w-5 h-5 text-gray-400 mt-1" />
                <div>
                  <p className="font-medium text-gray-700">Features</p>
                  <ul className="text-gray-600 text-sm space-y-1 mt-1">
                    {formData.addPushNotifications && (
                      <li className="flex items-center gap-1">
                        <Bell className="w-4 h-4" />
                        Push Notifications Enabled
                      </li>
                    )}
                    {formData.addBottomNav && (
                      <li className="flex items-center gap-1">
                        <Navigation className="w-4 h-4" />
                        Bottom Navigation Enabled
                      </li>
                    )}
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Highlights Carousel */}
        <div className="relative overflow-hidden my-16 py-4">
          <div className="flex animate-scroll">
            {[...highlights, ...highlights].map((text, i) => (
              <div
                key={i}
                className="flex items-center gap-2 text-gray-600 whitespace-nowrap mx-8"
              >
                <ChevronRight className="w-4 h-4 text-orange-500" />
                {text}
              </div>
            ))}
          </div>
        </div>

        {/* Illustration Section */}
        <div className="mb-16">
          <img 
            src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2015&q=80"
            alt="Development Process"
            className="w-full h-64 object-cover rounded-2xl"
          />
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <FeatureCard
            icon={Smartphone}
            title="Native Mobile Apps"
            description="Convert your website into native Android and iOS apps with just a few clicks."
            delay={0.2}
          />
          <FeatureCard
            icon={Bell}
            title="Push Notifications"
            description="Engage your users with targeted push notifications to boost engagement."
            delay={0.4}
          />
          <FeatureCard
            icon={Navigation}
            title="Bottom Navigation"
            description="Add intuitive bottom navigation for better user experience and app-like feel."
            delay={0.6}
          />
        </div>

        {/* Web to App Conversion Section */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <div className="relative">
            <img 
              src="https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1974&q=80" 
              alt="Web to App Process"
              className="rounded-2xl shadow-lg"
            />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Web to App Conversion</h2>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Globe className="w-4 h-4 text-orange-500" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-1">Website Integration</h3>
                  <p className="text-gray-600">Your website is seamlessly converted into native mobile apps while maintaining all functionality.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Smartphone className="w-4 h-4 text-orange-500" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-1">Native Features</h3>
                  <p className="text-gray-600">Access device features like push notifications, camera, and location services.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Shield className="w-4 h-4 text-orange-500" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-1">Secure & Reliable</h3>
                  <p className="text-gray-600">Enterprise-grade security with regular updates and maintenance.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* How It Works Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 mb-16"
        >
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <Zap className="w-6 h-6 text-orange-500" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">How It Works</h2>
              <p className="text-gray-600">Convert your website into native mobile apps in 4 simple steps</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center text-orange-500 font-semibold">
                  1
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 mb-1">Enter Your Website URL</h4>
                  <p className="text-gray-600 text-sm">Provide your website URL and basic information about your app.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center text-orange-500 font-semibold">
                  2
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 mb-1">Customize Your App</h4>
                  <p className="text-gray-600 text-sm">Add your logo, enable push notifications, and customize navigation.</p>
                </div>
              </div>
            </div>
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center text-orange-500 font-semibold">
                  3
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 mb-1">Preview & Configure</h4>
                  <p className="text-gray-600 text-sm">Review your app's appearance and features in real-time.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center text-orange-500 font-semibold">
                  4
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 mb-1">Generate & Download</h4>
                  <p className="text-gray-600 text-sm">Get your ready-to-publish Android and iOS app files.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 p-4 bg-orange-50 rounded-lg">
            <p className="text-sm text-orange-800 flex items-center gap-2">
              <Info className="w-4 h-4" />
              Your apps will be ready for submission to the App Store and Play Store after generation.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default App;