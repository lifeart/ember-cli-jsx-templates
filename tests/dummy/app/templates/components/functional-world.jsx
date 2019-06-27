export default function MyFunctionalComponent({name}) {
    let localVariable = 'Hello!';
    return <div>{localVariable}, {name}</div>;
}