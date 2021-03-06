/**
Copyright 2013 Google Inc. All Rights Reserved.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
**/
define(['config'], function (config) {
    'use strict';

    var exports = {};

    exports.getDevices = function(idToken, successCb, errorCb) {
        performDeviceListRequest(idToken, successCb, errorCb);
    }


    function performDeviceListRequest(idToken, successCb, errorCb) {
        var that = this;

        var xhr = new XMLHttpRequest();
        xhr.open('POST', config.getRootUrl()+'/devicelab/devices/get/', true);
        xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

        var that = this;
        xhr.onreadystatechange = function(e) {
            if (this.readyState == 4) {
                if(this.status != 200) {
                    errorCb();
                    return;
                } else {
                    var data = JSON.parse(xhr.responseText);
                    successCb(data.devices);
                }
            }
        };

        var paramString = 'id_token='+encodeURIComponent(idToken);
        xhr.send(paramString);
    }

    return exports;
});