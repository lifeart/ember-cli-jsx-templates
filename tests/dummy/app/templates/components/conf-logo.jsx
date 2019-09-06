export function template({name, url, onLogoClick}) {
    return <>
        <div>
            <img onClick={optional( onLogoClick)} src={url} attributes/>
            <div>{name}</div>
        </div>
    </>;
}