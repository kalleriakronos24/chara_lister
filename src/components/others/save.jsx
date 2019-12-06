import React from 'react'

export const Save = props => {

    const result = props.saved_char.some(s => s.name === props.char_name)
    console.log(props);
    if(result){
    return (
        <div>
            <button key={props.index} onClick={props.unsave_handler} type="button" className="btn-save">Saved</button>
        </div>
    )
    }else{     
    return (
        <div>
            <button key={props.index} onClick={props.save_handler} type="button" className="btn-save">Save</button>
        </div>
    )
    }
}

export default Save;