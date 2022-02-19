import { useState } from 'react'

import '../styles/tasklist.scss'

import { FiTrash, FiCheckSquare } from 'react-icons/fi'

interface Task {
  id: number;
  title: string;
  responsible : string;
  isComplete: boolean;
}

export function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [responsibleTask, setresponsibleTask] = useState('');

  function handleCreateNewTask() {
    const newTask = {
      id: Math.random(),
      title: newTaskTitle,
      responsible : responsibleTask,
      isComplete: false,
    }

    setTasks(prevState => [...prevState, newTask]);
    // Crie uma nova task com um id random, não permita criar caso o título seja vazio.
  }

  function handleToggleTaskCompletion(id: number) {
    // Altere entre `true` ou `false` o campo `isComplete` de uma task com dado ID
    const chkTask = tasks.map(
            task => task.id === id ? {
                ...task,
                isComplete: !task.isComplete
            } : task )

    setTasks(chkTask);

  }

  function handleRemoveTask(id: number) {
    // Remova uma task da listagem pelo ID
     // Remova uma task da listagem pelo ID
     const filterTasks = tasks.filter(
                                        task => task.id !== id
                                      );

     setTasks(filterTasks);
  }

  return (
    <section className="task-list container">
    <header>
      <h2>Minhas tasks</h2>
      
       
      <div className="input-group">
     
      <input 
          type="text" 
          placeholder="Responsible Task" 
          onChange={(e) => setresponsibleTask(e.target.value)}
          value={responsibleTask}
        />
        <input 
          type="text" 
          placeholder="Adicionar novo todo" 
          onChange={(e) => setNewTaskTitle(e.target.value)}
          value={newTaskTitle}
        />
        <button type="submit" data-testid="add-task-button" onClick={handleCreateNewTask}>
          <FiCheckSquare size={16} color="#fff"/>
        </button>
      </div>
    </header>
    <br></br>
     {
       tasks.length > 0 ? <h1>Efetue suas tarefas</h1> :  <h1>Não há nenhuma tarefa</h1>
     }
      
    <main>
      <ul>
        {tasks.map(task => (
          <li key={task.id}>
            <div className={task.isComplete ? 'completed' : ''} data-testid="task" >
              <label className="checkbox-container">
                
                <input 
                  type="checkbox"
                  readOnly
                  checked={task.isComplete}
                  onClick={() => handleToggleTaskCompletion(task.id)}
                />
                <span className="checkmark"></span>
              </label>
            
              <p>{task.responsible}</p>
              <p>{task.title}</p>
            </div>

            <button type="button" data-testid="remove-task-button" onClick={() => handleRemoveTask(task.id)}>
              <FiTrash size={16}/>
            </button>
          </li>
        ))}
        
      </ul>
    </main>
  </section>
  )
}