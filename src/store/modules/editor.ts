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

}

const initialState: editorState = {
  id: '0',
  contentList: [],
  contentWidth:0,
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
      const { id } = payload

      let initContentList = _.cloneDeep(state.contentList) 
      let newList: contentType[] = [];
      if(id){
        newList = initContentList.map( (v,i) =>{
          let res = v
          if(v.id == id){
            res = payload
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
      
      state = { ...state, ...payload}
      
    },
  },
});

// 导出 reducers 方法
export const { updateContentList, updateState } = editor.actions;

// 默认导出
export default editor.reducer;