import "./resizable.css"
import { ResizableBox } from 'react-resizable'

interface ResizableProps {
  direction: "horizontal" | "vertical";
  children?: React.ReactNode;
}

const Resizable: React.FC<ResizableProps> = ({ direction, children }) => {
  return (
    <ResizableBox 
    minConstraints={}
    maxConstraints={[Infinity, window.innerHeight * 0.9]}
      height={300}
      width={Infinity}
      resizeHandles={['s']}> {children}
    </ResizableBox>
  )
}

export default Resizable; 