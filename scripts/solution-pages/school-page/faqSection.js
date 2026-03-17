const list = document.getElementById('faq-sec-list');

list.addEventListener('click', function (e) {

    const trigger = e.target.closest('.faq-sec-trigger');
    if (!trigger) return;

    const item = trigger.closest('.faq-sec-item');
    const isOpen = item.classList.contains('open');

    document.querySelectorAll('.faq-sec-item.open').forEach(function (openItem) {

        openItem.classList.remove('open');
        openItem.querySelector('.faq-sec-trigger').setAttribute('aria-expanded', 'false');

    });

    if (!isOpen) {

        item.classList.add('open');
        trigger.setAttribute('aria-expanded', 'true');

    }

});