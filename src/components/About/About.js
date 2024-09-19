
import React from 'react';
import './About.css'; // Make sure the path is correct

const About = () => {
  return (
	<div className="about">
	  <header>
		<div className="container">
			<h1>Aishaala</h1>
			<nav>
				<ul>
					<li><a href="#about">About</a></li>
					<li><a href="#contact">Contact</a></li>
				</ul>
			</nav>
		</div>
	</header>

	  <section id="about" className="container">

	  <h2>About the Founder</h2>
		<div className="founder-info">
    <img src="https://www.aitota.com/static/media/Vijay%20Kumar%20Circular.525699addc1ebbf83c68.png" alt="Vijay Kumar Singh" className="founder-image" />
			<div className="text-content">
				<h3>Vijay Kumar Singh</h3>
				<p><strong>Founder - Aishaala & Mobishaala.com</strong><br />Ex-Intel</p>
				<p>Vijay Kumar Singh is a pioneer in educational technology and AI-driven solutions. With over 8 years of experience as an electronic engineer at Intel, Vijay gained deep technical expertise in chip design and technology.</p>
				<p>His commitment to leveraging technology for social impact is evident from his significant role in the Swachh Map for Swachh Bharat initiative, which aimed at improving public sanitation and awareness.</p>
				<p>Building on this experience, Vijay founded Mobishaala.com, a platform that continues to empower hundreds of teachers and millions of students by bridging traditional and online education. His latest venture, Aishaala, represents a major advancement in educational technology. Aishaala is an AI-powered platform designed to enhance learning experiences through its innovative AI assistant features.</p>
				<p>In addition to Aishaala, Vijay's company Aitota is at the forefront of revolutionizing communication through conversational AI, focusing on transforming interactions across various sectors including education, health, and business.</p>
				<p>Vijay’s approach to innovation is captured in his guiding philosophy:</p>
				<blockquote>
					<p>"Seeding Ideas, Watering Vision, Planting Prototype, Nurturing Products for People, and Harvesting Change."</p>
				</blockquote>
				<p>This philosophy drives Aishaala’s mission to make a significant impact in the field of education.</p>
				<p>For more details on Vijay’s journey and contributions, visit his <a href="https://www.linkedin.com">LinkedIn profile</a>.</p>
				<p><strong>Contact:</strong> <a href="mailto:contact@aitota.com">contact@aitota.com</a></p>
			</div>
		</div>

	  </section>

	  <footer className="footer">
		<div className="container">
		  <p>&copy; 2024 Aitota. All rights reserved.</p>
		</div>
	  </footer>
	</div>
  );
}

export default About;

