import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link, useParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import Home from "./components/Home";
import BlogPage from "./components/Blogpage";
import HomePage from "./pages/HomePage";
import AddBlog from "./pages/AddBlog";
import EditBlog from "./pages/EditBlog";


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/add" element={<AddBlog />} />
        <Route path="/blog/:id" element={<BlogPage />} />
        <Route path="/edit/:id" element={<EditBlog />} />
      </Routes>
    </Router>
  );
};

export default App;
