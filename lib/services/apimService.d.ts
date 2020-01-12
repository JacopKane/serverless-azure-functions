import Serverless from "serverless";
import { BaseService } from "./baseService";
import { ApiContract, ApiManagementServiceResource } from "@azure/arm-apimanagement/esm/models";
import { Site } from "@azure/arm-appservice/esm/models";
/**
 * APIM Service handles deployment and integration with Azure API Management
 */
export declare class ApimService extends BaseService {
    private apimClient;
    private functionAppService;
    private apimConfig;
    constructor(serverless: Serverless, options?: Serverless.Options);
    /**
     * Gets the configured APIM resource
     */
    get(): Promise<ApiManagementServiceResource>;
    /**
     * Gets the APIM API by API name
     * @param apiName The API to retrieve
     */
    getApi(apiName: string): Promise<ApiContract>;
    /**
     * Deploys the APIM top level api
     */
    deploy(): Promise<any>;
    /**
     * Deploys all the functions of the serverless service to APIM
     */
    deployFunctions(functionApp: Site, resource: ApiManagementServiceResource): Promise<void[]>;
    /**
     * Deploys the specified serverless function  to APIM
     * @param options
     */
    deployFunction(functionApp: Site, resource: ApiManagementServiceResource, functionName: string): Promise<void>;
    /**
     * Retrieves the template parameter referenced in the route template
     * @param route The route template to inspect
     */
    private getTemplateParameters;
    /**
     * Deploys the APIM API referenced by the serverless service
     */
    private ensureApi;
    /**
     * Deploys the APIM Backend referenced by the serverless service
     * @param functionAppUrl The host name for the deployed function app
     */
    private ensureBackend;
    /**
     * Deploys a single APIM api operation for the specified function
     * @param serverless The serverless framework
     * @param options The plugin options
     */
    private deployOperation;
    /**
     * Gets the master key for the function app and stores a reference in the APIM instance
     * @param functionAppUrl The host name for the Azure function app
     */
    private ensureFunctionAppKeys;
    /**
     * Creates the XML payload that defines the API operation policy to link to the configured backend
     */
    private createApiOperationXmlPolicy;
    /**
     * Creates the XML payload that defines the specified CORS policy
     * @param corsPolicy The CORS policy
     */
    private createCorsXmlPolicy;
    /**
     * Sets up APIM defaults if not explicitly defined
     * @param functionApp The function app resource
     */
    private setApimDefaults;
}
