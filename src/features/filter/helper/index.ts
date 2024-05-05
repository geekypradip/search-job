// Min experience
// Company name
// Location
// Remote/on-site
// Tech stack
// Role
// Min base pay

const roles = {
  data: [
    "Frontend",
    "Backend",
    "Fullstack",
    "DevOps",
    "QA",
    "Product Manager",
    "Designer",
    "Data Scientist",
    "Data Engineer",
    "Security Engineer",
    "Technical Support",
    "Technical Writer",
    "Engineering Manager",
    "Tech Lead",
    "Engineering Director",
    "VP of Engineering",
    "Founding Engineer",
    "Android",
    "Ios",
    "Web developer",
  ],
  id: "jobRole",
  label: "Roles",
  multiple: true,
};

const minBasePay = {
  data: [
    "0",
    "10",
    "20",
    "30",
    "40",
    "50",
    "60",
    "70",
    "80",
    "90",
    "100",
    "150",
    "200",
  ],
  id: "minSalary",
  label: "Min Base Pay (USD)",
  multiple: false,
};

const minExperience = {
  data: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
  id: "minExp",
  label: "Min Experience (years)",
  multiple: false,
};

const location = {
  data: [
    "Remote",
    "Kolkata",
    "Bangalore",
    "Mumbai",
    "Delhi",
    "Chennai",
    "Hyderabad",
    "Pune",
    "Ahmedabad",
    "Surat",
    "Jaipur",
    "Lucknow",
    "Kanpur",
  ],
  id: "location",
  label: "Location ",
  multiple: true,
};

export const filterData = [roles, minBasePay, minExperience, location];
