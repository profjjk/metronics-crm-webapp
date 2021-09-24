import { SideNavbar, QuickActions, OrderParts, ScheduleJobs, JobFormNew, CustomerFormNew, PartFormNew } from '../components';
import useJobs from '../hooks/useJobs';
import useParts from '../hooks/useParts';
import { useState } from 'react';

const Home = () => {
  const jobs = useJobs(); const parts = useParts();

  const [showJobForm, setShowJobForm] = useState(false);
  const [showCustomerForm, setShowCustomerForm] = useState(false);
  const [showPartForm, setShowPartForm] = useState(false);

  switch (jobs.status || parts.status) {
    case 'loading':
      return <h1 className="text-center my-5">Loading</h1>;
    case 'error':
      return <h4 className="text-center my-5">Oops, something went wrong!</h4>
    default:
      if (!showJobForm && !showCustomerForm && !showPartForm) {
        return (
          <main>
            <SideNavbar />
            <div className="p-5">
              <QuickActions 
                setShowJobForm={setShowJobForm}
                setShowCustomerForm={setShowCustomerForm}
                setShowPartForm={setShowPartForm}
              />
              <OrderParts 
                parts={parts.data.data} 
              />
              <ScheduleJobs 
                jobs={jobs.data.data}
              />
            </div>
          </main>
        );
      }

      if (showJobForm) {
        return (
          <main>
            <SideNavbar />
            <div className="p-5">
              <JobFormNew 
                setShowFormNew={setShowJobForm}
              />
            </div>
          </main>
        )
      }

      if (showCustomerForm) {
        return (
          <main>
            <SideNavbar />
            <div className="p-5">
              <CustomerFormNew 
                setShowFormNew={setShowCustomerForm}
              />
            </div>
          </main>
        )
      }

      if (showPartForm) {
        return (
          <main>
            <SideNavbar />
            <div className="p-5">
              <PartFormNew 
                setShowFormNew={setShowPartForm}
              />
            </div>
          </main>
        )
      }
  }
}

export default Home;
