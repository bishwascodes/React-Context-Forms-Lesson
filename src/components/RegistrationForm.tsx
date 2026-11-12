import { courses } from '../data/courses'
import { useState, type SubmitEvent } from 'react'
import type { Course} from '../data/courses'
import { useRegistrations } from "../context/RegistrationContext";



type FormErrors = {
  name?: string
  email?: string
  course?: string
}


export default function RegistrationForm() {
  const { addRegistration } = useRegistrations();
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [course, setCourse] = useState<Course | null>(null);
  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [successMessage, setSuccessMessage] = useState<string>("");

  function handleSubmit(e: SubmitEvent<HTMLFormElement>) {
    e.preventDefault();

    const validationErrors = validate();
    setFormErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0 && course !== null) {
      // Valid submission
      addRegistration({
        name: name.trim(),
        email: email.trim(),
        course
      });

      setSuccessMessage("You have successfully registered for the course!");

      // Reset fields
      setName("");
      setEmail("");
      setCourse(null);
    } else {
      // Invalid submission
      setSuccessMessage("");
    }
  }

  function validate(): FormErrors {
    const errors: FormErrors = {};

    // Validate name
    if (name.trim().length < 2) {
      errors.name = "Name must be at least 2 characters long.";
    }

    // Validate email
    const trimmedEmail = email.trim();
    const atIndex = trimmedEmail.indexOf("@");
    const dotIndex = trimmedEmail.indexOf(".", atIndex + 1);

    if (
      atIndex <= 0 ||
      dotIndex <= atIndex + 1 ||
      dotIndex === trimmedEmail.length - 1
    ) {
      errors.email = "Please enter a valid email address.";
    }

    // Validate course
    if (course === null) {
      errors.course = "Please select a course.";
    }

    return errors;
  }

  return (
    <section className="panel">
      <h2>Register for a course</h2>
      <p className="muted">The fields are ready. You will make this form work during the lesson.</p>
      <form onSubmit={handleSubmit}>
        <label htmlFor="student-name">Full name</label>
        <input id="student-name" value={name} onChange={e => setName(e.target.value)} name="name" placeholder="Alex Rivera" />
        {formErrors.name && <p className="error">{formErrors.name}</p>}

        <label htmlFor="student-email">Email</label>
        <input id="student-email" value={email} onChange={e => setEmail(e.target.value)} name="email" type="email" placeholder="alex@example.com" />
        {formErrors.email && <p className="error">{formErrors.email}</p>}

        <label htmlFor="student-course">Course</label>
        <select id="student-course" name="course" value={course ?? ""} onChange={e => setCourse(e.target.value as Course)}>
          <option value="" disabled>Choose a course</option>
          {courses.map(course => <option key={course} value={course}>{course}</option>)}
        </select>
        {formErrors.course && <p className="error">{formErrors.course}</p>}

        <button type="submit">Register</button>
      </form>
      {successMessage && (
        <p className="success">{successMessage}</p>
      )}
    </section>
  )
}
