function atualizarListaTarefas() {
  const filtroFinalizado = document.getElementById('filtro-finalizado').checked;
  const filtroNaoFinalizado = document.getElementById('filtro-nao-finalizado').checked;

  fetch('/tarefas')
    .then(response => response.json())
    .then(tarefas => {
      const listaDeTarefas = document.getElementById('lista-de-tarefas');
      listaDeTarefas.innerHTML = '';

      tarefas.forEach(tarefa => {
        const statusDaTarefa = tarefa.status ? 'Finalizada' : 'Não Finalizada';

        if ((filtroFinalizado && tarefa.status) || (filtroNaoFinalizado && !tarefa.status) || (!filtroFinalizado && !filtroNaoFinalizado)) {
          const li = document.createElement('li');
          li.textContent = `${tarefa.nome} - ${statusDaTarefa} (ID: ${tarefa.id})`;
          listaDeTarefas.appendChild(li);
        }
      });
    });
}

document.getElementById('filtro-finalizado').addEventListener('change', function() {
  document.getElementById('filtro-nao-finalizado').checked = false;
  atualizarListaTarefas();
});

document.getElementById('filtro-nao-finalizado').addEventListener('change', function() {
  document.getElementById('filtro-finalizado').checked = false;
  atualizarListaTarefas();
});

document.getElementById('adicionar-item').addEventListener('click', function() {
  const nomeNovoItem = document.getElementById('nome-novo-item').value;

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
    document.getElementById('nome-novo-item').value = '';
  })
  .catch(error => {
    console.error('Erro ao adicionar item:', error);
  });
});

document.getElementById('atualizar-item').addEventListener('click', function() {
  const idDoItem = document.getElementById('id-item').value;
  const nomeAlterado = document.getElementById('nome-alterado').value;
  const statusAlterado = document.getElementById('status-alterado').checked;

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
    document.getElementById('id-item').value = '';
    document.getElementById('nome-alterado').value = '';
    document.getElementById('status-alterado').checked = false;
  })
  .catch(error => {
    console.error('Erro ao atualizar item:', error);
  });
});

document.getElementById('remover-item').addEventListener('click', function() {
  const idItemParaRemover = document.getElementById('id-item-remover').value;

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
    document.getElementById('id-item-remover').value = '';
  })
  .catch(error => {
    console.error('Erro ao remover item:', error);
  });
});

atualizarListaTarefas();
