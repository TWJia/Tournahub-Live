import React, { useEffect, useState } from "react";
import "./DisplayAllNews.css";
import axios from "axios";

const ApplicantHome = () => {
  const [newsData, setNewsData] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  // axios.defaults.withCredentials = true;

  useEffect(() => {
    fetchData();
    fetchAllNews();
  }, []);

  const fetchData = async () => {
    try {
      const { data } = await axios.get("https://api.fyp23s424.com/getCurrentUser", {
        withCredentials: true,
      });
      setUser(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchAllNews = async () => {
    try {
      const { status, data } = await axios.get(
        "https://api.fyp23s424.com/api/news/all"
      );
      setNewsData(data.message);
    } catch (error) {
      console.log(error);
    }
  };
  const handleTitleClick = (newsId) => {
    if (newsId) {
      window.location.href = `https://www.fyp23s424.com/home/news/${newsId}`;
    }
  };

  return (
    <div>
      <h3>Recommended News For you</h3>
      <div>
        <>
          {newsData.map(
            (news) =>
              news.category === user.interestedSport && (
                <div className="newsBorder" key={news._id}>
                  <a
                    className="newstitle"
                    href={`https://www.fyp23s424.com/home/news/${news._id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      handleTitleClick(news._id);
                    }}
                  >
                    <div className="newsColumns">
                      <img
                        className="fixed-size-image"
                        src={`https://api.fyp23s424.com/images/${news.photo}`}
                        alt={news.title}
                        onClick={() => handleTitleClick(news._id)}
                      />
                      {/* 
                      <h3 className="category-box">{news.category}</h3> */}
                      <div>
                        <h3>{news.title}</h3>
                        <p>Written by: {news.user?.name}</p>
                      </div>
                      {/* <p>{news.content}</p> */}
                    </div>
                  </a>
                </div>
              )
          )}
          <div className="newline">
            <h3>Other News</h3>
            {newsData.map(
              (news) =>
                news.category !== user.interestedSport &&
                news.category && (
                  <div className="newsBorder" key={news._id}>
                    <a
                      className="newstitle"
                      href={`https://www.fyp23s424.com/home/news/${news._id}`}
                      onClick={(e) => {
                        e.preventDefault();
                        handleTitleClick(news._id);
                      }}
                    >
                      {/* <p>{news.user?.name}</p> */}
                      <div className="newsColumns">
                        <img
                          className="fixed-size-image"
                          src={`https://api.fyp23s424.com/images/${news.photo}`}
                          alt={news.title}
                          onClick={() => handleTitleClick(news._id)}
                        />
                        <div>
                          <h3>{news.title}</h3>
                          <p>Written by: {news.user?.name}</p>
                        </div>
                      </div>
                      {/* <p>{news.content}</p> */}
                    </a>
                  </div>
                )
            )}
          </div>
          {/* {newsData.map((news) => (
        <div key={news._id}>
          <h3 onClick={() => handleTitleClick(news._id)}>
            <img
              className="fixed-size-image"
              src={`http://localhost:3001/images/${news.photo}`}
              alt={news.title}
            />
            {news.title}
          </h3>
          <p>{news.content}</p>
        </div>
      ))} */}
        </>
      </div>
    </div>
  );
};

export default ApplicantHome;
