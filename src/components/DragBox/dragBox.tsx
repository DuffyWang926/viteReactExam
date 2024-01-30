import './dragBox.css'
import { useDrag, DragSourceMonitor } from 'react-dnd';
import { useRef } from 'react';


interface DragBoxProps {
  name: string;
  component: React.ReactNode;
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

export const DragBox: React.FC<DragBoxProps> = ({ name, component }) => {
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
    <div  className='dragBox' ref={ref}>
      {component}
    </div>
  );
}

export default DragBox