import React from 'react'
import { useDispatch } from 'react-redux'
import { filterDataActions } from '../../../../store/filterDataSlice'

function Select(props) {
    const dispatch = useDispatch()

    const setValue = (index)=>{
        const data = props.data[index]
        dispatch(filterDataActions.setFilterData(data))
    }
    return (
        <div className="w-full px-3 mb-6">
            <label className="block uppercase tracking-wide text-gray-700 text-base font-bold mb-2" htmlFor="grid-state">
                {props.title}
            </label>
            <div className="relative">
                <select onChange={(e)=>{setValue(e.target.value)}} className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state">
                    {
                        props.data.length > 0 ?
                            props.data.map((value, index) => {
                                return(<option value={index}>{value.branch} {value.section} (Sem {value.semester_number})</option>)
                            })
                        : null
                    }

                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                </div>
            </div>
        </div>
    )
}

export default Select