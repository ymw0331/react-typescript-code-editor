import { ResizableBox } from 'react-resizable'

interface ResizableProps {
  direction: "horizontal" | "vertical";
  children?: React.ReactNode;
}

const Resizable: React.FC<ResizableProps> = ({ direction, children }) => {
  return (<ResizableBox >
    {children}
  </ResizableBox>
  )
}

export default Resizable; 