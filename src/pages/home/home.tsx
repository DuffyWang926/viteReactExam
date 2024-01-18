import './home.css'
import Header from '@/components/Header/header'
import { useSelector, useDispatch } from 'react-redux';
import { setCounter } from '@/store/modules/about';
import React, { useEffect, useState } from 'react';
import { getList } from "@/store/modules/article";
import _ from 'lodash';
import type { AnyAction } from "@reduxjs/toolkit";
function Home() {

  // 通过useDispatch 派发事件
  const dispatch = useDispatch();

  // 通过useSelector直接拿到store中定义的value
  const { counter } = useSelector((store: any) => store.about);
  const { list, total } = useSelector((store: any) => store.article);


  useEffect(() => {
    // 监听 counter 变化
    console.log(counter);
    dispatch(getList({ currentPage: 2, pageSize: 10}) as unknown as AnyAction);
}, [])

  return (
    <>
      <Header />
      <div>
        <div>
            {counter}
        </div>
        <div>
            {list}{total}
        </div>
            <div>
                <div onClick={() => dispatch(setCounter({ counter: (counter + 1) * 2 }))}>保存</div>
            </div>
        
      </div>
    </>
  )
}

export default Home


