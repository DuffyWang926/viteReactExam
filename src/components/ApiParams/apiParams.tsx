import './ApiParams.css'
export interface ApiParamsProps {
  method:string;
  url:string;
  params:object;
}
const ApiParams: React.FC<ApiParamsProps> = (props) => {
  const { method, url, params} = props

  return (
      <div className='apiParams'>ApiParams{ method} </div>
  )
}
export default ApiParams