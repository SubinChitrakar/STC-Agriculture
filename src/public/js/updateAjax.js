function updateUtils(scope,success){
    var formData = $(scope).serialize();
    var url= $(scope).attr('action');
    $.ajax({
        url: url,
        type: 'PUT',
        dataType: 'json',
        data: formData,
        success: success
    });
    return false;
}

function updateTenderSuccess(data){
    window.location.href = '/tender/tenderDetails/'+data.id;
}
