
const deleteListButton = document.querySelectorAll('.deleteListButton');
console.log(deleteListButton);


deleteListButton.forEach(element => element.addEventListener('click', async (e) => {
    e.preventDefault();
    console.log('1111111111')
  const listName = e.target.id.split('-')[0]
  console.log(listName)
  const data = await fetch(`/lists/${listName}/delete`, {
    headers: { 'Content-Type': 'application/json' },
  })
  if (!data.ok) throw data
  const lists = await data.json()
  console.log('lists:', lists)

//   const listUl = document.querySelector('ul')
//   const listHtml = lists.newList.map(list => {
//       `<li>${list.listName}</li>`
//   })
//   console.log(listHtml, 'lisssttHTML')
//   listUl.innerHTML = ''
//   listUl.innerHTML = listHtml.join('')
//   console.log(listUl, 'listUl')

}))