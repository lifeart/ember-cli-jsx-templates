export function template({ confName, children, showLabel }) {
  let borderRadius = "15px";
  let size = 25*10;
  return (
    <>
      <h1>

        {showLabel && <span>This is {confName}</span>}
        {children}
        <ConfLogo
          style={{
              width: `${size}px`, 
              backgroundColor: "silver", 
              border: '1px solid black',
              boxShadow: '1px 2px 3px blue',
              borderRadius
          }}
          name="[I'm another logo]"
          url="images/react.png"
        />
      </h1>
    </>
  );
}
