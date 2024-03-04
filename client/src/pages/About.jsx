import React from 'react';

const About = () => {
  const githubUrl = 'https://github.com/FaisalKhan-8';
  const linkedinUrl = 'https://www.linkedin.com/in/faisal-khan-ab4524184/';
  const portfolio = 'https://faisal-portfolio-mocha.vercel.app/';

  return (
    <div className='about-page-main'>
      <div className='about-page'>
        <div className='about-head'>
          <h1>About BeatBlog</h1>
          <div className='about-page-text'>
            <p>
              Welcome to BeatBlog, This blog was created by Faisal Khan. as a
              personal project to share his thoughts and ideas with the world.
              BeatBlog aims to provide valuable insights, tutorials, and
              resources related to web development, programming, and other
              technology topics.
            </p>

            <p>
              On this blog, you'll find weekly articles and tutorials on topics
              such as web development, software engineering, and programming
              languages. Faisal is always learning and exploring new
              technologies, so be sure to check back often for new content!
            </p>

            <p>
              We encourage you to leave comments on our posts and engage with
              other readers. You can like other people's comments and reply to
              them as well. We believe that a community of learners can help
              each other grow and improve.
            </p>

            <p>Check out my social</p>

            <div className='social-links'>
              <a
                href={githubUrl}
                target='_blank'
                rel='noopener noreferrer'>
                GitHub
              </a>
              <a
                href={linkedinUrl}
                target='_blank'
                rel='noopener noreferrer'>
                LinkedIn
              </a>
              <a
                href={portfolio}
                target='_blank'
                rel='noopener noreferrer'>
                Portfolio
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
