import './componentEditor.css'
import React, { useState } from 'react';
import { contentType, updateContentList } from '@/store/modules/editor';
import { useSelector, useDispatch } from 'react-redux';
export interface ComponentEditorProps {
  item: contentType;
  
}
type FormState = {
  content: string,
};
const ComponentEditor: React.FC<ComponentEditorProps> = ({item}) => {
  console.log('ComponentEditor', item)
  const dispatch = useDispatch();


  const [formState, setFormState] = useState<FormState>({ content: '' });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormState({
      ...formState,
      [event.target.name]: event.target.value,
    });
    dispatch(updateContentList({id:item.id,content:event.target.value}) )


  };

  const validateForm = () => {
    return formState.content.length > 0
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (validateForm()) {
      console.log('Here is your form state:', formState);
    } else {
      console.log('Invalid input.');
    }
  };

  return (
      <div className='componentEditor'>
        <form onSubmit={handleSubmit}>
          <div>
            <label>内容:</label>
            <input 
              type="content"
              name="content"
              onChange={handleInputChange}
              value={formState.content}
            />
            
          </div>
        </form>
      </div>
  )
}
export default ComponentEditor