import React from "react";
import { useDrag, useDrop } from "react-dnd";
import styles from '../../styles/components/ProjectsAndTasks/projectsAndTasks.module.css';
import type { Identifier } from 'dnd-core'

interface DragItem {
  index: number
  id: string
  type: string
}

const DraggableCard = (
  { id, name, index, cardType, moveCard }: 
  {id: string; name: string; index: number; cardType: string; moveCard: (dragIndex: number, hoverIndex: number) => void;}
) => {

  const ref = React.useRef(null);

  const [{ handlerId }, drop] = useDrop<
    DragItem,
    void,
    { handlerId: Identifier | null }
  >({
    accept: cardType,
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      }
    },
    hover(item: DragItem, monitor) {
      if (!ref.current) {
        return
      }
      const dragIndex = item.index
      const hoverIndex = index

      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return
      }

      if (!ref.current) return;

      moveCard(dragIndex, hoverIndex)

      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      item.index = hoverIndex
    },
  })

  const [{ isDragging }, drag] = useDrag({
    type: cardType,
    item: () => {
      return { id, index }
    },
    collect: (monitor: any) => ({
      isDragging: monitor.isDragging(),
    }),
  })

  const opacity = isDragging ? 0 : 1;
  drag(drop(ref));

  return (
    <li ref={ref} className={styles.allTeamsTeamCardContainer} style={{ opacity }} data-handler-id={handlerId}>
      {name}
    </li>
  );
};

export default DraggableCard;