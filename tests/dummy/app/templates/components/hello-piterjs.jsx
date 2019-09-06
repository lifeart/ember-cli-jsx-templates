export function template({confName, children, showLabel}) {
    let borderRadius = '15px';
return <><h1>{ showLabel && <span>This is  {confName}</span> } {children}
    <ConfLogo style={{width:'200px','backgroundColor': 'red', borderRadius}} name="[I'm another logo]" url="images/react.png" />
    </h1></>;
}