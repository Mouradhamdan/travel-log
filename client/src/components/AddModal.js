import React, { useState } from "react";
import config from "../config";

const AddModal = (props) => {
  const { data, onClose, onSearch, onSubmit } = props;
  const [logEntry, setlogEntry] = useState({
    title: "",
    description: "",
    city: "",
    startDate: "",
    endDate: "",
    images: [],
  });

  const handleInputChange = (event) => {
    setlogEntry({
      ...logEntry,
      [event.currentTarget.name]: event.currentTarget.value,
    });
    if (event.currentTarget.name === "city") {
      onSearch(event.currentTarget.value);
    }
  };

  const handleFileChange = (event) => {
    setlogEntry({
      ...logEntry,
      [event.currentTarget.name]: event.currentTarget.files,
    });
  };

  //TODO: refactor inputs into a single function
  return (
    <div className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 w-full md:inset-0 h-modal md:h-full justify-center items-center flex bg-black bg-opacity-60">
      <div className="relative p-4 w-full max-w-md h-full md:h-auto">
        <div className="relative rounded-lg shadow bg-gray-700">
          <button
            onClick={onClose}
            type="button"
            className="cursor-pointer absolute top-3 right-2.5 text-gray-400 bg-transparent rounded-lg text-sm p-1.5 ml-auto inline-flex items-center hover:bg-gray-800 hover:text-white"
          >
            <svg
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              ></path>
            </svg>
          </button>
          <div
            className="py-6 px-6 lg:px-8"
            onSubmit={(event) => {
              event.preventDefault();
            }}
          >
            <h3 className="mb-4 text-xl font-medium text-white">{data ? "" : `Add Log Entry`}</h3>
            <form className="space-y-6" action="#">
              <div>
                <label htmlFor="city" className="block mb-2 text-sm font-medium text-gray-300">
                  City
                </label>
                <input
                  disabled={!!data}
                  onChange={handleInputChange}
                  type="city"
                  name="city"
                  className="text-sm rounded-lg block w-full p-2.5 bg-gray-600 disabled:bg-gray-600 border-gray-500 placeholder-gray-400 text-white"
                  placeholder="City"
                  value={data && data.city}
                  required
                />
              </div>
              <div>
                <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-300">
                  Title
                </label>
                <input
                  disabled={!!data}
                  onChange={handleInputChange}
                  type="title"
                  name="title"
                  className="text-sm rounded-lg block w-full p-2.5 bg-gray-600 disabled:bg-gray-600 border-gray-500 placeholder-gray-400 text-white"
                  placeholder="Title"
                  value={data && data.title}
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="description"
                  className="block mb-2 text-sm font-medium text-gray-300"
                >
                  Description
                </label>
                <input
                  disabled={!!data}
                  onChange={handleInputChange}
                  type="description"
                  name="description"
                  className="text-sm rounded-lg block w-full p-2.5 bg-gray-600 disabled:bg-gray-600 border-gray-500 placeholder-gray-400 text-white"
                  placeholder="Description"
                  value={data && data.description}
                  required
                />
              </div>
              <div>
                <label htmlFor="startDate" className="block mb-2 text-sm font-medium text-gray-300">
                  Start Date
                </label>
                <input
                  disabled={!!data}
                  onChange={handleInputChange}
                  type="date"
                  name="startDate"
                  className="text-sm rounded-lg disabled:rounded-lg disabled:border-0  block w-full p-2.5 bg-gray-600 disabled:bg-gray-600 disabled:text-white border-gray-500 placeholder-gray-400 text-white"
                  value={data && data.startDate.split("T")[0]}
                  required
                />
              </div>
              <div>
                <label htmlFor="endDate" className="block mb-2 text-sm font-medium text-gray-300">
                  End Date
                </label>
                <input
                  disabled={!!data}
                  onChange={handleInputChange}
                  type="date"
                  name="endDate"
                  className="text-sm rounded-lg disabled:rounded-lg disabled:border-0 block w-full p-2.5 bg-gray-600 disabled:bg-gray-600 disabled:text-white border-gray-500 placeholder-gray-400 text-white"
                  value={data && data.endDate.split("T")[0]}
                  required
                />
              </div>
              <div className={`${data && data.images && "h-[170px] overflow-auto"}`}>
                <label
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  htmlFor="images"
                >
                  images
                  {/* TODO: change title if no images are uploaded */}
                </label>
                {!data && (
                  <input
                    disabled={!!data}
                    onChange={handleFileChange}
                    className="block w-full text-sm rounded-lg border cursor-pointer text-gray-400 focus:outline-none bg-gray-700 border-gray-600 placeholder-gray-400"
                    id="images"
                    name="images"
                    type="file"
                    accept=".jpg,.png,.jpeg,.bmp"
                    multiple
                  />
                )}
                {!!data &&
                  data.images &&
                  data.images.split(",").map((image) => (
                    <div
                      onClick={() => {
                        //TODO: read file path from env or conf or window.localtion
                        window.open(
                          `${
                            config.nodeEnv === "development"
                              ? "http://localhost:3000"
                              : "https://murad-travel-journal.herokuapp.com"
                          }/uploads/${image}`
                        );
                      }}
                      key={image}
                      style={{
                        cursor: "pointer",
                        display: "inline-block",
                        width: "120px",
                        height: "120px",
                        backgroundImage: `url(${
                          config.nodeEnv === "development"
                            ? "http://localhost:3000"
                            : "https://murad-travel-journal.herokuapp.com"
                        }/uploads/${image})`,
                        backgroundSize: "cover",
                        backgroundPosition: "50% 50%",
                      }}
                    ></div>
                  ))}
              </div>
              {!data && (
                <button
                  onClick={() => {
                    onSubmit(logEntry);
                  }}
                  type="submit"
                  className="cursor-pointer w-full text-white focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-blue-600 hover:bg-blue-700 focus:ring-blue-800"
                >
                  Add Log Entry
                </button>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddModal;
