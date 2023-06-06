import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import './index.scss'

function Editor(props) {

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
  const handleKeyDown = (e) => {
    console.log(e.key)
  }

  return (
    <div onKeyDown={handleKeyDown}>
      <CKEditor
      editor={ClassicEditor}
      config={editorConfiguration}
      data={props.note.body}
    />
    </div>
      
    
  )
}

export default Editor;