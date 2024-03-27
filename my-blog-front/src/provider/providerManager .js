import ProviderMethods from './providerMethods';
import ErrorResponse from './providerErrorResponse';
import axios from 'axios';
import { Config } from '../Config';


class ProviderManager {

    static async getData(funcName, params) {
        let methodData = ProviderMethods[funcName];
        let fetchObj = this.getFetchObj(methodData, params);
        try {
            return axios(fetchObj)
                .then((res) => {
                    if (res.status === 200) {
                        return Promise.resolve(res.data);
                    } else {
                        return Promise.reject(
                            new ErrorResponse(Error.UNAUTHORIZED.errorCode, Error.UNAUTHORIZED.errorDesc, Error.UNAUTHORIZED.friendlyDesc, res.status)
                        );
                    }
                })
                .catch((e) => {
              
                    if (e.toString().includes('401')) {
                        // window.location.reload();
                    }
                    return Promise.reject(e);
                });
        } catch (e) {
            if (e === 'TypeError: Failed to fetch' || e === 'TypeError: Network request failed') {
                return Promise.reject(
                    new ErrorResponse(Error.CONNECTION_ERROR.errorCode, Error.CONNECTION_ERROR.errorDesc, Error.CONNECTION_ERROR.friendlyDesc, '')
                );
            }
            else { return Promise.reject(e); }
        }

    }

    static getFetchObj(funcObj, params) {
        let headers = {};
        headers['Content-Type'] = 'application/json';

        let url = '';

        if (funcObj.httpMethod === 'get' || funcObj.httpMethod === 'delete') {
            if ((!params || Object.keys(params).length === 0)) {
                url = funcObj.apiName;
            }
            else {
                url = funcObj.apiName + '/' + Object.entries(params).map(e => e[1]).join('/');
            }
        }
        else {
            url = funcObj.apiName;
        }

        let fetchObj = {
            baseURL: Config.baseApiUrl,
            url: url,
            method: funcObj.httpMethod,
            timeout: 40000,
            data: (funcObj.httpMethod === 'get' || funcObj.httpMethod === 'delete' ? undefined : params),
            headers: headers,
        };
        return fetchObj;
    }

}

export default ProviderManager;