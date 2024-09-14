// App.js
import React from 'react';
import './Blog.css';

const blogs = [
  {
    title: "AI Double Educator Blog",
    description: "Explore insights on personalized education powered by AI.",
    link: "https://educatoraidouble.blogspot.com/",
  },
  {
    title: "Personalized AI in Education",
    description: "The new era of learning with AI: Revolutionizing personalized education systems.",
    link: "https://personalizedaiforeducation.blogspot.com/2024/09/personalized-ai-new-era-of-learning.html",
  },
  {
    title: "Aishaala TA AI/SA AI Blog",
    description: "Deep dive into the intersection of AI and education with Aishaala TA AI and SA AI initiatives.",
    link: "https://aishaala-taai-saai.blogspot.com/",
  },
  {
    title: "AI-Powered Personalized Learning",
    description: "How personalized AI is setting the stage for a new era of tailored learning experiences.",
    link: "https://personalizedaiforeducation.blogspot.com/2024/09/personalized-ai-new-era-of-learning.html",
  },
];

function App() {
  return (
    <div id="blog">
    <h1 className="blog-heading">Happy Blogging with Aishaala</h1>
    <div className="blog-container">
      {blogs.map((blog, index) => (
        <a href={blog.link} key={index} className="blog-card" target="_blank" rel="noopener noreferrer">
          <div className="blog-content">
            <h2>{blog.title}</h2>
            <p>{blog.description}</p>
          </div>
        </a>
      ))}
    </div>
    </div>
  );
}

export default App;
