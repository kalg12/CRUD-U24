// Obtener la lista de pendientes del localStorage (si existe)
const listaDePendientes = localStorage.getItem("listaDePendientes");
let pendientes = listaDePendientes ? JSON.parse(listaDePendientes) : [];

// Función para renderizar la lista de pendientes en el DOM
const renderizarLista = () => {
  const lista = document.getElementById("lista");
  lista.innerHTML = ""; // Limpiamos la lista antes de agregar los nuevos elementos

  pendientes.forEach((pendiente, index) => {
    const li = document.createElement("li");
    li.textContent = pendiente;
    const btnEliminar = document.createElement("button");
    btnEliminar.textContent = "Eliminar";
    btnEliminar.onclick = () => eliminarTarea(index);
    li.appendChild(btnEliminar);
    lista.appendChild(li);
  });
};

// Función para agregar una tarea
const agregarTarea = () => {
  const tareaInput = document.getElementById("tarea");
  const tarea = tareaInput.value.trim();

  if (tarea) {
    pendientes.push(tarea); // Agregamos la nueva tarea al array
    localStorage.setItem("listaDePendientes", JSON.stringify(pendientes)); // Guardamos la lista actualizada en el localStorage
    tareaInput.value = ""; // Limpiamos el input
    renderizarLista(); // Renderizamos la lista actualizada
  } else {
    alert("Por favor ingresa una tarea");
  }
};

// Función para eliminar una tarea
const eliminarTarea = (index) => {
  pendientes.splice(index, 1); // Eliminamos la tarea en el índice dado
  localStorage.setItem("listaDePendientes", JSON.stringify(pendientes)); // Guardamos la lista actualizada en el localStorage
  renderizarLista(); // Renderizamos la lista actualizada
};

// Renderizamos la lista al cargar la página
renderizarLista();
