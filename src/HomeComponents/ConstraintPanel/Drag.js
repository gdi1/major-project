import { Draggable } from "react-beautiful-dnd";

/**
 *
 * References
 *
 * Codesandbox.io, n.d.
 * https://codesandbox.io/p/sandbox/react-beautiful-dnd-nested-example-forked-3o0i1i?file=%2Fsrc%2FNestedListComponent.js.
 *
 * “Simplifying Drag and Drop (Lists and Nested Lists).” Tania Rascia RSS, n.d.
 * https://www.taniarascia.com/simplifying-drag-and-drop/.
 */
const Drag = ({ id, index, ...props }) => {
  return (
    <Draggable draggableId={id} index={index}>
      {(provided, snapshot) => {
        return (
          <div ref={provided.innerRef} {...provided.draggableProps} {...props}>
            <div {...provided.dragHandleProps}>{props.children}</div>
          </div>
        );
      }}
    </Draggable>
  );
};

export default Drag;
