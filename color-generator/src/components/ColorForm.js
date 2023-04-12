import { memo } from 'react';
// import { check } from 'express-validator';
import "./ColorForm.scss";

const ColorForm = (props) => {  
    

    // validate if input is a hexadecimal number
    function isHex(num) {
        return Boolean(num.match(/^#[0-9a-f]+$/i))
      }

    const submit = (e) => {    
        e.preventDefault();
        let color = document.getElementById('color').value;        
        if( color === "")
        {                        
            console.log(color);
            alert('Color Color Which Color ??');
            return;
        }
        if( !isHex(color) || color.toString().length !== 7 )
        {
            console.log("nik");
            alert('Enter a valid hexa code!!');
            return;
        }
        console.log(color);
        props.CHandler(color); 
        return;
    }

    return (
        <div className="form">
            <form spellCheck="false" onSubmit={submit}>
                <div>
                    <input id="color" type="text" placeholder="#FF780A" />
                    <button type="submit">SUBMIT</button>
                </div>
            </form>
        </div>
    );
}

export default memo(ColorForm);