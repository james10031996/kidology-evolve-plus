
import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd';

interface LetterDragAreaProps {
  draggedLetters: string[];
  onDragEnd: (result: DropResult) => void;
}

const LetterDragArea = ({ draggedLetters, onDragEnd }: LetterDragAreaProps) => {
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="droppable" direction="horizontal">
        {(provided) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="flex space-x-3 p-4 bg-purple-100 rounded-xl border border-dashed border-purple-400 min-h-[80px] justify-center"
          >
            {draggedLetters.map((letter, index) => (
              <Draggable key={`${letter}-${index}`} draggableId={`${letter}-${index}`} index={index}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className="w-14 h-14 bg-gradient-to-br from-yellow-400 to-orange-500 text-white font-bold flex items-center justify-center rounded-lg shadow cursor-move hover:scale-105 transition"
                  >
                    {letter}
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default LetterDragArea;
