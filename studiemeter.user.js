// ==UserScript==
// @name         Studiemeter
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://www.studiemeter.nl/*
// @grant        none
// @require      http://ajax.googleapis.com/ajax/libs/jquery/2.1.4/jquery.js
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

function Getplaceholder(){
    var placeholder = $(".exercise-input-element").attr("placeholder").split(' / ');
    return placeholder[1];
}

function GetNumber(){
    var questionnumber = $(".questionnumber").html().replace(/ /g,'').replace(/(\r\n|\n|\r)/gm,"").split("&nbsp;van&nbsp;");
    return questionnumber[1];
}

window.onhashchange = function(){
    var parameter = GetURLParameter("exerciseId");
    if(parameter !== null){
        $(".navbar-header.pull-left").append(parameter);
        for (i = 0; i < 10; i++) {
            setTimeout(function() {
                MakeQuestion();
                $("button:not(.ng-hide)[ng-click='nextQuestionConditional()']").click();
            }, 3000 + 1000 * i);
        }
    }
};
