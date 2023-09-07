import React, { useEffect, useState } from "react";

const Home = () => {
	const[todos, setTodos] = useState([])
	useEffect(()=>{
		fetch("https://playground.4geeks.com/apis/fake/todos/user/beltranr20")
		.then((response)=> response.json())
		.then((data)=>{
			console.log(data)
			setTodos(data)
		})
	},[])
	const createTodo=(e)=>{
		// stopping default refresh action
		e.preventDefault()
		let updatedTodos = todos
		let newTodo={
			// declaring todo.label
			"label" : e.target.todoInput.value, //from the event we're targeting the input and getting its value
			"done" : false 
		}
		let isNew = true
		todos.forEach((todo,index)=>{
			if(todo.label.toLowerCase() === newTodo.label.toLowerCase()){
				isNew = false
			}
		})
		// isNew === true ? setTodos([...todos, newTodo]) : alert("Todo already exists.")
		if(isNew===true){
			updatedTodos.push(newTodo)
			fetch("https://playground.4geeks.com/apis/fake/todos/user/beltranr20",{
				method: "PUT",
				body: JSON.stringify(
					updatedTodos
				),
				headers: {
					"Content-Type": "application/json"
				}
			})
			.then((response)=> response.json())
			.then((data)=>{
				console.log(data)
				setTodos([...updatedTodos])
			})
		}
		e.target.todoInput.value = ""	
	}
	const removeTodo = (e,index)=>{
		e.preventDefault()
		let currentTodos = todos
		let filterTodos = currentTodos.filter((item,idx)=> idx !== index)
		// updating setTodos function and allows page refresh 
		fetch("https://playground.4geeks.com/apis/fake/todos/user/beltranr20",{
				method: "PUT",
				body: JSON.stringify(
					filterTodos
				),
				headers: {
					"Content-Type": "application/json"
				}
			})
			.then((response)=> response.json())
			.then((data)=>{
				console.log(data)
				setTodos([...filterTodos])
			}) 
	}

	return (
		<div className="text-center">
			<form onSubmit={createTodo}> 
				<input name="todoInput" type="text" placeholder="Enter a Todo"/>
			</form>
			<ul>
				{todos.map((todo,index)=>{
					return(
						<li key={index}>
							<span>{todo.label}</span>
							<button onClick={(e)=>removeTodo(e,index)}>Delete</button>
						</li>

					)
				})}
			</ul>
		</div>
	);
};

export default Home;