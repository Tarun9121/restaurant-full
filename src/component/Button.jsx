export default function Button(props) {
    return (
        <button 
        type={props?.type} 
        onClick={props?.onClick} 
        className={`px-2 py-1 ${props?.className} ${props?.bgColor} ${props?.color}`}>
            {props.btnName}
            </button>
    );
}