import React from 'react';
import { Link } from 'react-router-dom';
import { Tags, Timer, Calendar, User, ThumbsUp } from 'lucide-react';

const Home = () => {
  const [blogs, setBlogs] = React.useState([]);

  React.useEffect(() => {
    const blogsData = localStorage.getItem("blogs") ? JSON.parse(localStorage.getItem("blogs")) : [];
    setBlogs(blogsData);
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-5">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Recent Posts</h1>
          <Link to="/add" className="bg-blue-500 px-4 py-2 rounded hover:bg-blue-600 transition">
            Create Post
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {blogs.map((blog) => (
            <Link 
              key={blog.id} 
              to={`/blog/${blog.id}`} 
              className="bg-gray-800 rounded-lg overflow-hidden hover:transform hover:scale-105 transition"
            >
              <img 
                src={blog.images[0]} 
                alt="Blog Cover" 
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <div className="flex items-center gap-2 text-blue-400 text-sm mb-2">
                  <Tags size={16} />
                  <span>{blog.category}</span>
                  <Timer size={16} className="ml-2" />
                  <span>{blog.readTime}</span>
                </div>
                
                <h2 className="text-xl font-semibold mb-2 line-clamp-2">{blog.title}</h2>
                <p className="text-gray-400 text-sm line-clamp-3 mb-4">{blog.summary}</p>
                
                <div className="flex items-center justify-between text-sm text-gray-400">
                  <div className="flex items-center gap-2">
                    <User size={16} />
                    <span>{blog.author}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      <ThumbsUp size={16} />
                      <span>{blog.likes}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar size={16} />
                      <span>{new Date(blog.uploadedDate).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;