import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import React, { useEffect, useState } from "react";
import { RadioBrowserApi } from "radio-browser-api";
import DefaultImg from "../radio.jpg";
// import 'react-h5-audio-player/lib/styles.less' Use LESS
// import 'react-h5-audio-player/src/styles.scss' Use SASS

const Player = () => {
  const filters = [
    "all",
    "classical",
    "country",
    "dance",
    "disco",
    "house",
    "jazz",
    "pop",
    "rap",
    "retro",
    "rock",
  ];

  const [stations, setStations] = useState();
  const [stationFilter, setStationFilter] = useState("all");

  useEffect(() => {
    setupApi(stationFilter).then((data) => setStations(data));
  }, [stationFilter]);

  const setupApi = async (stationFilter) => {
    const api = new RadioBrowserApi(fetch.bind(window), "My Radio App");

    const stations = await api.searchStations({
      countryCode: "BG",
      limit: 30,
      offset: 0,
      order: "votes",
      reverse: true,
      language: ["bulgarian"],
    });

    return stations;
  };
  const setDefoultSrc = (event) => {
    event.target.src = DefaultImg;
  };
  console.log(stations);

  return (
    <div className="radio">
      <div className="filters">
        {filters.map((filter) => {
          return (
            <span
              className={stationFilter === filter ? "selected" : ""}
              onClick={() => setStationFilter(filter)}
            >
              {filter}
            </span>
          );
        })}
      </div>
      <div className="stations">
        {stations &&
          stations.map((station, index) => {
            return (
              <div className="station" key={index}>
                <div className="stationName">
                  <img
                    src={station.favicon}
                    alt="station logo"
                    className="logo"
                    onError={setDefoultSrc}
                  />
                  <div className="name">{station.name}</div>
                </div>
                <AudioPlayer
                  className="player"
                  src={station.urlResolved}
                  showJumpControls={false}
                  layout="stacked"
                  customProgressBarSection={[]}
                  customControlsSection={["MAIN_CONTROLS", "VOLUME_CONTROLS"]}
                  autoPlayAfterSrcChange={false}
                />
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Player;
