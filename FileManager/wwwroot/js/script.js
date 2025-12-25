//let btnAction = document.querySelectorAll('.btn-action');

//btnAction.forEach((button) => {
//    button.addEventListener('click', (event) => {
//        let blockAction = document.getElementById('action');

//        if (!blockAction){
//            createBlockAction();
//        }
//        transformBlockAction(event);
//    })
//});

//document.addEventListener('click', (event) => {
//    let blockAction = document.getElementById('action');
//    if (blockAction && blockAction.classList.contains('active')) {
//        if(!event.target.closest('.btn-action')){
//            blockAction.classList.remove('active');
//            dropBlockAction();
//        }
//    }
//})

//function createBlockAction(){
//    let divBlock = document.createElement('div');

//    let obj = [
//        {
//            icon: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">\n' +
//                '       <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>\n' +
//                '       <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/>\n' +
//                '  </svg>',
//            title: 'Изменить'
//        },
//        {
//            icon: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-download" viewBox="0 0 16 16">\n' +
//                '       <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5"/>\n' +
//                '       <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708z"/>\n' +
//                '  </svg>',
//            title: 'Скачать'
//        },
//        {
//            icon: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash3-fill" viewBox="0 0 16 16">\n' +
//                '       <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5m-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5M4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06m6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528M8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5"/>\n' +
//                '  </svg>',
//            title: 'Удалить'
//        }];
//    divBlock.classList.add('block-action');
//    // divBlock.classList.add('active');
//    divBlock.id = 'action';

//    obj.forEach((item) => {
//        let divActionItem = document.createElement('div');
//        let divActionItemIcon = document.createElement('div');
//        let divActionItemSpan = document.createElement('span');

//        divActionItem.classList.add('action-item');
//        divActionItemIcon.classList.add('action-icon');

//        divActionItemIcon.innerHTML = item.icon;
//        divActionItemSpan.innerHTML = item.title;

//        divActionItem.appendChild(divActionItemIcon)
//        divActionItem.appendChild(divActionItemSpan)

//        divBlock.appendChild(divActionItem);
//    });

//    document.body.appendChild(divBlock);
//}

//function dropBlockAction(){
//    setTimeout(() => {
//        let  blockAction = document.getElementById('action');
//        blockAction.parentNode.removeChild(blockAction);
//    }, 300)


//}

//function transformBlockAction(event){
//    let blockAction = document.getElementById('action');

//    let rect = event.target.closest('.btn-action').getBoundingClientRect();
//    let left = rect.left - blockAction.offsetLeft;
//    let top = rect.top;

//    // console.log(rect);
//    // console.log(left);
//    // console.log(top);

//    blockAction.style.transform = `translate(${left}px, ${top}px)`;
//    blockAction.classList.add('active');
//}