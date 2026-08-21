
type Header = {
    title : string,
    tagline : string
}
function DashboardHeader(props : {dbHeader: Header}) {
    const {title, tagline} = props.dbHeader;
  return (
    <>
        <div>
            <h1>{title}</h1>
            <p>{tagline}</p>

            <nav style={{display:"flex", justifyContent:"space-evenly"}}>
                <a href="#dashboard">Dashboard</a>
                <a href="#students">Students</a>
                <a href="#courses">Courses</a>
                <a href="#profile">Profile</a>
            </nav>
        </div>
    </>
  )
}

export default DashboardHeader