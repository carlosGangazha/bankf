import { useState } from 'react';
import { Filter, Search } from 'lucide-react';

const Transactions = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  

  return (
    <div className="space-y-6">
      <div className="animate-slide-in-up">
        <h1 className="text-2xl font-bold text-gray-900 mb-1">Transactions</h1>
        <p className="text-gray-600">View and manage your transaction history</p>
      </div>
      
      <div className="flex flex-col md:flex-row gap-4 animate-slide-in-up delay-100">
        <div className="flex-1 relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search size={18} className="text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search transactions..."
            className="pl-10 w-full py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Filter size={18} className="text-gray-400" />
          </div>
          
        </div>
      </div>
      
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden animate-slide-in-up delay-200">
        
      </div>
      
      <div className="flex justify-center animate-slide-in-up delay-300">
        <button className="text-blue-700 hover:text-blue-800 font-medium">
          Load more transactions
        </button>
      </div>
    </div>
  );
};

export default Transactions;