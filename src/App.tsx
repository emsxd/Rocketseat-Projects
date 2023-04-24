
import { Notepad, PlusCircle } from 'phosphor-react'
import { ChangeEvent, FormEvent, InvalidEvent, useState } from 'react'
import './App.scss'
import Tasks from './components/Tasks'

export interface Task{
  id: string,
  content: string,
}


function App() {
  const [task,setTask] = useState<Task[]>([])
  const [newTask,setNewTask] = useState('')
  const [customValidity, setCustomValidity] = useState('')
  const [completed , setCompleted] = useState(0)

  

    function isObjEmpty (obj:Task) {
      if(obj===undefined)
      return true
      else
      return Object.keys(obj).length === 0;
    }
    

    function countTasks(){
      if(isObjEmpty(task[0]))
      return 0
      else
      return task.length
    }

    function handleCreateTask(event:FormEvent){
      event.preventDefault()
      
      if(isObjEmpty(task[0])){
        setTask([ {
          id: newTask,
          content: newTask,
        }])
    }else{
      setTask([...task, {
        id: newTask,
        content: newTask,
      }])}
      setNewTask('')
    }

    function deleteTask(taskToDelete: Task){
      
      const taskId = task.findIndex((obj => obj.id == taskToDelete.id));
      
      const tasksWithoutDeletedOne = task.filter(tasks =>{
          return JSON.stringify(tasks) !== JSON.stringify(taskToDelete)
      })
      
      setTask(tasksWithoutDeletedOne)
  }

    function handleCompleted(id:string,boolean:boolean){
      if(boolean==true)
      setCompleted(completed+1)
      else
      setCompleted(completed-1)
    }

    function handleNewTaskChange(event:ChangeEvent<HTMLInputElement>){
      setNewTask(event.target.value)
      event.target.setCustomValidity('')

    }
    function handleNewTaskValidity(event: InvalidEvent<HTMLInputElement>){
      event.target.setCustomValidity('Campo obrigatório')
    }
    
  return (
    <>
      <div>
        <div className="header">
          <h1 className="logo">Todo Logo</h1>
          <div className="taskInput">
            <form onSubmit={handleCreateTask}>
            <input placeholder="Adicione uma nova tarefa" required onInvalid={handleNewTaskValidity} value={newTask} onChange={handleNewTaskChange}></input>
            <button type="submit">Criar <PlusCircle size={20}/></button>
            </form>
          </div>
        </div>
        <div className="component">
          <div className="taskHeader">
            <p className="taskCreated">Tarefas criadas <div className="quantity">{countTasks()}</div></p>
            <p className="taskCompleted">Concluídas <div className="quantity">{completed}</div></p>
          </div>
          <div className="tasks">
            <div className="componentTask">

              {isObjEmpty(task[0]) === true ?
              <div className="noTask">
                <Notepad size={100}/>
                <h2>Você ainda não tem tarefas cadastradas</h2>
                <span>Crie tarefas e organize seus itens a fazer</span>
              </div>
              :

              task.map(tasks =>{
                return(
                <Tasks infos={tasks} handleCompleted={handleCompleted} deleteTask={deleteTask}/>
                )
              })
              
              }
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
