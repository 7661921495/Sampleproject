import { Injectable } from '@angular/core';
import{HttpClient} from  '@angular/common/http';
import { url } from 'inspector';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  http: any;
  
   
  constructor() { }

  

  todos= ['todo 1','todo 2'];
  mobiles=['Redmi','Realme','Samsung','Nokia'];
  taskId=3

  todoList=[{
    id:1,'task':"Task1"

  },
  {
    id:1,'task':"Task2"
  }
]

  getTodos(){
    return this.todos
  }
  addTodo(taskName: any){
    this.todoList.push({"id":this.taskId++,'task':taskName})
  }
   deleteTodo(index: number){
    this.todoList.splice(index,1)
   }
  

}
