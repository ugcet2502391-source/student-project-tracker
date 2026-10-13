
const projectForm = document.querySelector('#project-form');
const nameInput = document.querySelector('#name');
const statusInput = document.querySelector('#status');
const projectList = document.querySelector('#project-list');
const emptyState = document.querySelector('#empty-state');

// Temporary collection: projects exist only while the page is loaded.
const projects = [];

function renderProjects() {
  // Clear the list before rebuilding it.
  projectList.replaceChildren();

  // Show the empty-state message only when there are no projects.
  if (emptyState) {
    emptyState.hidden = projects.length > 0;
  }

  // Display every project in the collection.
  projects.forEach(project => {
    const item = document.createElement('li');
    item.dataset.projectId = project.id;

    const projectName = document.createElement('h3');
    projectName.textContent = project.name;

    const projectStatus = document.createElement('p');
    projectStatus.textContent = `Status: ${project.status}`;

    item.append(projectName, projectStatus);
    projectList.appendChild(item);
  });
}

// Handle form submission in one place.
projectForm.addEventListener('submit', event => {
  event.preventDefault();

  const name = nameInput.value.trim();
  const status = statusInput.value;

  // Reject an empty project name.
  if (!name) {
    nameInput.focus();
    return;
  }

  // Create a project using the values entered by the user.
  const project = {
    id: crypto.randomUUID(),
    name: name,
    status: status
  };

  // Add it to the collection.
  projects.push(project);

  // Display all projects.
  renderProjects();

  // Prepare the form for another project.
  projectForm.reset();
  nameInput.focus();
});

// Display the initial empty state.
renderProjects();