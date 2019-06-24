import { FooProp } from "./../../typings";
import HelloWorld from './hello-world';

type HelloWorldYield  = [string];

export default function TypedHelloComponent(props: FooProp) {
    return (<>
    <HelloWorld>
        {name}
    </HelloWorld>
    <h1>This is typed template! And name is: {props.name}</h1>
    </>)
}