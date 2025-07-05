import React, { useState } from 'react';
import { Star, MapPin, TrendingUp, RefreshCw } from 'lucide-react';

const BusinessDashboard = () => {
  const [formData, setFormData] = useState({
    name: '',
    location: ''
  });
  const [businessData, setBusinessData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [headlineLoading, setHeadlineLoading] = useState(false);
  const [errors, setErrors] = useState({});

  // Simulated backend data (since we can't make actual API calls in this environment)
  const sampleHeadlines = [
    "Why {name} is {location}'s Best Kept Secret in 2025",
    "Discover {name}: {location}'s Premium Destination",
    "Local Favorite: {name} Dominates {location} Market",
    "Top-Rated {name} Transforms {location}'s Landscape",
    "Expert Review: {name} Sets New Standards in {location}",
    "Hidden Gem: {name} Becomes {location}'s Talk of the Town"
  ];

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) {
      newErrors.name = 'Business name is required';
    }
    if (!formData.location.trim()) {
      newErrors.location = 'Location is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const generateRandomData = () => {
    const rating = (Math.random() * 1.5 + 3.5).toFixed(1); // 3.5 to 5.0
    const reviews = Math.floor(Math.random() * 500 + 50); // 50 to 550
    const headlineTemplate = sampleHeadlines[Math.floor(Math.random() * sampleHeadlines.length)];
    const headline = headlineTemplate
      .replace('{name}', formData.name)
      .replace('{location}', formData.location);
    
    return { rating: parseFloat(rating), reviews, headline };
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const data = generateRandomData();
    setBusinessData(data);
    setLoading(false);
  };

  const regenerateHeadline = async () => {
    setHeadlineLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const headlineTemplate = sampleHeadlines[Math.floor(Math.random() * sampleHeadlines.length)];
    const newHeadline = headlineTemplate
      .replace('{name}', formData.name)
      .replace('{location}', formData.location);
    
    setBusinessData(prev => ({ ...prev, headline: newHeadline }));
    setHeadlineLoading(false);
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-5 h-5 ${
          i < Math.floor(rating) 
            ? 'fill-yellow-400 text-yellow-400' 
            : i < rating 
            ? 'fill-yellow-200 text-yellow-400' 
            : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Local Business Dashboard
          </h1>
          <p className="text-gray-600">
            Analyze your business performance and SEO content
          </p>
        </div>

        {/* Input Form */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
            <TrendingUp className="w-6 h-6 mr-2 text-blue-600" />
            Business Information
          </h2>
          
          <div className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Business Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.name ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Enter your business name"
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Location
                </label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.location ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Enter your location"
                />
                {errors.location && (
                  <p className="text-red-500 text-sm mt-1">{errors.location}</p>
                )}
              </div>
            </div>
            
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <RefreshCw className="w-5 h-5 animate-spin mr-2" />
                  Analyzing...
                </div>
              ) : (
                'Analyze Business'
              )}
            </button>
          </div>
        </div>

        {/* Display Card */}
        {businessData && (
          <div className="bg-white rounded-xl shadow-lg p-6 animate-fade-in">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold text-gray-800">
                Business Analytics
              </h2>
              <div className="flex items-center text-gray-600">
                <MapPin className="w-5 h-5 mr-1" />
                <span className="font-medium">{formData.location}</span>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-6">
              {/* Rating Card */}
              <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg p-4 border border-yellow-200">
                <div className="flex items-center mb-2">
                  <Star className="w-5 h-5 text-yellow-500 mr-2" />
                  <span className="text-sm font-medium text-gray-600">Google Rating</span>
                </div>
                <div className="flex items-center">
                  <span className="text-3xl font-bold text-gray-800 mr-2">
                    {businessData.rating}
                  </span>
                  <div className="flex">
                    {renderStars(businessData.rating)}
                  </div>
                </div>
              </div>

              {/* Reviews Card */}
              <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg p-4 border border-blue-200">
                <div className="flex items-center mb-2">
                  <TrendingUp className="w-5 h-5 text-blue-500 mr-2" />
                  <span className="text-sm font-medium text-gray-600">Total Reviews</span>
                </div>
                <span className="text-3xl font-bold text-gray-800">
                  {businessData.reviews.toLocaleString()}
                </span>
              </div>

              {/* Business Name Card */}
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-4 border border-green-200">
                <div className="flex items-center mb-2">
                  <MapPin className="w-5 h-5 text-green-500 mr-2" />
                  <span className="text-sm font-medium text-gray-600">Business</span>
                </div>
                <span className="text-lg font-bold text-gray-800">
                  {formData.name}
                </span>
              </div>
            </div>

            {/* SEO Headline Section */}
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-6 border border-purple-200">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-800">
                  AI-Generated SEO Headline
                </h3>
                <button
                  onClick={regenerateHeadline}
                  disabled={headlineLoading}
                  className="flex items-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <RefreshCw className={`w-4 h-4 mr-2 ${headlineLoading ? 'animate-spin' : ''}`} />
                  {headlineLoading ? 'Generating...' : 'Regenerate'}
                </button>
              </div>
              
              <div className="bg-white rounded-lg p-4 border border-purple-100">
                <p className="text-gray-800 text-lg leading-relaxed">
                  {businessData.headline}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BusinessDashboard;