import L from "leaflet";

const extractUniquePointsCoordinates = (selectedTeamJourney) => {
  const coordinates = selectedTeamJourney.map(({ coordinates }) => coordinates);

  const uniqueCoordinatesSet = new Set(
    coordinates.map((coord) => JSON.stringify(coord))
  );
  const uniqueCoordinates = Array.from(uniqueCoordinatesSet).map((coord) =>
    JSON.parse(coord)
  );
  return uniqueCoordinates;
};

export const calculateCenterCoordinates = (selectedTeamJourney) => {
  if (!selectedTeamJourney || selectedTeamJourney.length === 0) {
    return null;
  }
  const uniqueCoordinates = extractUniquePointsCoordinates(selectedTeamJourney);
  const sumCoordinates = uniqueCoordinates.reduce(
    (accumulator, coord) => {
      return [accumulator[0] + coord[0], accumulator[1] + coord[1]];
    },
    [0, 0]
  );
  return [
    sumCoordinates[0] / uniqueCoordinates.length,
    sumCoordinates[1] / uniqueCoordinates.length,
  ];
};

export const formatMarkers = (selectedTeamJourney) => {
  const markersCoordinates =
    extractUniquePointsCoordinates(selectedTeamJourney);
  const markers = {};
  for (let i = 0; i < markersCoordinates.length; i++)
    markers[markersCoordinates[i]] = {
      coordinates: markersCoordinates[i],
      label: undefined,
      games: [],
    };

  for (let i = 0; i < selectedTeamJourney.length; i++) {
    const { coordinates, label } = selectedTeamJourney[i];
    markers[coordinates].games.push(i + 1);
    if (!markers[coordinates].label) markers[coordinates].label = label;
  }
  return Object.values(markers);
};

export const getCoordinatesOfLocations = (selectedTeamJourney) => {
  return selectedTeamJourney.map(({ coordinates }) => coordinates);
};

export const filterConsecutiveSameLocations = (locations) => {
  const filteredLocations = [{ coordinates: locations[0] }];
  let cnt = 1;
  for (let i = 1; i < locations.length; i++) {
    if (
      locations[i][0] === locations[i - 1][0] &&
      locations[i][1] === locations[i - 1][1]
    ) {
      cnt += 1;
      continue;
    }
    filteredLocations[filteredLocations.length - 1].cnt = cnt;
    cnt = 1;
    filteredLocations.push({ coordinates: locations[i] });
  }
  filteredLocations[filteredLocations.length - 1].cnt = cnt;
  return filteredLocations;
};

/**
 * References
 *
 * “React Leaflet.” React Leaflet, n.d. https://react-leaflet.js.org/.
 */
const calculatedDistances = (coordinates) => {
  const distances = [];
  for (let i = 0; i < coordinates.length - 1; i++) {
    const p1 = L.latLng(coordinates[i][0], coordinates[i][1]);
    const p2 = L.latLng(coordinates[i + 1][0], coordinates[i + 1][1]);
    distances.push(p1.distanceTo(p2));
  }
  return distances;
};

export const calculateDurations = (selectedTeamJourney, speed) => {
  const coordinates = filterConsecutiveSameLocations(
    getCoordinatesOfLocations(selectedTeamJourney)
  ).map(({ coordinates }) => coordinates);
  const distances = calculatedDistances(coordinates);
  const minDist = Math.min(...distances);

  const weightedDistances = distances.map((d) =>
    Math.min((d / minDist) * speed, 5000)
  );
  return weightedDistances;
};
