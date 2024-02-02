import './editorBox.css'
import { useDrag, DragSourceMonitor } from 'react-dnd';
import { useRef } from 'react';
import Underline from '@/components/Underline/underline'
import React, { useState, useEffect, MouseEvent } from 'react';
import { updateContentList, updateTempComponent} from "@/store/modules/editor";
import { changeIsComponentList } from "@/store/modules/home";
import { useSelector, useDispatch } from 'react-redux';
interface Dimensions {
  width: number;
  height: number;
}

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

export const EditorBox: React.FC<EditorBoxProps> = (props) => {
  const { name,id,content,location,size } = props
  console.log('{ name,id,content,location,size }',{ name,id,content,location,size })
  const [dimensions, setDimensions] = useState<number[]>([0,0]);
  const [position, setPosition] = useState<number[]>([0,0]);
  const [initLocation, setInitLocation] = useState<number[]>([0,0]);
  const [isDraggingBorder, setIsDraggingBorder] = useState(false);
  const [node, setNode] = useState<React.ReactNode>();
  const [type, setType] = useState(0);
  const [isShowChange, setIsShowChange] = useState(false);

  const ref = useRef(null);
  const dispatch = useDispatch();

  useEffect(() => {
    if(size && size.length > 1){
      let width = size[0]
      let height = size[1]
      setDimensions([ width,height]);
    }
    if(location && location.length > 1){
      let styleLeft = location[0]
      let styleTop = location[1]
      setPosition([styleLeft,styleTop])
    }
  }, [location,size])

  useEffect(() => {
    if(name === 'underline'){
      let temp = Underline({content:content, id, size:dimensions})
      setNode(temp)
    }
  }, [dimensions])
  useEffect(() => {
    window.addEventListener('mousemove', globalMouseMove);
    window.addEventListener('mouseup', globalMouseUp);
    return () => {
      window.removeEventListener('mousemove', globalMouseMove);
      window.removeEventListener('mouseup', globalMouseUp);
    };
  }, [isDraggingBorder, type, position, dimensions]);

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

  const handleMouseDown = (event: MouseEvent, type:number) => {
    setInitLocation([event.clientX,event.clientY]);
    setType(type)
    setIsDraggingBorder(true);
  };

  const globalMouseUp = (event: globalThis.MouseEvent) => {
    // console.log('globalMouseUp', event)
    console.log('globalMouseUp', position, dimensions)
    dispatch(updateContentList({id, location:position, size:dimensions}))
    setIsDraggingBorder(false);
  };

  const globalMouseMove = (event: globalThis.MouseEvent)=>{
    let positionX = initLocation[0]
    let positionY = initLocation[1]
    if (!isDraggingBorder) return;
    
    // console.log('globalMouseMove event.clientY',event.clientX, event.clientY, )
    // console.log('globalMouseMove event.clientY',clientX, clientY, )
    // console.log('globalMouseMove initLocation',initLocation )
    // console.log('globalMouseMove position',position )
    if(type == 0){
      let moveY = positionY - event.clientY
      let nextHeight = parseFloat((moveY + size[1]).toFixed(2))
      if(nextHeight < 0){
        nextHeight = 0
      }else{
        setPosition([location[0], location[1] - moveY])
      }
      setDimensions([ dimensions[0],nextHeight]);
    }else if(type == 1){
      let nextWidth =  parseFloat((event.clientX - positionX + size[0]).toFixed(2))
      if(nextWidth < 0){
        nextWidth = 0
      }
      setDimensions([ nextWidth,dimensions[1]]);

    }else if( type == 2){
      let nextHeight = parseFloat((event.clientY - positionY  + size[1]).toFixed(2))
      if(nextHeight < 0){
        nextHeight = 0
      }
      setDimensions([ dimensions[0],nextHeight]);
    }else if( type == 3){
      let moveX = positionX - event.clientX 
      let nextWidth = parseFloat((moveX + size[0]).toFixed(2)) 
      if(nextWidth < 0){
        nextWidth = 0
      }else{
        setPosition([location[0] - moveX, location[1]])
      }
      setDimensions([ nextWidth,dimensions[1]]);
    }
  };
  
  const onBoxEnter = () => {
    setIsShowChange(true)
  };

  const onMouseLeave = () => {
    setIsShowChange(false)
  };

  const onBoxClick = () => {
    dispatch(changeIsComponentList(false))
    dispatch(updateTempComponent(props))
    
  };
  
  

  let leftStyle = position[0] + 'px'
  let topStyle = position[1] + 'px'

  return (
    <div className='editorWrapper' style={{left:leftStyle,top:topStyle }} onClick={onBoxClick} onMouseEnter={onBoxEnter} onMouseLeave={onMouseLeave}  >
      <div  className='editorBox' ref={ref} key={id}  >
        {node}
      </div>
      {
        isShowChange &&
        <div className='changeBox'>
          <div className='changeTop'  style={{width: dimensions[0], height:0}} onMouseDown={(e) => handleMouseDown(e,0)} >
          </div>
          <div className='changeRight'  style={{width:0, height:dimensions[1]}} onMouseDown={(e) => handleMouseDown(e,1)}>
          </div>
          <div className='changeFoot'  style={{width:dimensions[0], height:0,top:(dimensions[1] - 5)}} onMouseDown={(e) => handleMouseDown(e,2)}>
          </div>
          <div className='changeLeft'  style={{width:0, height:dimensions[1]}} onMouseDown={(e) => handleMouseDown(e,3)}>
          </div>
        </div>
      }
      
    </div>
  );
}

export default EditorBox