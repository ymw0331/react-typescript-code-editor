import { useState, useEffect, useRef } from "react";
import MDEditor from "@uiw/react-md-editor";

const TextEditor: React.FC = () => {
  const ref = useRef<HTMLDivElement | null>(null)
  const [editing, setEditing] = useState(false)

  useEffect(() => {
    const listener = (event: MouseEvent) => {

      console.log(event.target)

      setEditing(false)
    }
    document.addEventListener('click', listener, { capture: true })

    return () => {
      document.removeEventListener('click', listener, { capture: true })
    }
  }, [])

  if (editing) {
    return (
      <div /// <reference " />
      >
        <MDEditor />
      </div>
    )
  }
  return (
    <div onClick={() => setEditing(true)}>
      <MDEditor.Markdown source={'# Header'} />
    </div>
  )
}

export default TextEditor