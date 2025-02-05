import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Heart,
  MessageCircle,
  Share2,
  Calendar,
  Timer,
  Tags,
  ArrowLeft,
} from "lucide-react";
import { Link } from "react-router-dom";

const BlogPage = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [comment, setComment] = useState("");

  useEffect(() => {
    const blogs = JSON.parse(localStorage.getItem("blogs")) || [];
    const foundBlog = blogs.find((b) => b.id === id);
    setBlog(foundBlog);
  }, [id]);

  const handleLike = () => {
    const blogs = JSON.parse(localStorage.getItem("blogs")) || [];
    const updatedBlogs = blogs.map((b) =>
      b.id === id ? { ...b, likes: (b.likes || 0) + 1 } : b
    );
    localStorage.setItem("blogs", JSON.stringify(updatedBlogs));
    setBlog((prev) => ({ ...prev, likes: (prev.likes || 0) + 1 }));
  };

  const handleComment = () => {
    if (!comment.trim()) return;

    const blogs = JSON.parse(localStorage.getItem("blogs")) || [];
    const updatedBlogs = blogs.map((b) => {
      if (b.id === id) {
        return {
          ...b,
          comments: [
            ...(b.comments || []),
            {
              id: Date.now(),
              text: comment,
              date: new Date().toISOString(),
            },
          ],
        };
      }
      return b;
    });

    localStorage.setItem("blogs", JSON.stringify(updatedBlogs));
    setBlog((prev) => ({
      ...prev,
      comments: [
        ...(prev.comments || []),
        {
          id: Date.now(),
          text: comment,
          date: new Date().toISOString(),
        },
      ],
    }));
    setComment("");
  };

  if (!blog)
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <p className="text-xl">Blog not found</p>
      </div>
    );

  const editHandler = ()=>{
    window.location.href = `/edit/${id}`;
  }
  const deleteHandler = ()=>{
    const blogs = JSON.parse(localStorage.getItem("blogs")) || [];
    const updatedBlogs = blogs.filter((b) => b.id !== id);
    localStorage.setItem("blogs", JSON.stringify(updatedBlogs));
    window.location.href = '/';
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="max-w-4xl mx-auto p-5">
        <Link
          to="/"
          className="inline-flex items-center text-blue-400 hover:text-blue-300 mb-6"
        >
          <ArrowLeft className="mr-2" /> Back to Home
        </Link>

        <header className="mb-8">
          <h1 className="text-4xl font-bold mb-4">{blog.title}</h1>

          <div className="flex items-center gap-6 text-gray-400 mb-4">
            <div className="flex items-center gap-2">
              <Calendar size={18} />
              {new Date(blog.uploadedDate).toLocaleDateString("en-GB")}
            </div>
            <div className="flex items-center gap-2">
              <Timer size={18} />
              {blog.readTime}
            </div>
            <div className="flex items-center gap-2">
              <Tags size={18} />
              {blog.category}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <img
              src="https://avatar.iran.liara.run/public/boy"
              alt="Author"
              className="w-10 h-10 rounded-full"
            />
            <div>
              <p className="font-medium">{blog.author}</p>
              <p className="text-sm text-gray-400">Author</p>
            </div>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {blog.images.map((img, index) => (
            <img
            
              key={index}
              src={img || "https://random-image-pepebigotes.vercel.app/api/random-image" }
              alt={`Blog content ${index + 1}`}
              className="w-full h-[300px] object-cover rounded-lg shadow-lg border-2 border-gray-200"
              />
          ))}
          <div className="flex gap-3 justify-center items-center "> 

          <button onClick={editHandler} className="px-4 py-2 bg-teal-400 w-fit h-fit ">Edit</button>
          < button onClick={deleteHandler} className="px-4 py-2 bg-red-400 w-fit h-fit">Delete</button>
          </div>
        </div>

        <div className="prose prose-invert max-w-none mb-8">
          {blog.content.map((paragraph, index) => (
            <p key={index} className="mb-4 leading-relaxed">
              {paragraph}
            </p>
          ))}
        </div>

        <div className="flex items-center justify-between py-6 border-t border-gray-700">
          <div className="flex items-center gap-6">
            <button
              onClick={handleLike}
              className="flex items-center gap-2 hover:text-pink-500 transition"
            >
              <Heart
                size={20}
                className={blog.likes > 0 ? "fill-current" : ""}
              />
              {blog.likes || 0}
            </button>
            <button className="flex items-center gap-2 hover:text-blue-400 transition">
              <MessageCircle size={20} />
              {blog.comments?.length || 0}
            </button>
            <button className="flex items-center gap-2 hover:text-green-400 transition">
              <Share2 size={20} />
              Share
            </button>
          </div>
        </div>

        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">Comments</h2>
          <div className="flex gap-4 mb-6">
            <input
              type="text"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Add a comment..."
              className="flex-1 bg-gray-800 rounded-lg p-3 border border-gray-700"
            />
            <button
              onClick={handleComment}
              className="px-6 py-3 bg-blue-500 rounded-lg hover:bg-blue-600 transition"
            >
              Comment
            </button>
          </div>

          <div className="space-y-4">
            {blog.comments?.map((comment) => (
              <div key={comment.id} className="bg-gray-800 rounded-lg p-4">
                <p className="mb-2">{comment.text}</p>
                <p className="text-sm text-gray-400">
                  {new Date(comment.date).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPage;
