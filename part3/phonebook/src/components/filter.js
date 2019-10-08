import React from 'react'
const Filter = ({flt, setFlt}) => {
    const handleFltChange = (event) => {
        setFlt(event.target.value)
    }
    return (
        <div>
            <form>
                <div>
                    filter shown with:
                    <input 
                        value={flt}
                        onChange={handleFltChange}/>
                </div>
            </form>
        </div>
    )
}
export default Filter