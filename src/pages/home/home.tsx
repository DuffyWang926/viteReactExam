import './home.css'
import Header from '@/components/Header/header'
import Folder from '@/components/Folder/folder'
import ExerciseList from '@/components/ExerciseList/exerciseList'
import Editor from '@/components/Editor/editor'
import ApiData from '@/components/ApiData/apiData'
import ComponentBox from '@/components/ComponentBox/componentBox'
import { useSelector, useDispatch } from 'react-redux';
import React, { useEffect, useState } from 'react';
import _ from 'lodash';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

function Home() {

  // 通过useDispatch 派发事件
  const dispatch = useDispatch();

  // 通过useSelector直接拿到store中定义的value
  const { counter } = useSelector((store: any) => store.about);
  // const { list, total } = useSelector((store: any) => store.article);


  useEffect(() => {
    // 监听 counter 变化
    console.log('useEffect',counter);
    // dispatch(getList({ currentPage: 2, pageSize: 10}) as unknown as AnyAction);
}, [])

  return (
    <div className='homePage'>
      <Header />
      <div className='homeContent'>
        < Folder />
        <DndProvider backend={HTML5Backend}>
          {/* <Box name="Glass" /> */}
          {/* <DropTarget /> */}
          < ExerciseList />
          <Editor />
          < ComponentBox /> 
        </DndProvider>
      </div>
      < ApiData />
    </div >
  )
}

export default Home
