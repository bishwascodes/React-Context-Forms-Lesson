
import { courses } from "../data/courses";
import { useRegistrations } from "../context/RegistrationContext";

export default function RegistrationSummary() {
  const { registrations } = useRegistrations();

  return (
    <section className="panel">
      <h2>Summary</h2>

      <p>Total registrations: {registrations.length}</p>

      <h3>Registrations by course</h3>

      <ul>
        {courses.map(course => {
          const count = registrations.filter(
            registration => registration.course === course
          ).length;

          return (
            <li key={course}>
              {course}: {count}
            </li>
          );
        })}
      </ul>
    </section>
  );
}
