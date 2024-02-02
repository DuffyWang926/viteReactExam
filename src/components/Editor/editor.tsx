import './editor.css'

import { useDrop, DropTargetMonitor } from 'react-dnd';
import React, { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { contentType } from '@/store/modules/editor';
import { updateContentList, updateState } from "@/store/modules/editor";
import EditorBox from '@/components/EditorBox/editorBox'
import { EditorBoxProps } from '@/components/EditorBox/editorBox'

type DropItem = { 
  type: string;
  name: string;
  id: string;
  ref:any;
 };

const Editor: React.FC = () => {
  const ref = React.useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();
  const { contentList } = useSelector((store: any) => store.editor);

  const [{ canDrop, isOver }, drop] = useDrop({
    accept: 'box',
    drop: (item: DropItem, monitor: DropTargetMonitor) => {
      const dropTargetElement = item.ref.current;
      const targetOffset = monitor.getSourceClientOffset();
      const targetNode = ref.current

      if (dropTargetElement && targetNode && targetOffset  ) {
        const { width, height } = dropTargetElement.getBoundingClientRect();
        let targetPostion = targetNode.getBoundingClientRect()
        let positionX = targetOffset.x - targetPostion.left
        let positionY = targetOffset.y - targetPostion.top
        let temp = {
          name:item.name,
          id:item.id,
          location:[positionX, positionY],
          size:[width, height],
          content:'',
        }
        dispatch(updateContentList(temp) );
        

      }
      return { name: 'DropTarget', type: 'box' };
    },
    collect: (monitor: DropTargetMonitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop()
    })
  })
  useEffect(() => {
      const dropTargetElement = ref.current;
      if( dropTargetElement){
        let targetPostion = dropTargetElement.getBoundingClientRect()
        const { width, height } = targetPostion
        console.log(`editor Element width: ${width}, height: ${height}`);
        dispatch(updateState({ contentWidth:width, editorLeft:targetPostion.left, editorTop:targetPostion.top}) );
      }
  }, [])

  let backgroundColor = '#333'
  if (canDrop) backgroundColor = '#3db897'
  if (isOver) backgroundColor = '#ff0'

  console.log('contentList', contentList)
  const editorContent = Array.isArray(contentList) && contentList.map( (v,i)=>{
    let res = getNode(v)

    return res

  })

  function getNode( item:contentType){
    let res = null
    
    let editorBoxProps:EditorBoxProps = {
      name: item.name,
      id: item.id,
      content: item.content,
      location:item.location,
      size:item.size,
    };
    if(item.id){
      res = < EditorBox {...editorBoxProps} key={item.id}/> 
    }
    
    return res
  }
  drop(ref)

  return (
    <div ref={ref} className='editor' style={{borderColor: backgroundColor }} >
      { editorContent }
    </div>
  )
}

export default Editor