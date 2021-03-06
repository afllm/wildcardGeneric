'use strict'

moduleUsuario.controller('usuarioRemoveController', ['$scope', '$http', '$location', 'toolService', '$routeParams','sessionService', "$window",
    function ($scope, $http, $location, toolService, $routeParams,sessionService, $window) {

        $scope.ob = "usuario";
         $scope.tabla = true;
        $scope.msgopcioneliminar = true;

        if (!$routeParams.id) {
            $scope.id = 1;
        } else {
            $scope.id = $routeParams.id;
        }
          if (sessionService.getUserName() !== "") {
            $scope.loggeduser = sessionService.getUserName();
            $scope.loggeduserid = sessionService.getId();
            $scope.logged = true;
            $scope.tipousuarioID = sessionService.getTypeUserID();
        }

        $http({
            method: 'GET',
            url: 'json?ob=' + $scope.ob + '&op=get&id=' + $scope.id
        }).then(function (response) {
            $scope.status = response.status;
            $scope.ajaxDataUsuarios = response.data.message;
        }, function (response) {
            $scope.status = response.status;
            $scope.ajaxDataUsuarios = response.data.message || 'Request failed';
        });

       $scope.eliminar = function (accion) {
            if (accion === "eliminar") {
                $http({
                    method: 'GET',
                    url: 'json?ob=' + $scope.ob + '&op=remove&id=' + $scope.id
                }).then(function (response) {
                    $scope.eliminarok = true;
                    $scope.msgopcioneliminar = false;
                    $scope.eliminarerror = false;
                    $scope.tabla = false;
                    $scope.status = response.status;
                    $scope.ajaxDatoTipousuario = response.data.message;
                }, function (response) {
                    $scope.ajaxDatoTipousuario = response.data.message || 'Request failed';
                    $scope.status = response.status;
                });
            } else {
                $scope.eliminarerror = true;
                $scope.msgopcioneliminar = false;
                $scope.eliminarok = false;
                $scope.tabla = true;
            }

        };

        $scope.volver = function () {
            $window.history.back();
        }
  

    }

]);
