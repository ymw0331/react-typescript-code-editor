import { useActions } from "../hooks/use-actions"
interface ActionBarProps {
  id: string;
}

const ActionBar: React.FC<ActionBarProps> = ({ id }) => {

  const { moveCell, deleteCell } = useActions()
  return (<div>
    <button className="button is-primary"
      onClick={() => moveCell(id, 'up')}>
      <span className="icon">
        <i className="fas fa-arrows-up"></i>
      </span>
    </button>

    <button className="button is-primary"
      onClick={() => moveCell(id, 'down')}>
      <span className="icon">
        <i className="fas fa-arrow-down"></i>
      </span>
    </button>

    <button className="button is-primary"
      onClick={() => deleteCell(id)}>
      <span className="icon">
        <i className="fas fa-times"></i>
      </span>
    </button>

  </div>)
}

export default ActionBar