"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var armTemplates_1 = require("../../models/armTemplates");
var serverless_1 = require("../../models/serverless");
var namingService_1 = require("../../services/namingService");
var FunctionAppResource = /** @class */ (function () {
    function FunctionAppResource() {
    }
    FunctionAppResource.getResourceName = function (config) {
        var safeServiceName = config.service.replace(/\s/g, "-");
        var options = {
            config: config,
            resourceConfig: config.provider.functionApp,
            suffix: safeServiceName,
            includeHash: false,
        };
        return namingService_1.AzureNamingService.getResourceName(options);
    };
    FunctionAppResource.prototype.getTemplate = function () {
        var parameters = {
            functionAppRunFromPackage: {
                defaultValue: "1",
                type: armTemplates_1.ArmParamType.String
            },
            functionAppName: {
                defaultValue: "",
                type: armTemplates_1.ArmParamType.String
            },
            functionAppNodeVersion: {
                defaultValue: "",
                type: armTemplates_1.ArmParamType.String
            },
            functionAppWorkerRuntime: {
                defaultValue: "node",
                type: armTemplates_1.ArmParamType.String
            },
            functionAppExtensionVersion: {
                defaultValue: "~2",
                type: armTemplates_1.ArmParamType.String
            },
            storageAccountName: {
                defaultValue: "",
                type: armTemplates_1.ArmParamType.String
            },
            appInsightsName: {
                defaultValue: "",
                type: armTemplates_1.ArmParamType.String
            },
            location: {
                defaultValue: "",
                type: armTemplates_1.ArmParamType.String
            },
        };
        return {
            "$schema": "https://schema.management.azure.com/schemas/2015-01-01/deploymentTemplate.json#",
            "contentVersion": "1.0.0.0",
            parameters: parameters,
            "variables": {},
            "resources": [
                {
                    "type": "Microsoft.Web/sites",
                    "apiVersion": "2016-03-01",
                    "name": "[parameters('functionAppName')]",
                    "location": "[parameters('location')]",
                    "identity": {
                        "type": armTemplates_1.ArmParamType.SystemAssigned
                    },
                    "dependsOn": [
                        "[resourceId('Microsoft.Storage/storageAccounts', parameters('storageAccountName'))]",
                        "[concat('microsoft.insights/components/', parameters('appInsightsName'))]"
                    ],
                    "kind": "functionapp,linux",
                    "properties": {
                        "siteConfig": {
                            "appSettings": [
                                {
                                    "name": "FUNCTIONS_WORKER_RUNTIME",
                                    "value": "[parameters('functionAppWorkerRuntime')]"
                                },
                                {
                                    "name": "FUNCTIONS_EXTENSION_VERSION",
                                    "value": "[parameters('functionAppExtensionVersion')]"
                                },
                                {
                                    "name": "AzureWebJobsStorage",
                                    "value": "[concat('DefaultEndpointsProtocol=https;AccountName=',parameters('storageAccountName'),';AccountKey=',listKeys(resourceId('Microsoft.Storage/storageAccounts', parameters('storageAccountName')), '2016-01-01').keys[0].value)]"
                                },
                                {
                                    "name": "WEBSITE_CONTENTAZUREFILECONNECTIONSTRING",
                                    "value": "[concat('DefaultEndpointsProtocol=https;AccountName=',parameters('storageAccountName'),';AccountKey=',listKeys(resourceId('Microsoft.Storage/storageAccounts', parameters('storageAccountName')), '2016-01-01').keys[0].value)]"
                                },
                                {
                                    "name": "WEBSITE_CONTENTSHARE",
                                    "value": "[toLower(parameters('functionAppName'))]"
                                },
                                {
                                    "name": "WEBSITE_NODE_DEFAULT_VERSION",
                                    "value": "[parameters('functionAppNodeVersion')]"
                                },
                                {
                                    "name": "WEBSITE_RUN_FROM_PACKAGE",
                                    "value": "[parameters('functionAppRunFromPackage')]"
                                },
                                {
                                    "name": "APPINSIGHTS_INSTRUMENTATIONKEY",
                                    "value": "[reference(concat('microsoft.insights/components/', parameters('appInsightsName'))).InstrumentationKey]"
                                }
                            ]
                        },
                        "name": "[parameters('functionAppName')]",
                        "clientAffinityEnabled": false,
                        "hostingEnvironment": ""
                    }
                }
            ]
        };
    };
    FunctionAppResource.prototype.getParameters = function (config) {
        var resourceConfig = __assign({}, config.provider.functionApp);
        var functionRuntime = config.provider.functionRuntime;
        var params = {
            functionAppName: {
                value: FunctionAppResource.getResourceName(config),
            },
            functionAppNodeVersion: {
                value: (functionRuntime.language === serverless_1.SupportedRuntimeLanguage.NODE)
                    ?
                        functionRuntime.version
                    :
                        undefined
            },
            functionAppWorkerRuntime: {
                value: functionRuntime.language,
            },
            functionAppExtensionVersion: {
                value: resourceConfig.extensionVersion,
            }
        };
        return params;
    };
    return FunctionAppResource;
}());
exports.FunctionAppResource = FunctionAppResource;
