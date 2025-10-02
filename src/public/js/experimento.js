document.addEventListener('DOMContentLoaded', function () {
  const likeForm = document.querySelector('form[action$="like"], form[action$="unlike"]');
  if (likeForm) {
    likeForm.addEventListener('submit', async function (e) {
      e.preventDefault();
      const url = likeForm.action;
      const method = 'POST';
      const res = await fetch(url, { method });
      if (res.ok) {
        location.reload();
      }
    });
  }

  // Removido o envio AJAX do comentário para usar o submit padrão do formulário
});
