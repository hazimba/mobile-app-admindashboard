
const modal = {
    confirmationDelete: 'modal-delete-table-id',
    editItem: 'modal-edit-table-item',
}

function dynamicDeleteModalName(id){
    return modal.confirmationDelete.replace('id', id);
}


export { dynamicDeleteModalName }