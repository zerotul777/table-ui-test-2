// multilvl list
document.addEventListener('DOMContentLoaded', () => {
  const toggleClassRecursively = (element, className) => {
    element.querySelectorAll(`.${className}`).forEach(el => {
      el.classList.remove(className);
      toggleClassRecursively(el, className);
    });
  };

  document.querySelectorAll('.locations__btn').forEach(button => {
    button.addEventListener('click', ({ currentTarget }) => {
      const parentItem = currentTarget.closest('.locations__item');
      const list = parentItem?.querySelector('.locations__list');
      const siblingButtons = parentItem.parentNode.querySelectorAll('.locations__btn');

      if (list) {
        const isOpen = list.classList.toggle('locations__list--open');
        siblingButtons.forEach(btn => btn.classList.remove('locations__btn--active'));
        if (isOpen) {
          currentTarget.classList.add('locations__btn--active');
        } else {
          toggleClassRecursively(list, 'locations__list--open');
        }
      }
    });
  });
});

// select 
$('.custom-select').each(function () {
  const _this = $(this),
    selectOption = _this.find('option'),
    selectOptionLength = selectOption.length,
    selectedOption = selectOption.filter(':selected'),
    duration = 450; // длительность анимации 

  _this.hide();
  _this.wrap('<div class="custom-select"></div>');
  $('<div>', {
    class: 'custom-select__new-select',
    text: _this.children('option:disabled').text()
  }).insertAfter(_this);

  const selectHead = _this.next('.custom-select__new-select');
  $('<div>', {
    class: 'custom-select__new-select-list'
  }).insertAfter(selectHead);

  const selectList = selectHead.next('.custom-select__new-select-list');
  for (let i = 1; i < selectOptionLength; i++) {
    $('<div>', {
      class: 'custom-select__new-select-item',
      html: $('<span>', {
        text: selectOption.eq(i).text()
      })
    })
      .attr('data-value', selectOption.eq(i).val())
      .appendTo(selectList);
  }

  const selectItem = selectList.find('.custom-select__new-select-item');
  selectList.slideUp(0);
  selectHead.on('click', function () {
    if (!$(this).hasClass('custom-select__new-select--open')) {
      $(this).addClass('custom-select__new-select--open');
      selectList.slideDown(duration);

      selectItem.on('click', function () {
        let chooseItem = $(this).data('value');

        $('select').val(chooseItem).attr('selected', 'selected');
        selectHead.text($(this).find('span').text());

        selectList.slideUp(duration);
        selectHead.removeClass('custom-select__new-select--open');
      });

    } else {
      $(this).removeClass('custom-select__new-select--open');
      selectList.slideUp(duration);
    }
  });
});

// modal
function setupCloseButtons() {
  document.querySelectorAll('.modal__close-btn').forEach(button => 
    button.addEventListener('click', () => button.closest('.modal--active')?.classList.remove('modal--active'))
  );
}

document.addEventListener('DOMContentLoaded', () => {
  setupCloseButtons();

  const toggleModal = (buttonId, modalId) => {
    document.getElementById(buttonId)?.addEventListener('click', () => 
      document.getElementById(modalId)?.classList.add('modal--active')
    );
  };

  toggleModal('create-location-btn', 'create-location-modal');
  
  document.querySelectorAll('.location-cell__modify-edit').forEach(button => 
    button.addEventListener('click', () => 
      document.getElementById('edit-location-modal')?.classList.add('modal--active')
    )
  );
});

// nav
document.querySelectorAll('.main__nav-btn').forEach(button => {
  button.addEventListener('click', () => {
    const targetId = button.getAttribute('data-target');
    
    document.querySelectorAll('.main__nav-item--active').forEach(item => item.classList.remove('main__nav-item--active'));
    button.parentElement.classList.add('main__nav-item--active');

    document.querySelectorAll('.main__section-item').forEach(item => 
      item.classList.toggle('main__section-item--active', item.id === targetId)
    );

    const footerBtns = document.querySelector('.footer__btns');
    footerBtns.classList.toggle('footer__btns--active', targetId === 'settings');
  });
});

