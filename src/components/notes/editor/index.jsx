import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import './index.scss'
import { useState } from 'react';

function Editor(props) {
  const [time, setTime] = useState(null)

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

  return (
    <>
      <CKEditor
      editor={ClassicEditor}
      config={editorConfiguration}
      data={props.note.body}
    />
    </>
  )
}

export default Editor;