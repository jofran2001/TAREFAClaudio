function atualizarListaTarefas() {
  const filtroConcluido = document.getElementById('filtro-concluido').checked;
  const filtroPendente = document.getElementById('filtro-pendente').checked;

  fetch('/tarefas')
    .then(response => response.json())
    .then(tarefas => {
      const listaDeTarefas = document.getElementById('lista-tarefas');
      listaDeTarefas.innerHTML = '';

      tarefas.forEach(tarefa => {
        const statusDaTarefa = tarefa.status ? 'Finalizada' : 'Não Finalizada';

        if ((filtroConcluido && tarefa.status) || (filtroPendente && !tarefa.status) || (!filtroConcluido && !filtroPendente)) {
          const li = document.createElement('li');
          li.textContent = `${tarefa.nome} - ${statusDaTarefa} (ID: ${tarefa.id})`;
          listaDeTarefas.appendChild(li);
        }
      });
    });
}

document.getElementById('filtro-concluido').addEventListener('change', function() {
  document.getElementById('filtro-pendente').checked = false;
  atualizarListaTarefas();
});

document.getElementById('filtro-pendente').addEventListener('change', function() {
  document.getElementById('filtro-concluido').checked = false;
  atualizarListaTarefas();
});

document.getElementById('adicionar-tarefa').addEventListener('click', function() {
  const nomeNovoItem = document.getElementById('nome-tarefa').value;

  if (!nomeNovoItem) {
    alert('Por favor, insira um nome para o item.');
    return;
  }

  fetch('/tarefas', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ nome: nomeNovoItem })
  })
  .then(response => response.json())
  .then(data => {
    console.log('Item adicionado com sucesso:', data);
    atualizarListaTarefas();
    document.getElementById('nome-tarefa').value = '';
  })
  .catch(error => {
    console.error('Erro ao adicionar item:', error);
  });
});

document.getElementById('atualizar-tarefa').addEventListener('click', function() {
  const idDoItem = document.getElementById('id-tarefa').value;
  const nomeAlterado = document.getElementById('novo-nome').value;
  const statusAlterado = document.getElementById('novo-status').checked;

  if (!idDoItem) {
    alert('Por favor, insira o ID do item.');
    return;
  }

  fetch(`/tarefas/${idDoItem}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ nome: nomeAlterado, status: statusAlterado })
  })
  .then(response => response.json())
  .then(data => {
    console.log('Item atualizado com sucesso:', data);
    atualizarListaTarefas();
    document.getElementById('id-tarefa').value = '';
    document.getElementById('novo-nome').value = '';
    document.getElementById('novo-status').checked = false;
  })
  .catch(error => {
    console.error('Erro ao atualizar item:', error);
  });
});

document.getElementById('excluir-tarefa').addEventListener('click', function() {
  const idItemParaRemover = document.getElementById('id-tarefa-excluir').value;

  if (!idItemParaRemover) {
    alert('Por favor, insira o ID do item para remover.');
    return;
  }

  fetch(`/tarefas/${idItemParaRemover}`, {
    method: 'DELETE'
  })
  .then(() => {
    console.log('Item removido com sucesso');
    atualizarListaTarefas();
    document.getElementById('id-tarefa-excluir').value = '';
  })
  .catch(error => {
    console.error('Erro ao remover item:', error);
  });
});

atualizarListaTarefas();
