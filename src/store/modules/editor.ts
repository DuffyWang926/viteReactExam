import { createSlice } from '@reduxjs/toolkit';
import _ from 'lodash'
export interface contentType {
  name: string;
  location: number[];
  size:number[];
  content:string;
  id:string;

}

export interface editorState {
  id: string;
  contentList: contentType[];
  contentWidth:number;
  editorLeft:number;
  editorTop:number;
  tempComponent:contentType;

}

const initialState: editorState = {
  id: '0',
  contentList: [],
  contentWidth:0,
  editorLeft:0,
  editorTop:0,
  tempComponent:{
    name: '',
    location: [ 0, 0],
    size:[ 0, 0],
    content:'',
    id:'',
  },
};

// 创建一个 Slice
export const editor = createSlice({
  // 命名空间
  name: 'editor',

  // 初始化状态值
  initialState,

  // 定义 reducers 并生成关联的操作
  reducers: {
    updateContentList(state, { payload}){
      console.log('updateContentList', payload)
      const { id } = payload

      let initContentList = _.cloneDeep(state.contentList) 
      let newList: contentType[] = [];
      if(id){
        newList = initContentList.map( (v:contentType,i) =>{
          let res = v
          if(v.id == id){
            if( payload ){
              // let keyList = Object.keys(payload)
              let keyList = Object.keys(v)
              keyList.map( (item) =>{
                if(payload[item]){
                  v[item as keyof typeof v]  = payload[item]

                }
              })
            }
            const res = v
            console.log('v',v)
            console.log('res',res)
          }
          return res
        })
        state.contentList = newList;

      }else{
        let length = initContentList.length
        let nextId = length + 1 + ''
        payload.id = nextId
        initContentList.push(payload)
        state.contentList = initContentList;
      }
      
    },
    updateState(state, { payload}){
      // const [ 
      //   contentWidth,
      //   editorLeft,
      //   editorTop,
      // ] = payload
      state.contentWidth = payload.contentWidth
      state.editorLeft = payload.editorLeft
      state.editorTop = payload.editorTop
      
    },
    updateTempComponent(state, { payload}){
      console.log('updateTempComponent', payload)
      state.tempComponent = payload
    },
    
  },
});

// 导出 reducers 方法
export const { updateContentList, updateState, updateTempComponent } = editor.actions;

// 默认导出
export default editor.reducer;