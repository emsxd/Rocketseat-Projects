import { Check, Trash } from "phosphor-react"
import { useState } from "react"
import { Task } from "../App"
import "./tasks.scss"



interface Props{
    infos: Task,
    handleCompleted: any,
    deleteTask: any,
}

export function Tasks({infos, handleCompleted, deleteTask}:Props){
    const {id, content} = infos
    const [check, setCheck] = useState(false)
    function handleCheck(){
        if(check==true){
        setCheck(false)
        handleCompleted(id, false)
        }
        else{
        setCheck(true)
        handleCompleted(id, true)
        }
    }
    function handleDelete(){
        deleteTask({id,content})
    }
    return(
            <div className="task">
                <div className="align">
                    <button onClick={handleCheck} className={check==false ? undefined : 'buttonChecked'}>{check==false ? null : <Check size={20} weight="fill" />}</button>
                    <p className={check==false ? undefined : 'textChecked'}>{content}</p>
                </div>
            <Trash size={24} className="trash" onClick={handleDelete}/>
            </div>
    )
}

export default Tasks