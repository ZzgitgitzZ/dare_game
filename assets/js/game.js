var timer;
var active = {"category": "active_category", "difficulty": "active_difficulty", "sounds":"active_sounds"}
var dares = load_dares() //if doesn't work, move under document.ready.function 
var category_list = [
    "kiss_hug"      ,
    "stripper"      ,
    "promise"       ,
    "tickle"        ,
    "inspection"    ,
    "roleplay"      ,
    "blindfolded"     ,
    "hand"          ,  
    "oral"          , 
    "sextoy"        ,
    "masturebate"   ,
    "bdsm"          ,
    "sex-position"
]
var player = "male"
var other_player = "female"
var pp_points = {"male":0, "female":0}
var used_points = 0;

function load_dares(){
    url = 'https://ketoshi.github.io/Dare_game/assets/text/dares.json'
    var json = (function () {
        var json = null;
        $.ajax({
            'async': false,
            'global': false,
            'url': url,
            'dataType': "json",
            'success': function (data) {
                json = data;
            }
        });
        return json;
    })(); 
    return json
}

function rand(max_num){
    return Math.floor(max_num*Math.random())
}

function get_random_dare(difficulty){
    while (true){
        category = category_list[ rand(category_list.length) ]
        step =  dares[category][difficulty]
        if (step.length > 0){break} 
    }
    step = dares[category][difficulty]
    dare = step[rand(step.length)]
    return dare
}

function get_dare(){
    category = document.getElementsByClassName(active.category)[0].id
    difficulty = document.getElementsByClassName(active.difficulty)[0].id

    if (category=="random"){
        return get_random_dare(difficulty)
    }

    step = dares[category][difficulty]
    if (step.length > 0 ){
        dare = step[rand(step.length)]
    }else {
        dare = "category no dare of this difficulty, getting random dare:\n\n" + get_random_dare(difficulty)
    }
        
    return dare
}

function start_timer(max_time=1){
    if (max_time>0){
        rr = 1+rand(4+1)
        max_time = 15*rr + 2 + used_points*45
        reps = 3*rr * (used_points+1)
    } else{ 
        reps=0
    }
    var old_time = new Date().getTime();            
    var x = setInterval(function() {
        var now_time = new Date().getTime();            
        var distance = old_time - now_time;
        var seconds = max_time + Math.floor((distance % (1000 * 60)) / 1000);
            
        document.getElementById("timer").innerHTML = "Repetitions: " + reps +  " /\n Timer: " + seconds + "s";
        if (seconds < 0) {
            clearInterval(x);
            document.getElementById("timer").innerHTML = "Timer: 0s";
            if (max_time > 0){document.getElementById("end_timer").play()}
            player_copy = player
            player = other_player
            other_player = player_copy
            document.getElementById("button").innerHTML = player + ", " + pp_points[player] +"pp: Get Dare"
            document.getElementById("dare_text").innerHTML = "click button to update dare"
            used_points=0
        }

    }, 1000);
    timer = x
}

$(document).ready(function(){ //goes off after page first loaded 
    timer = start_timer(-1)
    song_elems = {'sound_bg':document.getElementById('bg_sound'), 'sound_sexy':document.getElementById('sexy_sound'), 'sound_porn':document.getElementById('porn_sound')};
    ult_text = dares['ultimate']['extreme']
    ult_text = ult_text.join('\n\n\n')
    document.getElementById('ultimate_text').innerHTML = ult_text

    $('.difficulty').click(function() {
        $('.difficulty').removeClass(active.difficulty)
        $(this).addClass(active.difficulty)        
    });
    
    $('.category').click(function() {
        $('.category').removeClass(active.category)
        $(this).addClass(active.category)
    });

    $('.sounds').click(function() {
        $('.sounds').removeClass(active.sounds)
        $(this).addClass(active.sounds)
        for (elem in song_elems){
            song_elems[elem].currentTime = 0
            song_elems[elem].pause()
        }   
        if ($(this).attr("id") != 'stop_music'){
            elem = song_elems[$(this).attr("id")]
            elem.setAttribute('loop', 'loop')
            elem.play()
        }     
    });

    $('#button').click(function() {
        dare = get_dare()
        document.getElementById("dare_text").innerHTML = player +": " + dare
    });

    $('#pp_plus').click(function() {
        pp_points[other_player]++
        document.getElementById("button").innerHTML = player + ", " + pp_points[player] +"pp: Get Dare"
        document.getElementById('click_sound').play()
    });

    $('#use_pp').click(function() {
        if (pp_points[player]>0){
            pp_points[player]--
            used_points++
            document.getElementById('click_sound').play()
        }
        document.getElementById("button").innerHTML = player + ", " + pp_points[player] +"pp: Get Dare"
    });

    $('#sounds_modal').click(function() {
        document.getElementById('modal').style.display="block"
    });

    $('#modal_off_div').click(function() {
        document.getElementById('modal').style.display="none"
    });
   
    $('#start_dare').click(function() {
        clearInterval(timer)
        start_timer()
    });

    

});
