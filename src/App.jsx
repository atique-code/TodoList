import React from "react";
// import {MdAdd } from "react-icons/md";
import {AiOutlineDelete } from "react-icons/ai";
import {AiOutlineEdit } from "react-icons/ai";
import {GrUpdate } from "react-icons/gr";
import "./style.css";

class App extends React.Component{
  constructor(){
    super()
    this.state = {
      todolist: [],
      value: '',
      width:4+"px"
    }
  }
  
  toDo_list =()=>{
    // this.state.todolist.push(this.setState.value)
    let obj ={
     title: this.state.value,
      s: 0
    }

    this.state.todolist= [...this.state.todolist, obj]
    localStorage.setItem("Todo_list", JSON.stringify(this.state.todolist))
    this.setState({
    
      value: ''
    })
    
  }

  delete_todo =(index) =>{
    this.state.todolist.splice(index, 1);
    this.setState({
      todolist: this.state.todolist
    })
  }

  edit_todo =(index) =>{
   let len = this.state.todolist[index].title.length+50
    for(var i =0; i<this.state.todolist.length; i++){
      this.state.todolist[i].s=0;
    }
    this.state.todolist[index].s=1;
    this.state.width=len
    this.setState({})


  }

  update_todo =(index) =>{
    this.state.todolist[index].s=0
    localStorage.setItem("Todo_list", JSON.stringify(this.state.todolist))
    this.setState({
      
    })
  }

  statechg=(val,ind)=>{
    this.state.todolist[ind].title=val
    this.setState({})
    
  }

  
  componentDidMount(){

    let data = localStorage.getItem("Todo_list");
    console.log(data);

    this.state.todolist= JSON.parse(data)
    this.setState({})
  }


  render(){
    let {todolist, value} = this.state;
    return(
      <div className="top">
        <h1>ToDo APP</h1>
        <input type="text" style={{listStyle:"none",margin:12+"px"}} value={value} placeholder="enter your list" onChange={(e)=>{
          this.setState({value: e.target.value})
        }} />
        <button onClick={this.toDo_list} id="btn-add" >Add</button>

        <div>
          <ul>
            {
              todolist.map((v,i)=>{
                return (
                v.s ==0? 
                <li key={i}>

                  {v.title}
                  <button onClick={()=>this.delete_todo(i)}><AiOutlineDelete/></button>
                  <button onClick={()=> this.edit_todo(i)} ><AiOutlineEdit/></button>
                </li>
                :
                <li key={i}>

                  <input type="text" style={{width:this.state.width}} value={  v.title} onChange={(e)=>this.statechg(e.target.value,i)} />
                  <button onClick={()=> this.update_todo(i)} ><GrUpdate/></button>
                </li>
                )
               })
            }
          </ul>
        </div>
      </div>

    


    )
      
  }
}
export default App;