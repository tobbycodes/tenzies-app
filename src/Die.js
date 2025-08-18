export default function Die(props){
    const styles = {
        backgroundColor: props.isHeld ? "#6ac942ff": "white"
    }
    console.log(styles)
    return (
        //Make the color change to green once it is true and white when false
    <button 
    style={styles}  
    onClick={props.toggle}
    >{props.value}</button>
    )
}