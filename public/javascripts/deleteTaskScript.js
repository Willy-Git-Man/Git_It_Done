let deleteTaskButton = document.querySelectorAll('.deleteTaskButton')
deleteTaskButton.forEach((button) => {
  button.addEventListener('click', async (e) => {
    e.preventDefault()
    const listId = e.target.id.split('-')[0]
    const taskId = e.target.id.split('-')[1]
    const data = await fetch(`/lists/${listId}/${taskId}/delete`, {
      headers: { 'Content-Type': 'application/json' }
    })
    if (!data.ok) throw data
    const { taskCount, completedCount, listName  } = await data.json()
    document.querySelector(`#task-${taskId}`).remove();
    const listSummary = document.querySelector('.sidebar');
    listSummary.innerHTML = '';
    listSummary.innerHTML = `
      <div class="listSummary">
        <h1> ${listName} List Summary</h1>
        <p>Total Tasks: ${taskCount}</p>
        <p>Complete: ${completedCount}</p>
        <p>Incomplete: ${taskCount - completedCount}</p>
      </div>
    `;
  })
})
