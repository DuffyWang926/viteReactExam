import './folder.css'
interface FolderProps {
  apiList:number[];
}
const Folder: React.FC<FolderProps> = (props) => {

  return (
      <div className='folder'>Folder</div>
  )
}
export default Folder