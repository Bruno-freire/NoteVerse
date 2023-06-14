import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import './index.scss'
import { useEffect, useState } from 'react';

function Editor(props) {
  const [currentContent, setCurrentContent] = useState('');
  const [timer, setTimer] = useState(null);

  useEffect(() => {
    if (props.note.body !== currentContent) {
      setCurrentContent(props.note.body);
    }
  }, [props.note.body]);
  

  const handleEditorChange = (event, editor) => {
    const content = editor.getData();
    setCurrentContent(content);
  };

  const editorConfiguration = {
    toolbar: [
      'heading',
      '|',
      'bold',
      'italic',
      'link',
      'bulletedList',
      'numberedList',
      'blockQuote',
      'undo',
      'redo'
    ], contentStyle: {
      color: 'black',
    },
  };
  const handleKeyDown = (event) => {
    if(!props.note){
      event.preventDefault()
    }
  }

  return (
    <div onKeyDown={handleKeyDown}>
      <CKEditor
      editor={ClassicEditor}
      config={editorConfiguration}
      data={currentContent}
      onChange={handleEditorChange}
    />
    </div>
      
    
  )
}

export default Editor;