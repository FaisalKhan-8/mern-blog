import React from 'react';

const CallToAction = () => {
  return (
    <div className='action_main_container'>
      <div className='action_content'>
        <h2>Want to learn more about JavaScript?</h2>
        <p>Checkout these resources with 100 JavaScript Projects</p>
        <button className='action_btn'>
          <a
            href='https://faisal-portfolio-mocha.vercel.app/'
            target='_blank'
            rel='noopener noreferrer'>
            100 JavaScript Projects
          </a>
        </button>
      </div>
      <div className='action_img'>
        <img
          src='/callToAction.svg'
          alt='call to action'
        />
      </div>
    </div>
  );
};

export default CallToAction;
