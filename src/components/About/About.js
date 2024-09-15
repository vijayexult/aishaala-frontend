import React from 'react';
import './About.css';

const About = () => {
  return (
    <div className="about">
      <section id="about" className="container">
        <h2 className='h2'>About</h2>
        <img src="https://www.aitota.com/static/media/Vijay%20Kumar%20Circular.525699addc1ebbf83c68.png" alt="Vijay Kumar Singh" className="founder-image" />
        <div className="center-content"></div>
        <div className="founder-info">
          <div className="text-content">
            <h1>Vijay Kumar Singh</h1>
            <p><strong>Founder - Aitota.com</strong><br />Mobishaala.com, Ex-Intel</p>
            <p>Vijay Kumar Singh’s journey is a testament to the power of innovation and impact. An electronic engineer with over 8 years of chip design experience at Intel, Vijay's career began with a deep dive into the technical intricacies of technology. His passion for making a difference soon led him to new realms of possibility.</p>
            <p>He played a pivotal role in developing Swachh Map for Swachh Bharat, dedicating 5 years to driving national social initiatives that aimed to improve public sanitation and awareness. This experience underscored his belief in technology's ability to drive social change.</p>
            <p>Building on this foundation, Vijay embarked on a transformative journey with Mobishaala.com, a platform he has been running for the past 6 years. Here, he empowered hundreds of teachers and lakhs of students, seamlessly bridging the gap between traditional and online education. His innovative approach also extends to education with Aishaala, an AI assistant designed to enhance learning for teachers and students.</p>
            <p>Aitota is revolutionizing communication with cutting-edge conversational AI, connecting people and businesses with AI Voice. Our mission is to use conversational AI to transform communication across multiple domains, including health, contact centers, and business sectors. At Aitota, we are dedicated to leveraging technology to enhance interactions and drive meaningful change.</p>
            <p>Vijay’s approach to innovation is embodied in his philosophy:</p>
            <blockquote>
              <p>"Seeding Ideas, Watering Vision, Planting Prototype, Nurturing Products for People, and Harvesting Change."</p>
            </blockquote>
            <p>This guiding principle drives Aitota’s commitment to creating technology solutions that make a significant difference.</p>
            <p>For more details on Vijay's journey, visit his <a href="https://www.linkedin.com">LinkedIn profile</a>.</p>
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
