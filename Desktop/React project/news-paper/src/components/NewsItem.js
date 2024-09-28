import React from 'react';

export default function NewsItem({ title, description, imgUrl, url }) {
  return (
    <div className="container my-3">
      <div className="card" style={{ width: '18rem', minHeight: '24rem' }}>
        <img 
          src={imgUrl} 
          className="card-img-top" 
          alt={title} 
          style={{ objectFit: 'cover', height: '150px' }} // Ensuring all images have the same height
        />
        <div className="card-body d-flex flex-column">
          <h5 className="card-title">{title}</h5>
          <p 
            className="card-text" 
            style={{
              flexGrow: 1,
              overflow: 'hidden', 
              textOverflow: 'ellipsis', 
              maxHeight: '60px',
              display: 'block', // Change from -webkit-box to block for better compatibility
              whiteSpace: 'normal', // Ensure text wraps properly
              overflowWrap: 'break-word', // Handle word breaks cleanly
              lineHeight: '1.5em', // Ensure consistent line height
              height: '4.5em', // Exactly 3 lines of text (3 lines x 1.5em each)
            }}
          >
            {description}
          </p>
          <a href={url} target="_blank" rel="noopener noreferrer" className="btn btn-dark mt-auto">
            Read more
          </a>
        </div>
      </div>
    </div>
  );
}
