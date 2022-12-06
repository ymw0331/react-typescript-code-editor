import './code-editor.css'
import { useRef } from 'react'
import ManacoEditor, { EditorDidMount, monaco } from '@monaco-editor/react';
import prettier from 'prettier';
import parser from 'prettier/parser-babel'
import codeShift from 'jscodeshift';
import Highlighter from 'monaco-jsx-highlighter';


interface CodeEditorProps {
  initialValue: string;
  onChange(value: string): void
}

const CodeEditor: React.FC<CodeEditorProps> = ({ onChange, initialValue }) => {
  const editorRef = useRef<any>()

  const onEditorDidMount: EditorDidMount = (getValue, monacoEditor) => {
    editorRef.current = monacoEditor
    monacoEditor.onDidChangeModelContent(() => {
      onChange(getValue())
    })

    monacoEditor.getModel()?.updateOptions({ tabSize: 2 })

    const highlighter = new Highlighter(
      // @ts-ignore //ignore type check
      window.monaco,
      codeShift,
      monacoEditor
    )
    highlighter.highLightOnDidChangeModelContent(
      () => { },
      () => { },
      undefined,
      () => { },

    )

  }

  const onFormatClick = () => {
    console.log(editorRef.current)
    // get current value form editor
    const unformatted = editorRef.current.getModel().getValue()
    // format the value
    const formatted = prettier.format(unformatted, {
      parser: 'babel',
      plugins: [parser],
      useTabs: false,
      semi: true,
      singleQuote: true
    }).replace(/\n$/, '') //get rid of the extra new line after formatted

    // set the formatted value back in the editor
    editorRef.current.setValue(formatted)
  }

  return (
    <div className='editor-wrapper'>
      <button
        className='button button-format is-primary is-small'
        onClick={onFormatClick}>Format</button>

      <ManacoEditor
        editorDidMount={onEditorDidMount}
        value={initialValue}
        theme='dark'
        language='javascript'
        height="500px"
        options={{
          wordWrap: 'on',
          minimap: { enabled: false },
          showUnused: false,
          folding: false,
          lineNumbersMinChars: 3,
          fontSize: 16,
          scrollBeyondLastLine: false,
          automaticLayout: true
        }}
      />

    </div>)
}

export default CodeEditor;