import { createSlice } from '@reduxjs/toolkit';

export interface HomeState {
  isComponentList: boolean;
  title: string
}

const initialState: HomeState = {
  isComponentList:true,
  title: "redux toolkit pre"
};

// 创建一个 Slice
export const home = createSlice({
  // 命名空间
  name: 'home',

  // 初始化状态值
  initialState,

  // 定义 reducers 并生成关联的操作
  reducers: {
    changeIsComponentList(state, { payload }){
      console.log(payload);
      state.isComponentList = payload.counter;
    }
  },
});

// 导出 reducers 方法
export const { changeIsComponentList } = home.actions;

// 默认导出
export default home.reducer;