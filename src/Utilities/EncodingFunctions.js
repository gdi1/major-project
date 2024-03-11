// import { sortPeriodsPair } from "./PeriodsFunctions";

const operators = ["and", "or"];
const multi_select_blocks = [
  "teams",
  "locations",
  "periods",
  "weeks",
  "play-against",
  "not-play-against",
];

// const sortByLabels = (option1, option2) => {
//   return option1.label < option2.label ? -1 : 1;
// };

// const sortByCoordinates = (loc1, loc2) => {
//   if (loc1.coordinates[0] !== loc2.coordinates[0])
//     return loc1.coordinates[0] < loc2.coordinates[0] ? -1 : 1;
//   return loc1.coordinates[1] < loc2.coordinates[1] ? -1 : 1;
// };

export const encodeAllInternalData = (internalData) => {
  const { hardConstraints, softConstraints } = internalData;

  const teams = [...internalData.teams];
  const locations = [...internalData.locations];
  const periods = [...internalData.periods];
  const weeks = [...internalData.weeks];

  const teamsMap = {};
  const locationsMap = {};
  const periodsMap = {};
  const weeksMap = {};

  const inverseMaps = {
    teams: {},
    locations: {},
    periods: {},
    weeks: {},
    "play-against": {},
    "not-play-against": {},
  };

  // teams.sort(sortByLabels);
  // locations.sort(sortByCoordinates);
  // weeks.sort(sortByLabels);
  // periods.sort(sortPeriodsPair);

  teams.forEach((team, idx) => {
    teamsMap[idx + 1] = team;
    inverseMaps.teams[team.value] = idx + 1;
    inverseMaps["play-against"][team.value] = idx + 1;
    inverseMaps["not-play-against"][team.value] = idx + 1;
  });

  locations.forEach((location, idx) => {
    locationsMap[idx + 1] = location;
    inverseMaps.locations[location.value] = idx + 1;
  });
  weeks.forEach((week, idx) => {
    weeksMap[idx + 1] = week;
    inverseMaps.weeks[week.value] = idx + 1;
  });
  periods.forEach((period, idx) => {
    periodsMap[idx + 1] = period;
    inverseMaps.periods[period.value] = idx + 1;
  });

  const encodedAllInternalData = {
    teams: teams.map((_, idx) => idx + 1),
    locations: locations.map((_, idx) => idx + 1),
    weeks: weeks.map((_, idx) => idx + 1),
    periods: periods.map((_, idx) => idx + 1),
    constraints: [],
  };

  for (const { nodes, edges, name } of hardConstraints) {
    const formattedConstraint = formatConstraintTree(
      { nodes, edges, name },
      inverseMaps
    );
    encodedAllInternalData.constraints.push({
      name,
      type: "hard",
      constraint: formattedConstraint,
    });
  }

  for (const { nodes, edges, name } of softConstraints) {
    const formattedConstraint = formatConstraintTree(
      { nodes, edges, name },
      inverseMaps
    );
    encodedAllInternalData.constraints.push({
      name,
      type: "soft",
      constraint: formattedConstraint,
    });
  }

  return {
    encodedAllInternalData,
    teamsMap,
    locationsMap,
    weeksMap,
    periodsMap,
  };
};

const formatConstraintTree = ({ nodes, edges, name = "" }, inverseMaps) => {
  const nodeMap = createNodeMap(nodes);
  const adjMatrix = createAdjacencyMatrix(edges);
  const root = getRootNode(edges, nodes);
  const result = [];
  let bfs = [root];
  while (bfs.length > 0) {
    const temp = [];
    for (const nodeId of bfs) {
      result.push(
        formatConstraintNode(nodeMap[nodeId], adjMatrix, inverseMaps)
      );
      const children = adjMatrix[nodeId];
      if (children !== undefined)
        for (const child of children) temp.push(child);
    }
    bfs = temp;
  }
  result.reverse();
  return result;
};

const formatConstraintNode = (node, adjMatrix, inverseMaps) => {
  const { id, data } = node;
  const types = Object.keys(data.types);

  const isLeaf = types.every((type) => !operators.includes(type));
  const formattedNode = { id, type: isLeaf ? "leaf" : types[0] };

  if (isLeaf)
    for (const type of types) {
      if (multi_select_blocks.includes(type))
        formattedNode[type] = data.types[type].map(
          ({ value }) => inverseMaps[type][value]
        );
      else formattedNode[type] = data.types[type].map(({ value }) => value);
    }
  else {
    formattedNode.children = [];
    for (const child of adjMatrix[id]) {
      formattedNode.children.push(child);
    }
  }
  return formattedNode;
};

const getNodesIds = (nodes) => {
  return nodes.map(({ id }) => id);
};

const createNodeMap = (nodes) => {
  const result = {};
  nodes.forEach((node) => (result[node.id] = { ...node }));
  return result;
};

const createAdjacencyMatrix = (edges) => {
  const adjMatrix = {};
  for (const { source, target } of edges) {
    if (adjMatrix[source] === undefined) adjMatrix[source] = [];
    adjMatrix[source].push(target);
  }
  return adjMatrix;
};

