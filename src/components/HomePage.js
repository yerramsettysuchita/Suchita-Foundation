import React from 'react';
import { Search } from 'lucide-react';

// Define interventions data outside the component
const interventionsData = [
  {
    title: 'Reproductive & Child Health',
    description: 'Education and support for reproductive health, pregnancy, and childcare, ensuring better healthcare decisions and outcomes for mothers and children.',
    image: '/api/placeholder/400/300'
  },
  {
    title: 'Nutrition Enhancement',
    description: 'Promoting better nutrition awareness and practices for women and children to improve overall health and well-being in communities.',
    image: '/api/placeholder/400/300'
  },
  {
    title: 'Entrepreneurial Development',
    description: 'Empowering women with business skills, financial knowledge, and resources to build successful enterprises and achieve economic independence.',
    image: '/api/placeholder/400/300'
  },
  {
    title: 'Digital Financial Literacy',
    description: 'Training in digital banking, online transactions, and financial management to help women navigate the modern digital economy.',
    image: '/api/placeholder/400/300'
  },
  {
    title: 'Sustainability in Communication',
    description: 'Building sustainable practices and environmental awareness to create long-lasting positive impact in communities.',
    image: '/api/placeholder/400/300'
  },
  {
    title: 'Government Convergence',
    description: 'Strengthening connections between communities and government initiatives to maximize support and resources.',
    image: '/api/placeholder/400/300'
  },
  {
    title: 'Self Defense Training',
    description: 'Equipping women with physical techniques and mental strategies for personal safety and confidence building.',
    image: '/api/placeholder/400/300'
  },
  {
    title: 'Small Business Intervention',
    description: 'Specialized support and guidance for women entrepreneurs to establish and grow successful small businesses.',
    image: '/api/placeholder/400/300'
  },
  {
    title: 'Work with Us',
    description: 'Join our team in making a difference. Explore career opportunities to contribute to womens empowerment initiatives.',
    image: '/api/placeholder/400/300'
  },
  {
    title: 'Volunteer/Internships',
    description: 'Opportunities for learning and contributing to social change through meaningful volunteer work and internships.',
    image: '/api/placeholder/400/300'
  },
  {
    title: 'Skill-Wise Resume Parsing',
    description: 'Advanced career development services helping women match their skills with suitable job opportunities.',
    image: '/api/placeholder/400/300'
  },
  {
    title: 'Donation Gateway',
    description: 'Support our mission through secure donations. Your contribution helps create lasting change in womens lives.',
    image: '/api/placeholder/400/300'
  }
];

const HomePage = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="flex items-center justify-between px-6 py-4 bg-white">
        <div className="flex items-center space-x-2">
          <img src="/api/placeholder/80/80" alt="Suchita Foundation Logo" className="w-16 h-16" />
          <h1 className="text-2xl font-bold text-gray-900">Suchita Foundation</h1>
        </div>
        
        <div className="flex-1 max-w-xl mx-8">
          <div className="relative">
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            <input
              type="text"
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:border-brown-500"
              placeholder="Search..."
            />
          </div>
        </div>

        <button className="px-6 py-2 bg-amber-800 text-white rounded-lg hover:bg-amber-700 transition-colors">
          Donate Us
        </button>
      </nav>

      {/* Main Menu */}
      <div className="flex justify-center space-x-8 py-4 bg-white text-gray-800">
        {['About Us', 'Our Work', 'Campaigns', 'Get Involved', 'Media', 'Resource Centre', 'Contact Us'].map((item) => (
          <a key={item} href="#" className="hover:text-amber-800 transition-colors">
            {item}
          </a>
        ))}
      </div>

      {/* Hero Section */}
      <section className="relative">
        <img 
          src="/api/placeholder/1200/400" 
          alt="Weaving" 
          className="w-full h-96 object-cover"
        />
        
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent">
          <div className="container mx-auto px-6 py-20">
            <div className="max-w-xl">
              <h2 className="text-5xl font-bold text-white mb-6">
                Exploring the Future with Women
              </h2>
              <p className="text-white mb-8">
                Women's empowerment may be defined in several method, including accepting women's viewpoints, making an effort to seek them and raising the status of women through education, awareness, literacy, equal status in society, better livelihood and training.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Interventions Section */}
      <section className="py-16 bg-amber-800">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-white mb-12 text-center">Our Interventions</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {interventionsData.map((intervention, index) => (
              <div key={index} className="bg-white rounded-lg overflow-hidden shadow-lg transform hover:scale-105 transition-all duration-300">
                <img 
                  src={intervention.image} 
                  alt={intervention.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-3 text-gray-900">{intervention.title}</h3>
                  <p className="text-gray-600 mb-4 h-24 overflow-hidden">{intervention.description}</p>
                  <button className="w-full bg-amber-800 text-white px-6 py-2 rounded-lg hover:bg-amber-700 transition-colors mt-2">
                    Read More
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section className="py-16 bg-amber-100">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-gray-900 mb-12">Partners</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {[1, 2, 3, 4, 5, 6].map((partner) => (
              <div key={partner} className="bg-white p-4 rounded-lg shadow-sm">
                <img 
                  src={`/api/placeholder/200/100`} 
                  alt={`Partner ${partner}`}
                  className="w-full h-20 object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;