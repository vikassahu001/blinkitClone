import React from "react";
import { Link } from "react-router-dom";
import { slugify } from "../../utils/urlHelper";
import "../css/SeoFooter.css";

const SeoFooter = ({ activeCategory, categories = [] }) => {
  const catName = activeCategory ? activeCategory.name : "Groceries";
  const footerCategories = categories.slice(0, 15); // Show more categories here since we have space

  return (
    <div className="seo-footer-container">
      {/* 1. Dynamic SEO Text Block */}
      <div className="seo-category-desc">
        <h2>Buy {catName} Online</h2>
        <p>
          Order {catName} online from Grocify and get them delivered to your
          doorstep in minutes. We offer a wide variety of{" "}
          {catName.toLowerCase()} products to choose from including top brands
          and local favorites.
        </p>
        <p>
          Shop for {catName} at the best prices. Whether you are looking for
          premium brands or everyday essentials, we have it all covered. Enjoy
          superfast delivery and high-quality products guaranteed.
        </p>
      </div>

      {/* 2. Dynamic Categories List (SEO Friendly) */}
      <div className="seo-links-section">
        <h3>Explore More Categories</h3>
        <ul className="seo-cat-list">
          {footerCategories.length > 0 ? (
            footerCategories.map((cat) => (
              <li key={cat._id}>
                <Link to={`/cn/${slugify(cat.name)}/cid/${cat._id}`}>
                  {cat.name}
                </Link>
              </li>
            ))
          ) : (
            <li>Loading...</li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default SeoFooter;
