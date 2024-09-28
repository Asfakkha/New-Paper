import React, { useEffect, useState } from 'react';
import NewsItem from './NewsItem';
import Spinner from './Spinner';

export default function News({ category }) {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  const pageSize = 12;

  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=84e4df07c1d9456683cb4897c64bcd01&page=${page}&pageSize=${pageSize}`
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setArticles(data.articles || []);
        setTotalResults(data.totalResults || 0);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchNews();
  }, [page, category]);

  const handleNextPage = () => {
    if (page < Math.ceil(totalResults / pageSize)) {
      setPage(page + 1);
    }
  };

  const handlePrevPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="container my-3">
      <h2 className="text-center">News Paper - {category.charAt(0).toUpperCase() + category.slice(1)} Headlines</h2>

      {loading ? (
        <Spinner />
      ) : (
        <>
          <div className="row">
            {articles.map((article, index) => (
              <div className="col-md-4" key={index}>
                <NewsItem 
                  title={article.title ? article.title.slice(0, 25) : "When Sydney hosted SNL in March"} 
                  description={article.description ? article.description.slice(0, 80) : "When Sydney hosted SNL in March, the show was accused of doing her"} 
                  imgUrl={article.urlToImage || 'https://s.yimg.com/cv/apiv2/social/images/yahoo_default_logo.png'} 
                  url={article.url} 
                />
              </div>
            ))}
          </div>

          <div className="d-flex justify-content-between my-3">
            <button 
              disabled={page <= 1} 
              type="button" 
              className="btn btn-dark" 
              onClick={handlePrevPage}
            >
              &larr; Previous
            </button>

            <button 
              disabled={page >= Math.ceil(totalResults / pageSize)} 
              type="button" 
              className="btn btn-dark" 
              onClick={handleNextPage}
            >
              Next &rarr;
            </button>
          </div>
        </>
      )}
    </div>
  );
}
   