import React from 'react';
import { Head, useForm } from '@inertiajs/react';
import MainLayout from '@/Layouts/MainLayout';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import TextArea from '@/Components/TextArea';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';

export default function Apply({ job, user }) {
  const { data, setData, post, processing, errors } = useForm({
    cover_letter: '',
    resume: null,
  });

  function handleSubmit(e) {
    e.preventDefault();
    post(route('jobseeker.applications.store', job.id));
  }

  function handleFileChange(e) {
    setData('resume', e.target.files[0]);
  }

  return (
    <MainLayout title={`Apply – ${job.title}`}>
      <Head title={`Apply – ${job.title}`} />

      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="bg-white dark:bg-slate-800 shadow-sm sm:rounded-lg overflow-hidden">
          <div className="p-6">
            {/* Job Header */}
            <h2 className="text-2xl font-semibold dark:text-white mb-4">
              Apply for {job.title}
            </h2>

            {/* Profile Summary */}
            <div className="mb-8 p-4 bg-gray-50 dark:bg-slate-700/50 rounded-lg">
              <h3 className="text-lg font-medium dark:text-white mb-4">
                Your Profile Summary
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium text-gray-700 dark:text-gray-300">
                    Education
                  </h4>
                  {user.educations.length > 0 ? (
                    <ul className="mt-2 space-y-2">
                      {user.educations.map(ed => (
                        <li key={ed.id} className="text-sm dark:text-gray-400">
                          {ed.degree} in {ed.field_of_study}
                          <br />
                          {ed.institution}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-sm text-gray-500">No education history</p>
                  )}
                </div>
                <div>
                  <h4 className="font-medium text-gray-700 dark:text-gray-300">
                    Experience
                  </h4>
                  {user.work_experiences && user.work_experiences.length > 0 ? (
  <ul className="mt-2 space-y-2">
    {user.work_experiences.map(wx => (
      <li key={wx.id} className="text-sm dark:text-gray-400">
        {wx.position} at {wx.company}
        <br />
        {wx.location}
      </li>
    ))}
  </ul>
) : (
  <p className="text-sm text-gray-500">No work experience</p>
)}

                </div>
              </div>
            </div>

            {/* Application Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <InputLabel htmlFor="cover_letter" value="Cover Letter" />
                <TextArea
                  id="cover_letter"
                  value={data.cover_letter}
                  onChange={e => setData('cover_letter', e.target.value)}
                  className="mt-1 block w-full"
                  rows={6}
                />
                <InputError message={errors.cover_letter} className="mt-2" />
              </div>

              <div>
                <InputLabel htmlFor="resume" value="Resume (PDF, DOC, DOCX)" />
                <TextInput
                  id="resume"
                  type="file"
                  onChange={handleFileChange}
                  className="mt-1 block w-full"
                  accept=".pdf,.doc,.docx"
                  required
                />
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  Max size: 2MB
                </p>
                <InputError message={errors.resume} className="mt-2" />
              </div>

              <div className="flex justify-end">
                <PrimaryButton disabled={processing}>
                  {processing ? 'Submitting…' : 'Submit Application'}
                </PrimaryButton>
              </div>
            </form>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
