function deleteUtils(url,success,error){
    $.ajax({
        url: url,
        type: 'DELETE',
        success: success || function(){},
        error: error || function(){}
    });
}

function deleteFertilizer(data){
    window.location.href= '/fertilizer';
}

function deleteTender(data){
    window.location.href= '/tender';
}

function deleteDistributor(data){
    window.location.href= '/distributor';
}

function deleteNews(data){
    window.location.href='/news';
}

function deleteTips(data){
    window.location.href='/smartTips';
}


function deleteError(data){
    $('.errorMessage').show();
}
