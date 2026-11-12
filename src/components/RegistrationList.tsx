
import { useRegistrations } from "../context/RegistrationContext";

export default function RegistrationList() {
  const { registrations, removeRegistration } = useRegistrations();

  return (
    <section className="panel">
      <h2>Registrations</h2>

      {registrations.length === 0 ? (
        <p className="muted">No registrations yet.</p>
      ) : (
        <ul>
          {registrations.map(registration => (
            <li key={registration.id}>
              <p>
                <strong>{registration.name}</strong>
              </p>

              <p>{registration.email}</p>
              <p>{registration.course}</p>

              <button
                type="button"
                onClick={() => removeRegistration(registration.id)}
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
