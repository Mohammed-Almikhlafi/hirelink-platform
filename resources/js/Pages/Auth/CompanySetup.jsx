import { useForm, usePage } from '@inertiajs/react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import Applayout from '@/Layouts/AppLayout';

export default function CompanySetup() {
  const { flash = {} } = usePage().props
  const { data, setData, post, processing, errors } = useForm({
    name: '',
    description: '',
    industry: '',
    website: '',
    location: '',
  });

  const submit = (e) => {
    e.preventDefault();
    post('/employer/company');
  };

  return (
    <Applayout>
      <div className="py-12">
        <div className="max-w-2xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg p-6">
            {flash.success && (
              <div className="mb-4 p-4 bg-green-100 text-green-700 rounded">
                {flash.success}
              </div>
            )}
            
            <h1 className="text-2xl font-bold mb-6">Set Up Your Company</h1>
            
            <form onSubmit={submit}>
              <div className="mb-4">
                <InputLabel htmlFor="name" value="Company Name *" />
                <TextInput
                  id="name"
                  name="name"
                  value={data.name}
                  className="mt-1 block w-full"
                  onChange={(e) => setData('name', e.target.value)}
                  required
                />
                <InputError message={errors.name} className="mt-2" />
              </div>

              <div className="mb-4">
                <InputLabel htmlFor="location" value="Location *" />
                <TextInput
                  id="location"
                  name="location"
                  value={data.location}
                  className="mt-1 block w-full"
                  onChange={(e) => setData('location', e.target.value)}
                  required
                />
                <InputError message={errors.location} className="mt-2" />
              </div>

              <div className="mb-4">
                <InputLabel htmlFor="industry" value="Industry" />
                <TextInput
                  id="industry"
                  name="industry"
                  value={data.industry}
                  className="mt-1 block w-full"
                  onChange={(e) => setData('industry', e.target.value)}
                />
                <InputError message={errors.industry} className="mt-2" />
              </div>

              <div className="mb-4">
                <InputLabel htmlFor="website" value="Website" />
                <TextInput
                  id="website"
                  type="url"
                  name="website"
                  value={data.website}
                  className="mt-1 block w-full"
                  onChange={(e) => setData('website', e.target.value)}
                />
                <InputError message={errors.website} className="mt-2" />
              </div>

              <div className="mb-4">
                <InputLabel htmlFor="description" value="Description" />
                <textarea
                  id="description"
                  name="description"
                  value={data.description}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                  onChange={(e) => setData('description', e.target.value)}
                  rows={4}
                />
                <InputError message={errors.description} className="mt-2" />
              </div>

              <div className="flex justify-end">
                <PrimaryButton disabled={processing}>
                  Save Company
                </PrimaryButton>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Applayout>
  );
}