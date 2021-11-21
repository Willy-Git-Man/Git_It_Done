const deleteListButton = document.querySelectorAll('.deleteListButton');

deleteListButton.forEach(element => element.addEventListener('click', async (e) => {
  e.preventDefault();
  const listId = e.target.id.split('-')[0]
  const data = await fetch(`/lists/${listId}/delete`, {
    headers: { 'Content-Type': 'application/json' },
  })
  if (!data.ok) throw data
  const { taskCount, completedCount } = await data.json()
  document.querySelector(`#list-${listId}`).remove();
  const taskDiv = document.querySelector('.taskDiv');
  const sideBar = document.querySelector('.sidebar');
  taskDiv.innerHTML = '';
  taskDiv.innerHTML = '<p class="pleaseSelect">Please select a List to view your tasks.</p>';
  sideBar.innerHTML = '';
  sideBar.innerHTML = `
    <div class="listSummary">
        <H1> Total Summary </H1>
        <p> Total: ${taskCount} tasks </p>
        <p> Complete: ${completedCount} tasks </p>
        <p> Incomplete: ${taskCount - completedCount} tasks </p>
    </div>
  `;
}))
