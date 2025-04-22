
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { FaMapMarkerAlt } from "react-icons/fa";
import { Lightbox } from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

function AdminDashboard({ bookings }) {
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("name");

  const filteredBookings = bookings
    .filter((booking) =>
      Object.values(booking).some((val) =>
        val.toLowerCase().includes(search.toLowerCase())
      )
    )
    .sort((a, b) => a[sortBy].localeCompare(b[sortBy]));

  return (
    <section className="bg-gray-100 dark:bg-gray-800 py-16 px-6 max-w-5xl mx-auto rounded-2xl shadow mt-12">
      <h2 className="text-3xl font-semibold mb-4 text-center">Admin Dashboard</h2>
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-4">
        <input
          type="text"
          placeholder="Search bookings..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full sm:w-1/2 px-4 py-2 border rounded-md dark:bg-gray-700 dark:text-white"
        />
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="px-4 py-2 border rounded-md dark:bg-gray-700 dark:text-white"
        >
          <option value="name">Sort by Name</option>
          <option value="dogName">Sort by Dog Name</option>
          <option value="stayDates">Sort by Stay Date</option>
        </select>
      </div>
      <div className="overflow-auto">
        <table className="min-w-full table-auto border-collapse border border-gray-300 dark:border-gray-600">
          <thead>
            <tr className="bg-yellow-200 dark:bg-yellow-700">
              <th className="border border-gray-300 dark:border-gray-600 px-4 py-2">Name</th>
              <th className="border border-gray-300 dark:border-gray-600 px-4 py-2">Email</th>
              <th className="border border-gray-300 dark:border-gray-600 px-4 py-2">Dog Name</th>
              <th className="border border-gray-300 dark:border-gray-600 px-4 py-2">Stay Dates</th>
              <th className="border border-gray-300 dark:border-gray-600 px-4 py-2">Notes</th>
            </tr>
          </thead>
          <tbody>
            {filteredBookings.map((booking, idx) => (
              <tr key={idx} className="hover:bg-yellow-100 dark:hover:bg-yellow-600">
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">{booking.name}</td>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">{booking.email}</td>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">{booking.dogName}</td>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">{booking.stayDates}</td>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">{booking.notes}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

function Login({ onLogin }) {
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (password === "admin123") {
      onLogin();
    } else {
      alert("Incorrect password");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center py-20">
      <h2 className="text-2xl mb-4">Admin Login</h2>
      <input
        type="password"
        placeholder="Enter admin password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="mb-4 px-4 py-2 border rounded-md dark:bg-gray-700 dark:text-white"
      />
      <Button onClick={handleLogin}>Login</Button>
    </div>
  );
}

export default function Home() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    dogName: "",
    stayDates: "",
    notes: ""
  });

  const [bookings, setBookings] = useState([]);
  const [darkMode, setDarkMode] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Booking submitted:", formData);
    setBookings([...bookings, formData]);
    alert("Booking request sent! We'll contact you shortly.");
    setFormData({ name: "", email: "", dogName: "", stayDates: "", notes: "" });
  };

  const galleryImages = [
    "/images/dog1.jpg",
    "/images/dog2.jpg",
    "/images/dog3.jpg",
    "/images/dog4.jpg"
  ];

  return (
    <div className="min-h-screen bg-white text-gray-800 dark:bg-gray-900 dark:text-gray-100 transition-colors duration-500">
      {isAdmin ? <AdminDashboard bookings={bookings} /> : <Login onLogin={() => setIsAdmin(true)} />}
    </div>
  );
}
