import './editorBox.css'
import { useDrag, DragSourceMonitor } from 'react-dnd';
import { useRef } from 'react';
import Underline from '@/components/Underline/underline'


export interface EditorBoxProps {
  id: string;
  name: string;
  content: string;
  location:number[];
  size:number[];
}

// 定义你的拖动项目类型
interface BoxItem {
  type: string;
  id: string;
  name: string;
  
  ref:any;
}

// 定义 Drop result 类型
interface DropResult {
  id: string;
}

export const EditorBox: React.FC<EditorBoxProps> = ({ name,id,content,location,size }) => {
  const ref = useRef(null);
  let node = null
  if(name === 'underline'){
    node = Underline({content:content, id, size})
  }
  debugger
  let styleTop = '0px'
  let styleLeft = '0px'
  if(location && location.length > 1){
    styleLeft = location[0] + 'px'
    styleTop = location[1] + 'px'
  }
  let width = 100
  let height = 25
  if(size && size.length > 1){
    width = size[0]
    height = size[1]
  }

  const [{ isDragging }, drag] = useDrag<BoxItem, DropResult, { isDragging: boolean }>({
    type: 'box', // 直接在这里给出类型
    item: { name, id, type: 'box', ref },
    end: (item: BoxItem | undefined, monitor: DragSourceMonitor) => {
      const dropResult = monitor.getDropResult();
      
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  drag(ref);

  return (
    <div className='editorWrapper' style={{top:styleTop, left:styleLeft}}>
      <div  className='editorBox' ref={ref} key={id}  >
        {node}
        
      </div>
      <div className='changeBox'  >
        <div className='changeTop'  style={{width, height:0}}>
        </div>
        <div className='changeFoot'  style={{width, height:0,top:height}}>
        </div>
        <div className='changeLeft'  style={{width:0, height}}>
        </div>
        <div className='changeRight'  style={{width:0, height}}>
        </div>
          
      </div>
    </div>
  );
}

export default EditorBox