import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "../css/Home.css";
import { useState } from "react";
import { slugify } from "../../utils/urlHelper";

const Home = () => {
  const [categories, setCategories] = useState([]);
  const [heroBanner, setHeroBanner] = useState(null);
  const [secondBanners, setSecondBanners] = useState([]);
  const [loading, setLoading] = useState(true);

  // Find targetUrl from dynamically
  const getBannerLink = (banner) => {
    if (banner.linkedCategory && banner.linkedCategory._id) {
      const { name, _id } = banner.linkedCategory;
      return `/cn/${slugify(name)}/cid/${_id}`;
    }

    return banner.targetUrl || "#";
  };

  // Scroll to top on load
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Replace with your actual API endpoint
        const response = await fetch(
          "https://blinkitclone-hjmy.onrender.com/api/home"
        );
        const result = await response.json();
        if (result.success) {
          setHeroBanner(result.data.heroBanner);
          setSecondBanners(result.data.secondaryBanners);
          setCategories(result.data.categories);
        }
      } catch (error) {
        console.error("Error fetching data", error);
        setLoading(false);
      }
    };

    fetchData();
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="home-container">
      <div className="main-content-wrapper">
        {/* 1. Dynamic Hero Banner */}
        <div className="first-banner">
          {heroBanner && (
            <Link to={getBannerLink(heroBanner)}>
              <img
                className="first-banner-img"
                src={heroBanner.image}
                alt={heroBanner.alt || "hero-banner"}
              />
            </Link>
          )}
        </div>

        {/* 2. Dynamic Secondary Banners */}
        <div className="second-banner">
          {secondBanners.map((banner, index) => (
            <Link
              to={getBannerLink(banner)}
              className="second-banner-link"
              key={index}
            >
              <img
                className="second-banner-img"
                src={banner.image}
                alt={banner.alt}
              />
            </Link>
          ))}
        </div>

        {/* 3. Dynamic Category Grid */}
        <div className="category-cards">
          {categories.map((category) => (
            <Link
              // CHANGE THIS LINE:
              to={`/cn/${slugify(category.name)}/cid/${category._id}`}
              key={category._id} // Better to use unique ID than index
              className="category-card"
            >
              <img
                className="category-card-img"
                src={category.image}
                alt={category.alt || category.name}
              />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
