import './home.css'
import Header from '@/components/Header/header'
import { useSelector, useDispatch } from 'react-redux';
import { setCounter } from '@/store/modules/about';
import React, { useEffect, useState } from 'react';
function Home() {
  const [count, setCount] = useState(0)

  // 通过useDispatch 派发事件
  const dispatch = useDispatch();

  // 通过useSelector直接拿到store中定义的value
  const { counter } = useSelector((store: any) => store.about);

  const [value, setValue] = useState(counter);

  useEffect(() => {
    // 监听 counter 变化
    console.log(counter);
}, [counter])

  return (
    <>
      <Header />
      <div>
        <div>
            {counter}
        </div>
            <div>
                <div onClick={() => dispatch(setCounter({ counter: value * 2 }))}>保存</div>
            </div>
        
      </div>
    </>
  )
}

export default Home


