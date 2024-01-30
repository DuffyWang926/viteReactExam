import { useDrag, DragSourceMonitor } from 'react-dnd';
import { useRef } from 'react';
// 定义你的拖动项目类型
interface BoxProps {
  name: string;
}
// 定义你的拖动项目类型
interface BoxItem {
  type: string;
  name: string;
  ref:any;
}

// 定义 Drop result 类型
interface DropResult {
  name: string;
}

export const Box: React.FC<BoxProps> = ({ name }) => {
  const ref = useRef(null);
  const [{ isDragging }, drag] = useDrag<BoxItem, DropResult, { isDragging: boolean }>({
    type: 'box', // 直接在这里给出类型
    item: { name, type: 'box', ref },
    end: (item: BoxItem | undefined, monitor: DragSourceMonitor) => {
      const dropResult = monitor.getDropResult();
      
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  drag(ref);

  return (
    // <div ref={drag}>
    <div  ref={ref}>
      {name}{isDragging}123
    </div>
  );
}