const getRootNode = (edges, nodes) => {
  // const sources = [];
  const targets = [];
  const nodesIds = getNodesIds(nodes);
  for (const { source, target } of edges) {
    // sources.push(source);
    targets.push(target);
  }
  return nodesIds.filter((node) => !targets.includes(node))[0];
};

const compareNodes = (node1, node2) => {
  const types1 = Object.keys(node1.data.types);
  const types2 = Object.keys(node2.data.types);
  types1.sort();
  types2.sort();

  if (types1.length !== types2.length) return false;

  const n = types1.length;
  for (let i = 0; i < n; i++) {
    const type1 = types1[i];
    const type2 = types2[i];
    if (
      type1 !== type2 ||
      node1.data.types[type1].length !== node2.data.types[type2].length
    )
      return false;

    const labels1 = node1.data.types[type1].map(({ label }) => label);
    const labels2 = node2.data.types[type2].map(({ label }) => label);

    labels1.sort();
    labels2.sort();

    const m = labels1.length;
    for (let j = 0; j < m; j++) {
      if (labels1[j] !== labels2[j]) return false;
    }
  }
  return true;
};

const compareTrees = (
  { root1, adjMatrix1, nodeMap1 },
  { root2, adjMatrix2, nodeMap2 }
) => {
  if (!compareNodes(nodeMap1[root1], nodeMap2[root2])) return false;

  let children1 = undefined;
  let children2 = undefined;
  if (adjMatrix1[root1]) children1 = [...adjMatrix1[root1]];
  if (adjMatrix2[root2]) children2 = [...adjMatrix2[root2]];

  if (children1 === undefined && children2 === undefined) return true;
  else if (children1 === undefined || children2 === undefined) return false;

  if (children1.length !== children2.length) return false;

  for (const child1 of children1) {
    const child2Index = children2.findIndex((child2) =>
      compareTrees(
        { root1: child1, adjMatrix1, nodeMap1 },
        { root2: child2, adjMatrix2, nodeMap2 }
      )
    );
    if (child2Index === -1) return false;
    children2.splice(child2Index, 1);
  }
  return true;
};

const compareConstraints = (constraint1, constraint2) => {
  const nodeMap1 = createNodeMap(constraint1.nodes);
  const adjMatrix1 = createAdjacencyMatrix(constraint1.edges);
  const root1 = getRootNode(constraint1.edges, constraint1.nodes); // || constraint1.nodes[0].id;

  const nodeMap2 = createNodeMap(constraint2.nodes);
  const adjMatrix2 = createAdjacencyMatrix(constraint2.edges);
  const root2 = getRootNode(constraint2.edges, constraint2.nodes); // || constraint2.nodes[0].id;
  return compareTrees(
    { root1, adjMatrix1, nodeMap1 },
    { root2, adjMatrix2, nodeMap2 }
  );
};

const areConstraintListsTheSame = (constraintsList1, constraintsList2) => {
  const constraints1 = [...constraintsList1];
  const constraints2 = [...constraintsList2];

  if (constraints1.length !== constraints2.length) return false;

  for (const constraint1 of constraints1) {
    const constraintIndex2 = constraints2.findIndex((constraint2) =>
      compareConstraints(constraint1, constraint2)
    );
    if (constraintIndex2 === -1) return false;
    constraints2.splice(constraintIndex2, 1);
  }
  return true;
};

export const compareInternalDatas = (internalData, solutionInternalData) => {
  const teams = internalData.teams.map(({ label }) => label).sort();
  const locations = internalData.locations
    .map(({ coordinates }) => JSON.stringify(coordinates))
    .sort();
  const periods = internalData.periods.map(({ label }) => label).sort();
  const weeks = internalData.weeks.map(({ label }) => label).sort();

  const solutionTeams = solutionInternalData.teams
    .map(({ label }) => label)
    .sort();
  const solutionLocations = solutionInternalData.locations
    .map(({ coordinates }) => JSON.stringify(coordinates))
    .sort();
  const solutionPeriods = solutionInternalData.periods
    .map(({ label }) => label)
    .sort();
  const solutionWeeks = solutionInternalData.weeks
    .map(({ label }) => label)
    .sort();

  const areTeamsTheSame =
    teams.length === solutionTeams.length &&
    teams.every((team, idx) => team === solutionTeams[idx]);

  const areLocationsTheSame =
    locations.length === solutionLocations.length &&
    locations.every((location, idx) => location === solutionLocations[idx]);

  const arePeriodsTheSame =
    periods.length === solutionPeriods.length &&
    periods.every((period, idx) => period === solutionPeriods[idx]);

  const areWeeksTheSame =
    weeks.length === solutionWeeks.length &&
    weeks.every((week, idx) => week === solutionWeeks[idx]);

  if (
    !areTeamsTheSame ||
    !areLocationsTheSame ||
    !arePeriodsTheSame ||
    !areWeeksTheSame
  )
    return false;

  return (
    areConstraintListsTheSame(
      internalData.hardConstraints,
      solutionInternalData.hardConstraints
    ) &&
    areConstraintListsTheSame(
      internalData.softConstraints,
      solutionInternalData.softConstraints
    )
  );
};
