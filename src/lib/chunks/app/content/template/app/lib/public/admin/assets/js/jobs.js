/**
 *  Steps handler
 */

var Steps = {}

Steps.init = function () {
    this.buildParseUrl();
    this.bindBtn('#step-3-btn', function (e) {
        ParseRequest.jobFillArticlesText();
        e.preventDefault();
    })
    this.bindBtn('#step-fill-language-btn', function (e) {
        ParseRequest.jobFillArticlesLanguage();
        e.preventDefault();
    })
    this.bindBtn('#step-fill-words-btn', function (e) {
        ParseRequest.jobFillArticlesWords();
        e.preventDefault();
    })
    this.bindBtn('#step-fill-domain-btn', function (e) {
        ParseRequest.jobFillArticlesDomain();
        e.preventDefault();
    })
}

Steps.buildParseUrl = function () {
    var url = Config.getUrl();
    $('#parse-url').html(url + '/parse');
}

Steps.bindBtn = function (id, callback) {
    $(id).click(callback)
}

Steps.closeStep = function (id) {
    $(id).addClass('step--disabled');
}

Steps.openStep = function (id) {
    $(id).removeClass('step--disabled');
}

Steps.fillStepOutput = function (id, data) {
    $(id).html('Output: ' + data).slideDown();
}

Steps.fillBtn = function (id, message) {
    $(id).addClass('success').html('✓  ' + message);
}


/**
 *  Parse requests handler
 */

var ParseRequest = {};

ParseRequest.postData = function () {
    XHR.setCallback(function (data) {
        // store objectID
        Store.objectId = JSON.parse(data).objectId;
        // close first step
        Steps.closeStep('#step-1');
        Steps.fillStepOutput('#step-1-output', data)
        Steps.fillBtn('#step-1-btn', 'Posted');
        // open second step
        Steps.openStep('#step-2');
        Steps.bindBtn('#step-2-btn', function (e) {
            ParseRequest.getData();
            e.preventDefault();
        });
    });
    XHR.POST('/parse/classes/GameScore');
}


ParseRequest.jobFillArticlesText = function () {
    XHR.setCallback(function (data) {
        // close second step

        //Steps.fillStepOutput('#step-3-output', data)
        Steps.fillBtn('#step-3-btn', 'Job launched!');
        // open third step

    });
    XHR.POST('/parse/functions/jobFillArticlesText');
}

ParseRequest.jobFillArticlesLanguage = function () {
    XHR.setCallback(function (data) {
        // close second step

        //Steps.fillStepOutput('#step-3-output', data)
        Steps.fillBtn('#step-fill-language-btn', 'Job launched!');
        // open third step

    });
    XHR.POST('/parse/functions/jobFillArticlesLanguage');
}

ParseRequest.jobFillArticlesWords = function () {
    XHR.setCallback(function (data) {
        // close second step

        // Steps.fillStepOutput('#step-3-output', data)
        Steps.fillBtn('#step-fill-words-btn', 'Job launched!');
        // open third step

    });
    XHR.POST('/parse/functions/jobFillArticlesWords');
}


ParseRequest.jobFillArticlesDomain = function () {
    XHR.setCallback(function (data) {
        // close second step

        // Steps.fillStepOutput('#step-3-output', data)
        Steps.fillBtn('#step-fill-domain-btn', 'Job launched!');
        // open third step

    });
    XHR.POST('/parse/functions/jobFillArticlesDomain');
}



/**
 * Store objectId and other references
 */

var Store = {
    objectId: ""
};

var Config = {}

Config.getUrl = function () {
    if (url) return url;
    var port = window.location.port;
    var url = window.location.protocol + '//' + window.location.hostname;
    if (port) url = url + ':' + port;
    return url;
}


/**
 * XHR object
 */

var XHR = {}

XHR.setCallback = function (callback) {
    this.xhttp = new XMLHttpRequest();
    var _self = this;
    this.xhttp.onreadystatechange = function () {
        if (_self.xhttp.readyState == 4 && _self.xhttp.status >= 200 && _self.xhttp.status <= 299) {
            callback(_self.xhttp.responseText);
        }
    };
}

XHR.POST = function (path, callback) {
    var seed = { "score": 1337, "playerName": "Sean Plott", "cheatMode": false }
    this.xhttp.open("POST", Config.getUrl() + path, true);
    this.xhttp.setRequestHeader("X-Parse-Application-Id", "offboxapi");
    this.xhttp.setRequestHeader("Content-type", "application/json");
    this.xhttp.send(JSON.stringify(seed));
}

XHR.GET = function (path, callback) {
    this.xhttp.open("GET", Config.getUrl() + path + '/' + Store.objectId, true);
    this.xhttp.setRequestHeader("X-Parse-Application-Id", "offboxapi");
    this.xhttp.setRequestHeader("Content-type", "application/json");
    this.xhttp.send(null);
}


/**
 *  Boot
 */

Steps.init();
