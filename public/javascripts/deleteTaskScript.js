let deleteTaskButton = document.querySelectorAll('.deleteTaskButton')
deleteTaskButton.forEach((button) => {
  button.addEventListener('click', async (e) => {
    e.preventDefault()
    const listName = e.target.id.split('-')[0]
    const taskName = e.target.id.split('-')[1]
    const data = await fetch(`/lists/${listName}/${taskName}/delete`, {
      headers: { 'Content-Type': 'application/json' }
    })
    // .then(response => response.json())
    if (!data.ok) throw data
    const { taskId } = await data.json()
    // console.log(listId);
    document.querySelector(`#task-${taskId}`).remove();
  })
})
