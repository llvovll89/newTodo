const todoform = document.getElementById("todo-form");
const todoinput = todoform.querySelector(".todo-input");
const todolist = document.getElementById("todo-list");

const TODOS_KEY = "todos";

// 저장소
let toDos = [];

function saveToDos() {
  // push된 newTodo 값 저장
  // JSON.stringify -> 모든 배열 , 오브젝트 문자열 변환
  localStorage.setItem(TODOS_KEY, JSON.stringify(toDos));
}

// paint todo <todo그리기>
function paintToDo(newTodo) {
  const item = document.createElement("li");
  // li classname
  item.classList.add("item");
  // li id 추가(분별 위해)
  item.id = newTodo.id;
  const itemSpan = document.createElement("span");
  // span classname
  itemSpan.classList.add("item-text");
  itemSpan.textContent = newTodo.text;
  const delbtn = document.createElement("button");
  // delbtn classname
  delbtn.classList.add("btn");
  delbtn.textContent = "🐿️";
  delbtn.addEventListener("click", (e) => {
    //   li(span) 삭제 이벤트
    const delLI = e.target.parentElement;
    delLI.remove();
    toDos = toDos.filter((toDo) => toDo.id !== parseInt(item.id));
    saveToDos();
  });

  item.appendChild(itemSpan);
  item.appendChild(delbtn);

  // todolist <ul>에 li(item)>span(item-span) 넣기
  todolist.appendChild(item);
}

// todo submit F
todoform.addEventListener("submit", (e) => {
  e.preventDefault();
  // newTodo = 저장소 (todoinput.value);
  const newTodo = todoinput.value;
  todoinput.value = " ";
  const newTodoObj = {
    text: newTodo,
    id: Date.now(),
  };
  //   toDos(빈 배열)에 푸쉬
  toDos.push(newTodoObj);
  paintToDo(newTodoObj);
  saveToDos();
});

const savedToDos = localStorage.getItem(TODOS_KEY);
// if() <- 괄호 안에 그냥 쓰면 참값
if (savedToDos !== null) {
  const paresdToDos = JSON.parse(savedToDos);
  toDos = paresdToDos;
  paresdToDos.forEach(paintToDo);
}
