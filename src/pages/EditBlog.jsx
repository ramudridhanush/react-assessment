import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Plus } from "lucide-react";
import Header from "../components/Header";
import { useParams } from "react-router-dom";

const EditBlog = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [blog, setBlog] = useState(null); // Set initial state to null
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    keyword: "",
    category: "",
    readTime: "",
    summary: "",
    content: [""], // Start with one content field
    images: [],
  });

  useEffect(() => {
    const blogs = JSON.parse(localStorage.getItem("blogs")) || [];
    const foundBlog = blogs.find((b) => b.id === id);
    if (foundBlog) {
      setBlog(foundBlog);
    }
  }, [id]); // Run when id changes

  useEffect(() => {
    if (blog) {
      setFormData({
        title: blog.title,
        author: blog.author,
        keyword: blog.keyword,
        category: blog.category,
        readTime: blog.readTime,
        summary: blog.summary,
        content: blog.content || [""], // Default to an empty content array if not present
        images: blog.images || [],
      });
    }
  }, [blog]); // Run when `blog` changes

  const categories = [
    "Technology",
    "Travel",
    "Lifestyle",
    "Food",
    "Business",
    "Health",
  ];

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleContentChange = (index, value) => {
    const updatedContent = [...formData.content];
    updatedContent[index] = value;
    handleInputChange("content", updatedContent);
  };

  const handleImageUpload = (event) => {
    const files = Array.from(event.target.files);
    handleInputChange(
      "images",
      files.map((file) => URL.createObjectURL(file))
    );
  };

  const handleSave = () => {
    const requiredFields = [
      "title",
      "author",
      "keyword",
      "category",
      "readTime",
      "summary",
    ];
    const isValid =
      requiredFields.every((field) => formData[field]) &&
      formData.images.length > 0 &&
      formData.content.every((c) => c.trim() !== "");

    if (!isValid) {
      alert("Please fill in all fields and select at least 1 image.");
      return;
    }

    const blogs = JSON.parse(localStorage.getItem("blogs")) || [];
    const updatedBlog = {
      id,
      ...formData,
      comments: blog.comments || [],
      likes: blog.likes || 0,
      uploadedDate: blog.uploadedDate || new Date().toISOString(),
      readCount: blog.readCount || 0,
    };

    const updatedBlogs = blogs.map((b) => (b.id === id ? updatedBlog : b));
    localStorage.setItem("blogs", JSON.stringify(updatedBlogs));
    navigate("/");
  };
    const inputRef = useRef(null);
  
  useEffect(() => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }, []);

  return (
    <div>
      <Header />
      <div className="min-h-screen bg-gray-900 text-white p-5 py-[150px]">
        <div className="max-w-2xl mx-auto bg-gray-800 p-6 rounded-lg shadow-xl">
          <h2 className="text-2xl font-bold mb-6">Edit Your Blog</h2>

          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
                ref={inputRef}
              placeholder="Blog Title"
              className="col-span-2 p-3 rounded bg-gray-700 border border-gray-600"
              value={formData.title}
              onChange={(e) => handleInputChange("title", e.target.value)}
            />

            <input
              type="text"
              placeholder="Author Name"
              className="p-3 rounded bg-gray-700 border border-gray-600"
              value={formData.author}
              onChange={(e) => handleInputChange("author", e.target.value)}
            />

            <select
              className="p-3 rounded bg-gray-700 border border-gray-600 max-sm:text-sm"
              value={formData.category}
              onChange={(e) => handleInputChange("category", e.target.value)}
            >
              <option value="">Select Category</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>

            <input
              type="text"
              placeholder="Keywords (comma separated)"
              className="p-3 rounded bg-gray-700 border border-gray-600"
              value={formData.keyword}
              onChange={(e) => handleInputChange("keyword", e.target.value)}
            />

            <input
              type="text"
              placeholder="Read Time (e.g., 5 min)"
              className="p-3 rounded bg-gray-700 border border-gray-600"
              value={formData.readTime}
              onChange={(e) => handleInputChange("readTime", e.target.value)}
            />
          </div>

          <textarea
            placeholder="Blog Summary"
            className="w-full p-3 mt-4 rounded bg-gray-700 border border-gray-600"
            rows={3}
            value={formData.summary}
            onChange={(e) => handleInputChange("summary", e.target.value)}
          />

          {formData.content.map((c, index) => (
            <div key={index} className="flex gap-2 items-start mt-4">
              <textarea
                className="flex-1 p-3 rounded bg-gray-700 border border-gray-600"
                rows={5}
                placeholder="Content"
                value={c}
                onChange={(e) => handleContentChange(index, e.target.value)}
              />
              {index === formData.content.length - 1 && (
                <button
                  onClick={() =>
                    handleInputChange("content", [...formData.content, ""])
                  }
                  className="p-2 bg-blue-500 rounded-full hover:bg-blue-600"
                >
                  <Plus size={20} />
                </button>
              )}
            </div>
          ))}

          <div className="mt-4">
            <input
              type="file"
              multiple
              onChange={handleImageUpload}
              className="w-full p-3 rounded bg-gray-700 border border-gray-600"
            />
          </div>

          <button
            className="w-full mt-6 p-3 bg-blue-500 rounded font-semibold hover:bg-blue-600 transition"
            onClick={handleSave}
          >
            Save Blog
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditBlog;
