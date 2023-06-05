project_list()

function populate_project_list(project_list){
    var target = document.getElementById("project_list");
    for(var i = 0; i < project_list.length;i++){
        var data = project_list[i];
        console.log(data);
        var short_description = data.description.substring(0,100)+'....';
        var html = '\
        <li>\
            <a>\
                <div class="fplogo">\
                <h4>'+data.title+'</h4>\
                <p>'+short_description+'</p>\
                </div>\
                <div class="fptext">\
                    <button type="button" project_id="'+data.id+'" onclick="project_detail(this)" class="btn more">View More</button>\
                </div>\
            </a>\
        </li>\
        '
        target.innerHTML += html;
    }
}
function project_list(){
    axios.get('https://spcv.pythonanywhere.com/api/sumit_portfolio')

    .then(function (response) {
        populate_project_list(response.data.project_list);
    })

    .catch(function (error) {
    // handle error
        console.log(error);
    })

}


function project_detail(element){
    var project_id  = element.getAttribute('project_id');
    var myModal = new bootstrap.Modal(document.getElementById('project_detail'));
    axios.get('https://spcv.pythonanywhere.com/api/sumit_project_detail/'+project_id)
    
    .then(function (response) {
        
        console.log(response.data);
        var data = response.data.project_list;
        document.getElementById('project_detail_title').innerHTML = data.title;
        document.getElementById('project_detail_description').innerHTML = data.description;

        myModal.show();
    })

    .catch(function (error) {
    // handle error
        console.log(error);
    })

}

