import './apiData.css'

import { useDrop, DropTargetMonitor } from 'react-dnd';
import React, { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
// import { updateContentList, updateState } from "@/store/modules/editor";
import ApiList from '@/components/ApiList/apiList'
import { Tabs } from 'antd'
type DropItem = { 
  type: string;
  name: string;
  id: string;
  ref:any;
 };

const { TabPane } = Tabs;
const ApiData: React.FC = () => {
  const ref = React.useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();
  const pageId = 'p0'
  let pageList = [
    {
      pageId:'p0',
      name:'全部'
    }
  ]
  const onTabChange = () =>{

  }

  const tabPaneNode = pageList.map( (v) =>{
    let res = <TabPane tab={v.name} key={v.pageId}>
                Content of Tab Pane 1
              </TabPane>
    return res
  })

  let apiListProps = [
    {
      name:'1',
      apiParams:{
        method:'get',
        url:'https://www.baidu.com',
        params:{
          key:'1'
        }
      },
      response:{
      }
    },
    {
      name:'2',
      apiParams:{
        method:'post',
        url:'https://www.123.com',
        params:{
          key:'1'
        }
      },
      response:{
      }
    },
  ]

  return (
    <div className='apiData'>
      <div className='apiTitle'>
        api数据
      </div>
      <Tabs defaultActiveKey="1" onChange={onTabChange}>
        {/* { tabPaneNode } */}
      </Tabs>
      <div className='apiContent'>
        < ApiList apiList={apiListProps}/>
      </div>
      


    </div>
  )
}

export default ApiData