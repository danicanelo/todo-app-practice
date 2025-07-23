import { AfterViewChecked, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Todo, TodoService } from './services/todo.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit, AfterViewChecked {
  @ViewChild('editInput', { static: false }) editInput!: ElementRef;

  todos: Todo[] = [];
  newTodo = '';
  editing: boolean = false;

  constructor(private todoService: TodoService) { }

  ngOnInit(): void {
    console.log('AppComponent initialized');
    this.loadTodos();
  }

  loadTodos() {
    this.todoService.getTodos().subscribe(todos => {
      this.todos = todos
    })
  }

  addTodo() {
    const todo = {
      title: this.newTodo,
      completed: false
    };
    this.todoService.addTodo(todo).subscribe(newTodo => {
      this.todos.push(newTodo);
      this.newTodo = '';
    })
  }

  updateTodo(todo: Todo) {
    this.todoService.updateTodo(todo).subscribe()
  }

  deleteTodo(id: number) {
    this.todoService.deleteTodo(id).subscribe(() => {
      this.loadTodos();
    });
  }

  toggleCompleted(todo: Todo) {
    todo.completed = !todo.completed;
    this.todoService.updateTodo(todo).subscribe();
  }

  startEditing(todo: Todo) {
    this.todos.forEach(t => t.editing = false);
    todo.editing = true;
  }

  stopEditing(todo: Todo) {
    this.updateTodo(todo);
    this.todos.forEach(t => t.editing = false);
  }

  ngAfterViewChecked(): void {
    if (this.editInput) {
      this.editInput.nativeElement.focus();
    }
  }

}
