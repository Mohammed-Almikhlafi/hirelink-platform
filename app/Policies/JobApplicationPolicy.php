namespace App\Policies;

use App\Models\Job;
use App\Models\JobApplication;
use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class JobApplicationPolicy
{
    use HandlesAuthorization;

    public function view(User $user, Job $job, JobApplication $application)
    {
        return $user->id === $job->company->user_id && $job->id === $application->job_id;
    }

    public function update(User $user, Job $job, JobApplication $application)
    {
        return $user->id === $job->company->user_id && $job->id === $application->job_id;
    }
} 