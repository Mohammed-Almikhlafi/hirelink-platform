import React from 'react';
import UserCard from '@/Components/UserCard';

export default function ProfessionalsSection({ users }) {
  return (
    <section>
      <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-6 text-center">
        Meet Professionals
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {users.slice(0, 6).map(usr => <UserCard key={usr.id} user={usr} />)}
      </div>
    </section>
  );
}