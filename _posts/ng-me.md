---
layout:	post
title:	ng-me
theme: blogs
---

# Basics of Angular

##2 way Data binding
In case of one way binding only the values declared in the javascript are displayed on the browser page (DOM objects). While in two way data binding any change in the browser (DOM input controls) is automatically reflected in the javascript variable.

##Model View View Model (MVVW === MV* === MVW)
In a Server end architecture MVC => Model View Controller where model handles the data, the controller is responsible for the flow management and the View is the presentation layer.
In case of client end architecture there can be a need of massaging the data obtained in the Model thus creating a new Model for the view aka. View Model.
The controller here does much more than managing the flow hence Model view Whatever (MVW). 

## Client side templates
In the first server call from the client the basic template of the layout is send back and in all the subsequent calls only data is send to and fro between the client and the server.

## Client side routing
Client decides what view to display based on the URL, server is responsible for only providing the data.

## Inversion of Control
The objects needed are provided rather than one having to invoke the object.

## ng-directives
Angular helps you extend HTML with new attributes called Directives thus making the static HTML dynamic.
The directive are used with 'data' prefixed to them as some browsers do not understand the angular specific tags, adding of data makes them HTML5 attributes and thus compatible.

Directive| Description
:---|:---
ng-app| Initializes the angular app within the tag it is added.  **Javascript side maps to:** `angular.module('todoApp',[])`
ng-controller | Makes scope objects available to the html. **Javascript side maps to:** `angular.controller('TodoAppController',function($scope){}`
ng-repeat| Looping through array.    
ng-model| Bind data to html.
ng-bind	| Use to avoid showing of 'curleys' when angular js is at the end. Used instead of **angular expression.**

## Tools
**[AngularJS Batarang](https://chrome.google.com/webstore/detail/angularjs-batarang/ighdmehidhipcmcojjgiloacoafjmpfk){:target="_blank"}**
Extends the Chrome Developer Tools, adding tools for debugging and profiling AngularJS applications.

