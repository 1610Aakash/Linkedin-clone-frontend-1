import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { FiMenu, FiX } from 'react-icons/fi';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMenu = () => setMobileMenuOpen((prev) => !prev);

  const handleLogout = () => {
    logout();
    navigate('/');
    setMobileMenuOpen(false);
  };

  return (
    <nav className="bg-white shadow-md px-6 py-4 flex justify-between items-center relative">
      {/* Logo */}
      <Link
        to={user ? '/home' : '/'}
        className="font-bold text-blue-600 text-2xl"
      >
        LinkedIn
      </Link>

      {/* Hamburger Icon for Small Screens */}
      <div className="md:hidden">
        <button onClick={toggleMenu} className="text-2xl text-blue-600">
          {mobileMenuOpen ? <FiX /> : <FiMenu />}
        </button>
      </div>

      {/* Desktop Menu */}
      <div className="hidden md:flex items-center gap-6">
        {user && (
          <>
            <Link to="/home" className="hover:text-blue-600">Home</Link>
            <Link to="/jobs" className="hover:text-blue-600">Jobs</Link>
            <Link
              to="/create-post"
              className="bg-blue-600 hover:bg-blue-700 text-white text-xl font-bold w-10 h-10 flex items-center justify-center rounded"
              title="Create Post"
            >
              +
            </Link>
            <Link to={`/profile/${user._id}`} className="hover:text-blue-600">Profile</Link>
          </>
        )}
        {user ? (
          <button onClick={handleLogout} className="hover:text-red-500">
            Logout
          </button>
        ) : (
          <>
            <Link to="/login" className="hover:text-blue-600">Login</Link>
            <Link to="/register" className="hover:text-blue-600">Signup</Link>
          </>
        )}
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="absolute top-16 left-0 w-full bg-white shadow-md rounded-b-md md:hidden px-6 py-4 z-50">
          <div className="flex flex-col gap-4">
            {user && (
              <>
                <Link to="/home" onClick={toggleMenu} className="hover:text-blue-600">Home</Link>
                <Link to="/jobs" onClick={toggleMenu} className="hover:text-blue-600">Jobs</Link>
                <Link
                  to="/create-post"
                  onClick={toggleMenu}
                  className="bg-blue-600 text-white text-center py-2 rounded hover:bg-blue-700"
                >
                  + Create Post
                </Link>
                <Link
                  to={`/profile/${user._id}`}
                  onClick={toggleMenu}
                  className="hover:text-blue-600"
                >
                  Profile
                </Link>
              </>
            )}
            {user ? (
              <button onClick={handleLogout} className="text-left hover:text-red-500">
                Logout
              </button>
            ) : (
              <>
                <Link to="/login" onClick={toggleMenu} className="hover:text-blue-600">Login</Link>
                <Link to="/register" onClick={toggleMenu} className="hover:text-blue-600">Signup</Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
