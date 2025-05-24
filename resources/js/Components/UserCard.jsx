// resources/js/Components/UserCard.jsx
import React from 'react';
import { Link } from '@inertiajs/react';

export default function UserCard({ user }) {
  const avatar = user.avatar_url || '/images/default-avatar.png';

  return (
    <Link
    href={`/profile/${user.id}`}
          className="bg-gray-900
     dark:bg-gray-900 
     
     rounded-2xl p-6 shadow-sm hover:shadow-lg transition duration-300 flex flex-col items-center space-y-3 text-center"
  >
  
      <img
        src={avatar}
        alt={user.name}
        className="w-20 h-20 rounded-full object-cover"
      />
      <h3 className="text-lg font-semibold text-white truncate">
        {user.name}
      </h3>
      <p className="text-sm text-gray-300 truncate">
        {user.specialization || '—'}
      </p>
    </Link>
  );
}
