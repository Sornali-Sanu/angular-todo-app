import { CommonModule } from '@angular/common';
import { Component, OnInit, signal, Signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-todo-app',
 
  imports: [FormsModule,CommonModule],
  templateUrl: './todo-app.html',
  styleUrl: './todo-app.css'
})
//page load for live cycle event .Implements OnInit
export class TodoApp implements OnInit {

ngOnInit(): void {
  const localData=localStorage.getItem("taskList")
  if(localData!=null){
    const parseData=JSON.parse(localData);
    this.taskList.set(parseData);
    this.filteredTaskList.set(parseData);
  }
}

taskList=signal<ITask[]>([]);
filteredTaskList=signal<ITask[]>([]);
taskName:string="";
isFilterPresent=signal<boolean>(true);

onAddTask()
{
// debugger;
const taskObj={
  taskStatus:"new",
  taskName:this.taskName
} as ITask;
this.taskList.update(oldTask=>([...oldTask,taskObj]));
this.filteredTaskList.set(this.taskList());
//store Data in local storage:
localStorage.setItem('taskList',JSON.stringify(this.taskList()))
}

//filter or search:
noTextChange()
{

const filterData=this.taskList().filter(m=>m.taskName.toLocaleLowerCase().startsWith(this.taskName.toLocaleLowerCase()))
if(filterData.length!=0)
{
  
  this.isFilterPresent.set(true);
  this.filteredTaskList.set(filterData)

}
else{
this.isFilterPresent.set(false)

}
}

//status filter
OnStatusFilter(event:any)
{
debugger;
const status=event.target.value;
if(status=='All')
{
  this.isFilterPresent.set(true);
  this.filteredTaskList.set(this.taskList());
}
else{

const filterData=this.taskList().filter(m=>m.taskStatus.toLocaleLowerCase().startsWith(status.toLocaleLowerCase()))
if(filterData.length!=0)
{
  this.isFilterPresent.set(true);
  this.filteredTaskList.set(filterData)

}
else{
this.isFilterPresent.set(false)

}
}





}
changeStatus(status:string,taskData:ITask)
{
  debugger;

  taskData.taskStatus=status;
  this.taskList.set(this.filteredTaskList());

//store Data in local storage:
localStorage.setItem('taskList',JSON.stringify(this.taskList()))
}
}

//Itask interface:
export interface ITask{
  taskName:string;
  taskStatus:string;
}
