interface ActionBarProps {
  id: string;
}

const ActionBar: React.FC<ActionBarProps> = () => {

  return (<div>

    <button>Up</button>
    <button>Down</button>
    <button>Delete</button>

  </div>)


}

export default ActionBar