import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Landing = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/home');
    }
  }, [user, navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex flex-col items-center justify-center px-6 py-12 text-center relative overflow-hidden">
      {/* Background glow circles */}
      <div className="absolute top-[-200px] right-[-200px] w-[400px] h-[400px] bg-blue-100 rounded-full opacity-30 animate-pulse"></div>
      <div className="absolute bottom-[-200px] left-[-200px] w-[400px] h-[400px] bg-blue-200 rounded-full opacity-20 animate-ping"></div>

      {/* Main Content */}
      <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-blue-400 mb-6 z-10">
        Connect. Share. Grow.
      </h1>
      <p className="text-base sm:text-lg md:text-xl text-gray-700 mb-10 max-w-xl z-10">
        Join a vibrant community of professionals. Share your knowledge, build your network, and grow your career with us.
      </p>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 z-10 w-full sm:w-auto">
        <button
          onClick={() => navigate('/register')}
          className="bg-blue-600 text-white px-6 py-3 rounded-md text-lg font-semibold shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
          aria-label="Get Started"
        >
          Get Started
        </button>
        <button
          onClick={() => navigate('/login')}
          className="border border-blue-600 text-blue-600 px-6 py-3 rounded-md text-lg font-semibold hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-300"
          aria-label="Login"
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default Landing;
