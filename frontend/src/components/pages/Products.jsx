import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import ProductCard from "./ProductCard";
import SeoFooter from "./SeoFooter";
import { slugify } from "../../utils/urlHelper";
import "../css/Products.css";

function Products() {
  // Capture params from URL.
  // 'categoryId' exists for category routes.
  // 'searchTerm' exists for search routes.
  const { categoryId, searchTerm } = useParams();
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [activeCategory, setActiveCategory] = useState(null);
  const [loading, setLoading] = useState(true);

  // --- 1. Fetch Categories (Sidebar needs this always) ---
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/category"
        );
        const result = await response.json();
        if (result.success && result.categories?.length > 0) {
          setCategories(result.categories);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
    window.scrollTo(0, 0);
  }, []);

  // --- 2. Handle Data Fetching based on Mode (Search vs Category) ---
  useEffect(() => {
    // MODE A: Search Mode
    if (searchTerm) {
      // Reset active category because we are searching globally
      setActiveCategory(null);
      fetchProducts(
        `http://localhost:5000/api/products?search=${searchTerm}`
      );
    }

    // MODE B: Category Mode
    else if (categories.length > 0) {
      if (categoryId) {
        // Find the category object to display its name in header
        const matchingCategory = categories.find((c) => c._id === categoryId);
        if (matchingCategory) {
          setActiveCategory(matchingCategory);
          fetchProducts(
            `http://localhost:5000/api/products?categoryId=${categoryId}`
          );
        }
      } else {
        // Fallback: If URL has no ID and no search, go to first category
        const firstCat = categories[0];
        navigate(`/cn/${slugify(firstCat.name)}/cid/${firstCat._id}`, {
          replace: true,
        });
      }
    }
  }, [categoryId, searchTerm, categories, navigate]);

  // --- Helper Function to Fetch Data ---
  const fetchProducts = async (url) => {
    setLoading(true);
    try {
      const response = await fetch(url);
      const result = await response.json();
      if (result.success) {
        setProducts(result.data);
      } else {
        setProducts([]);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  // --- Dynamic Header Text Logic ---
  const getHeaderText = () => {
    if (searchTerm) {
      return `Search results for "${searchTerm}"`;
    }
    if (activeCategory) {
      return `Buy ${activeCategory.name} Online`;
    }
    return "Loading...";
  };

  return (
    <div className="app-container">
      {/* Sidebar - Stays visible even during search */}
      <aside className="sidebar-panel">
        <Sidebar
          categories={categories}
          activeCategoryId={activeCategory?._id}
        />
      </aside>

      <main className="main-panel">
        <header className="top-header">
          <div className="header-title-box">
            <h1>{getHeaderText()}</h1>
          </div>
        </header>

        <div className="scroll-content">
          {loading ? (
            <div className="flex justify-center p-10">Loading Products...</div>
          ) : (
            <div className="products-grid">
              {products.length > 0 ? (
                products.map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))
              ) : (
                <div
                  className="no-results"
                  style={{
                    width: "100%",
                    textAlign: "center",
                    padding: "40px 0",
                  }}
                >
                  <p className="p-5 text-gray-500">
                    {searchTerm
                      ? `No products found matching "${searchTerm}"`
                      : "No products found in this category."}
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Footer always pushed to bottom via CSS because of .scroll-content flex logic */}
          <div className="footer-area">
            <SeoFooter
              activeCategory={activeCategory}
              categories={categories}
            />
          </div>
        </div>
      </main>
    </div>
  );
}

export default Products;
