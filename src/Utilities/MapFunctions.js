export const calculateBezierCurve = (startpoint, endpoint) => {
  const offsetX = endpoint[1] - startpoint[1],
    offsetY = endpoint[0] - startpoint[0];

  const r = Math.sqrt(Math.pow(offsetX, 2) + Math.pow(offsetY, 2)),
    theta = Math.atan2(offsetY, offsetX);

  const thetaOffset = 3.14 / 10;

  const r2 = r / 2 / Math.cos(thetaOffset),
    theta2 = theta + thetaOffset;

  const midpointX = r2 * Math.cos(theta2) + startpoint[1],
    midpointY = r2 * Math.sin(theta2) + startpoint[0];

  const midpointLatLng = [midpointY, midpointX];

  return [startpoint, midpointLatLng, endpoint];
};

export const formatJourneyCurvesEnds = (selectedTeamJourney) => {
  const bezierCurvesEnds = [];
  for (let i = 0; i < selectedTeamJourney.length - 1; i++) {
    bezierCurvesEnds.push({
      startpoint: selectedTeamJourney[i].coordinates,
      endpoint: selectedTeamJourney[i + 1].coordinates,
    });
  }
  return bezierCurvesEnds;
};

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
      games: [],
    };

  for (let i = 0; i < selectedTeamJourney.length; i++) {
    markers[selectedTeamJourney[i].coordinates].games.push(i + 1);
  }
  return Object.values(markers);
};
