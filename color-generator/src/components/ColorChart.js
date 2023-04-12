
import { memo } from 'react';
import ColorGrid from './ColorGrid';
import './ColorChart.scss';

const ColorChart = (props) => {

        // console.log(props.colorList);
        return (                
            <div className='colorChart'>
                {props.ColorList.map( (colorItem) => {
                    return <div> <ColorGrid color={colorItem} /> </div>
                })}
            </div>
        );
}

export default memo(ColorChart);