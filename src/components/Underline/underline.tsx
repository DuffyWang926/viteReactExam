import './underline.css'
interface UnderlineProps {
  content?: string;
  id?: string;
  size?:number[];
}
const Underline: React.FC<UnderlineProps> = ({ content, id, size }) => {
  console.log('size', size)
  if(!content){
    content = '下划线'
  }
  let width = 100
  let height = 25
  if(size && size.length > 1){
    width = size[0]
    height = size[1]
  }

  return (
    <div className='Underline' key={id} style={{width,height}}>
      {content}
    </div>
  )
}
export default Underline