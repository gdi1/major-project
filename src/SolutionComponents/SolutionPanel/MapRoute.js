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

    marker.bindPopup(waypoints[i].label, {
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
    waypoints: waypoints.map((w) =>
      L.latLng(w.coordinates[0], w.coordinates[1])
    ),
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
