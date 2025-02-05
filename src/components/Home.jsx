import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Tags, Timer, Calendar, User, ThumbsUp } from "lucide-react";
import Header from "./Header"; 
import HomeBanner from "./HomeBanner";

const Home = () => {
  const [blogs, setBlogs] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const blogsData = localStorage.getItem("blogs")
      ? JSON.parse(localStorage.getItem("blogs"))
      : [];
    setBlogs(blogsData);
  }, []);

  const filteredBlogs = blogs.filter((blog) =>
    blog.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const defaultImgURL = "https://random-image-pepebigotes.vercel.app/api/random-image";

  return (
    <div className="min-h-screen bg-gray-900 text-white bg-cover bg-center bg-fixed">
      <Header setSearchQuery={setSearchQuery} />
      <HomeBanner />

      <div className="max-w-7xl mx-auto p-5 min-h-screen">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Recent Posts</h1>
          <Link
            to="/add"
            className="bg-blue-500 px-4 py-2 rounded hover:bg-blue-600 transition"
          >
            Create Post
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {filteredBlogs.length > 0 ? (
            filteredBlogs.map((blog) => (
              <Link
                key={blog.id}
                to={`/blog/${blog.id}`}
                className="bg-gray-800 rounded-lg overflow-hidden hover:transform hover:scale-105 transition duration-300 shadow-md shadow-gray-400"
              >
                <img
                  src={    defaultImgURL}
                  // src = {blog.images[0]}
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

                  <h2 className="text-xl font-semibold mb-2 line-clamp-2">
                    {blog.title}
                  </h2>
                  <p className="text-gray-400 text-sm line-clamp-3 mb-4">
                    {blog.summary}
                  </p>

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
                        <span>
                          {new Date(blog.uploadedDate).toLocaleDateString(
                            "en-GB"
                          )}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <p className="text-gray-400">No matching blogs found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
