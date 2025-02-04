import React from "react";
import { useNavigate } from "react-router-dom";
import { Plus } from "lucide-react";
import Header from "../components/Header";

const AddBlog = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = React.useState({
    title: "",
    author: "",
    keyword: "",
    category: "",
    readTime: "",
    summary: "",
    content: [""],
    images: [],
  });

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
    const newBlog = {
      id: crypto.randomUUID(),
      ...formData,
      comments: [],
      likes: 0,
      uploadedDate: new Date().toISOString(),
      readCount: 0,
    };
    console.log(new Date().toISOString());

    localStorage.setItem("blogs", JSON.stringify([...blogs, newBlog]));
    navigate("/");
  };

  return (
    <div>
      <Header />
      <div className="min-h-screen bg-gray-900 text-white p-5">
        <div className="max-w-2xl mx-auto bg-gray-800 p-6 rounded-lg mt-5 shadow-xl">
          <h2 className="text-2xl font-bold mb-6">Create New Blog Post</h2>

          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
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
              className="p-3 rounded bg-gray-700 border border-gray-600"
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
            Publish Blog
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddBlog;
