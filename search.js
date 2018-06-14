$(document).ready(function(){

    //Function to remove noDisplay class from elements
    let removeNoDisplayClass=() =>{
        //console.log("Before :"+$("#movie *").has(".noDisplay").length);
        $("#movie *").filter(".noDisplay").toggleClass("noDisplay");
        //console.log("After :"+$("#movie *").has(".noDisplay").length);

    }

    //input field change function
    let enableDisableButton= () =>{
        let title=$("#title").val().trim();
        let imdbId=$("#imdbId").val().trim();
        if(title.length > 0 || imdbId.length >0){
            $("#submit").prop("disabled", false);
            if($("#input-alert").is(":visible")){
                $("#input-alert").hide();
            }
            if($("#title").hasClass("is-invalid")){
                $("#title").removeClass("is-invalid");
            } 
            if($("#imdbId").hasClass("is-invalid")){
                $("#imdbId").removeClass("is-invalid");
            }

            if($("#input-hint").is(":hidden")){
                $("#input-hint").show();
            }
            if($("#movie").is(":visible")){
                if(!($("#movie").hasClass("d-none"))){
                    $("#movie").toggleClass("d-none");
                }
            }
            removeNoDisplayClass();
        }
        else{
            $("#submit").prop("disabled", true);
            $("#input-hint").hide();
            $("#input-alert").show();
            $("#title,#imdbId").addClass("is-invalid");
        }

    } 

    //Reset function
    let resetOnClick= () =>{
        $("form").trigger("reset");
        if($(":input").hasClass("is-invalid")){
            $(":input").removeClass("is-invalid");
        } 
        if($("#input-hint").is(":hidden")){
            $("#input-alert").hide();
            $("#input-hint").show();
        }
        if($("#notFound").is(":visible")){
            $("#notFound").hide();
        }
        if($("#movie").is(":visible")){
            if(!($("#movie").hasClass("d-none"))){
                $("#movie").toggleClass("d-none")
            }
        }
        removeNoDisplayClass();
    }
    //change height of poster
    $(window).resize(() =>{
        if($("#movie").is(":visible")){
            //console.log($(".aside").outerHeight()+"px");
            if($(".aside").outerHeight()<500){
                $("img").css("height",$(".aside").outerHeight()+"px");
            }
        }
    });

    //movie card display function
    let displayCard= (movie) =>{
        removeNoDisplayClass();
        let count=0;
        //loop to iterate over the json data
        for(value in movie){
            //movie title
            if(value=="Title"){
                if(movie[value]!="N/A"){
                    $(".titleText").text(movie[value]);
                }
            }
            //Release Year
            if(value=="Year"){
                if(movie[value]!="N/A"){
                    $("#releaseYear").text("("+movie[value]+")");
                }
                else{
                    $("#releaseYear").addClass("noDisplay");
                }
            }
            //Rated
            if(value=="Rated"){
                if(movie[value]!="N/A"){
                    $("#rated").text(movie[value]);
                }
                else{
                    $("#rated").addClass("noDisplay");
                }
            }
            //Release Date
            if(value=="Released"){
                if(movie[value]!="N/A"){
                    $("#released").text(movie[value]);
                }
                else{
                    $("#released").addClass("noDisplay");
                }
            }
            //Runtime
            if(value=="Runtime"){
                if(movie[value]!="N/A"){
                    $("#runTime").text(movie[value]);
                }
                else{
                    $("#runTime").addClass("noDisplay");
                }
            }
            //Genre
            if(value=="Genre"){
                if(movie[value]!="N/A"){
                    $(".genre-text").text(movie[value]);
                    if(!($(".genre-mid").hasClass("d-sm-inline"))){
                        $(".genre-mid").toggleClass("d-sm-inline");
                    }
                }
                else{
                    $(".genre").addClass("noDisplay");
                    if($(".genre-mid").hasClass("d-sm-inline")){
                        $(".genre-mid").toggleClass("d-sm-inline");
                    }
                    
                }
            }
            //Director
            if(value=="Director"){
                if(movie[value]!="N/A"){
                    $(".director .list").text(movie[value]);
                    $(".dir-side").addClass("noDisplay");
                }
                else{
                    $(".director").addClass("noDisplay");
                }
            }
            //Writer
            if(value=="Writer"){
                if(movie[value]!="N/A"){
                    $(".writer .list").text(movie[value]);
                    $(".writ-side").addClass("noDisplay");
                }
                else{
                    $(".writer").addClass("noDisplay");
                }
            }
            //Actors
            if(value=="Actors"){
                if(movie[value]!="N/A"){
                    $(".actor .list").text(movie[value]);
                    $(".act-side").addClass("noDisplay");
                }
                else{
                    $(".actor").addClass("noDisplay");
                }
            }
            //Plot
            if(value=="Plot"){
                if(movie[value]!="N/A"){
                    $(".plot").text(movie[value]);
                    if(!($("#plot-side").hasClass("d-lg-block"))){
                        $("#plot-side").toggleClass("d-lg-block");
                    }
                }
                else{
                    $("#plot-below").addClass("noDisplay");
                    if($("#plot-side").hasClass("d-lg-block")){
                        $("#plot-side").toggleClass("d-lg-block");
                    } 
                    count++;
                }
            }
            //Language
            if(value=="Language"){
                if(movie[value]!="N/A" && movie[value]!="None"){
                    $("#language").text(movie[value]);
                }
                else{
                    $("#language").addClass("noDisplay");
                }
            }
            //Country
            if(value=="Country"){
                if(movie[value]!="N/A"){
                    $("#country").text(movie[value]);
                }
                else{
                    $("#country").addClass("noDisplay");
                }
            }
            //Awards
            if(value=="Awards"){
                if(movie[value]!="N/A"){
                    $(".award").text(movie[value]);
                }
                else{
                    $(".awards").addClass("noDisplay");
                    count++;
                }
            }
            //Poster
            if(value=="Poster"){
                if(movie[value]!="N/A"){
                    $("#poster").attr("src",movie[value]);
                    $("#alt-poster").addClass("noDisplay");
                }
                else{
                    $("#poster").addClass("noDisplay");
                }  
            }
            //Ratings--Rotten Tomatoes
            if(value=="Ratings"){
                if(movie[value]!="N/A"){
                    let Ratings=movie[value];
                    if(Ratings.length >1){
                        for(rating of Ratings){
                            if(rating["Source"]=="Rotten Tomatoes"){
                                $("#rotten-tomatoes .progress-bar").text(rating["Value"]); 
                                $("#rotten-tomatoes .progress-bar").css("width",rating["Value"]);
                            }
                        }
                    }
                    else{
                        $("#rotten-tomatoes").addClass("noDisplay");
                        count++;
                    }
                }
                else{
                    $("#rotten-tomatoes").addClass("noDisplay");
                    count++;
                }  
            }
            //Metascore
            if(value=="Metascore"){
                if(movie[value]!="N/A"){
                    $("#metacritic-score").text(movie[value]);
                }
                else{
                    $("#metacritic").addClass("noDisplay");
                    count++;
                }  
            }
            //IMDB Rating
            if(value=="imdbRating"){
                if(movie[value]!="N/A"){
                    $("#imdbRating").text(movie[value]);
                }
                else{
                    $(".rating").addClass("noDisplay");
                }  
            }
            //IMDB Votes
            if(value=="imdbVotes"){
                if(movie[value]!="N/A"){
                    $("#imdbVotes").text(movie[value]);
                }
                else{
                    $("#imdbVotes").addClass("noDisplay");
                    if(movie[imdbRating]=="N/A"){
                        $(".imdbDet").addClass("noDisplay");
                    }
                }  
            }
            //IMBD ID
            if(value=="imdbID"){
                if(movie[value]!="N/A"){
                    $("#imdb-id a").text(movie[value]);
                    $("#imdb-id a").attr("href","https://www.imdb.com/title/"+movie[value]);
                }
                else{
                    $("#imdb-id").addClass("noDisplay");
                    if(movie[imdbRating]=="N/A"){
                        $("#rating").addClass("noDisplay");
                    }
                }  
            }
            //Type
            if(value=="Type"){
                if(movie[value]!="N/A"){
                    $("#type").text(movie[value]);
                }
                else{
                    $("#type,.arrow").addClass("noDisplay");
                }  
            }
            //DVD
            if(value=="DVD"){
                if(movie[value]!="N/A"){
                    $(".dvd").text(movie[value]);
                }
                else{
                    $(".dvd-foot").addClass("noDisplay");
                }  
            }
            //Box Office
            if(value=="BoxOffice"){
                if(movie[value]!="N/A"){
                    $("#bo-collection p").text(movie[value]);
                }
                else{
                    $("#box-office").addClass("noDisplay");
                    count++;
                }  
            }
            //Production
            if(value=="Production"){
                if(movie[value]!="N/A"){
                    $("#production").text(movie[value]);
                    if(!($("#production").hasClass("d-inline-block"))){
                        $("#production").toggleClass("d-inline-block");
                    }
                }
                else{
                    if($("#production").hasClass("d-inline-block")){
                        $("#production").toggleClass("d-inline-block");
                    }
                    $("#production,.arrow").addClass("noDisplay");
                }  
            }
            //Website
            if(value=="Website"){
                if(movie[value]!="N/A"){
                    $(".website a").text(movie[value]);
                    $(".website a").attr("href",movie[value]);
                    if(!($("#website-side").hasClass("d-md-inline-block"))){
                        $("#website-side").toggleClass("d-md-inline-block");
                    }
                    if(!($("#website-side").hasClass("d-none"))){
                        $("#website-side").toggleClass("d-none");
                    }
                }
                else{
                    $("#website-foot").addClass("noDisplay");
                    if($("#website-side").hasClass("d-md-inline-block")){
                        $("#website-side").toggleClass("d-md-inline-block");
                    }
                    count++;
                }  
            }
        }//end of for loop

        //To display cast lists at side
        //console.log("count "+count);
        if(count>=2){
            if(movie["Director"]!="N/A"){
                $(".dir-bot").addClass("noDisplay");
                if($(".dir-side").hasClass("noDisplay")){
                    $(".dir-side").toggleClass("noDisplay");
                }
            }
            if(movie["Writer"]!="N/A"){
                $(".writ-bot").addClass("noDisplay");
                if($(".writ-side").hasClass("noDisplay")){
                    $(".writ-side").toggleClass("noDisplay");
                }
            }
            if(movie["Actors"]!="N/A"){
                $(".act-bot").addClass("noDisplay");
                if($(".act-side").hasClass("noDisplay")){
                    $(".act-side").toggleClass("noDisplay");
                }
            }
        }
        if(count>3){
            if(movie["Website"]!="N/A"){
                $("#website-foot").addClass("noDisplay");
                if(!($("#website-side").hasClass("d-md-inline-block"))){
                    $("#website-side").toggleClass("d-md-inline-block");
                }
                if($("#website-side").hasClass("d-none")){
                    $("#website-side").toggleClass("d-none");
                }
            }
        }
    }
    //when reset button is clicked
    $("#reset").click(resetOnClick);

    //when change in input fields
    $("#title").on("input change",enableDisableButton);
    $("#imdbId").on("input change",enableDisableButton);



    //on submit
    let isDisabled = $("#submit").is(":enabled");
    if(!isDisabled){
        $("form").on("submit",function(event){
            event.preventDefault();
            let inputData=$("form").find(":input").filter(function(){
                return $.trim(this.value).length > 0
            }).serialize();

            $.ajax({
                dataType : 'json',              
                url :  "https://www.omdbapi.com/?"+inputData+"&apikey=3f48eb4f",
                success : function(data,textStatus,jqXHR){
                    //console.log(data);
                    //console.log(this.url);
                    //console.log(textStatus);
                    if(data.Response=="True"){
                        $("#submit").prop("disabled", true);
                        displayCard(data);

                        if(!($("#movie").is(":visible"))){
                            if($("#movie").hasClass("d-none")){
                                $("#movie").toggleClass("d-none");
                                //setting height of poster image
                                //console.log($(".aside").outerHeight());
                                if($(".aside").outerHeight()<500){
                                    $("img").css("height",$(".aside").outerHeight()+"px");
                                }
                            }
                        }                        
                    }
                    if(data.Response=="False") {
                        $("#submit").prop("disabled", true);
                        if(data.Error.includes("not found")){
                            $("#notFound").show().find("p").text(data.Error);
                        }
                        else if(data.Error.includes("IMDb ID")){
                            $("#imdbId").addClass("is-invalid"); 
                            $("#error").text(data.Error);
                            $('#myModal').modal("show");
                        }
                        else{
                            $("#error").text(data.Error);
                            $('#myModal').modal("show");
                        }
                    }

                    if($("#notFound").is(":visible")){
                        $("form").on("submit",function(){
                            $("#notFound").hide();
                        });
                    }
                },//end of success
                error : function(jqXHR,textStatus,errorThrown){
                    //console.log(textStatus);
                    //console.log(jqXHR);
                    let message;
                    let errorCode=jqXHR.status;
                    let errorMap = {
                        '400' : "Server understood the request, but request content was invalid.",
                        '401' : "Unauthorized access.",
                        '403' : "Forbidden resource can't be accessed.",
                        '500' : "Internal server error.",
                        '503' : "Service unavailable."  };  
                    if(errorCode){
                        message =errorMap[errorCode];
                        if(!message){
                            message="Unknown Error \n.";
                        }
                    }else if(textStatus=='parsererror'){
                        message="Error.\nParsing JSON Request failed.";
                    }else if(textStatus=='timeout'){
                        message="Request Time out.";
                    }else if(textStatus=='abort'){
                        message="Request was aborted by the server";
                    }else {
                        message="Unknown Error \n.";
                    }
                    //to display error message
                    $("#submit").prop("disabled", true);
                    if(message){
                        $("#error").text(message);
                        $('#myModal').modal("show"); 
                    }
                }//end of error
            });//end of ajax
        });// end of submit
    }//end of button check
});//end of document ready