export function template({name, url}) {
    return <>
        <img src={url} attributes/>
        <div>{name}</div>
    </>;
}