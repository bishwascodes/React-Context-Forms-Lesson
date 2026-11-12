
import RegistrationList from "./RegistrationList";
import RegistrationSummary from "./RegistrationSummary";

export default function RegistrationDashboard() {
  return (
    <div className="stack">
      <RegistrationSummary />
      <RegistrationList />
    </div>
  );
}
