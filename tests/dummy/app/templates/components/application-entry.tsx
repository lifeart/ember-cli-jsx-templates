export function applicationTemplate({showLabel, toggleLabel}) {
    return <>

<HelloPiterjs confName="PiterJSConf 2019" showLabel={showLabel}>
  <ConfLogo style={{width: '250px'}} onLogoClick={toggleLabel} name="[I'm logo]" url="images/logo.png" />
  <ConfLogo style={{width: '250px'}} name="[I'm another logo]" url="images/magic.gif" />
  <ConfLogo style={{width: '250px'}} name="[I'm another logo]" url="images/ember.png" />
  <ConfLogo style={{width: '250px'}} name="[I'm another logo]" url="images/react.png" />
</HelloPiterjs> 


    </>
}