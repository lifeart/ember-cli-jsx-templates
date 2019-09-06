export function template({confName}) {
    let borderRadius = '15px';
    return <h1>This is <span>{confName}</span> {yield()}
    <ConfLogo mod-style={{width:'200px','backgroundColor': 'red', borderRadius}} name="[I'm another logo]" url="images/react.png" />
    </h1>;
}