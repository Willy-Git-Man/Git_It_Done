const deleteListButton = document.querySelectorAll(".deleteButton");

console.log(deleteListButton);

deleteListButton.forEach(element => element.addEventListener("click", async (e) => {
    e.preventDefault();
    console.log('1111111111')
  const listName = e.target.id.split('-')[0]
  console.log(listName)

  const data = await fetch(`/lists/${listName}/delete`, {
    headers: { "Conternt-Type": "application/json" },
  })

  if (!data.ok) throw data

  const lists = await data.json()
  console.log('lists:', lists)

//   const body = document.querySelectorAll("li");
//   body.forEach((element) => {
//     let anchor = element.querySelectorAll("a");

    // anchor.remove();
//   });
}))
