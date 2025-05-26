import React, { useState } from 'react';
import { Link } from '@inertiajs/react';
import UserCard from '@/Components/UserCard';
import { Search, Users, ArrowRight } from 'lucide-react';

export default function ProfessionalsSection({ users, className = '' }) {
  const [searchTerm, setSearchTerm] = useState('');
  
  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (user.specialization && user.specialization.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <section className={className}>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <div className="flex items-center gap-3">
          <Users className="w-8 h-8 text-primary" />
          <h2 className="section-title mb-0">Top Professionals</h2>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative flex-grow max-w-sm">
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
              <Search className="w-4 h-4 text-slate-400" />
            </div>
            <input
              type="text"
              placeholder="Search professionals..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input pl-9 py-2 text-sm"
            />
          </div>
          
          <Link 
            href="/professionals"
            className="btn-secondary inline-flex items-center gap-2 text-sm whitespace-nowrap"
          >
            View All
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {filteredUsers.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredUsers.slice(0, 6).map(user => (
            <UserCard key={user.id} user={user} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-slate-50 dark:bg-slate-800/50 rounded-2xl">
          <Users className="w-12 h-12 text-slate-400 mx-auto mb-4" />
          <p className="text-slate-600 dark:text-slate-400 font-medium">
            {searchTerm ? 'No professionals found matching your search.' : 'No professionals available yet.'}
          </p>
        </div>
      )}
    </section>
  );
}