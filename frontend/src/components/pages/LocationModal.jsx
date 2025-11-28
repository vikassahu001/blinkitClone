import { useEffect, useState, useCallback } from "react";
import "../css/LocationModal.css";

export default function LocationModal({ open, onClose, onSelectLocation }) {
  const [input, setInput] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);

  // Access the key from .env
  const API_KEY = import.meta.env.VITE_LOCATIONIQ_API_KEY;
  
  // Debounce/Throttle helper
  const debounce = (func, delay) => {
    let timeout;
    return (...args) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), delay);
    };
  };

  useEffect(() => {
    if (open) {
      setInput("");
      setSuggestions([]);
    }
  }, [open]);

  // --- 1. FETCH AUTOCOMPLETE (LocationIQ) ---
  const fetchPredictions = useCallback(
    debounce(async (query) => {
      if (!query || query.length < 3) {
        setSuggestions([]);
        return;
      }

      try {
        // LocationIQ Autocomplete API
        const response = await fetch(
          `https://api.locationiq.com/v1/autocomplete?key=${API_KEY}&q=${query}&limit=5&dedupe=1`
        );

        if (response.ok) {
          const data = await response.json();
          setSuggestions(data);
        }
      } catch (error) {
        console.error("LocationIQ Error:", error);
      }
    }, 500), // 500ms delay to save API credits
    []
  );

  useEffect(() => {
    fetchPredictions(input);
  }, [input, fetchPredictions]);

  // --- 2. HANDLE SELECTION ---
  const handleSelect = (item) => {
    // LocationIQ gives us lat/lon directly in the suggestion!
    // We create a neat object to send back to Navbar
    const locationData = {
      formatted_address: item.display_name,
      // Try to extract city/state from display_name if possible,
      // or use the specific address object if you add '&addressdetails=1' to the fetch URL
      lat: item.lat,
      lng: item.lon,
      city: item.address?.city || item.address?.town || item.address?.village,
      state: item.address?.state,
    };

    onSelectLocation(locationData);
    onClose();
  };

  // --- 3. USE CURRENT LOCATION (Reverse Geocoding) ---
  const useCurrentLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by this browser.");
      return;
    }

    setLoading(true);

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude, longitude } = pos.coords;

        try {
          // LocationIQ Reverse Geocoding API
          const response = await fetch(
            `https://us1.locationiq.com/v1/reverse?key=${API_KEY}&lat=${latitude}&lon=${longitude}&format=json`
          );

          if (response.ok) {
            const data = await response.json();

            onSelectLocation({
              formatted_address: data.display_name,
              lat: latitude,
              lng: longitude,
              city:
                data.address?.city ||
                data.address?.town ||
                data.address?.village,
              state: data.address?.state,
            });

            onClose();
          }
        } catch (error) {
          console.error("Reverse Geocoding Error:", error);
          alert("Could not fetch address details.");
        } finally {
          setLoading(false);
        }
      },
      () => {
        setLoading(false);
        alert("Unable to retrieve your location.");
      }
    );
  };

  if (!open) return null;

  return (
    <div className="loc-overlay" onMouseDown={onClose}>
      <div className="loc-modal" onMouseDown={(e) => e.stopPropagation()}>
        <div className="loc-header">
          <h3 className="loc-title">Select your location</h3>
          <button className="loc-close-btn" onClick={onClose}>
            ✕
          </button>
        </div>

        <button
          className="loc-gps-btn"
          onClick={useCurrentLocation}
          disabled={loading}
        >
          {loading ? "Locating..." : "📍 Use current location"}
        </button>

        <div className="loc-search-box">
          <span className="loc-search-icon">🔍</span>
          <input
            className="loc-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Search for area, street, city..."
          />
        </div>

        <div className="loc-results">
          {suggestions.map((s, index) => (
            <div
              key={index} // LocationIQ sometimes has duplicate IDs, index is safer
              className="loc-result-item"
              onClick={() => handleSelect(s)}
            >
              <div className="loc-result-main">
                {/* LocationIQ puts the whole address in display_name */}
                {s.display_name.split(",")[0]}
              </div>
              <div className="loc-result-sub">
                {/* Show the rest of the address */}
                {s.display_name.split(",").slice(1).join(",")}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
