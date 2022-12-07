import { useTypedSelector } from "../hooks/use-typed-selector"

const CellList: React.FC = () => {
  useTypedSelector(({ cells: { order, data } }) => {
    return order.map((id) =>
      data[id]
    )
  })

  return <div>Cell List</div>
}

export default CellList