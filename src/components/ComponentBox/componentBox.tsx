import './componentBox.css'
import ComponentList from '@/components/ComponentList/componentList'
import ComponentEditor from '@/components/ComponentEditor/componentEditor'
function ComponentBox() {
  let isList = true

  return (
    <div className='componentBox'>
      {
        isList ? < ComponentList/> : < ComponentEditor />
      }

    </div>
  )
}
export default ComponentBox