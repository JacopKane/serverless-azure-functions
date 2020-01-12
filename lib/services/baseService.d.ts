import { TokenCredentialsBase } from "@azure/ms-rest-nodeauth";
import Serverless from "serverless";
import { ServerlessAzureConfig, ServerlessAzureOptions, ServerlessLogOptions } from "../models/serverless";
import { ConfigService } from "./configService";
export declare abstract class BaseService {
    protected serverless: Serverless;
    protected options: ServerlessAzureOptions;
    protected baseUrl: string;
    protected serviceName: string;
    protected credentials: TokenCredentialsBase;
    protected subscriptionId: string;
    protected resourceGroup: string;
    protected deploymentName: string;
    protected artifactName: string;
    protected storageAccountName: string;
    protected config: ServerlessAzureConfig;
    protected configService: ConfigService;
    protected constructor(serverless: Serverless, options?: ServerlessAzureOptions, authenticate?: boolean);
    /**
     * Get the access token from credentials token cache
     */
    protected getAccessToken(): Promise<string>;
    /**
     * Sends an API request using axios HTTP library
     * @param method The HTTP method
     * @param relativeUrl The relative url
     * @param options Additional HTTP options including headers, etc.
     */
    protected sendApiRequest(method: string, relativeUrl: string, options?: any): Promise<import("axios").AxiosResponse<any>>;
    /**
     * Uploads the specified file via HTTP request
     * @param requestOptions The HTTP request options
     * @param filePath The local file path
     */
    protected sendFile(requestOptions: any, filePath: any): Promise<unknown>;
    /**
     * Log message to Serverless CLI
     * @param message Message to log
     */
    protected log(message: string, options?: ServerlessLogOptions, entity?: string): void;
    protected prettyPrint(object: any): void;
    protected stringify(object: any): string;
    protected getOption(key: string, defaultValue?: any): any;
}
