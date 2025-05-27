import React, { useState } from 'react';
import './Step.css';
import { useNavigate } from 'react-router-dom';

export default function DoctorRegistrationForm() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    qualification: '',
    specialisation: '',
    association: '',
    email: '',
    address: '',
    phone: '',
    city: '',
    state: '',
    country: '',
    dob: '',
    membership: '', // will not be used, can keep or remove from form state
    password: ''
  });
  const [file, setFile] = useState(null);
  const [agreed, setAgreed] = useState(false);

  const validateName = (name) => /^[a-zA-Z\s]*$/.test(name);

  const validateEmail = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const validatePassword = (password) =>
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/.test(password);

  const validateAge = (dob) => {
    if (!dob) return false;
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age >= 23;
  };

  const handleSubmit = async () => {
    if (!agreed) {
      alert('You must agree to the terms before submitting.');
      return;
    }

    const specialisations = [
      "Neurologist", "Dentist", "ENT", "Oncologist", "Cardiologist",
      "Eye-Specialist", "Orthopedic", "Gynecologist", "Dermatologist", "Ophthalmologist", "Other"
    ];

    const specializationFlags = specialisations.reduce((acc, spec) => {
      const key = `is${spec.replace(/[\s-]/g, '')}`;
      acc[key] = form.specialisation === spec;
      return acc;
    }, {});

    const formData = new FormData();
    formData.append("name", form.firstName + " " + form.lastName);
    formData.append("email", form.email);
    formData.append("address", form.address);
    formData.append("phone", form.phone);
    formData.append("city", form.city);
    formData.append("state", form.state);
    formData.append("country", form.country);
    formData.append("dateOfBirth", form.dob);
    formData.append("qualification", form.qualification);
    formData.append("medicalAssociation", form.association);
    formData.append("membership", form.membership); // you can remove this if membership is removed entirely
    formData.append("specialization", "nakul_pgl_dmag_khata");
    formData.append("password", form.password);
    if (file) {
      formData.append("photo", file);
    }

    // Append specialization flags
    for (const key in specializationFlags) {
      formData.append(key, specializationFlags[key]);
    }

    try {
      const response = await fetch("http://localhost:8080/api/doctor/register", {
        method: "POST",
        body: formData
      });

      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }

      const result = await response.text();
      console.log("Server response:", result);
      alert("Registration submitted successfully!");
      navigate("/login");
    } catch (error) {
      console.error("Submission error:", error);
      alert("Failed to submit registration. Please try again.");
    }
  };

  const handleChange = e => {
    const { name, value } = e.target;
    if ((name === 'firstName' || name === 'lastName') && !validateName(value)) {
      return; // ignore invalid characters in names
    }
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleNext = e => {
    e.preventDefault();

    // Validation per step
    switch (step) {
      case 1:
        if (!form.firstName || !form.lastName) {
          alert('Please enter both first and last name');
          return;
        }
        break;

      case 2:
        if (!form.qualification) {
          alert('Please enter your qualification');
          return;
        }
        break;

      case 3:
        if (!form.specialisation) {
          alert('Please select a specialisation');
          return;
        }
        break;

      case 4:
        if (!form.association) {
          alert('Please select if you are a member of any medical association');
          return;
        }
        break;

      case 5:
        if (!form.email || !form.address || !form.phone || !form.city || !form.state || !form.country || !form.dob || !form.password) {
          alert('Please fill all details');
          return;
        }
        if (!validateEmail(form.email)) {
          alert('Please enter a valid email address');
          return;
        }
        if (!validatePassword(form.password)) {
          alert('Password must be at least 8 characters, include uppercase, lowercase, number, and special character');
          return;
        }
        if (!validateAge(form.dob)) {
          alert('You must be at least 23 years old');
          return;
        }
        break;

      case 7:
        // no mandatory validation for file upload, user can skip
        break;

      case 8:
        if (!agreed) {
          alert('You must agree to the terms before proceeding');
          return;
        }
        break;

      default:
        break;
    }

    // Skip membership step (6) - so after step 5 jump to step 7
    if (step === 5) {
      setStep(7);
    } else {
      setStep(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    // Skip membership step (6)
    if (step === 7) {
      setStep(5);
    } else if (step > 1) {
      setStep(prev => prev - 1);
    }
  };

 const handleFileChange = (e) => {
  const selectedFile = e.target.files[0];
  if (!selectedFile) return;

  const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
  const maxSize = 1 * 1024 * 1024; // 1 MB

  if (!allowedTypes.includes(selectedFile.type)) {
    alert('Only image files (jpeg, png, gif) are allowed.');
    e.target.value = null; // reset file input
    return;
  }

  if (selectedFile.size > maxSize) {
    alert('File size exceeds 1 MB limit.');
    e.target.value = null;
    return;
  }

  setFile(selectedFile);
};

  return (
    <div className="left-pane">
      <p className="question-number">Question {step}</p>

      {step === 1 && (
        <>
          <h1>Hello Doc! 😃</h1>
          <p className="question-text">Could we know your name?</p>
          <form onSubmit={handleNext} className="form">
            <div className="input-row">
              <input
                type="text"
                name="firstName"
                placeholder="First Name *"
                value={form.firstName}
                onChange={handleChange}
                className="input-underline"
                required
              />
              <input
                type="text"
                name="lastName"
                placeholder="Last Name *"
                value={form.lastName}
                onChange={handleChange}
                className="input-underline"
                required
              />
            </div>
            <div className="buttons-row">
              <button type="submit" className="btn-primary">YES. ➔</button>
            </div>
          </form>
        </>
      )}

      {step === 2 && (
        <>
          <h1>Thanks, {form.firstName || 'Doctor'}!</h1>
          <p className="question-text">What's your qualification?</p>
          <form onSubmit={handleNext} className="form">
            <input
              type="text"
              name="qualification"
              placeholder="Your Qualification *"
              value={form.qualification}
              onChange={handleChange}
              className="input-underline"
              required
            />
          </form>
          <div className="buttons-row">
            <button type="button" onClick={handlePrevious} className="btn-primary">
  <span style={{ display: 'inline-block', transform: 'rotate(180deg)' }}>➔</span> PREVIOUS
</button>
            <button type="submit" onClick={handleNext} className="btn-primary">NEXT ➔</button>
            
          </div>
        </>
      )}

      {step === 3 && (
        <>
          <h1>Can you tell us your specialisation?</h1>
          <div className="specialisation-options">
            {["Neurologist", "Dentist", "ENT", "Oncologist", "Cardiologist", "Eye-Specialist", "Orthopedic", "Gynecologist", "Dermatologist", "Ophthalmologist", "Other"].map((spec, index) => (
              <button
                key={index}
                className={`option-btn ${form.specialisation === spec ? 'selected' : ''}`}
                onClick={() => setForm(prev => ({ ...prev, specialisation: spec }))}
              >
                <span className="option-label">{spec}</span>
                <span className="option-tag">{String.fromCharCode(65 + index)}</span>
              </button>
            ))}
          </div>
          <div className="buttons-row">
                    <button type="button" onClick={handlePrevious} className="btn-primary">
  <span style={{ display: 'inline-block', transform: 'rotate(180deg)' }}>➔</span> PREVIOUS
</button>
            <button
              className="btn-primary"
              onClick={handleNext}
            >
              NEXT ➔
            </button>
          
          </div>
        </>
      )}

      {step === 4 && (
        <>
          <h1>Dr. {form.firstName}, are you a member of any other medical associations?</h1>
          <div className="association-options">
            {["Yes", "No"].map((option, index) => (
              <button
                key={index}
                className={`assoc-btn ${form.association === option ? 'selected' : ''}`}
                onClick={() => setForm(prev => ({ ...prev, association: option }))}
              >
                <span className="assoc-label">{option}</span>
                <span className="assoc-tag">{option === "Yes" ? "Y" : "N"}</span>
              </button>
            ))}
          </div>
          <div className="buttons-row">
                    <button type="button" onClick={handlePrevious} className="btn-primary">
  <span style={{ display: 'inline-block', transform: 'rotate(180deg)' }}>➔</span> PREVIOUS
</button>
            <button
              className="btn-primary"
              onClick={handleNext}
            >
              NEXT ➔
            </button>
            
          </div>
        </>
      )}

      {step === 5 && (
        <>
          <h1>Could you please help us with some basic details?</h1>
          <div className="details-grid">
            {["email", "address", "phone", "city", "state", "country", "dob", "password"].map((field, i) => (
              <div key={i} className="form-group">
                <input
                  type={field === "dob" ? "date" : field === "email" ? "email" : (field === "password" ? "password" : "text")}
                  name={field}
                  placeholder={`${field[0].toUpperCase() + field.slice(1)} *`}
                  value={form[field]}
                  onChange={handleChange}
                  className="input-underline"
                  required
                />
              </div>
            ))}
          </div>
          <div className="buttons-row">
                    <button type="button" onClick={handlePrevious} className="btn-primary">
  <span style={{ display: 'inline-block', transform: 'rotate(180deg)' }}>➔</span> PREVIOUS
</button>
            <button
              className="btn-primary"
              onClick={handleNext}
            >
              NEXT ➔
            </button>
          </div>
        </>
      )}

      {/* Removed Step 6 (Membership) */}

      {step === 7 && (
        <>
          <h1>Please upload your ID</h1>
          <div className="upload-box">
            <p className="font-bold">Drag and drop to upload</p>
            <p>
              or <label htmlFor="fileInput" className="underline cursor-pointer">browse</label> to choose a file
              <input
                id="fileInput"
                type="file"
                className="hidden"
                onChange={handleFileChange}
              />
            </p>
            <p className="text-xs mt-4">
              Maximum number of files is 1. Maximum upload size per file is 1 MB.
            </p>
          </div>
          <div className="buttons-row">
                    <button type="button" onClick={handlePrevious} className="btn-primary">
  <span style={{ display: 'inline-block', transform: 'rotate(180deg)' }}>➔</span> PREVIOUS
</button>
            <button
              className="btn-primary"
              onClick={handleNext}
            >
              NEXT ➔
            </button>
            
          </div>
        </>
      )}

      {step === 8 && (
        <>
          <h1>I hereby certify that the above information is true and accurate.</h1>
          <label>
            <input
              type="checkbox"
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
            />{' '}
            I agree to the Terms of Service and Privacy Policy
          </label>
          <div className="buttons-row">
                    <button type="button" onClick={handlePrevious} className="btn-primary">
  <span style={{ display: 'inline-block', transform: 'rotate(180deg)' }}>➔</span> PREVIOUS
</button>
            <button
              className="btn-primary"
              onClick={handleNext}
            >
              NEXT ➔
            </button>
          
          </div>
        </>
      )}

      {step === 9 && (
        <>
          <h1>Review & Submit</h1>
           <div className="review-box">
    <p><strong>Name:</strong> {form.firstName} {form.lastName}</p>
    <p><strong>Qualification:</strong> {form.qualification}</p>
    <p><strong>Specialisation:</strong> {form.specialisation}</p>
    <p><strong>Medical Association Member:</strong> {form.association}</p>
    <p><strong>Email:</strong> {form.email}</p>
    <p><strong>Phone:</strong> {form.phone}</p>
    <p><strong>Address:</strong> {form.address}</p>
    <p><strong>City:</strong> {form.city}</p>
    <p><strong>State:</strong> {form.state}</p>
    <p><strong>Country:</strong> {form.country}</p>
    <p><strong>Date of Birth:</strong> {form.dob}</p>
    <p><strong>ID Proof:</strong> {file ? file.name : "Not uploaded"}</p>
  </div>
          <div className="buttons-row">
                    <button type="button" onClick={handlePrevious} className="btn-primary">
  <span style={{ display: 'inline-block', transform: 'rotate(180deg)' }}>➔</span> PREVIOUS
</button>
            <button
              className="btn-primary"
              onClick={handleSubmit}
            >
              SUBMIT
            </button>
          
          </div>
        </>
      )}
      
    </div>
  );
}
