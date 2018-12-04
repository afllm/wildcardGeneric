'use strict';

moduleProducto.controller('productoNewController', ['$scope', '$http', '$routeParams', 'sessionService',
    function ($scope, $http, $routeParams, sessionService) {
        $scope.id = $routeParams.id;

        $scope.guardar = function () {
            var json = {
                id: $scope.ajaxDatoProducto.id,
                codigo: $scope.ajaxDatoProducto.codigo,
                desc: $scope.ajaxDatoProducto.desc,
                existencias: $scope.ajaxDatoProducto.existencias,
                foto: $scope.ajaxDatoProducto.foto,
                precio: $scope.ajaxDatoProducto.precio,
                id_tipoProducto: $scope.ajaxDatoProducto.obj_tipoProducto.id
            };
            $http({
                method: 'GET',
                withCredentials: true,
                url: '/json?ob=producto&op=create',
                params: {json: JSON.stringify(json)}
            }).then(function (response) {
                $scope.status = response.status;
                $scope.mensaje = true;
            }, function (response) {
                $scope.mensajeError = true;
                $scope.ajaxDatoProducto = response.data.message || 'Request failed';
                $scope.status = response.status;
            });
        };
        $scope.logout = function () {
            $http({
                method: 'GET',
                url: '/json?ob=usuario&op=logout'
            }).then(function (response) {
                if (response.status === 200) {
                    sessionService.setSessionInactive();
                    sessionService.setUserName("");
                }
            });
        };
        $scope.save = function () {
            $http({
                method: 'GET',
                url: 'json?ob=tipoproducto&op=update&id=2',
                data: {json: JSON.stringify($scope.obj)}
            }).then(function (response) {
                $scope.status = response.status;
                $scope.ajaxData = response.data.message;
            }, function (response) {
                $scope.ajaxData = response.data.message || 'Request failed';
                $scope.status = response.status;
            });
        };
        $scope.tipoProductoRefresh = function () {
            $scope.tipoproducto = false;
            $http({
                method: 'GET',
                url: 'json?ob=tipoproducto&op=get&id=' + $scope.ajaxDatoProducto.obj_tipoProducto.id
            }).then(function (response) {
                $scope.ajaxDatoProducto.obj_tipoProducto = response.data.message;
                if ($scope.ajaxDatoProducto.obj_tipoProducto === null || $scope.ajaxDatoProducto.obj_tipoProducto === "") {
                    $scope.tipoproducto = true;
                }
            }, function (response) {
                $scope.tipoproducto = true;
                $scope.ajaxDatoProducto = response.data.message || 'Request failed';
                $scope.status = response.status;
            });
        };
    }]);