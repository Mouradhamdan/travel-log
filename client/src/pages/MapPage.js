import React, { useState, useEffect } from "react";
import AddModal from "../components/AddModal";
import ReactMapboxGl, { Marker } from "react-mapbox-gl";

const accessToken =
  "pk.eyJ1IjoibXVyYWRoYW1kYW4iLCJhIjoiY2w0YmMyd2JkMWtwdjNqbXJpMjNwcXYzaSJ9.oYKVX0mRnSlfu4qWdNtcRw";
const Map = ReactMapboxGl({
  accessToken,
});
const geocodingUrl = "https://api.mapbox.com/geocoding/v5";
const mapboxGeocoding = (query) =>
  `${geocodingUrl}/mapbox.places/${query}.json?access_token=${accessToken}`;

const MapPage = (props) => {
  const [errors, setErrors] = useState([]);
  const [selectedLogEntry, setSelectedLogEntry] = useState();
  const [destination, setDestination] = useState([35.51306, 33.88694]);
  const [destinations, setDestinations] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);

  const loadLogEntries = async () => {
    try {
      const response = await fetch("/api/v1/logEntries");
      if (!response.ok) {
        const errorMessage = `${response.status} (${response.statusText})`;
        const error = new Error(errorMessage);
        throw error;
      }
      const body = await response.json();
      setDestinations(body.logEntries);
    } catch (err) {
      console.error(`Error in fetch: ${err.message}`);
    }
  };

  const addLogEntry = async (data) => {
    try {
      const form = new FormData();
      for (let i = 0; i < data.images.length; i++) {
        form.append("images[]", data.images[i]);
      }

      form.append("latitude", destination[1]);
      form.append("longitude", destination[0]);

      Object.keys(data).forEach((key) => {
        if (key !== "images") {
          form.append(key, data[key]);
        }
      });
      const response = await fetch("/api/v1/logEntries", {
        method: "POST",
        body: form,
      });
      if (!response.ok) {
        if (response.status === 422) {
          const body = await response.json();
          const newErrors = translateServerErrors(body.errors);
          return setErrors(newErrors);
        } else {
          const errorMessage = `${response.status} (${response.statusText})`;
          const error = new Error(errorMessage);
          throw error;
        }
      } else {
        setShowAddModal(false);
        loadLogEntries();
      }
    } catch (err) {
      console.error(`Error in fetch: ${err.message}`);
    }
  };

  const showLogEntry = (id) => {
    if (id) setSelectedLogEntry(destinations.find((d) => d.id === id));
    else setSelectedLogEntry(undefined);
    setShowAddModal(true);
  };

  const search = async (query) => {
    const response = await fetch(mapboxGeocoding(query));
    const body = await response.json();
    setDestination(body.features[0].center);
  };

  useEffect(() => {
    loadLogEntries();
  }, []);
  const userId = props.user && props.user.id;
  console.log({ userId });
  return (
    <div className="list" style={{ width: "100%", height: "100vh" }}>
      {showAddModal && (
        <AddModal
          data={selectedLogEntry}
          onClose={() => {
            setShowAddModal(false);
          }}
          onSearch={search}
          onSubmit={(data) => {
            addLogEntry(data);
          }}
        />
      )}
      <Map
        key={userId}
        style="mapbox://styles/mapbox/streets-v9"
        containerStyle={{
          height: "100vh",
          width: "100vw",
        }}
        center={destination}
        onClick={() => {
          if (userId) {
            setSelectedLogEntry(undefined);
            setShowAddModal(true);
          }
        }}
      >
        {destinations.map((d) => (
          <Marker
            key={d.id}
            onClick={() => {
              showLogEntry(d.id);
            }}
            coordinates={[d.longitude, d.latitude]}
          >
            <svg x="0px" y="0px" width={30} height={30} viewBox="0 0 293.334 293.334">
              <g>
                <path
                  fill={userId === d.userId ? "red" : "blue"}
                  d="M146.667,0C94.903,0,52.946,41.957,52.946,93.721c0,22.322,7.849,42.789,20.891,58.878
			c4.204,5.178,11.237,13.331,14.903,18.906c21.109,32.069,48.19,78.643,56.082,116.864c1.354,6.527,2.986,6.641,4.743,0.212
			c5.629-20.609,20.228-65.639,50.377-112.757c3.595-5.619,10.884-13.483,15.409-18.379c6.554-7.098,12.009-15.224,16.154-24.084
			c5.651-12.086,8.882-25.466,8.882-39.629C240.387,41.962,198.43,0,146.667,0z M146.667,144.358
			c-28.892,0-52.313-23.421-52.313-52.313c0-28.887,23.421-52.307,52.313-52.307s52.313,23.421,52.313,52.307
			C198.98,120.938,175.559,144.358,146.667,144.358z"
                />
                <circle
                  fill={userId === d.userId ? "red" : "blue"}
                  cx="146.667"
                  cy="90.196"
                  r="21.756"
                />
              </g>
            </svg>
          </Marker>
        ))}
      </Map>
    </div>
  );
};

export default MapPage;
