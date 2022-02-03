const draggable_list = document.getElementById('draggable-list');
const check = document.getElementById('check');

const richestPeople = [
  'Jeff Bezos',
  'Bill Gates',
  'Warren Buffett',
  'Bernard Arnault',
  'Carlos Slim Helu',
  'Amancio Ortega',
  'Larry Ellison',
  'Mark Zuckerberg',
  'Michael Bloomberg',
  'Larry Page',
];

const listItems = [];
let dragStartIndex;
createList();

function createList() {
  let copyOfRichest = [...richestPeople];
  copyOfRichest
    .map((a) => ({value: a, sort: Math.random()}))
    .sort((a, b) => a.sort - b.sort)
    .forEach((item, index) => {
      const listItem = document.createElement('li');
      listItem.setAttribute('data-index', index.toString());
      listItem.innerHTML = ` 
    <span class="number">${index + 1}</span>
    <div class="draggable" draggable="true">
    <p class="person-name">${item.value}</p>
    <i class="fas fa-grip-lines"></i>
    </div>`;


      listItems.push(listItem);
      draggable_list.appendChild(listItem);
    });

  addEventListener();
}

function dragStart() {
  dragStartIndex = +this.closest('li').getAttribute('data-index');
}

function dragOver(e) {
  e.preventDefault();
}

function dragDrop() {
  let dragEndIndex = +this.getAttribute('data-index');
  swapItems(dragStartIndex, dragEndIndex);
  this.classList.remove('over');
}

function dragEnter() {
  this.classList.add('over');
}

function dragLeave() {
  this.classList.remove('over');
}

function swapItems(fromIndex, toIndex) {
  const itemOne = listItems[fromIndex].querySelector('.draggable');
  const itemTwo = listItems[toIndex].querySelector('.draggable');

  listItems[fromIndex].appendChild(itemTwo);
  listItems[toIndex].appendChild(itemOne);
}

function checkOrder() {
  listItems.forEach((item, idx) => {
    const personName = item.querySelector('.draggable').innerText.trim()
    item.classList.remove('wrong')
    if (personName !== richestPeople[idx]) {
      item.classList.add('wrong')
    } else {
      item.classList.remove('wrong')
      item.classList.add('right')
    }
  });
}

function addEventListener() {
  const draggables = document.querySelectorAll('.draggable');
  const dragListItems = document.querySelectorAll('.draggable-list li');

  draggables.forEach((draggable) => {
    draggable.addEventListener('dragstart', dragStart);
  });

  dragListItems.forEach((item) => {
    item.addEventListener('dragover', dragOver);
    item.addEventListener('drop', dragDrop);
    item.addEventListener('dragenter', dragEnter);
    item.addEventListener('dragleave', dragLeave);
  });
}

check.addEventListener('click', checkOrder);