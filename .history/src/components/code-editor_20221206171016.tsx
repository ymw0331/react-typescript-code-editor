import ManacoEditor from '@monaco-editor/react';

const CodeEditor = () => {
  return <ManacoEditor
    theme='dark'
    language='javascript'
    height="500px"
    options={{
      wordWrap: 'on',
      minimap: { enabled: false },
      showUnused: false,
      folding: false,
      lineNumbersMinChars:3,
      fontSize: 16, 
      scrolllBe
    }}
  />
}

export default CodeEditor;