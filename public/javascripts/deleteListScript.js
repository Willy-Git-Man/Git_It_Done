const deleteListButton = document.querySelectorAll('.deleteListButton');

deleteListButton.forEach(element => element.addEventListener('click', async (e) => {
  e.preventDefault();
  const listName = e.target.id.split('-')[0]
  const data = await fetch(`/lists/${listName}/delete`, {
    headers: { 'Content-Type': 'application/json' },
  })
  if (!data.ok) throw data
  const {listId} = await data.json()
  // console.log(listId);
  document.querySelector(`#list-${listId}`).remove();

  // const listUl = document.querySelector('ul')
  // const listHtml = lists.newList.map(list => {
  //     return `<li>
  //     <a href="/lists/${list.id}"> ${list.listName} </a>
  //     <a href="/lists/${list.id}/edit"> ✏️ </a>
  //     <button class="deleteListButton" id="${list.id}-delete"> 🗑️ </button>
  //     </li>`
  // })

  // listUl.innerHTML = ''
  // listUl.innerHTML = listHtml.join('')
  // const deleteListButton = document.querySelectorAll('.deleteListButton');
  // if (deleteListButton ) {
  //   deleteListButton .forEach((button) => {
  //     button.addEventListener("click", button.id);
  //   });
  // }
}))
