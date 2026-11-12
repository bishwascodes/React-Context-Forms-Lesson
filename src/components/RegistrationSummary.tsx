
import { courses } from "../data/courses";
import { useRegistrations } from "../context/RegistrationContext";

export default function RegistrationSummary() {
  const { registrations } = useRegistrations();

  const courseCounts = courses.map(course => ({
    course,
    count: registrations.filter(
      registration => registration.course === course
    ).length
  }));

  const maxCount = Math.max(
    ...courseCounts.map(item => item.count)
  );

  const mostPopularCourses = maxCount > 0
    ? courseCounts.filter(item => item.count === maxCount)
    : [];

  return (
    <section className="panel">
      <h2>Summary</h2>

      <p>Total registrations: {registrations.length}</p>

      <h3>Registrations by course</h3>

      <ul>
        {courseCounts.map(item => (
          <li key={item.course}>
            {item.course}: {item.count}
          </li>
        ))}
      </ul>

      <h3>Most Popular Course</h3>

      {mostPopularCourses.length > 0 ? (
        <p>
          {mostPopularCourses.map(item => item.course).join(", ")}
          {" "}({maxCount} registrations each)
        </p>
      ) : (
        <p className="muted">
          No registrations yet.
        </p>
      )}
    </section>
  );
}
