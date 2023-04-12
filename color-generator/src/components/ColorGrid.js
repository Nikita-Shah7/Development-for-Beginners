import { memo } from 'react';
import "./ColorGrid.scss";

const ColorGrid = (props) => {
    // console.log(props.color);
    // console.log(props.color.alpha);
    // console.log(props.color.rgb.join(','));
    // console.log(props.color.type);
    // console.log(props.color.weight);
    // console.log(props.color.hex);

    let r = props.color.rgb[0];
    let g = props.color.rgb[1];
    let b = props.color.rgb[2];
    let rgb = `rgb(${r},${g},${b})` ;
    let contrast = `rgb(${255-r},${255-g},${255-b})` ;

    // 1. TO CONVERT RGB TO HEXADECIMAL COLORCODE ::
    // const decimalToHex = (ch) => {
    //     let hex = ch.toString(16);
    //     return hex.length === 1 ? '0'+hex : hex ;
    // }

    // const rgbToHexa = () => {                
    //     return ( "#" + decimalToHex(r) + decimalToHex(g) + decimalToHex(b) );
    // }    

    // const rgbToHex = rgbToHexa(r,g,b);

    return (
        <div className='colorGrid'  style={ { backgroundColor: `${rgb}` ,  color: `${contrast}` } } onClick={ () => navigator.clipboard.writeText(`#${ props.color.hex }`) }>
            <p> {`${ props.color.weight }% ` } </p>        
            <small> {`#${ props.color.hex } ` } </small>
        </div>
    );

}

export default memo(ColorGrid);