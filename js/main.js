$(document).ready(function(){

    console.log("Hello :] Nice to meet you!");
    
    // Hero area shadow movement START
    let heroArea = $("header:not(.resume)");
    let text = heroArea.find("h1");

    function shadowMovement(e){
        let offsetWidth = heroArea.width();
        let offsetHeight = heroArea.height();

        let offsetX = e.pageX;
        let offsetY = e.pageY;

        let movement = 20;

        if(heroArea !== e.target) {  
            offsetX += 0
            offsetY += 0
        }

        let xMovement = (offsetX / offsetWidth * movement) - (movement / 2);
        let yMovement = (offsetY / offsetHeight * movement) - (movement / 2);

        text.css({"textShadow": xMovement+"px "+yMovement+"px 0 rgba(58, 80, 107, 0.5)"})
    }

    heroArea.on("mousemove", shadowMovement);
    // Hero area shadow movement END


    // Hero area headtext fadeout START
    $(window).scroll(function(){
        text.css("opacity", 1 - $(window).scrollTop() / 400);
    });
    // Hero area headtext fadeout END

    // Nav animation START
    $('#nav_icon').click(function(){
        $(this).toggleClass('open');
        $(".sidebar").toggleClass("open");
	  });
    // Nav animation END

    //Nav color fadein START
    $(window).scroll(function(){
        if($(window).scrollTop() > 300){
            $("nav").addClass("scrolled");
        }
        else{
            $("nav").removeClass("scrolled");
        }
    });

    if($(window).scrollTop() > 300){
        $("nav").addClass("scrolled");
    }
    else{
        $("nav").removeClass("scrolled");
    }
    //Nav color fadein END

    //Nav close on entry click START
    $(".sidebar a").click(function(){
        $(".sidebar").toggleClass("open");
        $("#nav_icon").toggleClass("open");
    });
    //Nav close on entry click END

    //Smooth scrolling START
    $('a[href^="#"]').on('click', function (e) {
        e.preventDefault();
        $(document).off("scroll");

        var target = this.hash;
        $target = $(target);
        $('html, body').stop().animate({
            'scrollTop': $target.offset().top+2
        }, 500, 'swing', function () {
            window.location.hash = target;
        });
    });
    //Smooth scrolling END

    //Skill section functions START
    function loadSkill(skillname, callback) { 

        $.getJSON("/js/json/skills.json", 
            function (data) {
                if(typeof data[skillname] != "undefined"){
                    data[skillname].description = data[skillname].description.replace(/\n/gi, "<br/>");

                    $("#skill_title").text(data[skillname].title);
                    $("#skill_description").html(data[skillname].description);
                    $("#skill_rating").text("["+data[skillname].skill_amount+"] / [5]");

                    callback(true);
                }
                else{
                    callback(false);
                }
            }
        );
    }
    
    $("#skills .skill_wrap .skill").click(function(){
        let skillname = $(this).data("skill-name");

        loadSkill(skillname, function (isDone) {  
            if(isDone){
                $("#dim").addClass("active");
            } 
        });
    });

    $(".close_skill_box").click(function() {  
        $("#dim").removeClass("active");
    });
    //Skill section functions END
});