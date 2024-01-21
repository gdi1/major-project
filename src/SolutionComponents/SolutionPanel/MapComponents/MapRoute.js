import L from "leaflet";
import { createControlComponent } from "@react-leaflet/core";
import "leaflet-routing-machine";
import markerIconPng from "leaflet/dist/images/marker-icon.png";
import { Icon } from "leaflet";
import "leaflet/dist/leaflet.css";

const shadowUrl =
  "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.4/images/marker-shadow.png";
const startIconUrl =
  "https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png";
const endIconUrl =
  "https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png";
const middleIconUrl =
  "https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-yellow.png";

const countOverlappingWaypoints = (waypoints, index, v) => {
  return waypoints.slice(0, index).reduce((count, waypoint) => {
    return count + (waypoint.value === v ? 1 : 0);
  }, 0);
};

const isOverlappingWaypoint = (waypoints, i, v) => {
  return waypoints.slice(0, i).some((waypoint) => waypoint.value === v);
};

const formatWaypoints = (waypoints) => {
  const formattedWaypoints = [];
  const offset = 0.00003; // 0.00001 0.00002
  for (let i = 0; i < waypoints.length - 1; i++) {
    const c = countOverlappingWaypoints(waypoints, i, waypoints[i].value);
    console.log(c);
    formattedWaypoints.push(
      L.latLng(
        waypoints[i].coordinates[0] + offset * c,
        waypoints[i].coordinates[1] + offset * c
      )
    );
  }

  const addOffset = isOverlappingWaypoint(
    waypoints,
    waypoints.length - 1,
    waypoints[waypoints.length - 1].value
  );
  formattedWaypoints.push(
    L.latLng(
      waypoints[waypoints.length - 1].coordinates[0] - offset * addOffset,
      waypoints[waypoints.length - 1].coordinates[1] - offset * addOffset
    )
  );
  console.log(formattedWaypoints);
  return formattedWaypoints;
};

const MapRouteLayer = ({ waypoints }) => {
  const createCustomMarker = (i, { latLng }, nWps) => {
    const iconUrl =
      i === 0 ? startIconUrl : i === nWps - 1 ? endIconUrl : middleIconUrl;

    const customIcon = new Icon({
      iconUrl,
      shadowUrl,
      iconSize: [25, 41],
      iconAnchor: [12, 41],
    });

    const marker = L.marker(latLng, {
      icon: customIcon,
    });

    marker.bindPopup(`${waypoints[i].label}<br>Game: ${i + 1}`, {
      closeOnClick: false,
      autoClose: false,
    });
    if (i === 0 || i === nWps - 1)
      marker.on("add", (e) => {
        e.target.openPopup();
      });
    return marker;
  };
  const instance = L.Routing.control({
    waypoints: formatWaypoints(waypoints),
    lineOptions: {
      styles: [{ color: "blue", weight: 4 }],
    },
    show: false,
    addWaypoints: false,
    routeWhileDragging: true,
    draggableWaypoints: true,
    fitSelectedRoutes: true,
    showAlternatives: false,
    showInstructions: false,
    createMarker: createCustomMarker,
  });
  return instance;
};

const MapRoute = createControlComponent(MapRouteLayer);

export default MapRoute;
