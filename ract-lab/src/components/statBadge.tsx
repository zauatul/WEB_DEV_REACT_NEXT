
export type Badge = {
    label : string,
    value : string | number
}
function StatBadge(props : {badge : Badge}) {
    const {label, value} = props.badge;
  return (
    <>
        <p><span>{label}</span>: <strong>{value}</strong></p>
    </>
  )
}

export default StatBadge;