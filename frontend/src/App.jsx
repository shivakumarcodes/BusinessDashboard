import { useState } from 'react';

function App() {
  const [formData, setFormData] = useState({
    name: '',
    location: ''
  });
  const [businessData, setBusinessData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const fetchBusinessData = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.location) {
      setError('Please fill in all fields');
      return;
    }
    
    setLoading(true);
    setError('');
    
    try {
      const response = await fetch('https://businessdashboard-rnch.onrender.com/business-data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });
      
      if (!response.ok) throw new Error('Failed to fetch business data');
      
      const data = await response.json();
      setBusinessData(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const regenerateHeadline = async () => {
    if (!formData.name || !formData.location) return;
    
    setLoading(true);
    
    try {
      const response = await fetch(
        `https://businessdashboard-rnch.onrender.com/regenerate-headline?name=${encodeURIComponent(formData.name)}&location=${encodeURIComponent(formData.location)}`
      );
      
      if (!response.ok) throw new Error('Failed to regenerate headline');
      
      const { headline } = await response.json();
      setBusinessData(prev => ({
        ...prev,
        headline
      }));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Business Dashboard</h1>
        
        {/* Input Form */}
        <form onSubmit={fetchBusinessData} className="mb-8">
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">
              Business Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="e.g. Cake & Co"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="location" className="block text-gray-700 text-sm font-bold mb-2">
              Location
            </label>
            <input
              type="text"
              id="location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="e.g. Mumbai"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:opacity-50"
          >
            {loading ? 'Loading...' : 'Get Business Data'}
          </button>
          {error && <p className="text-red-500 text-xs italic mt-2">{error}</p>}
        </form>
        
        {/* Display Card */}
        {businessData && (
          <div className="border border-gray-200 rounded-lg p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">{formData.name}</h2>
            <div className="flex items-center mb-4">
              <div className="flex items-center mr-8">
                <span className="text-yellow-400 text-2xl mr-2">★</span>
                <span className="font-bold">{businessData.rating}</span>
              </div>
              <div>
                <span className="text-gray-600">{businessData.reviews} reviews</span>
              </div>
            </div>
            <div className="mb-6">
              <h3 className="text-sm font-medium text-gray-500 mb-1">SEO Headline</h3>
              <p className="text-lg font-medium text-gray-800">{businessData.headline}</p>
            </div>
            <button
              onClick={regenerateHeadline}
              disabled={loading}
              className="bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:opacity-50"
            >
              {loading ? 'Regenerating...' : 'Regenerate SEO Headline'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;