import ManacoEditor from '@monaco-editor/react';

const CodeEditor = () => {
  return <ManacoEditor
  value={}
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
}

export default CodeEditor;