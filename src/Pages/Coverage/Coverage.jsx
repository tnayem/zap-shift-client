import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Marker icon setup
const markerIcon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

// 🔥 Map Zoom Handler Component
const MapZoomHandler = ({ selectedDistrict }) => {
  const map = useMap();

  useEffect(() => {
    if (selectedDistrict) {
      map.setView(
        [selectedDistrict.latitude, selectedDistrict.longitude],
        10,
        { animate: true }
      );
    }
  }, [selectedDistrict, map]);

  return null;
};

// ✅ Replace this with your full district JSON data
import districtData from "./../../../public/warehouses.json";

const Coverage = () => {
  const [search, setSearch] = useState("");
  const [filteredDistricts, setFilteredDistricts] = useState(districtData);
  const [selectedDistrict, setSelectedDistrict] = useState(null);

  // Search Function
  const handleSearch = () => {
    const query = search.toLowerCase().trim();

    if (!query) {
      setFilteredDistricts(districtData);
      setSelectedDistrict(null);
      return;
    }

    const match = districtData.find(
      (d) =>
        d.district.toLowerCase() === query ||
        d.region.toLowerCase() === query ||
        d.city.toLowerCase() === query
    );

    if (match) {
      setFilteredDistricts([match]);
      setSelectedDistrict(match);
    } else {
      alert("No matching district or region found!");
    }
  };

  return (
    <div className="min-h-screen bg-base-200 flex flex-col items-center py-10 px-4">
      <h1 className="text-4xl font-bold mb-6 text-center">
        🇧🇩 Bangladesh Service Coverage Map
      </h1>

      {/* 🔍 Search Box */}
      <div className="form-control w-full max-w-md mb-6">
        <div className="input-group">
          <input
            type="text"
            placeholder="Search by region or district..."
            className="input input-bordered w-full"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          />
          <button className="btn btn-primary" onClick={handleSearch}>
            Search
          </button>
        </div>
      </div>

      {/* 🗺️ Map */}
      <div className="w-full max-w-6xl rounded-lg overflow-hidden shadow-lg">
        <MapContainer
          center={[23.685, 90.3563]} // Bangladesh Center
          zoom={7}
          style={{ height: "80vh", width: "100%" }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {/* 🔥 Map Zoom Handler */}
          <MapZoomHandler selectedDistrict={selectedDistrict} />

          {/* Markers */}
          {filteredDistricts.map((d, i) => (
            <Marker
              key={i}
              position={[d.latitude, d.longitude]}
              icon={markerIcon}
            >
              <Popup>
                <div className="text-sm">
                  <h2 className="font-bold text-lg mb-1">{d.district}</h2>
                  <p><strong>Region:</strong> {d.region}</p>
                  <p><strong>City:</strong> {d.city}</p>
                  <p>
                    <strong>Status:</strong>{" "}
                    <span
                      className={
                        d.status === "active" ? "text-green-600" : "text-red-600"
                      }
                    >
                      {d.status}
                    </span>
                  </p>
                  <p className="mt-1">
                    <strong>Covered Areas:</strong><br />
                    {d.covered_area.join(", ")}
                  </p>
                  <img
                    src={d.flowchart}
                    alt={`${d.district} Flowchart`}
                    className="mt-2 w-full rounded-md border"
                  />
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
};

export default Coverage;
