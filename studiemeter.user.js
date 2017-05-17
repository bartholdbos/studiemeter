// ==UserScript==
// @name          Studiemeter
// @namespace     https://github.com/bartholdbos/studiemeter
// @description   Studiemeter script
// @version       0.1
// @match         https://www.studiemeter.nl/*
// @require       http://ajax.googleapis.com/ajax/libs/jquery/2.1.4/jquery.js
// @downloadURL   https://github.com/bartholdbos/studiemeter/raw/master/studiemeter.user.js
// ==/UserScript==

function GetURLParameter(sParam){
    var sPageURL = window.location.href.split("?")[1];
    if(sPageURL == null){
        return null;
    }

    var sURLVariables = sPageURL.split('&');
    for (var i = 0; i < sURLVariables.length; i++){
        var sParameterName = sURLVariables[i].split('=');
        if (sParameterName[0] == sParam){
            return sParameterName[1];
        }
    }

    return null;
}

function MakeQuestion(){
    $(".exercise-input-element").each(function(){
        $(this).val($(this).attr("placeholder").split(' / ')[0]);
        $(this).change();
    });
}

function GetQuestionNumber(){
    var questionnumber = $(".questionnumber").html().replace(/ /g,'').replace(/(\r\n|\n|\r)/gm,"").split("&nbsp;van&nbsp;");
    return parseInt(questionnumber[1]);
}

window.onhashchange = function(){
    var parameter = GetURLParameter("exerciseId");
    if(parameter !== null){
        $(".navbar-header.pull-left").append(parameter);
        setTimeout(function() {
            for (i = 0; i < GetQuestionNumber(); i++) {
                setTimeout(function() {
                    MakeQuestion();
                    if (i < GetQuestionNumber()){
                        $("button:not(.ng-hide)[ng-click='nextQuestionConditional()']").click();
                    }
                    if (i == GetQuestionNumber()){
                        $("button:not(.ng-hide)[ng-click='submitClick()']").click();
                    }
                }, 1000 * i);
            }
        }, 3000);
    }
};
