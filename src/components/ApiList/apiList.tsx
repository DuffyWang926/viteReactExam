import './apiList.css'
import React, { useState, useMemo, useEffect, } from 'react';
import ApiParams from '@/components/ApiParams/ApiParams'
import { ApiParamsProps } from '@/components/ApiParams/ApiParams'
interface apiType{
  name:string;
  apiParams:ApiParamsProps;
  response:object;
}

interface EditorBoxProps {
  apiList:apiType[];
}
const ApiList: React.FC<EditorBoxProps> = (props) => {
  const [current, setCurrent] = useState('');
  const [currentApi, setCurrentApi] = useState<ApiParamsProps>({
    method:'',
    url:'',
    params:{}
  });
  const { apiList } = props

  const onItemClick = (v:apiType) =>{
    console.log('onItemClick', v)
    setCurrent(v.name)
    setCurrentApi(v.apiParams)
  }

  const itemList = useMemo(() => {
    return apiList.map((v, i) => {
      let classStyle = 'apiItem';
      if (current) {
        if (v.name === current) {
          classStyle += ' apiItemActive';
        }
      } else {
        if (i === 0) {
          classStyle += ' apiItemActive';
          setCurrent(v.name)
          setCurrentApi(v.apiParams)

        }
      }
  
      const res = (
        <div
          key={v.name} // 需要提供一个唯一的 key
          className={classStyle}
          onClick={() => onItemClick(v)}
        >
          {v.name}
        </div>
      );
      return res;
    });
  }, [apiList, current, onItemClick]);

  

  return (
      <div className='apiList'>
        <div className='itemList'>
          { itemList }
        </div>
        <div className='itemParams'>
          <ApiParams {...currentApi}/>
        </div>
        <div className='itemResponse'>
        itemResponse
        </div>
      </div>
  )
}
export default ApiList