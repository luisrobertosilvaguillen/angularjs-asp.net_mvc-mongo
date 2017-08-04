/**
 * Utils namespace para utilidades o herramientas de acceso global
 */
window.Utils = {};

Utils.clone = function (obj) {
    var copy;
    // Handle the 3 simple types, and null or undefined
    if (null == obj || "object" != typeof obj) return obj;
    // Handle Date
    if (obj instanceof Date) {
        copy = new Date();
        copy.setTime(obj.getTime());
        return copy;
    }
    // Handle Array
    if (obj instanceof Array) {
        copy = [];
        for (var i = 0, len = obj.length; i < len; i++) {
            copy[i] = Utils.clone(obj[i]);
        }
        return copy;
    }
    // Handle Object
    if (obj instanceof Object) {
        copy = {};
        for (var attr in obj) {
            if (obj.hasOwnProperty(attr)) copy[attr] = Utils.clone(obj[attr]);
        }
        return copy;
    }
    throw new Error("Unable to copy obj! Its type isn't supported.");
}

/**
 * Utilities for Date
 */
Utils.Date = {
    /** Returns true/false if the given date is valid as instance and date value */
    isValid: function (d) {
        if (d instanceof Date) {
            if (!isNaN(d.getTime()))
                return true;
        } else {
            return false;
        }
        return false;
    }
}

/**
 * Utilities for arrays
 */
Utils.Arrays = {
    removeObject: function (originalArray, obj) {
        // Make sure it has that property, so it is an array
        if (typeof originalArray.length !== 'undefined') {
            var index = -1;
            for (var n = 0; n < originalArray.length; ++n) {
                if (originalArray[n] == obj) {
                    index = n;
                    break;
                }
            }
            if (index !== -1) {
                // Removes the item from the array, if you return the splice, it will return the removed items
                originalArray.splice(index, 1);
                return originalArray;
            } else {
                console.log('Object not found in array');
            }
            return originalArray;
        }
        return originalArray;
    }
}

/**
 * Utilities that helps authorization functionalities
 */
Utils.Authorization = {
    /**
     * Returns an object that represents the header needed for Bearer token
     * @param {object} AngularJs ngStorage's $sessionStorage object
     */
    getBearerHeader: function ($sessionStorage) {
        if (typeof $sessionStorage !== 'undefined' && typeof $sessionStorage.token !== 'undefined') {
            return {
                Authorization: 'Bearer ' + $sessionStorage.token.access_token
            };
        } else {
            console.log('$sessionStorage not defined or token property within is not yet defined');
            return {};
        }
    }
}

/**
 * Utilidades para procesar errores
 */
Utils.Error = {
    /**
     * Devuelve los mensajes de errores de un modelstate devuelto por ASP.NET WebAPI como un arreglo de cadenas de textos
     * @param {object} Objeto que usualmente devuelve ASP.NET MVC WebAPI como BadRequest con el ModelState de parámetro
     */
    getModelStateErrorMessages: function (context) {
        var errors = [];
        if (context.data && context.data.modelState) {
            var modelState = context.data.modelState;
            for (var prop in modelState) {
                if (modelState[prop].length && modelState[prop].length > 0) { // Si es un array y tiene algo
                    errors.push(modelState[prop][0]);
                }
            }
        } else {
            console.log('Context argument given to Utils.Error.getModelStateErrorMessages does not have modelState information');
        }
        return errors;
    }
}

;