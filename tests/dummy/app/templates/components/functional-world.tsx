export default function MyFunctionalComponent() {
    return (
      <>
      <h1>JSX templates for Ember!</h1>
      <p>Hello, {this.inputPrefix}!</p><br />
      Update: <input class="my-input" value={name} onkeyup={this.onChange}/>
      </>
    )
}