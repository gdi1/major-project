import { Droppable } from "react-beautiful-dnd";

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
const Drop = ({ id, type, ...props }) => {
  return (
    <Droppable droppableId={id} type={type}>
      {(provided) => {
        return (
          <div ref={provided.innerRef} {...provided.droppableProps} {...props}>
            {props.children}
            {provided.placeholder}
          </div>
        );
      }}
    </Droppable>
  );
};

export default Drop;
