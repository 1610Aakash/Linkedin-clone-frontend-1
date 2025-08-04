import { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import api from '../api';
import { FaPen, FaSave } from 'react-icons/fa';

const Profile = () => {
  const { user, setUser } = useContext(AuthContext);
  const [editingBio, setEditingBio] = useState(false);
  const [editingLocation, setEditingLocation] = useState(false);
  const [bioInput, setBioInput] = useState('');
  const [locationInput, setLocationInput] = useState('');
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchUserPosts = async () => {
      try {
        const res = await api.get(`/posts/${user?._id}`);
        setPosts(res.data);
      } catch (err) {
        console.error('Failed to load posts:', err);
      }
    };

    if (user?._id) fetchUserPosts();
  }, [user]);

  const updateField = async (field, value) => {
    if (!value) return alert(`Please enter a ${field}.`);
    try {
      const res = await api.put('/auth/update-profile', { [field]: value });
      setUser(res.data);
      if (field === 'bio') {
        setEditingBio(false);
        setBioInput('');
      } else if (field === 'location') {
        setEditingLocation(false);
        setLocationInput('');
      }
    } catch (err) {
      console.error('Update failed:', err);
      alert('Update failed');
    }
  };

  const deletePost = async (postId) => {
    try {
      await api.delete(`/posts/${postId}`);
      setPosts((prev) => prev.filter((p) => p._id !== postId));
    } catch (err) {
      console.error('Delete failed:', err);
      alert('Delete failed');
    }
  };

  if (!user) {
    return (
      <div className="p-6 bg-gray-100 min-h-screen text-center text-lg font-medium">
        Loading profile...
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 bg-gray-100 min-h-screen">
      {/* Profile Card */}
      <div className="bg-white p-6 rounded shadow text-center mb-6">
        <img
          src="/user-image.png"
          alt="User Avatar"
          className="w-24 h-24 mx-auto rounded-full mb-2 object-cover"
        />
        <h2 className="text-xl font-bold text-gray-800">{user.name}</h2>

        {/* Bio Field */}
        <div className="mt-3">
          {editingBio ? (
            <div className="flex justify-center items-center gap-2">
              <input
                type="text"
                value={bioInput}
                onChange={(e) => setBioInput(e.target.value)}
                className="p-1 border rounded w-64"
              />
              <button
                onClick={() => updateField('bio', bioInput)}
                className="text-white bg-green-500 hover:bg-green-600 px-3 py-1 rounded"
              >
                <FaSave />
              </button>
            </div>
          ) : user.bio ? (
            <div className="flex justify-center items-center gap-2 text-gray-600 mt-1">
              <p>{user.bio}</p>
              <FaPen
                className="cursor-pointer text-gray-500 hover:text-blue-600"
                onClick={() => {
                  setEditingBio(true);
                  setBioInput(user.bio);
                }}
              />
            </div>
          ) : (
            <div className="flex justify-center items-center gap-2">
              <input
                type="text"
                placeholder="Add your bio"
                value={bioInput}
                onChange={(e) => setBioInput(e.target.value)}
                className="p-1 border rounded w-64"
              />
              <button
                onClick={() => updateField('bio', bioInput)}
                className="bg-blue-500 text-white px-3 py-1 rounded"
              >
                Add Bio
              </button>
            </div>
          )}
        </div>

        {/* Location Field */}
        <div className="mt-3">
          {editingLocation ? (
            <div className="flex justify-center items-center gap-2">
              <input
                type="text"
                value={locationInput}
                onChange={(e) => setLocationInput(e.target.value)}
                className="p-1 border rounded w-64"
              />
              <button
                onClick={() => updateField('location', locationInput)}
                className="text-white bg-green-500 hover:bg-green-600 px-3 py-1 rounded"
              >
                <FaSave />
              </button>
            </div>
          ) : user.location ? (
            <div className="flex justify-center items-center gap-2 text-gray-600 mt-1">
              <p>{user.location}</p>
              <FaPen
                className="cursor-pointer text-gray-500 hover:text-blue-600"
                onClick={() => {
                  setEditingLocation(true);
                  setLocationInput(user.location);
                }}
              />
            </div>
          ) : (
            <div className="flex justify-center items-center gap-2">
              <input
                type="text"
                placeholder="Add location"
                value={locationInput}
                onChange={(e) => setLocationInput(e.target.value)}
                className="p-1 border rounded w-64"
              />
              <button
                onClick={() => updateField('location', locationInput)}
                className="bg-blue-500 text-white px-3 py-1 rounded"
              >
                Add Location
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Posts Section */}
      <div className="bg-white p-4 rounded shadow">
        <h3 className="text-lg font-semibold mb-4 text-gray-800">My Posts</h3>
        {posts.length > 0 ? (
          <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {posts.map((post) => (
              <div key={post._id} className="border rounded p-4 shadow bg-gray-50 relative">
                <h4 className="text-lg font-bold text-blue-800">{post.title || 'Untitled'}</h4>
                <p className="text-gray-700 mt-1 whitespace-pre-line">{post.description || post.content}</p>
                <p className="text-xs text-gray-500 mt-2">{new Date(post.createdAt).toLocaleString()}</p>
                <button
                  onClick={() => deletePost(post._id)}
                  className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">You haven’t posted anything yet.</p>
        )}
      </div>
    </div>
  );
};

export default Profile;
