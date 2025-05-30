import React from 'react';
import Avatar from 'react-avatar';
import { Link } from '@inertiajs/react';
import { MapPin, Briefcase, Star, MessageCircle } from 'lucide-react';
import { route } from 'ziggy-js';

export default function UserCard({ user }) {
  const avatarUrl = user.avatar_url;
  const rating = user.rating || 0;
  const location = user.location || 'Remote';

  return (
    <div className="group relative bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-200 border border-slate-200 dark:border-slate-700/50">
      {/* Top Section */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-4">
          <div className="relative">
            <Avatar
              src={avatarUrl}
              name={user.name}
              size={40}              
              round={true}
              className="ring-2 ring-white dark:ring-slate-700"
              textSizeRatio={1.2}
            />
            <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-success border-2 border-white dark:border-slate-700" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white group-hover:text-primary transition-colors">
              {user.name}
            </h3>
            {user.specialization && (
              <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                <Briefcase className="w-4 h-4" />
                <span>{user.specialization}</span>
              </div>
            )}
          </div>
        </div>

        {rating > 0 && (
          <div className="flex items-center gap-1 text-amber-500">
            <Star className="w-4 h-4 fill-current" />
            <span className="text-sm font-medium">{rating.toFixed(1)}</span>
          </div>
        )}
      </div>

      {/* Location */}
      <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 mb-4">
        <MapPin className="w-4 h-4" />
        <span>{location}</span>
      </div>

      {/* Skills */}
      {user.skills && user.skills.length > 0 && (
        <div className="mb-6">
          <div className="flex flex-wrap gap-2">
            {user.skills.slice(0, 3).map((skill, index) => (
              <span
                key={index}
                className="px-2 py-1 text-xs font-medium text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/20 rounded-full"
              >
                {skill}
              </span>
            ))}
            {user.skills.length > 3 && (
              <span className="px-2 py-1 text-xs font-medium text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 rounded-full">
                +{user.skills.length - 3} more
              </span>
            )}
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="flex items-center gap-3">
        <Link
          href={route('professionals.show', user.id)}
          className="btn-primary flex-1 text-center text-sm py-2"
        >
          View Profile
        </Link>
        <button className="btn-secondary p-2" title="Send Message">
          <MessageCircle className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
