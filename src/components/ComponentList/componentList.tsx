import './componentList.css'
import Underline from '@/components/Underline/underline'
import DragBox from '@/components/DragBox/dragBox'

function ComponentList() {
  let node = Underline({})

  return (
      <div className='componentList'>
        < DragBox name='underline' component={node} />
      </div>
  )
}
export default ComponentList