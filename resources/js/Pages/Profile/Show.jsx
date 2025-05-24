// resources/js/Pages/Profile/Show.jsx
import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { Briefcase, MapPin, Globe, UserCircle2 } from 'lucide-react';

export default function ProfileShow({ user }) {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-10 px-4">
      <Head title={user.name} />

      <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-8 space-y-6">
        {/* Header */}
        <div className="flex items-center space-x-4">
          <div className="w-20 h-20 rounded-full bg-indigo-100 dark:bg-indigo-800 flex items-center justify-center">
            <UserCircle2 className="w-14 h-14 text-indigo-600 dark:text-indigo-300" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{user.name}</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">{user.specialization}</p>
            {user.job_category && (
              <span className="text-xs bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300 px-2 py-0.5 rounded-full">
                {user.job_category.name}
              </span>
            )}
          </div>
        </div>

        {/* About Section */}
        <div className="space-y-2">
          {user.headline && (
            <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">{user.headline}</h2>
          )}
          <p className="text-gray-600 dark:text-gray-300">{user.summary || 'No summary provided.'}</p>
        </div>

        {/* Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-600 dark:text-gray-300">
          {user.location && (
            <div className="flex items-center space-x-2">
              <MapPin className="w-4 h-4" />
              <span>{user.location}</span>
            </div>
          )}
          {user.website_url && (
            <div className="flex items-center space-x-2">
              <Globe className="w-4 h-4" />
              <a href={user.website_url} className="hover:underline text-indigo-600 dark:text-indigo-400" target="_blank">
                {user.website_url}
              </a>
            </div>
          )}
        </div>

        {/* Skills */}
        {user.skills && user.skills.length > 0 && (
          <div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-2">Skills</h3>
            <div className="flex flex-wrap gap-2">
              {user.skills.map(skill => (
                <span
                  key={skill.id}
                  className="px-3 py-1 bg-green-100 dark:bg-green-800 text-green-700 dark:text-green-300 rounded-full text-sm"
                >
                  {skill.name} ({skill.pivot.proficiency_level})
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Education */}
        {user.educations && user.educations.length > 0 && (
          <div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-2">Education</h3>
            <ul className="space-y-2">
              {user.educations.map(edu => (
                <li key={edu.id} className="text-sm">
                  <strong>{edu.degree}</strong> - {edu.institution} ({edu.start_year} - {edu.end_year || 'Present'})
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Work Experience */}
        {user.work_experiences && user.work_experiences.length > 0 && (
          <div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-2">Work Experience</h3>
            <ul className="space-y-2">
              {user.work_experiences.map(work => (
                <li key={work.id} className="text-sm">
                  <Briefcase className="inline w-4 h-4 mr-1" />
                  <strong>{work.position}</strong> at {work.company_name} ({work.start_year} - {work.end_year || 'Present'})
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="pt-6">
          <Link href="/" className="text-indigo-600 hover:underline">← Back to Home</Link>
        </div>
      </div>
    </div>
  );
}
