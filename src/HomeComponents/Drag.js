import { Draggable } from "react-beautiful-dnd";

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
