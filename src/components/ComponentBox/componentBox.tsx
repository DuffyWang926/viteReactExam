import './componentBox.css'
import ComponentList from '@/components/ComponentList/componentList'
import ComponentEditor from '@/components/ComponentEditor/componentEditor'
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';

function ComponentBox() {
  const { isComponentList } = useSelector((store: any) => store.home);
  const {  tempComponent } = useSelector((store: any) => store.editor);
  console.log('tempComponent')
  // useEffect

  return (
    <div className='componentBox'>
      {
        isComponentList ? < ComponentList/> : < ComponentEditor item={tempComponent}/>
      }

    </div>
  )
}
export default ComponentBox