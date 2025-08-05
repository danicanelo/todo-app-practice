import { AfterViewChecked, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Todo, TodoService } from './services/todo.service';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

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
    this.loadTodos();
  }

  loadTodos() {
    this.todoService.getTodos().subscribe(todos => {
      todos.forEach(t => t.editing = false);
      const sortedTodos = todos.sort((a, b) => {
        if (a.completed !== b.completed) {
          return Number(a.completed) - Number(b.completed);
        }
        return (a.order ?? 0) - (b.order ?? 0);
      });

      this.todos = [...sortedTodos];
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

  drop(event: CdkDragDrop<Todo[]>) {
    const previousOrder = [...this.todos]

    moveItemInArray(this.todos, event.previousIndex, event.currentIndex);
    this.todos = this.todos.map((todo, index) => ({
      ...todo,
      order: index
    }))

    const changeOrder = [];

    for (const actualTodo of this.todos) {
      const previousTodo = previousOrder.find(t => t.id === actualTodo.id);
      if (actualTodo.order !== previousTodo?.order) {
        changeOrder.push(actualTodo);
      }
    }

    if (changeOrder.length > 0) {
      for (const todo of changeOrder) {
        this.todoService.updateTodo(todo).subscribe();
      }
    }
  }

  ngAfterViewChecked(): void {
    if (this.editInput) {
      this.editInput.nativeElement.focus();
    }
  }

}
