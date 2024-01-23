import { createSlice } from "@reduxjs/toolkit";

const operators = ["and", "or"];

const constraintFlowSlice = createSlice({
  name: "constraintsSlice",
  initialState: {
    selectedNode: undefined,
    type: "hard",
    name: undefined,
    mode: "new",
    nodes: [
      //   {
      //     id: "1",
      //     data: { label: "Root Node" },
      //     position: { x: -620.5, y: 34.5 },
      //     selected: true,
      //   },
      //   {
      //     id: "3",
      //     type: "output",
      //     data: { label: "Output Node" },
      //     position: { x: 250, y: 250 },
      //   },
      //   {
      //     id: "4",
      //     type: "ConstraintNode",
      //     position: { x: 300, y: 300 },
      //     data: {
      //       types: {
      //         teams: [],
      //         weeks: [],
      //         locations: [],
      //       },
      //     },
      //   },
    ],
    edges: [
      //   { id: "e1-2", source: "1", target: "4" },
      //   { id: "e2-3", source: "1", target: "3" },
    ],
  },
  reducers: {
    setName(state, action) {
      state.name = action.payload;
    },
    setType(state, action) {
      state.type = action.payload;
    },
    resetConstraintFlow(state, _) {
      state.name = undefined;
      state.type = "hard";
      state.edges = [];
      state.nodes = [];
    },
    removeOptionIds(state, action) {
      const toRemoveIds = action.payload;
      toRemoveIds.forEach((id) => delete state.selectedOptions[id]);
      console.log("bun");
    },
    addNewNode(state, action) {
      const type = action.payload;
      console.log("in here");
      let position = state.nodes.reduce(
        (acc, node) => ({
          x: acc.x + node.position.x,
          y: acc.y + node.position.y,
        }),
        { x: 0, y: 0 }
      );
      const n = state.nodes.length;
      if (n === 0) {
        const data = { types: {} };
        data.types[type] = type === "at-least" || type === "at-most" ? 0 : [];
        state.nodes.push({
          id: "1",
          type: "ConstraintNode",
          data,
          position,
          selected: true,
        });
        return;
      }

      position = { x: position.x / n, y: position.y / n };
      const id = String(parseInt(state.nodes[state.nodes.length - 1].id) + 1);

      const data = { types: {} };
      data.types[type] = type === "at-least" || type === "at-most" ? 0 : [];

      state.nodes.forEach((node) => (node.selected = false));
      state.nodes.push({
        id,
        type: "ConstraintNode",
        data,
        position,
        selected: true,
      });
    },
    setSelectedNode(state, action) {
      state.selectedNode = action.payload;
    },
    setNodes(state, action) {
      state.nodes = action.payload;
    },
    setEdges(state, action) {
      state.edges = action.payload;
    },
    addFlowBlock(state, action) {
      if (state.selectedNode === undefined) return;

      const type = action.payload;
      const idx = state.nodes.findIndex((n) => n.id === state.selectedNode);

      if (
        idx === -1 ||
        (!operators.includes(type) &&
          state.nodes[idx].data.types[type] !== undefined)
      )
        return;

      const types = Object.keys(state.nodes[idx].data.types);
      if (
        operators.includes(type) &&
        types.some((type) => !operators.includes(type))
      )
        return;

      if (types.includes("and") || types.includes("or")) {
        const node = state.nodes[idx];
        const position = { x: node.position.x, y: node.position.y + 300 };
        const id = String(parseInt(state.nodes[state.nodes.length - 1].id) + 1);
        const data = { types: {} };
        data.types[type] = [];

        state.nodes.forEach((node) => (node.selected = false));
        state.nodes.push({
          id,
          type: "ConstraintNode",
          data,
          position,
          selected: true,
        });
        state.edges.push({ id: `e${node.id}-id`, source: node.id, target: id });
        return;
      }

      const verbs = ["play", "not-play", "play-against", "not-play-against"];
      if (verbs.includes(type) && types.some((type) => verbs.includes(type)))
        return;

      state.nodes[idx].data.types[type] =
        type === "at-least" || type === "at-most" ? 0 : [];
    },
    removeFlowBlock(state, action) {
      if (state.selectedNode === undefined) return;

      const idx = state.nodes.findIndex((n) => n.id === state.selectedNode);
      if (idx === -1) return;

      delete state.nodes[idx].data.types[action.payload];

      const types = Object.keys(state.nodes[idx].data.types);
      if (types.length === 0) {
        state.edges = state.edges.filter(
          (edge) =>
            edge.source !== state.selectedNode &&
            edge.target !== state.selectedNode
        );
      }
    },
    updateOptions(state, action) {
      const { id, type, selectedOptions } = action.payload;
      const idx = state.nodes.findIndex((node) => node.id === id);
      state.nodes[idx].data.types[type] = selectedOptions;
    },

    setCurrentConstraint(state, action) {
      const { name, nodes, edges, type } = action.payload;
      state.name = name;
      state.nodes = nodes;
      state.edges = edges;
      state.type = type;
      state.mode = "edit";
    },

    setNewConstraint(state, action) {
      const { game, period, week } = action.payload;
      console.log("payload", game, period, week);
      state.nodes.push({
        id: "1",
        type: "ConstraintNode",
        position: { x: 0, y: 0 },
        data: {
          types: {
            teams: [game.teamA],
            "play-against": [game.teamB],
            weeks: [week],
            periods: [period],
          },
        },
        selected: true,
      });
    },
  },
});

export const constraintFlowActions = constraintFlowSlice.actions;

export default constraintFlowSlice;
