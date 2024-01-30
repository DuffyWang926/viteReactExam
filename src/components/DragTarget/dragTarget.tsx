import { useDrop, DropTargetMonitor } from 'react-dnd';
import React, { useEffect, useState } from 'react';
type DropItem = { type: string;
  name: string;
  ref:any;
 };

export const DropTarget: React.FC = () => {
  
  const [ content, setContent ] = useState('Drop zone')
  const [{ canDrop, isOver }, drop] = useDrop({
    accept: 'box',
    // drop: () => ({ name: 'DropTarget' } as DropItem),
    drop: (item: DropItem, monitor: DropTargetMonitor) => {
      const dropTargetElement = item.ref.current;
      console.log(`dropTargetElement `, dropTargetElement);
      if (dropTargetElement) {
        const { width, height } = dropTargetElement.getBoundingClientRect();
        console.log(`Element width: ${width}, height: ${height}`);
      }
      const clientOffset = monitor.getClientOffset();
      
      if (clientOffset) {
        console.log(`Dropped at x:${clientOffset.x}, y:${clientOffset.y}`);
      }
      // 你可以获得被拖动元件的数据
      console.log(`Item name: ${item.name}`);
      setContent(item.name)
      return { name: 'DropTarget', type: 'box' };
    },
    collect: (monitor: DropTargetMonitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop()
    })
  })
  useEffect(() => {
    // 监听 counter 变化
    console.log('useEffect canDrop',canDrop);
    // dispatch(getList({ currentPage: 2, pageSize: 10}) as unknown as AnyAction);
}, [canDrop])

  let backgroundColor = '#fff'
  if (canDrop) backgroundColor = '#3db897'
  if (isOver) backgroundColor = '#4bd85a'

  return (
    <div ref={drop} style={{ backgroundColor }}>
      { content }
    </div>
  )
}